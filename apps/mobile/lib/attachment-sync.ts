import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system/legacy';
import type { AppData, Attachment } from '@mindwtr/core';
import { webdavGetFile, webdavMakeDirectory, webdavPutFile } from '@mindwtr/core';
import { WEBDAV_PASSWORD_KEY, WEBDAV_URL_KEY, WEBDAV_USERNAME_KEY } from './sync-constants';

const ATTACHMENTS_DIR_NAME = 'attachments';
const DEFAULT_CONTENT_TYPE = 'application/octet-stream';
const StorageAccessFramework = (FileSystem as any).StorageAccessFramework;

const BASE64_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const BASE64_LOOKUP = (() => {
  const map = new Uint8Array(256);
  map.fill(255);
  for (let i = 0; i < BASE64_ALPHABET.length; i += 1) {
    map[BASE64_ALPHABET.charCodeAt(i)] = i;
  }
  return map;
})();

const bytesToBase64 = (bytes: Uint8Array): string => {
  let out = '';
  for (let i = 0; i < bytes.length; i += 3) {
    const b0 = bytes[i] ?? 0;
    const b1 = bytes[i + 1];
    const b2 = bytes[i + 2];

    const hasB1 = typeof b1 === 'number';
    const hasB2 = typeof b2 === 'number';
    const triplet = (b0 << 16) | ((b1 ?? 0) << 8) | (b2 ?? 0);

    out += BASE64_ALPHABET[(triplet >> 18) & 0x3f];
    out += BASE64_ALPHABET[(triplet >> 12) & 0x3f];
    out += hasB1 ? BASE64_ALPHABET[(triplet >> 6) & 0x3f] : '=';
    out += hasB2 ? BASE64_ALPHABET[triplet & 0x3f] : '=';
  }
  return out;
};

const base64ToBytes = (base64: string): Uint8Array => {
  const sanitized = base64.replace(/[^A-Za-z0-9+/=]/g, '');
  const padding = sanitized.endsWith('==') ? 2 : sanitized.endsWith('=') ? 1 : 0;
  const outputLength = Math.max(0, (sanitized.length * 3) / 4 - padding);
  const bytes = new Uint8Array(outputLength);
  let buffer = 0;
  let bits = 0;
  let index = 0;

  for (let i = 0; i < sanitized.length; i += 1) {
    const ch = sanitized.charCodeAt(i);
    if (sanitized[i] === '=') break;
    const value = BASE64_LOOKUP[ch];
    if (value === 255) continue;
    buffer = (buffer << 6) | value;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      if (index < bytes.length) {
        bytes[index] = (buffer >> bits) & 0xff;
      }
      index += 1;
    }
  }
  return bytes;
};

const extractExtension = (value?: string): string => {
  if (!value) return '';
  const stripped = value.split('?')[0].split('#')[0];
  const leaf = stripped.split(/[\\/]/).pop() || '';
  const match = leaf.match(/\.[A-Za-z0-9]{1,8}$/);
  return match ? match[0].toLowerCase() : '';
};

export const buildCloudKey = (attachment: Attachment): string => {
  const ext = extractExtension(attachment.title) || extractExtension(attachment.uri);
  return `${ATTACHMENTS_DIR_NAME}/${attachment.id}${ext}`;
};

export const getBaseSyncUrl = (fullUrl: string): string => {
  const trimmed = fullUrl.replace(/\/+$/, '');
  if (trimmed.toLowerCase().endsWith('.json')) {
    const lastSlash = trimmed.lastIndexOf('/');
    return lastSlash >= 0 ? trimmed.slice(0, lastSlash) : trimmed;
  }
  return trimmed;
};

export const sanitizeAppDataForRemote = (data: AppData): AppData => {
  const sanitizeAttachments = (attachments?: Attachment[]): Attachment[] | undefined => {
    if (!attachments) return attachments;
    return attachments.map((attachment) => {
      if (attachment.kind !== 'file') return attachment;
      return {
        ...attachment,
        uri: '',
        localStatus: undefined,
      };
    });
  };

  return {
    ...data,
    tasks: data.tasks.map((task) => ({
      ...task,
      attachments: sanitizeAttachments(task.attachments),
    })),
    projects: data.projects.map((project) => ({
      ...project,
      attachments: sanitizeAttachments(project.attachments),
    })),
  };
};

type WebDavConfig = { url: string; username: string; password: string };

const loadWebDavConfig = async (): Promise<WebDavConfig | null> => {
  const url = await AsyncStorage.getItem(WEBDAV_URL_KEY);
  if (!url) return null;
  return {
    url,
    username: (await AsyncStorage.getItem(WEBDAV_USERNAME_KEY)) || '',
    password: (await AsyncStorage.getItem(WEBDAV_PASSWORD_KEY)) || '',
  };
};

const getAttachmentsDir = async (): Promise<string | null> => {
  const base = FileSystem.documentDirectory || FileSystem.cacheDirectory;
  if (!base) return null;
  const normalized = base.endsWith('/') ? base : `${base}/`;
  const dir = `${normalized}${ATTACHMENTS_DIR_NAME}/`;
  try {
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!message.toLowerCase().includes('already exists')) {
      console.warn('Failed to ensure attachments directory', error);
    }
  }
  return dir;
};

const readFileAsBytes = async (uri: string): Promise<Uint8Array> => {
  if (uri.startsWith('content://')) {
    if (!StorageAccessFramework?.readAsStringAsync) {
      throw new Error('Storage Access Framework not available.');
    }
    const base64 = await StorageAccessFramework.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return base64ToBytes(base64);
  }
  const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
  return base64ToBytes(base64);
};

const fileExists = async (uri: string): Promise<boolean> => {
  if (uri.startsWith('content://')) return true;
  try {
    const info = await FileSystem.getInfoAsync(uri);
    return info.exists;
  } catch (error) {
    console.warn('Failed to check attachment file', error);
    return false;
  }
};

export const syncMobileAttachments = async (
  appData: AppData,
  webDavConfig: WebDavConfig,
  baseSyncUrl: string
): Promise<boolean> => {
  const attachmentsDirUrl = `${baseSyncUrl}/${ATTACHMENTS_DIR_NAME}`;
  try {
    await webdavMakeDirectory(attachmentsDirUrl, {
      username: webDavConfig.username,
      password: webDavConfig.password,
    });
  } catch (error) {
    console.warn('Failed to ensure WebDAV attachments directory', error);
  }

  await getAttachmentsDir();

  const attachmentsById = new Map<string, Attachment>();
  for (const task of appData.tasks) {
    for (const attachment of task.attachments || []) {
      attachmentsById.set(attachment.id, attachment);
    }
  }
  for (const project of appData.projects) {
    for (const attachment of project.attachments || []) {
      attachmentsById.set(attachment.id, attachment);
    }
  }

  let didMutate = false;
  for (const attachment of attachmentsById.values()) {
    if (attachment.kind !== 'file') continue;
    if (attachment.deletedAt) continue;

    const uri = attachment.uri || '';
    const isHttp = /^https?:\/\//i.test(uri);
    const isContent = uri.startsWith('content://');
    const hasLocalPath = Boolean(uri) && !isHttp;
    const existsLocally = hasLocalPath ? await fileExists(uri) : false;
    const nextStatus: Attachment['localStatus'] = (existsLocally || isContent || isHttp) ? 'available' : 'missing';
    if (attachment.localStatus !== nextStatus) {
      attachment.localStatus = nextStatus;
      didMutate = true;
    }

    if (!attachment.cloudKey && hasLocalPath && existsLocally && !isHttp) {
      try {
        const fileData = await readFileAsBytes(uri);
        const buffer = fileData.byteOffset === 0 && fileData.byteLength === fileData.buffer.byteLength
          ? fileData.buffer
          : fileData.buffer.slice(fileData.byteOffset, fileData.byteOffset + fileData.byteLength);
        const cloudKey = buildCloudKey(attachment);
        await webdavPutFile(
          `${baseSyncUrl}/${cloudKey}`,
          buffer,
          attachment.mimeType || DEFAULT_CONTENT_TYPE,
          { username: webDavConfig.username, password: webDavConfig.password }
        );
        attachment.cloudKey = cloudKey;
        attachment.localStatus = 'available';
        didMutate = true;
      } catch (error) {
        console.warn(`Failed to upload attachment ${attachment.title}`, error);
      }
    }
  }

  return didMutate;
};

export const ensureAttachmentAvailable = async (attachment: Attachment): Promise<Attachment | null> => {
  if (attachment.kind !== 'file') return attachment;
  const uri = attachment.uri || '';
  const isHttp = /^https?:\/\//i.test(uri);
  const isContent = uri.startsWith('content://');
  if (uri && (isHttp || isContent)) {
    return { ...attachment, localStatus: 'available' };
  }

  if (uri) {
    const exists = await fileExists(uri);
    if (exists) {
      return { ...attachment, localStatus: 'available' };
    }
  }

  if (attachment.cloudKey) {
    const config = await loadWebDavConfig();
    if (!config?.url) return null;
    const baseSyncUrl = getBaseSyncUrl(config.url);
    const attachmentsDir = await getAttachmentsDir();
    if (!attachmentsDir) return null;
    const filename = attachment.cloudKey.split('/').pop() || `${attachment.id}${extractExtension(attachment.title)}`;
    const targetUri = `${attachmentsDir}${filename}`;
    const existing = await fileExists(targetUri);
    if (existing) {
      return { ...attachment, uri: targetUri, localStatus: 'available' };
    }
    try {
      const data = await webdavGetFile(`${baseSyncUrl}/${attachment.cloudKey}`, {
        username: config.username,
        password: config.password,
      });
      const bytes = data instanceof ArrayBuffer ? new Uint8Array(data) : new Uint8Array(data as ArrayBuffer);
      const base64 = bytesToBase64(bytes);
      await FileSystem.writeAsStringAsync(targetUri, base64, { encoding: FileSystem.EncodingType.Base64 });
      return { ...attachment, uri: targetUri, localStatus: 'available' };
    } catch (error) {
      console.warn(`Failed to download attachment ${attachment.title}`, error);
      return null;
    }
  }

  return null;
};
