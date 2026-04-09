const { Schema, model } = require('mongoose');
const s = new Schema({
  tipo:        { type: String, required: true },
  descripcion: String,
  responsable: String
}, { timestamps: true });
module.exports = model('Actividad', s);
