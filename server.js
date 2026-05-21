const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Configuración de Middlewares
app.use(cors()); // Permite que el frontend (HTML) se comunique con esta API
app.use(express.json()); // Permite recibir datos en formato JSON

// ==========================================
// DATOS EN MEMORIA (In-Memory Storage)
// ==========================================
// Tu arreglo de productos original
let productos = [
  {id:1, nombre:'Tarta Fraisier', categoria:'Tartas', precio:28000, stock:12, descripcion:'Mousse vainilla con fresas frescas'},
  {id:2, nombre:'Croissant de mantequilla', categoria:'Panadería', precio:4500, stock:40, descripcion:'Hojaldrado francés clásico'},
  {id:3, nombre:'Macaron Rose', categoria:'Petit fours', precio:3800, stock:8, descripcion:'Relleno de ganache de rosas'},
  {id:4, nombre:'Éclair de chocolate', categoria:'Petit fours', precio:6500, stock:20, descripcion:'Pasta choux con crema de cacao'},
  {id:5, nombre:'Cheesecake de frutos rojos', categoria:'Tartas', precio:32000, stock:5, descripcion:'Base de galleta, queso crema y coulis'},
  {id:6, nombre:'Financier de almendra', categoria:'Petit fours', precio:3200, stock:0, descripcion:'Bizcocho francés con mantequilla noisette'},
];
let nextIdProductos = 7;

// (Persona 2: Aquí crearás los arreglos de let categorias = []; y let proveedores = [];)

// ==========================================
// RUTAS API PARA PRODUCTOS (Tu Parte)
// ==========================================

// GET: Obtener todos los productos
app.get('/api/productos', (req, res) => {
  res.json(productos);
});

// POST: Crear un nuevo producto
app.post('/api/productos', (req, res) => {
  const nuevoProducto = {
    id: nextIdProductos++,
    nombre: req.body.nombre,
    categoria: req.body.categoria,
    precio: req.body.precio,
    stock: req.body.stock,
    descripcion: req.body.descripcion
  };
  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto); // 201 significa "Creado"
});

// PUT: Actualizar un producto existente
app.put('/api/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = productos.findIndex(p => p.id === id);

  if (index !== -1) {
    productos[index] = { ...productos[index], ...req.body, id };
    res.json(productos[index]);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// DELETE: Eliminar un producto
app.delete('/api/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  productos = productos.filter(p => p.id !== id);
  res.json({ message: 'Producto eliminado' });
});

// ==========================================
// RUTAS API PARA CATEGORÍAS Y PROVEEDORES (Persona 2)
// (Persona 2: Aquí crearás tus rutas app.get('/api/categorias', ...), etc.)
// ==========================================

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});