const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  cin: { type: String, required: true,unique: true // 🔥 éviter doublon 
  },
  nom: { type: String, required: true },
  prenom: String,
  email: String,
  telephone: String,
  adresse: String,
  motdepasse: String,
   garage: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User', // 🔥 garagiste
  required: true
},
  voitures: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Voiture'
    }
  ]

  
});

module.exports = mongoose.model('Client', clientSchema);