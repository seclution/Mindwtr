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
