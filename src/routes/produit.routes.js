// express = Le framework web
const express = require('express');
// Router() = Créer un routeur Express
// Un routeur est comme un mini-serveur qui gère un groupe de routes
const router = express.Router();
// Importer toutes les fonctions du contrôleur
// Les accolades {} = destructuration (importer seulement certaines fonctions)
const {
  getAllProduits,
  getProduitById,
  createProduit,
  updateProduit,
  patchProduit,
  deleteProduit,
  searchProduits,
  getProduitStats
} = require('../controllers/produit.controller');

// ⚠️ IMPORTANT : Ces routes DOIVENT être AVANT /:id
router.get('/search', searchProduits);
router.get('/stats', getProduitStats);

router.route('/')
  .get(getAllProduits)
  .post(createProduit);

router.route('/:id')
  .get(getProduitById)
  .put(updateProduit)
  .patch(patchProduit)
  .delete(deleteProduit);

module.exports = router;