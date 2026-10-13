const bcrypt = require("bcrypt");
const db = require("./index");
const { genererTokenSecurise } = require("../services/colisFormatter");

async function seed() {
  console.log("🌱 Démarrage du seed de la base de données Hervé Transit...");

  // 1. Administrateur
  const adminEmail = "admin@hervetransit.com";
  const adminMdp = "Admin123!Herve";
  const adminHash = await bcrypt.hash(adminMdp, 10);

  const existingAdmin = db.prepare("SELECT id FROM clients WHERE email = ?").get(adminEmail);
  let adminId;
  if (!existingAdmin) {
    const resAdmin = db.prepare(`
      INSERT INTO clients (nom, email, mot_de_passe_hash, role)
      VALUES (?, ?, ?, 'admin')
    `).run("Hervé Administration", adminEmail, adminHash);
    adminId = resAdmin.lastInsertRowid;
    console.log(`✅ Admin créé : ${adminEmail} (Mot de passe: ${adminMdp})`);
  } else {
    adminId = existingAdmin.id;
    console.log(`ℹ️ Admin existant ID: ${adminId}`);
  }

  // 2. Client de démonstration
  const clientEmail = "client@hervetransit.com";
  const clientMdp = "Client123!Transit";
  const clientHash = await bcrypt.hash(clientMdp, 10);

  const existingClient = db.prepare("SELECT id FROM clients WHERE email = ?").get(clientEmail);
  let clientId;
  if (!existingClient) {
    const resClient = db.prepare(`
      INSERT INTO clients (nom, email, mot_de_passe_hash, role)
      VALUES (?, ?, ?, 'client')
    `).run("Société Import-Export Douala", clientEmail, clientHash);
    clientId = resClient.lastInsertRowid;
    console.log(`✅ Client démo créé : ${clientEmail} (Mot de passe: ${clientMdp})`);
  } else {
    clientId = existingClient.id;
    console.log(`ℹ️ Client démo existant ID: ${clientId}`);
  }

  // 3. Colis HVTL-2026-419727 (Corée du Sud -> Cameroun, 22 %, détroit de Malacca)
  const trackingNumber = "HVTL-2026-419727";
  const existingColis = db.prepare("SELECT id FROM colis WHERE tracking = ?").get(trackingNumber);

  let colisId;
  if (!existingColis) {
    const tokenPartage = genererTokenSecurise();
    const insertColis = db.prepare(`
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
    `);

    // Paramètres demandés : Corée du Sud -> Cameroun, 22 %, détroit de Malacca
    const resColis = insertColis.run(
      clientId,
      trackingNumber,
      "Hervé Carrier I",
      "Maritime",
      "En mer",
      "Détroit de Malacca",
      "28 mai 2026",
      22,
      "Busan, Corée du Sud",
      35.10,
      129.04,
      "Douala, Cameroun",
      4.05,
      9.70,
      2.19, // Malacca
      102.25,
      4270,
      15142,
      19412,
      35,
      122,
      432,
      1,
      "Conteneur 40' HC",
      "MSKU-7894210",
      tokenPartage
    );
    colisId = resColis.lastInsertRowid;
    console.log(`✅ Colis ${trackingNumber} créé (ID: ${colisId}, Token: ${tokenPartage})`);

    // 4. Événements de suivi
    const insertEvent = db.prepare(`
      INSERT INTO evenements (colis_id, titre, date) VALUES (?, ?, ?)
    `);

    insertEvent.run(colisId, "Prise en charge et empotage au port de Busan", "10 mai 2026 - 08:30");
    insertEvent.run(colisId, "Formalités douanières export validées", "11 mai 2026 - 14:15");
    insertEvent.run(colisId, "Départ du navire du port de Busan", "12 mai 2026 - 19:00");
    insertEvent.run(colisId, "Passage du détroit de Malacca", "18 mai 2026 - 11:45");
    console.log("✅ 4 événements de suivi créés pour le colis");
  } else {
    console.log(`ℹ️ Colis ${trackingNumber} déjà présent en base`);
  }

  // 5. Deuxième colis pour tester le menu déroulant chez le client démo
  const trackingNumber2 = "HVTL-2026-884920";
  const existingColis2 = db.prepare("SELECT id FROM colis WHERE tracking = ?").get(trackingNumber2);
  if (!existingColis2) {
    const tokenPartage2 = genererTokenSecurise();
    const resColis2 = db.prepare(`
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
      clientId,
      trackingNumber2,
      "Hervé Express II",
      "Maritime",
      "En approche",
      "Golfe de Guinée",
      "18 mai 2026",
      92,
      "Busan, Corée du Sud",
      35.10,
      129.04,
      "Douala, Cameroun",
      4.05,
      9.70,
      1.50,
      7.80,
      17860,
      1552,
      19412,
      38,
      480,
      41,
      2,
      "Conteneur 20' Dry",
      "CMAU-4521099",
      tokenPartage2
    );

    db.prepare("INSERT INTO evenements (colis_id, titre, date) VALUES (?, ?, ?)")
      .run(resColis2.lastInsertRowid, "Départ de Corée", "01 mai 2026 - 10:00");
    db.prepare("INSERT INTO evenements (colis_id, titre, date) VALUES (?, ?, ?)")
      .run(resColis2.lastInsertRowid, "Approche des eaux camerounaises", "15 mai 2026 - 16:20");
    console.log(`✅ Colis supplémentaire ${trackingNumber2} créé pour le client démo`);
  }

  // 6. Client tiers pour tests d'isolation/accès croisé
  const autreClientEmail = "autre.client@hervetransit.com";
  const autreClientHash = await bcrypt.hash("Autre123!Secret", 10);
  const existingAutre = db.prepare("SELECT id FROM clients WHERE email = ?").get(autreClientEmail);
  if (!existingAutre) {
    const resAutre = db.prepare(`
      INSERT INTO clients (nom, email, mot_de_passe_hash, role)
      VALUES (?, ?, ?, 'client')
    `).run("Société Tiers Transit Kribi", autreClientEmail, autreClientHash);

    const tokenAutre = genererTokenSecurise();
    db.prepare(`
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
      resAutre.lastInsertRowid,
      "HVTL-TIERS-999999",
      "Pacific Leader",
      "Maritime",
      "Au port",
      "Busan Port",
      "30 juin 2026",
      5,
      "Busan, Corée du Sud",
      35.10,
      129.04,
      "Kribi, Cameroun",
      2.93,
      9.91,
      34.80,
      128.90,
      500,
      18900,
      19400,
      30,
      12,
      630,
      1,
      "Conteneur 40' HC",
      "TIER-1122334",
      tokenAutre
    );
    console.log("✅ Client tiers avec colis indépendant créé pour les tests d'isolation");
  }

  console.log("✨ Initialisation (Seed) terminée avec succès !");
}

if (require.main === module) {
  seed()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("❌ Erreur pendant le seed :", err);
      process.exit(1);
    });
}

module.exports = seed;
