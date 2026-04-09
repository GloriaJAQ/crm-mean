// Uso: roles('admin') o roles('user','admin')
module.exports = (...rolesPermitidos) => (req, res, next) => {
  if (!rolesPermitidos.includes(req.user.rol))
    return res.status(403).json({ msg: `Acceso denegado. Rol requerido: ${rolesPermitidos.join(' o ')}` });
  next();
};
