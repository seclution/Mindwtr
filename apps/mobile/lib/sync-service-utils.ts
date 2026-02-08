import { sanitizeLogMessage } from './app-log';

const SYNC_FILE_NAME = 'data.json';
const LEGACY_SYNC_FILE_NAME = 'mindwtr-sync.json';

export type SyncBackend = 'file' | 'webdav' | 'cloud' | 'off';

export const formatSyncErrorMessage = (error: unknown, backend: SyncBackend): string => {
  const raw = sanitizeLogMessage(String(error));
  if (backend !== 'webdav') return raw;

  const status = typeof error === 'object' && error !== null && 'status' in error
    ? Number((error as { status?: unknown }).status)
    : undefined;
  const unauthorized = status === 401 || /\(401\)/.test(raw) || /\b401\b/.test(raw);
  if (unauthorized) {
    return 'WebDAV unauthorized (401). Check folder URL, username, and app password.';
  }
  if (raw.includes('WebDAV URL not configured')) {
    return 'WebDAV folder URL is not configured. Save WebDAV settings first.';
  }
  return raw;
};

export const isSyncFilePath = (path: string) =>
  path.endsWith(`/${SYNC_FILE_NAME}`) || path.endsWith(`/${LEGACY_SYNC_FILE_NAME}`);

export const getFileSyncBaseDir = (syncPath: string) => {
  const trimmed = syncPath.replace(/\/+$/, '');
  if (isSyncFilePath(trimmed)) {
    return trimmed.replace(/\/[^/]+$/, '');
  }
  return trimmed;
};

export const resolveBackend = (value: string | null): SyncBackend => {
  switch (value) {
    case 'webdav':
    case 'cloud':
    case 'off':
    case 'file':
      return value;
    default:
      return 'file';
  }
};
