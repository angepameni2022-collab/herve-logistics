"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { ShipmentStatus } from "@/data/shipments";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import {
  ArrowLeft,
  Package,
  Ship,
  Layers,
} from "lucide-react";

export default function AdminNewShipmentPage() {
  const router = useRouter();
  const { addShipment, clients } = useApp();
  const { showToast } = useToast();

  const initialTrackingNumber = `HL-2026-${Math.floor(100000 + Math.random() * 900000)}`;

  const [trackingNumber, setTrackingNumber] = useState(initialTrackingNumber);
  const [clientName, setClientName] = useState("Jean Dupont");
  const [clientEmail, setClientEmail] = useState("jean.dupont@email.com");
  const [sender, setSender] = useState("Hervé Logistics Korea (Busan Hub)");
  const [recipient, setRecipient] = useState("Société d'Import & Transit");

  const [mode, setMode] = useState<"Maritime" | "Aérien" | "Routier" | "Conteneurs" | "Colis & Fret" | "Import / Export">("Maritime");
  const [origin, setOrigin] = useState("Busan, Corée du Sud");
  const [destination, setDestination] = useState("Douala, Cameroun");
  const [weight, setWeight] = useState("14 500 kg");
  const [volume, setVolume] = useState("2 × Conteneur 40' HC");
  const [vesselName, setVesselName] = useState("Hervé Korea Express — HL Voyager 07");
  const [departureDate, setDepartureDate] = useState("10 avr. 2026");
  const [eta, setEta] = useState("28 avr. 2026");

  const [status, setStatus] = useState<ShipmentStatus>("En transit");
  const [progress, setProgress] = useState(45);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!trackingNumber.trim() || !origin.trim() || !destination.trim()) {
      showToast("Veuillez renseigner le N° de suivi, l'origine et la destination.", "error");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      addShipment({
        trackingNumber: trackingNumber.trim().toUpperCase(),
        clientName,
        clientEmail,
        sender: sender || "Expéditeur Central",
        recipient: recipient || "Destinataire Référencé",
        origin,
        destination,
        mode,
        status,
        eta,
        departureDate,
        weight: weight || "12 500 kg",
        volume: volume || "1 × Conteneur 40' HC",
        vesselName: vesselName || undefined,
      });

      showToast(`✓ Envoi ${trackingNumber} créé avec succès (Simulé côté frontend)`, "success");
      router.push("/admin/shipments");
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Header */}
      <div>
        <Link
          href="/admin/shipments"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-[#DC2626] transition-colors mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Retour aux envois</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#09090B]">
          Créer un nouvel envoi
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Formulaire complet d&apos;enregistrement d&apos;un bordereau de transport multimodal.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1 : Informations générales */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-zinc-100">
            <Package className="w-5 h-5 text-[#DC2626]" />
            <h2 className="text-base font-bold text-[#09090B]">
              Informations générales
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Input
                label="Numéro de suivi *"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Ex: TL-2025-000128"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Client associé *
              </label>
              <select
                value={clientName}
                onChange={(e) => {
                  setClientName(e.target.value);
                  const found = clients.find((c) => c.name === e.target.value);
                  if (found) setClientEmail(found.email);
                }}
                className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-[#09090B] focus:ring-2 focus:ring-[#DC2626]"
              >
                {clients.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name} ({c.company})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Input
                label="Expéditeur *"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="Ex: Shanghai Global Export Ltd"
                required
              />
            </div>

            <div>
              <Input
                label="Destinataire *"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Ex: Société Camerounaise d'Importation"
                required
              />
            </div>
          </div>
        </div>

        {/* Section 2 : Transport */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-zinc-100">
            <Ship className="w-5 h-5 text-[#DC2626]" />
            <h2 className="text-base font-bold text-[#09090B]">
              Paramètres de Transport
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Mode de transport *
              </label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as any)}
                className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-[#09090B] focus:ring-2 focus:ring-[#DC2626]"
              >
                <option value="Maritime">Maritime</option>
                <option value="Aérien">Aérien</option>
                <option value="Routier">Routier</option>
                <option value="Conteneurs">Conteneurs</option>
                <option value="Colis & Fret">Colis & Fret</option>
                <option value="Import / Export">Import / Export</option>
              </select>
            </div>

            <div>
              <Input
                label="Origine (Ville, Pays) *"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Ex: Shanghai, Chine"
                required
              />
            </div>

            <div>
              <Input
                label="Destination (Ville, Pays) *"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Ex: Douala, Cameroun"
                required
              />
            </div>

            <div>
              <Input
                label="Poids total"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Ex: 14 850 kg"
              />
            </div>

            <div>
              <Input
                label="Volume / Conditionnement"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                placeholder="Ex: 2 × Conteneur 40' HC"
              />
            </div>

            <div>
              <Input
                label="Navire / N° Vol / Convoi"
                value={vesselName}
                onChange={(e) => setVesselName(e.target.value)}
                placeholder="Ex: CMA CGM Palais Royal"
              />
            </div>

            <div>
              <Input
                label="Date de départ"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                placeholder="Ex: 12 avr. 2025"
              />
            </div>

            <div>
              <Input
                label="ETA (Arrivée prévue) *"
                value={eta}
                onChange={(e) => setEta(e.target.value)}
                placeholder="Ex: 25 avr. 2025"
                required
              />
            </div>
          </div>
        </div>

        {/* Section 3 : Statut */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-zinc-100">
            <Layers className="w-5 h-5 text-[#DC2626]" />
            <h2 className="text-base font-bold text-[#09090B]">
              Statut initial et avancement
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Statut
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ShipmentStatus)}
                className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-[#09090B] focus:ring-2 focus:ring-[#DC2626]"
              >
                <option value="En attente">En attente</option>
                <option value="Expédié">Expédié</option>
                <option value="En transit">En transit</option>
                <option value="Arrivé">Arrivé</option>
                <option value="Livré">Livré</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Progression estimée ({progress}%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-full accent-[#DC2626] mt-2"
              />
            </div>
          </div>
        </div>

        {/* Boutons : Annuler / Créer l'envoi */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link href="/admin/shipments">
            <Button variant="outline" size="md">
              Annuler
            </Button>
          </Link>
          <Button type="submit" variant="primary" size="md" isLoading={isLoading}>
            Créer l&apos;envoi
          </Button>
        </div>
      </form>
    </div>
  );
}
