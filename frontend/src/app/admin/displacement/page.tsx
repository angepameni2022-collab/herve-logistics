"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useApp } from "@/context/AppContext";
import { Shipment, ShipmentStatus } from "@/data/shipments";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import {
  Navigation,
  Compass,
  Ship,
  MapPin,
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Rewind,
  CheckCircle2,
  ExternalLink,
  Sliders,
  Send,
  Radio,
  FileText,
  AlertCircle,
} from "lucide-react";

// Dynamically import InteractiveLeafletMap with SSR disabled
const InteractiveLeafletMap = dynamic(
  () => import("@/components/tracking/InteractiveLeafletMap"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] bg-white rounded-2xl border border-zinc-200 flex flex-col items-center justify-center text-zinc-500 gap-3">
        <div className="w-10 h-10 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-semibold animate-pulse text-zinc-700">
          Chargement de la carte blanche en direct...
        </span>
      </div>
    ),
  }
);

// Standard Waypoints along the Asia -> Africa maritime route
const PRESET_WAYPOINTS = [
  {
    name: "Port de Busan, Corée du Sud (Départ / Prise en charge)",
    lat: 35.1028,
    lng: 129.0403,
    progress: 5,
    status: "Expédié" as ShipmentStatus,
    desc: "Marchandises embarquées au terminal à conteneurs de Busan. Navire appareillé.",
  },
  {
    name: "Escale Maritime de Shanghai, Chine",
    lat: 31.2304,
    lng: 121.4737,
    progress: 22,
    status: "En transit" as ShipmentStatus,
    desc: "Escale technique au port de Yangshan / Shanghai terminée. Reprise de navigation.",
  },
  {
    name: "Passage Détroit de Malacca / Singapour",
    lat: 1.3521,
    lng: 103.8198,
    progress: 42,
    status: "En transit" as ShipmentStatus,
    desc: "Traversée du détroit de Malacca. Contrôle télématique satellite validé.",
  },
  {
    name: "Océan Indien Central (Haute mer)",
    lat: -4.21,
    lng: 55.45,
    progress: 62,
    status: "En transit" as ShipmentStatus,
    desc: "En navigation hauturière dans l'Océan Indien. Balise AIS active, conditions optimales.",
  },
  {
    name: "Cap de Bonne-Espérance / Afrique du Sud",
    lat: -34.35,
    lng: 18.5,
    progress: 78,
    status: "En transit" as ShipmentStatus,
    desc: "Contournement du Cap de Bonne-Espérance. Entrée dans l'Océan Atlantique Sud.",
  },
  {
    name: "Golfe de Guinée (Approche Cameroun)",
    lat: 1.5,
    lng: 7.2,
    progress: 88,
    status: "En transit" as ShipmentStatus,
    desc: "Entrée dans les eaux territoriales du Golfe de Guinée. Pilotage d'accès réservé.",
  },
  {
    name: "Rade & Port Autonome de Douala (Arrivée quai)",
    lat: 4.0511,
    lng: 9.7025,
    progress: 92,
    status: "Arrivé" as ShipmentStatus,
    desc: "Navire amarré au quai de déchargement terminal conteneurs (DIT) de Douala.",
  },
  {
    name: "Bureau Douane Portuaire de Douala (Dédouanement)",
    lat: 4.052,
    lng: 9.7679,
    progress: 96,
    status: "En transit" as ShipmentStatus,
    desc: "Formalités douanières et vérification des manifestes d'importation en cours.",
  },
  {
    name: "En cours de livraison finale (Dernier kilomètre)",
    lat: 4.065,
    lng: 9.725,
    progress: 98,
    status: "En transit" as ShipmentStatus,
    desc: "Colis chargé sur camionnette de distribution Hervé Logistics. En route vers l'adresse finale.",
  },
  {
    name: "Livré avec accusé de réception (Douala, Cameroun)",
    lat: 4.0511,
    lng: 9.7679,
    progress: 100,
    status: "Livré" as ShipmentStatus,
    desc: "Marchandises remises en mains propres au destinataire contre signature électronique.",
  },
];

export default function AdminDisplacementPage() {
  const { shipments, navigateShipmentDisplacement } = useApp();
  const { showToast } = useToast();

  const [selectedTrackingNum, setSelectedTrackingNum] = useState<string>(
    shipments[0]?.trackingNumber || "HL-2026-000001"
  );

  const currentShipment =
    shipments.find((s) => s.trackingNumber.toUpperCase() === selectedTrackingNum.toUpperCase()) ||
    shipments[0];

  // Displacement controls state
  const [lat, setLat] = useState<number>(currentShipment?.currentCoordinates?.lat ?? 3.5);
  const [lng, setLng] = useState<number>(currentShipment?.currentCoordinates?.lng ?? 78.5);
  const [locationName, setLocationName] = useState<string>(
    currentShipment?.currentLocationName || "Océan Indien Central"
  );
  const [progress, setProgress] = useState<number>(currentShipment?.progress ?? 50);
  const [status, setStatus] = useState<ShipmentStatus>(currentShipment?.status || "En transit");
  const [eventDescription, setEventDescription] = useState<string>("");

  // Simulation mode state
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(3);

  // Sync state when selected shipment changes
  useEffect(() => {
    if (currentShipment) {
      setLat(currentShipment.currentCoordinates?.lat ?? 3.5);
      setLng(currentShipment.currentCoordinates?.lng ?? 78.5);
      setLocationName(currentShipment.currentLocationName || "");
      setProgress(currentShipment.progress || 50);
      setStatus(currentShipment.status || "En transit");
      setEventDescription("");
    }
  }, [selectedTrackingNum]);

  // Handle Autopilot Simulation
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isSimulating) {
      interval = setInterval(() => {
        setCurrentStepIndex((prevIdx) => {
          const nextIdx = (prevIdx + 1) % PRESET_WAYPOINTS.length;
          const step = PRESET_WAYPOINTS[nextIdx];
          setLat(step.lat);
          setLng(step.lng);
          setLocationName(step.name);
          setProgress(step.progress);
          setStatus(step.status);

          navigateShipmentDisplacement(selectedTrackingNum, {
            lat: step.lat,
            lng: step.lng,
            locationName: step.name,
            progress: step.progress,
            status: step.status,
            eventDescription: `[Simulation Live] ${step.desc}`,
          });

          return nextIdx;
        });
      }, 3500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSimulating, selectedTrackingNum]);

  // Apply a preset waypoint
  const handleSelectWaypoint = (index: number) => {
    const step = PRESET_WAYPOINTS[index];
    setCurrentStepIndex(index);
    setLat(step.lat);
    setLng(step.lng);
    setLocationName(step.name);
    setProgress(step.progress);
    setStatus(step.status);
    setEventDescription(step.desc);

    navigateShipmentDisplacement(selectedTrackingNum, {
      lat: step.lat,
      lng: step.lng,
      locationName: step.name,
      progress: step.progress,
      status: step.status,
      eventDescription: step.desc,
    });

    showToast(`✓ Colis déplacé à : ${step.name} (${step.progress}%)`, "success");
  };

  // Step Forward / Backward
  const handleStepChange = (delta: number) => {
    const nextProgress = Math.min(100, Math.max(0, progress + delta));
    setProgress(nextProgress);

    // Estimate coordinates between Busan and Douala based on progress
    const busan = { lat: 35.10, lng: 129.04 };
    const douala = { lat: 4.05, lng: 9.76 };
    const ratio = nextProgress / 100;
    const interpLat = busan.lat + (douala.lat - busan.lat) * ratio;
    const interpLng = busan.lng + (douala.lng - busan.lng) * ratio;

    setLat(parseFloat(interpLat.toFixed(4)));
    setLng(parseFloat(interpLng.toFixed(4)));

    let newStatus: ShipmentStatus = "En transit";
    if (nextProgress === 0) newStatus = "Expédié";
    else if (nextProgress >= 100) newStatus = "Livré";
    else if (nextProgress >= 92) newStatus = "Arrivé";
    setStatus(newStatus);

    navigateShipmentDisplacement(selectedTrackingNum, {
      lat: parseFloat(interpLat.toFixed(4)),
      lng: parseFloat(interpLng.toFixed(4)),
      locationName: `Point de progression ${nextProgress}% (${locationName})`,
      progress: nextProgress,
      status: newStatus,
    });

    showToast(`Progression ajustée à ${nextProgress}%`, "info");
  };

  // Submit manual GPS displacement
  const handleSaveManualDisplacement = (e: React.FormEvent) => {
    e.preventDefault();

    if (!locationName.trim()) {
      showToast("Veuillez renseigner le nom de la localisation.", "error");
      return;
    }

    navigateShipmentDisplacement(selectedTrackingNum, {
      lat: Number(lat),
      lng: Number(lng),
      locationName: locationName.trim(),
      progress: Number(progress),
      status,
      eventDescription: eventDescription.trim() || undefined,
    });

    showToast(`✓ Déplacement du colis ${selectedTrackingNum} enregistré avec succès !`, "success");
    setEventDescription("");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-zinc-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider text-[#DC2626]">
              CONSOLE D&apos;EXPLOITATION LOGISTIQUE & GPS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#09090B]">
            Navigateur de Déplacement des Colis
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 mt-1">
            Pilotez et faites avancer la position géographique de chaque marchandise en temps réel sur la carte blanche.
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setIsSimulating(!isSimulating)}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer w-full sm:w-auto ${
              isSimulating
                ? "bg-amber-500 hover:bg-amber-600 text-white animate-pulse"
                : "bg-zinc-900 hover:bg-black text-white"
            }`}
          >
            {isSimulating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isSimulating ? "Mettre en pause l'Autopilot" : "Lancer Simulation Autopilot"}</span>
          </button>

          <Link
            href={`/track/${selectedTrackingNum}`}
            target="_blank"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-[#DC2626] font-bold text-xs border border-red-200 transition-colors w-full sm:w-auto"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Voir Suivi Client en Direct</span>
          </Link>
        </div>
      </div>

      {/* SÉLECTEUR DE COLIS & INFORMATIONS CLÉS */}
      <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-xs">
        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
          Sélectionnez l&apos;expédition à piloter
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="md:col-span-2">
            <select
              value={selectedTrackingNum}
              onChange={(e) => setSelectedTrackingNum(e.target.value)}
              className="w-full rounded-2xl border-2 border-zinc-200 bg-white py-3 px-4 text-sm font-bold text-zinc-900 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all font-mono"
            >
              {shipments.map((s) => (
                <option key={s.trackingNumber} value={s.trackingNumber}>
                  {s.trackingNumber} — {s.origin} → {s.destination} ({s.status} · {s.progress}% · {s.clientName})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <Badge status={currentShipment?.status || "En transit"} size="md" />
            <div className="text-xs text-zinc-500 font-medium truncate">
              {currentShipment?.sender} ➔ {currentShipment?.recipient}
            </div>
          </div>
        </div>
      </div>

      {/* APERÇU DE LA CARTE BLANCHE EN DIRECT */}
      {currentShipment && (
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 px-2">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#DC2626]" />
              <h2 className="text-sm font-bold text-zinc-800 uppercase tracking-wider">
                Aperçu Cartographique Blanc Temps Réel
              </h2>
            </div>
            <span className="text-xs text-zinc-500">
              Coordonnées actuelles : <b className="font-mono text-zinc-900">{lat}°N, {lng}°E</b> ({progress}%)
            </span>
          </div>

          <InteractiveLeafletMap shipment={{
            ...currentShipment,
            currentCoordinates: { lat, lng },
            currentLocationName: locationName,
            progress,
            status,
          }} />
        </div>
      )}

      {/* PANNEAU DE PILOTAGE DE DÉPLACEMENT (JALONS + FORMULAIRE) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* GAUCHE : JALONS PRÉDÉFINIS ONE-CLICK (7 colonnes) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-[#09090B] flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#DC2626]" />
                Jalons de Navigation & Escales Directes
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Cliquez sur une étape pour y déplacer immédiatement le colis
              </p>
            </div>

            {/* Quick Step Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleStepChange(-10)}
                className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors text-xs font-bold flex items-center gap-1"
                title="Reculer de 10%"
              >
                <Rewind className="w-3.5 h-3.5" />
                <span>-10%</span>
              </button>
              <button
                type="button"
                onClick={() => handleStepChange(+10)}
                className="p-2 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white transition-colors text-xs font-bold flex items-center gap-1 shadow-xs"
                title="Avancer de 10%"
              >
                <span>+10%</span>
                <FastForward className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Liste des 10 Jalons */}
          <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
            {PRESET_WAYPOINTS.map((wp, idx) => {
              const isSelected = Math.abs(progress - wp.progress) < 5;
              return (
                <button
                  key={wp.name}
                  type="button"
                  onClick={() => handleSelectWaypoint(idx)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 group cursor-pointer ${
                    isSelected
                      ? "bg-red-50/80 border-red-300 ring-2 ring-red-200"
                      : "bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                        isSelected
                          ? "bg-[#DC2626] text-white shadow-xs"
                          : "bg-zinc-100 text-zinc-600 group-hover:bg-zinc-200"
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-zinc-900 group-hover:text-[#DC2626] transition-colors truncate">
                        {wp.name}
                      </div>
                      <div className="text-[11px] text-zinc-500 font-mono mt-0.5 truncate">
                        GPS: {wp.lat.toFixed(2)}°, {wp.lng.toFixed(2)}° · {wp.status}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className={`text-xs font-black font-mono px-2.5 py-1 rounded-lg ${
                        isSelected
                          ? "bg-[#DC2626] text-white"
                          : "bg-zinc-100 text-zinc-700"
                      }`}
                    >
                      {wp.progress}%
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* DROITE : FORMULAIRE MANUEL DE DÉPLACEMENT & ÉVÉNEMENT (5 colonnes) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-xs">
          <div className="flex items-center gap-2 border-b border-zinc-100 pb-4 mb-5">
            <Sliders className="w-4 h-4 text-[#DC2626]" />
            <div>
              <h3 className="text-base font-bold text-[#09090B]">
                Contrôle Manuel & Coordonnées
              </h3>
              <p className="text-xs text-zinc-500">
                Ajustez les coordonnées exactes et le statut
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveManualDisplacement} className="space-y-4">
            {/* Curseur de progression */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-zinc-800">
                  Curseur de progression du convoi
                </label>
                <span className="text-sm font-black text-[#DC2626] font-mono">{progress}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setProgress(val);
                  if (val === 100) setStatus("Livré");
                  else if (val >= 92) setStatus("Arrivé");
                  else if (val > 0) setStatus("En transit");
                  else setStatus("Expédié");
                }}
                className="w-full accent-red-600 h-2 bg-zinc-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Ville / Position textuelle */}
            <div>
              <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                Localisation actuelle affichée au client <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="text"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="Ex: En approche du port de Douala"
                className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 px-3.5 text-xs sm:text-sm font-semibold text-zinc-900 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
                required
              />
            </div>

            {/* Latitude & Longitude */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                  Latitude GPS
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={lat}
                  onChange={(e) => setLat(parseFloat(e.target.value) || 0)}
                  className="w-full rounded-xl border border-zinc-200 bg-white py-2 px-3 text-xs sm:text-sm font-mono font-bold text-zinc-900 focus:outline-none focus:border-red-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                  Longitude GPS
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={lng}
                  onChange={(e) => setLng(parseFloat(e.target.value) || 0)}
                  className="w-full rounded-xl border border-zinc-200 bg-white py-2 px-3 text-xs sm:text-sm font-mono font-bold text-zinc-900 focus:outline-none focus:border-red-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Statut officiel */}
            <div>
              <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                Statut officiel de l&apos;expédition
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ShipmentStatus)}
                className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 px-3 text-xs sm:text-sm font-bold text-zinc-900 focus:outline-none focus:border-red-500 transition-all"
              >
                <option value="En attente">En attente (Préparation)</option>
                <option value="Expédié">Expédié (Prise en charge validée)</option>
                <option value="En transit">En transit (Maritime / Aérien)</option>
                <option value="Arrivé">Arrivé (Au port / hub destination)</option>
                <option value="Livré">Livré (Remis au destinataire)</option>
              </select>
            </div>

            {/* Message d'événement pour la timeline client */}
            <div>
              <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                Nouvelle note d&apos;événement client (facultative)
              </label>
              <textarea
                rows={3}
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                placeholder="Ex: Le conteneur a franchi le contrôle douanier portuaire avec succès..."
                className="w-full rounded-xl border border-zinc-200 bg-white p-3 text-xs text-zinc-800 focus:outline-none focus:border-red-500 transition-all resize-y"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] active:bg-black text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-red-500/25 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Enregistrer le déplacement du colis</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
