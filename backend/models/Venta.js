const { Schema, model } = require('mongoose');
const s = new Schema({
  cliente: { type: String, required: true },
  usuario: String,
  fecha:   { type: Date, default: Date.now },
  total:   { type: Number, required: true }
}, { timestamps: true });
module.exports = model('Venta', s);
