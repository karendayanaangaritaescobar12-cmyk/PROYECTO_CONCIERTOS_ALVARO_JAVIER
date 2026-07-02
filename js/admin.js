const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = '123456';

const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const logoutButton = document.getElementById('logout-button');
const navLinks = document.querySelectorAll('.sidebar-nav a');
const loginSection = document.getElementById('login-section');
const menuSection = document.getElementById('menu-section');
const dashboardSection = document.getElementById('dashboard-section');
const categoriasSection = document.getElementById('categorias-section');
const eventosSection = document.getElementById('eventos-section');
const ventasSection = document.getElementById('ventas-section');
const countCategories = document.getElementById('count-categories');
const countEvents = document.getElementById('count-events');
const countSales = document.getElementById('count-sales');
const countRevenue = document.getElementById('count-revenue');
const liveTime = document.getElementById('live-time');
const categoryForm = document.getElementById('category-form');
const categoriesBody = document.getElementById('categories-body');
const eventForm = document.getElementById('event-form');
const eventCategorySelect = eventForm?.querySelector('select[name="categoriaId"]');
const eventsBody = document.getElementById('events-body');
const salesBody = document.getElementById('sales-body');
const mensajesSection = document.getElementById('mensajes-section');
const messagesBody = document.getElementById('messages-body');

function isLoginPage() {
  return !!loginForm;
}

function isSpaPage() {
  return !!(menuSection || (eventosSection && !isLoginPage()));
}

function getCategoriasAdmin() {
  return loadCategorias() || [];
}

function getEventosAdmin() {
  return loadEventos() || [];
}

function getVentasAdmin() {
  return loadVentas() || [];
}

function updateDashboard() {
  const categorias = getCategoriasAdmin();
  const eventos = getEventosAdmin();
  const ventas = getVentasAdmin();
  const totalRevenue = ventas.reduce((sum, venta) => sum + Number(venta.total), 0);

  if (countCategories) countCategories.textContent = categorias.length;
  if (countEvents) countEvents.textContent = eventos.length;
  if (countSales) countSales.textContent = ventas.length;
  if (countRevenue) countRevenue.textContent = `$${totalRevenue}`;
  updateLiveTime();
}

function updateLiveTime() {
  if (liveTime) {
    liveTime.textContent = new Date().toLocaleTimeString('es-CO');
  }
}

function showLogin() {
  if (loginSection) loginSection.classList.remove('hidden');
  if (dashboardSection) dashboardSection.classList.add('hidden');
  if (categoriasSection) categoriasSection.classList.add('hidden');
  if (eventosSection) eventosSection.classList.add('hidden');
  if (ventasSection) ventasSection.classList.add('hidden');
  if (mensajesSection) mensajesSection.classList.add('hidden');
  if (logoutButton) logoutButton.classList.add('hidden');
  navLinks.forEach(link => link.classList.remove('active'));
  if (loginError) {
    loginError.classList.add('hidden');
  }
}

function showSection(sectionId) {
  if (!loadSesionAdmin()) {
    window.location.href = 'admin.html';
    return;
  }

  if (isSpaPage()) {
    if (menuSection) menuSection.classList.add('hidden');
    if (dashboardSection) dashboardSection.classList.add('hidden');
    if (categoriasSection) categoriasSection.classList.add('hidden');
    if (eventosSection) eventosSection.classList.add('hidden');
    if (ventasSection) ventasSection.classList.add('hidden');
    if (mensajesSection) mensajesSection.classList.add('hidden');
  }

  const section = document.getElementById(`${sectionId}-section`);
  if (section) section.classList.remove('hidden');

  if (logoutButton) logoutButton.classList.remove('hidden');

  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === sectionId);
  });

  if (sectionId === 'menu' || sectionId === 'dashboard') {
    updateDashboard();
  }

  if (sectionId === 'categorias') {
    renderCategorias();
    fillEventCategorySelect();
  }

  if (sectionId === 'eventos') {
    renderEventos();
    fillEventCategorySelect();
  }

  if (sectionId === 'ventas') {
    renderVentas();
  }

  if (sectionId === 'mensajes') {
    renderMensajes();
  }
}

function saveCategoryList(categorias) {
  saveCategorias(categorias);
}

function saveEventList(eventos) {
  saveEventos(eventos);
}

function saveSaleList(ventas) {
  saveVentas(ventas);
}

function renderCategorias() {
  const categorias = getCategoriasAdmin();
  if (!categoriesBody) return;

  if (!categorias.length) {
    categoriesBody.innerHTML = '<tr><td colspan="3">No hay categorías registradas.</td></tr>';
    return;
  }

  categoriesBody.innerHTML = categorias
    .map(categoria => `
      <tr>
        <td>${categoria.nombre}</td>
        <td>${categoria.descripcion}</td>
        <td>
          <button class="action-button edit" data-action="edit-category" data-id="${categoria.id}">Editar</button>
          <button class="action-button delete" data-action="delete-category" data-id="${categoria.id}">Eliminar</button>
        </td>
      </tr>
    `)
    .join('');
}

function fillEventCategorySelect() {
  if (!eventCategorySelect) return;
  const categorias = getCategoriasAdmin();
  eventCategorySelect.innerHTML = '<option value="">Selecciona categoría</option>';

  categorias.forEach(categoria => {
    const option = document.createElement('option');
    option.value = categoria.id;
    option.textContent = categoria.nombre;
    eventCategorySelect.appendChild(option);
  });
}

function resetCategoryForm() {
  if (!categoryForm) return;
  categoryForm.reset();
  const idInput = categoryForm.querySelector('input[name="id"]');
  if (idInput) idInput.value = '';
}

function resetEventForm() {
  if (!eventForm) return;
  eventForm.reset();
  const idInput = eventForm.querySelector('input[name="id"]');
  if (idInput) idInput.value = '';
}

function renderEventos() {
  const eventos = getEventosAdmin();
  if (!eventsBody) return;

  if (!eventos.length) {
    eventsBody.innerHTML = '<tr><td colspan="6">No hay eventos registrados.</td></tr>';
    return;
  }

  eventsBody.innerHTML = eventos
    .map(evento => {
      const categoria = getCategoriasAdmin().find(cat => cat.id === Number(evento.categoriaId));
      return `
        <tr>
          <td>${evento.codigo}</td>
          <td>${evento.nombre}</td>
          <td>${categoria?.nombre || 'Sin categoría'}</td>
          <td>$${evento.precio}</td>
          <td>${evento.ciudad}</td>
          <td>
            <button class="action-button edit" data-action="edit-event" data-id="${evento.id}">Editar</button>
            <button class="action-button delete" data-action="delete-event" data-id="${evento.id}">Eliminar</button>
          </td>
        </tr>
      `;
    })
    .join('');
}

function renderMensajes() {
  const contactos = typeof obtenerContactos === 'function' ? obtenerContactos() : [];
  if (!messagesBody) return;

  if (!contactos.length) {
    messagesBody.innerHTML = '<tr><td colspan="5">No hay mensajes de contacto.</td></tr>';
    return;
  }

  const ordenados = contactos.slice().sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  messagesBody.innerHTML = ordenados
    .map(msg => `
      <tr>
        <td>${new Date(msg.fecha).toLocaleString('es-CO')}</td>
        <td>${msg.nombre}</td>
        <td>${msg.email}</td>
        <td>${msg.asunto}</td>
        <td>${msg.mensaje}</td>
      </tr>
    `)
    .join('');
}

function renderVentas() {
  const ventas = getVentasAdmin();
  if (!salesBody) return;

  if (!ventas.length) {
    salesBody.innerHTML = '<tr><td colspan="5">No hay ventas registradas.</td></tr>';
    return;
  }

  const ventasOrdenadas = ventas.slice().sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  salesBody.innerHTML = ventasOrdenadas
    .map(venta => `
      <tr>
        <td>${new Date(venta.fecha).toLocaleString('es-CO')}</td>
        <td>${venta.cliente.nombre}</td>
        <td>${venta.ciudad}</td>
        <td>$${venta.total}</td>
        <td><button class="action-button edit" data-action="view-sale" data-id="${venta.id}">Detalle</button></td>
      </tr>
    `)
    .join('');
}

function fillCategoryForm(categoriaId) {
  const categorias = getCategoriasAdmin();
  const categoria = categorias.find(c => Number(c.id) === Number(categoriaId));
  if (!categoria) return;

  const idInput = categoryForm?.querySelector('input[name="id"]');
  const nombreInput = categoryForm?.querySelector('input[name="nombre"]');
  const descripcionInput = categoryForm?.querySelector('input[name="descripcion"]');

  if (idInput) idInput.value = categoria.id;
  if (nombreInput) nombreInput.value = categoria.nombre;
  if (descripcionInput) descripcionInput.value = categoria.descripcion;
}

function fillEventForm(eventoId) {
  const eventos = getEventosAdmin();
  const evento = eventos.find(e => Number(e.id) === Number(eventoId));
  if (!evento) return;

  const idInput = eventForm?.querySelector('input[name="id"]');
  const codigoInput = eventForm?.querySelector('input[name="codigo"]');
  const nombreInput = eventForm?.querySelector('input[name="nombre"]');
  const categoriaSelect = eventForm?.querySelector('select[name="categoriaId"]');
  const precioInput = eventForm?.querySelector('input[name="precio"]');
  const fechaInput = eventForm?.querySelector('input[name="fecha"]');
  const horaInput = eventForm?.querySelector('input[name="hora"]');
  const ciudadInput = eventForm?.querySelector('input[name="ciudad"]');
  const imagenInput = eventForm?.querySelector('input[name="imagen"]');
  const descripcionInput = eventForm?.querySelector('textarea[name="descripcion"]');

  if (idInput) idInput.value = evento.id;
  if (codigoInput) codigoInput.value = evento.codigo;
  if (nombreInput) nombreInput.value = evento.nombre;
  if (categoriaSelect) categoriaSelect.value = evento.categoriaId;
  if (precioInput) precioInput.value = evento.precio;
  if (fechaInput) fechaInput.value = evento.fecha;
  if (horaInput) horaInput.value = evento.hora;
  if (ciudadInput) ciudadInput.value = evento.ciudad;
  if (imagenInput) imagenInput.value = evento.imagen;
  if (descripcionInput) descripcionInput.value = evento.descripcion;
}

function handleCategorySubmit(event) {
  event.preventDefault();
  const formData = new FormData(categoryForm);
  const id = formData.get('id');
  const nombre = formData.get('nombre')?.toString().trim();
  const descripcion = formData.get('descripcion')?.toString().trim();
  const categorias = getCategoriasAdmin();

  if (!nombre || !descripcion) {
    return;
  }

  if (id) {
    const updated = categorias.map(categoria => {
      if (String(categoria.id) === String(id)) {
        return { ...categoria, nombre, descripcion };
      }
      return categoria;
    });
    saveCategoryList(updated);
  } else {
    categorias.push({ id: Date.now(), nombre, descripcion });
    saveCategoryList(categorias);
  }

  resetCategoryForm();
  fillEventCategorySelect();
  renderCategorias();
  updateDashboard();
}

function handleEventSubmit(event) {
  event.preventDefault();
  const formData = new FormData(eventForm);
  const id = formData.get('id');
  const codigo = formData.get('codigo')?.toString().trim();
  const nombre = formData.get('nombre')?.toString().trim();
  const categoriaId = formData.get('categoriaId');
  const precio = Number(formData.get('precio'));
  const fecha = formData.get('fecha')?.toString();
  const hora = formData.get('hora')?.toString();
  const ciudad = formData.get('ciudad')?.toString().trim();
  const imagen = formData.get('imagen')?.toString().trim();
  const descripcion = formData.get('descripcion')?.toString().trim();
  const eventos = getEventosAdmin();

  if (!codigo || !nombre || !categoriaId || !precio || !fecha || !hora || !ciudad || !imagen || !descripcion) {
    return;
  }

  if (id) {
    const updated = eventos.map(evento => {
      if (String(evento.id) === String(id)) {
        return {
          ...evento,
          codigo,
          nombre,
          categoriaId: Number(categoriaId),
          precio,
          fecha,
          hora,
          ciudad,
          imagen,
          descripcion
        };
      }
      return evento;
    });
    saveEventList(updated);
  } else {
    eventos.push({
      id: Date.now(),
      codigo,
      nombre,
      categoriaId: Number(categoriaId),
      precio,
      fecha,
      hora,
      ciudad,
      imagen,
      descripcion
    });
    saveEventList(eventos);
  }

  resetEventForm();
  renderEventos();
  updateDashboard();
}

function handleTableClick(event) {
  const button = event.target.closest('button');
  if (!button) return;

  const action = button.dataset.action;
  const id = Number(button.dataset.id);

  if (action === 'edit-category') {
    fillCategoryForm(id);
    return;
  }

  if (action === 'delete-category') {
    if (!confirm('¿Eliminar esta categoría? También se eliminarán todos los eventos asociados.')) return;
    const categorias = getCategoriasAdmin().filter(categoria => Number(categoria.id) !== id);
    saveCategoryList(categorias);
    const eventos = getEventosAdmin().filter(evento => Number(evento.categoriaId) !== id);
    saveEventList(eventos);
    fillEventCategorySelect();
    renderCategorias();
    renderEventos();
    updateDashboard();
    return;
  }

  if (action === 'edit-event') {
    fillEventForm(id);
    return;
  }

  if (action === 'delete-event') {
    if (!confirm('¿Eliminar este evento?')) return;
    const eventos = getEventosAdmin().filter(evento => Number(evento.id) !== id);
    saveEventList(eventos);
    renderEventos();
    updateDashboard();
    return;
  }

  if (action === 'view-sale') {
    const ventas = getVentasAdmin();
    const venta = ventas.find(item => Number(item.id) === id);
    if (!venta) return;
    alert(`Venta: ${new Date(venta.fecha).toLocaleString('es-CO')}
Cliente: ${venta.cliente.nombre}
Ciudad: ${venta.ciudad}
Total: $${venta.total}

Items:\n${venta.items.map(item => `- ${item.nombre} ($${item.precio})`).join('\n')}`);
  }
}

function handleNavClick(event) {
  event.preventDefault();
  const section = event.currentTarget.dataset.section;
  if (!section) return;
  if (!loadSesionAdmin()) {
    showLogin();
    return;
  }
  showSection(section);
}

function handleLogin(event) {
  event.preventDefault();
  const data = new FormData(loginForm);
  const email = data.get('email')?.toString().trim();
  const password = data.get('password')?.toString().trim();

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    saveSesionAdmin({ email });
    if (loginError) loginError.classList.add('hidden');
    window.location.href = 'eventos.html';
  } else {
    if (loginError) loginError.classList.remove('hidden');
  }
}

function handleLogout() {
  clearSesionAdmin();
  window.location.href = 'admin.html';
}

function initLoginPage() {
  loginForm.addEventListener('submit', handleLogin);
  loginForm.addEventListener('input', () => {
    if (loginError) loginError.classList.add('hidden');
  });

  if (loadSesionAdmin()) {
    window.location.href = 'eventos.html';
    return;
  }

  showLogin();
}

function exportJSON() {
  const data = {
    categorias: loadCategorias(),
    eventos: loadEventos(),
    ventas: loadVentas(),
    contactos: typeof obtenerContactos === 'function' ? obtenerContactos() : []
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `conciertos_backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function initSpaPage() {
  logoutButton.addEventListener('click', handleLogout);
  navLinks.forEach(link => link.addEventListener('click', handleNavClick));
  if (categoryForm) categoryForm.addEventListener('submit', handleCategorySubmit);
  if (eventForm) eventForm.addEventListener('submit', handleEventSubmit);
  if (categoriesBody) categoriesBody.addEventListener('click', handleTableClick);
  if (eventsBody) eventsBody.addEventListener('click', handleTableClick);
  if (salesBody) salesBody.addEventListener('click', handleTableClick);

  if (loadSesionAdmin()) {
    showSection('eventos');
    updateDashboard();
  } else {
    window.location.href = 'admin.html';
  }

  document.getElementById('export-json')?.addEventListener('click', exportJSON);

  if (liveTime) {
    updateLiveTime();
    setInterval(updateLiveTime, 1000);
  }
}

function initStandalonePage() {
  if (!loadSesionAdmin()) {
    window.location.href = 'admin.html';
    return;
  }

  logoutButton.addEventListener('click', handleLogout);

  if (categoriesBody) {
    categoriesBody.addEventListener('click', handleTableClick);
    renderCategorias();
  }

  if (eventsBody) {
    eventsBody.addEventListener('click', handleTableClick);
    renderEventos();
  }

  if (salesBody) {
    salesBody.addEventListener('click', handleTableClick);
    renderVentas();
  }

  if (messagesBody) {
    renderMensajes();
  }

  if (categoryForm) {
    categoryForm.addEventListener('submit', handleCategorySubmit);
    fillEventCategorySelect();
  }

  if (eventForm) {
    eventForm.addEventListener('submit', handleEventSubmit);
    fillEventCategorySelect();
  }

  updateDashboard();

  document.getElementById('export-json')?.addEventListener('click', exportJSON);

  if (liveTime) {
    updateLiveTime();
    setInterval(updateLiveTime, 1000);
  }
}

function initAdminApp() {
  if (isLoginPage()) {
    initLoginPage();
    return;
  }

  if (isSpaPage()) {
    initSpaPage();
    return;
  }

  initStandalonePage();
}

document.addEventListener('DOMContentLoaded', initAdminApp);
