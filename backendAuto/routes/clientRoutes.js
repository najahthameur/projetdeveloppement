const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const Client = require('../models/Client');
const User = require('../models/User');
const auth = require('../middleware/auth');
// ➕ ajouter client
router.post('/clients', auth, clientController.addClient);

// 📄 afficher clients
router.get('/affclients', auth, clientController.getClients);

// 👤 client → voir son garage
router.get('/my-garage', auth, clientController.getMyGarage);

// 👤 client → voir ses voitures
router.get('/my-voitures', auth, clientController.getMyVoitures);
// router.post('/login-client', loginClient);
// UPDATE profil utilisateur
router.put('/update/:id', async (req, res) => {
  try {

    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({ message: "client introuvable" });
    }

    // update safe
    if (req.body.email !== undefined) client.email = req.body.email;
    if (req.body.telephone !== undefined) client.telephone = req.body.telephone;
    if (req.body.adresse !== undefined) client.adresse = req.body.adresse;

    await client.save();

    res.json({
      message: "Profil mis à jour avec succès",
      client
    });

  } catch (err) {
    console.error(err); // 👈 important pour debug
    res.status(500).json({ message: err.message });
  }
});
// 🔒 Modifier mot de passe (SANS HASH)
router.put('/changepassword/:id', async (req, res) => {
  try {
    const { ancienPassword, nouveauPassword, confirmPassword } = req.body;
    // ❗ 1. Vérifier champs obligatoires
    if (!ancienPassword || !nouveauPassword || !confirmPassword) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires" });
    }
    // 1. vérifier confirmation
    if (nouveauPassword !== confirmPassword) {
      return res.status(400).json({ message: "Les mots de passe ne correspondent pas" });
    }

    // 2. trouver user
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Client introuvable" });
    }

    // 3. vérifier ancien mot de passe
    if (client.motdepasse !== ancienPassword) {
      return res.status(400).json({ message: "Ancien mot de passe incorrect" });
    }

    // 4. modifier mot de passe
    client.motdepasse = nouveauPassword;

    await client.save();

    res.json({ message: "Mot de passe modifié avec succès" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// 🔥 récupérer un client par ID
router.get('/clients/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({ message: "Client introuvable" });
    }

    res.json(client);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// supprimer client par CIN
router.delete('/clients/:cin', clientController.deleteClientByCin);
module.exports = router;