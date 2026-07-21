/**
 * Show/hide toggle for password inputs (eye icon).
 */
(function () {
    'use strict';

    var defaultLabels = {
        show: 'Hiện mật khẩu',
        hide: 'Ẩn mật khẩu'
    };

    function labels(t) {
        if (typeof t === 'function') {
            return {
                show: t('pwdShow') || defaultLabels.show,
                hide: t('pwdHide') || defaultLabels.hide
            };
        }
        return defaultLabels;
    }

    function setVisible(input, btn, visible, text) {
        input.type = visible ? 'text' : 'password';
        var icon = btn.querySelector('i');
        if (icon) icon.className = visible ? 'fas fa-eye-slash' : 'fas fa-eye';
        btn.setAttribute('aria-label', visible ? text.hide : text.show);
        btn.setAttribute('aria-pressed', visible ? 'true' : 'false');
    }

    function wrapInput(input, text) {
        if (!input || input.closest('.password-field')) return;

        var wrap = document.createElement('div');
        wrap.className = 'password-field';
        input.parentNode.insertBefore(wrap, input);
        wrap.appendChild(input);

        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'password-toggle';
        btn.setAttribute('aria-label', text.show);
        btn.setAttribute('aria-pressed', 'false');
        btn.innerHTML = '<i class="fas fa-eye"></i>';
        wrap.appendChild(btn);

        btn.addEventListener('click', function () {
            setVisible(input, btn, input.type === 'password', text);
        });
    }

    function resetInput(input, text) {
        if (!input) return;
        input.type = 'password';
        var btn = input.parentNode && input.parentNode.querySelector('.password-toggle');
        if (btn) setVisible(input, btn, false, text);
    }

    window.AdminPasswordToggle = {
        init: function (root, options) {
            var scope = root || document;
            var text = labels(options && options.t);
            scope.querySelectorAll('input[type="password"]').forEach(function (input) {
                wrapInput(input, text);
            });
        },
        refreshLabels: function (root, options) {
            var scope = root || document;
            var text = labels(options && options.t);
            scope.querySelectorAll('.password-field').forEach(function (wrap) {
                var input = wrap.querySelector('input');
                var btn = wrap.querySelector('.password-toggle');
                if (input && btn) setVisible(input, btn, input.type === 'text', text);
            });
        },
        reset: function (input, options) {
            resetInput(input, labels(options && options.t));
        },
        resetAll: function (root, options) {
            var scope = root || document;
            var text = labels(options && options.t);
            scope.querySelectorAll('.password-field input').forEach(function (input) {
                resetInput(input, text);
            });
        }
    };
})();
