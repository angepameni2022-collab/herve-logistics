const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const db = require("../db");
const { connexionSchema } = require("../validators/schemas");
const { JWT_SECRET, COOKIE_NAME } = require("../middleware/auth");

const router = express.Router();

// Rate limiter pour la connexion : 5 essais par tranche de 15 minutes
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 essais max
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Trop de tentatives de connexion infructueuses. Compte temporairement bloqué pendant 15 minutes."
  }
});

/**
 * Journalisation de sécurité
 */
function journaliserAuth(action, email, succes, req, details = "") {
  const ip = req.ip || req.connection.remoteAddress || "inconnue";
  const date = new Date().toISOString();
  console.log(`[AUTH-LOG] ${date} | Action: ${action} | Email: ${email} | Succes: ${succes} | IP: ${ip} | ${details}`);
}

/**
 * POST /api/connexion
 * Message d'erreur identique si email inconnu ou mot de passe faux
 */
router.post("/connexion", loginLimiter, async (req, res) => {
  try {
    const parseResult = connexionSchema.safeParse(req.body);
    if (!parseResult.success) {
      journaliserAuth("CONNEXION_ECHOUEE", req.body?.email || "inconnu", false, req, "Validation invalide");
      return res.status(401).json({
        success: false,
        message: "Email ou mot de passe incorrect."
      });
    }

    const { email, mot_de_passe } = parseResult.data;

    const client = db.prepare("SELECT * FROM clients WHERE email = ?").get(email);
    if (!client) {
      journaliserAuth("CONNEXION_ECHOUEE", email, false, req, "Email inexistant");
      return res.status(401).json({
        success: false,
        message: "Email ou mot de passe incorrect."
      });
    }

    const mdpValide = await bcrypt.compare(mot_de_passe, client.mot_de_passe_hash);
    if (!mdpValide) {
      journaliserAuth("CONNEXION_ECHOUEE", email, false, req, "Mot de passe erroné");
      return res.status(401).json({
        success: false,
        message: "Email ou mot de passe incorrect."
      });
    }

    // Génération du token JWT
    const token = jwt.sign(
      {
        id: client.id,
        nom: client.nom,
        email: client.email,
        role: client.role
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Cookie httpOnly sécurisé
    const isProd = process.env.NODE_ENV === "production";
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jours
    });

    journaliserAuth("CONNEXION_REUSSIE", email, true, req, `Role: ${client.role}`);

    return res.json({
      success: true,
      message: "Connexion réussie.",
      user: {
        id: client.id,
        nom: client.nom,
        email: client.email,
        role: client.role
      }
    });
  } catch (err) {
    console.error("Erreur connexion:", err);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la connexion. Veuillez réessayer."
    });
  }
});

/**
 * POST /api/deconnexion
 */
router.post("/deconnexion", (req, res) => {
  const isProd = process.env.NODE_ENV === "production";
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax"
  });

  return res.json({
    success: true,
    message: "Déconnexion réussie."
  });
});

/**
 * GET /api/session
 * Pour vérifier l'état de session côté client
 */
router.get("/session", (req, res) => {
  const token = req.cookies?.[COOKIE_NAME] || req.headers.authorization?.replace(/^Bearer\s+/, "");
  if (!token) {
    return res.json({ connecte: false, user: null });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return res.json({ connecte: true, user: payload });
  } catch (err) {
    return res.json({ connecte: false, user: null });
  }
});

module.exports = router;
