const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/connection');

// Registro
router.post('/register', async (req, res) => {
  const { nombre, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = 'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)';
  db.query(query, [nombre, email, hashedPassword], (err, result) => {
    if (err) {
      console.error('Error en registro:', err);
      return res.status(500).json({ error: 'Error al registrar usuario' });
    }
    res.json({ mensaje: 'Usuario registrado con éxito' });
  });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }

    const usuario = results[0];
    const validPassword = await bcrypt.compare(password, usuario.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, 'secreto_jwt', { expiresIn: '1h' });

    res.json({ mensaje: 'Login exitoso', token });
  });
});

module.exports = router;
