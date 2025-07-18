const express = require('express');
const app = express();
const port = 3000;
const authRoutes = require('./api/routes/auth');
const dashboardRoutes = require('./api/routes/admin');
const publicRoutes = require('./api/routes/public');
const cors = require('cors');

app.use(express.json());

app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/public', publicRoutes);

app.use('/uploads', express.static('uploads'));


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
