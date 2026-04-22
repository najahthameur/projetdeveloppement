const User = require('../models/User');
const Client = require('../models/Client');
const jwt = require('jsonwebtoken');

const SECRET_KEY = "my_secret_key";

// 🔐 LOGIN GLOBAL
exports.login = async (req, res) => {
  try {
    const { role } = req.body;

    // ================= CLIENT =================
  

if (role === "client") {

       const { cin, motdepasse } = req.body;

  // 1. chercher par CIN
  const client = await Client.findOne({ cin });

      if (!client) {
        return res.status(401).json({ message: "Client non trouvé" });
      }

       // 2. vérifier mot de passe
  if (client.motdepasse !== motdepasse) {
    return res.status(401).json({ message: "Mot de passe incorrect" });
  }

      const token = jwt.sign(
  { id: client._id, role: "client" },
  SECRET_KEY
);

      return res.json({ 
        token,
         role: "client", 
         user: client });
    }

    // ================= GARAGISTE =================
    if (role === "garagiste") {
      const { email, motdepasse } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: "Utilisateur non trouvé" });
      }

      if (user.motdepasse !== motdepasse) {
        return res.status(401).json({ message: "Mot de passe incorrect" });
      }

     const token = jwt.sign(
  { id: user._id, role: user.role },
  SECRET_KEY
);
      return res.json({ token, role: "garagiste",
    user: {
      _id:       user._id,        // ← obligatoire pour Angular
      id:        user._id,        // ← compatibilité
      nom:       user.nom,
      prenom:    user.prenom || '',
      email:     user.email,
      Nomgarage: user.Nomgarage,
      role:      user.role
      // ❌ motdepasse NON inclus
    }
  });
    }

    return res.status(400).json({ message: "Role invalide" });

 } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
// 🔐 1. FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {
  try {
    const { role, email, cin } = req.body;

    let user;

    // 👤 CLIENT (recherche par CIN)
    if (role === "client") {
      user = await Client.findOne({ cin });
    } 
    // 👨‍🔧 GARAGISTE (recherche par email)
    else if (role === "garagiste") {
      user = await User.findOne({ email });
    }

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    // 🔑 création token reset (valable 15 min)
    const token = jwt.sign(
      { id: user._id, role },
      SECRET_KEY,
      { expiresIn: "15m" }
    );

    res.json({
      message: "Token de réinitialisation généré",
      token
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 🔐 2. RESET PASSWORD
exports.resetPassword = async (req, res) => {
  try {
    const { token, role, newPassword } = req.body;

    // 🔓 vérifier token
    const decoded = jwt.verify(token, SECRET_KEY);

    let user;

    if (role === "client") {
      user = await Client.findById(decoded.id);
    } else {
      user = await User.findById(decoded.id);
    }

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    // 🔥 mise à jour mot de passe
    user.motdepasse = newPassword;
    await user.save();

    res.json({
      message: "Mot de passe réinitialisé avec succès ✅"
    });

  } catch (err) {
    res.status(400).json({ message: "Token invalide ou expiré" });
  }
};