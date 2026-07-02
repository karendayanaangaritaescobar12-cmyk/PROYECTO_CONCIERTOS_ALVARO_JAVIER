const STORAGE_KEYS = {
  categorias: 'conciertos_categorias',
  eventos: 'conciertos_eventos',
  ventas: 'conciertos_ventas',
  carrito: 'conciertos_carrito',
  sesionAdmin: 'conciertos_sesion_admin'
};

function parseJSON(value) {
  try {
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.warn('storage.js parseJSON error:', error);
    return null;
  }
}

function loadArray(key) {
  const data = parseJSON(localStorage.getItem(key));
  return Array.isArray(data) ? data : [];
}

function loadObject(key) {
  const data = parseJSON(localStorage.getItem(key));
  return data && typeof data === 'object' ? data : null;
}

function saveItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadCategorias() {
  return loadArray(STORAGE_KEYS.categorias);
}

function saveCategorias(categorias) {
  saveItem(STORAGE_KEYS.categorias, categorias);
}

function loadEventos() {
  return loadArray(STORAGE_KEYS.eventos);
}

function saveEventos(eventos) {
  saveItem(STORAGE_KEYS.eventos, eventos);
}

function loadVentas() {
  return loadArray(STORAGE_KEYS.ventas);
}

function saveVentas(ventas) {
  saveItem(STORAGE_KEYS.ventas, ventas);
}

function loadCarrito() {
  return loadArray(STORAGE_KEYS.carrito);
}

function saveCarrito(carrito) {
  saveItem(STORAGE_KEYS.carrito, carrito);
}

function loadSesionAdmin() {
  return loadObject(STORAGE_KEYS.sesionAdmin);
}

function saveSesionAdmin(sesion) {
  saveItem(STORAGE_KEYS.sesionAdmin, sesion);
}

function clearSesionAdmin() {
  localStorage.removeItem(STORAGE_KEYS.sesionAdmin);
}

window.loadCategorias = loadCategorias;
window.saveCategorias = saveCategorias;
window.loadEventos = loadEventos;
window.saveEventos = saveEventos;
window.loadVentas = loadVentas;
window.saveVentas = saveVentas;
window.loadCarrito = loadCarrito;
window.saveCarrito = saveCarrito;
window.loadSesionAdmin = loadSesionAdmin;
window.saveSesionAdmin = saveSesionAdmin;
window.clearSesionAdmin = clearSesionAdmin;
