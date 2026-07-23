AOS.init({
    duration: 680,
    once: true,
    offset: 55
});

var NAV_SECTIONS = ['hero', 'about', 'menu', 'products', 'testimonials', 'reservation'];

function getNavOffset() {
    var nav = document.getElementById('nav');
    return nav ? nav.offsetHeight + 12 : 90;
}

function scrollToSection(el) {
    if (!el) return;
    window.scrollTo({
        top: el.offsetTop - getNavOffset(),
        behavior: 'smooth'
    });
}

function setActiveNav(id) {
    document.querySelectorAll('.navbar-nav .nav-link').forEach(function(l) {
        l.classList.remove('active');
    });
    var lnk = document.querySelector('.navbar-nav .nav-link[href="#' + id + '"]');
    if (lnk) lnk.classList.add('active');
}

/* NAVBAR SCROLL & ACTIVE LINK  */
window.addEventListener('scroll', function() {
    document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 60);
    document.getElementById('btt').classList.toggle('show', window.scrollY > 300);

    var pos = window.scrollY + getNavOffset() + 1;
    var current = NAV_SECTIONS[0];
    NAV_SECTIONS.forEach(function(id) {
        var sec = document.getElementById(id);
        if (sec && pos >= sec.offsetTop) current = id;
    });
    setActiveNav(current);
});

/*  SMOOTH SCROLL + MOBILE NAV CLOSE  */
document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
        var href = this.getAttribute('href');
        if (href === '#') return;
        var t = document.querySelector(href);
        if (t) {
            e.preventDefault();
            var navCollapse = document.getElementById('navmenu');
            if (navCollapse && navCollapse.classList.contains('show')) {
                var bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                } else {
                    navCollapse.classList.remove('show');
                }
            }
            setTimeout(function() {
                scrollToSection(t);
            }, 50);
        }
    });
});


var searchOv = document.getElementById('searchOv');

document.getElementById('navSearchBtn').addEventListener('click', function() {
    searchOv.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(function() {
        document.getElementById('searchInput').focus();
    }, 220);
});

document.getElementById('searchClose').addEventListener('click', closeSearch);

// Close when clicking backdrop
searchOv.addEventListener('click', function(e) {
    if (e.target === searchOv) closeSearch();
});

function closeSearch() {
    searchOv.classList.remove('open');
    document.body.style.overflow = '';
}

// Category buttons inside search box
document.querySelectorAll('.sovcat').forEach(function(btn) {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.sovcat').forEach(function(b) {
            b.classList.remove('active');
        });
        this.classList.add('active');
        var f = this.getAttribute('data-cat');
        closeSearch();
        setTimeout(function() {
            filterMenu(f);
            scrollToSection(document.getElementById('menu'));
        }, 300);
    });
});

// Trending tags fill the search input
document.querySelectorAll('.sovtrend .ttag').forEach(function(t) {
    t.addEventListener('click', function() {
        document.getElementById('searchInput').value = this.textContent.trim();
        document.getElementById('searchInput').focus();
    });
});


$(document).ready(function() {
	$('.magnific_popup').magnificPopup({
	  disableOn: 700,
	  type: 'iframe',
	  mainClass: 'mfp-fade',
	  removalDelay: 160,
	  preloader: false,
	  fixedContentPos: false,
	  disableOn: 300
	});	
});


function filterMenu(cat) {
    // sync filter buttons
    document.querySelectorAll('.filtbtn').forEach(function(b) {
        b.classList.toggle('active', b.getAttribute('data-f') === cat);
    });
    // sync category cards
    document.querySelectorAll('.catcard').forEach(function(c) {
        c.classList.toggle('active', c.getAttribute('data-filter') === cat);
    });
    // show/hide menu cards
    document.querySelectorAll('.mwrap').forEach(function(w) {
        var c = w.getAttribute('data-c');
        if (cat === 'all' || c === cat) {
            w.classList.remove('gone');
            w.style.opacity = '0';
            w.style.transform = 'translateY(16px)';
            setTimeout(function() {
                w.style.transition = 'opacity .38s,transform .38s';
                w.style.opacity = '1';
                w.style.transform = 'translateY(0)';
            }, 60);
        } else {
            w.classList.add('gone');
        }
    });
}

// Filter buttons
document.querySelectorAll('.filtbtn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        filterMenu(this.getAttribute('data-f'));
    });
});

// Category section cards â†’ scroll + filter
document.querySelectorAll('.catcard').forEach(function(card) {
    card.addEventListener('click', function() {
        var f = this.getAttribute('data-filter');
        scrollToSection(document.getElementById('menu'));
        setTimeout(function() {
            filterMenu(f);
        }, 480);
    });
});


document.querySelectorAll('.mhrt').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var ico = this.querySelector('i');
        ico.classList.toggle('far');
        ico.classList.toggle('fas');
        this.style.color = ico.classList.contains('fas') ? 'var(--primary)' : '#ccc';
    });
});

var contactForm = document.getElementById('contactForm');
var inquiryPurpose = document.getElementById('inquiryPurpose');
var fieldEventDate = document.getElementById('fieldEventDate');
var fieldGuests = document.getElementById('fieldGuests');
var fieldPreferredDate = document.getElementById('fieldPreferredDate');
var fieldDistrict = document.getElementById('fieldDistrict');
var fieldMenuItems = document.getElementById('fieldMenuItems');
var menuPickLabel = document.getElementById('menuPickLabel');
var menuMultiBtn = document.getElementById('menuMultiBtn');
var menuMultiPanel = document.getElementById('menuMultiPanel');
var menuMultiSummary = document.getElementById('menuMultiSummary');
var menuMultiList = document.getElementById('menuMultiList');
var menuCheckErr = document.getElementById('menuCheckErr');
var eventDateLabel = document.getElementById('eventDateLabel');
var districtLabel = document.getElementById('districtLabel');
var eventDate = document.getElementById('eventDate');
var preferredDate = document.getElementById('preferredDate');
var guestCount = document.getElementById('guestCount');
var district = document.getElementById('district');
var fullName = document.getElementById('fullName');
var phone = document.getElementById('phone');
var email = document.getElementById('email');
var msgLabel = document.getElementById('msgLabel');
var msgField = document.getElementById('msgField');
var resBtn = document.getElementById('resBtn');
var resOk = document.getElementById('resOk');
var resErr = document.getElementById('resErr');

var PURPOSE_PLACEHOLDERS = {
    quote: 'placeholderQuote',
    availability: 'placeholderAvailability',
    advice: 'placeholderAdvice',
    catering: 'placeholderEvent',
    order: 'placeholderOrder',
    other: 'placeholderOther'
};

function setFormFieldVisible(el, show) {
    if (!el) return;
    el.classList.toggle('form-field-hidden', !show);
}

function setDateMin(input) {
    if (!input) return;
    var today = new Date();
    var y = today.getFullYear();
    var m = String(today.getMonth() + 1).padStart(2, '0');
    var d = String(today.getDate()).padStart(2, '0');
    input.min = y + '-' + m + '-' + d;
}

function getPurposeValue() {
    return inquiryPurpose ? inquiryPurpose.value : '';
}

function purposeNeedsMenu(purpose) {
    return purpose === 'catering' || purpose === 'order' || purpose === 'quote' || purpose === 'availability';
}

function getMenuPickLabelKey(purpose) {
    if (purpose === 'catering') return 'reservation.menuPickCatering';
    if (purpose === 'order') return 'reservation.menuPickOrder';
    if (purpose === 'quote') return 'reservation.menuPickQuote';
    if (purpose === 'availability') return 'reservation.menuPickAvailability';
    return 'reservation.menuPickOrder';
}

function getSelectedMenuItems() {
    var items = [];
    if (!menuMultiList) return items;
    menuMultiList.querySelectorAll('input[name="menu_item"]:checked').forEach(function(cb) {
        var span = cb.parentElement && cb.parentElement.querySelector('span');
        items.push({
            value: cb.value,
            label: span ? span.textContent.trim() : cb.value
        });
    });
    return items;
}

function closeMenuMultiPanel() {
    if (!menuMultiPanel || !menuMultiBtn) return;
    menuMultiPanel.hidden = true;
    menuMultiBtn.setAttribute('aria-expanded', 'false');
}

function openMenuMultiPanel() {
    if (!menuMultiPanel || !menuMultiBtn) return;
    menuMultiPanel.hidden = false;
    menuMultiBtn.setAttribute('aria-expanded', 'true');
}

function clearMenuSelection() {
    if (!menuMultiList) return;
    menuMultiList.querySelectorAll('input[name="menu_item"]').forEach(function(cb) {
        cb.checked = false;
    });
    updateMenuMultiSummary();
    closeMenuMultiPanel();
    if (menuCheckErr) menuCheckErr.hidden = true;
}

function updateMenuMultiSummary() {
    if (!menuMultiSummary) return;
    var count = getSelectedMenuItems().length;
    if (!count) {
        menuMultiSummary.textContent = window.I18N ? I18N.t('reservation.menuChoose') : '— Select products —';
        return;
    }
    if (count === 1) {
        menuMultiSummary.textContent = window.I18N ? I18N.t('reservation.menuSelectedOne') : '1 item selected';
        return;
    }
    var tpl = window.I18N ? I18N.t('reservation.menuSelectedMany') : '{n} items selected';
    menuMultiSummary.textContent = tpl.replace('{n}', String(count));
}

function bindMenuMultiEvents() {
    if (!menuMultiBtn || menuMultiBtn.dataset.bound === '1') return;
    menuMultiBtn.dataset.bound = '1';

    menuMultiBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (menuMultiPanel && menuMultiPanel.hidden) openMenuMultiPanel();
        else closeMenuMultiPanel();
    });

    if (menuMultiList) {
        menuMultiList.addEventListener('change', function() {
            updateMenuMultiSummary();
            if (menuCheckErr && getSelectedMenuItems().length) menuCheckErr.hidden = true;
        });
    }

    document.addEventListener('click', function(e) {
        var wrap = document.getElementById('menuMulti');
        if (wrap && !wrap.contains(e.target)) closeMenuMultiPanel();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeMenuMultiPanel();
    });
}

window.bindMenuMultiEvents = bindMenuMultiEvents;
window.updateMenuMultiSummary = updateMenuMultiSummary;

function togglePurposeFields() {
    var purpose = getPurposeValue();
    var isCatering = purpose === 'catering';
    var isOrder = purpose === 'order';
    var isQuote = purpose === 'quote';
    var isAvailability = purpose === 'availability';
    var needsDistrict = isCatering || isOrder;
    var needsMenu = purposeNeedsMenu(purpose);

    setFormFieldVisible(fieldEventDate, isCatering);
    setFormFieldVisible(fieldGuests, isCatering);
    setFormFieldVisible(fieldPreferredDate, isAvailability || isOrder || isQuote);
    setFormFieldVisible(fieldDistrict, needsDistrict);
    setFormFieldVisible(fieldMenuItems, needsMenu);

    if (fieldPreferredDate) {
        fieldPreferredDate.classList.remove('col-12', 'col-sm-6');
        fieldPreferredDate.classList.add(isOrder ? 'col-12' : 'col-sm-6');
    }

    if (eventDate) eventDate.required = isCatering;
    if (guestCount) guestCount.required = isCatering;
    if (district) district.required = needsDistrict;
    if (!needsMenu) clearMenuSelection();
    if (preferredDate) preferredDate.required = false;
    if (msgField) msgField.required = isOrder || purpose === 'advice' || purpose === 'other';

    if (districtLabel && window.I18N) {
        districtLabel.textContent = I18N.t('reservation.district');
    }
    if (menuPickLabel && window.I18N) {
        menuPickLabel.textContent = I18N.t(getMenuPickLabelKey(purpose));
    }
    if (msgLabel && window.I18N) {
        if (isCatering) {
            msgLabel.textContent = I18N.t('reservation.msgNotesCatering');
        } else if (isOrder) {
            msgLabel.textContent = I18N.t('reservation.msgNotesOrder');
        } else if (isQuote) {
            msgLabel.textContent = I18N.t('reservation.msgNotesQuote');
        } else if (isAvailability) {
            msgLabel.textContent = I18N.t('reservation.msgNotesAvailability');
        } else {
            msgLabel.textContent = I18N.t('reservation.msgLabel');
        }
    }

    if (msgField && window.I18N && PURPOSE_PLACEHOLDERS[purpose]) {
        msgField.placeholder = I18N.t('reservation.' + PURPOSE_PLACEHOLDERS[purpose]);
    }
}

setDateMin(eventDate);
setDateMin(preferredDate);
bindMenuMultiEvents();
updateMenuMultiSummary();

if (inquiryPurpose) {
    inquiryPurpose.addEventListener('change', togglePurposeFields);
    togglePurposeFields();
}

window.onI18nApplied = function() {
    togglePurposeFields();
    updateMenuMultiSummary();
};

function setResBtnLoading(loading) {
    if (!resBtn) return;
    resBtn.disabled = loading;
    if (loading) {
        resBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + (window.I18N ? I18N.t('reservation.submitting') : 'Submitting...');
    } else {
        resBtn.innerHTML = '<i class="fas fa-paper-plane"></i><span data-i18n="reservation.submit">' + (window.I18N ? I18N.t('reservation.submit') : 'Send message') + '</span>';
    }
}

function showFormFeedback(type) {
    if (resOk) resOk.style.display = type === 'ok' ? 'block' : 'none';
    if (resErr) resErr.style.display = type === 'err' ? 'block' : 'none';
    var target = type === 'ok' ? resOk : resErr;
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function showFormErrorMessage(key, fallback) {
    var errP = document.getElementById('resErrText');
    var errLocal = document.getElementById('resErrLocal');
    var msg = fallback || (window.I18N ? I18N.t(key) : 'Something went wrong.');
    if (errP) errP.textContent = msg;
    if (errLocal) errLocal.style.display = key === 'reservation.errorFile' ? 'block' : 'none';
    showFormFeedback('err');
}

function showFileProtocolError() {
    showFormErrorMessage(
        'reservation.errorFile',
        'Do not open index.html directly. Use a local web server to submit the form.'
    );
}

function formatEmailDate(dateStr) {
    if (!dateStr) return '';
    var parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return parseInt(parts[2], 10) + ' ' + months[parseInt(parts[1], 10) - 1] + ' ' + parts[0];
}

function buildEmailSubject(data) {
    var subject = data.inquiryType + ' · ' + data.name;
    if (data.isCatering && data.eventDate) {
        subject += ' · ' + formatEmailDate(data.eventDate);
    }
    return subject;
}

function buildMessageBody(data) {
    var lines = ['Purpose: ' + data.inquiryType];
    if (data.district) lines.push('Area: ' + data.district);
    if (data.menuItems && data.menuItems.length) {
        lines.push('Dishes/Products: ' + data.menuItems.map(function(i) { return i.label; }).join(', '));
    }
    if (data.isCatering) {
        lines.push('Event Date: ' + formatEmailDate(data.eventDate));
        lines.push('Guests: ' + data.guests);
    } else if (data.preferredDate) {
        lines.push('Preferred Date: ' + formatEmailDate(data.preferredDate));
    }
    lines.push('Phone: ' + data.phone);
    if (data.emailProvided) lines.push('Email: ' + data.customerEmail);
    lines.push('');
    if (data.message) lines.push(data.message);
    return lines.join('\n');
}

function getWeb3FormsError(data) {
    if (!data) return '';
    if (data.body && data.body.message) return data.body.message;
    if (data.message) return data.message;
    return '';
}

function buildWeb3FormsBody(accessKey, data) {
    var body = {
        access_key: accessKey,
        subject: buildEmailSubject(data),
        from_name: 'German Flavors Hanoi',
        name: data.name,
        email: data.email,
        replyto: data.email,
        botcheck: '',
        message: buildMessageBody(data),
        Purpose: data.inquiryType,
        Phone: data.phone
    };

    if (data.district) body['Area'] = data.district;
    if (data.menuItems && data.menuItems.length) {
        body['Dishes/Products'] = data.menuItems.map(function(i) { return i.label; }).join(', ');
    }
    if (data.isCatering) {
        body['Event Date'] = formatEmailDate(data.eventDate);
        body['Number of Guests'] = data.guests;
    } else if (data.preferredDate) {
        body['Preferred Date'] = formatEmailDate(data.preferredDate);
    }

    return body;
}

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        var purpose = getPurposeValue();
        var isCatering = purpose === 'catering';
        var isOrder = purpose === 'order';
        var needsMenu = purposeNeedsMenu(purpose);

        if (needsMenu && !getSelectedMenuItems().length) {
            if (menuCheckErr) menuCheckErr.hidden = false;
            if (fieldMenuItems) fieldMenuItems.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            return;
        }
        if (menuCheckErr) menuCheckErr.hidden = true;

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        if (window.location.protocol === 'file:') {
            showFileProtocolError();
            return;
        }

        var accessKey = window.FORM_CONFIG && FORM_CONFIG.WEB3FORMS_ACCESS_KEY;
        if (!accessKey) {
            showFormErrorMessage(
                'reservation.errorSetup',
                'Email not configured. Add Web3Forms Access Key to js/form-config.js (see https://web3forms.com).'
            );
            return;
        }

        var purposeLabel = inquiryPurpose.options[inquiryPurpose.selectedIndex].textContent.trim();
        var nameVal = fullName.value.trim();
        var emailVal = email.value.trim();
        var phoneVal = phone.value.trim();
        var msgVal = msgField.value.trim();
        var districtVal = district ? district.value.trim() : '';
        var notifyEmail = (window.FORM_CONFIG && FORM_CONFIG.NOTIFY_EMAIL) || 'bjoern@germanflavorshanoi.com';
        var guestsVal = isCatering && guestCount
            ? guestCount.options[guestCount.selectedIndex].textContent.trim()
            : '';
        var menuItems = getSelectedMenuItems();

        var emailData = {
            inquiryType: purposeLabel,
            purpose: purpose,
            name: nameVal,
            email: emailVal || notifyEmail,
            customerEmail: emailVal,
            emailProvided: !!emailVal,
            phone: phoneVal,
            message: msgVal,
            district: districtVal,
            menuItems: menuItems,
            isCatering: isCatering,
            isOrder: isOrder,
            eventDate: isCatering && eventDate ? eventDate.value : '',
            preferredDate: preferredDate ? preferredDate.value : '',
            guests: guestsVal
        };

        var body = buildWeb3FormsBody(accessKey, emailData);
        body.email = emailVal || notifyEmail;
        body.replyto = emailVal || notifyEmail;

        setResBtnLoading(true);
        if (resOk) resOk.style.display = 'none';
        if (resErr) resErr.style.display = 'none';

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(function(res) {
            return res.json().then(function(data) {
                return { ok: res.ok, status: res.status, data: data };
            }).catch(function() {
                return { ok: false, status: res.status, data: null };
            });
        })
        .then(function(result) {
            var data = result.data;
            if (result.ok && data && data.success) {
                contactForm.reset();
                togglePurposeFields();
                showFormFeedback('ok');
                return;
            }
            var apiMsg = getWeb3FormsError(data);
            var fallback = apiMsg || (window.I18N ? I18N.t('reservation.error') : 'Something went wrong. Please try again or contact us by phone.');
            if (result.status === 403) {
                fallback = apiMsg || 'Request blocked. Please submit from the live website (not server-side).';
            }
            showFormErrorMessage('reservation.error', fallback);
        })
        .catch(function() {
            showFormErrorMessage(
                'reservation.error',
                window.I18N ? I18N.t('reservation.error') : 'Something went wrong. Please try again or contact us by phone.'
            );
        })
        .finally(function() {
            setResBtnLoading(false);
        });
    });
}


/*  ESC key closes everything */
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeSearch();
        if (typeof $.magnificPopup !== 'undefined') $.magnificPopup.close();
    }
});


window.tesSwiperInstance = new Swiper('.tesSwiper', {
    slidesPerView: 1,
    spaceBetween: 22,
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    breakpoints: {
        640: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        }
    }
});


var cdH = document.getElementById('cdH');
if (cdH) {
    var cH = 8, cM = 45, cS = 30;
    setInterval(function() {
        cS--;
        if (cS < 0) { cS = 59; cM--; }
        if (cM < 0) { cM = 59; cH--; }
        if (cH < 0) { cH = 8; cM = 45; cS = 30; }
        cdH.textContent = String(cH).padStart(2, '0');
        document.getElementById('cdM').textContent = String(cM).padStart(2, '0');
        document.getElementById('cdS').textContent = String(cS).padStart(2, '0');
    }, 1000);
}

/*  NUMBER COUNTER ANIMATION*/
var numAnimated = false;
window.addEventListener('scroll', function() {
    var hero = document.getElementById('hero');
    if (!numAnimated && hero && window.scrollY > hero.offsetHeight - 300) {
        numAnimated = true;
        document.querySelectorAll('.snum').forEach(function(el) {
            var txt = el.textContent;
            var num = parseInt(txt);
            var suf = txt.replace(/[0-9]/g, '');
            if (isNaN(num)) return;
            var start = 0;
            var step = Math.ceil(num / 55);
            var iv = setInterval(function() {
                start += step;
                if (start >= num) {
                    start = num;
                    clearInterval(iv);
                }
                el.textContent = start + suf;
            }, 1400 / 55);
        });
    }
});