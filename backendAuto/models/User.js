const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nom:        { type: String, required: true },
  email:      { type: String, required: true, unique: true },
  motdepasse: { type: String, required: true },
  Nomgarage:  { type: String, required: false  }, // facultatif, utilisé si role = garagiste
   role: { type: String, enum: ['client', 'garagiste'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);