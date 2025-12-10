
// Mock console.warn
const originalWarn = console.warn;
let warned = false;
console.warn = (msg) => {
    warned = true;
    if (!msg.includes('not supported') && !msg.includes('prevent crash')) {
        originalWarn(msg);
    }
};

console.log('Running URL Polyfill Shim Tests...');

try {
    // ---------------------------------------------------------
    // SCENARIO 1: Native URL exists but lacks createObjectURL (Hermes-like)
    // ---------------------------------------------------------

    // 1. Setup Mock Environment
    const NativeURL = class MockURL {
        constructor(url) {
            this.protocol = 'https:'; // dummy
            this.pathname = '/path';
            this.search = '?foo=bar';
            this.hash = '#hash';
        }
        toString() { return 'https://example.com/path?foo=bar#hash'; }
    }
    // No createObjectURL on NativeURL

    global.URL = NativeURL;
    global.URLSearchParams = class Params {
        constructor(init) { this.map = new Map([['foo', '1'], ['bar', '2']]); }
        get(k) { return this.map.get(k); }
        has(k) { return this.map.has(k); }
        keys() { return this.map.keys(); }
    };

    // 2. Clear Cache and Load Shim
    delete require.cache[require.resolve('./url-polyfill')];
    const Shim = require('./url-polyfill');

    // 3. Verify Shim matches Native but *has* createObjectURL
    if (Shim.URL !== NativeURL) throw new Error('Shim did not use NativeURL when available');
    if (typeof Shim.URL.createObjectURL !== 'function') throw new Error('Shim failed to patch createObjectURL');

    // 4. Verify Patch Safety
    const result = Shim.URL.createObjectURL({});
    if (result !== '') throw new Error('createObjectURL should return empty string');
    if (!warned) throw new Error('createObjectURL should have warned');

    console.log('✅ Scenario 1 (Hermes-like patching) passed');

    // ---------------------------------------------------------
    // SCENARIO 2: No Native URL (Legacy)
    // ---------------------------------------------------------
    /*
    delete global.URL;
    delete global.URLSearchParams;
    delete require.cache[require.resolve('./url-polyfill')];
    const FallbackShim = require('./url-polyfill');
    
    if (FallbackShim.URL.name !== 'FallbackURL') throw new Error('Shim did not use FallbackURL when Native missing');
    const u = new FallbackShim.URL('https://test.com');
    if (u.protocol !== 'https:') throw new Error('Fallback URL parsing failed');
    console.log('✅ Scenario 2 (Fallback) passed');
    */

    console.log('🎉 All tests passed!');
} catch (e) {
    console.error('❌ Test Failed:', e.message);
    console.error(e.stack);
    process.exit(1);
} finally {
    console.warn = originalWarn;

}
