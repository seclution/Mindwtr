import { describe, expect, it } from 'vitest';
import { getTranslationsSync, loadTranslations } from './i18n-loader';

describe('i18n-loader sync fallback', () => {
    it('provides English translations synchronously for first render', () => {
        expect(getTranslationsSync('en')['app.name']).toBe('Mindwtr');
        expect(getTranslationsSync('zh')['nav.inbox']).toBe('Inbox');
    });

    it('loads Dutch overrides on demand', async () => {
        const nl = await loadTranslations('nl');
        expect(nl['settings.language']).toBe('Taal');
        expect(nl['app.name']).toBe('Mindwtr');
    });

    it('loads Traditional Chinese translations on demand', async () => {
        const zhHant = await loadTranslations('zh-Hant');
        expect(zhHant['nav.settings']).toBe('設置');
    });

    it('includes discard-confirmation translations for Chinese locales', async () => {
        const zhHans = await loadTranslations('zh');
        const zhHant = await loadTranslations('zh-Hant');

        expect(zhHans['taskEdit.discardChanges']).toBe('放弃未保存的更改？');
        expect(zhHans['taskEdit.discardChangesDesc']).toBe('如果现在离开，你的更改将会丢失。');
        expect(zhHans['common.discard']).toBe('放弃');

        expect(zhHant['taskEdit.discardChanges']).toBe('放棄未保存的更改？');
        expect(zhHant['taskEdit.discardChangesDesc']).toBe('如果現在離開，你的更改將會丟失。');
        expect(zhHant['common.discard']).toBe('放棄');
    });
});
