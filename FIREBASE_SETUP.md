# Firebase CMS Setup – German Flavors Hanoi

Hệ thống quản trị nội dung website (About Us, Our Services, Testimonials, thông tin liên hệ) dùng **Firebase Authentication** + **Cloud Firestore**.

**Không cần Firebase Storage** (trả phí / Blaze). Ảnh dùng đường dẫn trong thư mục `img/` hoặc URL công khai.

## 1. Tạo project Firebase

1. Vào [Firebase Console](https://console.firebase.google.com)
2. **Add project** → đặt tên (vd: `german-flavors-hanoi`)
3. Tắt Google Analytics nếu không cần → Create

## 2. Đăng ký Web App

1. Project Overview → **Add app** → Web (`</>`)
2. Đặt nickname → Register app
3. Copy object `firebaseConfig`
4. Dán vào file `sarab/js/firebase-config.js` thay cho các giá trị `YOUR_...`

## 3. Bật Authentication

1. Build → **Authentication** → Get started
2. Sign-in method → **Email/Password** → Enable → Save
3. Tab **Users** → **Add user**
   - Email + mật khẩu admin (vd: `admin@germanflavorshanoi.com`)
4. Lưu mật khẩu ở nơi an toàn

> Sau khi deploy Cloud Functions (mục 9), admin có thể **tạo thêm tài khoản** và **đổi mật khẩu** ngay trong CMS → tab **Tài khoản**.

## 4. Tạo Firestore Database

1. Build → **Firestore Database** → Create database
2. Chọn chế độ **production mode**
3. Chọn region gần (vd: `asia-southeast1`)

### Security Rules (Firestore)

Vào Firestore → Rules → dán:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /content/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

→ **Publish** (bắt buộc — nếu không Publish thì vẫn bị lỗi quyền)

### Lỗi: `Missing or insufficient permissions`

Nghĩa là Rules đang chặn ghi. Sửa:

1. Firebase Console → **Firestore Database** → tab **Rules**
2. Dán đúng đoạn rules ở trên (hoặc copy từ file `firestore.rules` trong project)
3. Bấm **Publish**
4. Đảm bảo đã **đăng nhập** admin (`/admin/login.html`) — chưa login thì không ghi được
5. Authentication → **Users**: phải có đúng email bạn đang dùng
6. Reload trang admin → lưu lại

Nếu Rules đang là mặc định production:

```
allow read, write: if false;
```

→ đó chính là nguyên nhân. Thay bằng rules ở trên rồi Publish.

## 5. Ảnh (không dùng Storage)

Chỉ cần **Auth + Firestore** (Spark / free). Với ảnh:

1. Copy file vào thư mục `sarab/img/` (hoặc `img/german/`…)
2. Trong CMS, điền đường dẫn tương đối, ví dụ: `img/about_us.jpg`
3. Hoặc dán URL ảnh công khai (Imgur, CDN, Google Drive link trực tiếp…)

## 6. Nạp dữ liệu lần đầu

1. Chạy site local: double-click `sarab/start.bat` (hoặc mở `http://localhost:8765`)
2. Vào **http://localhost:8765/admin/login.html**
3. Đăng nhập bằng user vừa tạo
4. Bấm **Nạp dữ liệu mẫu** ở sidebar → xác nhận
5. Kiểm tra Firestore có collection `content` với 5 document: `site`, `about`, `special`, `services`, `testimonials`

## 7. Sử dụng CMS

| URL | Mục đích |
|-----|----------|
| `/admin/login.html` | Đăng nhập |
| `/admin/index.html` | Dashboard quản lý |
| `/index.html` | Website công khai (tự đọc Firestore) |

Các mục quản lý:

- **Thông tin website** – brand, SĐT, Zalo/WhatsApp/Facebook, ảnh About, meta SEO
- **About Us** – toàn bộ nội dung (EN / VI / DE)
- **Our Services** – tiêu đề + danh sách dịch vụ (thêm/xóa/sửa)
- **Testimonials** – tiêu đề + đánh giá khách (thêm/xóa/sửa)
- **Tài khoản** – đổi mật khẩu của bạn, tạo admin mới, đặt lại mật khẩu / xóa admin khác

Sau khi **Lưu thay đổi**, reload trang chủ để thấy nội dung mới.

## 8. Deploy

Host thư mục `sarab/` trên bất kỳ static host nào (Firebase Hosting, Netlify, GitHub Pages…).

Với Firebase Hosting:

```bash
cd sarab
npx firebase-tools login
npx firebase-tools init hosting
# public directory = .
npx firebase-tools deploy
```

Trong Authentication → Settings → **Authorized domains**, thêm domain production.

## 9. Cloud Functions — quản lý tài khoản admin

Tạo / xóa admin và đổi mật khẩu admin khác cần **Firebase Admin SDK** (chạy trên Cloud Functions). Đổi mật khẩu **của chính bạn** hoạt động ngay trên trình duyệt (không cần Functions).

### Yêu cầu

- Gói **Blaze** (pay-as-you-go) — Cloud Functions bắt buộc Blaze; mức free tier thường đủ cho CMS nhỏ.
- [Firebase CLI](https://firebase.google.com/docs/cli): `npm install -g firebase-tools`

### Deploy

Trong thư mục `sarab/`:

```bash
cd sarab
firebase login
firebase use german-flavors-hanoi
cd functions && npm install && cd ..
firebase deploy --only functions
```

Functions deploy tại region **`asia-southeast1`**:

| Function | Mục đích |
|----------|----------|
| `listAdminUsers` | Liệt kê tài khoản admin |
| `createAdminUser` | Tạo admin mới (email + mật khẩu) |
| `updateAdminPassword` | Đặt mật khẩu mới cho admin |
| `deleteAdminUser` | Xóa tài khoản admin |

Chỉ user **đã đăng nhập CMS** mới gọi được các function trên.

### Kiểm tra

1. Đăng nhập `/admin/index.html`
2. Sidebar → **Tài khoản**
3. Thử **Thêm tài khoản admin** hoặc **Đổi mật khẩu**

Nếu thấy lỗi *Account management requires Cloud Functions* → chưa deploy functions hoặc deploy thất bại.

## Cấu trúc dữ liệu Firestore

```
content/
  site          → brand, phones, social, meta SEO, hero stats
  about         → { image, en, vi, de } (ảnh + p1–p5, quote) — không gồm tiêu đề mục
  special       → banner Catering { image, en, vi, de } (tag, title, desc, btn)
  services      → { items: [...] }
  testimonials  → { items: [...] }

Tiêu đề mục (Our Services, Testimonials…) cố định trong code/i18n, không quản lý qua CMS.
```

## Lưu ý

- Website vẫn hiển thị nội dung mặc định nếu Firebase chưa cấu hình hoặc mất mạng.
- **Ảnh CMS**: upload qua Cloudinary → URL lưu trong Firestore. Xem `CLOUDINARY_SETUP.md`.
- Không commit mật khẩu admin vào git.
- `FIREBASE_CONFIG.apiKey` là public key phía client — bảo mật thật sự nằm ở **Auth + Security Rules**.
