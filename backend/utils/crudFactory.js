const auth  = require('../middlewares/auth');
const roles = require('../middlewares/roles');

/**
 * Generamos las 5 rutas CRUD protegidas para cualquier modelo de Mongoose.
 * guest  → solo GET
 * user   → GET + POST + PUT
 * admin  → todo (incluido DELETE)
 */
module.exports = (router, Model) => {

  // GET todos — cualquier usuario autenticado
  router.get('/', auth, async (req, res) => {
    try {
      const q    = req.query.q || '';
      const data = q
        ? await Model.find({ $or: Object.keys(Model.schema.paths)
            .filter(k => !['_id','__v','password'].includes(k))
            .map(k => ({ [k]: { $regex: q, $options: 'i' } })) })
        : await Model.find().sort({ createdAt: -1 });
      res.json(data);
    } catch (e) { res.status(500).json({ msg: e.message }); }
  });

  //GET uno por id
  router.get('/:id', auth, async (req, res) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ msg: 'No encontrado' });
      res.json(item);
    } catch (e) { res.status(500).json({ msg: e.message }); }
  });

  // POST crear — user y admin
  router.post('/', auth, roles('user','admin'), async (req, res) => {
    try {
      const item = await Model.create(req.body);
      res.status(201).json(item);
    } catch (e) { res.status(400).json({ msg: e.message }); }
  });

  //PUT editar — user y admin
  router.put('/:id', auth, roles('user','admin'), async (req, res) => {
    try {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!item) return res.status(404).json({ msg: 'No encontrado' });
      res.json(item);
    } catch (e) { res.status(400).json({ msg: e.message }); }
  });

  //DELETE — solo admin
  router.delete('/:id', auth, roles('admin'), async (req, res) => {
    try {
      await Model.findByIdAndDelete(req.params.id);
      res.json({ msg: 'Eliminado correctamente' });
    } catch (e) { res.status(500).json({ msg: e.message }); }
  });

  return router;
};
