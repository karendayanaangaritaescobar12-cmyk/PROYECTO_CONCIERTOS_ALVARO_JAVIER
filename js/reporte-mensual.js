function initReporteMensual() {
  const reportYear = document.getElementById('report-year');
  const reportMonth = document.getElementById('report-month');
  const reportGenerate = document.getElementById('report-generate');
  if (!reportYear || !reportMonth) return;

  if (!reportYear.options.length) {
    const currentYear = new Date().getFullYear();
    for (let y = currentYear - 5; y <= currentYear + 2; y++) {
      const opt = document.createElement('option');
      opt.value = y;
      opt.textContent = y;
      if (y === currentYear) opt.selected = true;
      reportYear.appendChild(opt);
    }
  }

  if (!reportMonth.options.length) {
    const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    const currentMonth = new Date().getMonth();
    months.forEach((m, i) => {
      const opt = document.createElement('option');
      opt.value = i + 1;
      opt.textContent = m;
      if (i === currentMonth) opt.selected = true;
      reportMonth.appendChild(opt);
    });
  }

  reportGenerate.onclick = generateReport;
  generateReport();
}

function generateReport() {
  const year = Number(document.getElementById('report-year')?.value);
  const month = Number(document.getElementById('report-month')?.value);
  const reportBody = document.getElementById('report-body');
  const reportGeneralTotal = document.getElementById('report-general-total');
  const reportEmpty = document.getElementById('report-empty');
  const ventas = (typeof loadVentas === 'function' ? loadVentas() : []) || [];

  const filtered = ventas.filter(v => {
    const d = new Date(v.fecha);
    return d.getFullYear() === year && (d.getMonth() + 1) === month;
  });

  const grupos = {};
  filtered.forEach(v => {
    (v.items || []).forEach(item => {
      const codigo = item.codigo || 'SIN-CODIGO';
      if (!grupos[codigo]) grupos[codigo] = { nombre: item.nombre || 'Desconocido', cantidad: 0, total: 0 };
      grupos[codigo].cantidad += 1;
      grupos[codigo].total += Number(item.precio) || 0;
    });
  });

  const entries = Object.entries(grupos);
  if (!reportBody) return;
  
  if (!entries.length) {
    reportBody.innerHTML = '';
    if (reportGeneralTotal) reportGeneralTotal.textContent = '$0';
    if (reportEmpty) reportEmpty.classList.remove('hidden');
    return;
  }

  if (reportEmpty) reportEmpty.classList.add('hidden');

  let generalTotal = 0;
  reportBody.innerHTML = entries.map(([codigo, g]) => {
    generalTotal += g.total;
    return `<tr><td>${codigo}</td><td>${g.nombre}</td><td>${g.cantidad}</td><td>$${g.total}</td></tr>`;
  }).join('');

  if (reportGeneralTotal) reportGeneralTotal.textContent = `$${generalTotal}`;
}

document.addEventListener('DOMContentLoaded', initReporteMensual);
