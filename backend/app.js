require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const app     = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api/auth',           require('./routes/auth'));
app.use('/api/users',          require('./routes/users'));
app.use('/api/clientes',       require('./routes/clientes'));
app.use('/api/productos',      require('./routes/productos'));
app.use('/api/ventas',         require('./routes/ventas'));
app.use('/api/actividades',    require('./routes/actividades'));
app.use('/api/tickets',        require('./routes/tickets'));
app.use('/api/notificaciones', require('./routes/notificaciones'));

app.get('/', (req, res) => res.json({ msg: 'CRM API funcionando ✅' }));

module.exports = app;
