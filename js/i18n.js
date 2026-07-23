var I18N_LANG = localStorage.getItem('gf-lang') || 'en';
var SITE_ORIGIN = 'https://germanflavorshanoi.com';
var DEFAULT_OG_IMAGE = SITE_ORIGIN + '/img/german/catering.jpg';

var I18N_DATA = {
    en: {
        meta: {
            title: 'German Flavors Hanoi – Bringing the Taste of Germany to Hanoi',
            desc: 'German Flavors Hanoi – Authentic German meats, sausages, cold cuts, delicatessen products, and catering services in Hanoi, Vietnam.',
            shareTitle: 'German Flavors Hanoi | Authentic German Food & Catering',
            shareDesc: 'Authentic German meats, sausages & deli. Event catering 10–300 guests. Delivery across Hanoi.'
        },
        nav: { home: 'Home', about: 'About', services: 'Services', products: 'Products', reviews: 'Reviews', contact: 'Contact', search: 'Search' },
        topbar: { delivery: 'Delivery Available' },
        hero: {
            kicker: 'German Flavors Hanoi',
            title: 'Bringing the <span class="hl">Taste of Germany</span><br/>to Hanoi',
            lead: 'Authentic German meats, sausages, cold cuts & delicatessen — catering for events from 10 to 300 guests.',
            ev: 'Events', cat: 'Catering', bday: 'Birthdays', del: 'Delivery',
            btnServices: 'Our Services', btnCatering: 'Book Catering',
            stat1: 'Guests Catering', stat2: 'Authentic Recipes', stat3: 'Product Lines', stat4: 'Languages'
        },
        marquee: ['Bratwurst & Frankfurters', 'Leberkäse & Kasseler', 'Cold Cuts & Delicatessen', 'German Mustard & Sauerkraut', 'Ready-to-Eat Meals', 'Event Catering', 'Corporate Catering'],
        about: {
            badge: 'Authentic<br/>German Food', msgUs: 'Message Us',
            lbl: 'About Us', title: 'About <span>German Flavors Hanoi</span>',
            p1: 'German Flavors Hanoi was created by chance from Thuy and Bjoern.',
            quote: '"I always had a passion for good and home made food, so I brought my passion to my profession"',
            p2: 'The idea was to bring authentic German food and culinary traditions to Vietnam. We are passionate about preserving the original taste of Germany through carefully prepared meats, sausages, cold cuts, traditional recipes, and high-quality ingredients.',
            p3: 'Our mission is simple: provide genuine German flavors for the people in and around Hanoi and all food lovers who appreciate authentic German and Western cuisine.',
            p4: 'Whether you are purchasing German delicatessen products, ordering ready-made meals, or planning an event for hundreds of guests, we are committed to quality, consistency, and excellent service.',
            p5: 'From traditional Leberkäse and Kasseler to handcrafted sausages, several cold cuts, German mustard and sauerkraut, German Flavors Hanoi delivers a true taste of Germany in the heart of Hanoi.',
            btn: 'View Our Services'
        },
        menu: {
            lbl: 'Our Services', title: 'What We <span>Offer</span>', btn: 'Get in Touch',
            intro: 'Catering for events and home delivery across Hanoi.',
            enquire: 'Enquire', viewDetails: 'View Details', enquireNow: 'Enquire Now', inquiry: 'inquiry', thankYou: 'Thank you!'
        },
        products: {
            lbl: 'Our Products', title: 'Authentic <span>German Products</span>',
            intro: 'Sausages, cold cuts, Leberkäse, mustard, sauerkraut and traditional German specialties.'
        },
        cards: {
            catering: { cat: 'Catering', title: 'Catering & Events', desc: 'Full German catering for celebrations, Oktoberfest & gatherings — 10–300 guests', badge: 'Main Service', tag: '10–300 guests' },
            products: { cat: 'Products', title: 'Authentic German Products', desc: 'Sausages, cold cuts, Leberkäse, mustard, sauerkraut & traditional specialties', badge: 'Original German', tag: 'Original German' },
            delivery: { cat: 'Delivery', title: 'Home Delivery', desc: 'German delicatessen & ready-made meals — delivered across Hanoi', badge: 'Delivery', tag: 'Across Hanoi' }
        },
        special: {
            tag: 'Events · Catering · Birthdays · Delivery',
            title: 'Catering for<br/><span>10 to 300</span><br/>Guests',
            desc: 'Planning a corporate function, private party, Oktoberfest celebration, birthday, wedding, or community gathering? We create customized German menus tailored to your event — with authentic flavors and professional service.',
            btn: 'Request Catering'
        },
        gallery: {
            lbl: 'Product Showcase', title: 'Authentic <span>German Products</span>',
            prev: 'Prev', next: 'Next',
            items: [
                { title: 'German Sausages', desc: 'Bratwurst, Frankfurters, Knacker and other traditional regional specialties — prepared with genuine German recipes.' },
                { title: 'Cold Cuts & Delicatessen', desc: 'Leberwurst, smoked ham, salami, Knacker and other German favorites — perfect for platters and sandwiches.' },
                { title: 'Leberkäse & Kasseler', desc: 'Grilled platters, roasted potatoes, and authentic German classics — ideal for family meals and special occasions.' },
                { title: 'German Specialties', desc: 'Freshly baked Brezeln, German mustard, sauerkraut, and other traditional products that bring the true taste of Germany to Vietnam.' },
                { title: 'Event Catering', desc: 'Customized German menus for corporate functions, Oktoberfest celebrations, birthdays, weddings, and community gatherings.' },
                { title: 'Ready-to-Eat Meals', desc: 'Freshly prepared sandwiches and German comfort food — perfect for busy professionals and families.' },
                { title: 'Handcrafted Tradition', desc: 'Every recipe passed down with care — authentic German flavors made with passion and dedication.' },
                { title: 'Artisan German Bread', desc: 'Freshly baked rustic loaves — the perfect companion for sausages, cold cuts, and traditional German meals.' }
            ]
        },
        history: {
            lbl: 'Why Choose Us', title: 'The <span>German Flavors</span> Difference',
            intro: 'From traditional Leberkäse and Kasseler to handcrafted sausages, Leberwurst, smoked ham, salami, German mustard, and sauerkraut — we deliver a true taste of Germany in the heart of Hanoi.',
            items: [
                { title: 'Authentic Recipes', desc: 'Every product is prepared using genuine German recipes and high-quality ingredients, preserving the original taste of Germany.' },
                { title: 'Wide Product Range', desc: 'From sausages and cold cuts to ready-to-eat meals and traditional specialties — everything you need for authentic German dining at home.' },
                { title: 'Event Catering', desc: 'We cater events from 10 to 300 guests — corporate functions, Oktoberfest celebrations, birthdays, weddings, and community gatherings with customized German menus.' },
                { title: 'Professional Service', desc: 'Reliable catering solutions for companies, embassies, schools, clubs, and organizations — committed to quality, consistency, and excellent service.' }
            ]
        },
        hours: {
            lbl: 'Get In Touch', title: 'We\'re Here <span style="color:var(--secondary);">For You</span>',
            bjoern: 'Message Bjoern', thuy: 'Message Thuy', wa: 'WhatsApp / Zalo', waVal: 'Available on both numbers',
            del: 'Delivery', delVal: 'Available across Hanoi', cat: 'Catering', catVal: '10 – 300 guests',
            order: 'Order & Enquire', orderDesc: 'Call or message us for products, meals, or catering', btn: 'Contact Us',
            location: 'Location', languages: 'Languages', langVal: 'German · Vietnamese · English'
        },
        testimonials: {
            lbl: 'What People Say', title: 'Customer <span>Testimonials</span>',
            intro: 'Hear from our customers — testimonials will be updated soon.',
            items: [
                { text: 'At German Flavors Hanoi, the name says it all: with his delicious, fresh food, Björn truly brings a piece of Germany to Vietnam. All dishes are prepared according to authentic recipes and Björn uses very high-quality ingredients. The menu selection is always varied, individual, and tailored to the occasion. Besides the delicious food, Björn also knows how to entertain guests with his warm and personable manner.', name: 'Steffen Kaupp', role: 'Deputy Director, Goethe-Institut Hanoi' },
                { text: 'I highly recommend German Flavors Hanoi and their catering services. Many places claim to serve authentic German food but GFH is the real deal. Our guests have always been impressed by the delicious, high-quality food that Björn and team serve. Especially his meat dishes are excellent but also all of the other German dishes like his potato salad are highly recommended. Do yourself a favor and have Björn cater your next event.', name: 'Elissa Kaupp', role: 'Hanoi' },
                { text: 'We are from Switzerland and have been living in Hanoi for over four years. Every now and then, we miss the flavors of home, including sausages. We were delighted to discover German Flavors Hanoi, which offers German-style sausages and other meat products of great quality. What sets them apart for us is that most of their sausages are pasteurized and fresh, not frozen, and made without artificial additives. It is an original quality that you can taste.', name: 'Max Bachmann & Family', role: 'Swiss family · Hanoi' },
                { text: 'Incredible butcher and friend in Hanoi with fantastic sausages, meats and breads. He is super friendly and helpful, Bjoern is awesome. I love ordering from them to stock up for the coming week, especially when I\'m cooking something slowly and at a low temperature and want to use only the best ingredients. His dishes also add a special touch to celebrations.', name: 'Sven Burgis', role: 'Hanoi' }
            ]
        },
        reservation: {
            lbl: 'Get In Touch', title: 'Catering, Orders & <span>Delivery</span>',
            intro: 'Ask about prices, products, stock, catering or delivery — we will reply by phone or WhatsApp.',
            talk: 'Contact Us', talkSub: 'Scan the QR code to call or message us on WhatsApp / Zalo.',
            location: 'Location', delivery: 'Delivery', deliveryVal: 'Available across Hanoi',
            facebookLbl: 'Facebook', facebook: 'German Flavors Hanoi',
            purpose: 'What do you need help with? *',
            purposeHint: 'Pick the closest option — explain details in your message below.',
            purposeChoose: '— Please select —',
            purposeOpts: {
                quote: 'Get a price quote',
                availability: 'Check stock / availability',
                advice: 'Help me choose products',
                catering: 'Book catering for an event',
                order: 'Order products & home delivery',
                other: 'Other question'
            },
            eventDate: 'Event date *', preferredDate: 'When do you need it? (optional)',
            fullName: 'Full Name *', phone: 'Phone / WhatsApp / Zalo *',
            email: 'Email (optional)', guests: 'Number of guests *',
            district: 'Area in Hanoi *', districtOptional: 'Area in Hanoi (optional)',
            menuPickCatering: 'Select dishes *',
            menuPickOrder: 'Select products *',
            menuPickQuote: 'Products to quote *',
            menuPickAvailability: 'Products to check *',
            menuChoose: '— Select products —',
            menuSelectedOne: '1 item selected',
            menuSelectedMany: '{n} items selected',
            menuMultiEmpty: 'No products yet — describe in your message',
            errorNoMenu: 'Please select at least one product.',
            msgLabel: 'Your message *',
            msgNotesCatering: 'Additional notes (optional)',
            msgNotesOrder: 'Quantities & notes *',
            msgNotesQuote: 'Quantity & details (optional)',
            msgNotesAvailability: 'When needed & notes (optional)',
            placeholderName: 'Your name', placeholderPhone: '+84 ...', placeholderEmail: 'you@email.com',
            placeholderDistrict: 'e.g. Cau Giay, Tay Ho, Hoang Mai...',
            placeholderQuote: 'Quantity, delivery area if any, other details...',
            placeholderAvailability: 'When do you need them, quantity if known...',
            placeholderAdvice: 'Who is it for, how many people, any preferences? We will suggest suitable products.',
            placeholderEvent: 'Event type, dietary needs, budget, special requests...',
            placeholderOrder: 'Quantities per item, delivery notes, preferred time...',
            placeholderOther: 'Write your question here...',
            submit: 'Send message', submitting: 'Sending...',
            success: 'Request received! We\'ll get back to you as soon as possible.',
            error: 'Something went wrong. Please try again or contact us by phone.',
            errorFile: 'Please open this site through a web server (http://localhost), not as a local file, to submit the form.',
            errorSetup: 'Email is not set up yet. Get a free Access Key at web3forms.com (use bjoern@germanflavorshanoi.com) and paste it into js/form-config.js.',
            guestOpts: ['10 – 20 guests', '21 – 50 guests', '51 – 100 guests', '101 – 200 guests', '201 – 300 guests', '300+ guests']
        },
        search: {
            title: 'What are you looking for?', placeholder: 'Search sausages, cold cuts, catering...',
            popular: 'Popular Searches',
            cats: ['All Services', 'Catering & Events', 'German Products', 'Home Delivery']
        },
        footer: {
            tagline: 'Authentic German Meats · Sausages · Catering',
            desc: 'Bringing the taste of Germany to Hanoi. Authentic German meats, sausages, cold cuts, delicatessen products, and catering services for private and corporate events.',
            quickLinks: 'Quick Links', ourServices: 'Our Services', getInTouch: 'Get In Touch',
            scanQr: 'Scan QR code to call or message us',
            location: 'Location', delivery: 'Delivery', deliveryVal: 'Available across Hanoi',
            facebookLbl: 'Facebook', facebook: 'German Flavors Hanoi',
            languages: 'Languages', langVal: 'German · Vietnamese · English',
            rights: 'All Rights Reserved.',
            admin: 'Admin login',
            links: { home: 'Home', about: 'About Us', services: 'Our Services', products: 'Products', reviews: 'Reviews', contact: 'Contact' },
            svc: { catering: 'Catering & Events', products: 'Authentic German Products', delivery: 'Home Delivery' }
        }
    },
    vi: {
        meta: {
            title: 'German Flavors Hanoi – Hương vị Đức tại Hà Nội',
            desc: 'German Flavors Hanoi – Thịt, xúc xích, giò lạnh và đồ deli Đức chính gốc cùng dịch vụ catering tại Hà Nội, Việt Nam.',
            shareTitle: 'German Flavors Hanoi | Ẩm thực Đức & Catering Hà Nội',
            shareDesc: 'Thịt, xúc xích & đồ deli Đức chính gốc. Catering sự kiện 10–300 khách. Giao hàng toàn Hà Nội.'
        },
        nav: { home: 'Trang chủ', about: 'Giới thiệu', services: 'Dịch vụ', products: 'Sản phẩm', reviews: 'Đánh giá', contact: 'Liên hệ', search: 'Tìm kiếm' },
        topbar: { delivery: 'Giao hàng tận nơi' },
        hero: {
            kicker: 'German Flavors Hanoi',
            title: 'Mang <span class="hl">Hương vị Đức</span><br/>đến Hà Nội',
            lead: 'Thịt, xúc xích, giò lạnh & đồ deli Đức chính gốc — catering sự kiện từ 10 đến 300 khách.',
            ev: 'Sự kiện', cat: 'Catering', bday: 'Sinh nhật', del: 'Giao hàng',
            btnServices: 'Dịch vụ của chúng tôi', btnCatering: 'Đặt Catering',
            stat1: 'Khách Catering', stat2: 'Công thức Chính gốc', stat3: 'Dòng sản phẩm', stat4: 'Ngôn ngữ'
        },
        marquee: ['Bratwurst & Frankfurter', 'Leberkäse & Kasseler', 'Giò lạnh & Deli', 'Mù tạt & Dưa cải Đức', 'Món ăn sẵn', 'Catering sự kiện', 'Catering doanh nghiệp'],
        about: {
            badge: 'Ẩm thực<br/>Đức chính gốc', msgUs: 'Nhắn tin cho chúng tôi',
            lbl: 'Giới thiệu', title: 'Về <span>German Flavors Hanoi</span>',
            p1: 'German Flavors Hanoi ra đời một cách tình cờ từ Thuy và Björn.',
            quote: '"Tôi luôn đam mê thức ăn ngon và tự làm, nên tôi đã biến đam mê đó thành nghề nghiệp của mình"',
            p2: 'Ý tưởng là mang ẩm thực và truyền thống ẩm thực Đức chính gốc đến Việt Nam. Chúng tôi đam mê bảo tồn hương vị Đức gốc qua thịt, xúc xích, giò lạnh, công thức truyền thống và nguyên liệu chất lượng cao.',
            p3: 'Sứ mệnh của chúng tôi rất đơn giản: mang hương vị Đức chân thực đến người dân ở Hà Nội và vùng lân cận cùng tất cả những người yêu ẩm thực Đức và phương Tây chính gốc.',
            p4: 'Dù bạn mua sản phẩm deli Đức, đặt món ăn sẵn hay lên kế hoạch sự kiện với hàng trăm khách, chúng tôi cam kết về chất lượng, sự ổn định và dịch vụ xuất sắc.',
            p5: 'Từ Leberkäse và Kasseler truyền thống đến xúc xích thủ công, nhiều loại giò lạnh, mù tạt và dưa cải Đức, German Flavors Hanoi mang hương vị Đức thực sự đến trung tâm Hà Nội.',
            btn: 'Xem dịch vụ'
        },
        menu: {
            lbl: 'Dịch vụ của chúng tôi', title: 'Chúng tôi <span>Cung cấp</span>', btn: 'Liên hệ ngay',
            intro: 'Catering sự kiện và giao hàng tận nhà trên toàn Hà Nội.',
            enquire: 'Liên hệ', viewDetails: 'Xem chi tiết', enquireNow: 'Liên hệ ngay', inquiry: 'yêu cầu', thankYou: 'Cảm ơn!'
        },
        products: {
            lbl: 'Sản phẩm của chúng tôi', title: 'Sản phẩm <span>Đức chính gốc</span>',
            intro: 'Xúc xích, giò lạnh, Leberkäse, mù tạt, dưa cải và đặc sản Đức truyền thống.'
        },
        cards: {
            catering: { cat: 'Catering', title: 'Catering & Sự kiện', desc: 'Catering Đức trọn gói cho lễ hội, Oktoberfest & tụ họp — 10–300 khách', badge: 'Dịch vụ chính', tag: '10–300 khách' },
            products: { cat: 'Sản phẩm', title: 'Sản phẩm Đức chính gốc', desc: 'Xúc xích, giò lạnh, Leberkäse, mù tạt, dưa cải & đặc sản truyền thống', badge: 'Đức chính gốc', tag: 'Đức chính gốc' },
            delivery: { cat: 'Giao hàng', title: 'Giao hàng tận nhà', desc: 'Đồ deli Đức & món ăn sẵn — giao trên toàn Hà Nội', badge: 'Giao hàng', tag: 'Toàn Hà Nội' }
        },
        special: {
            tag: 'Sự kiện · Catering · Sinh nhật · Giao hàng',
            title: 'Catering cho<br/><span>10 đến 300</span><br/>khách',
            desc: 'Lên kế hoạch tiệc công ty, tiệc riêng, Oktoberfest, sinh nhật, đám cưới hay tụ họp cộng đồng? Chúng tôi tạo thực đơn Đức tùy chỉnh cho sự kiện của bạn — hương vị chính gốc và dịch vụ chuyên nghiệp.',
            btn: 'Yêu cầu Catering'
        },
        gallery: {
            lbl: 'Trưng bày sản phẩm', title: 'Sản phẩm <span>Đức chính gốc</span>',
            prev: 'Trước', next: 'Sau',
            items: [
                { title: 'Xúc xích Đức', desc: 'Bratwurst, Frankfurter, Knacker và đặc sản vùng miền — chế biến theo công thức Đức gốc.' },
                { title: 'Giò lạnh & Deli', desc: 'Leberwurst, giăm bông hun khói, salami, Knacker và món Đức yêu thích — hoàn hảo cho đĩa gỏi và bánh mì.' },
                { title: 'Leberkäse & Kasseler', desc: 'Đĩa nướng, khoai tây nướng và món Đức cổ điển — lý tưởng cho bữa ăn gia đình và dịp đặc biệt.' },
                { title: 'Đặc sản Đức', desc: 'Bánh pretzel Brezeln tươi, mù tạt, dưa cải và sản phẩm truyền thống Đức chính gốc.' },
                { title: 'Catering sự kiện', desc: 'Thực đơn Đức tùy chỉnh cho tiệc công ty, Oktoberfest, sinh nhật, đám cưới và tụ họp cộng đồng.' },
                { title: 'Món ăn sẵn', desc: 'Bánh mì kẹp và món Đức tiện lợi — phù hợp cho người bận rộn và gia đình.' },
                { title: 'Truyền thống thủ công', desc: 'Mỗi công thức được gìn giữ cẩn thận — hương vị Đức chính gốc làm bằng đam mê và tâm huyết.' },
                { title: 'Bánh mì thủ công', desc: 'Ổ bánh mì rustic tươi nướng — hoàn hảo đi kèm xúc xích, giò lạnh và món Đức truyền thống.' }
            ]
        },
        history: {
            lbl: 'Tại sao chọn chúng tôi', title: 'Điểm khác biệt <span>German Flavors</span>',
            intro: 'Từ Leberkäse và Kasseler truyền thống đến xúc xích thủ công, Leberwurst, giăm bông hun khói, salami, mù tạt và dưa cải Đức — chúng tôi mang hương vị Đức thực sự đến trung tâm Hà Nội.',
            items: [
                { title: 'Công thức chính gốc', desc: 'Mỗi sản phẩm được chế biến theo công thức Đức gốc và nguyên liệu chất lượng cao, bảo tồn hương vị Đức nguyên bản.' },
                { title: 'Đa dạng sản phẩm', desc: 'Từ xúc xích và giò lạnh đến món ăn sẵn và đặc sản truyền thống — mọi thứ bạn cần cho bữa ăn Đức chính gốc tại nhà.' },
                { title: 'Catering sự kiện', desc: 'Chúng tôi catering từ 10 đến 300 khách — tiệc công ty, Oktoberfest, sinh nhật, đám cưới và tụ họp cộng đồng với thực đơn Đức tùy chỉnh.' },
                { title: 'Dịch vụ chuyên nghiệp', desc: 'Giải pháp catering đáng tin cậy cho công ty, đại sứ quán, trường học, câu lạc bộ và tổ chức — cam kết chất lượng, ổn định và dịch vụ xuất sắc.' }
            ]
        },
        hours: {
            lbl: 'Liên hệ', title: 'Chúng tôi <span style="color:var(--secondary);">Luôn sẵn sàng</span>',
            bjoern: 'Nhắn tin Bjoern', thuy: 'Nhắn tin Thuy', wa: 'WhatsApp / Zalo', waVal: 'Có trên cả hai số',
            del: 'Giao hàng', delVal: 'Giao tận nơi tại Hà Nội', cat: 'Catering', catVal: '10 – 300 khách',
            order: 'Đặt hàng & Liên hệ', orderDesc: 'Gọi hoặc nhắn tin về sản phẩm, món ăn hoặc catering', btn: 'Liên hệ',
            location: 'Địa điểm', languages: 'Ngôn ngữ', langVal: 'Tiếng Đức · Tiếng Việt · Tiếng Anh'
        },
        testimonials: {
            lbl: 'Khách hàng nói gì', title: 'Đánh giá <span>khách hàng</span>',
            intro: 'Lắng nghe từ khách hàng — đánh giá sẽ được cập nhật sớm.',
            items: [
                { text: 'Tại German Flavors Hanoi, tên gọi nói lên tất cả: với món ăn ngon và tươi, Björn thực sự mang một phần nước Đức đến Việt Nam. Các món đều được chế biến theo công thức chính gốc và Björn sử dụng nguyên liệu rất chất lượng. Thực đơn luôn đa dạng, cá nhân hóa và phù hợp với từng dịp. Bên cạnh món ăn ngon, Björn còn biết cách làm hài lòng khách bằng sự thân thiện và ấm áp.', name: 'Steffen Kaupp', role: 'Phó Giám đốc, Viện Goethe Hà Nội' },
                { text: 'Tôi rất khuyên dùng German Flavors Hanoi và dịch vụ catering của họ. Nhiều nơi tự nhận phục vụ món Đức chính gốc nhưng GFH mới là hàng thật. Khách của chúng tôi luôn ấn tượng với món ăn ngon, chất lượng cao mà Björn và đội ngũ phục vụ. Đặc biệt các món thịt rất xuất sắc, cùng các món Đức khác như salad khoai tây cũng rất đáng thử. Hãy để Björn catering cho sự kiện tiếp theo của bạn.', name: 'Elissa Kaupp', role: 'Hà Nội' },
                { text: 'Chúng tôi đến từ Thụy Sĩ và đã sống ở Hà Nội hơn bốn năm. Thỉnh thoảng chúng tôi nhớ hương vị quê nhà, đặc biệt là xúc xích. Chúng tôi rất vui khi khám phá German Flavors Hanoi — nơi cung cấp xúc xích kiểu Đức và các sản phẩm thịt chất lượng cao. Điều khiến họ khác biệt với chúng tôi là hầu hết xúc xích được tiệt trùng và tươi, không đông lạnh, và làm không có phụ gia nhân tạo. Đó là chất lượng chính gốc mà bạn có thể cảm nhận được qua hương vị.', name: 'Max Bachmann & Gia đình', role: 'Gia đình Thụy Sĩ · Hà Nội' },
                { text: 'Một người thợ bán thịt và người bạn tuyệt vời ở Hà Nội với xúc xích, thịt và bánh mì tuyệt vời. Anh ấy rất thân thiện và hữu ích, Bjoern thật tuyệt vời. Tôi thích đặt hàng từ họ để dự trữ cho tuần tới, đặc biệt khi nấu món chậm ở nhiệt độ thấp và chỉ muốn dùng nguyên liệu tốt nhất. Món ăn của anh ấy còn mang đến dấu ấn đặc biệt cho các dịp lễ.', name: 'Sven Burgis', role: 'Hà Nội' }
            ]
        },
        reservation: {
            lbl: 'Liên hệ', title: 'Catering, đặt hàng & <span>giao tận nhà</span>',
            intro: 'Hỏi giá, sản phẩm, còn hàng, catering hoặc giao tận nhà — chúng tôi sẽ phản hồi qua điện thoại hoặc Zalo.',
            talk: 'Liên hệ', talkSub: 'Quét mã QR để gọi hoặc nhắn tin qua WhatsApp / Zalo.',
            location: 'Địa điểm', delivery: 'Giao hàng', deliveryVal: 'Giao hàng toàn Hà Nội',
            facebookLbl: 'Facebook', facebook: 'German Flavors Hanoi',
            purpose: 'Bạn cần hỗ trợ gì? *',
            purposeHint: 'Chọn mục gần đúng nhất — mô tả chi tiết ở phần tin nhắn bên dưới.',
            purposeChoose: '— Vui lòng chọn —',
            purposeOpts: {
                quote: 'Hỏi giá / báo giá',
                availability: 'Hỏi còn hàng không',
                advice: 'Tư vấn chọn sản phẩm',
                catering: 'Đặt catering sự kiện',
                order: 'Đặt hàng & giao tận nhà',
                other: 'Câu hỏi khác'
            },
            eventDate: 'Ngày sự kiện *', preferredDate: 'Khi nào cần? (tuỳ chọn)',
            fullName: 'Họ và tên *', phone: 'SĐT / WhatsApp / Zalo *',
            email: 'Email (tuỳ chọn)', guests: 'Số khách *',
            district: 'Khu vực tại Hà Nội *', districtOptional: 'Khu vực tại Hà Nội (tuỳ chọn)',
            menuPickCatering: 'Chọn món *',
            menuPickOrder: 'Chọn sản phẩm *',
            menuPickQuote: 'Sản phẩm cần báo giá *',
            menuPickAvailability: 'Sản phẩm cần kiểm tra *',
            menuChoose: '— Chọn sản phẩm —',
            menuSelectedOne: 'Đã chọn 1 món',
            menuSelectedMany: 'Đã chọn {n} món',
            menuMultiEmpty: 'Chưa có sản phẩm — mô tả trong tin nhắn',
            errorNoMenu: 'Vui lòng chọn ít nhất một sản phẩm.',
            msgLabel: 'Tin nhắn của bạn *',
            msgNotesCatering: 'Ghi chú thêm (tuỳ chọn)',
            msgNotesOrder: 'Số lượng & ghi chú *',
            msgNotesQuote: 'Số lượng & chi tiết (tuỳ chọn)',
            msgNotesAvailability: 'Cần khi nào & ghi chú (tuỳ chọn)',
            placeholderName: 'Họ và tên', placeholderPhone: '+84 ...', placeholderEmail: 'email@example.com',
            placeholderDistrict: 'VD: Cầu Giấy, Tây Hồ, Hoàng Mai...',
            placeholderQuote: 'Số lượng, khu vực giao nếu có, chi tiết khác...',
            placeholderAvailability: 'Cần khi nào, số lượng nếu biết...',
            placeholderAdvice: 'Cho ai, bao nhiêu người, thích vị gì? Chúng tôi sẽ gợi ý sản phẩm phù hợp.',
            placeholderEvent: 'Loại sự kiện, ăn kiêng, ngân sách, yêu cầu đặc biệt...',
            placeholderOrder: 'Số lượng từng món, ghi chú giao hàng, giờ mong muốn...',
            placeholderOther: 'Viết câu hỏi của bạn...',
            submit: 'Gửi tin nhắn', submitting: 'Đang gửi...',
            success: 'Đã nhận yêu cầu! Chúng tôi sẽ liên hệ lại sớm nhất.',
            error: 'Có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ qua điện thoại.',
            errorFile: 'Vui lòng mở trang qua web server (http://localhost), không mở trực tiếp file HTML, để gửi form.',
            errorSetup: 'Chưa cấu hình email. Vào web3forms.com (dùng bjoern@germanflavorshanoi.com) lấy Access Key và dán vào js/form-config.js.',
            guestOpts: ['10 – 20 khách', '21 – 50 khách', '51 – 100 khách', '101 – 200 khách', '201 – 300 khách', '300+ khách']
        },
        search: {
            title: 'Bạn đang tìm gì?', placeholder: 'Tìm xúc xích, giò lạnh, catering...',
            popular: 'Tìm kiếm phổ biến',
            cats: ['Tất cả dịch vụ', 'Catering & Sự kiện', 'Sản phẩm Đức', 'Giao tận nhà']
        },
        footer: {
            tagline: 'Thịt Đức · Xúc xích · Catering chính gốc',
            desc: 'Mang hương vị Đức đến Hà Nội. Thịt, xúc xích, giò lạnh, đồ deli và dịch vụ catering cho sự kiện riêng và doanh nghiệp.',
            quickLinks: 'Liên kết nhanh', ourServices: 'Dịch vụ của chúng tôi', getInTouch: 'Liên hệ',
            scanQr: 'Quét mã QR để gọi hoặc nhắn tin',
            location: 'Địa điểm', delivery: 'Giao hàng', deliveryVal: 'Giao hàng toàn Hà Nội',
            facebookLbl: 'Facebook', facebook: 'German Flavors Hanoi',
            languages: 'Ngôn ngữ', langVal: 'Tiếng Đức · Tiếng Việt · Tiếng Anh',
            rights: 'Bảo lưu mọi quyền.',
            admin: 'Đăng nhập admin',
            links: { home: 'Trang chủ', about: 'Giới thiệu', services: 'Dịch vụ', products: 'Sản phẩm', reviews: 'Đánh giá', contact: 'Liên hệ' },
            svc: { catering: 'Catering & Sự kiện', products: 'Sản phẩm Đức chính gốc', delivery: 'Giao hàng tận nhà' }
        }
    },
    de: {
        meta: {
            title: 'German Flavors Hanoi – Deutscher Geschmack in Hanoi',
            desc: 'German Flavors Hanoi – Authentische deutsche Fleisch-, Wurst- und Feinkostprodukte sowie Catering-Services in Hanoi, Vietnam.',
            shareTitle: 'German Flavors Hanoi | Deutsches Essen & Catering',
            shareDesc: 'Authentisches deutsches Fleisch, Würste & Deli. Event-Catering 10–300 Gäste. Lieferung in Hanoi.'
        },
        nav: { home: 'Start', about: 'Über uns', services: 'Leistungen', products: 'Produkte', reviews: 'Bewertungen', contact: 'Kontakt', search: 'Suche' },
        topbar: { delivery: 'Lieferung verfügbar' },
        hero: {
            kicker: 'German Flavors Hanoi',
            title: 'Den <span class="hl">Geschmack Deutschlands</span><br/>nach Hanoi bringen',
            lead: 'Authentische deutsche Fleisch-, Wurst- und Feinkostprodukte — Catering für Veranstaltungen von 10 bis 300 Gästen.',
            ev: 'Events', cat: 'Catering', bday: 'Geburtstage', del: 'Lieferung',
            btnServices: 'Unsere Leistungen', btnCatering: 'Catering buchen',
            stat1: 'Gäste Catering', stat2: 'Authentische Rezepte', stat3: 'Produktlinien', stat4: 'Sprachen'
        },
        marquee: ['Bratwurst & Frankfurter', 'Leberkäse & Kasseler', 'Aufschnitt & Feinkost', 'Deutscher Senf & Sauerkraut', 'Fertiggerichte', 'Event-Catering', 'Firmen-Catering'],
        about: {
            badge: 'Authentische<br/>deutsche Küche', msgUs: 'Schreiben Sie uns',
            lbl: 'Über uns', title: 'Über <span>German Flavors Hanoi</span>',
            p1: 'German Flavors Hanoi entstand zufällig aus Thuy und Björn.',
            quote: '„Ich hatte schon immer eine Leidenschaft für gutes und hausgemachtes Essen, also habe ich meine Leidenschaft zu meinem Beruf gemacht.“',
            p2: 'Die Idee war, authentische deutsche Küche und kulinarische Traditionen nach Vietnam zu bringen. Wir sind leidenschaftlich daran interessiert, den originalen Geschmack Deutschlands durch sorgfältig zubereitetes Fleisch, Wurst, Aufschnitt, traditionelle Rezepte und hochwertige Zutaten zu bewahren.',
            p3: 'Unsere Mission ist einfach: echten deutschen Geschmack für die Menschen in und um Hanoi sowie alle Feinschmecker zu bieten, die authentische deutsche und westliche Küche schätzen.',
            p4: 'Ob Sie deutsche Feinkostprodukte kaufen, Fertiggerichte bestellen oder eine Veranstaltung mit Hunderten von Gästen planen — wir stehen für Qualität, Beständigkeit und exzellenten Service.',
            p5: 'Von traditionellem Leberkäse und Kasseler bis zu handgemachten Würsten, verschiedenen Aufschnitten, deutschem Senf und Sauerkraut bringt German Flavors Hanoi echten deutschen Geschmack ins Herz von Hanoi.',
            btn: 'Leistungen ansehen'
        },
        menu: {
            lbl: 'Unsere Leistungen', title: 'Was wir <span>anbieten</span>', btn: 'Kontakt aufnehmen',
            intro: 'Catering für Veranstaltungen und Lieferung nach Hause in ganz Hanoi.',
            enquire: 'Anfragen', viewDetails: 'Details ansehen', enquireNow: 'Jetzt anfragen', inquiry: 'Anfrage', thankYou: 'Danke!'
        },
        products: {
            lbl: 'Unsere Produkte', title: 'Authentische <span>deutsche Produkte</span>',
            intro: 'Würste, Aufschnitt, Leberkäse, Senf, Sauerkraut und traditionelle deutsche Spezialitäten.'
        },
        cards: {
            catering: { cat: 'Catering', title: 'Catering & Events', desc: 'Deutsches Full-Service-Catering für Feiern, Oktoberfest & Veranstaltungen — 10–300 Gäste', badge: 'Hauptleistung', tag: '10–300 Gäste' },
            products: { cat: 'Produkte', title: 'Authentische deutsche Produkte', desc: 'Würste, Aufschnitt, Leberkäse, Senf, Sauerkraut & traditionelle Spezialitäten', badge: 'Original Deutsch', tag: 'Original Deutsch' },
            delivery: { cat: 'Lieferung', title: 'Lieferung nach Hause', desc: 'Deutsche Feinkost & Fertiggerichte — geliefert in ganz Hanoi', badge: 'Lieferung', tag: 'Ganz Hanoi' }
        },
        special: {
            tag: 'Events · Catering · Geburtstage · Lieferung',
            title: 'Catering für<br/><span>10 bis 300</span><br/>Gäste',
            desc: 'Planen Sie eine Firmenfeier, private Party, Oktoberfest-Feier, Geburtstag, Hochzeit oder Gemeinschaftsveranstaltung? Wir erstellen individuelle deutsche Menüs — mit authentischen Aromen und professionellem Service.',
            btn: 'Catering anfragen'
        },
        gallery: {
            lbl: 'Produktpräsentation', title: 'Authentische <span>deutsche Produkte</span>',
            prev: 'Zurück', next: 'Weiter',
            items: [
                { title: 'Deutsche Würste', desc: 'Bratwurst, Frankfurter, Knacker und andere regionale Spezialitäten — nach original deutschen Rezepten.' },
                { title: 'Aufschnitt & Feinkost', desc: 'Leberwurst, Schinken, Salami, Knacker und andere deutsche Favoriten — perfekt für Platten und Sandwiches.' },
                { title: 'Leberkäse & Kasseler', desc: 'Gegrillte Platten, Bratkartoffeln und authentische deutsche Klassiker — ideal für Familienmahlzeiten und Feste.' },
                { title: 'Deutsche Spezialitäten', desc: 'Frisch gebackene Brezeln, deutscher Senf, Sauerkraut und andere traditionelle Produkte für echten deutschen Geschmack.' },
                { title: 'Event-Catering', desc: 'Individuelle deutsche Menüs für Firmenfeiern, Oktoberfest, Geburtstage, Hochzeiten und Gemeinschaftsveranstaltungen.' },
                { title: 'Fertiggerichte', desc: 'Frisch zubereitete Sandwiches und deutsche Hausmannskost — perfekt für Berufstätige und Familien.' },
                { title: 'Handwerkliche Tradition', desc: 'Jedes Rezept mit Sorgfalt weitergegeben — authentische deutsche Aromen mit Leidenschaft zubereitet.' },
                { title: 'Handwerkliches Brot', desc: 'Frisch gebackene rustikale Brote — die perfekte Begleitung zu Würsten, Aufschnitt und traditionellen deutschen Gerichten.' }
            ]
        },
        history: {
            lbl: 'Warum wir', title: 'Der <span>German Flavors</span> Unterschied',
            intro: 'Von traditionellem Leberkäse und Kasseler bis zu handgemachten Würsten, Leberwurst, Schinken, Salami, deutschem Senf und Sauerkraut — wir bringen echten deutschen Geschmack ins Herz von Hanoi.',
            items: [
                { title: 'Authentische Rezepte', desc: 'Jedes Produkt wird nach original deutschen Rezepten und hochwertigen Zutaten zubereitet — der Geschmack Deutschlands bleibt erhalten.' },
                { title: 'Breites Sortiment', desc: 'Von Würsten und Aufschnitt bis zu Fertiggerichten und Spezialitäten — alles für authentische deutsche Küche zu Hause.' },
                { title: 'Event-Catering', desc: 'Wir cateren von 10 bis 300 Gästen — Firmenfeiern, Oktoberfest, Geburtstage, Hochzeiten und Gemeinschaftsveranstaltungen mit individuellen deutschen Menüs.' },
                { title: 'Professioneller Service', desc: 'Zuverlässige Catering-Lösungen für Unternehmen, Botschaften, Schulen, Vereine und Organisationen — Qualität, Beständigkeit und exzellenter Service.' }
            ]
        },
        hours: {
            lbl: 'Kontakt', title: 'Wir sind <span style="color:var(--secondary);">für Sie da</span>',
            bjoern: 'Bjoern kontaktieren', thuy: 'Thuy kontaktieren', wa: 'WhatsApp / Zalo', waVal: 'Auf beiden Nummern verfügbar',
            del: 'Lieferung', delVal: 'Lieferung in ganz Hanoi', cat: 'Catering', catVal: '10 – 300 Gäste',
            order: 'Bestellen & Anfragen', orderDesc: 'Rufen Sie uns an oder schreiben Sie uns für Produkte, Gerichte oder Catering', btn: 'Kontakt',
            location: 'Standort', languages: 'Sprachen', langVal: 'Deutsch · Vietnamesisch · Englisch'
        },
        testimonials: {
            lbl: 'Was Kunden sagen', title: 'Kunden-<span>Bewertungen</span>',
            intro: 'Hören Sie von unseren Kunden — Bewertungen werden bald aktualisiert.',
            items: [
                { text: 'Bei German Flavors Hanoi ist der Name Programm: Björn bringt mit seinem leckeren, frischen Essen wirklich ein Stück Deutschland nach Vietnam. Die Speisen sind alle nach authentischen Rezepten zubereitet und Björn verwendet sehr hochwertige Zutaten. Die Menüauswahl ist immer vielfältig, individuell und dem jeweiligen Anlass angepasst. Neben dem leckeren Essen versteht Björn es auch immer, die anwesenden Gäste mit seiner herzlichen Art gut zu unterhalten.', name: 'Steffen Kaupp', role: 'Stellvertretender Leiter Goethe-Institut Hanoi' },
                { text: 'Ich kann German Flavors Hanoi und ihren Catering-Service sehr empfehlen. Viele Orte behaupten, authentisches deutsches Essen anzubieten, aber GFH ist das echte Ding. Unsere Gäste waren immer beeindruckt von dem köstlichen, hochwertigen Essen, das Björn und sein Team servieren. Besonders seine Fleischgerichte sind ausgezeichnet, aber auch alle anderen deutschen Gerichte wie sein Kartoffelsalat sind sehr zu empfehlen. Gönnen Sie sich etwas und lassen Sie Björn Ihr nächstes Event catern.', name: 'Elissa Kaupp', role: 'Hanoi' },
                { text: 'Wir kommen aus der Schweiz und leben seit über vier Jahren in Hanoi. Hin und wieder vermissen wir die Aromen der Heimat, einschließlich Würste. Wir waren begeistert, German Flavors Hanoi zu entdecken, das deutsche Würste und andere Fleischprodukte von großer Qualität anbietet. Was sie für uns auszeichnet, ist, dass die meisten ihrer Würste pasteurisiert und frisch sind, nicht tiefgefroren, und ohne künstliche Zusatzstoffe hergestellt werden. Das ist Originalqualität, die man schmecken kann.', name: 'Max Bachmann & Familie', role: 'Schweizer Familie · Hanoi' },
                { text: 'Unglaublicher Metzger und Freund in Hanoi mit fantastischen Würsten, Fleisch und Broten. Er ist super freundlich und hilfsbereit, Bjoern ist großartig. Ich bestelle gerne bei ihm, um für die kommende Woche vorzusorgen, besonders wenn ich etwas langsam und bei niedriger Temperatur koche und nur die besten Zutaten verwenden möchte. Seine Gerichte verleihen Feiern auch eine besondere Note.', name: 'Sven Burgis', role: 'Hanoi' }
            ]
        },
        reservation: {
            lbl: 'Kontakt', title: 'Catering, Bestellung & <span>Lieferung</span>',
            intro: 'Fragen Sie zu Preisen, Produkten, Verfügbarkeit, Catering oder Lieferung — wir antworten per Telefon oder WhatsApp.',
            talk: 'Kontakt', talkSub: 'QR-Code scannen, um anzurufen oder per WhatsApp / Zalo zu schreiben.',
            location: 'Standort', delivery: 'Lieferung', deliveryVal: 'Lieferung in ganz Hanoi',
            facebookLbl: 'Facebook', facebook: 'German Flavors Hanoi',
            purpose: 'Wobei können wir helfen? *',
            purposeHint: 'Wählen Sie die passendste Option — Details unten in der Nachricht.',
            purposeChoose: '— Bitte wählen —',
            purposeOpts: {
                quote: 'Preis / Angebot anfragen',
                availability: 'Verfügbarkeit prüfen',
                advice: 'Beratung bei der Produktwahl',
                catering: 'Catering für ein Event buchen',
                order: 'Bestellung & Lieferung nach Hause',
                other: 'Andere Frage'
            },
            eventDate: 'Veranstaltungsdatum *', preferredDate: 'Wann benötigt? (optional)',
            fullName: 'Vollständiger Name *', phone: 'Telefon / WhatsApp / Zalo *',
            email: 'E-Mail (optional)', guests: 'Anzahl der Gäste *',
            district: 'Stadtteil in Hanoi *', districtOptional: 'Stadtteil in Hanoi (optional)',
            menuPickCatering: 'Gerichte wählen *',
            menuPickOrder: 'Produkte wählen *',
            menuPickQuote: 'Produkte für Angebot *',
            menuPickAvailability: 'Produkte prüfen *',
            menuChoose: '— Produkte wählen —',
            menuSelectedOne: '1 Artikel gewählt',
            menuSelectedMany: '{n} Artikel gewählt',
            menuMultiEmpty: 'Noch keine Produkte — in der Nachricht beschreiben',
            errorNoMenu: 'Bitte mindestens ein Produkt wählen.',
            msgLabel: 'Ihre Nachricht *',
            msgNotesCatering: 'Zusätzliche Hinweise (optional)',
            msgNotesOrder: 'Mengen & Hinweise *',
            msgNotesQuote: 'Menge & Details (optional)',
            msgNotesAvailability: 'Wann benötigt & Hinweise (optional)',
            placeholderName: 'Ihr Name', placeholderPhone: '+84 ...', placeholderEmail: 'ihre@email.de',
            placeholderDistrict: 'z. B. Cau Giay, Tay Ho, Hoang Mai...',
            placeholderQuote: 'Menge, Liefergebiet falls relevant, weitere Details...',
            placeholderAvailability: 'Wann benötigt, Menge falls bekannt...',
            placeholderAdvice: 'Für wen, wie viele Personen, Vorlieben? Wir schlagen passende Produkte vor.',
            placeholderEvent: 'Art der Veranstaltung, Ernährung, Budget, Sonderwünsche...',
            placeholderOrder: 'Mengen pro Artikel, Lieferhinweise, Wunschzeit...',
            placeholderOther: 'Schreiben Sie Ihre Frage...',
            submit: 'Nachricht senden', submitting: 'Wird gesendet...',
            success: 'Anfrage erhalten! Wir melden uns so schnell wie möglich.',
            error: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder rufen Sie uns an.',
            errorFile: 'Bitte öffnen Sie die Seite über einen Webserver (http://localhost), nicht als lokale Datei.',
            errorSetup: 'E-Mail noch nicht eingerichtet. Holen Sie einen Access Key bei web3forms.com und tragen Sie ihn in js/form-config.js ein.',
            guestOpts: ['10 – 20 Gäste', '21 – 50 Gäste', '51 – 100 Gäste', '101 – 200 Gäste', '201 – 300 Gäste', '300+ Gäste']
        },
        search: {
            title: 'Wonach suchen Sie?', placeholder: 'Würste, Aufschnitt, Catering suchen...',
            popular: 'Beliebte Suchen',
            cats: ['Alle Leistungen', 'Catering & Events', 'Deutsche Produkte', 'Lieferung nach Hause']
        },
        footer: {
            tagline: 'Authentisches Fleisch · Würste · Catering',
            desc: 'Deutschen Geschmack nach Hanoi bringen. Authentische Fleisch-, Wurst- und Feinkostprodukte sowie Catering für private und Firmenveranstaltungen.',
            quickLinks: 'Schnelllinks', ourServices: 'Unsere Leistungen', getInTouch: 'Kontakt',
            scanQr: 'QR-Code scannen zum Anrufen oder Schreiben',
            location: 'Standort', delivery: 'Lieferung', deliveryVal: 'Lieferung in ganz Hanoi',
            facebookLbl: 'Facebook', facebook: 'German Flavors Hanoi',
            languages: 'Sprachen', langVal: 'Deutsch · Vietnamesisch · Englisch',
            rights: 'Alle Rechte vorbehalten.',
            admin: 'Admin-Anmeldung',
            links: { home: 'Start', about: 'Über uns', services: 'Leistungen', products: 'Produkte', reviews: 'Bewertungen', contact: 'Kontakt' },
            svc: { catering: 'Catering & Events', products: 'Authentische deutsche Produkte', delivery: 'Lieferung nach Hause' }
        }
    }
};

function t(path) {
    var keys = path.split('.');
    var val = I18N_DATA[I18N_LANG];
    for (var i = 0; i < keys.length; i++) {
        if (!val) return '';
        val = val[keys[i]];
    }
    return val || '';
}

function toAbsoluteSiteUrl(path) {
    if (!path) return '';
    if (/^https?:\/\//i.test(path)) return path;
    return SITE_ORIGIN + '/' + String(path).replace(/^\.?\//, '');
}

function setSocialMetaTag(name, content, isProperty) {
    if (content == null) return;
    var attr = isProperty ? 'property' : 'name';
    var el = document.querySelector('meta[' + attr + '="' + name + '"]');
    if (el) el.setAttribute('content', content);
}

function applySocialMeta(opts) {
    opts = opts || {};
    var lang = I18N_DATA[I18N_LANG] || I18N_DATA.en;
    var meta = (lang && lang.meta) || {};
    var title = opts.title || meta.shareTitle || meta.title || document.title;
    var desc = opts.desc || meta.shareDesc || meta.desc || '';
    var image = opts.image ? toAbsoluteSiteUrl(opts.image) : DEFAULT_OG_IMAGE;
    var locale = I18N_LANG === 'vi' ? 'vi_VN' : (I18N_LANG === 'de' ? 'de_DE' : 'en_US');

    setSocialMetaTag('og:title', title, true);
    setSocialMetaTag('og:description', desc, true);
    setSocialMetaTag('og:image', image, true);
    setSocialMetaTag('og:image:secure_url', image, true);
    setSocialMetaTag('og:url', SITE_ORIGIN + '/', true);
    setSocialMetaTag('og:locale', locale, true);
    setSocialMetaTag('twitter:title', title, false);
    setSocialMetaTag('twitter:description', desc, false);
    setSocialMetaTag('twitter:image', image, false);
}

window.applySocialMeta = applySocialMeta;
window.toAbsoluteSiteUrl = toAbsoluteSiteUrl;

function applyI18n() {
    var lang = I18N_DATA[I18N_LANG];
    if (!lang) { I18N_LANG = 'en'; lang = I18N_DATA.en; }

    document.documentElement.lang = I18N_LANG === 'vi' ? 'vi' : (I18N_LANG === 'de' ? 'de' : 'en');
    document.title = lang.meta.title;
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', lang.meta.desc);
    applySocialMeta();

    document.querySelectorAll('[data-i18n]').forEach(function(el) {
        var key = el.getAttribute('data-i18n');
        var val = t(key);
        if (val) el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function(el) {
        var key = el.getAttribute('data-i18n-html');
        var val = t(key);
        if (val) el.innerHTML = val;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
        var key = el.getAttribute('data-i18n-placeholder');
        var val = t(key);
        if (val) el.placeholder = val;
    });
    document.querySelectorAll('[data-i18n-title]').forEach(function(el) {
        var key = el.getAttribute('data-i18n-title');
        var val = t(key);
        if (val) el.title = val;
    });

    document.querySelectorAll('.mqitem').forEach(function(el, i) {
        var idx = i % lang.marquee.length;
        var icon = el.querySelector('i');
        var iconClone = icon ? icon.cloneNode(true) : null;
        el.textContent = '';
        if (iconClone) el.appendChild(iconClone);
        el.appendChild(document.createTextNode(' ' + lang.marquee[idx]));
    });

    document.querySelectorAll('.mwrap').forEach(function(wrap) {
        var ck = wrap.getAttribute('data-c');
        if (!ck || !lang.cards || !lang.cards[ck]) return;
        var c = lang.cards[ck];
        var card = wrap.querySelector('.mcard');
        if (!card) return;
        card.setAttribute('data-title', c.title);
        card.setAttribute('data-cat', c.cat);
        var mcat = wrap.querySelector('.mcat');
        var mtit = wrap.querySelector('.mtit');
        var mdesc = wrap.querySelector('.mdesc');
        var mtag = wrap.querySelector('.mstars-tag');
        var badge = wrap.querySelector('.mbdg');
        if (mcat) mcat.textContent = c.cat;
        if (mtit) mtit.textContent = c.title;
        if (mdesc) mdesc.textContent = c.desc;
        if (mtag) mtag.textContent = c.tag;
        if (badge && c.badge) {
            badge.textContent = c.badge;
        }
        else if (badge && !c.badge) badge.textContent = c.tag || '';
        var madd = wrap.querySelector('.madd');
        if (madd) madd.title = lang.menu.viewDetails;
    });

    document.querySelectorAll('.tli').forEach(function(tli, i) {
        if (!lang.history.items[i]) return;
        var h = lang.history.items[i];
        tli.querySelectorAll('h5').forEach(function(el) { el.textContent = h.title; });
        tli.querySelectorAll('p').forEach(function(el) { el.textContent = h.desc; });
    });

    document.querySelectorAll('.tesSwiper .swiper-slide').forEach(function(slide, i) {
        if (!lang.testimonials.items[i]) return;
        var te = lang.testimonials.items[i];
        var txt = slide.querySelector('.testxt');
        var nm = slide.querySelector('.tesnm');
        var rl = slide.querySelector('.tesrl');
        if (txt) txt.textContent = te.text;
        if (nm) nm.textContent = te.name;
        if (rl) rl.textContent = te.role;
    });

    var purposeSel = document.getElementById('inquiryPurpose');
    if (purposeSel && lang.reservation.purposeOpts) {
        var r = lang.reservation;
        purposeSel.querySelectorAll('option[data-purpose]').forEach(function(opt) {
            var key = opt.getAttribute('data-purpose');
            if (r.purposeOpts[key]) opt.textContent = r.purposeOpts[key];
        });
        var emptyOpt = purposeSel.querySelector('option[value=""]');
        if (emptyOpt && r.purposeChoose) emptyOpt.textContent = r.purposeChoose;
        var guestSel = document.getElementById('guestCount');
        if (guestSel && r.guestOpts) {
            guestSel.querySelectorAll('option').forEach(function(opt, i) {
                if (r.guestOpts[i]) opt.textContent = r.guestOpts[i];
            });
        }
    }
    if (typeof window.updateMenuMultiSummary === 'function') window.updateMenuMultiSummary();
    if (window.CMS_CONTENT && window.CMS_CONTENT.data && window.CMS_CONTENT.data.products && typeof window.renderFormProductPicker === 'function') {
        window.renderFormProductPicker(window.CMS_CONTENT.data.products);
    }

    document.querySelectorAll('.sovcat').forEach(function(el, i) {
        if (!lang.search.cats[i]) return;
        var img = el.querySelector('img');
        var imgClone = img ? img.cloneNode(true) : null;
        el.textContent = '';
        if (imgClone) el.appendChild(imgClone);
        el.appendChild(document.createTextNode(lang.search.cats[i]));
    });

    document.querySelectorAll('.lang-btn').forEach(function(btn) {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === I18N_LANG);
    });

    updateLangDropdown();

    if (typeof window.onI18nApplied === 'function') window.onI18nApplied();
}

var LANG_FLAGS = { en: 'fi-gb', vi: 'fi-vn', de: 'fi-de' };

function updateLangDropdown() {
    var currentFlag = document.getElementById('langCurrentFlag');
    if (currentFlag && LANG_FLAGS[I18N_LANG]) {
        currentFlag.className = 'lang-flag fi ' + LANG_FLAGS[I18N_LANG];
    }
    document.querySelectorAll('.lang-dropdown-item').forEach(function(item) {
        item.classList.toggle('is-active', item.getAttribute('data-lang') === I18N_LANG);
    });
}

function closeLangDropdown() {
    var dropdown = document.getElementById('langDropdown');
    var menu = document.getElementById('langDropdownMenu');
    var toggle = document.getElementById('langDropdownToggle');
    if (!dropdown || !menu) return;
    dropdown.classList.remove('open');
    menu.hidden = true;
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
}

function toggleLangDropdown() {
    var dropdown = document.getElementById('langDropdown');
    var menu = document.getElementById('langDropdownMenu');
    var toggle = document.getElementById('langDropdownToggle');
    if (!dropdown || !menu) return;
    var isOpen = !menu.hidden;
    if (isOpen) {
        closeLangDropdown();
    } else {
        dropdown.classList.add('open');
        menu.hidden = false;
        if (toggle) toggle.setAttribute('aria-expanded', 'true');
    }
}

function setLang(lang) {
    if (!I18N_DATA[lang]) return;
    I18N_LANG = lang;
    localStorage.setItem('gf-lang', lang);
    closeLangDropdown();
    applyI18n();
}

function initI18n() {
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            setLang(this.getAttribute('data-lang'));
        });
    });

    var langToggle = document.getElementById('langDropdownToggle');
    if (langToggle) {
        langToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleLangDropdown();
        });
    }

    document.addEventListener('click', function(e) {
        var dropdown = document.getElementById('langDropdown');
        if (dropdown && !dropdown.contains(e.target)) closeLangDropdown();
    });

    applyI18n();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initI18n);
} else {
    initI18n();
}

window.I18N = { t: t, setLang: setLang, apply: applyI18n, getLang: function() { return I18N_LANG; } };
