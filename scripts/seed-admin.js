/**
 * One-time: add admin to Firebase Auth + Firestore admins collection.
 * Requires Firestore rules published (admins block). See FIREBASE_SETUP.md §9.
 *
 * Usage:
 *   node scripts/seed-admin.js bjoern@germanflavorshanoi.com admin123456
 */
'use strict';

var apiKey = 'AIzaSyDoDZ3brwut-6pQa7sPxPcCzTKAgsgO3rE';
var projectId = 'german-flavors-hanoi';

var email = (process.argv[2] || '').trim();
var password = process.argv[3] || '';

if (!email || !password) {
    console.error('Usage: node scripts/seed-admin.js <email> <password>');
    process.exit(1);
}

var docId = email.toLowerCase().replace(/[^a-z0-9+]/g, '_');

function post(url, body) {
    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }).then(function (r) {
        return r.json().then(function (data) {
            return { ok: r.ok, data: data };
        });
    });
}

function patchFirestore(idToken, uid) {
    var url = 'https://firestore.googleapis.com/v1/projects/' + projectId +
        '/databases/(default)/documents/admins/' + docId;
    return fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + idToken
        },
        body: JSON.stringify({
            fields: {
                email: { stringValue: email },
                uid: { stringValue: uid },
                active: { booleanValue: true },
                addedBy: { stringValue: uid }
            }
        })
    }).then(function (r) {
        return r.json().then(function (data) {
            return { ok: r.ok, data: data };
        });
    });
}

post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + apiKey, {
    email: email,
    password: password,
    returnSecureToken: true
}).then(function (res) {
    if (res.data.idToken) {
        console.log('Created Auth user:', email);
        return { idToken: res.data.idToken, uid: res.data.localId };
    }
    if (res.data.error && res.data.error.message === 'EMAIL_EXISTS') {
        console.log('Auth user exists, signing in...');
        return post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + apiKey, {
            email: email,
            password: password,
            returnSecureToken: true
        }).then(function (signIn) {
            if (!signIn.data.idToken) {
                console.error('Sign in failed:', JSON.stringify(signIn.data));
                process.exit(1);
            }
            return { idToken: signIn.data.idToken, uid: signIn.data.localId };
        });
    }
    console.error('Sign up failed:', JSON.stringify(res.data));
    process.exit(1);
}).then(function (auth) {
    return patchFirestore(auth.idToken, auth.uid).then(function (fs) {
        if (fs.ok) {
            console.log('Added Firestore admins/' + docId);
            console.log('OK — login at /admin/login.html with', email);
            return;
        }
        console.error('Firestore failed (publish rules first?):', JSON.stringify(fs.data));
        process.exit(1);
    });
}).catch(function (err) {
    console.error(err);
    process.exit(1);
});
