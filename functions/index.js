const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const REGION = 'asia-southeast1';

function assertAuth(context) {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'Must be logged in.');
    }
}

function validatePassword(password) {
    if (typeof password !== 'string' || password.length < 6) {
        throw new functions.https.HttpsError(
            'invalid-argument',
            'Password must be at least 6 characters.'
        );
    }
}

function validateEmail(email) {
    const trimmed = String(email || '').trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        throw new functions.https.HttpsError('invalid-argument', 'Valid email required.');
    }
    return trimmed;
}

function mapUser(user) {
    return {
        uid: user.uid,
        email: user.email || '',
        disabled: !!user.disabled,
        creationTime: user.metadata.creationTime || null
    };
}

exports.listAdminUsers = functions.region(REGION).https.onCall(async (_data, context) => {
    assertAuth(context);
    const result = await admin.auth().listUsers(1000);
    const users = result.users
        .filter(function (u) { return u.email; })
        .map(mapUser)
        .sort(function (a, b) {
            return String(a.email).localeCompare(String(b.email));
        });
    return { users: users };
});

exports.createAdminUser = functions.region(REGION).https.onCall(async (data, context) => {
    assertAuth(context);
    const email = validateEmail(data && data.email);
    validatePassword(data && data.password);

    try {
        const user = await admin.auth().createUser({
            email: email,
            password: data.password,
            emailVerified: false
        });
        return mapUser(user);
    } catch (err) {
        if (err.code === 'auth/email-already-exists') {
            throw new functions.https.HttpsError('already-exists', 'Email already in use.');
        }
        throw new functions.https.HttpsError('internal', err.message || 'Could not create user.');
    }
});

exports.updateAdminPassword = functions.region(REGION).https.onCall(async (data, context) => {
    assertAuth(context);
    const uid = data && data.uid;
    validatePassword(data && data.password);
    if (!uid || typeof uid !== 'string') {
        throw new functions.https.HttpsError('invalid-argument', 'User ID required.');
    }

    try {
        await admin.auth().updateUser(uid, { password: data.password });
        return { ok: true };
    } catch (err) {
        if (err.code === 'auth/user-not-found') {
            throw new functions.https.HttpsError('not-found', 'User not found.');
        }
        throw new functions.https.HttpsError('internal', err.message || 'Could not update password.');
    }
});

exports.deleteAdminUser = functions.region(REGION).https.onCall(async (data, context) => {
    assertAuth(context);
    const uid = data && data.uid;
    if (!uid || typeof uid !== 'string') {
        throw new functions.https.HttpsError('invalid-argument', 'User ID required.');
    }
    if (uid === context.auth.uid) {
        throw new functions.https.HttpsError('failed-precondition', 'Cannot delete your own account.');
    }

    try {
        await admin.auth().deleteUser(uid);
        return { ok: true };
    } catch (err) {
        if (err.code === 'auth/user-not-found') {
            throw new functions.https.HttpsError('not-found', 'User not found.');
        }
        throw new functions.https.HttpsError('internal', err.message || 'Could not delete user.');
    }
});
