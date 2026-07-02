// components.js
class EventoCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const id = this.getAttribute('data-id');
    const nombre = this.getAttribute('nombre') || '';
    const ciudad = this.getAttribute('ciudad') || '';
    const fecha = this.getAttribute('fecha') || '';
    const hora = this.getAttribute('hora') || '';
    const precio = this.getAttribute('precio') || '0';
    const imagen = this.getAttribute('imagen') || '';
    const categoria = this.getAttribute('categoria') || '';
    const descripcion = this.getAttribute('descripcion') || '';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          border-radius: 1.25rem;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        :host(:hover) {
          transform: translateY(-4px);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.18);
        }

        .card-image {
          width: 100%;
          min-height: 180px;
          object-fit: cover;
          display: block;
        }

        .card-body {
          padding: 1.2rem;
          display: grid;
          gap: 0.75rem;
        }

        .meta {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.72);
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .categoria {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #f7d85d;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        h3 {
          margin: 0;
          font-size: 1.2rem;
          color: #fff;
        }

        p {
          margin: 0;
          color: rgba(255, 255, 255, 0.78);
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .price {
          color: #f7d34e;
          font-weight: 700;
        }

        .actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .add-button {
          width: 100%;
          border: none;
          border-radius: 0.95rem;
          padding: 0.95rem 1rem;
          background: #f7d34e;
          color: #240b00;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .add-button:hover {
          transform: translateY(-1px);
        }
      </style>
      <img class="card-image" src="${imagen}" alt="${nombre}" />
      <div class="card-body">
        <div class="categoria">${categoria}</div>
        <h3>${nombre}</h3>
        <p>${descripcion}</p>
        <div class="meta">
          <span>${fecha} · ${hora}</span>
          <span class="price">${precio}</span>
        </div>
        <div class="actions">
          <button class="add-button" type="button">Agregar al carrito</button>
        </div>
      </div>
    `;

    this.shadowRoot.querySelector('.add-button')?.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('add-to-cart', {
        detail: { id },
        bubbles: true,
        composed: true
      }));
    });
  }
}

customElements.define('evento-card', EventoCard);
