// Componentes reutilizables
function createButton(text, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = text;
  button.addEventListener("click", onClick);
  return button;
}

function createCard(title, subtitle, content) {
  const card = document.createElement("article");
  card.className = "event-card";
  card.innerHTML = `
    <h4>${title}</h4>
    <p>${subtitle}</p>
    <p>${content}</p>
  `;
  return card;
}
