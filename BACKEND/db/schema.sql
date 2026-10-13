-- ===================================================
-- SCHEMA SQLITE - HERVE TRANSIT SUIVI DE COLIS
-- ===================================================

CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    mot_de_passe_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'client' CHECK(role IN ('client', 'admin')),
    cree_le TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS colis (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL,
    tracking TEXT UNIQUE NOT NULL,
    navire TEXT NOT NULL DEFAULT 'Hervé Carrier I',
    mode TEXT NOT NULL DEFAULT 'Maritime',
    etat TEXT NOT NULL DEFAULT 'En transit',
    position TEXT NOT NULL DEFAULT 'En mer',
    eta TEXT NOT NULL,
    progression INTEGER NOT NULL DEFAULT 0,
    depart_nom TEXT NOT NULL,
    depart_lat REAL NOT NULL,
    depart_lng REAL NOT NULL,
    arrivee_nom TEXT NOT NULL,
    arrivee_lat REAL NOT NULL,
    arrivee_lng REAL NOT NULL,
    actuelle_lat REAL NOT NULL,
    actuelle_lng REAL NOT NULL,
    parcouru INTEGER NOT NULL DEFAULT 0,
    restant INTEGER NOT NULL DEFAULT 0,
    total INTEGER NOT NULL DEFAULT 0,
    vitesse INTEGER DEFAULT NULL,
    heures_ecoulees INTEGER NOT NULL DEFAULT 0,
    heures_restantes INTEGER NOT NULL DEFAULT 0,
    nb_colis INTEGER NOT NULL DEFAULT 1,
    type TEXT NOT NULL DEFAULT 'Conteneur 40'' HC',
    conteneur TEXT NOT NULL,
    token_partage TEXT UNIQUE NOT NULL,
    mis_a_jour_le TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY(client_id) REFERENCES clients(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS evenements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    colis_id INTEGER NOT NULL,
    titre TEXT NOT NULL,
    date TEXT NOT NULL,
    FOREIGN KEY(colis_id) REFERENCES colis(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_colis_client_id ON colis(client_id);
CREATE INDEX IF NOT EXISTS idx_colis_tracking ON colis(tracking);
CREATE INDEX IF NOT EXISTS idx_colis_token_partage ON colis(token_partage);
CREATE INDEX IF NOT EXISTS idx_evenements_colis_id ON evenements(colis_id);
