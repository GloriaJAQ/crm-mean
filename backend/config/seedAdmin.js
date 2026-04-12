const bcrypt = require('bcryptjs');
const User   = require('../models/User');

module.exports = async () => {
  const existe = await User.findOne({ rol: 'admin' });
  if (!existe) {
    await User.create({
      nombre:   'Administrador',
      email:    'admin@crm.com',
      password: await bcrypt.hash('Admin123*', 10),
      rol:      'admin',
      estado:   true
    });
    console.log('✅ Admin por defecto creado: admin@crm.com / Admin123*');
  }
};
