// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, getAllUsers,updateUser ,deleteUser} = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register', registerUser);
router.get('/afficher', auth, getAllUsers);   // GET    → lire tous
// 🔥 update user (profil + password)
router.put('/update/:id', auth, updateUser);
// 🔥 supprimer utilisateur
router.delete('/delete/:id', auth, deleteUser);

module.exports = router;