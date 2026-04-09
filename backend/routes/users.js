const router = require('express').Router();
const bcrypt = require('bcryptjs');
const auth   = require('../middlewares/auth');
const roles  = require('../middlewares/roles');
const User   = require('../models/User');

router.get('/', auth, async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json(users);
});

router.post('/', auth, roles('admin'), async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ nombre, email, password: hash, rol });
    res.status(201).json({ msg: 'Usuario creado', id: user._id });
  } catch (e) { res.status(400).json({ msg: e.message }); }
});

router.put('/:id', auth, roles('admin'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.password) data.password = await bcrypt.hash(data.password, 10);
    const user = await User.findByIdAndUpdate(req.params.id, data, { new: true }).select('-password');
    res.json(user);
  } catch (e) { res.status(400).json({ msg: e.message }); }
});

router.delete('/:id', auth, roles('admin'), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Usuario eliminado' });
  } catch (e) { res.status(500).json({ msg: e.message }); }
});

module.exports = router;
