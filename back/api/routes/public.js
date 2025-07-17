const express = require('express');
const router = express.Router();
const db = require('../models/connection');

// GET /api/public/motos
router.get('/motos', (req, res) => {
  db.query('SELECT * FROM motos', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener las motos' });
    res.json(results);
  });
});

module.exports = router;
