const { Schema, model } = require('mongoose');
const s = new Schema({
  mensaje: { type: String, required: true },
  usuario: String,
  fecha:   { type: Date, default: Date.now }
}, { timestamps: true });
module.exports = model('Notificacion', s);
