const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'Acceso denegado. No hay token.' });

    try {
        const verificado = jwt.verify(token, 'secreto_jwt'); // cambia el secreto en producción
        req.usuario = verificado;
        next();
    } catch (err) {
        return res.status(400).json({ error: 'Token inválido' });
    }
};

module.exports = verificarToken;
