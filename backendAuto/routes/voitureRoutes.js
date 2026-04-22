const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const voitureController = require('../controllers/voitureController');
const clientController = require('../controllers/clientController');

// router.post('/voitures/:clientId', voitureController.addVoiture);
router.post('/voitures/:cin', auth, voitureController.addVoiture);
// 📄 liste voitures
router.get('/voitures', auth, voitureController.getVoitures);
// ✏️ modifier voiture par ID
router.put('/voitures/:id', auth, voitureController.updateVoiture);
// 🕒 afficher voiture par ID
router.get('/voitures/:id', auth, voitureController.getVoitureById);
//supprimer voiture par id
router.delete('/voitures/:id', auth, voitureController.deleteVoiture);
//affiche les voiture dun client par son cin
router.get('/voitures/client/:cin', auth, voitureController.getVoituresByCin);

module.exports = router;