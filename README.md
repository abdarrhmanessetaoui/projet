<div align="center">
  <h1>📦 Projet API Produits - Guide Étudiant Débutant</h1>
  <p>Une API simple pour gérer un catalogue de produits. Idéal pour apprendre Node.js, Express, MongoDB et Docker.</p>
  
  <p>
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js" />
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  </p>
</div>

---

## 📋 Prérequis (À installer sur votre PC)
- **Docker Desktop** : Téléchargez et installez-le depuis le site officiel de Docker. C'est l'outil qui va lancer la base de données et l'API pour vous.

---

## 🚀 Guide d'installation pas à pas

### Étape 1 : Télécharger (Cloner) le projet
Ouvrez un terminal (PowerShell sur Windows ou Terminal sur Mac/Linux) et tapez :
```bash
git clone https://github.com/abdarrhmanessetaoui/projet-api-rest.git
cd projet-api-rest
```

### Étape 2 : Préparer la configuration
Dans le dossier du projet, vous trouverez un fichier caché nommé `.env`. Il contient les paramètres de connexion. Assurez-vous qu'il existe. Si vous ne le voyez pas, créez un fichier texte nommé `.env` et mettez-y :
```env
PORT=3000
MONGODB_URI=mongodb://mongodb:27017/produits_db
NODE_ENV=production
```

### Étape 3 : Lancer le projet (Une seule commande !)
Lancez Docker Desktop, puis dans votre terminal, tapez :
```bash
docker compose up -d --build
```
- **`-d`** : Lance le projet en arrière-plan.
- **`--build`** : S'assure que l'image la plus récente de votre code est utilisée.

### Étape 4 : Ajouter les premières données (Seeding)
Pour ne pas avoir une base de données vide au début, lancez cette commande pour remplir le catalogue avec quelques exemples :
```bash
docker exec -it api-produits node seed.js
```

### Étape 5 : Utiliser l'application
- Ouvrez votre navigateur et allez sur : [http://localhost:3000](http://localhost:3000)
- Vous pouvez maintenant chercher, ajouter, modifier ou supprimer des produits !

---

## 🛠️ Commandes utiles pour les étudiants

Voici les commandes que vous utiliserez le plus souvent :

| Action | Commande |
|:--- |:--- |
| **Vérifier si le projet tourne** | `docker ps` |
| **Voir les logs (erreurs serveur)** | `docker logs -f api-produits` |
| **Arrêter le projet** | `docker compose down` |
| **Redémarrer après modif code** | `docker compose up -d --build` |
| **Vider complètement la base** | `docker compose down -v` |

---

## ⚠️ Résolution des problèmes fréquents

**Erreur : "Port 3000 is already in use"**
Cela signifie qu'un autre programme (peut-être un serveur Node.js lancé manuellement) utilise déjà ce port. 
- Solution : Arrêtez vos serveurs locaux ou changez le port dans le fichier `docker-compose.yml` (partie `ports: - "3000:3000"`).

**Erreur : "Docker is not running"**
- Solution : Vérifiez que l'icône de la baleine Docker est bien présente et active dans votre barre des tâches.

---

<div align="center">
  <i>Projet pédagogique créé par abdarrhmanessetaoui</i>
</div>