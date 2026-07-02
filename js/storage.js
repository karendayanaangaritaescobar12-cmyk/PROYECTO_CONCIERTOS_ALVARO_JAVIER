/* estilos base para el proyecto */
:root {
  font-family: Inter, system-ui, sans-serif;
  color: #1b1b1b;
  background: #f7f7f7;
  line-height: 1.5;
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  min-height: 100%;
}

body {
  padding: 0;
  background: #100b10;
  color: #f5edde;
}

button,
input,
select,
textarea {
  font: inherit;
}

button {
  cursor: pointer;
}

.hidden {
  display: none !important;
}

.container {
  width: min(1200px, 100% - 2rem);
  margin: 0 auto;
}

.site-header {
  background: #170d11;
  border-bottom: 1px solid rgba(255, 208, 95, 0.12);
  padding: 1rem 0;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.brand {
  color: #f7d554;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-decoration: none;
}

.main-nav {
  display: flex;
  gap: 1rem;
}

.main-nav a {
  color: #d7c69f;
  text-decoration: none;
  transition: color 0.2s ease;
}

.main-nav a:hover {
  color: #fff;
}

.cart-toggle {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #f5e7bd;
  padding: 0.85rem 1rem;
  border-radius: 0.85rem;
}

.public-layout {
  display: grid;
  grid-template-columns: 1.7fr 0.9fr;
  gap: 1.5rem;
  padding: 2rem 0 3rem;
}

.public-panel {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero-card {
  background: linear-gradient(135deg, rgba(255, 183, 97, 0.18), rgba(42, 16, 40, 0.95));
  border: 1px solid rgba(255, 183, 97, 0.16);
  border-radius: 1.5rem;
  padding: 2rem;
}

.hero-card .eyebrow {
  margin: 0 0 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: #f4d983;
  font-size: 0.8rem;
}

.hero-card h1 {
  margin: 0 0 1rem;
  font-size: clamp(2rem, 3vw, 3rem);
}

.hero-card p {
  margin: 0;
  color: #dfd1ac;
  max-width: 42rem;
}

.filters-panel {
  display: grid;
  grid-template-columns: repeat(3, minmax(220px, 1fr));
  gap: 1rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  font-size: 0.9rem;
  color: #d3c08d;
}

.filter-group input,
.filter-group select {
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  color: #f9f0d8;
  padding: 0.95rem 1rem;
  border-radius: 0.85rem;
}

.events-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.events-panel h2 {
  margin: 0;
  font-size: 1.6rem;
  letter-spacing: 0.03em;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

evento-card {
  display: block;
}

.cart-panel {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 193, 7, 0.08);
  border-radius: 1.5rem;
  padding: 1.5rem;
  position: sticky;
  top: 1.5rem;
  align-self: start;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}

.cart-header .eyebrow {
  margin: 0 0 0.5rem;
  color: #f2d38d;
}

.cart-items {
  display: grid;
  gap: 1rem;
  margin-bottom: 1rem;
}

.cart-item {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1rem;
}

.cart-item strong,
.cart-item span {
  display: block;
}

.cart-summary {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.cart-summary > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.primary-button,
.secondary-button,
.danger-button,
.icon-button {
  border: none;
  border-radius: 0.95rem;
  padding: 0.95rem 1.15rem;
  font-weight: 700;
}

.primary-button {
  background: #f7d34e;
  color: #240b00;
}

.icon-button {
  background: rgba(255, 255, 255, 0.05);
  color: #f5e7bd;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.checkout-form {
  margin-top: 1rem;
  display: grid;
  gap: 1rem;
}

.checkout-form label {
  display: grid;
  gap: 0.5rem;
  color: #e8d9b2;
}

.checkout-form input {
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  color: #f7ecd0;
  padding: 0.9rem 1rem;
  border-radius: 0.85rem;
}

.success-message {
  margin: 0;
  color: #c6f1bc;
}

.admin-page {
  background: #10080b;
}

.admin-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 100vh;
}

.admin-sidebar {
  padding: 2rem 1.5rem;
  background: #210f12;
  border-right: 1px solid rgba(255, 193, 7, 0.10);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.brand {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.brand-title {
  color: #f7d24b;
  font-size: 1.9rem;
  letter-spacing: 0.18em;
  font-weight: 800;
}

.brand-subtitle {
  color: #caa85b;
  font-size: 0.85rem;
  letter-spacing: 0.25em;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sidebar-nav a {
  color: #d4c18d;
  text-decoration: none;
  padding: 0.95rem 1rem;
  border-radius: 0.95rem;
  transition: background 0.2s ease;
}

.sidebar-nav a.active,
.sidebar-nav a:hover {
  background: rgba(255, 193, 7, 0.15);
  color: #fff;
}

.sidebar-button {
  background: #8b1818;
  color: #f7e1d4;
  border: none;
  padding: 0.95rem 1rem;
  border-radius: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.admin-content {
  padding: 2rem;
}

.auth-panel,
.admin-section {
  max-width: 100%;
}

.auth-card,
.form-card,
.metric-card,
.table-panel {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 193, 7, 0.10);
  border-radius: 1.5rem;
  padding: 1.75rem;
  margin-bottom: 1.5rem;
}

.auth-card {
  max-width: 520px;
  margin: 0 auto;
}

.auth-card h1,
.admin-header h1 {
  margin: 0 0 0.75rem;
}

.auth-card label,
.form-card label {
  display: grid;
  gap: 0.5rem;
  color: #e7d8b2;
}

.auth-card input,
.form-card input,
.form-card textarea,
.form-card select {
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  color: #f5e7bd;
  padding: 0.9rem 1rem;
  border-radius: 0.85rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.full-width {
  grid-column: 1 / -1;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}

.metric-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.metric-label {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #d2bd8b;
  font-size: 0.8rem;
}

.metric-card strong {
  font-size: 2rem;
}

.admin-header {
  margin-bottom: 1rem;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.data-table th {
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #c9b27d;
  font-size: 0.75rem;
}

.data-table td {
  color: #e8d9b3;
  vertical-align: middle;
}

.data-table tbody tr:hover {
  background: rgba(255, 255, 255, 0.03);
}

.action-button,
.table-action {
  border: none;
  padding: 0.6rem 0.9rem;
  border-radius: 0.75rem;
  font-weight: 700;
}

.action-button.edit {
  background: rgba(255, 255, 255, 0.08);
  color: #f9e8c8;
}

.action-button.delete {
  background: #7f1e1e;
  color: #ffe7c0;
}

.error-message {
  margin: 1rem 0 0;
  color: #f8b4b4;
}

.table-panel.scrollable {
  overflow-x: auto;
}

@media (max-width: 1024px) {
  .admin-layout {
    grid-template-columns: 1fr;
  }

  .public-layout {
    grid-template-columns: 1fr;
  }

  .events-grid {
    grid-template-columns: 1fr;
  }

  .filters-panel,
  .form-grid,
  .metric-grid {
    grid-template-columns: 1fr;
  }

  .cart-panel {
    position: static;
    top: auto;
  }
}
cd "c:\Users\Kimet\OneDrive\Documents\mis proyectos visual studio core\github trabajo\PROYECTO_CONCIERTOS_ALVARO_JAVIER"; @'
// storage.js
const STORAGE_KEYS = {
  categorias: 'conciertos_categorias',
  eventos: 'conciertos_eventos',
  carrito: 'conciertos_carrito',
  ventas: 'conciertos_ventas',
  sesionAdmin: 'conciertos_sesionAdmin'
};

function getStorage(key) {
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function setStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadCategorias() {
  return getStorage(STORAGE_KEYS.categorias) || [];
}

function saveCategorias(categorias) {
  setStorage(STORAGE_KEYS.categorias, categorias);
}

function loadEventos() {
  return getStorage(STORAGE_KEYS.eventos) || [];
}

function saveEventos(eventos) {
  setStorage(STORAGE_KEYS.eventos, eventos);
}

function loadCarrito() {
  return getStorage(STORAGE_KEYS.carrito) || [];
}

function saveCarrito(carrito) {
  setStorage(STORAGE_KEYS.carrito, carrito);
}

function loadVentas() {
  return getStorage(STORAGE_KEYS.ventas) || [];
}

function saveVentas(ventas) {
  setStorage(STORAGE_KEYS.ventas, ventas);
}

function loadSesionAdmin() {
  return getStorage(STORAGE_KEYS.sesionAdmin);
}

function saveSesionAdmin(value) {
  setStorage(STORAGE_KEYS.sesionAdmin, value);
}

function clearSesionAdmin() {
  localStorage.removeItem(STORAGE_KEYS.sesionAdmin);
}
