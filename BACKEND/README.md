# Hervé Logistics — Backend REST API & Contrôleur GPS

Ce dossier contient l'implémentation complète du serveur **Backend Node.js / Express** de la plateforme **Hervé Logistics**.

## 🚀 Démarrage Rapide

1. Rendez-vous dans le dossier `BACKEND/` :
   ```bash
   cd BACKEND
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Démarrez le serveur API :
   ```bash
   npm start
   ```
   Ou avec nodemon / dev :
   ```bash
   node server.js
   ```

Le serveur s'exécutera sur `http://localhost:5000`.

---

## 📡 Endpoints de l'API REST

### 1. Contrôleur de Déplacement GPS du Colis (Admin)
- **`PUT /api/shipments/:trackingNumber/displacement`**
  - Permet à l'administrateur de piloter en direct le déplacement d'un colis sur la carte.
  - **Corps JSON attendu :**
    ```json
    {
      "lat": 4.0511,
      "lng": 9.7679,
      "locationName": "Port de Douala, Cameroun",
      "progress": 95,
      "status": "Arrivé",
      "eventDescription": "Le navire est arrivé à quai, déchargement des conteneurs en cours."
    }
    ```

### 2. Gestion des Expéditions
- **`GET /api/shipments`** : Liste toutes les expéditions enregistrées.
- **`GET /api/shipments/:trackingNumber`** : Détails d'une expédition avec coordonnées GPS et journal des événements.
- **`POST /api/shipments`** : Création d'un nouvel envoi.
- **`PUT /api/shipments/:trackingNumber/status`** : Mise à jour simple du statut et pourcentage.
- **`POST /api/shipments/:trackingNumber/events`** : Ajout d'une étape dans l'historique du colis.

### 3. Authentification Administrateur
- **`POST /api/auth/admin/login`**
  - Identifiants de test : `admin@hervelogistics.com` / Mot de passe ou PIN : `2026`

### 4. Formulaire de Contact
- **`POST /api/contact`** : Réception et enregistrement des messages de contact.
- Support téléphonique : **+44 7456 062192** (WhatsApp & Tel direct).

---

## 💾 Persistance des Données
Les données des expéditions sont automatiquement persistées dans le fichier `data/shipments.json` et peuvent être facilement branchées sur une base de données MongoDB / PostgreSQL en adaptant les méthodes de stockage.
