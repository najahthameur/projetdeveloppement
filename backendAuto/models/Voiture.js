const mongoose = require('mongoose');

const voitureSchema = new mongoose.Schema({
  marque: String,
  modele: String,
  matricule: {
    type: String,
    required: true,
    unique: true // 🔥 éviter doublon
  },

  etat: {
    type: String,
    enum: ['en cours', 'terminé', 'en attente'],
    default: 'en attente'
  },
  // ✅ ajout CIN
  cin: {
    type: String,
    required: true
  },

  diagnostic: {
    type: String,
    default: ''
  },

  // 🔗 relation client

  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
        required: true

  },
    // 🔗 relation garagiste

  garage: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User', // garagiste
  required: true
}
});

module.exports = mongoose.model('Voiture', voitureSchema);