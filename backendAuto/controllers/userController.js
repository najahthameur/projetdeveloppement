// // controllers/userController.js
// const { User, users } = require('../models/User');

// // rôles autorisés
// const rolesAutorises = ['garagiste', 'client'];

// const registerUser = (req, res) => {
//     const { nom, email, motdepasse, role } = req.body;

//     // vérifier que tous les champs sont remplis
//     if (!nom || !email || !motdepasse || !role) {
//         return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
//     }

//     // vérifier que le rôle est valide
//     if (!rolesAutorises.includes(role)) {
//         return res.status(400).json({ message: `Rôle invalide, doit être : ${rolesAutorises.join(', ')}` });
//     }

//     // vérifier si email existe déjà
//     const existUser = users.find(u => u.email === email);
//     if (existUser) {
//         return res.status(400).json({ message: 'Email déjà utilisé' });
//     }

//     // créer le nouvel utilisateur
//     const newUser = new User(users.length + 1, nom, email, motdepasse, role);
//     users.push(newUser);

//     res.status(201).json({
//         message: 'Utilisateur créé avec succès',
//         user: newUser
//     });
// };

// module.exports = { registerUser };

// controllers/userController.js
const Client  = require('../models/Client');   // ✅ MANQUANT
const Voiture = require('../models/Voiture'); 
const User   = require('../models/User');  // modèle Mongoose
const bcrypt = require('bcrypt');

// rôles autorisés
const rolesAutorises = ['garagiste', 'client'];

// ─── REGISTER ────────────────────────────────────────────
const registerUser = async (req, res) => {
  const { nom, email, motdepasse, Nomgarage,role } = req.body;

  // 1. Vérifier que tous les champs sont remplis
  if (!nom || !email || !motdepasse || !Nomgarage || !role) {
    return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
  }

  // 2. Vérifier que le rôle est valide
  if (!rolesAutorises.includes(role)) {
    return res.status(400).json({
      message: `Rôle invalide, doit être : ${rolesAutorises.join(', ')}`
    });
  }

  try {
    // 3. Vérifier si l'email existe déjà
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    // // 4. Hasher le mot de passe
    // const hash = await bcrypt.hash(motdepasse, 10);

    // 5. Créer et sauvegarder dans MongoDB
    const newUser = new User({ nom, email, motdepasse, Nomgarage,role });
    await newUser.save();

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      user: {
        id:    newUser._id,
        nom:   newUser.nom,
        email: newUser.email,
        Nomgarage: newUser.Nomgarage,
        role:  newUser.role
      }
    });

  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
// 🔵 UPDATE USER (profil + garage + password)
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, email, Nomgarage, motdepasse } = req.body;

    // 1. chercher user
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    // 2. update champs simples
    if (nom) user.nom = nom;
    if (email) user.email = email;
    if (Nomgarage) user.Nomgarage = Nomgarage;

    // 3. update password (hash obligatoire)
    if (motdepasse) {
      const salt = await bcrypt.genSalt(10);
      user.motdepasse = await bcrypt.hash(motdepasse, salt);
    }

    await user.save();

    res.json({
      message: "Compte mis à jour avec succès",
      user: {
        id: user._id,
        nom: user.nom,
        email: user.email,
        Nomgarage: user.Nomgarage,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
// 🔥 supprimer utilisateur
// 🔥 supprimer utilisateur
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("🗑️ Suppression garagiste ID =", userId);
    
        // 1. vérifier que le garagiste existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    // 2. trouver tous les clients de ce garage
    const clients = await Client.find({ garage: userId });
    console.log("👥 Clients trouvés =", clients.length);
     // 3. récupérer les IDs des clients
    const clientIds = clients.map(c => c._id);

   // 2. supprimer voitures liées directement au garage
    const voituresSupp = await Voiture.deleteMany({ garage: userId });
    console.log("🚗 Voitures supprimées =", voituresSupp.deletedCount);


     // 3. supprimer clients liés au garage
    const clientsSupp = await Client.deleteMany({ garage: userId });
    console.log("👤 Clients supprimés =", clientsSupp.deletedCount);
    // 6. supprimer le garagiste
    await User.findByIdAndDelete(userId);
    console.log("✅ Garagiste supprimé");
    res.status(200).json({
      message: "Compte supprimé avec succès",
      user
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Erreur serveur",
      error
    });
  }
};
// ─── GET ALL USERS ────────────────────────────────────────
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-motdepasse');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};




module.exports = { registerUser, getAllUsers,updateUser,deleteUser};

