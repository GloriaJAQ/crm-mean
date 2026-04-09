const { Schema, model } = require('mongoose');
const s = new Schema({
  nombre:   { type: String, required: true },
  empresa:  String,
  telefono: String,
  correo:   String
}, { timestamps: true });
module.exports = model('Cliente', s);
