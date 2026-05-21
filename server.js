const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors()); 
app.use(express.json());

// ==========================================
// CONEXIÓN A MYSQL (phpMyAdmin)
// ==========================================
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',      // Usuario por defecto en XAMPP
  password: '',      // Contraseña vacía por defecto
  database: 'proyectofinal' // El nombre de la base de datos que creaste
});

// Probar conexión al iniciar
db.getConnection()
  .then(() => console.log('✅ Base de datos MySQL conectada correctamente'))
  .catch(err => console.error('❌ Error de conexión a MySQL:', err));


// ==========================================
// RUTAS API PARA PRODUCTOS (Tu Parte)
// ==========================================

// GET: Obtener todos los productos
app.get('/api/productos', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM productos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// POST: Crear un nuevo producto
app.post('/api/productos', async (req, res) => {
  try {
    const { nombre, categoria, precio, stock, descripcion } = req.body;
    const [result] = await db.query(
      'INSERT INTO productos (nombre, categoria, precio, stock, descripcion) VALUES (?, ?, ?, ?, ?)',
      [nombre, categoria, precio, stock, descripcion]
    );
    // Devolvemos el producto recién creado
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
});

// PUT: Actualizar un producto existente
app.put('/api/productos/:id', async (req, res) => {
  try {
    const { nombre, categoria, precio, stock, descripcion } = req.body;
    await db.query(
      'UPDATE productos SET nombre=?, categoria=?, precio=?, stock=?, descripcion=? WHERE id=?',
      [nombre, categoria, precio, stock, descripcion, req.params.id]
    );
    res.json({ message: 'Producto actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

// DELETE: Eliminar un producto
app.delete('/api/productos/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM productos WHERE id = ?', [req.params.id]);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

// ==========================================
// RUTAS API PARA CATEGORÍAS Y PROVEEDORES
// (Aquí trabajará la Persona 2)
// ==========================================

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor Express corriendo en http://localhost:${PORT}`);
});