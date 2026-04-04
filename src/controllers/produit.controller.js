const Produit = require('../models/produit.model');

// FONCTION 1 : RÉCUPÉRER TOUS LES PRODUITS
exports.getAllProduits = async (req, res) => {
  try {
    // RÉCUPÉRATION DES PARAMÈTRES DE LA REQUÊTE
    
    // req.query = Les paramètres dans l'URL après le "?"
    // Exemple: /api/produits?page=2&limit=10&categorie=Électronique

    // Destructuration avec valeurs par défaut
    const {
    page = 1,
    limit = 10,
    categorie,
    marque, // Nouveau paramètre
    enStock
    } = req.query;
    // objet vide pour stocker les filtres
    const filter = {};
    if (categorie) filter.categorie = categorie;
    if (marque) filter.marque = marque; // Application du filtre marque
    // Si l'utilisateur a fourni enStock, on l'ajoute au filtre
    // Attention : req.query renvoie toujours des STRINGS
    // "true" (string) doit être converti en true (boolean)
    if (enStock !== undefined) filter.enStock = enStock === 'true';

    // REQUÊTE MONGODB AVEC PAGINATION

    // Produit.find(filter) = Chercher tous les produits qui correspondent au filtre
    const produits = await Produit.find(filter)
    // .limit(limit * 1) = Limiter le nombre de produits par page
      .limit(limit * 1)
      // .skip((page - 1) * limit) = Sauter les produits déjà affichés
      .skip((page - 1) * limit)
      // .sort({ createdAt: -1 }) = Trier les produits par date de création
      .sort({ createdAt: -1 });

      // COMPTER LE NOMBRE TOTAL DE DOCUMENTS

      // countDocuments() = Compter combien de produits correspondent au filtre
      // Utile pour savoir combien de pages il y a au total
    const count = await Produit.countDocuments(filter);
// ENVOYER LA RÉPONSE AU CLIENT
      res.status(200).json({
      success: true, // Indique que la requête a réussi
      count: produits.length, // Nombre de produits dans cette page
      total: count, // Nombre total de produits (toutes pages)
      page: Number(page), // Page actuelle
      pages: Math.ceil(count / limit), // Nombre total de pages
      data: produits // Les produits eux-mêmes
      });
       // Exemple de réponse :
        // {
        // "success": true,
        // "count": 10,
        // "total": 47,
        // "page": 1,
        // "pages": 5,
        // "data": [ { "nom": "iPhone", ... }, { "nom": "Samsung", ... } ]
        // }


  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
  }
};

// FONCTION 2 : RÉCUPÉRER UN PRODUIT PAR ID
exports.getProduitById = async (req, res) => {
  try {
    // req.params = Les paramètres dans l'URL (partie dynamique)
    // Exemple : /api/produits/123abc → req.params.id = "123abc"
    // Produit.findById() = Chercher un produit par son ID MongoDB
    const produit = await Produit.findById(req.params.id);
    // VÉRIFIER SI LE PRODUIT EXISTE
    if (!produit) {
      // return = arrêter l'exécution de la fonction ici
      // Sinon, on enverrait 2 réponses (404 puis 200) → erreur !
      return res.status(404).json({ success: false, message: 'Produit non trouvé' });
    }
    // Si on arrive ici, c'est que le produit existe
    res.status(200).json({ success: true, data: produit });
    // Erreur possible : ID MongoDB invalide (mauvais format)
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
  }
};

// FONCTION 3 : CRÉER UN NOUVEAU PRODUIT
exports.createProduit = async (req, res) => {
  try {
    // req.body = Les données envoyées par le client (dans le corps de la requête)
    // Exemple : { "nom": "iPhone 15", "prix": 999, "categorie": "Électronique" }
    const produit = await Produit.create(req.body);
    // 201 = Created (Créé avec succès)
    res.status(201).json({ success: true, message: 'Produit créé avec succès', data: produit });
  // GESTION DES ERREURS DE VALIDATION
  } catch (error) {
    if (error.name === 'ValidationError') { 
      // error.errors = Objet contenant les erreurs de validation
      // Object.values() = Tableau des messages d'erreur
      const messages = Object.values(error.errors).map(err => err.message);
      // Exemple de messages :
      // ["Le nom est obligatoire", "Le prix ne peut pas être négatif"]
      return res.status(400).json({ success: false, message: 'Erreur de validation', errors: messages });
    }
    res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
  }
};

// FONCTION 4 : METTRE À JOUR UN PRODUIT (PUT)
// PUT = Remplacement COMPLET du produit
exports.updateProduit = async (req, res) => {
  try {
    // req.params.id = L'ID du produit à modifier
    // req.body = Les nouvelles données
    // { new: true } = Renvoyer le produit modifié (sinon Mongoose renvoie l'ancien)
    // runValidators: true = Appliquer les validations du schéma (ex: prix > 0)
    const produit = await Produit.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!produit) {
      return res.status(404).json({ success: false, message: 'Produit non trouvé' });
    }
    res.status(200).json({ success: true, message: 'Produit mis à jour', data: produit });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
  }
};

// FONCTION 5 : MODIFIER PARTIELLEMENT (PATCH)
// PATCH = Modification PARTIELLE (seulement certains champs)
exports.patchProduit = async (req, res) => {
  try {
    // $set = Opérateur MongoDB pour mettre à jour seulement les champs fournis
    // Sans $set, on remplacerait tout le document (comme PUT)
    const produit = await Produit.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true });
    if (!produit) {
      return res.status(404).json({ success: false, message: 'Produit non trouvé' });
    }
    res.status(200).json({ success: true, message: 'Produit modifié', data: produit });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
  }
};

// FONCTION 6 : SUPPRIMER UN PRODUIT (DELETE)
exports.deleteProduit = async (req, res) => {
  try {
    const produit = await Produit.findByIdAndDelete(req.params.id);
    if (!produit) {
      return res.status(404).json({ success: false, message: 'Produit non trouvé' });
    }
    res.status(200).json({ success: true, message: 'Produit supprimé', data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
  }
};

// FONCTION 7 : RECHERCHER DES PRODUITS
exports.searchProduits = async (req, res) => {
  try {
   // me de recherche dans l'URL
   // Exemple : /api/produits/search?q=iPhone
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ success: false, message: 'Le paramètre "q" est requis' });
    }
    // $text = Opérateur MongoDB pour la recherche textuelle
    // $search = Le terme à chercher
    // Cherche dans les champs indexés (nom et description)
    const produits = await Produit.find({ $text: { $search: q } });
    res.status(200).json({ success: true, count: produits.length, data: produits });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
  }
};

// FONCTION 8 : STATISTIQUES (AGRÉGATION)
exports.getProduitStats = async (req, res) => {
  try {
    const stats = await Produit.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 }, // Nombre total de produits
          valeurTotale: { $sum: { $multiply: ["$prix", "$quantite"] } }, // Somme de (prix * quantité)
          prixMoyen: { $avg: "$prix" } // Prix moyen
        }
      }
    ]);

    if (stats.length === 0) {
      return res.status(200).json({ success: true, data: { total: 0, valeurTotale: 0, prixMoyen: 0 } });
    }

    res.status(200).json({ success: true, data: stats[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur stats', error: error.message });
  }
};