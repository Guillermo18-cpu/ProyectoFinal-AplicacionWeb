const API_URL = 'http://localhost:3000/api';

let data = {
  productos: [],
  categorias: [],
  proveedores: []
};
let nextId = { categorias: 5, proveedores: 4 };
let activeTab = 'productos';
let editingId = null;

async function fetchProductos() {
  try {
    const res = await fetch(`${API_URL}/productos`);
    data.productos = await res.json();
  } catch (e) {
    console.error('Error al conectar con la base de datos:', e);
  }
}

async function fetchCategorias() {
  try {
    const res = await fetch(`${API_URL}/categorias`);
    data.categorias = await res.json();
  } catch (e) { console.error(e); }
}

async function fetchProveedores() {
  try {
    const res = await fetch(`${API_URL}/proveedores`);
    data.proveedores = await res.json();
  } catch (e) { console.error(e); }
}

async function initApp() {
  await fetchProductos();
  await fetchCategorias();
  await fetchProveedores();
  renderLanding();
}

function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sideOverlay').classList.add('show');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sideOverlay').classList.remove('show');
}
function openPanel(tab) {
  closeSidebar();
  activeTab = tab;
  document.getElementById('panel').classList.add('open');
  document.getElementById('panelOverlay').classList.add('show');
  document.getElementById('p-search').value = '';
  setActiveTab(tab);
  renderActive();
}
function closePanel() {
  document.getElementById('panel').classList.remove('open');
  document.getElementById('panelOverlay').classList.remove('show');
}
function switchTab(tab) {
  activeTab = tab;
  document.getElementById('p-search').value = '';
  setActiveTab(tab);
  renderActive();
}
function setActiveTab(tab) {
  document.getElementById('panel-section-name').textContent = cap(tab);
  document.querySelectorAll('.ptab').forEach(t => t.classList.remove('active'));
  const tabs = ['productos', 'categorias', 'proveedores'];
  document.querySelectorAll('.ptab')[tabs.indexOf(tab)].classList.add('active');

  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const idx = tabs.indexOf(tab);
  if (idx >= 0) document.querySelectorAll('.nav-item')[idx].classList.add('active');
}
function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1) }

function renderActive() {
  const q = document.getElementById('p-search').value.toLowerCase();
  const body = document.getElementById('panel-body');
  if (activeTab === 'productos') body.innerHTML = renderProductos(q);
  else if (activeTab === 'categorias') body.innerHTML = renderCategorias(q);
  else body.innerHTML = renderProveedores(q);
}

function stockBadge(s) {
  if (s === 0) return '<span class="p-badge pb-out">Sin stock</span>';
  if (s <= 10) return '<span class="p-badge pb-low">Bajo</span>';
  return '<span class="p-badge pb-ok">Disponible</span>';
}

function renderProductos(q) {
  const items = data.productos.filter(p =>
    p.nombre.toLowerCase().includes(q) || p.categoria.toLowerCase().includes(q)
  );
  const total = data.productos.length;
  const low = data.productos.filter(p => p.stock > 0 && p.stock <= 10).length;
  const out = data.productos.filter(p => p.stock === 0).length;
  let html = `<div class="p-metrics">
    <div class="p-metric"><div class="p-metric-label">Total</div><div class="p-metric-val">${total}</div></div>
    <div class="p-metric"><div class="p-metric-label">Stock bajo</div><div class="p-metric-val warn">${low}</div></div>
    <div class="p-metric"><div class="p-metric-label">Sin stock</div><div class="p-metric-val warn">${out}</div></div>
  </div>`;
  if (items.length === 0) return html + `<div class="p-empty" style="display:block"><i class="fa-regular fa-face-sad-tear"></i>Sin resultados</div>`;
  html += `<div class="p-table-wrap"><table class="pt"><thead><tr>
    <th>Producto</th><th>Categoría</th><th>Stock</th><th>Precio</th><th>Estado</th><th></th>
  </tr></thead><tbody>`;
  items.forEach(p => {
    html += `<tr>
      <td><div class="ptd-name">${p.nombre}</div><div class="ptd-sku">${p.descripcion}</div></td>
      <td>${p.categoria}</td>
      <td>${p.stock}</td>
      <td>$${p.precio.toLocaleString('es-CO')}</td>
      <td>${stockBadge(p.stock)}</td>
      <td><div class="p-actions">
        <button class="pibtn" onclick="editItem(${p.id})" title="Editar"><i class="fa-solid fa-pen"></i></button>
        <button class="pibtn del" onclick="deleteItem(${p.id})" title="Eliminar"><i class="fa-solid fa-trash"></i></button>
      </div></td>
    </tr>`;
  });
  return html + '</tbody></table></div>';
}

function renderCategorias(q) {
  const items = data.categorias.filter(c => c.nombre.toLowerCase().includes(q) || c.descripcion.toLowerCase().includes(q));
  if (items.length === 0) return `<div class="p-empty" style="display:block"><i class="fa-regular fa-face-sad-tear"></i>Sin resultados</div>`;
  let html = `<div class="p-table-wrap"><table class="pt"><thead><tr>
    <th>Nombre</th><th>Descripción</th><th>Estado</th><th></th>
  </tr></thead><tbody>`;
  items.forEach(c => {
    const bs = c.estado === 'Activa' ? 'pb-active' : 'pb-inactive';
    html += `<tr>
      <td class="ptd-name">${c.nombre}</td>
      <td style="color:var(--muted);font-size:12.5px">${c.descripcion}</td>
      <td><span class="p-badge ${bs}">${c.estado}</span></td>
      <td><div class="p-actions">
        <button class="pibtn" onclick="editItem(${c.id})" title="Editar"><i class="fa-solid fa-pen"></i></button>
        <button class="pibtn del" onclick="deleteItem(${c.id})" title="Eliminar"><i class="fa-solid fa-trash"></i></button>
      </div></td>
    </tr>`;
  });
  return html + '</tbody></table></div>';
}

function renderProveedores(q) {
  const items = data.proveedores.filter(p =>
    p.nombre.toLowerCase().includes(q) || p.contacto.toLowerCase().includes(q) || p.producto.toLowerCase().includes(q)
  );
  if (items.length === 0) return `<div class="p-empty" style="display:block"><i class="fa-regular fa-face-sad-tear"></i>Sin resultados</div>`;
  let html = `<div class="p-table-wrap"><table class="pt"><thead><tr>
    <th>Empresa</th><th>Contacto</th><th>Email</th><th>Producto</th><th></th>
  </tr></thead><tbody>`;
  items.forEach(p => {
    html += `<tr>
      <td class="ptd-name">${p.nombre}</td>
      <td>${p.contacto}</td>
      <td style="font-size:12px;color:var(--muted)">${p.email}</td>
      <td><span class="p-badge pb-ok">${p.producto}</span></td>
      <td><div class="p-actions">
        <button class="pibtn" onclick="editItem(${p.id})" title="Editar"><i class="fa-solid fa-pen"></i></button>
        <button class="pibtn del" onclick="deleteItem(${p.id})" title="Eliminar"><i class="fa-solid fa-trash"></i></button>
      </div></td>
    </tr>`;
  });
  return html + '</tbody></table></div>';
}

function openModal(id = null) {
  editingId = id;
  document.getElementById('modal-title').textContent = id ? 'Editar ' + cap(activeTab.slice(0, -1)) : 'Agregar ' + cap(activeTab.slice(0, -1));
  const form = document.getElementById('modal-form');
  let item = id ? data[activeTab].find(x => x.id === id) : null;

  if (activeTab === 'productos') {
    const cats = data.categorias.map(c => `<option ${item && item.categoria === c.nombre ? 'selected' : ''}>${c.nombre}</option>`).join('');
    form.innerHTML = `
    <div class="field"><label>Nombre</label><input id="f1" type="text" value="${item ? item.nombre : ''}" placeholder="Nombre del producto"></div>
    <div class="f2">
      <div class="field"><label>Categoría</label><select id="f2s">${cats}</select></div>
      <div class="field"><label>Precio ($)</label><input id="f3" type="number" min="0" value="${item ? item.precio : ''}" placeholder="0"></div>
    </div>
    <div class="f2">
      <div class="field"><label>Stock</label><input id="f4" type="number" min="0" value="${item ? item.stock : ''}" placeholder="0"></div>
    </div>
    <div class="field"><label>Descripción</label><textarea id="f5" placeholder="Descripción breve">${item ? item.descripcion : ''}</textarea></div>`;
  } else if (activeTab === 'categorias') {
    form.innerHTML = `
    <div class="field"><label>Nombre</label><input id="f1" type="text" value="${item ? item.nombre : ''}" placeholder="Nombre de la categoría"></div>
    <div class="field"><label>Descripción</label><textarea id="f5" placeholder="Descripción">${item ? item.descripcion : ''}</textarea></div>
    <div class="field"><label>Estado</label><select id="f2s"><option ${item && item.estado === 'Activa' ? 'selected' : ''}>Activa</option><option ${item && item.estado === 'Inactiva' ? 'selected' : ''}>Inactiva</option></select></div>`;
  } else {
    form.innerHTML = `
    <div class="field"><label>Empresa</label><input id="f1" type="text" value="${item ? item.nombre : ''}" placeholder="Nombre de la empresa"></div>
    <div class="f2">
      <div class="field"><label>Contacto</label><input id="f2t" type="text" value="${item ? item.contacto : ''}" placeholder="Nombre contacto"></div>
      <div class="field"><label>Email</label><input id="f3" type="email" value="${item ? item.email : ''}" placeholder="correo@empresa.com"></div>
    </div>
    <div class="field"><label>Producto / Servicio</label><input id="f5" type="text" value="${item ? item.producto : ''}" placeholder="¿Qué suministra?"></div>`;
  }

  document.getElementById('modalOverlay').classList.add('open');
  document.getElementById('f1').focus();
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  editingId = null;
}
function closeMOnBg(e) { if (e.target === document.getElementById('modalOverlay')) closeModal() }

async function saveItem() {
  const f1 = document.getElementById('f1')?.value.trim();
  if (!f1) { showToast('El nombre es requerido', true); return }

  if (activeTab === 'productos') {
    const obj = {
      nombre: f1,
      categoria: document.getElementById('f2s').value,
      precio: parseFloat(document.getElementById('f3').value) || 0,
      stock: parseInt(document.getElementById('f4').value) || 0,
      descripcion: document.getElementById('f5').value.trim()
    };

    try {
      if (editingId) {
        await fetch(`${API_URL}/productos/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(obj)
        });
      } else {
        await fetch(`${API_URL}/productos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(obj)
        });
      }
      await fetchProductos();
      closeModal();
      renderActive();
      renderLanding();
      showToast(editingId ? 'Actualizado correctamente' : 'Agregado correctamente');

    } catch (err) {
      console.error(err);
      showToast('Error de conexión a la BD', true);
    }

  } else if (activeTab === 'categorias') {
    const obj = {
      nombre: f1,
      descripcion: document.getElementById('f5').value.trim(),
      estado: document.getElementById('f2s').value
    };

    try {
      if (editingId) {
        await fetch(`${API_URL}/categorias/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(obj)
        });
      } else {
        await fetch(`${API_URL}/categorias`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(obj)
        });
      }
      await fetchCategorias();
      closeModal(); renderActive(); renderLanding();
      showToast(editingId ? 'Actualizado correctamente' : 'Agregado correctamente');
    } catch (err) { 
      showToast('Error en la BD', true); 
      console.error(err);
    }
  } else {
    const obj = {
      nombre: f1,
      contacto: document.getElementById('f2t').value.trim(),
      email: document.getElementById('f3').value.trim(),
      producto: document.getElementById('f5').value.trim()
    };

    try {
      if(editingId) {
        await fetch(`${API_URL}/proveedores/${editingId}`, {
          method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(obj)
        });
      } else {
        await fetch(`${API_URL}/proveedores`, {
          method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(obj)
        });
      }
      await fetchProveedores();
      closeModal(); renderActive(); renderLanding();
      showToast(editingId ? 'Actualizado correctamente' : 'Agregado correctamente');
    } catch(err) { 
      showToast('Error en la BD', true); 
      console.error(err);
    }
  }
}

function editItem(id) { openModal(id) }

async function deleteItem(id){
  if(!confirm('¿Eliminar este registro?'))return;

  try {
    if(activeTab === 'productos') {
      await fetch(`${API_URL}/productos/${id}`, { method: 'DELETE' });
      await fetchProductos();
    } else if (activeTab === 'categorias') {
      await fetch(`${API_URL}/categorias/${id}`, { method: 'DELETE' });
      await fetchCategorias();
    } else if (activeTab === 'proveedores') {
      await fetch(`${API_URL}/proveedores/${id}`, { method: 'DELETE' });
      await fetchProveedores();
    }
    renderActive();
    renderLanding();
    showToast('Eliminado', true);
  } catch(err) {
    showToast('Error al eliminar', true);
  }
}

function renderLanding() {
  const grid = document.getElementById('landing-products');
  const show = data.productos.slice(0, 3);
  grid.innerHTML = show.map(p => {
    const [, bc] = stockBadge(p.stock).match(/class="p-badge ([^"]+)"/);
    const label = p.stock === 0 ? 'Sin stock' : p.stock <= 10 ? 'Bajo stock' : 'Disponible';
    return `<div class="prod-card">
      <div class="prod-card-img"><i class="fa-solid fa-cake-candles"></i></div>
      <div class="prod-card-body">
        <div class="prod-card-name">${p.nombre}</div>
        <div class="prod-card-desc">${p.descripcion}</div>
        <div class="prod-card-footer">
          <div class="prod-card-price">$${p.precio.toLocaleString('es-CO')}</div>
          <span class="prod-card-badge ${bc === 'pb-ok' ? 'badge-avail' : bc === 'pb-low' ? 'badge-low' : 'badge-out'}">${label}</span>
        </div>
      </div>
    </div>`;
  }).join('');
}

function showToast(msg, isErr = false) {
  const t = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  document.getElementById('toast-dot').className = 'toast-dot' + (isErr ? ' err' : '');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

initApp();
 