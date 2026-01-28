import { vi } from 'vitest';

// Minimal globals for Expo modules in node test env.
// @ts-ignore
globalThis.__DEV__ = false;
// @ts-ignore
globalThis.expo = globalThis.expo ?? {
  EventEmitter: class {
    addListener() {
      return { remove: () => {} };
    }
    removeAllListeners() {}
    emit() {}
  },
  modules: {},
};

vi.mock('expo-av', () => ({
  Audio: {
    setAudioModeAsync: vi.fn().mockResolvedValue(undefined),
    Sound: {
      createAsync: vi.fn().mockResolvedValue({
        sound: {
          playAsync: vi.fn(),
          stopAsync: vi.fn(),
          unloadAsync: vi.fn(),
        },
        status: {},
      }),
    },
  },
}));

vi.mock('expo-file-system', () => ({
  Directory: {
    cache: 'cache',
    document: 'document',
  },
  File: class {},
  Paths: {
    cache: 'cache',
    document: 'document',
  },
}));

vi.mock('expo-file-system/legacy', () => ({
  documentDirectory: 'document',
  cacheDirectory: 'cache',
  StorageAccessFramework: {
    readDirectoryAsync: vi.fn().mockResolvedValue([]),
    makeDirectoryAsync: vi.fn().mockResolvedValue('content://attachments'),
    createFileAsync: vi.fn().mockResolvedValue('content://attachments/file'),
    readAsStringAsync: vi.fn().mockResolvedValue(''),
    writeAsStringAsync: vi.fn().mockResolvedValue(undefined),
  },
  EncodingType: {
    Base64: 'base64',
  },
  getInfoAsync: vi.fn().mockResolvedValue({ exists: false }),
  makeDirectoryAsync: vi.fn().mockResolvedValue(undefined),
  readAsStringAsync: vi.fn().mockResolvedValue(''),
  writeAsStringAsync: vi.fn().mockResolvedValue(undefined),
  readDirectoryAsync: vi.fn().mockResolvedValue([]),
  deleteAsync: vi.fn().mockResolvedValue(undefined),
  copyAsync: vi.fn().mockResolvedValue(undefined),
  moveAsync: vi.fn().mockResolvedValue(undefined),
}));
