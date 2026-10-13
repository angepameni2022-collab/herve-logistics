const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");
const { verifierAdmin } = require("../middleware/auth");
const {
  clientCreateSchema,
  colisCreateSchema,
  colisPatchSchema,
  evenementCreateSchema
} = require("../validators/schemas");
const { calculateMaritimeProgress } = require("../services/maritimeCalculator");
const { genererTokenSecurise, formaterReponseColis } = require("../services/colisFormatter");

const router = express.Router();

// Appliquer le middleware d'administration à toutes les routes admin
router.use(verifierAdmin);

/**
 * Journalisation des actions d'administration
 */
function journaliserAdmin(action, adminId, req, details = {}) {
  const ip = req.ip || req.connection.remoteAddress || "inconnue";
  const date = new Date().toISOString();
  console.log(`[ADMIN-AUDIT] ${date} | Admin: ${adminId} | Action: ${action} | IP: ${ip} | Details:`, JSON.stringify(details));
}

/**
 * POST /api/admin/clients
 * Création d'un nouveau client par un administrateur
 */
router.post("/clients", async (req, res) => {
  try {
    const parseResult = clientCreateSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: "Données de client invalides",
        erreurs: parseResult.error.format()
      });
    }

    const { nom, email, mot_de_passe, role } = parseResult.data;

    const exist = db.prepare("SELECT id FROM clients WHERE email = ?").get(email);
    if (exist) {
      return res.status(409).json({ success: false, message: "Un compte avec cette adresse email existe déjà." });
    }

    const hash = await bcrypt.hash(mot_de_passe, 10);
    const result = db.prepare(`
      INSERT INTO clients (nom, email, mot_de_passe_hash, role)
      VALUES (?, ?, ?, ?)
    `).run(nom, email, hash, role || "client");

    journaliserAdmin("CREATION_CLIENT", req.user.id, req, { clientId: result.lastInsertRowid, email });

    return res.status(201).json({
      success: true,
      message: "Client créé avec succès.",
      client: {
        id: result.lastInsertRowid,
        nom,
        email,
        role: role || "client"
      }
    });
  } catch (err) {
    console.error("Erreur admin création client:", err);
    return res.status(500).json({ success: false, message: "Erreur serveur lors de la création du client." });
  }
});

/**
 * POST /api/admin/colis
 * Création d'un colis avec calcul automatique des distances et temps
 */
router.post("/colis", (req, res) => {
  try {
    const parseResult = colisCreateSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: "Données de colis invalides",
        erreurs: parseResult.error.format()
      });
    }

    const data = parseResult.data;

    // Vérifier l'existence du client
    const client = db.prepare("SELECT id FROM clients WHERE id = ?").get(data.client_id);
    if (!client) {
      return res.status(404).json({ success: false, message: "Client associé introuvable." });
    }

    // Vérifier l'unicité du tracking
    const existTracking = db.prepare("SELECT id FROM colis WHERE tracking = ?").get(data.tracking);
    if (existTracking) {
      return res.status(409).json({ success: false, message: "Ce numéro de tracking est déjà utilisé." });
    }

    // Calcul Haversine maritime automatique
    const calculs = calculateMaritimeProgress(
      data.actuelle_lat,
      data.actuelle_lng,
      { lat: data.depart_lat, lng: data.depart_lng, nom: data.depart_nom },
      { lat: data.arrivee_lat, lng: data.arrivee_lng, nom: data.arrivee_nom },
      data.vitesse
    );

    const tokenPartage = genererTokenSecurise();

    const result = db.prepare(`
      INSERT INTO colis (
        client_id, tracking, navire, mode, etat, position, eta, progression,
        depart_nom, depart_lat, depart_lng,
        arrivee_nom, arrivee_lat, arrivee_lng,
        actuelle_lat, actuelle_lng,
        parcouru, restant, total, vitesse,
        heures_ecoulees, heures_restantes, nb_colis, type, conteneur, token_partage
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?,
        ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?
      )
    `).run(
      data.client_id,
      data.tracking,
      data.navire,
      data.mode,
      data.etat,
      data.position,
      data.eta,
      calculs.progression,
      data.depart_nom,
      data.depart_lat,
      data.depart_lng,
      data.arrivee_nom,
      data.arrivee_lat,
      data.arrivee_lng,
      data.actuelle_lat,
      data.actuelle_lng,
      calculs.parcouru,
      calculs.restant,
      calculs.total,
      data.vitesse ?? null,
      data.heures_ecoulees,
      calculs.heuresRestantes,
      data.nb_colis,
      data.type,
      data.conteneur,
      tokenPartage
    );

    journaliserAdmin("CREATION_COLIS", req.user.id, req, {
      colisId: result.lastInsertRowid,
      tracking: data.tracking
    });

    const newRow = db.prepare("SELECT * FROM colis WHERE id = ?").get(result.lastInsertRowid);
    return res.status(201).json({
      success: true,
      message: "Colis créé avec succès et distances calculées.",
      colis: formaterReponseColis(newRow, false)
    });
  } catch (err) {
    console.error("Erreur admin création colis:", err);
    return res.status(500).json({ success: false, message: "Erreur serveur lors de la création du colis." });
  }
});

/**
 * PATCH /api/admin/colis/:id
 * Mise à jour de la position, de la vitesse ou de l'état d'un colis avec recalcul immédiat
 */
router.patch("/colis/:id", (req, res) => {
  try {
    const colisId = Number(req.params.id);
    if (!colisId || isNaN(colisId)) {
      return res.status(400).json({ success: false, message: "Identifiant de colis invalide." });
    }

    const colis = db.prepare("SELECT * FROM colis WHERE id = ?").get(colisId);
    if (!colis) {
      return res.status(404).json({ success: false, message: "Colis introuvable." });
    }

    const parseResult = colisPatchSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: "Champs invalides pour la mise à jour",
        erreurs: parseResult.error.format()
      });
    }

    const updates = parseResult.data;

    // Déterminer la nouvelle latitude/longitude et vitesse
    const nouvelleLat = updates.actuelle_lat !== undefined ? updates.actuelle_lat : colis.actuelle_lat;
    const nouvelleLng = updates.actuelle_lng !== undefined ? updates.actuelle_lng : colis.actuelle_lng;
    const nouvelleVitesse = updates.vitesse !== undefined ? updates.vitesse : colis.vitesse;

    // Recalculer le trajet maritime Haversine si la position ou la vitesse change
    let recalcul = null;
    if (
      updates.actuelle_lat !== undefined ||
      updates.actuelle_lng !== undefined ||
      updates.vitesse !== undefined
    ) {
      recalcul = calculateMaritimeProgress(
        nouvelleLat,
        nouvelleLng,
        { lat: colis.depart_lat, lng: colis.depart_lng, nom: colis.depart_nom },
        { lat: colis.arrivee_lat, lng: colis.arrivee_lng, nom: colis.arrivee_nom },
        nouvelleVitesse
      );
    }

    const champsToUpdate = {
      etat: updates.etat !== undefined ? updates.etat : colis.etat,
      position: updates.position !== undefined ? updates.position : colis.position,
      navire: updates.navire !== undefined ? updates.navire : colis.navire,
      eta: updates.eta !== undefined ? updates.eta : colis.eta,
      actuelle_lat: nouvelleLat,
      actuelle_lng: nouvelleLng,
      vitesse: nouvelleVitesse,
      heures_ecoulees: updates.heures_ecoulees !== undefined ? updates.heures_ecoulees : colis.heures_ecoulees,
      parcouru: recalcul ? recalcul.parcouru : colis.parcouru,
      restant: recalcul ? recalcul.restant : colis.restant,
      total: recalcul ? recalcul.total : colis.total,
      progression: recalcul ? recalcul.progression : colis.progression,
      heures_restantes: recalcul ? recalcul.heuresRestantes : colis.heures_restantes
    };

    db.prepare(`
      UPDATE colis SET
        etat = ?, position = ?, navire = ?, eta = ?,
        actuelle_lat = ?, actuelle_lng = ?, vitesse = ?,
        heures_ecoulees = ?, parcouru = ?, restant = ?,
        total = ?, progression = ?, heures_restantes = ?,
        mis_a_jour_le = datetime('now')
      WHERE id = ?
    `).run(
      champsToUpdate.etat,
      champsToUpdate.position,
      champsToUpdate.navire,
      champsToUpdate.eta,
      champsToUpdate.actuelle_lat,
      champsToUpdate.actuelle_lng,
      champsToUpdate.vitesse,
      champsToUpdate.heures_ecoulees,
      champsToUpdate.parcouru,
      champsToUpdate.restant,
      champsToUpdate.total,
      champsToUpdate.progression,
      champsToUpdate.heures_restantes,
      colisId
    );

    journaliserAdmin("MISE_A_JOUR_COLIS", req.user.id, req, {
      colisId,
      champsModifies: Object.keys(updates),
      recalcul: !!recalcul
    });

    const updatedRow = db.prepare("SELECT * FROM colis WHERE id = ?").get(colisId);
    return res.json({
      success: true,
      message: "Colis mis à jour et métriques recalculées avec succès.",
      colis: formaterReponseColis(updatedRow, false)
    });
  } catch (err) {
    console.error("Erreur admin mise à jour colis:", err);
    return res.status(500).json({ success: false, message: "Erreur serveur lors de la mise à jour du colis." });
  }
});

/**
 * POST /api/admin/colis/:id/evenements
 * Ajout d'une étape ou d'un événement d'historique
 */
router.post("/colis/:id/evenements", (req, res) => {
  try {
    const colisId = Number(req.params.id);
    if (!colisId || isNaN(colisId)) {
      return res.status(400).json({ success: false, message: "Identifiant de colis invalide." });
    }

    const colis = db.prepare("SELECT id FROM colis WHERE id = ?").get(colisId);
    if (!colis) {
      return res.status(404).json({ success: false, message: "Colis introuvable." });
    }

    const parseResult = evenementCreateSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: "Données d'événement invalides",
        erreurs: parseResult.error.format()
      });
    }

    const { titre, date } = parseResult.data;

    const result = db.prepare("INSERT INTO evenements (colis_id, titre, date) VALUES (?, ?, ?)")
      .run(colisId, titre, date);

    journaliserAdmin("AJOUT_EVENEMENT", req.user.id, req, { colisId, titre, date });

    return res.status(201).json({
      success: true,
      message: "Événement ajouté avec succès.",
      evenement: {
        id: result.lastInsertRowid,
        colis_id: colisId,
        titre,
        date
      }
    });
  } catch (err) {
    console.error("Erreur admin ajout événement:", err);
    return res.status(500).json({ success: false, message: "Erreur serveur lors de l'ajout de l'événement." });
  }
});

module.exports = router;
