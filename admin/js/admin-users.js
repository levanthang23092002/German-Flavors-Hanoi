/**
 * Admin accounts — stored in Firestore collection `admins` (no Cloud Functions / Blaze required).
 */
(function () {
    'use strict';

    var ADMINS = 'admins';
    var SECONDARY_APP = 'AdminCreator';
    var ctx = {};
    var users = [];
    var editTarget = null;

    function $(id) {
        return document.getElementById(id);
    }

    function t(key) {
        return ctx.t ? ctx.t(key) : key;
    }

    function toast(msg) {
        if (ctx.toast) ctx.toast(msg);
    }

    function getDb() {
        return ctx.getDb ? ctx.getDb() : null;
    }

    function showSectionAlert(type, msg) {
        var el = $('accountsAlert');
        if (!el) return;
        el.className = 'alert' + (msg ? ' show' : '') +
            (type === 'err' ? ' alert-err' : type === 'ok' ? ' alert-ok' : type === 'warn' ? ' alert-warn' : '');
        el.textContent = msg || '';
    }

    function showModalAlert(id, msg, type) {
        var el = $(id);
        if (!el) return;
        el.className = 'alert' + (msg ? ' show' : '') +
            (type === 'ok' ? ' alert-ok' : ' alert-err');
        el.textContent = msg || '';
    }

    function setButtonLoading(btn, loading) {
        if (!btn) return;
        btn.disabled = !!loading;
        if (loading) {
            if (!btn.dataset.idleHtml) btn.dataset.idleHtml = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + escapeHtml(t('usersWorking'));
        } else if (btn.dataset.idleHtml) {
            btn.innerHTML = btn.dataset.idleHtml;
        }
    }

    function normalizeEmail(email) {
        return String(email || '').trim().toLowerCase();
    }

    function emailDocId(email) {
        return normalizeEmail(email).replace(/[^a-z0-9+]/g, '_');
    }

    function mapAuthError(err) {
        var code = err && err.code ? String(err.code) : '';
        if (code.indexOf('email-already-in-use') !== -1) return t('usersEmailExists');
        if (code.indexOf('invalid-email') !== -1) return t('usersInvalidInput');
        if (code.indexOf('weak-password') !== -1) return t('usersPwdMin');
        if (code.indexOf('permission-denied') !== -1) return t('usersRulesMissing');
        return (err && err.message) || t('usersActionFail');
    }

    function docToUser(doc) {
        var data = doc.data() || {};
        var created = data.createdAt;
        var createdIso = null;
        if (created && typeof created.toDate === 'function') {
            createdIso = created.toDate().toISOString();
        } else if (created) {
            createdIso = String(created);
        }
        return {
            id: doc.id,
            email: data.email || '',
            uid: data.uid || '',
            active: data.active !== false,
            creationTime: createdIso
        };
    }

    function getCurrentUserRecord() {
        var user = ctx.getCurrentUser ? ctx.getCurrentUser() : null;
        if (!user || !user.email) return null;
        var meta = user.metadata || {};
        return {
            id: emailDocId(user.email),
            uid: user.uid,
            email: user.email,
            active: true,
            creationTime: meta.creationTime || null
        };
    }

    function mergeWithCurrentUser(list) {
        var current = getCurrentUserRecord();
        var merged = (list || []).slice();
        if (!current) return merged;
        var found = merged.some(function (u) {
            return u.id === current.id || (current.uid && u.uid === current.uid);
        });
        if (!found) merged.push(current);
        merged.sort(function (a, b) {
            return String(a.email).localeCompare(String(b.email));
        });
        return merged;
    }

    function formatDate(iso) {
        if (!iso) return '—';
        try {
            return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
        } catch (e) {
            return iso;
        }
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

    function renderUserList() {
        var list = $('accountsList');
        if (!list) return;

        if (!users.length) {
            list.innerHTML = '<p class="hint">' + escapeHtml(t('usersEmpty')) + '</p>';
            return;
        }

        var current = ctx.getCurrentUser ? ctx.getCurrentUser() : null;
        var currentEmail = current && current.email ? normalizeEmail(current.email) : '';

        var html = users.map(function (u) {
            var isSelf = normalizeEmail(u.email) === currentEmail;
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
                (isSelf ?
                    '<button type="button" class="btn btn-sm btn-ghost js-user-pwd">' +
                    '<i class="fas fa-key"></i> <span>' + escapeHtml(t('usersChangePwd')) + '</span></button>' :
                    '<button type="button" class="btn btn-sm btn-ghost js-user-edit" data-id="' + escapeAttr(u.id) + '" data-email="' + escapeAttr(u.email) + '">' +
                    '<i class="fas fa-pen"></i> <span>' + escapeHtml(t('usersEdit')) + '</span></button>' +
                    '<button type="button" class="btn btn-sm btn-ghost js-user-reset" data-email="' + escapeAttr(u.email) + '">' +
                    '<i class="fas fa-envelope"></i> <span>' + escapeHtml(t('usersSendReset')) + '</span></button>' +
                    '<button type="button" class="btn btn-sm btn-ghost btn-danger js-user-del" data-id="' + escapeAttr(u.id) + '" data-email="' + escapeAttr(u.email) + '">' +
                    '<i class="fas fa-trash"></i> <span>' + escapeHtml(t('usersDelete')) + '</span></button>') +
                '</div></div>'
            );
        }).join('');

        list.innerHTML = html;

        list.querySelectorAll('.js-user-pwd').forEach(function (btn) {
            btn.addEventListener('click', openOwnPwdModal);
        });
        list.querySelectorAll('.js-user-edit').forEach(function (btn) {
            btn.addEventListener('click', function () {
                openEditModal(btn.getAttribute('data-id'), btn.getAttribute('data-email'));
            });
        });
        list.querySelectorAll('.js-user-reset').forEach(function (btn) {
            btn.addEventListener('click', function () {
                sendResetEmail(btn.getAttribute('data-email'), btn);
            });
        });
        list.querySelectorAll('.js-user-del').forEach(function (btn) {
            btn.addEventListener('click', function () {
                deleteUser(btn.getAttribute('data-id'), btn.getAttribute('data-email'), btn);
            });
        });
    }

    function loadUsers() {
        var db = getDb();
        var list = $('accountsList');
        if (list) list.innerHTML = '<p class="hint">' + escapeHtml(t('usersLoading')) + '</p>';
        showSectionAlert('', '');

        if (!db) {
            users = mergeWithCurrentUser([]);
            renderUserList();
            showSectionAlert('err', t('firebaseMissing'));
            return Promise.resolve();
        }

        return db.collection(ADMINS).orderBy('email').get()
            .then(function (snap) {
                users = snap.docs.map(docToUser).filter(function (u) { return u.active !== false; });
                if (!users.length) {
                    return bootstrapCurrentAdmin(db);
                }
            })
            .then(function () {
                if (!users.length && getDb()) {
                    return getDb().collection(ADMINS).orderBy('email').get();
                }
            })
            .then(function (snap) {
                if (snap) {
                    users = snap.docs.map(docToUser).filter(function (u) { return u.active !== false; });
                }
                users = mergeWithCurrentUser(users);
                renderUserList();
                showSectionAlert('', '');
            })
            .catch(function (err) {
                console.warn('[AdminUsers] load failed:', err);
                users = mergeWithCurrentUser([]);
                renderUserList();
                showSectionAlert('err', mapFirestoreError(err));
            });
    }

    function mapFirestoreError(err) {
        var code = err && err.code ? String(err.code) : '';
        var message = err && err.message ? String(err.message) : '';
        if (code.indexOf('permission-denied') !== -1 ||
            message.indexOf('Missing or insufficient permissions') !== -1) {
            return t('usersRulesMissing');
        }
        return message || t('usersActionFail');
    }

    function bootstrapCurrentAdmin(db) {
        var user = ctx.getCurrentUser ? ctx.getCurrentUser() : null;
        if (!user || !user.email) return Promise.resolve();
        var docId = emailDocId(user.email);
        return db.collection(ADMINS).doc(docId).set({
            email: user.email,
            uid: user.uid,
            active: true,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            addedBy: user.uid
        });
    }

    function createAuthUser(email, password) {
        if (typeof FIREBASE_CONFIG === 'undefined') {
            return Promise.reject(new Error('Firebase config missing'));
        }
        var secondaryApp;
        try {
            secondaryApp = firebase.app(SECONDARY_APP);
        } catch (e) {
            secondaryApp = firebase.initializeApp(FIREBASE_CONFIG, SECONDARY_APP);
        }
        return firebase.auth(secondaryApp).createUserWithEmailAndPassword(email, password)
            .then(function (cred) {
                var uid = cred.user.uid;
                return firebase.auth(secondaryApp).signOut().then(function () {
                    return secondaryApp.delete().catch(function () {});
                }).then(function () {
                    return uid;
                });
            })
            .catch(function (err) {
                return firebase.auth(secondaryApp).signOut().catch(function () {})
                    .then(function () { return secondaryApp.delete().catch(function () {}); })
                    .then(function () { return Promise.reject(err); });
            });
    }

    function createUser() {
        var email = ($('newAdminEmail') && $('newAdminEmail').value || '').trim();
        var password = $('newAdminPassword') ? $('newAdminPassword').value : '';
        var confirm = $('newAdminPasswordConfirm') ? $('newAdminPasswordConfirm').value : '';
        var db = getDb();
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
        if (!db) {
            showModalAlert('addAdminModalAlert', t('firebaseMissing'));
            return;
        }

        var btn = $('createAdminBtn');
        var docId = emailDocId(email);
        var current = ctx.getCurrentUser ? ctx.getCurrentUser() : null;
        setButtonLoading(btn, true);

        db.collection(ADMINS).doc(docId).get()
            .then(function (existing) {
                if (existing.exists && existing.data().active !== false) {
                    return Promise.reject({ code: 'admins/already-exists' });
                }
                return createAuthUser(email, password)
                    .catch(function (err) {
                        if (err && err.code === 'auth/email-already-in-use') {
                            return null;
                        }
                        return Promise.reject(err);
                    })
                    .then(function (uid) {
                        return db.collection(ADMINS).doc(docId).set({
                            email: email,
                            uid: uid || (existing.exists ? (existing.data().uid || '') : ''),
                            active: true,
                            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                            addedBy: current ? current.uid : ''
                        });
                    });
            })
            .then(function () {
                toast(t('usersCreatedToast'));
                showSectionAlert('ok', t('usersCreatedToast'));
                closeAddAdminModal();
                return loadUsers();
            })
            .catch(function (err) {
                if (err && err.code === 'admins/already-exists') {
                    showModalAlert('addAdminModalAlert', t('usersEmailExists'));
                } else if (err && err.code && String(err.code).indexOf('permission') !== -1) {
                    showModalAlert('addAdminModalAlert', mapFirestoreError(err));
                } else {
                    showModalAlert('addAdminModalAlert', mapAuthError(err));
                }
            })
            .finally(function () {
                setButtonLoading(btn, false);
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
        setButtonLoading(btn, true);

        var credential = firebase.auth.EmailAuthProvider.credential(user.email, current);
        user.reauthenticateWithCredential(credential)
            .then(function () { return user.updatePassword(next); })
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
                setButtonLoading(btn, false);
            });
    }

    function openEditModal(docId, email) {
        editTarget = { id: docId, email: email };
        if ($('editUserEmail')) $('editUserEmail').value = email || '';
        showModalAlert('editUserModalAlert', '');
        var modal = $('editUserModal');
        if (modal) modal.hidden = false;
        document.body.style.overflow = 'hidden';
    }

    function closeEditModal() {
        editTarget = null;
        var modal = $('editUserModal');
        if (modal) modal.hidden = true;
        document.body.style.overflow = '';
    }

    function saveEditUser() {
        if (!editTarget) return;
        var db = getDb();
        var email = ($('editUserEmail') && $('editUserEmail').value || '').trim();
        showModalAlert('editUserModalAlert', '');

        if (!email || !db) {
            showModalAlert('editUserModalAlert', t('usersFillRequired'));
            return;
        }

        var newId = emailDocId(email);
        var oldId = editTarget.id;
        var btn = $('editUserSaveBtn');
        setButtonLoading(btn, true);

        var chain = Promise.resolve();
        if (newId !== oldId) {
            chain = db.collection(ADMINS).doc(newId).get().then(function (doc) {
                if (doc.exists && doc.data().active !== false) {
                    return Promise.reject({ code: 'admins/already-exists' });
                }
                return db.collection(ADMINS).doc(oldId).get().then(function (oldDoc) {
                    var data = oldDoc.exists ? oldDoc.data() : { email: editTarget.email };
                    data.email = email;
                    return db.collection(ADMINS).doc(newId).set(data)
                        .then(function () { return db.collection(ADMINS).doc(oldId).delete(); });
                });
            });
        } else {
            chain = db.collection(ADMINS).doc(oldId).update({ email: email });
        }

        chain
            .then(function () {
                toast(t('usersUpdatedToast'));
                showSectionAlert('ok', t('usersUpdatedToast'));
                closeEditModal();
                return loadUsers();
            })
            .catch(function (err) {
                if (err && err.code === 'admins/already-exists') {
                    showModalAlert('editUserModalAlert', t('usersEmailExists'));
                } else {
                    showModalAlert('editUserModalAlert', err.message || t('usersActionFail'));
                }
            })
            .finally(function () {
                setButtonLoading(btn, false);
            });
    }

    function sendResetEmail(email, btn) {
        if (!email) return;
        setButtonLoading(btn, true);
        firebase.auth().sendPasswordResetEmail(email)
            .then(function () {
                toast(t('usersResetSent'));
                showSectionAlert('ok', t('usersResetSent'));
            })
            .catch(function (err) {
                showSectionAlert('err', mapAuthError(err));
            })
            .finally(function () {
                setButtonLoading(btn, false);
            });
    }

    function deleteUser(docId, email, btn) {
        if (!docId) return;
        var current = ctx.getCurrentUser ? ctx.getCurrentUser() : null;
        if (current && normalizeEmail(current.email) === normalizeEmail(email)) {
            showSectionAlert('err', t('usersCannotDeleteSelf'));
            return;
        }
        if (!window.confirm(t('usersConfirmDelete').replace('{email}', email || ''))) return;

        var db = getDb();
        if (!db) return;

        showSectionAlert('', '');
        setButtonLoading(btn, true);

        db.collection(ADMINS).doc(docId).delete()
            .then(function () {
                toast(t('usersDeleted'));
                showSectionAlert('ok', t('usersDeleted'));
                return loadUsers();
            })
            .catch(function (err) {
                showSectionAlert('err', err.message || t('usersActionFail'));
            })
            .finally(function () {
                setButtonLoading(btn, false);
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

    function openOwnPwdModal() {
        resetPasswordField('ownCurrentPassword');
        resetPasswordField('ownNewPassword');
        resetPasswordField('ownNewPasswordConfirm');
        showModalAlert('ownPwdModalAlert', '');
        var modal = $('ownPwdModal');
        if (modal) modal.hidden = false;
        document.body.style.overflow = 'hidden';
    }

    function closeOwnPwdModal() {
        var modal = $('ownPwdModal');
        if (modal) modal.hidden = true;
        document.body.style.overflow = '';
    }

    function openAddAdminModal() {
        if ($('newAdminEmail')) $('newAdminEmail').value = '';
        resetPasswordField('newAdminPassword');
        resetPasswordField('newAdminPasswordConfirm');
        showModalAlert('addAdminModalAlert', '');
        var modal = $('addAdminModal');
        if (modal) modal.hidden = false;
        document.body.style.overflow = 'hidden';
    }

    function closeAddAdminModal() {
        var modal = $('addAdminModal');
        if (modal) modal.hidden = true;
        document.body.style.overflow = '';
    }

    function closeAllModals() {
        closeOwnPwdModal();
        closeAddAdminModal();
        closeEditModal();
    }

    function bindEvents() {
        var createBtn = $('createAdminBtn');
        if (createBtn) createBtn.addEventListener('click', createUser);

        var ownBtn = $('changeOwnPwdBtn');
        if (ownBtn) ownBtn.addEventListener('click', changeOwnPassword);

        var editBtn = $('editUserSaveBtn');
        if (editBtn) editBtn.addEventListener('click', saveEditUser);

        var topPwdBtn = $('accountsUpdatePwdBtn');
        if (topPwdBtn) topPwdBtn.addEventListener('click', openOwnPwdModal);

        var topAddBtn = $('accountsAddAdminBtn');
        if (topAddBtn) topAddBtn.addEventListener('click', openAddAdminModal);

        var refreshBtn = $('accountsRefreshBtn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', function () {
                setButtonLoading(refreshBtn, true);
                loadUsers().finally(function () {
                    setButtonLoading(refreshBtn, false);
                });
            });
        }

        document.querySelectorAll('[data-own-modal-close]').forEach(function (el) {
            el.addEventListener('click', closeOwnPwdModal);
        });
        document.querySelectorAll('[data-add-admin-modal-close]').forEach(function (el) {
            el.addEventListener('click', closeAddAdminModal);
        });
        document.querySelectorAll('[data-edit-user-modal-close]').forEach(function (el) {
            el.addEventListener('click', closeEditModal);
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
            var refreshBtn = $('accountsRefreshBtn');
            if (refreshBtn && !refreshBtn.dataset.idleHtml) {
                refreshBtn.innerHTML = '<i class="fas fa-sync"></i> <span>' + escapeHtml(t('usersRefresh')) + '</span>';
            }
            if (window.AdminPasswordToggle) {
                AdminPasswordToggle.refreshLabels(document, { t: t });
            }
        },
        ensureAdminAccess: function (user) {
            var db = getDb();
            if (!db || !user || !user.email) return Promise.resolve();
            var docId = emailDocId(user.email);
            return db.collection(ADMINS).limit(1).get().then(function (snap) {
                if (snap.empty) {
                    return db.collection(ADMINS).doc(docId).set({
                        email: user.email,
                        uid: user.uid,
                        active: true,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                        addedBy: user.uid
                    });
                }
                return db.collection(ADMINS).doc(docId).get().then(function (doc) {
                    if (!doc.exists || doc.data().active === false) {
                        return firebase.auth().signOut();
                    }
                });
            });
        }
    };
})();
