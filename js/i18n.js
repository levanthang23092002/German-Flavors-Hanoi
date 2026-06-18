var I18N_LANG = localStorage.getItem('gf-lang') || 'en';

var I18N_DATA = {
    en: {
        meta: { title: 'German Flavors Hanoi – Bringing the Taste of Germany to Hanoi', desc: 'German Flavors Hanoi – Authentic German meats, sausages, cold cuts, delicatessen products, and catering services in Hanoi, Vietnam.' },
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
            p1: 'German Flavors Hanoi was created to bring authentic German food and culinary traditions to Vietnam. We are passionate about preserving the original taste of Germany through carefully prepared meats, sausages, cold cuts, traditional recipes, and high-quality ingredients.',
            p2: 'Our mission is simple: provide genuine German flavors for the German community, international residents, and local food lovers who appreciate authentic European cuisine. From traditional Leberkäse and Kasseler to handcrafted sausages, German mustard, and sauerkraut — we deliver a true taste of Germany in the heart of Hanoi.',
            btn: 'View Our Services'
        },
        menu: {
            lbl: 'Our Services', title: 'What We <span>Offer</span>', btn: 'Get in Touch',
            enquire: 'Enquire', viewDetails: 'View Details', enquireNow: 'Enquire Now', inquiry: 'inquiry', thankYou: 'Thank you!'
        },
        cards: {
            sausages: { cat: 'Sausages', title: 'German Sausages', desc: 'Bratwurst, Frankfurters, Knacker & traditional regional specialties', badge: 'Popular', tag: 'Authentic', dataDesc: 'We offer a wide selection of authentic German sausages, including Bratwurst, Frankfurters, Knacker, and other traditional regional specialties. All products are prepared using genuine German recipes and high-quality ingredients.' },
            coldcuts: { cat: 'Cold Cuts', title: 'Cold Cuts & Delicatessen', desc: 'Leberwurst, smoked ham, salami, Knacker & German favorites', badge: 'Deli', tag: 'Premium', dataDesc: 'Enjoy a variety of traditional German cold cuts and delicatessen products, including Leberwurst, smoked ham, salami, Knacker, and other German favorites. Perfect for sandwiches, platters, restaurants, and home enjoyment.' },
            classics: { cat: 'Classics', title: 'Leberkäse & Kasseler', desc: 'Authentic German classics for family meals & gatherings', badge: 'Classic', tag: 'Traditional', dataDesc: 'Experience authentic German classics prepared using traditional methods and flavors. Ideal for family meals, gatherings, and special occasions.' },
            specialties: { cat: 'Specialties', title: 'German Specialties', desc: 'German mustard, sauerkraut & traditional products', tag: 'Authentic', dataDesc: 'We offer authentic German mustard, sauerkraut, and other traditional products that bring the true taste of Germany to Vietnam.' },
            readymeals: { cat: 'Ready Meals', title: 'Ready-to-Eat Meals', desc: 'Freshly prepared German comfort food for busy lifestyles', badge: 'Fresh', tag: 'Daily Fresh', dataDesc: 'Our freshly prepared German meals are perfect for busy professionals, families, and anyone craving authentic German comfort food.' },
            catering: { cat: 'Catering', title: 'Catering Services', desc: 'Customized German menus for 10–300 guests', badge: 'Events', tag: '10–300 guests', dataDesc: 'We provide catering for events ranging from 10 to 300 guests. Whether it\'s a corporate function, private party, Oktoberfest celebration, birthday, wedding, or community gathering, we can create customized German menus to suit your needs.' },
            corporate: { cat: 'Catering', title: 'Corporate & Event Catering', desc: 'For companies, embassies, schools & organizations', badge: 'Corporate', tag: 'Professional', dataDesc: 'Reliable catering solutions for companies, embassies, schools, clubs, and organizations looking for authentic German cuisine and professional service.' }
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
                { text: 'Finally found authentic Bratwurst and Leberkäse in Hanoi! The taste reminds me of home in Germany. Quality is outstanding and delivery was fast.', name: 'Customer Review', role: 'German Expat — Hanoi' },
                { text: 'We ordered catering for our company\'s Oktoberfest event — 80 guests and everything was perfect. Authentic German food, beautifully presented, and on time.', name: 'Customer Review', role: 'Corporate Client — Hanoi' },
                { text: 'The cold cuts platter was incredible — perfect for our family gathering. Sauerkraut and German mustard tasted exactly like what we had in Berlin.', name: 'Customer Review', role: 'International Resident' },
                { text: 'German Flavors catered our embassy event with professionalism and authentic cuisine. Highly recommended for any organization looking for genuine German food.', name: 'Customer Review', role: 'Embassy Event — Hanoi' }
            ]
        },
        reservation: {
            lbl: 'Get In Touch', title: 'Catering & <span>Contact</span>',
            intro: 'Book catering for your event (10–300 guests) or send us a general inquiry about products, meals, and delivery.',
            talk: 'Contact Us', talkSub: 'Scan the QR code to call or message us on WhatsApp / Zalo.',
            location: 'Location', delivery: 'Delivery', deliveryVal: 'Available across Hanoi',
            facebookLbl: 'Facebook', facebook: 'German Flavors Hanoi',
            inquiryType: 'Inquiry Type *', eventDate: 'Event Date *', fullName: 'Full Name *', phone: 'Phone Number *',
            email: 'Email Address *', guests: 'Number of Guests *', msgEvent: 'Event Details & Menu Requests',
            msgGeneral: 'Your Message *', placeholderName: 'Your name', placeholderPhone: '+84 ...',
            placeholderEmail: 'you@email.com', placeholderEvent: 'Tell us about your event, dietary needs, preferred dishes...',
            placeholderGeneral: 'Write your message here...', submit: 'Submit Request', submitting: 'Submitting...',
            success: 'Request received! We\'ll get back to you as soon as possible.',
            error: 'Something went wrong. Please try again or contact us by phone.',
            errorFile: 'Please open this site through a web server (http://localhost), not as a local file, to submit the form.',
            errorSetup: 'Email is not set up yet. Get a free Access Key at web3forms.com (use levanthang230902@gmail.com) and paste it into js/form-config.js.',
            optCatering: 'Catering & Events', optContact: 'General Contact',
            opts: { corp: 'Corporate Function', party: 'Private Party', okto: 'Oktoberfest Celebration', bday: 'Birthday', wedding: 'Wedding', community: 'Community Gathering', other: 'Other Event', product: 'Product Inquiry', meals: 'Ready-to-Eat Meals', delivery: 'Delivery Order', partnership: 'Corporate Partnership', general: 'General Inquiry' },
            guestOpts: ['10 – 20 guests', '21 – 50 guests', '51 – 100 guests', '101 – 200 guests', '201 – 300 guests', '300+ guests']
        },
        search: {
            title: 'What are you looking for?', placeholder: 'Search sausages, cold cuts, catering...',
            popular: 'Popular Searches',
            cats: ['All Services', 'Sausages', 'Cold Cuts', 'Leberkäse', 'Specialties', 'Ready Meals', 'Catering']
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
            links: { home: 'Home', about: 'About Us', services: 'Our Services', products: 'Products', reviews: 'Reviews', contact: 'Contact' },
            svc: { sausages: 'German Sausages', coldcuts: 'Cold Cuts', classics: 'Leberkäse & Kasseler', meals: 'Ready-to-Eat Meals', specialties: 'German Specialties', catering: 'Catering' }
        }
    },
    vi: {
        meta: { title: 'German Flavors Hanoi – Hương vị Đức tại Hà Nội', desc: 'German Flavors Hanoi – Thịt, xúc xích, giò lạnh và đồ deli Đức chính gốc cùng dịch vụ catering tại Hà Nội, Việt Nam.' },
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
            p1: 'German Flavors Hanoi được tạo ra để mang ẩm thực và truyền thống ẩm thực Đức chính gốc đến Việt Nam. Chúng tôi đam mê bảo tồn hương vị Đức gốc qua thịt, xúc xích, giò lạnh, công thức truyền thống và nguyên liệu chất lượng cao.',
            p2: 'Sứ mệnh của chúng tôi rất đơn giản: mang hương vị Đức chân thực đến cộng đồng người Đức, cư dân quốc tế và những người yêu ẩm thực châu Âu. Từ Leberkäse, Kasseler đến xúc xích thủ công, mù tạt và dưa cải Đức — chúng tôi mang hương vị Đức thực sự đến trung tâm Hà Nội.',
            btn: 'Xem dịch vụ'
        },
        menu: {
            lbl: 'Dịch vụ của chúng tôi', title: 'Chúng tôi <span>Cung cấp</span>', btn: 'Liên hệ ngay',
            enquire: 'Liên hệ', viewDetails: 'Xem chi tiết', enquireNow: 'Liên hệ ngay', inquiry: 'yêu cầu', thankYou: 'Cảm ơn!'
        },
        cards: {
            sausages: { cat: 'Xúc xích', title: 'Xúc xích Đức', desc: 'Bratwurst, Frankfurter, Knacker & đặc sản vùng miền', badge: 'Phổ biến', tag: 'Chính gốc', dataDesc: 'Chúng tôi cung cấp đa dạng xúc xích Đức chính gốc, gồm Bratwurst, Frankfurter, Knacker và các đặc sản vùng miền truyền thống. Tất cả được chế biến theo công thức Đức gốc và nguyên liệu chất lượng cao.' },
            coldcuts: { cat: 'Giò lạnh', title: 'Giò lạnh & Deli', desc: 'Leberwurst, giăm bông hun khói, salami, Knacker & món Đức yêu thích', badge: 'Deli', tag: 'Cao cấp', dataDesc: 'Thưởng thức đa dạng giò lạnh và đồ deli Đức truyền thống, gồm Leberwurst, giăm bông hun khói, salami, Knacker và các món Đức yêu thích. Hoàn hảo cho bánh mì, đĩa gỏi, nhà hàng và gia đình.' },
            classics: { cat: 'Món cổ điển', title: 'Leberkäse & Kasseler', desc: 'Món Đức chính gốc cho bữa ăn gia đình & tụ họp', badge: 'Cổ điển', tag: 'Truyền thống', dataDesc: 'Trải nghiệm các món Đức chính gốc được chế biến theo phương pháp và hương vị truyền thống. Lý tưởng cho bữa ăn gia đình, tụ họp và dịp đặc biệt.' },
            specialties: { cat: 'Đặc sản', title: 'Đặc sản Đức', desc: 'Mù tạt, dưa cải & sản phẩm truyền thống Đức', tag: 'Chính gốc', dataDesc: 'Chúng tôi cung cấp mù tạt, dưa cải và các sản phẩm truyền thống Đức chính gốc, mang hương vị Đức thực sự đến Việt Nam.' },
            readymeals: { cat: 'Món sẵn', title: 'Món ăn sẵn', desc: 'Món Đức tươi chế biến cho cuộc sống bận rộn', badge: 'Tươi', tag: 'Tươi mỗi ngày', dataDesc: 'Các món Đức tươi chế biến hoàn hảo cho dân văn phòng, gia đình và bất kỳ ai khao khát ẩm thực Đức chính gốc.' },
            catering: { cat: 'Catering', title: 'Dịch vụ Catering', desc: 'Thực đơn Đức tùy chỉnh cho 10–300 khách', badge: 'Sự kiện', tag: '10–300 khách', dataDesc: 'Chúng tôi catering sự kiện từ 10 đến 300 khách. Dù là tiệc công ty, tiệc riêng, Oktoberfest, sinh nhật, đám cưới hay tụ họp cộng đồng, chúng tôi tạo thực đơn Đức tùy chỉnh theo nhu cầu của bạn.' },
            corporate: { cat: 'Catering', title: 'Catering Doanh nghiệp & Sự kiện', desc: 'Cho công ty, đại sứ quán, trường học & tổ chức', badge: 'Doanh nghiệp', tag: 'Chuyên nghiệp', dataDesc: 'Giải pháp catering đáng tin cậy cho công ty, đại sứ quán, trường học, câu lạc bộ và tổ chức tìm kiếm ẩm thực Đức chính gốc và dịch vụ chuyên nghiệp.' }
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
                { text: 'Cuối cùng cũng tìm được Bratwurst và Leberkäse chính gốc ở Hà Nội! Hương vị như ở nhà ở Đức. Chất lượng tuyệt vời và giao hàng nhanh.', name: 'Đánh giá khách hàng', role: 'Người Đức tại Hà Nội' },
                { text: 'Chúng tôi đặt catering cho sự kiện Oktoberfest công ty — 80 khách và mọi thứ hoàn hảo. Món Đức chính gốc, trình bày đẹp và đúng giờ.', name: 'Đánh giá khách hàng', role: 'Khách hàng doanh nghiệp — Hà Nội' },
                { text: 'Đĩa giò lạnh thật tuyệt vời — hoàn hảo cho buổi tụ họp gia đình. Dưa cải và mù tạt Đức đúng vị như ở Berlin.', name: 'Đánh giá khách hàng', role: 'Cư dân quốc tế' },
                { text: 'German Flavors catering sự kiện đại sứ quán với sự chuyên nghiệp và ẩm thực chính gốc. Rất đáng khuyên dùng cho mọi tổ chức.', name: 'Đánh giá khách hàng', role: 'Sự kiện Đại sứ quán — Hà Nội' }
            ]
        },
        reservation: {
            lbl: 'Liên hệ', title: 'Catering & <span>Liên hệ</span>',
            intro: 'Đặt catering cho sự kiện (10–300 khách) hoặc gửi yêu cầu về sản phẩm, món ăn và giao hàng.',
            talk: 'Liên hệ', talkSub: 'Quét mã QR để gọi hoặc nhắn tin qua WhatsApp / Zalo.',
            location: 'Địa điểm', delivery: 'Giao hàng', deliveryVal: 'Giao hàng toàn Hà Nội',
            facebookLbl: 'Facebook', facebook: 'German Flavors Hanoi',
            inquiryType: 'Loại yêu cầu *', eventDate: 'Ngày sự kiện *', fullName: 'Họ và tên *', phone: 'Số điện thoại *',
            email: 'Email *', guests: 'Số khách *', msgEvent: 'Chi tiết sự kiện & yêu cầu thực đơn',
            msgGeneral: 'Tin nhắn của bạn *', placeholderName: 'Họ và tên', placeholderPhone: '+84 ...',
            placeholderEmail: 'email@example.com', placeholderEvent: 'Cho chúng tôi biết về sự kiện, nhu cầu ăn kiêng, món ưa thích...',
            placeholderGeneral: 'Viết tin nhắn của bạn...', submit: 'Gửi yêu cầu', submitting: 'Đang gửi...',
            success: 'Đã nhận yêu cầu! Chúng tôi sẽ liên hệ lại sớm nhất.',
            error: 'Có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ qua điện thoại.',
            errorFile: 'Vui lòng mở trang qua web server (http://localhost), không mở trực tiếp file HTML, để gửi form.',
            errorSetup: 'Chưa cấu hình email. Vào web3forms.com (dùng levanthang230902@gmail.com) lấy Access Key và dán vào js/form-config.js.',
            optCatering: 'Catering & Sự kiện', optContact: 'Liên hệ chung',
            opts: { corp: 'Tiệc công ty', party: 'Tiệc riêng', okto: 'Lễ hội Oktoberfest', bday: 'Sinh nhật', wedding: 'Đám cưới', community: 'Tụ họp cộng đồng', other: 'Sự kiện khác', product: 'Hỏi về sản phẩm', meals: 'Món ăn sẵn', delivery: 'Đặt giao hàng', partnership: 'Hợp tác doanh nghiệp', general: 'Yêu cầu chung' },
            guestOpts: ['10 – 20 khách', '21 – 50 khách', '51 – 100 khách', '101 – 200 khách', '201 – 300 khách', '300+ khách']
        },
        search: {
            title: 'Bạn đang tìm gì?', placeholder: 'Tìm xúc xích, giò lạnh, catering...',
            popular: 'Tìm kiếm phổ biến',
            cats: ['Tất cả dịch vụ', 'Xúc xích', 'Giò lạnh', 'Leberkäse', 'Đặc sản', 'Món sẵn', 'Catering']
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
            links: { home: 'Trang chủ', about: 'Giới thiệu', services: 'Dịch vụ', products: 'Sản phẩm', reviews: 'Đánh giá', contact: 'Liên hệ' },
            svc: { sausages: 'Xúc xích Đức', coldcuts: 'Giò lạnh', classics: 'Leberkäse & Kasseler', meals: 'Món ăn sẵn', specialties: 'Đặc sản Đức', catering: 'Catering' }
        }
    },
    de: {
        meta: { title: 'German Flavors Hanoi – Deutscher Geschmack in Hanoi', desc: 'German Flavors Hanoi – Authentische deutsche Fleisch-, Wurst- und Feinkostprodukte sowie Catering-Services in Hanoi, Vietnam.' },
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
            p1: 'German Flavors Hanoi wurde gegründet, um authentische deutsche Küche und kulinarische Traditionen nach Vietnam zu bringen. Wir bewahren den originalen Geschmack Deutschlands durch sorgfältig zubereitetes Fleisch, Wurst, Aufschnitt, traditionelle Rezepte und hochwertige Zutaten.',
            p2: 'Unsere Mission ist einfach: echten deutschen Geschmack für die deutsche Community, internationale Bewohner und Liebhaber authentischer europäischer Küche. Von Leberkäse und Kasseler bis zu handgemachten Würsten, deutschem Senf und Sauerkraut — wir bringen echten deutschen Geschmack ins Herz von Hanoi.',
            btn: 'Leistungen ansehen'
        },
        menu: {
            lbl: 'Unsere Leistungen', title: 'Was wir <span>anbieten</span>', btn: 'Kontakt aufnehmen',
            enquire: 'Anfragen', viewDetails: 'Details ansehen', enquireNow: 'Jetzt anfragen', inquiry: 'Anfrage', thankYou: 'Danke!'
        },
        cards: {
            sausages: { cat: 'Würste', title: 'Deutsche Würste', desc: 'Bratwurst, Frankfurter, Knacker & regionale Spezialitäten', badge: 'Beliebt', tag: 'Authentisch', dataDesc: 'Wir bieten eine große Auswahl authentischer deutscher Würste, darunter Bratwurst, Frankfurter, Knacker und andere regionale Spezialitäten. Alle Produkte werden nach original deutschen Rezepten zubereitet.' },
            coldcuts: { cat: 'Aufschnitt', title: 'Aufschnitt & Feinkost', desc: 'Leberwurst, Schinken, Salami, Knacker & deutsche Favoriten', badge: 'Deli', tag: 'Premium', dataDesc: 'Genießen Sie traditionellen deutschen Aufschnitt und Feinkost, darunter Leberwurst, Schinken, Salami, Knacker und andere deutsche Favoriten. Perfekt für Sandwiches, Platten und zu Hause.' },
            classics: { cat: 'Klassiker', title: 'Leberkäse & Kasseler', desc: 'Authentische deutsche Klassiker für Familie & Feste', badge: 'Klassiker', tag: 'Traditionell', dataDesc: 'Erleben Sie authentische deutsche Klassiker nach traditionellen Methoden. Ideal für Familienmahlzeiten, Feste und besondere Anlässe.' },
            specialties: { cat: 'Spezialitäten', title: 'Deutsche Spezialitäten', desc: 'Deutscher Senf, Sauerkraut & traditionelle Produkte', tag: 'Authentisch', dataDesc: 'Wir bieten authentischen deutschen Senf, Sauerkraut und andere traditionelle Produkte, die den echten Geschmack Deutschlands nach Vietnam bringen.' },
            readymeals: { cat: 'Fertiggerichte', title: 'Fertiggerichte', desc: 'Frisch zubereitete deutsche Hausmannskost', badge: 'Frisch', tag: 'Täglich frisch', dataDesc: 'Unsere frisch zubereiteten deutschen Gerichte sind perfekt für Berufstätige, Familien und alle, die authentische deutsche Küche suchen.' },
            catering: { cat: 'Catering', title: 'Catering-Services', desc: 'Individuelle deutsche Menüs für 10–300 Gäste', badge: 'Events', tag: '10–300 Gäste', dataDesc: 'Wir cateren Veranstaltungen von 10 bis 300 Gästen. Ob Firmenfeier, private Party, Oktoberfest, Geburtstag, Hochzeit oder Gemeinschaftsveranstaltung — wir erstellen individuelle deutsche Menüs.' },
            corporate: { cat: 'Catering', title: 'Firmen- & Event-Catering', desc: 'Für Unternehmen, Botschaften, Schulen & Organisationen', badge: 'Firmen', tag: 'Professionell', dataDesc: 'Zuverlässige Catering-Lösungen für Unternehmen, Botschaften, Schulen, Vereine und Organisationen mit authentischer deutscher Küche und professionellem Service.' }
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
                { text: 'Endlich authentische Bratwurst und Leberkäse in Hanoi! Der Geschmack erinnert mich an zu Hause in Deutschland. Hervorragende Qualität und schnelle Lieferung.', name: 'Kundenbewertung', role: 'Deutscher Expat — Hanoi' },
                { text: 'Wir haben Catering für unser Firmen-Oktoberfest bestellt — 80 Gäste und alles war perfekt. Authentisches deutsches Essen, schön präsentiert und pünktlich.', name: 'Kundenbewertung', role: 'Firmenkunde — Hanoi' },
                { text: 'Die Aufschnittplatte war unglaublich — perfekt für unser Familientreffen. Sauerkraut und deutscher Senf schmeckten genau wie in Berlin.', name: 'Kundenbewertung', role: 'Internationaler Bewohner' },
                { text: 'German Flavors hat unser Botschafts-Event mit Professionalität und authentischer Küche gecatert. Sehr empfehlenswert für jede Organisation.', name: 'Kundenbewertung', role: 'Botschafts-Event — Hanoi' }
            ]
        },
        reservation: {
            lbl: 'Kontakt', title: 'Catering & <span>Kontakt</span>',
            intro: 'Buchen Sie Catering für Ihr Event (10–300 Gäste) oder senden Sie eine allgemeine Anfrage zu Produkten, Gerichten und Lieferung.',
            talk: 'Kontakt', talkSub: 'QR-Code scannen, um anzurufen oder per WhatsApp / Zalo zu schreiben.',
            location: 'Standort', delivery: 'Lieferung', deliveryVal: 'Lieferung in ganz Hanoi',
            facebookLbl: 'Facebook', facebook: 'German Flavors Hanoi',
            inquiryType: 'Anfrageart *', eventDate: 'Veranstaltungsdatum *', fullName: 'Vollständiger Name *', phone: 'Telefonnummer *',
            email: 'E-Mail-Adresse *', guests: 'Anzahl der Gäste *', msgEvent: 'Veranstaltungsdetails & Menüwünsche',
            msgGeneral: 'Ihre Nachricht *', placeholderName: 'Ihr Name', placeholderPhone: '+84 ...',
            placeholderEmail: 'ihre@email.de', placeholderEvent: 'Erzählen Sie uns von Ihrer Veranstaltung, Ernährungswünschen, bevorzugten Gerichten...',
            placeholderGeneral: 'Schreiben Sie Ihre Nachricht...', submit: 'Anfrage senden', submitting: 'Wird gesendet...',
            success: 'Anfrage erhalten! Wir melden uns so schnell wie möglich.',
            error: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder rufen Sie uns an.',
            errorFile: 'Bitte öffnen Sie die Seite über einen Webserver (http://localhost), nicht als lokale Datei.',
            errorSetup: 'E-Mail noch nicht eingerichtet. Holen Sie einen Access Key bei web3forms.com und tragen Sie ihn in js/form-config.js ein.',
            optCatering: 'Catering & Events', optContact: 'Allgemeine Anfrage',
            opts: { corp: 'Firmenveranstaltung', party: 'Private Feier', okto: 'Oktoberfest-Feier', bday: 'Geburtstag', wedding: 'Hochzeit', community: 'Gemeinschaftsveranstaltung', other: 'Sonstiges Event', product: 'Produktanfrage', meals: 'Fertiggerichte', delivery: 'Lieferbestellung', partnership: 'Firmenpartnerschaft', general: 'Allgemeine Anfrage' },
            guestOpts: ['10 – 20 Gäste', '21 – 50 Gäste', '51 – 100 Gäste', '101 – 200 Gäste', '201 – 300 Gäste', '300+ Gäste']
        },
        search: {
            title: 'Wonach suchen Sie?', placeholder: 'Würste, Aufschnitt, Catering suchen...',
            popular: 'Beliebte Suchen',
            cats: ['Alle Leistungen', 'Würste', 'Aufschnitt', 'Leberkäse', 'Spezialitäten', 'Fertiggerichte', 'Catering']
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
            links: { home: 'Start', about: 'Über uns', services: 'Leistungen', products: 'Produkte', reviews: 'Bewertungen', contact: 'Kontakt' },
            svc: { sausages: 'Deutsche Würste', coldcuts: 'Aufschnitt', classics: 'Leberkäse & Kasseler', meals: 'Fertigerichte', specialties: 'Deutsche Spezialitäten', catering: 'Catering' }
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

function applyI18n() {
    var lang = I18N_DATA[I18N_LANG];
    if (!lang) { I18N_LANG = 'en'; lang = I18N_DATA.en; }

    document.documentElement.lang = I18N_LANG === 'vi' ? 'vi' : (I18N_LANG === 'de' ? 'de' : 'en');
    document.title = lang.meta.title;
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', lang.meta.desc);

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

    var cardKeys = ['sausages', 'coldcuts', 'classics', 'specialties', 'readymeals', 'catering', 'corporate'];
    document.querySelectorAll('.mwrap').forEach(function(wrap, i) {
        var ck = cardKeys[i];
        if (!ck || !lang.cards[ck]) return;
        var c = lang.cards[ck];
        var card = wrap.querySelector('.mcard');
        if (!card) return;
        card.setAttribute('data-title', c.title);
        card.setAttribute('data-cat', c.cat);
        card.setAttribute('data-desc', c.dataDesc);
        card.setAttribute('data-price', lang.menu.enquire);
        var mcat = wrap.querySelector('.mcat');
        var mtit = wrap.querySelector('.mtit');
        var mdesc = wrap.querySelector('.mdesc');
        var mprice = wrap.querySelector('.mprice');
        var mtag = wrap.querySelector('.mstars span');
        var badge = wrap.querySelector('.mbdg');
        if (mcat) mcat.textContent = c.cat;
        if (mtit) mtit.textContent = c.title;
        if (mdesc) mdesc.textContent = c.desc;
        if (mprice) mprice.textContent = lang.menu.enquire;
        if (mtag) mtag.textContent = c.tag;
        if (badge && c.badge) badge.innerHTML = '<i class="fas fa-star"></i> ' + c.badge;
        else if (badge && !c.badge) badge.textContent = c.tag || '';
        var madd = wrap.querySelector('.madd');
        if (madd) madd.title = lang.menu.viewDetails;
    });

    document.querySelectorAll('.gitem').forEach(function(item, i) {
        if (!lang.gallery.items[i]) return;
        var g = lang.gallery.items[i];
        item.setAttribute('data-gtitle', g.title);
        item.setAttribute('data-gdesc', g.desc);
        var gover = item.querySelector('.gover span');
        if (gover) gover.innerHTML = '<i class="fas fa-expand-alt"></i> ' + g.title;
        if (window.galData && window.galData[i]) {
            window.galData[i].title = g.title;
            window.galData[i].desc = g.desc;
        }
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

    var inquiryType = document.getElementById('inquiryType');
    if (inquiryType) {
        var r = lang.reservation;
        var groups = inquiryType.querySelectorAll('optgroup');
        if (groups[0]) groups[0].label = r.optCatering;
        if (groups[1]) groups[1].label = r.optContact;
        var optKeys = ['corp', 'party', 'okto', 'bday', 'wedding', 'community', 'other', 'product', 'meals', 'delivery', 'partnership', 'general'];
        inquiryType.querySelectorAll('option').forEach(function(opt, i) {
            if (r.opts[optKeys[i]]) opt.textContent = r.opts[optKeys[i]];
        });
        var guestSel = document.getElementById('guestCount');
        if (guestSel) {
            guestSel.querySelectorAll('option').forEach(function(opt, i) {
                if (r.guestOpts[i]) opt.textContent = r.guestOpts[i];
            });
        }
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

    if (typeof window.onI18nApplied === 'function') window.onI18nApplied();
}

function setLang(lang) {
    if (!I18N_DATA[lang]) return;
    I18N_LANG = lang;
    localStorage.setItem('gf-lang', lang);
    applyI18n();
}

function initI18n() {
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            setLang(this.getAttribute('data-lang'));
        });
    });
    applyI18n();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initI18n);
} else {
    initI18n();
}

window.I18N = { t: t, setLang: setLang, apply: applyI18n, getLang: function() { return I18N_LANG; } };
