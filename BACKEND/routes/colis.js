const express = require("express");
const rateLimit = require("express-rate-limit");
const db = require("../db");
const { verifierAuth } = require("../middleware/auth");
const { formaterReponseColis, genererTokenSecurise } = require("../services/colisFormatter");

const router = express.Router();

// Rate limiter pour le partage public : 30 requêtes par minute
const partageLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // 30 requêtes max
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Limite de requêtes atteinte pour la consultation publique. Veuillez patienter une minute."
  }
});

/**
 * GET /api/mon-colis
 * Retourne uniquement les colis du client connecté (401 si non connecté)
 * Supporte le paramètre optionnel ?tracking=XXX pour filtrer un colis spécifique du client
 */
router.get("/mon-colis", verifierAuth, (req, res) => {
  try {
    const clientId = req.user.id;
    const requestedTracking = req.query.tracking ? String(req.query.tracking).trim() : null;

    let query = "SELECT * FROM colis WHERE client_id = ? ORDER BY id DESC";
    let params = [clientId];

    if (requestedTracking) {
      query = "SELECT * FROM colis WHERE client_id = ? AND tracking = ?";
      params = [clientId, requestedTracking];
    }

    const rows = db.prepare(query).all(...params);

    if (requestedTracking && rows.length === 0) {
      // Si le client demande un numéro spécifique qui ne lui appartient pas : 404
      return res.status(404).json({
        success: false,
        message: "Expédition introuvable ou vous n'avez pas l'autorisation d'y accéder."
      });
    }

    // Récupérer la liste de tous les numéros de colis du client (pour le sélecteur / menu déroulant)
    const allClientColis = db.prepare("SELECT tracking, navire, depart_nom, arrivee_nom FROM colis WHERE client_id = ? ORDER BY id DESC").all(clientId);
    const trackingList = allClientColis.map(c => ({
      tracking: c.tracking,
      navire: c.navire,
      trajet: `${c.depart_nom} → ${c.arrivee_nom}`
    }));

    if (rows.length === 0) {
      return res.json({
        success: true,
        message: "Aucun colis n'est associé à ton compte.",
        colis: null,
        liste_colis: []
      });
    }

    // Si on a récupéré les colis, on sélectionne le premier (ou celui filtré)
    const colisSelectionne = formaterReponseColis(rows[0], false);

    return res.json({
      success: true,
      colis: colisSelectionne,
      liste_colis: trackingList,
      total_colis_client: trackingList.length
    });
  } catch (err) {
    console.error("Erreur GET /api/mon-colis:", err);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la récupération de votre suivi. Veuillez réessayer."
    });
  }
});

/**
 * GET /api/partage?token=XXX
 * Consultation publique d'un seul colis en lecture seule
 * Sans données personnelles (pas d'email, pas de bouton partager, etc.)
 */
router.get("/partage", partageLimiter, (req, res) => {
  try {
    const token = req.query.token;

    if (!token || typeof token !== "string" || token.trim().length === 0) {
      return res.status(404).json({
        success: false,
        message: "Lien invalide ou expiré."
      });
    }

    const row = db.prepare("SELECT * FROM colis WHERE token_partage = ?").get(token.trim());

    if (!row) {
      return res.status(404).json({
        success: false,
        message: "Lien invalide ou expiré."
      });
    }

    // Formatage en mode partage (lecture seule, pas d'email, pas de client_id)
    const colisPartage = formaterReponseColis(row, true);

    return res.json({
      success: true,
      colis: colisPartage,
      lecture_seule: true
    });
  } catch (err) {
    console.error("Erreur GET /api/partage:", err);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur lors du chargement du lien de partage. Veuillez réessayer."
    });
  }
});

/**
 * POST /api/colis/:id/regenerer-partage
 * Permet au propriétaire du colis (ou à l'admin) de générer un nouveau token de partage
 * L'ancien lien devient immédiatement invalide.
 */
router.post("/colis/:id/regenerer-partage", verifierAuth, (req, res) => {
  try {
    const colisId = Number(req.params.id);
    const userId = req.user.id;
    const userRole = req.user.role;

    if (!colisId || isNaN(colisId)) {
      return res.status(400).json({ success: false, message: "Identifiant de colis invalide." });
    }

    // Vérifier que le colis existe et appartient à l'utilisateur (sauf si admin)
    const colis = db.prepare("SELECT * FROM colis WHERE id = ?").get(colisId);
    if (!colis) {
      return res.status(404).json({ success: false, message: "Colis introuvable." });
    }

    if (colis.client_id !== userId && userRole !== "admin") {
      return res.status(404).json({ success: false, message: "Colis introuvable ou accès non autorisé." });
    }

    const nouveauToken = genererTokenSecurise();
    db.prepare("UPDATE colis SET token_partage = ?, mis_a_jour_le = datetime('now') WHERE id = ?")
      .run(nouveauToken, colisId);

    console.log(`[PARTAGE-LOG] Token régénéré pour le colis ${colis.tracking} (ID: ${colisId}) par User ID ${userId}`);

    return res.json({
      success: true,
      message: "Nouveau lien de partage généré. L'ancien lien est désormais invalide.",
      token_partage: nouveauToken
    });
  } catch (err) {
    console.error("Erreur régénération partage:", err);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la régénération du lien. Veuillez réessayer."
    });
  }
});

module.exports = router;
