// Módulo de carrito y compra para la vista pública
const cartKey = 'conciertos_carrito';
const salesKey = 'conciertos_ventas';

function loadCart() {
  const raw = localStorage.getItem(cartKey);
  return raw ? JSON.parse(raw) : [];
}

function saveCart(cart) {
  localStorage.setItem(cartKey, JSON.stringify(cart));
}

function addToCart(event) {
  const cart = loadCart();
  const exists = cart.find(item => item.id === event.id);
  if (exists) return;
  cart.push(event);
  saveCart(cart);
  updateCartCount();
}

function removeFromCart(id) {
  const cart = loadCart().filter(item => item.id !== id);
  saveCart(cart);
  renderCart();
  updateCartCount();
}

function clearCart() {
  saveCart([]);
  updateCartCount();
}

function updateCartCount() {
  const count = loadCart().length;
  const cartCount = document.getElementById('cart-count');
  if (cartCount) cartCount.textContent = count;
}

function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  if (!cartItems || !cartTotal) return;

  const cart = loadCart();
  cartItems.innerHTML = '';

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">No hay eventos en el carrito.</p>';
    cartTotal.textContent = '$0';
    return;
  }

  let total = 0;
  cart.forEach(item => {
    total += Number(item.precio);
    const card = document.createElement('article');
    card.className = 'cart-item';
    card.innerHTML = `
      <div>
        <strong>${item.nombre}</strong>
        <span>${item.ciudad} · ${item.fecha} ${item.hora}</span>
      </div>
      <button class="icon-button" type="button" data-remove="${item.id}">Eliminar</button>
    `;
    cartItems.appendChild(card);
  });

  cartTotal.textContent = `$${total}`;
}

function handleCartButtons(event) {
  const target = event.target;
  const removeId = target.dataset.remove;
  if (removeId) {
    removeFromCart(Number(removeId));
  }
}

function openCartPanel() {
  document.getElementById('cart-panel')?.classList.remove('hidden');
  renderCart();
}

function closeCartPanel() {
  document.getElementById('cart-panel')?.classList.add('hidden');
}

function handleCheckoutSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  const cart = loadCart();
  if (!cart.length) return;

  const total = cart.reduce((sum, item) => sum + Number(item.precio), 0);
  const sale = {
    id: Date.now(),
    fecha: new Date().toISOString(),
    cliente: {
      identificacion: data.identificacion,
      nombre: data.nombre,
      direccion: data.direccion,
      telefono: data.telefono,
      email: data.email
    },
    ciudad: data.ciudad,
    items: cart,
    total
  };

  const sales = loadSales();
  sales.unshift(sale);
  saveSales(sales);
  clearCart();
  form.reset();
  form.classList.add('hidden');
  document.getElementById('checkout-button')?.classList.remove('hidden');
  renderCart();
  updateCartCount();
  const msg = document.getElementById('checkout-message');
  if (msg) {
    msg.textContent = 'Compra registrada con éxito.';
    msg.classList.remove('hidden');
  }
  setTimeout(() => {
    if (msg) msg.classList.add('hidden');
    closeCartPanel();
  }, 1500);
}

function loadSales() {
  const raw = localStorage.getItem(salesKey);
  return raw ? JSON.parse(raw) : [];
}

function saveSales(sales) {
  localStorage.setItem(salesKey, JSON.stringify(sales));
}

function initCartModule() {
  document.getElementById('open-cart')?.addEventListener('click', openCartPanel);
  document.getElementById('close-cart')?.addEventListener('click', closeCartPanel);
  document.getElementById('cart-items')?.addEventListener('click', handleCartButtons);
  document.getElementById('checkout-button')?.addEventListener('click', () => {
    document.getElementById('checkout-form')?.classList.remove('hidden');
  });
  document.getElementById('checkout-form')?.addEventListener('submit', handleCheckoutSubmit);
  updateCartCount();
}

window.initCartModule = initCartModule;
