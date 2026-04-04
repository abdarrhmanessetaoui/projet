const fs = require('fs');
const path = require('path');

// Chemin vers le dossier logs au-dessus de "src"
const logFilePath = path.join(__dirname, '../../logs/server.log');

const loggerMiddleware = (req, res, next) => {
  // On ne loggue que les requêtes API (Optionnel)
  if (req.path.startsWith('/api')) {
    const logMessage = `[${new Date().toISOString()}] ${req.method} ${req.path}\n`;
    
    // Écrire dans le fichier (append = ajouter à la fin)
    fs.appendFile(logFilePath, logMessage, (err) => {
      // On ne crashe pas si le log échoue, on affiche juste l'erreur
      if (err) console.error('Erreur LOG:', err.message);
    });
  }

  next(); // Très important !
};

module.exports = loggerMiddleware;
