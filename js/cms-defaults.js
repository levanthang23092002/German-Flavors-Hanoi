/**
 * Nội dung mặc định — dùng khi seed Firestore lần đầu
 * và làm fallback nếu Firebase chưa cấu hình / lỗi mạng.
 */
var CMS_DEFAULTS = {
    site: {
        sourceLang: 'vi',
        brandName: 'German Flavors',
        brandSub: 'Hanoi',
        location: 'Hanoi, Vietnam',
        phoneBjoern: '+84938886514',
        phoneThuy: '+84388174120',
        phoneBjoernDisplay: '+84 93 888 6514',
        phoneThuyDisplay: '+84 38 817 4120',
        whatsapp: '84938886514',
        zalo: '84938886514',
        facebook: 'https://www.facebook.com/profile.php?id=61567270778547',
        email: 'bjoern@germanflavorshanoi.com',
        meta: {
            en: {
                title: 'German Flavors Hanoi – Bringing the Taste of Germany to Hanoi',
                desc: 'German Flavors Hanoi – Authentic German meats, sausages, cold cuts, delicatessen products, and catering services in Hanoi, Vietnam.'
            },
            vi: {
                title: 'German Flavors Hanoi – Hương vị Đức tại Hà Nội',
                desc: 'German Flavors Hanoi – Thịt, xúc xích, giò lạnh và đồ deli Đức chính gốc cùng dịch vụ catering tại Hà Nội, Việt Nam.'
            },
            de: {
                title: 'German Flavors Hanoi – Deutscher Geschmack in Hanoi',
                desc: 'German Flavors Hanoi – Authentisches deutsches Fleisch, Würste, Aufschnitt, Delikatessen und Catering in Hanoi, Vietnam.'
            }
        },
        heroBar: {
            items: [
                {
                    value: '10–300',
                    en: { label: 'Guests Catering' },
                    vi: { label: 'Khách Catering' },
                    de: { label: 'Gäste Catering' }
                },
                {
                    value: '100%',
                    en: { label: 'Authentic Recipes' },
                    vi: { label: 'Công thức Chính gốc' },
                    de: { label: 'Authentische Rezepte' }
                },
                {
                    value: '7+',
                    en: { label: 'Product Lines' },
                    vi: { label: 'Dòng sản phẩm' },
                    de: { label: 'Produktlinien' }
                },
                {
                    value: 'GER · VIE · ENG',
                    en: { label: 'Languages' },
                    vi: { label: 'Ngôn ngữ' },
                    de: { label: 'Sprachen' }
                }
            ]
        }
    },
    about: {
        image: 'img/about_us.jpg',
        en: {
            p1: 'German Flavors Hanoi was created by chance from Thuy and Bjoern.',
            quote: '"I always had a passion for good and home made food, so I brought my passion to my profession"',
            p2: 'The idea was to bring authentic German food and culinary traditions to Vietnam. We are passionate about preserving the original taste of Germany through carefully prepared meats, sausages, cold cuts, traditional recipes, and high-quality ingredients.',
            p3: 'Our mission is simple: provide genuine German flavors for the people in and around Hanoi and all food lovers who appreciate authentic German and Western cuisine.',
            p4: 'Whether you are purchasing German delicatessen products, ordering ready-made meals, or planning an event for hundreds of guests, we are committed to quality, consistency, and excellent service.',
            p5: 'From traditional Leberkäse and Kasseler to handcrafted sausages, several cold cuts, German mustard and sauerkraut, German Flavors Hanoi delivers a true taste of Germany in the heart of Hanoi.'
        },
        vi: {
            p1: 'German Flavors Hanoi ra đời một cách tình cờ từ Thuy và Björn.',
            quote: '"Tôi luôn đam mê thức ăn ngon và tự làm, nên tôi đã biến đam mê đó thành nghề nghiệp của mình"',
            p2: 'Ý tưởng là mang ẩm thực và truyền thống ẩm thực Đức chính gốc đến Việt Nam. Chúng tôi đam mê bảo tồn hương vị Đức gốc qua thịt, xúc xích, giò lạnh, công thức truyền thống và nguyên liệu chất lượng cao.',
            p3: 'Sứ mệnh của chúng tôi rất đơn giản: mang hương vị Đức chân thực đến người dân ở Hà Nội và vùng lân cận cùng tất cả những người yêu ẩm thực Đức và phương Tây chính gốc.',
            p4: 'Dù bạn mua sản phẩm deli Đức, đặt món ăn sẵn hay lên kế hoạch sự kiện với hàng trăm khách, chúng tôi cam kết về chất lượng, sự ổn định và dịch vụ xuất sắc.',
            p5: 'Từ Leberkäse và Kasseler truyền thống đến xúc xích thủ công, nhiều loại giò lạnh, mù tạt và dưa cải Đức, German Flavors Hanoi mang hương vị Đức thực sự đến trung tâm Hà Nội.'
        },
        de: {
            p1: 'German Flavors Hanoi entstand zufällig durch Thuy und Björn.',
            quote: '"Ich hatte immer eine Leidenschaft für gutes hausgemachtes Essen, also habe ich meine Leidenschaft zu meinem Beruf gemacht"',
            p2: 'Die Idee war, authentisches deutsches Essen und kulinarische Traditionen nach Vietnam zu bringen. Wir bewahren den originalen Geschmack Deutschlands durch sorgfältig zubereitetes Fleisch, Würste, Aufschnitt, traditionelle Rezepte und hochwertige Zutaten.',
            p3: 'Unsere Mission ist einfach: echte deutsche Aromen für die Menschen in und um Hanoi und alle Feinschmecker, die authentische deutsche und westliche Küche schätzen.',
            p4: 'Ob Sie deutsche Delikatessen kaufen, Fertiggerichte bestellen oder eine Veranstaltung für Hunderte Gäste planen – wir stehen für Qualität, Beständigkeit und exzellenten Service.',
            p5: 'Von traditionellem Leberkäse und Kasseler bis zu handwerklich hergestellten Würsten, Aufschnitt, deutschem Senf und Sauerkraut – German Flavors Hanoi bringt echten deutschen Geschmack ins Herz von Hanoi.'
        }
    },
    special: {
        image: 'img/german/catering.jpg',
        en: {
            tag: 'Events · Catering · Birthdays · Delivery',
            title: 'Catering for<br/><span>10 to 300</span><br/>Guests',
            desc: 'Planning a corporate function, private party, Oktoberfest celebration, birthday, wedding, or community gathering? We create customized German menus tailored to your event — with authentic flavors and professional service.',
            btn: 'Request Catering'
        },
        vi: {
            tag: 'Sự kiện · Catering · Sinh nhật · Giao hàng',
            title: 'Catering cho<br/><span>10 đến 300</span><br/>khách',
            desc: 'Lên kế hoạch tiệc công ty, tiệc riêng, Oktoberfest, sinh nhật, đám cưới hay tụ họp cộng đồng? Chúng tôi tạo thực đơn Đức tùy chỉnh cho sự kiện của bạn — hương vị chính gốc và dịch vụ chuyên nghiệp.',
            btn: 'Yêu cầu Catering'
        },
        de: {
            tag: 'Events · Catering · Geburtstage · Lieferung',
            title: 'Catering für<br/><span>10 bis 300</span><br/>Gäste',
            desc: 'Planen Sie eine Firmenfeier, private Party, Oktoberfest-Feier, Geburtstag, Hochzeit oder Gemeinschaftsveranstaltung? Wir erstellen individuelle deutsche Menüs — mit authentischen Aromen und professionellem Service.',
            btn: 'Catering anfragen'
        }
    },
    services: {
        items: [
            {
                id: 'catering',
                image: 'img/german/offer-catering-events.jpg',
                order: 0,
                en: {
                    cat: 'Catering',
                    title: 'Catering & Events',
                    desc: 'Full German catering for celebrations, Oktoberfest & gatherings — 10–300 guests',
                    badge: 'Main Service',
                    tag: '10–300 guests',
                    dataDesc: 'Catering is at the heart of German Flavors Hanoi. We create varied, individualized menus tailored to every occasion — private parties, birthdays, Oktoberfest, weddings, corporate functions, and community gatherings. Björn brings authentic German cuisine and warm hospitality to your event, for 10 to 300 guests.',
                    tags: 'Catering,Events,Oktoberfest,10-300 Guests'
                },
                vi: {
                    cat: 'Catering',
                    title: 'Catering & Sự kiện',
                    desc: 'Catering Đức trọn gói cho lễ hội, Oktoberfest & tụ họp — 10–300 khách',
                    badge: 'Dịch vụ chính',
                    tag: '10–300 khách',
                    dataDesc: 'Catering là trọng tâm của German Flavors Hanoi. Chúng tôi tạo thực đơn đa dạng, cá nhân hóa cho từng dịp — tiệc riêng, sinh nhật, Oktoberfest, đám cưới, tiệc công ty và tụ họp cộng đồng. Björn mang ẩm thực Đức chính gốc và sự hiếu khách ấm áp đến sự kiện của bạn, từ 10 đến 300 khách.',
                    tags: 'Catering,Sự kiện,Oktoberfest,10-300 khách'
                },
                de: {
                    cat: 'Catering',
                    title: 'Catering & Events',
                    desc: 'Vollständiges deutsches Catering für Feiern, Oktoberfest & Treffen — 10–300 Gäste',
                    badge: 'Hauptservice',
                    tag: '10–300 Gäste',
                    dataDesc: 'Catering steht im Mittelpunkt von German Flavors Hanoi. Wir erstellen abwechslungsreiche, individuelle Menüs für jeden Anlass — private Feiern, Geburtstage, Oktoberfest, Hochzeiten, Firmenveranstaltungen und Community-Treffen. Björn bringt authentische deutsche Küche und herzliche Gastfreundschaft zu Ihrer Veranstaltung, für 10 bis 300 Gäste.',
                    tags: 'Catering,Events,Oktoberfest,10-300 Gäste'
                }
            },
            {
                id: 'products',
                image: 'img/german/offer-german-products.jpg',
                order: 1,
                en: {
                    cat: 'Products',
                    title: 'Authentic German Products',
                    desc: 'Sausages, cold cuts, Leberkäse, mustard, sauerkraut & traditional specialties',
                    badge: 'Original German',
                    tag: 'Original German',
                    dataDesc: 'Authentic German meats, sausages, cold cuts, Leberkäse, Kasseler, mustard, sauerkraut, artisan breads, and traditional specialties — all prepared with original recipes and high-quality ingredients. Genuine German taste, made with care in Hanoi.',
                    tags: 'Sausages,Cold Cuts,Leberkäse,German Specialties'
                },
                vi: {
                    cat: 'Sản phẩm',
                    title: 'Sản phẩm Đức chính gốc',
                    desc: 'Xúc xích, giò lạnh, Leberkäse, mù tạt, dưa cải & đặc sản truyền thống',
                    badge: 'Đức chính gốc',
                    tag: 'Đức chính gốc',
                    dataDesc: 'Thịt, xúc xích, giò lạnh, Leberkäse, Kasseler, mù tạt, dưa cải, bánh mì thủ công và đặc sản truyền thống Đức — tất cả chế biến theo công thức gốc và nguyên liệu chất lượng cao. Hương vị Đức chân thực, làm bằng tâm huyết tại Hà Nội.',
                    tags: 'Xúc xích,Giò lạnh,Leberkäse,Đặc sản Đức'
                },
                de: {
                    cat: 'Produkte',
                    title: 'Authentische deutsche Produkte',
                    desc: 'Würste, Aufschnitt, Leberkäse, Senf, Sauerkraut & traditionelle Spezialitäten',
                    badge: 'Original Deutsch',
                    tag: 'Original Deutsch',
                    dataDesc: 'Authentisches deutsches Fleisch, Würste, Aufschnitt, Leberkäse, Kasseler, Senf, Sauerkraut, handwerkliches Brot und traditionelle Spezialitäten — alles nach originalen Rezepten und mit hochwertigen Zutaten zubereitet. Echter deutscher Geschmack, mit Sorgfalt in Hanoi hergestellt.',
                    tags: 'Würste,Aufschnitt,Leberkäse,Deutsche Spezialitäten'
                }
            },
            {
                id: 'delivery',
                image: 'img/german/offer-home-delivery.jpg',
                order: 2,
                en: {
                    cat: 'Delivery',
                    title: 'Home Delivery',
                    desc: 'German delicatessen & ready-made meals — delivered across Hanoi',
                    badge: 'Delivery',
                    tag: 'Across Hanoi',
                    dataDesc: 'Order German delicatessen products and ready-made meals for delivery across Hanoi. From sausages and cold cuts to freshly prepared dishes — enjoy authentic German food at home with convenient home delivery.',
                    tags: 'Home Delivery,Ready Meals,Delicatessen,Hanoi'
                },
                vi: {
                    cat: 'Giao hàng',
                    title: 'Giao hàng tận nhà',
                    desc: 'Đồ deli Đức & món ăn sẵn — giao trên toàn Hà Nội',
                    badge: 'Giao hàng',
                    tag: 'Toàn Hà Nội',
                    dataDesc: 'Đặt sản phẩm deli Đức và món ăn sẵn giao tận nhà trên toàn Hà Nội. Từ xúc xích và giò lạnh đến món tươi chế biến — thưởng thức ẩm thực Đức chính gốc tại nhà với dịch vụ giao hàng tiện lợi.',
                    tags: 'Giao hàng,Món sẵn,Deli,Hà Nội'
                },
                de: {
                    cat: 'Lieferung',
                    title: 'Hauslieferung',
                    desc: 'Deutsche Delikatessen & Fertiggerichte — geliefert in ganz Hanoi',
                    badge: 'Lieferung',
                    tag: 'Ganz Hanoi',
                    dataDesc: 'Bestellen Sie deutsche Delikatessen und Fertiggerichte zur Lieferung in ganz Hanoi. Von Würsten und Aufschnitt bis zu frisch zubereiteten Gerichten — genießen Sie authentisches deutsches Essen zu Hause mit bequemer Hauslieferung.',
                    tags: 'Hauslieferung,Fertiggerichte,Delikatessen,Hanoi'
                }
            }
        ]
    },
    testimonials: {
        items: [
            {
                id: 't1',
                rating: 5,
                order: 0,
                en: {
                    text: 'At German Flavors Hanoi, the name says it all: with his delicious, fresh food, Björn truly brings a piece of Germany to Vietnam. All dishes are prepared according to authentic recipes and Björn uses very high-quality ingredients. The menu selection is always varied, individual, and tailored to the occasion. Besides the delicious food, Björn also knows how to entertain guests with his warm and personable manner.',
                    name: 'Steffen Kaupp',
                    role: 'Deputy Director, Goethe-Institut Hanoi'
                },
                vi: {
                    text: 'Tại German Flavors Hanoi, tên gọi nói lên tất cả: với món ăn ngon và tươi, Björn thực sự mang một phần nước Đức đến Việt Nam. Các món đều được chế biến theo công thức chính gốc và Björn sử dụng nguyên liệu rất chất lượng. Thực đơn luôn đa dạng, cá nhân hóa và phù hợp với từng dịp. Bên cạnh món ăn ngon, Björn còn biết cách làm hài lòng khách bằng sự thân thiện và ấm áp.',
                    name: 'Steffen Kaupp',
                    role: 'Phó Giám đốc, Viện Goethe Hà Nội'
                },
                de: {
                    text: 'Bei German Flavors Hanoi sagt der Name alles: Mit seinem leckeren, frischen Essen bringt Björn wirklich ein Stück Deutschland nach Vietnam. Alle Gerichte werden nach authentischen Rezepten zubereitet und Björn verwendet sehr hochwertige Zutaten. Die Menüauswahl ist immer abwechslungsreich, individuell und dem Anlass angepasst. Neben dem leckeren Essen versteht Björn es auch, Gäste mit seiner warmen und persönlich Art zu unterhalten.',
                    name: 'Steffen Kaupp',
                    role: 'Stellvertretender Direktor, Goethe-Institut Hanoi'
                }
            },
            {
                id: 't2',
                rating: 5,
                order: 1,
                en: {
                    text: 'I highly recommend German Flavors Hanoi and their catering services. Many places claim to serve authentic German food but GFH is the real deal. Our guests have always been impressed by the delicious, high-quality food that Björn and team serve. Especially his meat dishes are excellent but also all of the other German dishes like his potato salad are highly recommended. Do yourself a favor and have Björn cater your next event.',
                    name: 'Elissa Kaupp',
                    role: 'Hanoi'
                },
                vi: {
                    text: 'Tôi rất khuyên dùng German Flavors Hanoi và dịch vụ catering của họ. Nhiều nơi tự nhận phục vụ món Đức chính gốc nhưng GFH mới là hàng thật. Khách của chúng tôi luôn ấn tượng với món ăn ngon, chất lượng cao mà Björn và đội ngũ phục vụ. Đặc biệt các món thịt rất xuất sắc, cùng các món Đức khác như salad khoai tây cũng rất đáng thử. Hãy để Björn catering cho sự kiện tiếp theo của bạn.',
                    name: 'Elissa Kaupp',
                    role: 'Hà Nội'
                },
                de: {
                    text: 'Ich empfehle German Flavors Hanoi und ihr Catering sehr. Viele Orte behaupten, authentisches deutsches Essen zu servieren, aber GFH ist das Echte. Unsere Gäste waren immer beeindruckt von dem leckeren, hochwertigen Essen, das Björn und sein Team servieren. Besonders seine Fleischgerichte sind ausgezeichnet, aber auch alle anderen deutschen Gerichte wie sein Kartoffelsalat sind sehr empfehlenswert. Tun Sie sich den Gefallen und lassen Sie Björn Ihre nächste Veranstaltung cateren.',
                    name: 'Elissa Kaupp',
                    role: 'Hanoi'
                }
            },
            {
                id: 't3',
                rating: 5,
                order: 2,
                en: {
                    text: 'We are from Switzerland and have been living in Hanoi for over four years. Every now and then, we miss the flavors of home, including sausages. We were delighted to discover German Flavors Hanoi, which offers German-style sausages and other meat products of great quality. What sets them apart for us is that most of their sausages are pasteurized and fresh, not frozen, and made without artificial additives. It is an original quality that you can taste.',
                    name: 'Max Bachmann & Family',
                    role: 'Swiss family · Hanoi'
                },
                vi: {
                    text: 'Chúng tôi đến từ Thụy Sĩ và sống ở Hà Nội hơn bốn năm. Thỉnh thoảng chúng tôi nhớ hương vị quê nhà, kể cả xúc xích. Chúng tôi rất vui khi khám phá German Flavors Hanoi với xúc xích kiểu Đức và các sản phẩm thịt chất lượng cao. Điều khác biệt với chúng tôi là hầu hết xúc xích được thanh trùng và tươi, không đông lạnh, không phụ gia nhân tạo. Đó là chất lượng gốc mà bạn có thể nếm được.',
                    name: 'Max Bachmann & Gia đình',
                    role: 'Gia đình Thụy Sĩ · Hà Nội'
                },
                de: {
                    text: 'Wir kommen aus der Schweiz und leben seit über vier Jahren in Hanoi. Ab und zu vermissen wir die Aromen der Heimat, einschließlich Würste. Wir waren begeistert, German Flavors Hanoi zu entdecken, das deutsche Würste und andere Fleischprodukte von großer Qualität anbietet. Was sie für uns auszeichnet: Die meisten Würste sind pasteurisiert und frisch, nicht gefroren, und ohne künstliche Zusatzstoffe. Es ist eine originale Qualität, die man schmecken kann.',
                    name: 'Max Bachmann & Familie',
                    role: 'Schweizer Familie · Hanoi'
                }
            },
            {
                id: 't4',
                rating: 5,
                order: 3,
                en: {
                    text: 'Incredible butcher and friend in Hanoi with fantastic sausages, meats and breads. He is super friendly and helpful, Bjoern is awesome. I love ordering from them to stock up for the coming week, especially when I\'m cooking something slowly and at a low temperature and want to use only the best ingredients. His dishes also add a special touch to celebrations.',
                    name: 'Sven Burgis',
                    role: 'Hanoi'
                },
                vi: {
                    text: 'Người bán thịt tuyệt vời và người bạn ở Hà Nội với xúc xích, thịt và bánh mì tuyệt hảo. Anh ấy rất thân thiện và hữu ích, Bjoern thật tuyệt. Tôi thích đặt hàng để dự trữ cho tuần tới, đặc biệt khi nấu chậm ở nhiệt độ thấp và chỉ muốn dùng nguyên liệu tốt nhất. Các món của anh ấy cũng thêm nét đặc biệt cho các buổi lễ.',
                    name: 'Sven Burgis',
                    role: 'Hà Nội'
                },
                de: {
                    text: 'Unglaublicher Metzger und Freund in Hanoi mit fantastischen Würsten, Fleisch und Brot. Er ist super freundlich und hilfsbereit, Björn ist großartig. Ich bestelle gerne bei ihnen, um für die kommende Woche vorzusorgen, besonders wenn ich etwas langsam und bei niedriger Temperatur koche und nur die besten Zutaten verwenden möchte. Seine Gerichte verleihen Feiern auch eine besondere Note.',
                    name: 'Sven Burgis',
                    role: 'Hanoi'
                }
            }
        ]
    }
};
