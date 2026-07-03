// main.js
const eventsContainer = document.getElementById('events');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const countryFilter = document.getElementById('country-filter');
const cityFilter = document.getElementById('city-filter');

function formatPrice(value) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(value);
}

function getUniqueCities(eventos) {
  return [...new Set(eventos.map(evento => evento.ciudad))].sort();
}

function getCategorias() {
  return loadCategorias() || [];
}

function getEventos() {
  return loadEventos() || [];
}

function renderSelectOptions(select, values, defaultLabel) {
  if (!select) return;
  select.innerHTML = `<option value="">${defaultLabel}</option>`;
  values.forEach(value => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

function renderFilters() {
  const categorias = getCategorias();
  renderSelectOptions(categoryFilter, categorias.map(c => c.nombre), 'Todas');

  const paises = loadPaises() || [];
  if (countryFilter) {
    countryFilter.innerHTML = '<option value="">Todos</option>';
    paises.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = p.nombre;
      countryFilter.appendChild(opt);
    });
  }

  const ciudades = getUniqueCities(getEventos());
  renderSelectOptions(cityFilter, ciudades, 'Todas');
}

function filterEventos() {
  const eventos = getEventos();
  const search = searchInput?.value.trim().toLowerCase() || '';
  const category = categoryFilter?.value || '';
  const country = countryFilter?.value || '';
  const city = cityFilter?.value || '';

  return eventos.filter(evento => {
    const matchesSearch = evento.nombre.toLowerCase().includes(search);
    const matchesCategory = category ? getCategorias().find(cat => cat.id === Number(evento.categoriaId))?.nombre === category : true;
    const matchesCountry = country ? Number(evento.paisId) === Number(country) : true;
    const matchesCity = city ? evento.ciudad === city : true;
    return matchesSearch && matchesCategory && matchesCountry && matchesCity;
  });
}

function renderEvents(eventos) {
  if (!eventsContainer) return;
  eventsContainer.innerHTML = '';

  if (!eventos.length) {
    eventsContainer.innerHTML = '<p class="empty-results">No se encontraron eventos.</p>';
    return;
  }

  eventos.forEach(evento => {
    const card = document.createElement('evento-card');
    card.setAttribute('data-id', evento.id);
    card.setAttribute('nombre', evento.nombre);
    card.setAttribute('ciudad', evento.ciudad);
    card.setAttribute('fecha', evento.fecha);
    card.setAttribute('hora', evento.hora);
    card.setAttribute('precio', formatPrice(evento.precio));
    card.setAttribute('imagen', evento.imagen);
    card.setAttribute('categoria', getCategorias().find(c => c.id === Number(evento.categoriaId))?.nombre || 'General');
    card.setAttribute('descripcion', evento.descripcion);
    eventsContainer.appendChild(card);
  });
}

function handleAddToCart(event) {
  const payload = event.detail;
  if (!payload || !payload.id) return;

  const evento = getEventos().find(item => Number(item.id) === Number(payload.id));
  if (!evento) return;

  addToCart(evento);
}

function applyFilters() {
  renderFilters();
  const filteredEventos = filterEventos();
  renderEvents(filteredEventos);
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  const msg = document.getElementById('contact-message');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    if (typeof guardarContacto === 'function') {
      guardarContacto(data);
    }
    form.reset();
    msg.textContent = 'Mensaje enviado con exito. Te contactaremos pronto.';
    msg.classList.remove('hidden');
    setTimeout(() => msg.classList.add('hidden'), 4000);
  });
}

function onCountryChange() {
  const countryId = countryFilter?.value;
  const eventos = getEventos();
  let ciudades;
  if (countryId) {
    const pais = (loadPaises() || []).find(p => Number(p.id) === Number(countryId));
    ciudades = pais ? pais.ciudades.filter(c => eventos.some(e => e.ciudad === c)).sort() : [];
  } else {
    ciudades = getUniqueCities(eventos);
  }
  renderSelectOptions(cityFilter, ciudades, 'Todas');
  applyFilters();
}

function initPublicView() {
  renderFilters();
  renderEvents(getEventos());
  eventsContainer?.addEventListener('add-to-cart', handleAddToCart);
  searchInput?.addEventListener('input', applyFilters);
  categoryFilter?.addEventListener('change', applyFilters);
  countryFilter?.addEventListener('change', onCountryChange);
  cityFilter?.addEventListener('change', applyFilters);
  if (typeof initCartModule === 'function') {
    initCartModule();
  }
  initContactForm();
}

document.addEventListener('DOMContentLoaded', initPublicView);


