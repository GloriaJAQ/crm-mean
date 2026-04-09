require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const seedAdmin = require('./config/seedAdmin');

const PORT = process.env.PORT || 3000;

connectDB().then(async () => {
  await seedAdmin();
  if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`✅ Servidor corriendo en http://localhost:${PORT}`));
  }
});

module.exports = app;
