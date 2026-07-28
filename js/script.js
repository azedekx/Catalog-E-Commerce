const products = [
  { id: 1, name: 'Headset Nirkabel', price: 350000, category: 'Audio', icon: '🎧' },
  { id: 2, name: 'Smartwatch Lite', price: 620000, category: 'Gadget', icon: '⌚' },
  { id: 3, name: 'Kamera Pocket', price: 890000, category: 'Fotografi', icon: '📷' },
  { id: 4, name: 'Keyboard Mekanik', price: 480000, category: 'Komputer', icon: '⌨️' },
  { id: 5, name: 'Lampu Belajar', price: 150000, category: 'Rumah', icon: '💡' },
  { id: 6, name: 'Tas Travel', price: 240000, category: 'Fashion', icon: '🎒' },
  { id: 7, name: 'Speaker Portable', price: 280000, category: 'Audio', icon: '🔊' },
  { id: 8, name: 'Drone Mini', price: 1150000, category: 'Elektronik', icon: '🛸' },
  { id: 9, name: 'Mouse Wireless', price: 180000, category: 'Komputer', icon: '🖱️' },
  { id: 10, name: 'Powerbank 20000mAh', price: 320000, category: 'Elektronik', icon: '🔋' },
  { id: 11, name: 'Sepatu Lari', price: 450000, category: 'Fashion', icon: '👟' },
  { id: 12, name: 'Hoodie Unisex', price: 260000, category: 'Fashion', icon: '🧥' },
  { id: 13, name: 'Earbuds Pro', price: 410000, category: 'Audio', icon: '🎵' },
  { id: 14, name: 'Monitor 24 Inch', price: 1450000, category: 'Komputer', icon: '🖥️' },
  { id: 15, name: 'Router WiFi', price: 360000, category: 'Elektronik', icon: '📡' },
  { id: 16, name: 'Kursi Ergonomis', price: 690000, category: 'Rumah', icon: '🪑' }
];

const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

let cart = [];

function formatRupiah(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(value);
}

function renderProducts(filteredProducts) {
  productGrid.innerHTML = '';

  if (filteredProducts.length === 0) {
    productGrid.innerHTML = '<p class="empty-state">Produk tidak ditemukan.</p>';
    return;
  }

  filteredProducts.forEach((product) => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-icon">${product.icon}</div>
      <h3>${product.name}</h3>
      <div class="product-meta">
        <span>${product.category}</span>
        <span class="price">${formatRupiah(product.price)}</span>
      </div>
      <button class="add-to-cart" data-id="${product.id}">Tambah ke Keranjang</button>
    `;
    productGrid.appendChild(card);
  });
}

function renderCart() {
  cartItems.innerHTML = '';

  if (cart.length === 0) {
    cartItems.innerHTML = '<li class="empty-state">Keranjang masih kosong.</li>';
    cartTotal.textContent = formatRupiah(0);
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <span>${item.quantity} x ${formatRupiah(item.price)}</span>
      </div>
      <span>${formatRupiah(item.price * item.quantity)}</span>
    `;
    cartItems.appendChild(li);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = formatRupiah(total);
}

function addToCart(productId) {
  const selectedProduct = products.find((product) => product.id === productId);

  if (!selectedProduct) {
    return;
  }

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...selectedProduct, quantity: 1 });
  }

  renderCart();
}

productGrid.addEventListener('click', (event) => {
  const button = event.target.closest('.add-to-cart');
  if (button) {
    addToCart(Number(button.dataset.id));
  }
});

searchInput.addEventListener('input', () => {
  const keyword = searchInput.value.toLowerCase();
  const filteredProducts = products.filter((product) => {
    const matchesName = product.name.toLowerCase().includes(keyword);
    const matchesCategory = product.category.toLowerCase().includes(keyword);

    if (keyword === '') {
      return true;
    }

    return matchesName || matchesCategory;
  });

  renderProducts(filteredProducts);
});

renderProducts(products);
renderCart();
