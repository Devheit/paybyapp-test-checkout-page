const productsArray = [
    // Electronics
    {
        id: "price_1LnUUoDM1jwCEz8OvxIcJ7to",
        title: "Pro DSLR Camera",
        description: "24.2MP full-frame sensor with 4K video, weather-sealed body.",
        price: 10000,
        category: "Electronics",
        badge: "Best Seller",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80"
    },
    {
        id: "price_1LnUV1DM1jwCEz8OElecHead",
        title: "Wireless Headphones",
        description: "Active noise cancellation, 40-hour battery, premium sound.",
        price: 6500,
        category: "Electronics",
        badge: "New",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80"
    },
    {
        id: "price_1LnUV2DM1jwCEz8OElecWatch",
        title: "Smart Watch Series X",
        description: "Health tracking, GPS, AMOLED display, 7-day battery life.",
        price: 8000,
        category: "Electronics",
        badge: null,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80"
    },

    // Fashion
    {
        id: "price_1LnUTxDM1jwCEz8OAqHYTwKQ",
        title: "Polarized Sunglasses",
        description: "UV400 protection, titanium frame, 100% polarized lens.",
        price: 4500,
        category: "Fashion",
        badge: null,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80"
    },
    {
        id: "price_1LnUV3DM1jwCEz8OFashBag",
        title: "Premium Leather Bag",
        description: "Full-grain Italian leather, brass hardware, fits 15\" laptop.",
        price: 7500,
        category: "Fashion",
        badge: "Limited",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80"
    },
    {
        id: "price_1LnUV4DM1jwCEz8OFashSnkr",
        title: "Runner Pro Sneakers",
        description: "Responsive foam sole, breathable knit upper, unisex fit.",
        price: 5500,
        category: "Fashion",
        badge: "Hot",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80"
    },

    // Food & Drink
    {
        id: "price_1LnUTFDM1jwCEz8OGoOSXiSM",
        title: "Artisan Coffee Blend",
        description: "Single-origin Ethiopian beans, medium roast, 250g bag.",
        price: 3000,
        category: "Food & Drink",
        badge: "Best Seller",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80"
    },
    {
        id: "price_1LnUV5DM1jwCEz8OFoodTea",
        title: "Premium Matcha Tea",
        description: "Ceremonial grade, stone-ground, sourced from Uji, Japan.",
        price: 2500,
        category: "Food & Drink",
        badge: "New",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80"
    },
    {
        id: "price_1LnUV6DM1jwCEz8OFoodChoc",
        title: "Artisan Chocolate Box",
        description: "12 hand-crafted truffles, Belgian dark chocolate, gift-ready.",
        price: 2000,
        category: "Food & Drink",
        badge: null,
        image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600&q=80"
    }
];

function getProductData(id) {
    let productData = productsArray.find(product => product.id === id);
    if (productData == undefined) {
        console.log("Product data does not exist for ID: " + id);
        return undefined;
    }
    return productData;
}

export { productsArray, getProductData };
