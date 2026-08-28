const productsArray = [
  {
    id: 'price_1LnUTFDM1jwCEz8OGoOSXiSM',
    title: 'Coffee',
    price: 300,
    image:
      'https://images.unsplash.com/photo-1556742526-795a8eac090e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Lifestyle',
    description:
      'Premium roasted coffee beans, freshly ground for the perfect brew.',
    featured: true,
  },
  {
    id: 'price_1LnUTxDM1jwCEz8OAqHYTwKQ',
    title: 'Sunglasses',
    price: 4500,
    image:
      'https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Accessories',
    description: 'Classic UV-protection sunglasses with a modern frame design.',
  },
  {
    id: 'price_1LnUUoDM1jwCEz8OvxIcJ7to',
    title: 'Camera',
    price: 1000,
    image:
      'https://plus.unsplash.com/premium_photo-1663134149019-284682ece04c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Electronics',
    description: 'Compact digital camera with 20MP sensor and optical zoom.',
    featured: true,
  },
  {
    id: 'price_candle_001',
    title: 'Scented Candle',
    price: 2000,
    image:
      'https://images.unsplash.com/photo-1640095889747-2090ee12fa7d?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Lifestyle',
    description:
      'Hand-poured soy candle with a warm vanilla and cedar fragrance.',
  },
  {
    id: 'price_mug_001',
    title: 'Ceramic Mug',
    price: 1500,
    image:
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Lifestyle',
    description:
      'Handcrafted ceramic mug, perfect for your morning coffee or tea.',
  },
  {
    id: 'price_backpack_001',
    title: 'Leather Backpack',
    price: 15000,
    image:
      'https://images.unsplash.com/photo-1622560257067-108402fcedc0?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Accessories',
    description: 'Genuine leather backpack with padded laptop compartment.',
    featured: true,
  },
  {
    id: 'price_watch_001',
    title: 'Wristwatch',
    price: 8000,
    image:
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Accessories',
    description: 'Minimalist analog wristwatch with a stainless steel band.',
  },
  {
    id: 'price_headphones_001',
    title: 'Headphones',
    price: 7500,
    image:
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Electronics',
    description: 'Over-ear wireless headphones with active noise cancellation.',
  },
  {
    id: 'price_speaker_001',
    title: 'Smart Speaker',
    price: 12000,
    image:
      'https://plus.unsplash.com/premium_photo-1683141496040-eeef9702269f?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Electronics',
    description: 'Voice-controlled smart speaker with rich 360-degree sound.',
  },
];

const productCategories = ['Lifestyle', 'Accessories', 'Electronics'];

function getProductData(id) {
  const productData = productsArray.find((product) => product.id === id);

  if (productData === undefined) {
    console.log('Product data does not exist for ID: ' + id);
    return undefined;
  }

  return productData;
}

function getFeaturedProducts() {
  return productsArray.filter((product) => product.featured);
}

function getProductsByCategory(category) {
  return productsArray.filter((product) => product.category === category);
}

export {
  productsArray,
  getProductData,
  productCategories,
  getFeaturedProducts,
  getProductsByCategory,
};
