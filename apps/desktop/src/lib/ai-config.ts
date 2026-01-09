import type { AIProviderId } from '@mindwtr/core';
import { buildAIConfig, buildCopilotConfig } from '@mindwtr/core';

const AI_KEY_PREFIX = 'mindwtr-ai-key:';
const AI_SECRET_KEY = 'mindwtr-ai-key-secret';

const getSessionSecret = (): Uint8Array | null => {
    if (typeof sessionStorage === 'undefined') return null;
    const existing = sessionStorage.getItem(AI_SECRET_KEY);
    if (existing) {
        try {
            return base64ToBytes(existing);
        } catch {
            sessionStorage.removeItem(AI_SECRET_KEY);
        }
    }
    if (typeof crypto === 'undefined' || !crypto.getRandomValues) return null;
    const bytes = new Uint8Array(32);
    crypto.getRandomValues(bytes);
    sessionStorage.setItem(AI_SECRET_KEY, bytesToBase64(bytes));
    return bytes;
};

const bytesToBase64 = (bytes: Uint8Array): string => {
    let binary = '';
    bytes.forEach((b) => {
        binary += String.fromCharCode(b);
    });
    return btoa(binary);
};

const base64ToBytes = (value: string): Uint8Array => {
    const binary = atob(value);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
};

const xorBytes = (data: Uint8Array, key: Uint8Array): Uint8Array => {
    const out = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i += 1) {
        out[i] = data[i] ^ key[i % key.length];
    }
    return out;
};

export function loadAIKey(provider: AIProviderId): string {
    if (typeof localStorage === 'undefined') return '';
    const stored = localStorage.getItem(`${AI_KEY_PREFIX}${provider}`);
    if (!stored) return '';
    const secret = getSessionSecret();
    if (!secret) return '';
    try {
        const bytes = xorBytes(base64ToBytes(stored), secret);
        return new TextDecoder().decode(bytes);
    } catch {
        return '';
    }
}

export function saveAIKey(provider: AIProviderId, value: string): void {
    if (typeof localStorage === 'undefined') return;
    const key = `${AI_KEY_PREFIX}${provider}`;
    if (!value) {
        localStorage.removeItem(key);
        return;
    }
    const secret = getSessionSecret();
    if (!secret) {
        localStorage.removeItem(key);
        return;
    }
    const bytes = new TextEncoder().encode(value);
    const encrypted = xorBytes(bytes, secret);
    localStorage.setItem(key, bytesToBase64(encrypted));
}

export { buildAIConfig, buildCopilotConfig };
