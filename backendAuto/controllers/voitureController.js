const Voiture = require('../models/Voiture');
const Client = require('../models/Client');

// ➕ AJOUTER VOITURE
// exports.addVoiture = async (req, res) => {
//   try {
//     const voiture = new Voiture({
//       marque: req.body.marque,
//       modele: req.body.modele,
//       matricule: req.body.matricule,
//       etat: req.body.etat || 'en attente',
//       client: req.params.clientId
//     });

//     await voiture.save();

//     // ajouter voiture au client
//     await Client.findByIdAndUpdate(req.params.clientId, {
//       $push: { voitures: voiture._id }
//     });

//     res.status(201).json({
//       message: "Voiture ajoutée avec succès",
//       voiture
//     });

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// ➕ AJOUTER VOITURE avec CIN
exports.addVoiture = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "garagiste") {
      return res.status(403).json({ message: "Accès refusé" });
    }
        const garageId = req.user.id;

    const { cin } = req.params;
    //  if (!garageId) {
    //   return res.status(400).json({ message: "garageId obligatoire" });
    // }

    
    // 🔎 chercher client par CIN
    const client = await Client.findOne({ cin });

    if (!client) {
      return res.status(404).json({ message: "Client introuvable" });
    }

    // 🚗 créer voiture
    const voiture = new Voiture({
      marque: req.body.marque,
      modele: req.body.modele,
      matricule: req.body.matricule,
      etat: req.body.etat || 'en attente',
      cin:cin,
      client: client._id ,  // ⚠️ on garde ObjectId en base
      garage: garageId  // ⚠️ on garde ObjectId en base
    });

    await voiture.save();

    // 🔗 lier voiture au client
    await Client.findByIdAndUpdate(client._id, {
      $push: { voitures: voiture._id }
    });

    res.status(201).json({
      message: "Voiture ajoutée avec succès",
      voiture
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//liste de véhicules
exports.getVoitures = async (req, res) => {
  try {
     // ✅ garageId depuis le token (pas query)
    if (!req.user || req.user.role !== "garagiste") {
      return res.status(403).json({ message: "Accès refusé" });
    }
    const garageId = req.user.id; // ✅ depuis token
        console.log("🔍 garageId =", garageId);

    const voitures = await Voiture.find({ garage: garageId })
    .populate('client', 'cin nom prenom');

    res.json(voitures);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ✏️ MODIFIER VOITURE
exports.updateVoiture = async (req, res) => {
  try {
    const { id } = req.params;

    // vérifier si voiture existe
    const voiture = await Voiture.findById(id);
    if (!voiture) {
      return res.status(404).json({ message: "Voiture introuvable" });
    }
const updatedVoiture = await Voiture.findByIdAndUpdate(
      id,
      {
        marque: req.body.marque || voiture.marque,
        modele: req.body.modele || voiture.modele,
        matricule: req.body.matricule || voiture.matricule,
        etat: req.body.etat || voiture.etat,
        diagnostic: req.body.diagnostic ?? voiture.diagnostic,
        garage: voiture.garage // 🔥 IMPORTANT
      },
      { new: true }
    );
    // await voiture.save();

    res.json({
      message: "Voiture modifiée avec succès ✅",
      voiture
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔎 récupérer une voiture par ID
exports.getVoitureById = async (req, res) => {
  try {
    const { id } = req.params;

    const voiture = await Voiture.findById(id)
      .populate('client', 'cin nom prenom');

    if (!voiture) {
      return res.status(404).json({ message: "Voiture introuvable" });
    }

    res.json(voiture);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// 🔥 supprimer une voiture par ID
exports.deleteVoiture = async (req, res) => {
  try {
    const { id } = req.params;

    // vérifier si la voiture existe
    const voiture = await Voiture.findById(id);

    if (!voiture) {
      return res.status(404).json({ message: "Voiture introuvable" });
    }

    // suppression
    await Voiture.findByIdAndDelete(id);

    res.json({
      message: "Voiture supprimée avec succès ✅"
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// 🔎 récupérer toutes les voitures d’un client par CIN
exports.getVoituresByCin = async (req, res) => {
  try {
      if (!req.user || req.user.role !== "garagiste") {
      return res.status(403).json({ message: "Accès refusé" });
    }
        const garageId = req.user.id;

    const { cin } = req.params;

      // 🔎 chercher client
    const client = await Client.findOne({ cin });
     // ✅ vérifier que garage existe avant toString
    if (!client.garage) {
      return res.status(400).json({ 
        message: "Ce client n'a pas de garage associé" 
      });
    }
if (!client) {
      return res.status(404).json({ message: "Client introuvable ❌" });
    }
        // 🔐 sécurité métier
    if (client.garage.toString() !== garageId) {
      return res.status(403).json({
        message: "Ce client n'appartient pas à votre garage"
      });
    }



    // récupérer voitures liées au CIN
    const voitures = await Voiture.find({ cin })
      .populate('client', 'nom prenom cin');

    // si aucune voiture
   if (voitures.length === 0) {
      return res.status(404).json({
        message: "Aucune voiture trouvée pour ce client ❌"
      });
    }

    // succès
    res.status(200).json(voitures);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


