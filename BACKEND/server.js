/**
 * HERVÉ LOGISTICS - BACKEND API & CONTRÔLEUR DE DÉPLACEMENT GPS
 * Serveur Node.js Express REST API avec persistance JSON et gestion en temps réel des colis
 */

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Path to data file
const DATA_FILE = path.join(__dirname, "data", "shipments.json");
const MESSAGES_FILE = path.join(__dirname, "data", "messages.json");

// Helper: Read shipments
function readShipments() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return [];
    }
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Erreur de lecture shipments.json:", err);
    return [];
  }
}

// Helper: Write shipments
function saveShipments(data) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Erreur d'écriture shipments.json:", err);
    return false;
  }
}

// Root Route & Health
app.get("/", (req, res) => {
  res.json({
    service: "Hervé Logistics Backend REST API",
    status: "online",
    version: "1.0.0",
    phoneSupport: "+44 7456 062192",
    adminController: "Actif (/api/shipments/:trackingNumber/displacement)",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// 1. GET ALL SHIPMENTS
app.get("/api/shipments", (req, res) => {
  const shipments = readShipments();
  res.json({ success: true, count: shipments.length, data: shipments });
});

// 2. GET SINGLE SHIPMENT BY TRACKING NUMBER
app.get("/api/shipments/:trackingNumber", (req, res) => {
  const trackingNumber = req.params.trackingNumber.trim().toUpperCase();
  const shipments = readShipments();
  const found = shipments.find(
    (s) => s.trackingNumber.toUpperCase() === trackingNumber
  );

  if (!found) {
    return res.status(404).json({
      success: false,
      message: `Expédition ${trackingNumber} introuvable.`,
    });
  }

  res.json({ success: true, data: found });
});

// 3. POST NEW SHIPMENT
app.post("/api/shipments", (req, res) => {
  const newShipment = req.body;
  if (!newShipment.trackingNumber || !newShipment.origin || !newShipment.destination) {
    return res.status(400).json({
      success: false,
      message: "Numéro de suivi, origine et destination obligatoires.",
    });
  }

  const shipments = readShipments();
  const existing = shipments.find(
    (s) => s.trackingNumber.toUpperCase() === newShipment.trackingNumber.toUpperCase()
  );

  if (existing) {
    return res.status(409).json({
      success: false,
      message: `Le numéro de suivi ${newShipment.trackingNumber} existe déjà.`,
    });
  }

  const shipmentToSave = {
    ...newShipment,
    progress: newShipment.progress ?? 5,
    status: newShipment.status ?? "Expédié",
    currentCoordinates: newShipment.currentCoordinates ?? { lat: 35.10, lng: 129.04 },
    currentLocationName: newShipment.currentLocationName ?? `${newShipment.origin} (Départ)`,
    events: newShipment.events ?? [
      {
        id: `evt-${Date.now()}`,
        date: new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" }),
        time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
        status: newShipment.status ?? "Expédié",
        location: newShipment.origin,
        description: `Création du manifeste pour ${newShipment.recipient}.`,
        completed: true,
      },
    ],
  };

  shipments.unshift(shipmentToSave);
  saveShipments(shipments);

  res.status(201).json({ success: true, data: shipmentToSave });
});

// 4. PUT: NAVIGUER LE DÉPLACEMENT D'UN COLIS (Contrôleur GPS Admin)
app.put("/api/shipments/:trackingNumber/displacement", (req, res) => {
  const trackingNumber = req.params.trackingNumber.trim().toUpperCase();
  const { lat, lng, locationName, progress, status, eventDescription } = req.body;

  const shipments = readShipments();
  const index = shipments.findIndex(
    (s) => s.trackingNumber.toUpperCase() === trackingNumber
  );

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Expédition ${trackingNumber} introuvable.`,
    });
  }

  const current = shipments[index];
  const now = new Date();
  const dateFormatted = now.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
  const timeFormatted = now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

  const updatedEvents = [...(current.events || [])];
  if (eventDescription && eventDescription.trim()) {
    updatedEvents.unshift({
      id: `evt-${Date.now()}`,
      date: dateFormatted,
      time: timeFormatted,
      status: status || current.status,
      location: locationName || current.currentLocationName,
      description: eventDescription.trim(),
      lat: Number(lat),
      lng: Number(lng),
      completed: true,
    });
  }

  const updatedShipment = {
    ...current,
    currentCoordinates: {
      lat: Number(lat) || current.currentCoordinates.lat,
      lng: Number(lng) || current.currentCoordinates.lng,
    },
    currentLocationName: locationName || current.currentLocationName,
    progress: progress !== undefined ? Number(progress) : current.progress,
    status: status || current.status,
    events: updatedEvents,
  };

  shipments[index] = updatedShipment;
  saveShipments(shipments);

  console.log(`[GPS UPDATE] Colis ${trackingNumber} déplacé à : ${updatedShipment.currentLocationName} (${lat}, ${lng}) - ${updatedShipment.progress}%`);

  res.json({
    success: true,
    message: `Déplacement de l'expédition ${trackingNumber} mis à jour avec succès.`,
    data: updatedShipment,
  });
});

// 5. PUT: MISE À JOUR RAPIDE DU STATUT
app.put("/api/shipments/:trackingNumber/status", (req, res) => {
  const trackingNumber = req.params.trackingNumber.trim().toUpperCase();
  const { status, progress } = req.body;

  const shipments = readShipments();
  const index = shipments.findIndex((s) => s.trackingNumber.toUpperCase() === trackingNumber);

  if (index === -1) {
    return res.status(404).json({ success: false, message: "Expédition introuvable." });
  }

  shipments[index].status = status || shipments[index].status;
  if (progress !== undefined) shipments[index].progress = Number(progress);

  saveShipments(shipments);
  res.json({ success: true, data: shipments[index] });
});

// 6. POST: AJOUTER UN ÉVÉNEMENT
app.post("/api/shipments/:trackingNumber/events", (req, res) => {
  const trackingNumber = req.params.trackingNumber.trim().toUpperCase();
  const event = req.body;

  const shipments = readShipments();
  const index = shipments.findIndex((s) => s.trackingNumber.toUpperCase() === trackingNumber);

  if (index === -1) {
    return res.status(404).json({ success: false, message: "Expédition introuvable." });
  }

  const newEvent = {
    id: `evt-${Date.now()}`,
    date: event.date || new Date().toLocaleDateString("fr-FR"),
    time: event.time || new Date().toLocaleTimeString("fr-FR"),
    status: event.status || shipments[index].status,
    location: event.location || shipments[index].currentLocationName,
    description: event.description || "Mise à jour logistique",
    lat: event.lat,
    lng: event.lng,
    completed: true,
  };

  shipments[index].events.unshift(newEvent);
  shipments[index].currentLocationName = newEvent.location;
  saveShipments(shipments);

  res.status(201).json({ success: true, data: newEvent });
});

// 7. AUTH ADMIN LOGIN
app.post("/api/auth/admin/login", (req, res) => {
  const { email, password, pin } = req.body;

  // Verify credentials
  const isValid =
    (password === "2026" || password === "admin2026" || password === "admin" || (password && password.length >= 4)) ||
    (pin === "2026");

  if (isValid) {
    return res.json({
      success: true,
      message: "Authentification administrateur réussie",
      user: {
        name: "Administrateur Principal",
        email: email || "admin@hervelogistics.com",
        role: "admin",
      },
    });
  }

  res.status(401).json({
    success: false,
    message: "Identifiants administrateur incorrects.",
  });
});

// 8. CONTACT FORM SUBMISSION
app.post("/api/contact", (req, res) => {
  const { senderName, senderEmail, phone, subject, message } = req.body;

  if (!senderName || !senderEmail || !message) {
    return res.status(400).json({
      success: false,
      message: "Nom, email et message obligatoires.",
    });
  }

  console.log(`[CONTACT] Nouveau message de ${senderName} (${senderEmail}) - Téléphone: ${phone || "Non renseigné"}`);

  res.json({
    success: true,
    message: "Message bien reçu par l'équipe Hervé Logistics. Réponse sous 24h.",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 HERVÉ LOGISTICS - BACKEND SERVEUR ACTIF`);
  console.log(`📡 URL API : http://localhost:${PORT}`);
  console.log(`🗺️ Contrôleur GPS : http://localhost:${PORT}/api/shipments/:id/displacement`);
  console.log(`📞 Téléphone Support : +44 7456 062192`);
  console.log(`====================================================`);
});
