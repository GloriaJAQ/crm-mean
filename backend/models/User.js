const { Schema, model } = require('mongoose');
const s = new Schema({
  nombre:   { type: String, required: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  rol:      { type: String, enum: ['admin','user','guest'], default: 'user' },
  estado:   { type: Boolean, default: true }
}, { timestamps: true });
module.exports = model('User', s);
