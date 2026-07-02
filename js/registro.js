const REGISTRO_KEYS = {
  contactos: 'registro_contactos',
  ventas: 'conciertos_ventas'
};

function parseJSON(value) {
  try {
    return value ? JSON.parse(value) : null;
  } catch (e) {
    return null;
  }
}

function loadRegistroArray(key) {
  const data = parseJSON(localStorage.getItem(key));
  return Array.isArray(data) ? data : [];
}

function saveRegistro(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function guardarContacto(datos) {
  const contactos = loadRegistroArray(REGISTRO_KEYS.contactos);
  contactos.push({
    id: Date.now(),
    fecha: new Date().toISOString(),
    ...datos
  });
  saveRegistro(REGISTRO_KEYS.contactos, contactos);
}

function obtenerContactos() {
  return loadRegistroArray(REGISTRO_KEYS.contactos);
}

function obtenerVentasRegistro() {
  return loadRegistroArray(REGISTRO_KEYS.ventas);
}

window.guardarContacto = guardarContacto;
window.obtenerContactos = obtenerContactos;
window.obtenerVentasRegistro = obtenerVentasRegistro;
