// Script para la página de administración
const souls = [
  { subject: 'V. Dust', id: '#000-666-81', sin: 'Lust & Gluttony', tier: 'Overlord Class', status: 'Damned (Active)' },
  { subject: 'A. Morningside', id: '#000-777-12', sin: 'Pride (Max)', tier: 'Elite Circle', status: 'Purged (Stasis)' },
  { subject: 'N. Serpent', id: '#000-888-09', sin: 'Envy', tier: 'General Admission', status: 'Pending Judgment' }
];

function createStatusPill(text, type = 'secondary') {
  const span = document.createElement('span');
  span.className = `status-pill ${type}`;
  const dot = document.createElement('span');
  dot.className = 'status-dot';
  span.appendChild(dot);
  span.append(text);
  return span;
}

function renderSoulTable() {
  const body = document.getElementById('soul-table-body');
  if (!body) return;
  body.innerHTML = '';

  souls.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <strong>${item.subject}</strong><br>
        <small>${item.id}</small>
      </td>
      <td><span class="pill-secondary">${item.sin}</span></td>
      <td>${item.tier}</td>
      <td><span class="status-pill status-active">${item.status}</span></td>
      <td><button class="icon-button">✏️</button></td>
    `;
    body.appendChild(row);
  });
}

document.addEventListener('DOMContentLoaded', renderSoulTable);
