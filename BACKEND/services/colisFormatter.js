const crypto = require("crypto");
const db = require("../db");
const { calculateMaritimeProgress } = require("./maritimeCalculator");

// Points de passage par défaut pour l'affichage cartographique frontend
const DEFAULT_POINTS_PASSAGE = [
  { nom: "Busan, Corée du Sud (Départ)", lat: 35.10, lng: 129.04, statut: "franchi" },
  { nom: "Mer de Chine méridionale", lat: 10.00, lng: 110.00, statut: "franchi" },
  { nom: "Détroit de Malacca", lat: 2.19, lng: 102.25, statut: "franchi" },
  { nom: "Océan Indien", lat: -4.21, lng: 55.45, statut: "a_venir" },
  { nom: "Cap de Bonne-Espérance", lat: -34.50, lng: 19.50, statut: "a_venir" },
  { nom: "Golfe de Guinée", lat: 1.00, lng: 7.00, statut: "a_venir" },
  { nom: "Douala, Cameroun (Arrivée)", lat: 4.05, lng: 9.70, statut: "a_venir" }
];

/**
 * Formate un enregistrement colis de la base SQLite vers la structure exacte EXEMPLE demandée
 * @param {object} row - Enregistrement SQL de colis
 * @param {boolean} estPartage - Si true, omet les données personnelles client
 */
function formaterReponseColis(row, estPartage = false) {
  // Récupérer les événements associés
  const eventsRows = db.prepare("SELECT titre, date FROM evenements WHERE colis_id = ? ORDER BY id ASC").all(row.id);

  // Déterminer le statut des points de passage en fonction de la progression
  const points = DEFAULT_POINTS_PASSAGE.map((pt, idx) => {
    // Si premier = départ, si dernier = arrivée
    const ratio = idx / (DEFAULT_POINTS_PASSAGE.length - 1);
    const seuilPct = ratio * 100;
    return {
      nom: pt.nom,
      lat: pt.lat,
      lng: pt.lng,
      statut: (row.progression >= seuilPct || (idx === 0)) ? "franchi" : "a_venir"
    };
  });

  const res = {
    tracking: row.tracking,
    navire: row.navire,
    mode: row.mode,
    etat: row.etat,
    position: row.position,
    eta: row.eta,
    progression: Number(row.progression),
    depart: {
      nom: row.depart_nom,
      lat: Number(row.depart_lat),
      lng: Number(row.depart_lng)
    },
    arrivee: {
      nom: row.arrivee_nom,
      lat: Number(row.arrivee_lat),
      lng: Number(row.arrivee_lng)
    },
    actuelle: {
      lat: Number(row.actuelle_lat),
      lng: Number(row.actuelle_lng)
    },
    points_passage: points,
    stats: {
      parcouru: Number(row.parcouru),
      restant: Number(row.restant),
      total: Number(row.total),
      vitesse: row.vitesse !== null && row.vitesse !== undefined ? Number(row.vitesse) : null,
      heures_ecoulees: Number(row.heures_ecoulees),
      heures_restantes: Number(row.heures_restantes),
      nb_colis: Number(row.nb_colis),
      type: row.type,
      conteneur: row.conteneur
    },
    evenements: eventsRows.map(e => ({
      titre: e.titre,
      date: e.date
    })),
    token_partage: estPartage ? undefined : row.token_partage,
    colis_id: row.id,
    mis_a_jour_le: row.mis_a_jour_le
  };

  if (!estPartage) {
    res.client_id = row.client_id;
  }

  return res;
}

/**
 * Génère un token aléatoire sécurisé de 32 octets (64 caractères hexadécimaux)
 */
function genererTokenSecurise() {
  return crypto.randomBytes(32).toString("hex");
}

module.exports = {
  formaterReponseColis,
  genererTokenSecurise,
  DEFAULT_POINTS_PASSAGE
};
