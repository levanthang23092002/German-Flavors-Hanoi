var EMAIL_LOGO_BASE64 = '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';

function escEmailHtml(str) {
    return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/\n/g, '<br/>');
}

function emailInfoRow(icon, label, value, isLink) {
    if (!value) return '';
    var valHtml = isLink
        ? '<a href="mailto:' + escEmailHtml(value) + '" style="color:#dd0000;text-decoration:none;font-weight:600;">' + escEmailHtml(value) + '</a>'
        : '<span style="color:#1a1a1a;font-weight:600;">' + escEmailHtml(value) + '</span>';
    return '<tr>'
        + '<td style="padding:14px 0;width:36px;vertical-align:top;font-size:18px;">' + icon + '</td>'
        + '<td style="padding:14px 0 14px 4px;vertical-align:top;border-bottom:1px solid #f0f0f0;">'
        + '<div style="font-size:10px;color:#999;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;margin-bottom:4px;">' + label + '</div>'
        + '<div style="font-size:15px;line-height:1.4;">' + valHtml + '</div>'
        + '</td></tr>';
}

function buildInquiryEmailHtml(data) {
    var logoSrc = 'data:image/png;base64,' + EMAIL_LOGO_BASE64;
    var typeLabel = data.isCatering ? 'Catering Request' : 'Contact Request';
    var typeColor = data.isCatering ? '#dd0000' : '#1a1a1a';
    var eventRows = '';
    if (data.isCatering) {
        eventRows = emailInfoRow('&#128197;', 'Event Date', data.eventDate ? formatEmailDate(data.eventDate) : '')
            + emailInfoRow('&#128101;', 'Guests', data.guests);
    }

    return '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>'
        + '<body style="margin:0;padding:0;background:#ececec;font-family:Segoe UI,Helvetica,Arial,sans-serif;">'
        + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ececec;padding:32px 16px;">'
        + '<tr><td align="center">'
        + '<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,0.12);">'

        /* Header */
        + '<tr><td style="background:linear-gradient(160deg,#0a0a0a 0%,#1f1f1f 100%);padding:36px 32px 28px;text-align:center;">'
        + '<img src="' + logoSrc + '" alt="German Flavors Hanoi" width="56" height="56" style="display:block;margin:0 auto 16px;border-radius:50%;border:3px solid rgba(255,204,0,0.35);"/>'
        + '<div style="color:#ffcc00;font-size:10px;letter-spacing:4px;font-weight:800;margin-bottom:8px;">GERMAN FLAVORS HANOI</div>'
        + '<div style="color:#ffffff;font-size:26px;font-weight:800;line-height:1.2;margin-bottom:14px;">New Inquiry Received</div>'
        + '<span style="display:inline-block;background:' + typeColor + ';color:#fff;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:6px 16px;border-radius:20px;">'
        + escEmailHtml(typeLabel) + '</span>'
        + '</td></tr>'

        /* Flag bar */
        + '<tr><td style="height:5px;background:linear-gradient(90deg,#000000 0%,#dd0000 50%,#ffcc00 100%);font-size:0;line-height:0;">&nbsp;</td></tr>'

        /* Inquiry type highlight */
        + '<tr><td style="padding:24px 32px 8px;">'
        + '<div style="background:linear-gradient(135deg,#fff9e6 0%,#fff5f5 100%);border:1px solid #ffe0e0;border-radius:12px;padding:16px 20px;text-align:center;">'
        + '<div style="font-size:10px;color:#999;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;margin-bottom:6px;">Inquiry Type</div>'
        + '<div style="font-size:18px;font-weight:800;color:#dd0000;">' + escEmailHtml(data.inquiryType) + '</div>'
        + '</div></td></tr>'

        /* Contact details */
        + '<tr><td style="padding:16px 32px 8px;">'
        + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">'
        + emailInfoRow('&#128100;', 'Full Name', data.name)
        + emailInfoRow('&#9993;', 'Email', data.email, true)
        + emailInfoRow('&#128222;', 'Phone', data.phone)
        + eventRows
        + '</table></td></tr>'

        /* Message */
        + '<tr><td style="padding:8px 32px 28px;">'
        + '<div style="font-size:10px;color:#999;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;margin-bottom:10px;">Message</div>'
        + '<div style="background:#fafafa;border-left:5px solid #dd0000;padding:20px 22px;border-radius:0 12px 12px 0;color:#333;font-size:14px;line-height:1.75;">'
        + escEmailHtml(data.message)
        + '</div></td></tr>'

        /* Footer */
        + '<tr><td style="background:#111111;padding:22px 32px;text-align:center;">'
        + '<div style="color:#ffcc00;font-size:11px;font-weight:700;letter-spacing:2px;margin-bottom:6px;">GERMAN FLAVORS HANOI</div>'
        + '<div style="color:#888888;font-size:12px;line-height:1.5;">Authentic German food &amp; catering in Hanoi<br/>'
        + '<span style="color:#aaaaaa;">Reply to this email to respond directly to the customer</span></div>'
        + '</td></tr>'

        + '</table></td></tr></table></body></html>';
}
