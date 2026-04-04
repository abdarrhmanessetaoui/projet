const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
       // required : Ce champ est OBLIGATOIRE
       // Si on essaie de créer un produit sans nom, MongoDB refuse
       // Le tableau [true, 'message'] permet de personnaliser le message d'erreur
      required: [true, 'Le nom du produit est obligatoire'],
      trim: true,
      maxlength: [100, 'Le nom ne peut pas dépasser 100 caractères']
    },
    description: {
      type: String,
      required: [true, 'La description est obligatoire'],
      maxlength: [500, 'La description ne peut pas dépasser 500 caractères']
    },
    marque: {
      type: String,
      trim: true // Optionnel : pas de required ici
    },
    prix: {
      type: Number,
      required: [true, 'Le prix est obligatoire'],
      min: [0, 'Le prix ne peut pas être négatif'],
      // Validation personnalisée : multiple de 0.01
      validate: {
        validator: function(v) {
          return Number((v * 100).toFixed(0)) === v * 100;
        },
        message: 'Le prix ne peut pas avoir plus de 2 décimales (ex: 19.99)'
      }
    },
    quantite: {
      type: Number,
      required: [true, 'La quantité est obligatoire'],
      min: [0, 'La quantité ne peut pas être négative'],
      default: 0
    },
    categorie: {
      type: String,
      required: [true, 'La catégorie est obligatoire'],
      // enum : Liste de valeurs autorisées
      // Le produit DOIT être dans une de ces catégories
      enum: {
        values: ['Électronique', 'Electronique', 'Vêtements', 'Vetements', 'Alimentaire', 'Livres', 'Autre'],
        message: '{VALUE} n\'est pas une catégorie valide'
        // {VALUE} sera remplacé par la valeur fournie
      }
    },
    enStock: {
      type: Boolean,
      default: true
    },
    image: {
      type: String,
      default: 'https://dummyimage.com/150x150/cccccc/000000.png&text=No+Image'
    }
  },

 // DEUXIÈME ARGUMENT : Options du schéma
 {
 // timestamps : Ajoute automatiquement 2 champs :
 // - createdAt : Date de création du document
 // - updatedAt : Date de dernière modification
 // MongoDB gère ces champs automatiquement !
    timestamps: true,
  }
);

produitSchema.index({ nom: 'text', description: 'text' });

produitSchema.virtual('estDisponible').get(function () {
  return this.quantite > 0 && this.enStock;
});
// Un middleware est une fonction qui s'exécute AVANT ou APRÈS une action
// Ici, "pre('save')" = avant de sauvegarder dans MongoDB
// Cas d'usage : Mettre à jour automatiquement le champ "enStock
// Exemple :
// const produit = new Produit({ nom: "iPhone", quantite: 0 });
// produit.save();
// → Le middleware s'exécute AVANT la sauvegarde
// → enStock devient automatiquement false
// → Puis le produit est sauvegardé dans MongoDB
produitSchema.pre('save', async function () {
  // "this" = le document qu'on est en train de sauvegarder
  // On met à jour enStock en fonction de la quantité
  // Si quantite > 0 → enStock = true
  // Si quantite = 0 → enStock = false
  this.enStock = this.quantite > 0;
});
// mongoose.model() crée un modèle à partir du schéma
// C'est comme créer une machine à fabriquer des produits selon le plan
// Paramètres :
// 1. 'Produit' : Nom du modèle (MongoDB créera une collection 'produits')
// 2. produitSchema : Le schéma défini ci-dessus
const Produit = mongoose.model('Produit', produitSchema);

// Exportation du modèle pour qu'il soit utilisable ailleurs
module.exports = Produit;

// ============================================
// EXEMPLE D'UTILISATION (dans un autre fichier)
// ============================================
// const Produit = require('./models/produit.model');
// 
// const nouveauProduit = new Produit({ 
//   nom: "iPhone", 
//   prix: 999,
//   description: "Super téléphone",
//   categorie: "Electronique"
// });
// 
// nouveauProduit.save();