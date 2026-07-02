// Datos iniciales de ejemplo
const seedEvents = [
  {
    id: 1,
    title: "Concierto de rock",
    date: "20 de julio",
    location: "Teatro Central",
    description: "Una noche de rock con bandas locales y sonidos enérgicos."
  },
  {
    id: 2,
    title: "Noche electro",
    date: "28 de julio",
    location: "Plaza del Arte",
    description: "Luz, ritmo y electrónica para un público vibrante."
  }
];

if (!loadEvents()) {
  saveEvents(seedEvents);
}
