AOS.init({
    duration: 680,
    once: true,
    offset: 55
});

var NAV_SECTIONS = ['hero', 'about', 'menu', 'testimonials', 'reservation'];

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


var menuPop = document.getElementById('menuPop');

// Service detail popup disabled — cards are display-only
function closeMenuPop() {
    if (!menuPop) return;
    menuPop.classList.remove('open');
    document.body.style.overflow = '';
}
window.openMenuPop = function() { /* disabled */ };
window.closeMenuPop = closeMenuPop;

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
var inquiryType = document.getElementById('inquiryType');
var inquiryTypeCol = document.getElementById('inquiryTypeCol');
var cateringGuests = document.getElementById('cateringGuests');
var cateringDate = document.getElementById('cateringDate');
var eventDate = document.getElementById('eventDate');
var guestCount = document.getElementById('guestCount');
var fullName = document.getElementById('fullName');
var phone = document.getElementById('phone');
var email = document.getElementById('email');
var msgLabel = document.getElementById('msgLabel');
var msgField = document.getElementById('msgField');
var resBtn = document.getElementById('resBtn');
var resOk = document.getElementById('resOk');
var resErr = document.getElementById('resErr');

function toggleInquiryFields() {
    if (!inquiryType) return;
    var type = inquiryType.options[inquiryType.selectedIndex].value;
    var isCatering = type === 'catering';
    if (inquiryTypeCol) inquiryTypeCol.className = isCatering ? 'col-sm-6' : 'col-12';
    if (cateringGuests) cateringGuests.style.display = isCatering ? '' : 'none';
    if (cateringDate) cateringDate.style.display = isCatering ? '' : 'none';
    if (eventDate) eventDate.required = isCatering;
    if (guestCount) guestCount.required = isCatering;
    if (msgLabel && window.I18N) {
        var msgKey = type === 'catering' ? 'reservation.msgEvent'
            : type === 'products' ? 'reservation.msgProducts'
            : 'reservation.msgDelivery';
        msgLabel.textContent = I18N.t(msgKey);
    }
    if (msgField && window.I18N) {
        var phKey = type === 'catering' ? 'reservation.placeholderEvent'
            : type === 'products' ? 'reservation.placeholderProducts'
            : 'reservation.placeholderDelivery';
        msgField.placeholder = I18N.t(phKey);
    }
}

if (inquiryType) {
    inquiryType.addEventListener('change', toggleInquiryFields);
    toggleInquiryFields();
}

window.onI18nApplied = function() {
    toggleInquiryFields();
    var mpLbl = document.getElementById('mpInquiryLbl');
    if (mpLbl && window.I18N) mpLbl.textContent = I18N.t('menu.inquiry');
};

function setResBtnLoading(loading) {
    if (!resBtn) return;
    resBtn.disabled = loading;
    if (loading) {
        resBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + (window.I18N ? I18N.t('reservation.submitting') : 'Submitting...');
    } else {
        resBtn.innerHTML = '<i class="fas fa-paper-plane"></i><span data-i18n="reservation.submit">' + (window.I18N ? I18N.t('reservation.submit') : 'Submit Request') + '</span>';
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
    var lines = ['Service: ' + data.inquiryType];
    if (data.isCatering) {
        lines.push('Event Date: ' + formatEmailDate(data.eventDate));
        lines.push('Guests: ' + data.guests);
    }
    lines.push('Phone: ' + data.phone);
    lines.push('');
    lines.push(data.message);
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
        Service: data.inquiryType,
        Phone: data.phone
    };

    if (data.isCatering) {
        body['Event Date'] = formatEmailDate(data.eventDate);
        body['Number of Guests'] = data.guests;
    }

    return body;
}

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

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

        var inquiryValue = inquiryType.options[inquiryType.selectedIndex].value;
        var isCatering = inquiryValue === 'catering';
        var inquiryLabel = inquiryType.options[inquiryType.selectedIndex].textContent.trim();
        var nameVal = fullName.value.trim();
        var emailVal = email.value.trim();
        var phoneVal = phone.value.trim();
        var msgVal = msgField.value.trim();
        var guestsVal = isCatering
            ? guestCount.options[guestCount.selectedIndex].textContent.trim()
            : '';

        var emailData = {
            inquiryType: inquiryLabel,
            inquiryValue: inquiryValue,
            name: nameVal,
            email: emailVal,
            phone: phoneVal,
            message: msgVal,
            isCatering: isCatering,
            eventDate: isCatering ? eventDate.value : '',
            guests: guestsVal
        };

        var body = buildWeb3FormsBody(accessKey, emailData);

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
                toggleInquiryFields();
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
        if (menuPop) closeMenuPop();
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