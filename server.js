const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'proyectofinal',
  port: 3307
});

db.getConnection()
  .then(() => {
    console.log('✅ Base de datos MySQL conectada correctamente');
  })
  .catch(err => {
    console.error('❌ Error de conexión a MySQL:', err);
  });

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api/productos', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM productos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener productos'
    });
  }
});

app.post('/api/productos', async (req, res) => {
  try {

    const {
      nombre,
      categoria,
      precio,
      stock,
      descripcion
    } = req.body;

    const [result] = await db.query(
      'INSERT INTO productos (nombre, categoria, precio, stock, descripcion) VALUES (?, ?, ?, ?, ?)',
      [nombre, categoria, precio, stock, descripcion]
    );

    res.status(201).json({
      id: result.insertId,
      ...req.body
    });

  } catch (error) {

    res.status(500).json({
      error: 'Error al crear producto'
    });

  }
});

app.put('/api/productos/:id', async (req, res) => {
  try {

    const {
      nombre,
      categoria,
      precio,
      stock,
      descripcion
    } = req.body;

    await db.query(
      'UPDATE productos SET nombre=?, categoria=?, precio=?, stock=?, descripcion=? WHERE id=?',
      [nombre, categoria, precio, stock, descripcion, req.params.id]
    );

    res.json({
      message: 'Producto actualizado'
    });

  } catch (error) {

    res.status(500).json({
      error: 'Error al actualizar producto'
    });

  }
});

app.delete('/api/productos/:id', async (req, res) => {
  try {

    await db.query(
      'DELETE FROM productos WHERE id=?',
      [req.params.id]
    );

    res.json({
      message: 'Producto eliminado'
    });

  } catch (error) {

    res.status(500).json({
      error: 'Error al eliminar producto'
    });

  }
});

app.get('/api/categorias', async (req, res) => {
  try {

    const [rows] = await db.query('SELECT * FROM categorias');

    res.json(rows);

  } catch (error) {

    res.status(500).json({
      error: 'Error al obtener categorías'
    });

  }
});

app.post('/api/categorias', async (req, res) => {
  try {

    const {
      nombre,
      descripcion,
      estado
    } = req.body;

    const [result] = await db.query(
      'INSERT INTO categorias (nombre, descripcion, estado) VALUES (?, ?, ?)',
      [nombre, descripcion, estado]
    );

    res.status(201).json({
      id: result.insertId,
      ...req.body
    });

  } catch (error) {

    res.status(500).json({
      error: 'Error al crear categoría'
    });

  }
});

app.put('/api/categorias/:id', async (req, res) => {
  try {

    const {
      nombre,
      descripcion,
      estado
    } = req.body;

    await db.query(
      'UPDATE categorias SET nombre=?, descripcion=?, estado=? WHERE id=?',
      [nombre, descripcion, estado, req.params.id]
    );

    res.json({
      message: 'Categoría actualizada'
    });

  } catch (error) {

    res.status(500).json({
      error: 'Error al actualizar categoría'
    });

  }
});

app.delete('/api/categorias/:id', async (req, res) => {
  try {

    await db.query(
      'DELETE FROM categorias WHERE id=?',
      [req.params.id]
    );

    res.json({
      message: 'Categoría eliminada'
    });

  } catch (error) {

    res.status(500).json({
      error: 'Error al eliminar categoría'
    });

  }
});

app.get('/api/proveedores', async (req, res) => {
  try {

    const [rows] = await db.query('SELECT * FROM proveedores');

    res.json(rows);

  } catch (error) {

    res.status(500).json({
      error: 'Error al obtener proveedores'
    });

  }
});

app.post('/api/proveedores', async (req, res) => {
  try {

    const {
      nombre,
      contacto,
      email,
      producto
    } = req.body;

    const [result] = await db.query(
      'INSERT INTO proveedores (nombre, contacto, email, producto) VALUES (?, ?, ?, ?)',
      [nombre, contacto, email, producto]
    );

    res.status(201).json({
      id: result.insertId,
      ...req.body
    });

  } catch (error) {

    res.status(500).json({
      error: 'Error al crear proveedor'
    });

  }
});

app.put('/api/proveedores/:id', async (req, res) => {
  try {

    const {
      nombre,
      contacto,
      email,
      producto
    } = req.body;

    await db.query(
      'UPDATE proveedores SET nombre=?, contacto=?, email=?, producto=? WHERE id=?',
      [nombre, contacto, email, producto, req.params.id]
    );

    res.json({
      message: 'Proveedor actualizado'
    });

  } catch (error) {

    res.status(500).json({
      error: 'Error al actualizar proveedor'
    });

  }
});

app.delete('/api/proveedores/:id', async (req, res) => {
  try {

    await db.query(
      'DELETE FROM proveedores WHERE id=?',
      [req.params.id]
    );

    res.json({
      message: 'Proveedor eliminado'
    });

  } catch (error) {

    res.status(500).json({
      error: 'Error al eliminar proveedor'
    });

  }
});

app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});