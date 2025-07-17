const express = require('express');
const router = express.Router();
const db = require('../models/connection');
const verificarToken = require('../middlewares/auth');

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

module.exports = router;
