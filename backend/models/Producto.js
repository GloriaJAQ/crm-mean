const { Schema, model } = require('mongoose');
const s = new Schema({
  nombre:      { type: String, required: true },
  precio:      { type: Number, required: true },
  descripcion: String
}, { timestamps: true });
module.exports = model('Producto', s);
