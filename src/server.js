// require('dotenv').config() = Charger le fichier .env
// Cela rend disponibles les variables dans process.env
// DOIT être appelé en PREMIER, avant tout le reste
require('dotenv').config();
const express = require('express'); // Framework web
const cors = require('cors'); // Permet les requêtes entre domaines différents
const connectDB = require('./config/database'); // Connexion à MongoDB
const produitRoutes = require('./routes/produit.routes'); // Import des routes
const loggerMiddleware = require('./middlewares/logger.middleware'); // Import du nouveau middleware
// express() = Créer une application Express
// "app" est l'objet principal de notre serveur
const app = express();
// CONNEXION À MONGODB
connectDB();
// MIDDLEWARES
app.use(loggerMiddleware); // Utilisation du middleware globalement
app.use(cors()); // Middleware CORS
app.use(express.json()); // Middleware pour parser le JSON
app.use(express.urlencoded({ extended: true })); // Middleware pour parser les URLs

// Servir la page d'accueil statique (frontend)
app.use(express.static('public'));

// Middleware pour logger les requêtes
// app.use() sans route = s'applique à TOUTES les requêtes
// ROUTES PRODUITS
app.use('/api/produits', produitRoutes);
// 404 - Route non trouvée
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route non trouvée' });
});
// Gestion des erreurs
// (err, req, res, next) = Signature d'un gestionnaire d'erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Erreur serveur',
    // Afficher l'erreur complète seulement en développement
    // En production, ne pas révéler les détails (sécurité)
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});
// DÉMARRAGE DU SERVEUR
// process.env.PORT = La variable PORT du fichier .env
// || 3000 = Si PORT n'existe pas, utiliser 3000 par défaut
const PORT = process.env.PORT || 3000;
// app.listen() = Démarrer le serveur sur un port
// Paramètres :
// 1. PORT : Le numéro de port
// 2. Callback : Fonction exécutée quand le serveur démarre
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`Environnement : ${process.env.NODE_ENV}`);
});