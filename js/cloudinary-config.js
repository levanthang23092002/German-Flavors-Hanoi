/**
 * Cloudinary — upload ảnh CMS (admin only).
 *
 * Khớp với preset trên Cloudinary:
 *   Upload preset name : german-flavors-hanoi
 *   Signing mode       : Unsigned
 *   Asset folder       : german-flavors-hanoi/cms  (set trong preset, không cần folder ở đây)
 *
 * CHỈ CẦN ĐIỀN cloudName bên dưới:
 *   Dashboard → Home → Product environment credentials → Cloud name
 */
var CLOUDINARY_CONFIG = {
    cloudName: 'dypjamkif',
    uploadPreset: 'german-flavors-hanoi',
    folder: ''
};

function isCloudinaryConfigured() {
    if (typeof CLOUDINARY_CONFIG === 'undefined') return false;
    var name = CLOUDINARY_CONFIG.cloudName;
    var preset = CLOUDINARY_CONFIG.uploadPreset;
    return !!(name && preset && name !== 'YOUR_CLOUD_NAME');
}
