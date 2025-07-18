const express = require('express');
const router = express.Router();
const db = require('../models/connection');
const verificarToken = require('../middlewares/auth');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    cb(null, Date.now() + '.' + ext);
  }
});

const upload = multer({ storage });

// GET /dashboard → protegido
router.get('/', verificarToken, (req, res) => {
  const query = 'SELECT * FROM motos';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener motos:', err);
      return res.status(500).json({ error: 'Error del servidor' });
    }

    res.json(results);
  });
});

// CREAR moto
// POST / → crear moto con imagen
router.post('/', verificarToken, upload.single('imagen'), (req, res) => {
  const { nombre, precio, anio } = req.body;
  const imagen = req.file ? req.file.filename : null;

  const query = 'INSERT INTO motos (nombre, precio, anio, imagen) VALUES (?, ?, ?, ?)';
  db.query(query, [nombre, precio, anio, imagen], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al crear moto' });
    res.json({ mensaje: 'Moto creada', id: result.insertId });
  });
});

// ACTUALIZAR moto
// ACTUALIZAR moto (con soporte para imagen)
router.put('/:id', verificarToken, upload.single('imagen'), (req, res) => {
  const { nombre, precio, anio } = req.body;
  const { id } = req.params;
  const imagen = req.file ? req.file.filename : null; // Nueva imagen (si existe)

  let query;
  let params;

  // Si hay nueva imagen, actualiza todos los campos incluyendo la imagen
  if (imagen) {
    query = 'UPDATE motos SET nombre = ?, precio = ?, anio = ?, imagen = ? WHERE id = ?';
    params = [nombre, precio, anio, imagen, id];
  } 
  // Si no hay nueva imagen, actualiza solo los campos básicos (mantiene la imagen anterior)
  else {
    query = 'UPDATE motos SET nombre = ?, precio = ?, anio = ? WHERE id = ?';
    params = [nombre, precio, anio, id];
  }

  db.query(query, params, (err) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar moto' });
    res.json({ mensaje: 'Moto actualizada' });
  });
});

// BORRAR moto
router.delete('/:id', verificarToken, (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM motos WHERE id = ?';

  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar moto' });
    res.json({ mensaje: 'Moto eliminada' });
  });
});

module.exports = router;
