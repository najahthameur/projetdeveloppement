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

router.put('/voiture/diagnostic/:id', auth, async (req, res) => {
  try {
    // ✅ seulement garagiste
    if (req.user.role !== "garagiste") {
      return res.status(403).json({ message: "Accès refusé" });
    }

    const { diagnostic, etat } = req.body;

    const voiture = await Voiture.findByIdAndUpdate(
      req.params.id,
      {
        diagnostic: diagnostic,
        etat: etat,
         garage: req.user.id
      },
      { new: true }
    ).populate("garage", "nom Nomgarage email");;

    if (!voiture) {
      return res.status(404).json({ message: "Voiture introuvable" });
    }

    res.json({
      message: "Diagnostic ajouté avec succès",
      voiture
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;