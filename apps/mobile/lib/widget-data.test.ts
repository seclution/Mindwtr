import { describe, expect, it } from 'vitest';
import type { AppData } from '@mindwtr/core';
import { buildWidgetPayload, resolveWidgetLanguage } from './widget-data';

const baseData: AppData = {
    tasks: [],
    projects: [],
    areas: [],
    sections: [],
    settings: {},
};

describe('widget-data', () => {
    it('resolves widget language with fallback', () => {
        expect(resolveWidgetLanguage('zh', undefined)).toBe('zh');
        expect(resolveWidgetLanguage('unknown', undefined)).toBe('en');
        expect(resolveWidgetLanguage(null, 'es')).toBe('es');
    });

    it('builds payload with focused tasks first', () => {
        const now = new Date().toISOString();
        const data: AppData = {
            ...baseData,
            tasks: [
                { id: '1', title: 'Focused', status: 'next', isFocusedToday: true, tags: [], contexts: [], createdAt: now, updatedAt: now },
                { id: '2', title: 'Next', status: 'next', isFocusedToday: false, tags: [], contexts: [], createdAt: now, updatedAt: now },
                { id: '3', title: 'Inbox', status: 'inbox', isFocusedToday: false, tags: [], contexts: [], createdAt: now, updatedAt: now },
            ],
        };
        const payload = buildWidgetPayload(data, 'en');
        expect(payload.headerTitle).toBeTruthy();
        expect(payload.items[0]?.title).toBe('Focused');
        expect(payload.inboxCount).toBe(1);
    });
});
