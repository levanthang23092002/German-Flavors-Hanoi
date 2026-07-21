/**
 * Admin account management — requires Cloud Functions (see FIREBASE_SETUP.md).
 */
(function () {
    'use strict';

    var REGION = 'asia-southeast1';
    var ctx = {};
    var users = [];
    var pwdTarget = null;

    function $(id) {
        return document.getElementById(id);
    }

    function t(key) {
        return ctx.t ? ctx.t(key) : key;
    }

    function toast(msg) {
        if (ctx.toast) ctx.toast(msg);
    }

    function showSectionAlert(type, msg) {
        var el = $('accountsAlert');
        if (!el) return;
        el.className = 'alert' + (type === 'err' ? ' alert-err' : type === 'ok' ? ' alert-ok' : type === 'warn' ? ' alert-warn' : '');
        el.textContent = msg || '';
        el.style.display = msg ? '' : 'none';
    }

    function showModalAlert(id, msg) {
        var el = $(id);
        if (!el) return;
        el.textContent = msg || '';
        el.style.display = msg ? '' : 'none';
    }

    function getFunctions() {
        if (typeof firebase === 'undefined' || !firebase.app) return null;
        try {
            return firebase.app().functions(REGION);
        } catch (e) {
            return null;
        }
    }

    function callFunction(name, data) {
        var fn = getFunctions();
        if (!fn) {
            return Promise.reject(new Error('functions-not-loaded'));
        }
        return fn.httpsCallable(name)(data || {});
    }

    function mapCallableError(err) {
        var code = err && err.code ? String(err.code) : '';
        var message = err && err.message ? String(err.message) : String(err || '');
        if (code.indexOf('functions/not-found') !== -1 || code.indexOf('not-found') !== -1 && message.indexOf('NOT_FOUND') !== -1) {
            return t('usersFunctionsMissing');
        }
        if (code.indexOf('unauthenticated') !== -1) {
            return t('usersNotLoggedIn');
        }
        if (code.indexOf('already-exists') !== -1) {
            return t('usersEmailExists');
        }
        if (code.indexOf('failed-precondition') !== -1) {
            return t('usersCannotDeleteSelf');
        }
        if (code.indexOf('invalid-argument') !== -1) {
            return message || t('usersInvalidInput');
        }
        if (message === 'functions-not-loaded') {
            return t('usersFunctionsMissing');
        }
        return message || t('usersActionFail');
    }

    function getCurrentUserRecord() {
        var user = ctx.getCurrentUser ? ctx.getCurrentUser() : null;
        if (!user || !user.email) return null;
        var meta = user.metadata || {};
        return {
            uid: user.uid,
            email: user.email,
            disabled: false,
            creationTime: meta.creationTime || null
        };
    }

    function mergeWithCurrentUser(list) {
        var current = getCurrentUserRecord();
        var merged = (list || []).slice();
        if (!current) return merged;
        var found = merged.some(function (u) { return u.uid === current.uid; });
        if (!found) merged.push(current);
        merged.sort(function (a, b) {
            return String(a.email).localeCompare(String(b.email));
        });
        return merged;
    }

    function formatDate(iso) {
        if (!iso) return '—';
        try {
            var d = new Date(iso);
            return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
        } catch (e) {
            return iso;
        }
    }

    function renderUserList() {
        var list = $('accountsList');
        if (!list) return;

        if (!users.length) {
            list.innerHTML = '<p class="hint">' + escapeHtml(t('usersEmpty')) + '</p>';
            return;
        }

        var currentUid = ctx.getCurrentUser ? ctx.getCurrentUser().uid : '';
        var html = users.map(function (u) {
            var isSelf = u.uid === currentUid;
            return (
                '<div class="admin-user-row' + (isSelf ? ' is-self' : '') + '">' +
                '<div class="admin-user-info">' +
                '<div class="admin-user-head">' +
                '<strong>' + escapeHtml(u.email) + '</strong>' +
                (isSelf ? '<span class="admin-user-badge">' + escapeHtml(t('usersYou')) + '</span>' : '') +
                '</div>' +
                '<span class="admin-user-meta">' + escapeHtml(t('usersCreatedAt')) + ': ' + escapeHtml(formatDate(u.creationTime)) + '</span>' +
                '</div>' +
                '<div class="admin-user-actions">' +
                '<button type="button" class="btn btn-sm btn-ghost js-user-pwd" data-uid="' + escapeAttr(u.uid) + '" data-email="' + escapeAttr(u.email) + '">' +
                '<i class="fas fa-key"></i> <span>' + escapeHtml(t('usersChangePwd')) + '</span></button>' +
                (isSelf ? '' :
                    '<button type="button" class="btn btn-sm btn-ghost btn-danger js-user-del" data-uid="' + escapeAttr(u.uid) + '" data-email="' + escapeAttr(u.email) + '">' +
                    '<i class="fas fa-trash"></i> <span>' + escapeHtml(t('usersDelete')) + '</span></button>') +
                '</div></div>'
            );
        }).join('');

        list.innerHTML = html;

        list.querySelectorAll('.js-user-pwd').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var uid = btn.getAttribute('data-uid');
                var email = btn.getAttribute('data-email');
                var currentUid = ctx.getCurrentUser ? ctx.getCurrentUser().uid : '';
                if (uid === currentUid) {
                    openOwnPwdModal();
                } else {
                    openPwdModal(uid, email);
                }
            });
        });
        list.querySelectorAll('.js-user-del').forEach(function (btn) {
            btn.addEventListener('click', function () {
                deleteUser(btn.getAttribute('data-uid'), btn.getAttribute('data-email'));
            });
        });
    }

    function escapeHtml(str) {
        return String(str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function escapeAttr(str) {
        return escapeHtml(str).replace(/'/g, '&#39;');
    }

    function loadUsers() {
        var list = $('accountsList');
        if (list) list.innerHTML = '<p class="hint">' + escapeHtml(t('usersLoading')) + '</p>';
        showSectionAlert('', '');

        return callFunction('listAdminUsers')
            .then(function (res) {
                users = mergeWithCurrentUser((res.data && res.data.users) || []);
                renderUserList();
            })
            .catch(function (err) {
                users = mergeWithCurrentUser([]);
                renderUserList();
                if (users.length) {
                    showSectionAlert('warn', mapCallableError(err) + ' ' + t('usersShowingCurrentOnly'));
                } else {
                    showSectionAlert('err', mapCallableError(err));
                }
            });
    }

    function openOwnPwdModal() {
        resetPasswordField('ownCurrentPassword');
        resetPasswordField('ownNewPassword');
        resetPasswordField('ownNewPasswordConfirm');
        showModalAlert('ownPwdModalAlert', '');
        var modal = $('ownPwdModal');
        if (modal) modal.hidden = false;
    }

    function closeOwnPwdModal() {
        var modal = $('ownPwdModal');
        if (modal) modal.hidden = true;
    }

    function openAddAdminModal() {
        if ($('newAdminEmail')) $('newAdminEmail').value = '';
        resetPasswordField('newAdminPassword');
        resetPasswordField('newAdminPasswordConfirm');
        showModalAlert('addAdminModalAlert', '');
        var modal = $('addAdminModal');
        if (modal) modal.hidden = false;
    }

    function closeAddAdminModal() {
        var modal = $('addAdminModal');
        if (modal) modal.hidden = true;
    }

    function createUser() {
        var email = ($('newAdminEmail') && $('newAdminEmail').value || '').trim();
        var password = $('newAdminPassword') ? $('newAdminPassword').value : '';
        var confirm = $('newAdminPasswordConfirm') ? $('newAdminPasswordConfirm').value : '';
        showModalAlert('addAdminModalAlert', '');

        if (!email || !password) {
            showModalAlert('addAdminModalAlert', t('usersFillRequired'));
            return;
        }
        if (password.length < 6) {
            showModalAlert('addAdminModalAlert', t('usersPwdMin'));
            return;
        }
        if (password !== confirm) {
            showModalAlert('addAdminModalAlert', t('usersPwdMismatch'));
            return;
        }

        var btn = $('createAdminBtn');
        if (btn) btn.disabled = true;

        callFunction('createAdminUser', { email: email, password: password })
            .then(function () {
                toast(t('usersCreatedToast'));
                closeAddAdminModal();
                return loadUsers();
            })
            .catch(function (err) {
                showModalAlert('addAdminModalAlert', mapCallableError(err));
            })
            .finally(function () {
                if (btn) btn.disabled = false;
            });
    }

    function changeOwnPassword() {
        var user = ctx.getCurrentUser ? ctx.getCurrentUser() : null;
        if (!user || !user.email) return;

        var current = $('ownCurrentPassword') ? $('ownCurrentPassword').value : '';
        var next = $('ownNewPassword') ? $('ownNewPassword').value : '';
        var confirm = $('ownNewPasswordConfirm') ? $('ownNewPasswordConfirm').value : '';
        showModalAlert('ownPwdModalAlert', '');

        if (!current || !next) {
            showModalAlert('ownPwdModalAlert', t('usersFillRequired'));
            return;
        }
        if (next.length < 6) {
            showModalAlert('ownPwdModalAlert', t('usersPwdMin'));
            return;
        }
        if (next !== confirm) {
            showModalAlert('ownPwdModalAlert', t('usersPwdMismatch'));
            return;
        }

        var btn = $('changeOwnPwdBtn');
        if (btn) btn.disabled = true;

        var credential = firebase.auth.EmailAuthProvider.credential(user.email, current);
        user.reauthenticateWithCredential(credential)
            .then(function () {
                return user.updatePassword(next);
            })
            .then(function () {
                toast(t('usersPwdUpdated'));
                closeOwnPwdModal();
            })
            .catch(function (err) {
                var code = err && err.code ? String(err.code) : '';
                if (code.indexOf('wrong-password') !== -1 || code.indexOf('invalid-credential') !== -1) {
                    showModalAlert('ownPwdModalAlert', t('usersWrongPassword'));
                } else if (code.indexOf('requires-recent-login') !== -1) {
                    showModalAlert('ownPwdModalAlert', t('usersRecentLogin'));
                } else {
                    showModalAlert('ownPwdModalAlert', err.message || t('usersActionFail'));
                }
            })
            .finally(function () {
                if (btn) btn.disabled = false;
            });
    }

    function openPwdModal(uid, email) {
        pwdTarget = { uid: uid, email: email };
        var modal = $('userPwdModal');
        var title = $('userPwdModalTitle');
        if (title) title.textContent = t('usersChangePwdFor') + ' ' + (email || '');
        resetPasswordField('userPwdNew');
        resetPasswordField('userPwdConfirm');
        showModalAlert('userPwdModalAlert', '');
        if (modal) modal.hidden = false;
    }

    function closePwdModal() {
        pwdTarget = null;
        var modal = $('userPwdModal');
        if (modal) modal.hidden = true;
    }

    function saveOtherPassword() {
        if (!pwdTarget) return;
        var next = $('userPwdNew') ? $('userPwdNew').value : '';
        var confirm = $('userPwdConfirm') ? $('userPwdConfirm').value : '';

        if (!next) {
            showModalAlert('userPwdModalAlert', t('usersFillRequired'));
            return;
        }
        if (next.length < 6) {
            showModalAlert('userPwdModalAlert', t('usersPwdMin'));
            return;
        }
        if (next !== confirm) {
            showModalAlert('userPwdModalAlert', t('usersPwdMismatch'));
            return;
        }

        var btn = $('userPwdSaveBtn');
        if (btn) btn.disabled = true;
        showModalAlert('userPwdModalAlert', '');

        callFunction('updateAdminPassword', { uid: pwdTarget.uid, password: next })
            .then(function () {
                toast(t('usersPwdUpdated'));
                closePwdModal();
            })
            .catch(function (err) {
                showModalAlert('userPwdModalAlert', mapCallableError(err));
            })
            .finally(function () {
                if (btn) btn.disabled = false;
            });
    }

    function deleteUser(uid, email) {
        if (!uid) return;
        if (!window.confirm(t('usersConfirmDelete').replace('{email}', email || ''))) return;
        showSectionAlert('', '');

        callFunction('deleteAdminUser', { uid: uid })
            .then(function () {
                toast(t('usersDeleted'));
                return loadUsers();
            })
            .catch(function (err) {
                showSectionAlert('err', mapCallableError(err));
            });
    }

    function setupNoAutofill() {
        document.querySelectorAll('.js-no-autofill').forEach(function (el) {
            if (el.dataset.autofillBound) return;
            el.dataset.autofillBound = '1';
            el.addEventListener('focus', function () {
                el.removeAttribute('readonly');
            });
        });
    }

    function resetPasswordField(id) {
        var el = $(id);
        if (!el) return;
        el.value = '';
        el.setAttribute('readonly', '');
        if (window.AdminPasswordToggle) {
            AdminPasswordToggle.reset(el, { t: t });
        }
    }

    function closeAllModals() {
        closeOwnPwdModal();
        closeAddAdminModal();
        closePwdModal();
    }

    function bindEvents() {
        var createBtn = $('createAdminBtn');
        if (createBtn) createBtn.addEventListener('click', createUser);

        var ownBtn = $('changeOwnPwdBtn');
        if (ownBtn) ownBtn.addEventListener('click', changeOwnPassword);

        var topPwdBtn = $('accountsUpdatePwdBtn');
        if (topPwdBtn) topPwdBtn.addEventListener('click', openOwnPwdModal);

        var topAddBtn = $('accountsAddAdminBtn');
        if (topAddBtn) topAddBtn.addEventListener('click', openAddAdminModal);

        var saveBtn = $('userPwdSaveBtn');
        if (saveBtn) saveBtn.addEventListener('click', saveOtherPassword);

        document.querySelectorAll('[data-user-modal-close]').forEach(function (el) {
            el.addEventListener('click', closePwdModal);
        });
        document.querySelectorAll('[data-own-modal-close]').forEach(function (el) {
            el.addEventListener('click', closeOwnPwdModal);
        });
        document.querySelectorAll('[data-add-admin-modal-close]').forEach(function (el) {
            el.addEventListener('click', closeAddAdminModal);
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeAllModals();
        });
    }

    window.AdminUsers = {
        init: function (options) {
            ctx = options || {};
            setupNoAutofill();
            if (window.AdminPasswordToggle) {
                AdminPasswordToggle.init(document, { t: t });
            }
            bindEvents();
        },
        onSectionEnter: function () {
            closeAllModals();
            loadUsers();
        },
        refresh: function () {
            renderUserList();
            if (window.AdminPasswordToggle) {
                AdminPasswordToggle.refreshLabels(document, { t: t });
            }
        }
    };
})();
