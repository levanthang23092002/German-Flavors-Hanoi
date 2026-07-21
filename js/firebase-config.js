/**
 * Firebase configuration — German Flavors Hanoi CMS
 *
 * Setup:
 * 1. Tạo project tại https://console.firebase.google.com
 * 2. Bật Authentication → Email/Password
 * 3. Tạo Firestore Database
 * 4. Project settings → Your apps → Web → copy config vào FIREBASE_CONFIG bên dưới
 * 5. Tạo user admin: Authentication → Users → Add user
 * 6. Xem FIREBASE_SETUP.md để cấu hình Security Rules
 *
 * Không dùng Firebase Storage — ảnh upload qua Cloudinary, URL lưu trong Firestore (xem CLOUDINARY_SETUP.md).
 */
var FIREBASE_CONFIG = {
    apiKey: "AIzaSyDoDZ3brwut-6pQa7sPxPcCzTKAgsgO3rE",
    authDomain: "german-flavors-hanoi.firebaseapp.com",
    projectId: "german-flavors-hanoi",
    storageBucket: "german-flavors-hanoi.firebasestorage.app",
    messagingSenderId: "272757377916",
    appId: "1:272757377916:web:5f4bef227d0cadaa5232f9",
    measurementId: "G-264PP9J6M2"
};

var FIREBASE_READY = false;

function initFirebaseApp() {
    if (typeof firebase === 'undefined') {
        console.warn('[CMS] Firebase SDK chưa được load.');
        return null;
    }
    if (!FIREBASE_CONFIG.apiKey || FIREBASE_CONFIG.apiKey === 'YOUR_API_KEY') {
        console.warn('[CMS] Chưa cấu hình Firebase. Mở js/firebase-config.js và dán config từ Console.');
        return null;
    }
    if (!firebase.apps.length) {
        firebase.initializeApp(FIREBASE_CONFIG);
    }
    FIREBASE_READY = true;
    return firebase.app();
}
