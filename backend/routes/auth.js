const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');

//Registro
router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;
    if (!nombre || !email || !password)
      return res.status(400).json({ msg: 'Nombre, email y password son obligatorios' });
    const existe = await User.findOne({ email });
    if (existe) return res.status(400).json({ msg: 'El email ya está registrado' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ nombre, email, password: hash, rol: rol || 'user' });
    res.status(201).json({ msg: 'Usuario creado', id: user._id });
  } catch (e) { res.status(500).json({ msg: e.message }); }
});

//Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: 'Email y password requeridos' });
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ msg: 'Credenciales inválidas' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ msg: 'Credenciales inválidas' });
    const token = jwt.sign(
      { id: user._id, nombre: user.nombre, email: user.email, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    res.json({ token, rol: user.rol, nombre: user.nombre, email: user.email });
  } catch (e) { res.status(500).json({ msg: e.message }); }
});

module.exports = router;
