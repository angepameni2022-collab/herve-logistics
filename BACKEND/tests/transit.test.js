const assert = require("assert");
const http = require("http");
const app = require("../server");
const db = require("../db");
const seed = require("../db/seed");
const { calculateMaritimeProgress, haversineDistance } = require("../services/maritimeCalculator");

let server;
let baseUrl;

function requete(options, donnees = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(baseUrl + options.path, options, (res) => {
      let corps = "";
      res.on("data", (chunk) => (corps += chunk));
      res.on("end", () => {
        let json = null;
        try {
          json = JSON.parse(corps);
        } catch (e) {}
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data: json,
          text: corps
        });
      });
    });

    req.on("error", reject);

    if (donnees) {
      req.write(typeof donnees === "string" ? donnees : JSON.stringify(donnees));
    }
    req.end();
  });
}

function extraireCookieSession(headers) {
  const setCookie = headers["set-cookie"];
  if (!setCookie) return null;
  const cookieStr = Array.isArray(setCookie) ? setCookie[0] : setCookie;
  return cookieStr.split(";")[0];
}

async function runTests() {
  console.log("=================================================");
  console.log("🧪 SUITE DE TESTS COMPLÈTE - HERVÉ TRANSIT");
  console.log("=================================================");

  // 1. Initialisation de la base de données de test
  await seed();

  // Démarrer le serveur sur un port libre
  server = app.listen(0);
  const port = server.address().port;
  baseUrl = `http://localhost:${port}`;
  console.log(`📡 Serveur de test démarré sur ${baseUrl}`);

  try {
    // ----------------------------------------------------
    // TEST 1 : Calculs maritimes Haversine
    // ----------------------------------------------------
    console.log("\n[TEST 1] Vérification du calculateur maritime Haversine...");
    const distBusanMalacca = haversineDistance(35.10, 129.04, 2.19, 102.25);
    assert(distBusanMalacca > 4000 && distBusanMalacca < 5000, "Distance Busan-Malacca invalide");

    const calculMalacca = calculateMaritimeProgress(
      2.19, 102.25,
      { lat: 35.10, lng: 129.04 },
      { lat: 4.05, lng: 9.70 },
      35
    );
    assert(calculMalacca.progression >= 20 && calculMalacca.progression <= 30, "Progression au détroit de Malacca incorrecte");
    assert(calculMalacca.restant > 0, "Distance restante non calculée");
    assert(calculMalacca.heuresRestantes > 0, "Heures restantes non calculées");
    console.log(`✅ Calcul Haversine validé : progression ${calculMalacca.progression}%, ${calculMalacca.restant} km restants, ${calculMalacca.heuresRestantes}h restantes.`);

    // ----------------------------------------------------
    // TEST 2 : Visiteur non connecté (401 sur /api/mon-colis)
    // ----------------------------------------------------
    console.log("\n[TEST 2] Accès non authentifié à /api/mon-colis...");
    const resNonAuth = await requete({ path: "/api/mon-colis", method: "GET" });
    assert.strictEqual(resNonAuth.status, 401, "Le visiteur non connecté doit recevoir un code 401");
    console.log("✅ Code 401 correctement retourné pour un visiteur non connecté.");

    // ----------------------------------------------------
    // TEST 3 : Authentification & message d'erreur identique
    // ----------------------------------------------------
    console.log("\n[TEST 3] Connexion & sécurité (messages d'erreur identiques)...");
    const resEmailFaux = await requete(
      { path: "/api/connexion", method: "POST", headers: { "Content-Type": "application/json" } },
      { email: "inconnu@test.com", mot_de_passe: "Nimportequoi123" }
    );
    assert.strictEqual(resEmailFaux.status, 401);

    const resMdpFaux = await requete(
      { path: "/api/connexion", method: "POST", headers: { "Content-Type": "application/json" } },
      { email: "client@hervetransit.com", mot_de_passe: "FauxMotDePasse123" }
    );
    assert.strictEqual(resMdpFaux.status, 401);
    assert.strictEqual(
      resEmailFaux.data.message,
      resMdpFaux.data.message,
      "Le message d'erreur doit être STRICTEMENT identique entre email inconnu et mauvais mot de passe"
    );
    console.log(`✅ Message d'erreur uniforme vérifié : "${resMdpFaux.data.message}"`);

    // Connexion réussie Client démo
    const resConnexionClient = await requete(
      { path: "/api/connexion", method: "POST", headers: { "Content-Type": "application/json" } },
      { email: "client@hervetransit.com", mot_de_passe: "Client123!Transit" }
    );
    assert.strictEqual(resConnexionClient.status, 200, "La connexion client doit réussir");
    const cookieClient = extraireCookieSession(resConnexionClient.headers);
    assert(cookieClient && cookieClient.startsWith("token_session="), "Le cookie httpOnly de session doit être présent");
    console.log("✅ Connexion client réussie avec session HttpOnly.");

    // Connexion réussie Client Tiers
    const resConnexionTiers = await requete(
      { path: "/api/connexion", method: "POST", headers: { "Content-Type": "application/json" } },
      { email: "autre.client@hervetransit.com", mot_de_passe: "Autre123!Secret" }
    );
    assert.strictEqual(resConnexionTiers.status, 200);
    const cookieTiers = extraireCookieSession(resConnexionTiers.headers);

    // ----------------------------------------------------
    // TEST 4 : Isolation des données & Accès croisé entre clients
    // ----------------------------------------------------
    console.log("\n[TEST 4] Test d'étanchéité & accès croisé entre clients...");
    const resColisClient = await requete({
      path: "/api/mon-colis",
      method: "GET",
      headers: { Cookie: cookieClient }
    });
    assert.strictEqual(resColisClient.status, 200);
    assert.strictEqual(resColisClient.data.colis.tracking, "HVTL-2026-884920", "Doit retourner le colis du client");

    // Tentative du client de voir le colis d'un autre via le paramètre de filtrage
    const resAccesCroise = await requete({
      path: "/api/mon-colis?tracking=HVTL-TIERS-999999",
      method: "GET",
      headers: { Cookie: cookieClient }
    });
    assert.strictEqual(resAccesCroise.status, 404, "L'accès au colis d'un autre client DOIT renvoyer une erreur 404");
    console.log("✅ Étanchéité vérifiée : tentative d'accès croisé rejetée avec 404.");

    // ----------------------------------------------------
    // TEST 5 : Partage public en lecture seule & Régénération
    // ----------------------------------------------------
    console.log("\n[TEST 5] Fonctionnalités de partage & régénération de token...");
    const colisRow = db.prepare("SELECT * FROM colis WHERE tracking = 'HVTL-2026-419727'").get();
    const ancienToken = colisRow.token_partage;

    // Consultation publique par token
    const resPartage = await requete({
      path: `/api/partage?token=${ancienToken}`,
      method: "GET"
    });
    assert.strictEqual(resPartage.status, 200);
    assert.strictEqual(resPartage.data.lecture_seule, true);
    assert.strictEqual(resPartage.data.colis.email, undefined, "L'email ne doit jamais être présent en partage");
    assert.strictEqual(resPartage.data.colis.client_id, undefined, "Le client_id ne doit pas être exposé");
    console.log("✅ Lecture seule validée : pas de données personnelles exposées.");

    // Régénération du token de partage
    const resRegen = await requete({
      path: `/api/colis/${colisRow.id}/regenerer-partage`,
      method: "POST",
      headers: { Cookie: cookieClient }
    });
    assert.strictEqual(resRegen.status, 200);
    const nouveauToken = resRegen.data.token_partage;
    assert.notStrictEqual(ancienToken, nouveauToken, "Le nouveau token doit être différent de l'ancien");

    // L'ancien token doit maintenant renvoyer 404
    const resAncienInvalide = await requete({
      path: `/api/partage?token=${ancienToken}`,
      method: "GET"
    });
    assert.strictEqual(resAncienInvalide.status, 404);
    assert.strictEqual(resAncienInvalide.data.message, "Lien invalide ou expiré.");

    // Le nouveau token fonctionne
    const resNouveauValide = await requete({
      path: `/api/partage?token=${nouveauToken}`,
      method: "GET"
    });
    assert.strictEqual(resNouveauValide.status, 200);
    console.log("✅ Régénération validée : ancien token invalidé (404), nouveau token actif.");

    // ----------------------------------------------------
    // TEST 6 : Actions Admin & Recalcul automatique
    // ----------------------------------------------------
    console.log("\n[TEST 6] Connexion Admin & mise à jour avec recalcul automatique...");
    const resConnexionAdmin = await requete(
      { path: "/api/connexion", method: "POST", headers: { "Content-Type": "application/json" } },
      { email: "admin@hervetransit.com", mot_de_passe: "Admin123!Herve" }
    );
    assert.strictEqual(resConnexionAdmin.status, 200);
    const cookieAdmin = extraireCookieSession(resConnexionAdmin.headers);

    // Déplacement du navire au large du Cap de Bonne-Espérance (-34.50, 19.50)
    const resPatch = await requete(
      {
        path: `/api/admin/colis/${colisRow.id}`,
        method: "PATCH",
        headers: { "Content-Type": "application/json", Cookie: cookieAdmin }
      },
      {
        position: "Cap de Bonne-Espérance",
        actuelle_lat: -34.50,
        actuelle_lng: 19.50,
        vitesse: 40
      }
    );
    assert.strictEqual(resPatch.status, 200);
    const colisMaj = resPatch.data.colis;
    assert(colisMaj.progression > 60, "La progression au Cap de Bonne-Espérance doit dépasser 60%");
    assert(colisMaj.stats.restant < 8000, "La distance restante doit avoir diminué");
    assert.strictEqual(colisMaj.stats.vitesse, 40);
    console.log(`✅ Mise à jour admin recalculée avec succès : progression=${colisMaj.progression}%, restant=${colisMaj.stats.restant} km.`);

    // ----------------------------------------------------
    // TEST 7 : Rate Limiting (Partage public > 30 requêtes)
    // ----------------------------------------------------
    console.log("\n[TEST 7] Test de limite de débit (Rate Limiting public)...");
    let bloque = false;
    for (let i = 0; i < 35; i++) {
      const res = await requete({ path: `/api/partage?token=${nouveauToken}`, method: "GET" });
      if (res.status === 429) {
        bloque = true;
        break;
      }
    }
    assert.strictEqual(bloque, true, "Le rate limiter doit bloquer après la limite fixée (429)");
    console.log("✅ Limite de débit appliquée avec succès (statut 429).");

    console.log("\n🎉 TOUS LES TESTS SONT PASSÉS AVEC SUCCÈS !");
  } finally {
    server.close();
  }
}

if (require.main === module) {
  runTests()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("\n❌ Échec d'un test :", err);
      if (server) server.close();
      process.exit(1);
    });
}

module.exports = runTests;
