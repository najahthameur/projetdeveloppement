const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const clientRoutes = require('./routes/clientRoutes');
const authRoutes = require('./routes/authRoutes');
const voitureRoutes = require('./routes/voitureRoutes');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require('./models/User');
const Client = require('./models/Client');

const app = express();
app.use(cors()); // autorise Angular à appeler le backend
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api', clientRoutes);
app.use('/authapi', authRoutes);
app.use('/voitapi', voitureRoutes);

const SECRET_KEY = "my_secret_key";

// Connexion MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/myDatabase')
  .then(() => console.log('✅ MongoDB connecté'))
  .catch(err => console.error('❌ Erreur MongoDB :', err));

// route test
// app.get('/api/test', (req, res) => {
//     res.json({ message: 'Backend Node fonctionne !' });
// });
// app.post("/login", async (req, res) => {
//   try {
//     const { email, motdepasse  } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(401).json({ message: "Email incorrect" });
//     }

//     if (!user.motdepasse) {
//       return res.status(500).json({ message: "motdepasse manquant en DB" });
//     }

//     if (motdepasse  !== user.motdepasse) {
//       return res.status(401).json({ message: "Mot de passe incorrect" });
//     }

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       SECRET_KEY,
//       { expiresIn: "1h" }
//     );

//     res.json({ token, role: user.role });

//   } catch (err) {
//     console.error("🔥 ERROR LOGIN:", err);
//     res.status(500).json({ message: err.message });
//   }
// });


// =========================
// 🛡️ MIDDLEWARE AUTH
// =========================
function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header) return res.status(401).json({ message: "Token manquant" });

  const token = header.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token invalide" });

    req.user = decoded;
    next();
  });
}


// =========================
// 👤 CLIENT SPACE
// =========================
app.get("/client", auth, (req, res) => {
  if (req.user.role !== "client") {
    return res.status(403).json({ message: "Accès refusé" });
  }

  res.json({ message: "Bienvenue espace client" });
});


// =========================
// 🔧 GARAGISTE SPACE
// =========================
app.get("/garagiste", auth, (req, res) => {
  if (req.user.role !== "garagiste") {
    return res.status(403).json({ message: "Accès refusé" });
  }

  res.json({ message: "Bienvenue espace garagiste" });
});
// app.post('/api/clients', async (req, res) => {
//   try {
//     console.log("TEST DATA =", req.body);

//      // 🔥 protection contre body vide
//     if (!req.body || Object.keys(req.body).length === 0) {
//       return res.status(400).json({ message: "Body vide envoyé" });
//     }
 
//     if (!req.body.nom || !req.body.prenom) {
//       return res.status(400).json({ message: "Nom et prénom obligatoires" });
//     }

//     const client = new Client(req.body);
//     await client.save();

//     res.status(201).json({
//       message: "Client enregistré ✅",
//       data: client
//     });

//   } catch (err) {
//     console.log("ERREUR:", err);
//     res.status(500).json({ message: err.message });
//   }
// });

app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});