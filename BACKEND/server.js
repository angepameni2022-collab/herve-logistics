/**
 * HERVÉ LOGISTICS - SERVEUR PRINCIPAL EXPRESS & SUIVI MARITIME
 * Architecture REST, SQLite (better-sqlite3), Sécurité Helmet & Rate Limiting,
 * Authentification Cookies HttpOnly, Calcul maritime Haversine.
 */

require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Initialisation de la base SQLite et vérification du schéma
const db = require("./db");

// Routes
const authRouter = require("./routes/auth");
const colisRouter = require("./routes/colis");
const adminRouter = require("./routes/admin");

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

// Sécurité Helmet avec configuration assouplie pour les scripts et cartes Leaflet/SVG
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
  })
);

// CORS configuré avec restriction de domaine et support des cookies de session
app.use(
  cors({
    origin: (origin, callback) => {
      // Autoriser les requêtes sans origine (comme Postman, curl, fichiers locaux) ou domaine configuré
      if (!origin || origin.includes("localhost") || origin.includes("127.0.0.1") || origin === CLIENT_URL) {
        callback(null, true);
      } else {
        callback(new Error("Accès bloqué par la politique CORS"));
      }
    },
    credentials: true
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// Servir les fichiers statiques HTML/CSS/JS du dossier public
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

// API Routes
app.use("/api", authRouter);
app.use("/api", colisRouter);
app.use("/api/admin", adminRouter);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Hervé Logistics API",
    time: new Date().toISOString()
  });
});

// Routes de navigation statiques demandées
app.get("/", (req, res) => {
  const file = path.join(publicPath, "index.html");
  if (fs.existsSync(file)) {
    return res.sendFile(file);
  }
  // Si index.html n'existe pas encore, rediriger ou renvoyer le suivi
  const suivi = path.join(publicPath, "suivi-colis-rouge.html");
  if (fs.existsSync(suivi)) {
    return res.sendFile(suivi);
  }
  return res.json({ service: "Hervé Transit", message: "Bienvenue sur l'API Hervé Transit" });
});

app.get("/connexion", (req, res) => {
  const file = path.join(publicPath, "connexion.html");
  if (fs.existsSync(file)) {
    return res.sendFile(file);
  }
  return res.status(404).send("Page de connexion non trouvée.");
});

app.get("/suivi", (req, res) => {
  const file = path.join(publicPath, "suivi-colis-rouge.html");
  if (fs.existsSync(file)) {
    return res.sendFile(file);
  }
  return res.status(404).send("Page de suivi non trouvée.");
});

app.get("/services", (req, res) => {
  return res.send(`
    <!DOCTYPE html>
    <html lang="fr">
    <head><meta charset="utf-8"><title>Services - Hervé Transit</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap"><style>body{font-family:'Inter',sans-serif;margin:0;padding:2rem;background:#f8fafc;color:#16130f;text-align:center;}a{color:#d62828;text-decoration:none;font-weight:600;}.btn{display:inline-block;padding:10px 20px;background:#d62828;color:white;border-radius:8px;margin-top:20px;}</style></head>
    <body>
      <h1>Nos Services</h1>
      <p>Transport maritime de conteneurs, groupage de fret Busan ➔ Douala & Kribi, dédouanement et logistique intégrée.</p>
      <a href="/suivi" class="btn">Accéder au suivi de colis</a>
    </body>
    </html>
  `);
});

app.get("/a-propos", (req, res) => {
  return res.send(`
    <!DOCTYPE html>
    <html lang="fr">
    <head><meta charset="utf-8"><title>À propos - Hervé Transit</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap"><style>body{font-family:'Inter',sans-serif;margin:0;padding:2rem;background:#f8fafc;color:#16130f;text-align:center;}a{color:#d62828;text-decoration:none;font-weight:600;}.btn{display:inline-block;padding:10px 20px;background:#d62828;color:white;border-radius:8px;margin-top:20px;}</style></head>
    <body>
      <h1>À propos de Hervé Logistics</h1>
      <p>Spécialiste du transit maritime et fret Asie-Afrique depuis plus de 10 ans.</p>
      <a href="/suivi" class="btn">Retour au suivi</a>
    </body>
    </html>
  `);
});

app.get("/contact", (req, res) => {
  return res.send(`
    <!DOCTYPE html>
    <html lang="fr">
    <head><meta charset="utf-8"><title>Contact - Hervé Transit</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap"><style>body{font-family:'Inter',sans-serif;margin:0;padding:2rem;background:#f8fafc;color:#16130f;text-align:center;}a{color:#d62828;text-decoration:none;font-weight:600;}.btn{display:inline-block;padding:10px 20px;background:#d62828;color:white;border-radius:8px;margin-top:20px;}</style></head>
    <body>
      <h1>Contactez-nous</h1>
      <p>Service client disponible 7j/7 par téléphone et WhatsApp : +44 7456 062192</p>
      <a href="/suivi" class="btn">Retour au suivi</a>
    </body>
    </html>
  `);
});

// Middleware de gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error("Erreur serveur non interceptée:", err);
  res.status(500).json({
    success: false,
    message: "Une erreur interne du serveur est survenue. Veuillez réessayer ultérieurement."
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Serveur Hervé Transit en écoute sur http://localhost:${PORT}`);
  });
}

module.exports = app;
