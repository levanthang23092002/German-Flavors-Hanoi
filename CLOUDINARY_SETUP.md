# Cloudinary — upload ảnh CMS

Ảnh được lưu trên **Cloudinary**. Firestore chỉ lưu **URL** (`secure_url`), giống như trước khi bạn dán link thủ công.

## 1. Tạo Cloudinary

1. Đăng ký / đăng nhập: https://cloudinary.com  
2. Dashboard → ghi lại **Cloud name**

## 2. Upload preset (unsigned)

1. **Settings** → **Upload** → **Upload presets** → **Add upload preset**
2. **Signing Mode**: `Unsigned` ✓
3. **Upload preset name**: `german-flavors-hanoi` (đã khớp code)
4. **Asset folder**: nên đổi từ `samples/ecommerce` → `german-flavors-hanoi/cms` (tuỳ chọn, gọn hơn)

> Unsigned preset an toàn cho admin client-side. **Không** đặt API Secret trong code frontend.

## 3. Cấu hình website

Mở `sarab/js/cloudinary-config.js`:

```javascript
var CLOUDINARY_CONFIG = {
    cloudName: 'your-cloud-name',      // còn thiếu — xem Dashboard Home
    uploadPreset: 'german-flavors-hanoi',
    folder: ''                         // preset đã set folder thì để trống
};
```

## 4. Dùng trong admin

Các field ảnh có nút **Upload ảnh**:

- About image (Website info)
- Catering banner image
- Service card image (khi thêm/sửa dịch vụ)

Sau upload, URL Cloudinary tự điền vào ô input → bấm **Lưu** như bình thường để ghi Firestore.

Vẫn có thể **dán URL thủ công** (Cloudinary hoặc link khác).

## 5. Ảnh cũ (đường dẫn `img/...`)

Ảnh local trong thư mục `img/` vẫn hoạt động nếu URL/path đã lưu trong Firestore. Chỉ cần upload lên Cloudinary khi bạn muốn đổi sang CDN.

## Lưu ý

- Giới hạn upload mặc định trong admin: **10 MB**, định dạng JPEG/PNG/WebP/GIF.
- Free tier Cloudinary có quota — xem dashboard nếu upload nhiều.
