// data-seed.js
const initialCategories = [
  { id: Date.now() + 1, nombre: 'Rock', descripcion: 'Conciertos de rock y metal' },
  { id: Date.now() + 2, nombre: 'Electrónica', descripcion: 'Eventos con DJs y música electrónica' },
  { id: Date.now() + 3, nombre: 'Pop', descripcion: 'Conciertos comerciales y festivales pop' },
  { id: Date.now() + 4, nombre: 'Jazz', descripcion: 'Música jazz y blues en vivo' },
  { id: Date.now() + 5, nombre: 'Clásica', descripcion: 'Conciertos de música clásica y orquestal' },
  { id: Date.now() + 6, nombre: 'Reguetón', descripcion: 'Artistas de reguetón y trap latino' },
  { id: Date.now() + 7, nombre: 'Salsa', descripcion: 'Salsa, bachata y ritmos caribeños' },
  { id: Date.now() + 8, nombre: 'Indie', descripcion: 'Bandas independientes y alternativas' },
  { id: Date.now() + 9, nombre: 'Festival', descripcion: 'Festivales multigénero al aire libre' }
];

function ensureSeedData() {
  const categorias = loadCategorias();
  if (!categorias.length) {
    saveCategorias(initialCategories);
  }

  const eventos = loadEventos();
  if (!eventos.length) {
    const storedCategorias = loadCategorias();
    const seedEvents = [
      {
        id: Date.now() + 11,
        codigo: 'EVT001',
        nombre: 'Infernal Rock Night',
        categoriaId: storedCategorias[0]?.id || initialCategories[0].id,
        precio: 120000,
        fecha: '2026-11-10',
        hora: '20:00',
        ciudad: 'Bogotá',
        imagen: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?fit=crop&w=800&q=80',
        descripcion: 'Una noche de rock con bandas nacionales y sonido potente.'
      },
      {
        id: Date.now() + 12,
        codigo: 'EVT002',
        nombre: 'Electro Vibes',
        categoriaId: storedCategorias[1]?.id || initialCategories[1].id,
        precio: 95000,
        fecha: '2026-12-05',
        hora: '22:00',
        ciudad: 'Medellín',
        imagen: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?fit=crop&w=800&q=80',
        descripcion: 'Festival con DJs, luces láser y ambiente nocturno.'
      },
      {
        id: Date.now() + 13,
        codigo: 'EVT003',
        nombre: 'Pop Dreams',
        categoriaId: storedCategorias[2]?.id || initialCategories[2].id,
        precio: 108000,
        fecha: '2026-10-18',
        hora: '19:30',
        ciudad: 'Cali',
        imagen: 'https://images.unsplash.com/photo-1512362856338-5405fbe5e443?fit=crop&w=800&q=80',
        descripcion: 'Un show pop con artistas emergentes y sonidos energéticos.'
      }
    ];
    saveEventos(seedEvents);
  }

  if (!loadCarrito().length) {
    saveCarrito([]);
  }

  if (!loadVentas().length) {
    saveVentas([]);
  }
}

ensureSeedData();
