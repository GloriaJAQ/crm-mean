const { Schema, model } = require('mongoose');
const s = new Schema({
  cliente:  { type: String, required: true },
  problema: { type: String, required: true },
  estado:   { type: String, enum: ['abierto','en proceso','cerrado'], default: 'abierto' }
}, { timestamps: true });
module.exports = model('Ticket', s);
