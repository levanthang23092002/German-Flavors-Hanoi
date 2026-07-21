/**
 * Upload ảnh lên Cloudinary (unsigned preset) → gán URL vào input CMS.
 */
(function (global) {
    var opts = { t: null, toast: null, showError: null };
    var fileInput = null;
    var pending = null;

    function translate(key, fallback) {
        if (opts.t) {
            var v = opts.t(key);
            if (v) return v;
        }
        return fallback;
    }

    function notifyError(msg) {
        if (opts.showError) opts.showError(msg);
        else alert(msg);
    }

    function notifySuccess(msg) {
        if (opts.toast) opts.toast(msg);
    }

    function setPreview(previewId, url) {
        if (!previewId) return;
        var img = document.getElementById(previewId);
        if (img) img.src = url || '';
    }

    function syncPreviewFromInput(inputId, previewId) {
        var input = document.getElementById(inputId);
        if (!input) return;
        setPreview(previewId, input.value.trim());
    }

    function uploadFile(file) {
        if (!isCloudinaryConfigured()) {
            return Promise.reject(new Error(translate('cloudinaryNotConfigured', 'Cloudinary is not configured.')));
        }
        if (!file || !/^image\//i.test(file.type)) {
            return Promise.reject(new Error(translate('cloudinaryInvalidType', 'Please choose an image file.')));
        }
        if (file.size > 10 * 1024 * 1024) {
            return Promise.reject(new Error(translate('cloudinaryTooLarge', 'Image must be under 10 MB.')));
        }

        var fd = new FormData();
        fd.append('file', file);
        fd.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
        if (CLOUDINARY_CONFIG.folder) {
            fd.append('folder', CLOUDINARY_CONFIG.folder);
        }

        var url = 'https://api.cloudinary.com/v1_1/' +
            encodeURIComponent(CLOUDINARY_CONFIG.cloudName) + '/image/upload';

        return fetch(url, { method: 'POST', body: fd })
            .then(function (res) { return res.json(); })
            .then(function (data) {
                if (!data || data.error) {
                    throw new Error((data && data.error && data.error.message) || 'Upload failed');
                }
                if (!data.secure_url) throw new Error('No URL returned from Cloudinary');
                return data.secure_url;
            });
    }

    function setButtonBusy(btn, busy) {
        if (!btn) return;
        btn.disabled = !!busy;
        if (busy) {
            btn.dataset.prevHtml = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' +
                escapeHtml(translate('cloudinaryUploading', 'Uploading...'));
        } else if (btn.dataset.prevHtml) {
            btn.innerHTML = btn.dataset.prevHtml;
            delete btn.dataset.prevHtml;
        }
    }

    function escapeHtml(str) {
        var d = document.createElement('div');
        d.textContent = str == null ? '' : String(str);
        return d.innerHTML;
    }

    function runUpload(file, target) {
        var btn = target.btn;
        setButtonBusy(btn, true);
        return uploadFile(file)
            .then(function (secureUrl) {
                var input = document.getElementById(target.inputId);
                if (input) {
                    input.value = secureUrl;
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                }
                setPreview(target.previewId, secureUrl);
                notifySuccess(translate('cloudinaryUploaded', 'Image uploaded to Cloudinary.'));
            })
            .catch(function (err) {
                notifyError(translate('cloudinaryUploadFail', 'Upload failed: ') + (err.message || err));
            })
            .finally(function () {
                setButtonBusy(btn, false);
                pending = null;
            });
    }

    function openPicker(btn, inputId, previewId) {
        if (!isCloudinaryConfigured()) {
            notifyError(translate('cloudinaryNotConfigured', 'Cloudinary is not configured. Edit js/cloudinary-config.js'));
            return;
        }
        pending = { btn: btn, inputId: inputId, previewId: previewId };
        if (!fileInput) {
            fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/jpeg,image/png,image/webp,image/gif';
            fileInput.hidden = true;
            document.body.appendChild(fileInput);
            fileInput.addEventListener('change', function () {
                var file = fileInput.files && fileInput.files[0];
                fileInput.value = '';
                if (!file || !pending) return;
                runUpload(file, pending);
            });
        }
        fileInput.click();
    }

    function bindDelegatedEvents() {
        document.addEventListener('click', function (e) {
            var btn = e.target.closest('.js-cloudinary-upload');
            if (!btn || btn.disabled) return;
            e.preventDefault();
            openPicker(btn, btn.getAttribute('data-input'), btn.getAttribute('data-preview'));
        });

        document.addEventListener('input', function (e) {
            var input = e.target;
            if (!input.id || !input.closest('.image-field')) return;
            var previewId = input.getAttribute('data-preview') ||
                (input.id + 'Preview');
            syncPreviewFromInput(input.id, previewId);
        });
    }

    function updateUploadButtons() {
        var configured = isCloudinaryConfigured();
        document.querySelectorAll('.js-cloudinary-upload').forEach(function (btn) {
            btn.disabled = !configured;
            btn.title = configured ? '' : translate('cloudinaryNotConfigured', 'Configure Cloudinary first');
        });
    }

    global.AdminCloudinary = {
        init: function (options) {
            opts.t = options && options.t ? options.t : null;
            opts.toast = options && options.toast ? options.toast : null;
            opts.showError = options && options.showError ? options.showError : null;
            bindDelegatedEvents();
            updateUploadButtons();
        },
        refresh: updateUploadButtons,
        isConfigured: isCloudinaryConfigured,
        syncPreviewFromInput: syncPreviewFromInput
    };
})(window);
