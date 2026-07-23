/**
 * Catalog schema shared by services & products.
 * Firestore: content/services and content/products — both { items: CatalogItem[] }
 *
 * CatalogItem: { id, image, order, en, vi, de }
 * Lang pack keys: badge, cat, title, desc, tag
 */
var CMS_CATALOG = {
    TEXT_KEYS: ['badge', 'cat', 'title', 'desc', 'tag'],
    PRODUCT_IDS: ['products'],
    DOCS: {
        services: 'services',
        products: 'products'
    }
};

function normalizeCatalog(data, fallback) {
    if (!data || !data.items) {
        return { items: (fallback && fallback.items) ? JSON.parse(JSON.stringify(fallback.items)) : [] };
    }
    return { items: data.items || [] };
}

function migrateProductsFromServices(services, products, defaults) {
    var svcItems = ((services && services.items) || []).slice();
    var prodItems = ((products && products.items) || []).slice();

    // Giữ card products trong Services; chỉ đảm bảo content/products cũng có bản copy
    svcItems.forEach(function (item) {
        if (CMS_CATALOG.PRODUCT_IDS.indexOf(item.id) >= 0) {
            if (!prodItems.some(function (p) { return p.id === item.id; })) {
                prodItems.push(JSON.parse(JSON.stringify(item)));
            }
        }
    });

    if (!prodItems.length && defaults && defaults.products) {
        prodItems = JSON.parse(JSON.stringify(defaults.products.items || []));
    }

    return {
        services: { items: svcItems },
        products: { items: prodItems }
    };
}
