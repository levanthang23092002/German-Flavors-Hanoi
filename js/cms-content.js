/**
 * Load CMS content from Firestore and apply to the public site.
 * Falls back to CMS_DEFAULTS / hardcoded HTML if Firebase is unavailable.
 */
(function () {
    var CMS = {
        data: null,
        loaded: false
    };

    function deepMerge(target, source) {
        if (!source) return target;
        Object.keys(source).forEach(function (key) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                if (!target[key]) target[key] = {};
                deepMerge(target[key], source[key]);
            } else {
                target[key] = source[key];
            }
        });
        return target;
    }

    function mergeIntoI18n(data) {
        if (typeof I18N_DATA === 'undefined') return;
        ['en', 'vi', 'de'].forEach(function (lang) {
            if (!I18N_DATA[lang]) return;

            if (data.site && data.site.meta && data.site.meta[lang]) {
                I18N_DATA[lang].meta = deepMerge(I18N_DATA[lang].meta || {}, data.site.meta[lang]);
            }

            if (data.site && data.site.hero && data.site.hero[lang]) {
                I18N_DATA[lang].hero = deepMerge(I18N_DATA[lang].hero || {}, data.site.hero[lang]);
            }

            if (data.site && data.site.heroBar && data.site.heroBar.items) {
                I18N_DATA[lang].hero = I18N_DATA[lang].hero || {};
                var statKeys = ['stat1', 'stat2', 'stat3', 'stat4'];
                data.site.heroBar.items.forEach(function (item, i) {
                    if (item[lang] && item[lang].label && statKeys[i]) {
                        I18N_DATA[lang].hero[statKeys[i]] = item[lang].label;
                    }
                });
            }

            if (data.about && data.about[lang]) {
                // Chỉ merge nội dung (p1–p5, quote), giữ tiêu đề mục từ i18n
                var aboutKeys = ['p1', 'quote', 'p2', 'p3', 'p4', 'p5'];
                I18N_DATA[lang].about = I18N_DATA[lang].about || {};
                aboutKeys.forEach(function (k) {
                    if (data.about[lang][k] != null) I18N_DATA[lang].about[k] = data.about[lang][k];
                });
            }

            if (data.special && data.special[lang]) {
                I18N_DATA[lang].special = deepMerge(I18N_DATA[lang].special || {}, data.special[lang]);
            }

            if (data.services && data.services.items) {
                I18N_DATA[lang].cards = I18N_DATA[lang].cards || {};
                data.services.items.forEach(function (item) {
                    if (item[lang]) {
                        I18N_DATA[lang].cards[item.id] = deepMerge({}, item[lang]);
                    }
                });
            }

            if (data.testimonials && data.testimonials.items) {
                I18N_DATA[lang].testimonials = I18N_DATA[lang].testimonials || {};
                I18N_DATA[lang].testimonials.items = data.testimonials.items.map(function (item) {
                    return item[lang] || item.en || { text: '', name: '', role: '' };
                });
            }
        });
    }

    function esc(str) {
        var d = document.createElement('div');
        d.textContent = str == null ? '' : String(str);
        return d.innerHTML;
    }

    function applyHeroBar(site) {
        var bar = document.querySelector('.hero-bar');
        if (!bar || !site.heroBar || !site.heroBar.items || !site.heroBar.items.length) return;

        var lang = (window.I18N && I18N.getLang()) || localStorage.getItem('gf-lang') || 'en';
        var nodes = bar.querySelectorAll('.hero-bar-item');

        site.heroBar.items.forEach(function (item, i) {
            var el = nodes[i];
            if (!el) return;
            var strong = el.querySelector('strong');
            var labelEl = el.querySelector('[data-i18n^="hero.stat"]') || el.querySelector('span');
            if (strong && item.value != null) strong.textContent = item.value;
            var pack = item[lang] || item.en || {};
            if (labelEl && pack.label) labelEl.textContent = pack.label;
        });
    }

    function applySpecial(special) {
        if (!special || !special.image) return;
        var img = document.querySelector('#special .spimgw img');
        if (img) img.src = special.image;
    }

    function applyAboutImage(about, site) {
        var url = (about && about.image) || (site && site.aboutImage) || '';
        if (!url) return;
        var aboutImg = document.querySelector('#about .amain img');
        if (aboutImg) aboutImg.src = url;
    }

    function applyHeroBanner(site) {
        if (!site || !site.hero || !site.hero.image) return;
        var img = document.getElementById('hero-bg-image') || document.querySelector('#hero .hero-bg img');
        if (img) img.src = site.hero.image;
    }

    function applySiteInfo(site) {
        if (!site) return;

        applyHeroBanner(site);
        applyHeroBar(site);

        document.querySelectorAll('.bname').forEach(function (el) {
            el.textContent = site.brandName || 'German Flavors';
        });
        document.querySelectorAll('.bsub, .fsub').forEach(function (el) {
            el.textContent = site.brandSub || 'Hanoi';
        });

        var loc = site.location || 'Hanoi, Vietnam';
        document.querySelectorAll('#topbar .top-contact span').forEach(function (el) {
            var icon = el.querySelector('i');
            el.innerHTML = '';
            if (icon) el.appendChild(icon);
            else {
                var i = document.createElement('i');
                i.className = 'fas fa-map-marker-alt';
                el.appendChild(i);
            }
            el.appendChild(document.createTextNode(loc));
        });

        var phone = site.phoneBjoern || '+84938886514';
        var wa = site.whatsapp || phone.replace(/\D/g, '');
        var zalo = site.zalo || wa;
        var fb = site.facebook || '#';

        document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
            a.href = 'tel:' + phone;
        });
        document.querySelectorAll('a[href*="wa.me"]').forEach(function (a) {
            a.href = 'https://wa.me/' + wa;
        });
        document.querySelectorAll('a[href*="zalo.me"]').forEach(function (a) {
            a.href = 'https://zalo.me/' + zalo;
        });
        document.querySelectorAll('a[href*="facebook.com"]').forEach(function (a) {
            a.href = fb;
        });

        var fci = document.querySelectorAll('footer .fciinfo');
        if (fci.length >= 3) {
            if (fci[0]) fci[0].innerHTML = '<strong>Bjoern (GER/ENG)</strong>' + esc(site.phoneBjoernDisplay || site.phoneBjoern || '');
            if (fci[1]) fci[1].innerHTML = '<strong>Thuy (VIE/ENG)</strong>' + esc(site.phoneThuyDisplay || site.phoneThuy || '');
            if (fci[2]) {
                var locLabel = fci[2].querySelector('strong');
                var labelHtml = locLabel ? locLabel.outerHTML : '<strong data-i18n="footer.location">Location</strong>';
                fci[2].innerHTML = labelHtml + esc(loc);
            }
        }

        var fnm = document.querySelector('footer .fnm');
        if (fnm && site.brandName) {
            var parts = site.brandName.split(/\s+/);
            if (parts.length >= 2) {
                fnm.innerHTML = '<span class="brand-german">' + esc(parts[0]) + '</span> <span>' + esc(parts.slice(1).join(' ')) + '</span>';
            } else {
                fnm.textContent = site.brandName;
            }
        }

        var copySpan = document.querySelector('.fbot span');
        if (copySpan && site.brandName) {
            copySpan.textContent = site.brandName + (site.brandSub ? ' ' + site.brandSub : '');
        }
    }

    function renderServices(services) {
        var grid = document.getElementById('mgrid');
        if (!grid || !services || !services.items || !services.items.length) return;

        var lang = (window.I18N && I18N.getLang()) || localStorage.getItem('gf-lang') || 'en';
        var items = services.items.slice().sort(function (a, b) {
            return (a.order || 0) - (b.order || 0);
        });
        grid.innerHTML = items.map(function (item, i) {
            var t = item[lang] || item.en || {};
            var delay = i ? ' data-aos-delay="' + (i * 80) + '"' : '';
            return (
                '<div class="col-sm-6 col-lg-4 mwrap" data-c="' + esc(item.id) + '" data-aos="fade-up"' + delay + '>' +
                '<div class="mcard"' +
                ' data-img="' + esc(item.image || '') + '"' +
                ' data-title="' + esc(t.title || '') + '"' +
                ' data-cat="' + esc(t.cat || '') + '">' +
                '<div class="mimg">' +
                '<img src="' + esc(item.image || '') + '" alt="' + esc(t.title || '') + '"/>' +
                '<div class="mbdg">' + esc(t.badge || '') + '</div>' +
                '<div class="mhrt"><i class="far fa-heart"></i></div>' +
                '</div>' +
                '<div class="mbody">' +
                '<div class="mcat">' + esc(t.cat || '') + '</div>' +
                '<div class="mtit">' + esc(t.title || '') + '</div>' +
                '<div class="mdesc">' + esc(t.desc || '') + '</div>' +
                '<div class="mfoot">' +
                '<div class="mstars"><i class="fas fa-star"></i> <span class="mstars-tag">' + esc(t.tag || '') + '</span></div>' +
                '</div></div></div></div>'
            );
        }).join('');

        bindServiceCards();
        if (typeof AOS !== 'undefined') AOS.refresh();
    }

    function bindServiceCards() {
        document.querySelectorAll('.mcard').forEach(function (card) {
            card.onclick = null;
        });
        document.querySelectorAll('.madd').forEach(function (btn) {
            btn.style.display = 'none';
            btn.onclick = null;
        });
        document.querySelectorAll('.mhrt').forEach(function (btn) {
            btn.onclick = function (e) {
                e.stopPropagation();
                var ico = btn.querySelector('i');
                ico.classList.toggle('far');
                ico.classList.toggle('fas');
                btn.style.color = ico.classList.contains('fas') ? 'var(--primary)' : '#ccc';
            };
        });
    }

    function renderTestimonials(testimonials) {
        var wrapper = document.querySelector('.tesSwiper .swiper-wrapper');
        if (!wrapper || !testimonials || !testimonials.items) return;

        var lang = (window.I18N && I18N.getLang()) || localStorage.getItem('gf-lang') || 'en';
        var items = testimonials.items.slice().sort(function (a, b) {
            return (a.order || 0) - (b.order || 0);
        });

        wrapper.innerHTML = items.map(function (item) {
            var t = item[lang] || item.en || {};
            var stars = '';
            var rating = Math.min(5, Math.max(1, parseInt(item.rating, 10) || 5));
            for (var i = 0; i < rating; i++) stars += '<i class="fas fa-star"></i>';
            return (
                '<div class="swiper-slide">' +
                '<div class="tescard">' +
                '<div class="tesq">"</div>' +
                '<div class="tess">' + stars + '</div>' +
                '<p class="testxt">' + esc(t.text || '') + '</p>' +
                '<div class="tesauth">' +
                '<div class="tesnm">' + esc(t.name || '') + '</div>' +
                '<div class="tesrl">' + esc(t.role || '') + '</div>' +
                '</div></div></div>'
            );
        }).join('');

        if (window.tesSwiperInstance && typeof window.tesSwiperInstance.destroy === 'function') {
            window.tesSwiperInstance.destroy(true, true);
        }
        if (typeof Swiper !== 'undefined') {
            window.tesSwiperInstance = new Swiper('.tesSwiper', {
                slidesPerView: 1,
                spaceBetween: 22,
                loop: items.length > 1,
                autoplay: items.length > 1 ? { delay: 4000, disableOnInteraction: false } : false,
                pagination: { el: '.swiper-pagination', clickable: true },
                breakpoints: {
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }
                }
            });
        }
    }

    function applyAll(data) {
        CMS.data = data;
        CMS.loaded = true;
        mergeIntoI18n(data);
        applySiteInfo(data.site);
        applyAboutImage(data.about, data.site);
        applySpecial(data.special);
        renderServices(data.services);
        renderTestimonials(data.testimonials);
        if (window.I18N && typeof I18N.apply === 'function') {
            I18N.apply();
        }
    }

    function loadFromFirestore() {
        return new Promise(function (resolve, reject) {
            if (!initFirebaseApp()) {
                reject(new Error('Firebase not configured'));
                return;
            }
            var db = firebase.firestore();
            Promise.all([
                db.collection('content').doc('site').get(),
                db.collection('content').doc('about').get(),
                db.collection('content').doc('special').get(),
                db.collection('content').doc('services').get(),
                db.collection('content').doc('testimonials').get()
            ]).then(function (snaps) {
                var site = snaps[0].exists ? snaps[0].data() : null;
                var about = snaps[1].exists ? snaps[1].data() : null;
                var special = snaps[2].exists ? snaps[2].data() : null;
                var services = snaps[3].exists ? snaps[3].data() : null;
                var testimonials = snaps[4].exists ? snaps[4].data() : null;

                if (!site && !about && !special && !services && !testimonials) {
                    reject(new Error('No CMS content yet'));
                    return;
                }

                resolve({
                    site: site || (typeof CMS_DEFAULTS !== 'undefined' ? CMS_DEFAULTS.site : {}),
                    about: about || (typeof CMS_DEFAULTS !== 'undefined' ? CMS_DEFAULTS.about : {}),
                    special: special || (typeof CMS_DEFAULTS !== 'undefined' ? CMS_DEFAULTS.special : {}),
                    services: services || (typeof CMS_DEFAULTS !== 'undefined' ? CMS_DEFAULTS.services : { items: [] }),
                    testimonials: testimonials || (typeof CMS_DEFAULTS !== 'undefined' ? CMS_DEFAULTS.testimonials : { items: [] })
                });
            }).catch(reject);
        });
    }

    function initCmsContent() {
        loadFromFirestore()
            .then(applyAll)
            .catch(function (err) {
                console.info('[CMS] Dùng nội dung mặc định:', err.message || err);
                if (typeof CMS_DEFAULTS !== 'undefined') {
                    applyAll(CMS_DEFAULTS);
                }
            });
    }

    // Re-render dynamic blocks when language changes
    var prevOnI18n = window.onI18nApplied;
    window.onI18nApplied = function () {
        if (typeof prevOnI18n === 'function') prevOnI18n();
        if (!CMS.data) return;
        // Services/testimonials text updated via I18N for fixed cards;
        // if dynamically rendered, refresh cards from CMS data for current lang
        if (CMS.data.services) renderServices(CMS.data.services);
        if (CMS.data.testimonials) renderTestimonials(CMS.data.testimonials);
        if (CMS.data.site) applySiteInfo(CMS.data.site);
        if (CMS.data.about || CMS.data.site) applyAboutImage(CMS.data.about, CMS.data.site);
        if (CMS.data.special) applySpecial(CMS.data.special);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCmsContent);
    } else {
        initCmsContent();
    }

    window.CMS_CONTENT = CMS;
})();
