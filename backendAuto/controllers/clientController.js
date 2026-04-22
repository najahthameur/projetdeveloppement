const Client = require('../models/Client');
const Voiture = require('../models/Voiture');
// ➕ ajouter client
exports.addClient = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "garagiste") {
      return res.status(403).json({ message: "Accès refusé" });
    }
    const garageId = req.user.id;

    console.log("DATA:", req.body);
     const { cin, nom, prenom, email, telephone, adresse, motdepasse } = req.body;
      // ✅ validation
    if (!cin || !nom || !motdepasse) {
      return res.status(400).json({
        message: "CIN, nom et mot de passe obligatoires"
      });

    } 
    // 🔥 vérifier doublon CIN
    const existClient = await Client.findOne({ cin });
    if (existClient) {
      return res.status(400).json({
        message: "Client avec ce CIN existe déjà"
      });
    }
    
    const client = new Client({
      cin,
      nom,
      prenom,
      email,
      telephone,
      adresse,
      motdepasse,
      garage: garageId // 🔥 lien automatique
    });
    await client.save();


    res.status(201).json(client);


 } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 📄 AFFICHER CLIENTS
exports.getClients = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "garagiste") {
      return res.status(403).json({ message: "Accès refusé" });
    }
        const garageId = req.user.id;

    const clients = await Client.find({garage: garageId}, {
      cin: 1,
      nom: 1,
      prenom: 1,
      email:1,
      telephone: 1,
      adresse: 1,
      motdepasse: 1

    });

    res.status(200).json(clients);

  } catch (err) {
        console.log("ERREUR GET CLIENTS:", err);

    res.status(500).json({ message: err.message });
  }
 
};
// 🗑️ supprimer client + ses voitures
exports.deleteClientByCin = async (req, res) => {
  try {
    const { cin } = req.params;

    const client = await Client.findOne({ cin });

    if (!client) {
      return res.status(404).json({ message: "Client introuvable ❌" });
    }

    // supprimer voitures liées
    // await Voiture.deleteMany({ cin });
    // 2. supprimer voitures liées (PROPRE)
    await Voiture.deleteMany({ client: client._id });
    // // supprimer client
    // await Client.deleteOne({ cin });

       // 3. supprimer client
    await Client.deleteOne({ _id: client._id });

    res.json({
      message: "Client et ses voitures supprimés ✅"
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getMyGarage = async (req, res) => {
  try {
    if (req.user.role !== "client") {
      return res.status(403).json({ message: "Accès refusé" });
    }

    const client = await Client.findById(req.user.id)
      .populate("garage", "nom Nomgarage email");

    if (!client) {
      return res.status(404).json({ message: "Client introuvable" });
    }

    res.json(client.garage);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getMyVoitures = async (req, res) => {
  try {
    if (req.user.role !== "client") {
      return res.status(403).json({ message: "Accès refusé" });
    }

    const voitures = await Voiture.find({ client: req.user.id })
      .populate("client", "cin nom prenom")
      .populate("garage", "nom Nomgarage email");
    res.json(voitures);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
