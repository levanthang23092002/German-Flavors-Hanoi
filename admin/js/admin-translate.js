/**
 * Best-effort translate. Never throws — save must always work.
 * Failed fields keep previous translation, or fall back to source text.
 */
(function (global) {
    var CACHE = {};

    function cacheKey(text, from, to) {
        return from + '|' + to + '|' + text;
    }

    function sleep(ms) {
        return new Promise(function (resolve) { setTimeout(resolve, ms); });
    }

    function shouldSkipTranslate(text) {
        var s = String(text || '').trim();
        if (!s) return true;
        if (/^https?:\/\//i.test(s)) return true;
        if (/^img\//i.test(s)) return true;
        if (/^[\d\s\+\-\(\)\.]+$/.test(s)) return true;
        return false;
    }

    function translateViaGoogle(text, from, to) {
        var url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' +
            encodeURIComponent(from) + '&tl=' + encodeURIComponent(to) + '&dt=t&q=' + encodeURIComponent(text);
        return fetch(url)
            .then(function (res) {
                if (!res.ok) throw new Error('gtx');
                return res.json();
            })
            .then(function (data) {
                if (!data || !data[0]) throw new Error('gtx');
                var out = data[0].map(function (row) { return row[0] || ''; }).join('');
                if (!String(out).trim()) throw new Error('gtx');
                return out;
            });
    }

    function translateViaMyMemory(text, from, to) {
        var url = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(text) +
            '&langpair=' + encodeURIComponent(from + '|' + to);
        return fetch(url)
            .then(function (res) { return res.json(); })
            .then(function (data) {
                var out = data && data.responseData && data.responseData.translatedText;
                if (!out || /INVALID|QUERY LENGTH|MYMEMORY WARNING/i.test(out)) throw new Error('mm');
                return out;
            });
    }

    function translateText(text, from, to) {
        text = text == null ? '' : String(text);
        if (!text.trim() || from === to || shouldSkipTranslate(text)) {
            return Promise.resolve(text);
        }
        var key = cacheKey(text, from, to);
        if (CACHE[key] != null) return Promise.resolve(CACHE[key]);

        return translateViaGoogle(text, from, to)
            .catch(function () { return sleep(150).then(function () { return translateViaMyMemory(text, from, to); }); })
            .catch(function () { return text; }) // soft fallback — never throw
            .then(function (out) {
                CACHE[key] = out;
                return out;
            });
    }

    /**
     * Build {en,vi,de} from source.
     * previousPack: optional old {en,vi,de} to keep when a field fails to translate.
     */
    function expandLangPack(sourceObj, keys, sourceLang, options) {
        var opts = options || {};
        var skipKeys = {};
        (opts.skipKeys || []).forEach(function (k) { skipKeys[k] = true; });
        var prev = opts.previousPack || {};
        var langs = ['en', 'vi', 'de'];
        var pack = { en: {}, vi: {}, de: {} };

        pack[sourceLang] = {};
        keys.forEach(function (k) {
            pack[sourceLang][k] = sourceObj[k] == null ? '' : String(sourceObj[k]);
        });

        var chain = Promise.resolve();
        langs.forEach(function (lang) {
            if (lang === sourceLang) return;
            chain = chain.then(function () {
                var result = {};
                var inner = Promise.resolve();
                keys.forEach(function (key) {
                    inner = inner.then(function () {
                        var srcVal = sourceObj[key] == null ? '' : String(sourceObj[key]);
                        if (skipKeys[key]) {
                            result[key] = srcVal;
                            return;
                        }
                        return translateText(srcVal, sourceLang, lang).then(function (val) {
                            // If API returned same long source text, prefer previous translation
                            var prevVal = prev[lang] && prev[lang][key];
                            if (val === srcVal && prevVal && prevVal !== srcVal && srcVal.length > 8) {
                                result[key] = prevVal;
                            } else {
                                result[key] = val;
                            }
                        }).then(function () { return sleep(80); });
                    });
                });
                return inner.then(function () {
                    pack[lang] = result;
                });
            });
        });

        return chain.then(function () { return pack; });
    }

    global.AdminTranslate = {
        translateText: translateText,
        expandLangPack: expandLangPack,
        clearCache: function () { CACHE = {}; }
    };
})(window);
