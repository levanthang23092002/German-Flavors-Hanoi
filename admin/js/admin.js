(function () {
    var LANGS = [
        { code: 'en', label: 'English', short: 'EN' },
        { code: 'vi', label: 'Tiếng Việt', short: 'VI' },
        { code: 'de', label: 'Deutsch', short: 'DE' }
    ];

    var ABOUT_KEYS = ['p1', 'quote', 'p2', 'p3', 'p4', 'p5'];
    var SPECIAL_KEYS = ['tag', 'title', 'desc', 'btn'];
    var META_KEYS = ['title', 'desc'];
    var HERO_KEYS = ['kicker', 'title', 'lead', 'ev', 'cat', 'bday', 'del', 'btnServices', 'btnCatering'];
    var HERO_BAR_COUNT = 4;
    var HERO_BAR_LABEL_KEYS = ['label'];
    // Chỉ field hiển thị trên card dịch vụ (popup chi tiết đã tắt)
    var SERVICE_TEXT_KEYS = ['badge', 'cat', 'title', 'desc', 'tag'];
    var TESTIMONIAL_TEXT_KEYS = ['name', 'role', 'text'];

    var state = {
        site: null,
        about: null,
        special: null,
        services: null,
        testimonials: null,
        // One language for both admin UI + content you are typing
        lang: localStorage.getItem('gf-admin-lang') || localStorage.getItem('gf-content-lang') || 'vi',
        currentSection: 'hero',
        modalType: null,
        modalMode: 'add',
        modalItemId: null
    };

    Object.defineProperty(state, 'uiLang', {
        get: function () { return state.lang; },
        set: function (v) { state.lang = v; }
    });
    Object.defineProperty(state, 'sourceLang', {
        get: function () { return state.lang; },
        set: function (v) { state.lang = v; }
    });

    var db = null;

    function $(id) { return document.getElementById(id); }

    function t(key) {
        window.ADMIN_EDIT_LANG = state.uiLang;
        return adminT(key);
    }

    function toast(msg) {
        var el = $('statusBar');
        el.textContent = msg;
        el.classList.add('show');
        clearTimeout(toast._t);
        toast._t = setTimeout(function () { el.classList.remove('show'); }, 3200);
    }

    function showAlert(type, msg) {
        var el = $('saveAlert');
        el.className = 'alert show alert-' + type;
        el.textContent = msg;
        setTimeout(function () { el.classList.remove('show'); }, 6000);
    }

    function clone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    function uid(prefix) {
        return (prefix || 'id') + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    }

    function langInfo(code) {
        return LANGS.filter(function (l) { return l.code === code; })[0] || LANGS[0];
    }

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    function escapeAttr(str) {
        return escapeHtml(str).replace(/"/g, '&quot;');
    }

    function val(id) {
        var el = $(id);
        return el ? el.value : '';
    }

    function setVal(id, v) {
        var el = $(id);
        if (el) el.value = v == null ? '' : v;
    }

    function pickLang(obj, lang) {
        if (!obj) return {};
        return obj[lang] || obj.vi || obj.en || obj.de || {};
    }

    function slugify(str) {
        return String(str || '')
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9\s\-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '') || uid('svc');
    }

    function applyAdminUi() {
        window.ADMIN_EDIT_LANG = state.uiLang;
        document.documentElement.lang = state.uiLang;

        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            if (el.id === 'pageTitle') return;
            var text = t(el.getAttribute('data-i18n'));
            if (text) el.textContent = text;
        });
        document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
            el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
        });

        $('pageTitle').textContent = t('titles.' + state.currentSection);
        document.querySelectorAll('#globalLangTabs .lang-tab').forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === state.lang);
        });

        updateSaveButtonVisibility();
        updateTopbarForSection();
        if (window.AdminUsers && AdminUsers.refresh) AdminUsers.refresh();
        if (window.AdminCloudinary && AdminCloudinary.refresh) AdminCloudinary.refresh();
        var reloadBtn = $('reloadBtn');
        if (reloadBtn) reloadBtn.innerHTML = '<i class="fas fa-sync"></i> <span>' + t('reload') + '</span>';
        var addSvc = $('addServiceBtn');
        if (addSvc) addSvc.innerHTML = '<i class="fas fa-plus"></i> <span>' + t('addService') + '</span>';
        var addTes = $('addTestimonialBtn');
        if (addTes) addTes.innerHTML = '<i class="fas fa-plus"></i> <span>' + t('addTestimonial') + '</span>';
        var accountsPwdBtn = $('accountsUpdatePwdBtn');
        if (accountsPwdBtn) accountsPwdBtn.innerHTML = '<i class="fas fa-lock"></i> <span>' + t('usersUpdatePwd') + '</span>';
        var accountsAddBtn = $('accountsAddAdminBtn');
        if (accountsAddBtn) accountsAddBtn.innerHTML = '<i class="fas fa-user-plus"></i> <span>' + t('usersAddAdmin') + '</span>';
    }

    function updateSaveButtonVisibility() {
        var saveBtn = $('saveBtn');
        if (!saveBtn) return;
        var hideActions = state.currentSection === 'services' ||
            state.currentSection === 'testimonials' ||
            state.currentSection === 'accounts';
        saveBtn.style.display = hideActions ? 'none' : '';
        if (!saveBtn.disabled && !hideActions) {
            saveBtn.innerHTML = '<i class="fas fa-save"></i> <span>' + t('save') + '</span>';
        }
    }

    function updateTopbarForSection() {
        var reloadBtn = $('reloadBtn');
        var saveBtn = $('saveBtn');
        var langBlock = document.querySelector('.lang-switch-block');
        var defaultBtns = $('defaultTopbarBtns');
        var accountsBtns = $('accountsTopbarBtns');
        var isAccounts = state.currentSection === 'accounts';

        if (reloadBtn) reloadBtn.style.display = isAccounts ? 'none' : '';
        if (saveBtn) saveBtn.style.display = isAccounts ? 'none' : '';
        if (langBlock) langBlock.style.display = isAccounts ? 'none' : '';
        if (defaultBtns) defaultBtns.hidden = isAccounts;
        if (accountsBtns) accountsBtns.hidden = !isAccounts;
    }

    function normalizeTel(str) {
        var s = String(str || '').trim();
        if (!s) return '';
        var cleaned = s.replace(/[^\d+]/g, '');
        if (cleaned.charAt(0) === '+') return cleaned;
        if (/^84/.test(cleaned)) return '+' + cleaned;
        return cleaned;
    }

    function renderStars(rating) {
        var n = Math.min(5, Math.max(1, parseInt(rating, 10) || 5));
        var html = '';
        for (var i = 0; i < n; i++) html += '<i class="fas fa-star"></i>';
        return html;
    }

    /** Same markup as cms-content.js renderServices (visible card only) */
    function buildPublicServiceCardHtml(item, lang) {
        var txt = pickLang(item, lang);
        return (
            '<div class="mcard"' +
            ' data-img="' + escapeAttr(item.image || '') + '"' +
            ' data-title="' + escapeAttr(txt.title || '') + '"' +
            ' data-cat="' + escapeAttr(txt.cat || '') + '">' +
            '<div class="mimg">' +
            '<img src="' + escapeAttr(item.image || '') + '" alt="' + escapeAttr(txt.title || '') + '"/>' +
            '<div class="mbdg">' + escapeHtml(txt.badge || '') + '</div>' +
            '<div class="mhrt"><i class="far fa-heart"></i></div>' +
            '</div>' +
            '<div class="mbody">' +
            '<div class="mcat">' + escapeHtml(txt.cat || '') + '</div>' +
            '<div class="mtit">' + escapeHtml(txt.title || '') + '</div>' +
            '<div class="mdesc">' + escapeHtml(txt.desc || '') + '</div>' +
            '<div class="mfoot">' +
            '<div class="mstars"><i class="fas fa-star"></i> <span class="mstars-tag">' + escapeHtml(txt.tag || '') + '</span></div>' +
            '</div></div></div>'
        );
    }

    /** Same markup as cms-content.js renderTestimonials */
    function buildPublicTestimonialCardHtml(item, lang) {
        var txt = pickLang(item, lang);
        return (
            '<div class="tescard">' +
            '<div class="tesq">"</div>' +
            '<div class="tess">' + renderStars(item.rating) + '</div>' +
            '<p class="testxt">' + escapeHtml(txt.text || '') + '</p>' +
            '<div class="tesauth">' +
            '<div class="tesnm">' + escapeHtml(txt.name || '') + '</div>' +
            '<div class="tesrl">' + escapeHtml(txt.role || '') + '</div>' +
            '</div></div>'
        );
    }

    function bindPreviewActions(wrap, type, itemId) {
        var editBtn = wrap.querySelector('.js-edit-item');
        var delBtn = wrap.querySelector('.js-del-item');
        if (editBtn) {
            editBtn.addEventListener('click', function () {
                openItemModal(type, 'edit', itemId);
            });
        }
        if (delBtn) {
            delBtn.addEventListener('click', function () {
                if (type === 'service') deleteServiceItem(itemId);
                else deleteTestimonialItem(itemId);
            });
        }
    }

    function findServiceItem(id) {
        return (state.services.items || []).filter(function (x) { return x.id === id; })[0] || null;
    }

    function findTestimonialItem(id) {
        return (state.testimonials.items || []).filter(function (x) { return x.id === id; })[0] || null;
    }

    function buildLangTabs(containerId, activeCode, onPick) {
        var tabs = $(containerId);
        if (!tabs) return;
        tabs.innerHTML = '';
        LANGS.forEach(function (lang) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'lang-tab' + (activeCode === lang.code ? ' active' : '');
            btn.setAttribute('data-lang', lang.code);
            btn.textContent = lang.label;
            btn.addEventListener('click', function () { onPick(lang.code); });
            tabs.appendChild(btn);
        });
    }

    function switchLang(code) {
        if (code === state.lang) return;
        // Chỉ đổi ngôn ngữ hiển thị — không gọi API dịch (tránh lỗi)
        collectIntoSourceLang();
        state.lang = code;
        localStorage.setItem('gf-admin-lang', code);
        localStorage.setItem('gf-content-lang', code);
        if (state.site) state.site.sourceLang = code;
        renderContentForms();
        applyAdminUi();
        toast(t('contentSourceChanged').split('{lang}').join(langInfo(code).label));
    }

    /* ---------- Render content (single source) ---------- */

    function defaultHeroBarItems() {
        return clone((CMS_DEFAULTS.site.heroBar && CMS_DEFAULTS.site.heroBar.items) || []);
    }

    function normalizeHeroBar(site) {
        var defaults = defaultHeroBarItems();
        if (!site.heroBar || !site.heroBar.items) {
            site.heroBar = { items: defaults };
            return;
        }
        var items = [];
        for (var i = 0; i < HERO_BAR_COUNT; i++) {
            var d = defaults[i] || { value: '', en: { label: '' }, vi: { label: '' }, de: { label: '' } };
            var prev = site.heroBar.items[i] || {};
            items.push({
                value: prev.value != null && prev.value !== '' ? prev.value : d.value,
                en: { label: (prev.en && prev.en.label) || d.en.label },
                vi: { label: (prev.vi && prev.vi.label) || d.vi.label },
                de: { label: (prev.de && prev.de.label) || d.de.label }
            });
        }
        site.heroBar = { items: items };
    }

    function normalizeHero(site) {
        var defaults = (CMS_DEFAULTS.site && CMS_DEFAULTS.site.hero) || {};
        if (!site.hero) site.hero = clone(defaults);
        if (!site.hero.image) site.hero.image = defaults.image || '';
        ['en', 'vi', 'de'].forEach(function (lang) {
            if (!site.hero[lang]) site.hero[lang] = clone(defaults[lang] || {});
        });
    }

    function normalizeSite(site) {
        if (!site) return;
        normalizeHero(site);
        normalizeHeroBar(site);
    }

    function renderHeroBarValues() {
        if (!$('site-hero-0-value')) return;
        var items = (state.site.heroBar && state.site.heroBar.items) || defaultHeroBarItems();
        for (var i = 0; i < HERO_BAR_COUNT; i++) {
            setVal('site-hero-' + i + '-value', (items[i] && items[i].value) || '');
        }
    }

    function renderHeroBarLabels() {
        if (!$('site-hero-0-label')) return;
        var lang = state.sourceLang;
        var items = (state.site.heroBar && state.site.heroBar.items) || defaultHeroBarItems();
        for (var i = 0; i < HERO_BAR_COUNT; i++) {
            var pack = pickLang(items[i] || {}, lang);
            setVal('site-hero-' + i + '-label', pack.label || '');
        }
    }

    function renderHeroForm() {
        if (!$('site-hero-title')) return;
        var hero = state.site.hero || clone(CMS_DEFAULTS.site.hero || {});
        setVal('site-hero-image', hero.image || '');
        var preview = $('site-hero-imagePreview');
        if (preview) preview.src = hero.image || '';
        var pack = pickLang(hero, state.sourceLang);
        setVal('site-hero-kicker', pack.kicker || '');
        setVal('site-hero-title', pack.title || '');
        setVal('site-hero-lead', pack.lead || '');
        setVal('site-hero-ev', pack.ev || '');
        setVal('site-hero-cat', pack.cat || '');
        setVal('site-hero-bday', pack.bday || '');
        setVal('site-hero-del', pack.del || '');
        setVal('site-hero-btnServices', pack.btnServices || '');
        setVal('site-hero-btnCatering', pack.btnCatering || '');
    }

    function renderHeroSection() {
        renderHeroForm();
        renderHeroBarValues();
        renderHeroBarLabels();
    }

    function renderSiteCommon() {
        var s = state.site;
        setVal('site-location', s.location);
        setVal('site-phoneBjoern', s.phoneBjoernDisplay || s.phoneBjoern);
        setVal('site-phoneThuy', s.phoneThuyDisplay || s.phoneThuy);
        setVal('site-whatsapp', s.whatsapp);
        setVal('site-zalo', s.zalo);
        setVal('site-facebook', s.facebook);

        var lang = state.sourceLang;
        var meta = pickLang(s.meta, lang);
        setVal('site-meta-title', meta.title);
        setVal('site-meta-desc', meta.desc);
    }

    function renderContentForms() {
        var lang = state.sourceLang;

        renderHeroSection();
        renderSpecialForm();

        renderAboutImage();

        if ($('site-meta-title')) {
            var meta = pickLang(state.site.meta, lang);
            setVal('site-meta-title', meta.title);
            setVal('site-meta-desc', meta.desc);
        }

        var about = pickLang(state.about, lang);
        var aboutBox = $('about-fields');
        aboutBox.innerHTML = ABOUT_KEYS.map(function (key) {
            var label = t('aboutFields.' + key);
            var v = about[key] == null ? '' : String(about[key]);
            return '<div class="field"><label>' + label + '</label><textarea id="about-' + key + '">' + escapeHtml(v) + '</textarea></div>';
        }).join('');

        renderServicesList();
        renderTestimonialsList();
    }

    function renderServicesList() {
        var list = $('services-list');
        var lang = state.sourceLang;
        var items = (state.services.items || []).slice().sort(function (a, b) {
            return (a.order || 0) - (b.order || 0);
        });
        list.innerHTML = '';
        list.className = 'site-preview row g-4 justify-content-center';

        if (!items.length) {
            list.innerHTML = '<p class="preview-empty">' + escapeHtml(t('addService')) + '</p>';
            return;
        }

        items.forEach(function (item) {
            var wrap = document.createElement('div');
            wrap.className = 'col-sm-6 col-lg-4 mwrap admin-preview-wrap';
            wrap.setAttribute('data-id', item.id);
            wrap.innerHTML =
                buildPublicServiceCardHtml(item, lang) +
                '<div class="admin-preview-actions">' +
                '<button type="button" class="btn btn-sm btn-ghost js-edit-item"><i class="fas fa-pen"></i> ' + escapeHtml(t('editBtn')) + '</button>' +
                '<button type="button" class="btn btn-sm btn-danger js-del-item"><i class="fas fa-trash"></i></button>' +
                '</div>';
            bindPreviewActions(wrap, 'service', item.id);
            list.appendChild(wrap);
        });
    }

    function renderTestimonialsList() {
        var list = $('testimonials-list');
        var lang = state.sourceLang;
        var items = (state.testimonials.items || []).slice().sort(function (a, b) {
            return (a.order || 0) - (b.order || 0);
        });
        list.innerHTML = '';
        list.className = 'site-preview site-preview-testimonials row g-4 justify-content-center';

        if (!items.length) {
            list.innerHTML = '<p class="preview-empty">' + escapeHtml(t('addTestimonial')) + '</p>';
            return;
        }

        items.forEach(function (item) {
            var wrap = document.createElement('div');
            wrap.className = 'col-sm-6 col-lg-4 admin-preview-wrap';
            wrap.setAttribute('data-id', item.id);
            wrap.innerHTML =
                buildPublicTestimonialCardHtml(item, lang) +
                '<div class="admin-preview-actions">' +
                '<button type="button" class="btn btn-sm btn-ghost js-edit-item"><i class="fas fa-pen"></i> ' + escapeHtml(t('editBtn')) + '</button>' +
                '<button type="button" class="btn btn-sm btn-danger js-del-item"><i class="fas fa-trash"></i></button>' +
                '</div>';
            bindPreviewActions(wrap, 'testimonial', item.id);
            list.appendChild(wrap);
        });
    }

    function renderAboutImage() {
        if (!$('about-image')) return;
        var url = (state.about && state.about.image) ||
            (state.site && state.site.aboutImage) || '';
        setVal('about-image', url);
        var img = $('about-imagePreview');
        if (img) img.src = url;
    }

    function renderSpecialForm() {
        if (!$('special-tag')) return;
        var s = state.special || clone(CMS_DEFAULTS.special);
        setVal('special-image', s.image || '');
        var img = $('special-imagePreview');
        if (img) img.src = s.image || '';
        var pack = pickLang(s, state.sourceLang);
        setVal('special-tag', pack.tag || '');
        setVal('special-title', pack.title || '');
        setVal('special-desc', pack.desc || '');
        setVal('special-btn', pack.btn || '');
    }

    function renderAll() {
        applyAdminUi();
        renderHeroSection();
        renderSiteCommon();
        renderContentForms();
    }

    /* ---------- Collect into sourceLang only (before translate) ---------- */

    function collectSiteCommon() {
        var bjoern = val('site-phoneBjoern').trim();
        var thuy = val('site-phoneThuy').trim();
        state.site.location = val('site-location');
        state.site.phoneBjoernDisplay = bjoern;
        state.site.phoneBjoern = normalizeTel(bjoern);
        state.site.phoneThuyDisplay = thuy;
        state.site.phoneThuy = normalizeTel(thuy);
        state.site.whatsapp = val('site-whatsapp');
        state.site.zalo = val('site-zalo');
        state.site.facebook = val('site-facebook');
        state.site.sourceLang = state.sourceLang;
    }

    function collectHero() {
        if (!$('site-hero-title')) return;
        var heroLang = state.sourceLang;
        state.site.hero = state.site.hero || clone(CMS_DEFAULTS.site.hero || {});
        state.site.hero.image = val('site-hero-image');
        state.site.hero[heroLang] = {
            kicker: val('site-hero-kicker'),
            title: val('site-hero-title'),
            lead: val('site-hero-lead'),
            ev: val('site-hero-ev'),
            cat: val('site-hero-cat'),
            bday: val('site-hero-bday'),
            del: val('site-hero-del'),
            btnServices: val('site-hero-btnServices'),
            btnCatering: val('site-hero-btnCatering')
        };

        if (!$('site-hero-0-value')) return;
        var lang = state.sourceLang;
        var prevItems = (state.site.heroBar && state.site.heroBar.items) || defaultHeroBarItems();
        var items = [];
        for (var i = 0; i < HERO_BAR_COUNT; i++) {
            var prev = prevItems[i] || {};
            var item = {
                value: val('site-hero-' + i + '-value'),
                en: clone(prev.en || {}),
                vi: clone(prev.vi || {}),
                de: clone(prev.de || {})
            };
            item[lang] = { label: val('site-hero-' + i + '-label') };
            items.push(item);
        }
        state.site.heroBar = { items: items };
    }

    function collectIntoSourceLang() {
        var lang = state.sourceLang;
        var section = state.currentSection;

        if (section === 'site') {
            collectSiteCommon();
            if ($('site-meta-title')) {
                state.site.meta = state.site.meta || {};
                state.site.meta[lang] = {
                    title: val('site-meta-title'),
                    desc: val('site-meta-desc')
                };
            }
        }

        if (section === 'hero') {
            collectHero();
        }

        if (section === 'about') {
            state.about = state.about || {};
            state.about[lang] = {};
            ABOUT_KEYS.forEach(function (key) {
                state.about[lang][key] = val('about-' + key);
            });

            if ($('about-image')) {
                state.about.image = val('about-image');
            }
        }

        if (section === 'special' && $('special-tag')) {
            state.special = state.special || clone(CMS_DEFAULTS.special);
            state.special.image = val('special-image');
            state.special[lang] = {
                tag: val('special-tag'),
                title: val('special-title'),
                desc: val('special-desc'),
                btn: val('special-btn')
            };
        }
    }

    /* ---------- Expand translations then save (current section only) ---------- */

    function expandHeroBarFromSource() {
        var src = state.lang;
        var items = (state.site.heroBar && state.site.heroBar.items) || defaultHeroBarItems();
        var chain = Promise.resolve();
        var newItems = [];

        items.forEach(function (item) {
            chain = chain.then(function () {
                var labelSrc = { label: (item[src] && item[src].label) || '' };
                var prevPack = { en: item.en || {}, vi: item.vi || {}, de: item.de || {} };
                return AdminTranslate.expandLangPack(labelSrc, HERO_BAR_LABEL_KEYS, src, { previousPack: prevPack })
                    .then(function (pack) {
                        newItems.push({
                            value: item.value,
                            en: pack.en,
                            vi: pack.vi,
                            de: pack.de
                        });
                    });
            });
        });

        return chain.then(function () {
            state.site.heroBar = { items: newItems };
        });
    }

    function expandHeroFromSource() {
        var src = state.lang;
        var heroSrc = pickLang(state.site.hero, src);
        var prevHero = clone(state.site.hero || {});
        return AdminTranslate.expandLangPack(heroSrc, HERO_KEYS, src, { previousPack: prevHero })
            .then(function (heroPack) {
                var image = state.site.hero && state.site.hero.image;
                state.site.hero = heroPack;
                state.site.hero.image = image != null ? image : (CMS_DEFAULTS.site.hero && CMS_DEFAULTS.site.hero.image);
            });
    }

    function expandSiteFromSource() {
        var src = state.lang;
        var metaSrc = pickLang(state.site.meta, src);
        var prevMeta = clone((state.site && state.site.meta) || {});
        return AdminTranslate.expandLangPack(metaSrc, META_KEYS, src, { previousPack: prevMeta })
            .then(function (metaPack) {
                state.site.meta = metaPack;
                state.site.sourceLang = src;
            });
    }

    function expandHeroSection() {
        return expandHeroFromSource().then(function () {
            return expandHeroBarFromSource();
        });
    }

    function expandAboutFromSource() {
        var src = state.lang;
        var aboutSrc = pickLang(state.about, src);
        var prevAbout = clone(state.about || {});
        return AdminTranslate.expandLangPack(aboutSrc, ABOUT_KEYS, src, { previousPack: prevAbout })
            .then(function (aboutPack) {
                var image = state.about && state.about.image;
                state.about = aboutPack;
                state.about.image = image != null ? image : (CMS_DEFAULTS.about && CMS_DEFAULTS.about.image);
            });
    }

    function expandSpecialFromSource() {
        var src = state.lang;
        var specialSrc = pickLang(state.special, src);
        var prevSpecial = clone(state.special || {});
        return AdminTranslate.expandLangPack(specialSrc, SPECIAL_KEYS, src, { previousPack: prevSpecial })
            .then(function (specialPack) {
                var image = state.special && state.special.image;
                state.special = specialPack;
                state.special.image = image != null ? image : (CMS_DEFAULTS.special && CMS_DEFAULTS.special.image);
            });
    }

    function expandSection(section) {
        if (section === 'hero') return expandHeroSection();
        if (section === 'site') return expandSiteFromSource();
        if (section === 'about') return expandAboutFromSource();
        if (section === 'special') return expandSpecialFromSource();
        return Promise.resolve();
    }

    function normalizeServices(data) {
        if (!data) return clone(CMS_DEFAULTS.services);
        return { items: data.items || [] };
    }

    function normalizeTestimonials(data) {
        if (!data) return clone(CMS_DEFAULTS.testimonials);
        return { items: data.items || [] };
    }

    function normalizeAbout(data) {
        if (!data) return clone(CMS_DEFAULTS.about);
        var out = {
            image: data.image || (CMS_DEFAULTS.about && CMS_DEFAULTS.about.image) || ''
        };
        ['en', 'vi', 'de'].forEach(function (lang) {
            var src = data[lang] || {};
            out[lang] = {};
            ABOUT_KEYS.forEach(function (k) { out[lang][k] = src[k] || ''; });
        });
        return out;
    }

    function normalizeSpecial(data) {
        if (!data) return clone(CMS_DEFAULTS.special);
        var out = {
            image: data.image || (CMS_DEFAULTS.special && CMS_DEFAULTS.special.image) || ''
        };
        ['en', 'vi', 'de'].forEach(function (lang) {
            var src = data[lang] || {};
            out[lang] = {};
            SPECIAL_KEYS.forEach(function (k) { out[lang][k] = src[k] || ''; });
        });
        return out;
    }

    function loadContent() {
        return Promise.all([
            db.collection('content').doc('site').get(),
            db.collection('content').doc('about').get(),
            db.collection('content').doc('special').get(),
            db.collection('content').doc('services').get(),
            db.collection('content').doc('testimonials').get()
        ]).then(function (snaps) {
            state.site = snaps[0].exists ? snaps[0].data() : clone(CMS_DEFAULTS.site);
            normalizeSite(state.site);
            state.about = normalizeAbout(snaps[1].exists ? snaps[1].data() : null);
            if (state.site.aboutImage && !state.about.image) {
                state.about.image = state.site.aboutImage;
            }
            state.special = normalizeSpecial(snaps[2].exists ? snaps[2].data() : null);
            state.services = normalizeServices(snaps[3].exists ? snaps[3].data() : null);
            state.testimonials = normalizeTestimonials(snaps[4].exists ? snaps[4].data() : null);
            if (state.site.sourceLang && LANGS.some(function (l) { return l.code === state.site.sourceLang; })) {
                state.lang = state.site.sourceLang;
                localStorage.setItem('gf-admin-lang', state.lang);
                localStorage.setItem('gf-content-lang', state.lang);
            }
            renderAll();
        });
    }

    function writeSection(section) {
        if (section === 'hero' || section === 'site') {
            state.site.sourceLang = state.lang;
            return db.collection('content').doc('site').set(state.site);
        }
        if (section === 'about') {
            return db.collection('content').doc('about').set(state.about);
        }
        if (section === 'special') {
            return db.collection('content').doc('special').set(state.special);
        }
        if (section === 'services') {
            return db.collection('content').doc('services').set(state.services);
        }
        if (section === 'testimonials') {
            return db.collection('content').doc('testimonials').set(state.testimonials);
        }
        return Promise.resolve();
    }

    function writeFirestore() {
        state.site.sourceLang = state.lang;
        return Promise.all([
            db.collection('content').doc('site').set(state.site),
            db.collection('content').doc('about').set(state.about),
            db.collection('content').doc('special').set(state.special),
            db.collection('content').doc('services').set(state.services),
            db.collection('content').doc('testimonials').set(state.testimonials)
        ]);
    }

    function saveContent() {
        var section = state.currentSection;
        if (section === 'services' || section === 'testimonials') return Promise.resolve();
        collectIntoSourceLang();
        var btn = $('saveBtn');
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + t('translating');
        if (window.AdminTranslate && AdminTranslate.clearCache) AdminTranslate.clearCache();

        return expandSection(section)
            .catch(function () { /* ignore translate errors */ })
            .then(function () {
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + t('saving');
                return writeSection(section);
            })
            .then(function () {
                showAlert('ok', t('savedToast'));
                renderContentForms();
            })
            .catch(function (err) {
                showAlert('err', t('saveFail') + (err.message || err));
            })
            .finally(function () {
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-save"></i> <span>' + t('save') + '</span>';
            });
    }

    /* ---------- Item modal (add / edit one item) ---------- */

    function closeModal() {
        $('itemModal').hidden = true;
        document.body.style.overflow = '';
        state.modalType = null;
        state.modalMode = 'add';
        state.modalItemId = null;
        $('modalAlert').classList.remove('show');
        $('modalBody').innerHTML = '';
    }

    function buildImageFieldHtml(fieldOpts) {
        var id = fieldOpts.id;
        var previewId = fieldOpts.previewId || (id + 'Preview');
        var value = fieldOpts.value == null ? '' : String(fieldOpts.value);
        var placeholder = fieldOpts.placeholder || 'https://res.cloudinary.com/...';
        var required = fieldOpts.required ? ' required' : '';
        var label = fieldOpts.label || '';
        return (
            '<div class="field image-field">' +
            '<label>' + label + '</label>' +
            '<div class="image-field-row">' +
            '<input id="' + id + '" type="text" placeholder="' + escapeAttr(placeholder) + '" value="' + escapeAttr(value) + '"' +
            ' data-preview="' + previewId + '"' + required + '/>' +
            '<button type="button" class="btn btn-sm btn-ghost js-cloudinary-upload" data-input="' + id + '" data-preview="' + previewId + '">' +
            '<i class="fas fa-cloud-upload-alt"></i> <span>' + escapeHtml(t('cloudinaryUpload')) + '</span></button>' +
            '</div>' +
            '<img id="' + previewId + '" class="preview-img" alt="" src="' + escapeAttr(value) + '"/>' +
            '<p class="hint">' + escapeHtml(t('cloudinaryHint')) + '</p>' +
            '</div>'
        );
    }

    function buildModalFormHtml(type, item) {
        var lang = state.sourceLang;
        var txt = item ? pickLang(item, lang) : {};
        var html = '';
        if (type === 'service') {
            html = buildImageFieldHtml({
                id: 'm-svc-image',
                label: t('serviceFields.image') + ' *',
                value: item ? (item.image || '') : '',
                placeholder: 'https://res.cloudinary.com/...',
                required: true
            }) +
                SERVICE_TEXT_KEYS.map(function (key) {
                    var label = t('serviceFields.' + key) + ' *';
                    var v = txt[key] == null ? '' : String(txt[key]);
                    if (key === 'desc') {
                        return '<div class="field"><label>' + label + '</label><textarea id="m-svc-' + key + '" required>' + escapeHtml(v) + '</textarea></div>';
                    }
                    return '<div class="field"><label>' + label + '</label><input id="m-svc-' + key + '" type="text" value="' + escapeAttr(v) + '" required/></div>';
                }).join('');
        } else {
            html = '<div class="field"><label>' + t('testimonialFields.rating') + ' *</label>' +
                '<input id="m-tes-rating" type="number" min="1" max="5" value="' + (item ? (item.rating || 5) : 5) + '" required/></div>' +
                TESTIMONIAL_TEXT_KEYS.map(function (key) {
                    var label = t('testimonialFields.' + key) + ' *';
                    var v = txt[key] == null ? '' : String(txt[key]);
                    if (key === 'text') {
                        return '<div class="field"><label>' + label + '</label><textarea id="m-tes-' + key + '" required>' + escapeHtml(v) + '</textarea></div>';
                    }
                    return '<div class="field"><label>' + label + '</label><input id="m-tes-' + key + '" type="text" value="' + escapeAttr(v) + '" required/></div>';
                }).join('');
        }
        return html;
    }

    function openItemModal(type, mode, itemId) {
        state.modalType = type;
        state.modalMode = mode || 'add';
        state.modalItemId = itemId || null;
        var srcLabel = langInfo(state.sourceLang).label;
        var isEdit = state.modalMode === 'edit';

        if (isEdit) {
            var item = type === 'service' ? findServiceItem(itemId) : findTestimonialItem(itemId);
            if (!item) return;
            $('modalTitle').textContent = type === 'service' ? t('modalEditService') : t('modalEditTestimonial');
            $('modalBody').innerHTML = buildModalFormHtml(type, item);
        } else {
            $('modalTitle').textContent = type === 'service' ? t('modalAddService') : t('modalAddTestimonial');
            $('modalBody').innerHTML = buildModalFormHtml(type, null);
        }

        $('modalHint').textContent = (type === 'service' ? t('serviceModalHint') : t('modalAutoTranslateHint'))
            .replace('{lang}', srcLabel);
        $('modalSaveLabel').textContent = isEdit ? t('modalUpdate') : t('modalSave');
        $('modalCancelBtn').textContent = t('modalCancel');
        $('modalAlert').classList.remove('show');
        $('itemModal').hidden = false;
        document.body.style.overflow = 'hidden';
        if (window.AdminCloudinary && AdminCloudinary.refresh) AdminCloudinary.refresh();
    }

    function deleteServiceItem(id) {
        if (!confirm(t('confirmDeleteService'))) return;
        state.services.items = (state.services.items || []).filter(function (x) { return x.id !== id; });
        db.collection('content').doc('services').set(state.services)
            .then(function () {
                renderServicesList();
                toast(t('deletedService'));
            })
            .catch(function (err) {
                showAlert('err', t('saveFail') + (err.message || err));
            });
    }

    function deleteTestimonialItem(id) {
        if (!confirm(t('confirmDeleteTestimonial'))) return;
        state.testimonials.items = (state.testimonials.items || []).filter(function (x) { return x.id !== id; });
        db.collection('content').doc('testimonials').set(state.testimonials)
            .then(function () {
                renderTestimonialsList();
                toast(t('deletedTestimonial'));
            })
            .catch(function (err) {
                showAlert('err', t('saveFail') + (err.message || err));
            });
    }

    function validateModal() {
        var ok = true;
        var ids;
        if (state.modalType === 'service') {
            ids = ['m-svc-image'].concat(SERVICE_TEXT_KEYS.map(function (k) { return 'm-svc-' + k; }));
        } else {
            ids = ['m-tes-rating'].concat(TESTIMONIAL_TEXT_KEYS.map(function (k) { return 'm-tes-' + k; }));
        }
        ids.forEach(function (id) {
            var el = $(id);
            var empty = !el || !String(el.value).trim();
            if (el) el.classList.toggle('invalid', empty);
            if (empty) ok = false;
        });
        return ok;
    }

    function saveModalItem() {
        $('modalAlert').classList.remove('show');
        if (!validateModal()) {
            $('modalAlert').textContent = t('modalRequired');
            $('modalAlert').classList.add('show');
            return;
        }

        var src = state.sourceLang;
        var btn = $('modalSaveBtn');
        var isEdit = state.modalMode === 'edit';
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + t('translating');
        if (window.AdminTranslate && AdminTranslate.clearCache) AdminTranslate.clearCache();

        var promise;
        if (state.modalType === 'service') {
            var text = {};
            SERVICE_TEXT_KEYS.forEach(function (k) { text[k] = val('m-svc-' + k).trim(); });
            var image = val('m-svc-image').trim();

            if (isEdit) {
                var prevSvc = findServiceItem(state.modalItemId);
                if (!prevSvc) {
                    closeModal();
                    btn.disabled = false;
                    btn.innerHTML = '<i class="fas fa-save"></i> <span id="modalSaveLabel">' + t('modalUpdate') + '</span>';
                    return;
                }
                promise = AdminTranslate.expandLangPack(text, SERVICE_TEXT_KEYS, src, {
                    previousPack: { en: prevSvc.en, vi: prevSvc.vi, de: prevSvc.de }
                }).then(function (pack) {
                    var idx = state.services.items.findIndex(function (x) { return x.id === prevSvc.id; });
                    state.services.items[idx] = {
                        id: prevSvc.id,
                        order: prevSvc.order,
                        image: image,
                        en: pack.en,
                        vi: pack.vi,
                        de: pack.de
                    };
                    return db.collection('content').doc('services').set(state.services);
                });
            } else {
                var baseId = slugify(text.title);
                var id = baseId;
                var n = 2;
                while ((state.services.items || []).some(function (x) { return x.id === id; })) {
                    id = baseId + '-' + n;
                    n++;
                }
                promise = AdminTranslate.expandLangPack(text, SERVICE_TEXT_KEYS, src).then(function (pack) {
                    state.services.items.push({
                        id: id,
                        order: state.services.items.length,
                        image: image,
                        en: pack.en,
                        vi: pack.vi,
                        de: pack.de
                    });
                    return db.collection('content').doc('services').set(state.services);
                });
            }
        } else {
            var tesText = {};
            TESTIMONIAL_TEXT_KEYS.forEach(function (k) { tesText[k] = val('m-tes-' + k).trim(); });
            var rating = Math.min(5, Math.max(1, parseInt(val('m-tes-rating'), 10) || 5));

            if (isEdit) {
                var prevTes = findTestimonialItem(state.modalItemId);
                if (!prevTes) {
                    closeModal();
                    btn.disabled = false;
                    btn.innerHTML = '<i class="fas fa-save"></i> <span id="modalSaveLabel">' + t('modalUpdate') + '</span>';
                    return;
                }
                promise = AdminTranslate.expandLangPack(tesText, TESTIMONIAL_TEXT_KEYS, src, {
                    skipKeys: ['name'],
                    previousPack: { en: prevTes.en, vi: prevTes.vi, de: prevTes.de }
                }).then(function (pack) {
                    var idx = state.testimonials.items.findIndex(function (x) { return x.id === prevTes.id; });
                    state.testimonials.items[idx] = {
                        id: prevTes.id,
                        order: prevTes.order,
                        rating: rating,
                        en: pack.en,
                        vi: pack.vi,
                        de: pack.de
                    };
                    return db.collection('content').doc('testimonials').set(state.testimonials);
                });
            } else {
                promise = AdminTranslate.expandLangPack(tesText, TESTIMONIAL_TEXT_KEYS, src, { skipKeys: ['name'] }).then(function (pack) {
                    state.testimonials.items.push({
                        id: uid('t'),
                        order: state.testimonials.items.length,
                        rating: rating,
                        en: pack.en,
                        vi: pack.vi,
                        de: pack.de
                    });
                    return db.collection('content').doc('testimonials').set(state.testimonials);
                });
            }
        }

        var successMsg = isEdit ? t('modalUpdatedAuto') : t('modalSavedAuto');
        promise
            .then(function () {
                closeModal();
                renderServicesList();
                renderTestimonialsList();
                showAlert('ok', successMsg);
                toast(successMsg);
            })
            .catch(function (err) {
                if (state.modalType === 'service' && !isEdit) state.services.items.pop();
                else if (state.modalType === 'testimonial' && !isEdit) state.testimonials.items.pop();
                $('modalAlert').textContent = t('saveFail') + (err.message || err);
                $('modalAlert').classList.add('show');
            })
            .finally(function () {
                btn.disabled = false;
                var label = state.modalMode === 'edit' ? t('modalUpdate') : t('modalSave');
                btn.innerHTML = '<i class="fas fa-save"></i> <span id="modalSaveLabel">' + label + '</span>';
            });
    }

    function closeSidebar() {
        var sidebar = $('sidebar');
        var backdrop = $('sidebarBackdrop');
        var toggle = $('menuToggle');
        if (sidebar) sidebar.classList.remove('open');
        if (backdrop) backdrop.classList.remove('show');
        document.body.classList.remove('sidebar-open');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }

    function toggleSidebar() {
        var sidebar = $('sidebar');
        var backdrop = $('sidebarBackdrop');
        var toggle = $('menuToggle');
        if (!sidebar) return;
        var open = !sidebar.classList.contains('open');
        sidebar.classList.toggle('open', open);
        if (backdrop) backdrop.classList.toggle('show', open);
        document.body.classList.toggle('sidebar-open', open);
        if (toggle) toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    function switchSection(name) {
        state.currentSection = name;
        document.querySelectorAll('.nav-btn').forEach(function (b) {
            b.classList.toggle('active', b.getAttribute('data-section') === name);
        });
        document.querySelectorAll('.section-pane').forEach(function (p) {
            p.classList.toggle('active', p.id === 'sec-' + name);
        });
        $('pageTitle').textContent = t('titles.' + name);
        closeSidebar();
        applyAdminUi();
        if (name === 'accounts' && window.AdminUsers && AdminUsers.onSectionEnter) {
            AdminUsers.onSectionEnter();
        }
    }

    function bindUi() {
        buildLangTabs('globalLangTabs', state.lang, switchLang);
        applyAdminUi();

        document.querySelectorAll('.nav-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                switchSection(btn.getAttribute('data-section'));
            });
        });

        $('menuToggle').addEventListener('click', toggleSidebar);
        var sidebarBackdrop = $('sidebarBackdrop');
        if (sidebarBackdrop) {
            sidebarBackdrop.addEventListener('click', closeSidebar);
        }
        window.addEventListener('resize', function () {
            if (window.innerWidth > 900) closeSidebar();
        });
        $('logoutBtn').addEventListener('click', function () {
            firebase.auth().signOut().then(function () { location.href = 'login.html'; });
        });
        $('saveBtn').addEventListener('click', saveContent);
        $('reloadBtn').addEventListener('click', function () {
            loadContent().then(function () { toast(t('reloaded')); });
        });
        $('addServiceBtn').addEventListener('click', function () { openItemModal('service', 'add'); });
        $('addTestimonialBtn').addEventListener('click', function () { openItemModal('testimonial', 'add'); });
        $('modalSaveBtn').addEventListener('click', saveModalItem);
        document.querySelectorAll('[data-modal-close]').forEach(function (el) {
            el.addEventListener('click', closeModal);
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                if (!$('itemModal').hidden) closeModal();
                else closeSidebar();
            }
        });

        if (window.AdminCloudinary) {
            AdminCloudinary.init({
                t: t,
                toast: toast,
                showError: function (msg) { showAlert('err', msg); }
            });
        }

        if (window.AdminUsers) {
            AdminUsers.init({
                t: t,
                toast: toast,
                getDb: function () { return db; },
                getCurrentUser: function () { return firebase.auth().currentUser; }
            });
        }
    }

    function boot() {
        if (!initFirebaseApp()) {
            alert(t('firebaseMissing'));
            location.href = 'login.html';
            return;
        }
        db = firebase.firestore();
        bindUi();

        firebase.auth().onAuthStateChanged(function (user) {
            if (!user) {
                location.replace('login.html');
                return;
            }
            $('userEmail').textContent = user.email || '';
            loadContent()
                .then(function () { $('loading').classList.add('hidden'); })
                .catch(function (err) {
                    $('loading').classList.add('hidden');
                    showAlert('err', t('loadFail') + (err.message || err) + t('loadFailHint'));
                    state.site = clone(CMS_DEFAULTS.site);
                    state.about = clone(CMS_DEFAULTS.about);
                    state.special = clone(CMS_DEFAULTS.special);
                    state.services = clone(CMS_DEFAULTS.services);
                    state.testimonials = clone(CMS_DEFAULTS.testimonials);
                    renderAll();
                });
        });
    }

    boot();
})();
