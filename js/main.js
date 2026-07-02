// Script principal para la vista pública
const eventsContainer = document.getElementById("events");

function renderEvents(events) {
  if (!eventsContainer) return;
  eventsContainer.innerHTML = "";

  events.forEach(event => {
    const card = document.createElement("article");
    card.className = "event-card";
    card.innerHTML = `
      <h4>${event.title}</h4>
      <p>${event.date} · ${event.location}</p>
      <p>${event.description}</p>
    `;
    eventsContainer.appendChild(card);
  });
}

function initPublicView() {
  const events = loadEvents() || [];
  renderEvents(events);
}

document.addEventListener("DOMContentLoaded", initPublicView);
