const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Produit = require('./src/models/produit.model');

dotenv.config();

const produits = [
  {
    nom: "iPhone 15 Pro",
    description: "Le dernier iPhone avec boîtier en titane et puce A17 Pro.",
    prix: 1199.99,
    quantite: 10,
    categorie: "Electronique",
    image: "/images/iphone.png"
  },
  {
    nom: "MacBook Air M2",
    description: "Ultra-fin, ultra-rapide avec la puce Apple M2.",
    prix: 1299.99,
    quantite: 5,
    categorie: "Electronique",
    image: "/images/macbook.png"
  },
  {
    nom: "T-shirt en coton bio",
    description: "Confortable et écologique, disponible en plusieurs tailles.",
    prix: 25.00,
    quantite: 50,
    categorie: "Vetements",
    image: "/images/tshirt.png"
  },
  {
    nom: "Café en grains Arabica",
    description: "Sachet de 1kg de café pur arabica, torréfaction artisanale.",
    prix: 18.50,
    quantite: 30,
    categorie: "Alimentaire",
    image: "/images/cafe.png"
  },
  {
    nom: "Guide de survie JavaScript",
    description: "Le livre indispensable pour maîtriser Node.js et React.",
    prix: 35.99,
    quantite: 20,
    categorie: "Livres",
    image: "/images/book.png"
  }
];

const seedDB = async () => {
  try {
    console.log('Connexion à MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('Suppression des anciens produits...');
    await Produit.deleteMany({});

    console.log('Insertion des nouveaux produits...');
    await Produit.insertMany(produits);

    console.log('✅ Base de données initialisée avec succès !');
    process.exit();
  } catch (err) {
    console.error('❌ Erreur lors du seeding :', err.message);
    process.exit(1);
  }
};

seedDB();
