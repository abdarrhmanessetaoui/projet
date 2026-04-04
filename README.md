# 📦 Projet API Produits - Minimalist REST API

Une API simple pour gérer un catalogue de produits, construite avec **Node.js**, **Express**, **MongoDB** et **Docker**.

## 🚀 Lancement rapide (Docker)

Si vous avez Docker installé, vous pouvez lancer le projet en quelques secondes :

1.  **Cloner le dépôt :**
    ```bash
    git clone https://github.com/abdarrhmanessetaoui/projet-api-rest.git
    cd projet-api-rest
    ```

2.  **Lancer avec Docker :**
    ```bash
    # Construire l'image
    docker build -t api-produits .

    # Lancer le conteneur (avec les variables d'environnement)
    docker run -d -p 3000:3000 --name api-produits api-produits
    ```

3.  **Accéder à l'interface :**
    Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🛠️ Fonctionnalités
- **CRUD complet** : POST, GET, PUT, PATCH, DELETE sur `/api/produits`.
- **Recherche textuelle** : `/api/produits/search?q=laptop`.
- **Statistiques** : `/api/produits/stats`.
- **Frontend minimaliste** : HTML brut, Sans CSS.
- **Validation** : Prix limités à 2 décimales.
- **Logging** : Enregistrement des requêtes dans `logs/server.log`.

---
*Créé par abdarrhmanessetaoui*
