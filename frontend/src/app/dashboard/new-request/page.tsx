"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Ship,
  Plane,
  Truck,
  Box,
  MapPin,
  User,
  Phone,
  FileText,
  Weight,
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Building,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { useApp, ClientShipmentInput } from "@/context/AppContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { PORTS_ORIGIN, DESTINATIONS_LIST } from "@/data/countries";

export default function NewShipmentRequestPage() {
  const router = useRouter();
  const { currentUser, submitClientShipmentRequest } = useApp();
  const { showToast } = useToast();

  // Step 1: Form state
  const [senderName, setSenderName] = useState(currentUser.name || "Jean Dupont");
  const [senderPhone, setSenderPhone] = useState(currentUser.phone || "+82 10-4829-1033");
  const [senderAddress, setSenderAddress] = useState("Trade Tower, Gangnam-gu, Séoul");
  const [senderCityCountry, setSenderCityCountry] = useState("Busan, Corée du Sud");

  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("+237 ");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [destinationCityCountry, setDestinationCityCountry] = useState("Douala, Cameroun");

  const [mode, setMode] = useState<ClientShipmentInput["mode"]>("Maritime");
  const [cargoType, setCargoType] = useState("Véhicules d'occasion & pièces détachées");
  const [weight, setWeight] = useState("3 500 kg");
  const [volume, setVolume] = useState("1 × Conteneur 20' Standard");
  const [notes, setNotes] = useState("Passage en douane export Corée pris en charge par Hervé Logistics.");

  const [isLoading, setIsLoading] = useState(false);
  const [generatedShipment, setGeneratedShipment] = useState<{
    trackingNumber: string;
    destination: string;
    eta: string;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  const predefinedDestinations = DESTINATIONS_LIST;
  const predefinedOrigins = PORTS_ORIGIN;

  const handleCopyCode = () => {
    if (!generatedShipment) return;
    navigator.clipboard.writeText(generatedShipment.trackingNumber);
    setCopied(true);
    showToast("Code de suivi copié dans le presse-papier !", "success");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipientName.trim()) {
      showToast("Veuillez renseigner le nom du destinataire", "error");
      return;
    }
    if (!recipientPhone.trim() || recipientPhone.length < 5) {
      showToast("Veuillez renseigner le téléphone du destinataire", "error");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const created = submitClientShipmentRequest({
        senderName,
        senderPhone,
        senderAddress,
        senderCityCountry,
        recipientName,
        recipientPhone,
        recipientAddress,
        destinationCityCountry,
        mode,
        cargoType,
        weight,
        volume,
        notes,
      });

      setIsLoading(false);
      setGeneratedShipment({
        trackingNumber: created.trackingNumber,
        destination: created.destination,
        eta: created.eta,
      });

      showToast(`Dossier validé ! Code attribué : ${created.trackingNumber}`, "success");
    }, 900);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Top Banner Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#DC2626] text-xs font-bold mb-3">
          <Sparkles className="w-4 h-4" />
          <span>ATTRIBUTION DE CODE OFFICIEL · SÉOUL & BUSAN</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#09090B]">
          Déclarer une cargaison & Recevoir un code de suivi
        </h1>
        <p className="text-sm text-zinc-600 mt-1.5 leading-relaxed">
          Renseignez les coordonnées de l&apos;expéditeur en Corée, du destinataire et les caractéristiques de la marchandise. Nos équipes vous délivrent immédiatement votre code officiel <strong>HL-2026-XXXXXX</strong> pour le suivi en direct.
        </p>
      </div>

      {/* CONFIRMATION / CODE ATTRIBUÉ SCREEN */}
      {generatedShipment ? (
        <div className="bg-white rounded-3xl border-2 border-red-500/80 shadow-2xl p-6 sm:p-10 space-y-8 animate-in zoom-in-95 duration-200">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-[#DC2626] bg-red-50 px-3.5 py-1 rounded-full border border-red-100">
              DOSSIER ENREGISTRÉ PAR HERVÉ LOGISTICS KOREA
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#09090B]">
              Votre code de suivi officiel a été généré !
            </h2>
            <p className="text-sm text-zinc-600 max-w-lg mx-auto">
              Nos agents au terminal de Corée du Sud ont enregistré votre expédition. Conservez précieusement votre code pour suivre l&apos;acheminement satellitaire en temps réel.
            </p>
          </div>

          {/* CODE DISPLAY CARD */}
          <div className="bg-[#09090B] text-white rounded-2xl p-6 sm:p-8 border border-zinc-800 shadow-xl relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />

            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest block mb-2">
              VOTRE NUMÉRO OFFICIEL HERVÉ LOGISTICS
            </span>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-4">
              <div className="text-3xl sm:text-5xl font-mono font-black tracking-wider text-white bg-zinc-900/90 border border-red-500/40 px-6 py-3 rounded-xl shadow-inner">
                {generatedShipment.trackingNumber}
              </div>

              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Copié !" : "Copier le code"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-5 mt-5 border-t border-zinc-800 text-xs text-zinc-300">
              <div>
                <span className="text-zinc-500 block">Origine :</span>
                <span className="font-semibold text-white">{senderCityCountry}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Destination :</span>
                <span className="font-semibold text-white">{generatedShipment.destination}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Arrivée estimée (ETA) :</span>
                <span className="font-semibold text-emerald-400">{generatedShipment.eta}</span>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link href={`/track/${generatedShipment.trackingNumber}`} className="flex-1">
              <Button
                variant="primary"
                size="lg"
                className="w-full bg-[#DC2626] hover:bg-[#B91C1C] text-white font-black text-sm uppercase tracking-wider"
                rightIcon={<ExternalLink className="w-4 h-4" />}
              >
                Suivre en direct sur la carte satellite
              </Button>
            </Link>

            <Link href="/dashboard/shipments" className="sm:w-auto">
              <Button variant="outline" size="lg" className="w-full text-sm font-bold">
                Voir dans mes expéditions
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        /* FORMULAIRE DE SOUMISSION EN 3 BLOCS */
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* BLOC 1 : EXPÉDITEUR (CORÉE DU SUD) */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-xs space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
              <div className="w-9 h-9 rounded-xl bg-red-50 text-[#DC2626] flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#09090B]">
                  Expéditeur (Départ — Corée du Sud)
                </h2>
                <p className="text-xs text-zinc-500">
                  Coordonnées de la personne ou société émettrice en Corée.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Input
                  label="Nom de l'expéditeur / Société *"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  leftIcon={<User className="w-4 h-4 text-zinc-400" />}
                  required
                />
              </div>

              <div>
                <Input
                  label="Téléphone expéditeur *"
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                  leftIcon={<Phone className="w-4 h-4 text-zinc-400" />}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                  Port / Lieu de départ en Corée *
                </label>
                <select
                  value={senderCityCountry}
                  onChange={(e) => setSenderCityCountry(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
                >
                  {predefinedOrigins.map((orig) => (
                    <option key={orig} value={orig}>
                      {orig}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Input
                  label="Adresse de collecte / Entrepôt"
                  value={senderAddress}
                  onChange={(e) => setSenderAddress(e.target.value)}
                  leftIcon={<MapPin className="w-4 h-4 text-zinc-400" />}
                />
              </div>
            </div>
          </div>

          {/* BLOC 2 : DESTINATAIRE (ARRIVÉE) */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-xs space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
              <div className="w-9 h-9 rounded-xl bg-red-50 text-[#DC2626] flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#09090B]">
                  Destinataire (Arrivée & Réception)
                </h2>
                <p className="text-xs text-zinc-500">
                  La personne ou entité habilitée à réceptionner le colis/conteneur au port ou aéroport.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Input
                  label="Nom complet du destinataire / Entreprise *"
                  placeholder="Ex: Société d'Importation & Transit SARL"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  leftIcon={<Building className="w-4 h-4 text-zinc-400" />}
                  required
                />
              </div>

              <div>
                <Input
                  label="Téléphone du destinataire (avec indicatif) *"
                  placeholder="Ex: +237 699 12 34 56"
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                  leftIcon={<Phone className="w-4 h-4 text-zinc-400" />}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                  Ville & Pays de destination finale *
                </label>
                <select
                  value={destinationCityCountry}
                  onChange={(e) => setDestinationCityCountry(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
                >
                  {predefinedDestinations.map((dest) => (
                    <option key={dest} value={dest}>
                      {dest}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Input
                  label="Adresse de livraison / Terminal de déchargement"
                  placeholder="Ex: Zone Portuaire Nord, Douala"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  leftIcon={<MapPin className="w-4 h-4 text-zinc-400" />}
                />
              </div>
            </div>
          </div>

          {/* BLOC 3 : DÉTAILS DE LA MARCHANDISE */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-xs space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
              <div className="w-9 h-9 rounded-xl bg-red-50 text-[#DC2626] flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#09090B]">
                  Détails de la Marchandise & Mode de Fret
                </h2>
                <p className="text-xs text-zinc-500">
                  Précisez la nature du fret pour l&apos;affectation au navire ou au vol cargo.
                </p>
              </div>
            </div>

            {/* Choix Mode */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-3">
                Mode d&apos;acheminement *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: "Maritime", label: "Maritime", icon: <Ship className="w-4 h-4" /> },
                  { id: "Aérien", label: "Aérien Express", icon: <Plane className="w-4 h-4" /> },
                  { id: "Conteneurs", label: "Conteneur FCL", icon: <Box className="w-4 h-4" /> },
                  { id: "Colis & Fret", label: "Groupage LCL", icon: <Truck className="w-4 h-4" /> },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMode(item.id as any)}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border font-bold text-xs transition-all cursor-pointer ${
                      mode === item.id
                        ? "bg-[#DC2626] text-white border-red-600 shadow-md shadow-red-500/20"
                        : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-100"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <Input
                  label="Description de la marchandise *"
                  placeholder="Ex: Véhicules, Pièces électroniques..."
                  value={cargoType}
                  onChange={(e) => setCargoType(e.target.value)}
                  leftIcon={<Box className="w-4 h-4 text-zinc-400" />}
                  required
                />
              </div>

              <div>
                <Input
                  label="Poids estimé *"
                  placeholder="Ex: 4 200 kg"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  leftIcon={<Weight className="w-4 h-4 text-zinc-400" />}
                  required
                />
              </div>

              <div>
                <Input
                  label="Colisage ou Volume *"
                  placeholder="Ex: 1 × Conteneur 40' HC"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  leftIcon={<FileText className="w-4 h-4 text-zinc-400" />}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                Instructions particulières ou notes douanières
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex: Marchandise fragile, dédouanement à quai requis..."
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
              />
            </div>
          </div>

          {/* BOUTON D'ACTION PRINCIPAL */}
          <div className="bg-zinc-950 text-white rounded-2xl p-6 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 text-[#DC2626] border border-red-500/30 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  Attribution immédiate par Hervé Logistics
                </p>
                <p className="text-xs text-zinc-400">
                  Votre dossier est instantanément numéroté et indexé sur notre radar satellitaire.
                </p>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto bg-[#DC2626] hover:bg-[#B91C1C] text-white font-black text-sm uppercase tracking-wider whitespace-nowrap shadow-lg shadow-red-600/30 px-8"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Soumettre & Recevoir mon code officiel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
