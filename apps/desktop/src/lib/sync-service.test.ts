import { describe, expect, it } from 'vitest';
import { getFileSyncDir, hashString, normalizeSyncBackend } from './sync-service-utils';

describe('sync-service test utils', () => {
    it('normalizes known sync backends and defaults unknown values to off', () => {
        expect(normalizeSyncBackend('file')).toBe('file');
        expect(normalizeSyncBackend('webdav')).toBe('webdav');
        expect(normalizeSyncBackend('cloud')).toBe('cloud');
        expect(normalizeSyncBackend('off')).toBe('off');
        expect(normalizeSyncBackend('unknown')).toBe('off');
        expect(normalizeSyncBackend(null)).toBe('off');
    });

    it('extracts base directory for file sync paths', () => {
        expect(getFileSyncDir('/tmp/mindwtr/data.json', 'data.json', 'mindwtr-sync.json')).toBe('/tmp/mindwtr');
        expect(getFileSyncDir('/tmp/mindwtr/mindwtr-sync.json', 'data.json', 'mindwtr-sync.json')).toBe('/tmp/mindwtr');
        expect(getFileSyncDir('/tmp/mindwtr/', 'data.json', 'mindwtr-sync.json')).toBe('/tmp/mindwtr');
        expect(getFileSyncDir('', 'data.json', 'mindwtr-sync.json')).toBe('');
    });

    it('hashes sync payloads with sha256 output', async () => {
        const hash = await hashString('mindwtr');
        expect(hash).toBe('feb7a7b01b1c68e586e77288a4b2598d146ee3696ec7dbfac0074196b8d68c33');
    });
});
