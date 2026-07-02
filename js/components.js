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
          border-radius: 1rem;
          overflow: hidden;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        :host(:hover) {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(15, 23, 42, 0.12);
        }

        .card-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
        }

        .card-body {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .categoria {
          font-size: 0.75rem;
          font-weight: 600;
          color: #6366f1;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        h3 {
          margin: 0;
          font-size: 1.2rem;
          color: #1f2937;
          line-height: 1.3;
        }

        p {
          margin: 0;
          color: #6b7280;
          font-size: 0.9rem;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .meta {
          font-size: 0.85rem;
          color: #6b7280;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          padding: 0.5rem 0;
          border-top: 1px solid #f3f4f6;
          margin-top: 0.25rem;
        }

        .price {
          color: #059669;
          font-weight: 700;
          font-size: 1.1rem;
        }

        .actions {
          display: flex;
        }

        .add-button {
          width: 100%;
          border: none;
          border-radius: 0.6rem;
          padding: 0.75rem 1rem;
          background: #6366f1;
          color: #ffffff;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .add-button:hover {
          background: #4f46e5;
        }

        .add-button:active {
          transform: scale(0.98);
        }
      </style>
      <img class="card-image" src="${imagen}" alt="${nombre}" loading="lazy" />
      <div class="card-body">
        <div class="categoria">${categoria}</div>
        <h3>${nombre}</h3>
        <p>${descripcion}</p>
        <div class="meta">
          <span>${fecha} · ${hora} · ${ciudad}</span>
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
