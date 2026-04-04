// ============================================
// IMPORTATION DES MODULES
// ============================================
// On importe Mongoose, qui est une bibliothèque pour MongoDB
// C'est comme importer un outil de votre boîte à outils
const mongoose = require('mongoose');

// ============================================
// FONCTION DE CONNEXION À MONGODB
// ============================================
// On crée une fonction asynchrone (async) pour se connecter à MongoDB
// "async" signifie que la fonction peut attendre (await) des opérations longues
const connectDB = async () => {

  // try/catch = gestion des erreurs
  // try = "essaie de faire ça"
  // catch = "si ça échoue, fais ça"
  try {

    // mongoose.connect() = Se connecter à MongoDB
    // await = "attends que la connexion soit établie avant de continuer"
    // Sans await, le code continuerait sans attendre la connexion
    const conn = await mongoose.connect(
      process.env.MONGODB_URI // L'URL de MongoDB (depuis le fichier .env)
    );

    // Si la connexion réussit, on affiche un message de succès
    // conn.connection.host = l'adresse du serveur MongoDB (ex: localhost)
    console.log(`MongoDB connecté : ${conn.connection.host}`);

  } catch (error) {
    // Si la connexion échoue, on arrive ici

    // On affiche l'erreur dans la console
    console.error(`Erreur de connexion MongoDB : ${error.message}`);

    // process.exit(1) = Arrêter complètement l'application
    // 1 = code d'erreur (0 = succès, 1 = échec)
    // On arrête car sans base de données, l'API ne peut pas fonctionner
    process.exit(1);
  }
};

// ============================================
// EXPORTATION DE LA FONCTION
// ============================================
// module.exports = rendre la fonction disponible pour d'autres fichiers
// Comme prêter un outil à un collègue
module.exports = connectDB;