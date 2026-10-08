"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Package,
  Ship,
  Plane,
  Truck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Eye,
  Plus,
  Radio,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Search,
  Filter,
  Navigation,
  Compass,
  Phone,
} from "lucide-react";

export default function ClientDashboardPage() {
  const { shipments, currentUser } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const clientShipments = shipments.filter(
    (s) =>
      s.clientEmail.toLowerCase() === currentUser.email.toLowerCase() ||
      s.trackingNumber.startsWith("HL-") ||
      s.trackingNumber.startsWith("TL-2025-00012")
  );

  const total = clientShipments.length;
  const inTransit = clientShipments.filter((s) => s.status === "En transit").length;
  const delivered = clientShipments.filter((s) => s.status === "Livré").length;
  const pending = clientShipments.filter(
    (s) => s.status === "En attente" || s.status === "Expédié"
  ).length;

  const filteredShipments = clientShipments.filter((s) => {
    const matchesFilter = filterStatus === "all" || s.status === filterStatus;
    const matchesSearch =
      searchQuery === "" ||
      s.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.origin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* Top Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-wider text-[#DC2626]">
              PORTAIL CLIENT SÉCURISÉ · CERTIFIÉ OEA
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#09090B] tracking-tight">
            Bonjour, {currentUser.name || "Jean Dupont"} 👋
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Supervisez l&apos;acheminement de vos cargaisons maritimes et aériennes en temps réel.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link href="/track/HL-2026-000001">
            <Button
              variant="outline"
              size="md"
              leftIcon={<Radio className="w-4 h-4 text-[#DC2626] animate-pulse" />}
              className="text-xs font-bold"
            >
              Suivi Satellite AIS
            </Button>
          </Link>
          <Link href="/dashboard/new-request">
            <Button
              variant="primary"
              size="md"
              className="bg-[#DC2626] hover:bg-[#B91C1C] shadow-md shadow-red-500/25 text-xs font-bold"
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Déclarer un envoi (Code HL)
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Banner: Déclaration & Attribution immédiate de Code HL */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#09090B] via-[#18181B] to-[#09090B] text-white p-7 sm:p-9 border border-zinc-800 shadow-xl">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #DC2626 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 text-red-300 border border-red-800/80 text-[11px] font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-[#DC2626] animate-spin-slow" />
              <span>Service Expédition Internationale Corée ➔ Afrique</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Vous souhaitez faire acheminer une nouvelle marchandise ?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Enregistrez les informations d&apos;expédition. Notre système génère instantanément votre bordereau officiel avec le numéro de traçabilité mondial certifié <b>HL-2026</b>.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link href="/dashboard/new-request">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto bg-[#DC2626] hover:bg-[#B91C1C] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 px-6 py-4"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Déposer mes informations →
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Cartes Statistiques Modernes */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total */}
        <div className="bg-white rounded-3xl border border-zinc-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-red-200 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Total des envois
            </span>
            <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#DC2626] flex items-center justify-center border border-red-100 shadow-xs">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-black text-[#09090B] tracking-tight">
              {total}
            </div>
            <span className="text-xs text-zinc-500 font-medium mt-1 block">
              Toutes expéditions confondues
            </span>
          </div>
        </div>

        {/* En transit */}
        <div className="bg-white rounded-3xl border border-zinc-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              En transit maritime
            </span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-xs">
              <Ship className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-black text-[#09090B] tracking-tight">
              {inTransit}
            </div>
            <span className="text-xs text-emerald-600 font-bold mt-1 block flex items-center gap-1">
              <span>●</span> En mer · Signal satellite actif
            </span>
          </div>
        </div>

        {/* Livrés */}
        <div className="bg-white rounded-3xl border border-zinc-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Colis livrés
            </span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-xs">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-black text-[#09090B] tracking-tight">
              {delivered}
            </div>
            <span className="text-xs text-zinc-500 font-medium mt-1 block">
              Remis contre signature
            </span>
          </div>
        </div>

        {/* En attente */}
        <div className="bg-white rounded-3xl border border-zinc-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-amber-200 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              En préparation
            </span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 shadow-xs">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-black text-[#09090B] tracking-tight">
              {pending}
            </div>
            <span className="text-xs text-zinc-500 font-medium mt-1 block">
              Formalités portuaires & douane
            </span>
          </div>
        </div>
      </div>

      {/* Section Tableau : Mes envois récents */}
      <div className="bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-[#09090B]">Mes expéditions actives</h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Suivi détaillé de l&apos;acheminement, de la position GPS et de l&apos;ETA de livraison.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Quick status tabs */}
            <div className="flex items-center bg-zinc-100 p-1 rounded-xl border border-zinc-200 text-xs font-semibold">
              <button
                onClick={() => setFilterStatus("all")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filterStatus === "all"
                    ? "bg-white text-[#DC2626] font-bold shadow-xs"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                Tous ({total})
              </button>
              <button
                onClick={() => setFilterStatus("En transit")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filterStatus === "En transit"
                    ? "bg-white text-[#DC2626] font-bold shadow-xs"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                En transit ({inTransit})
              </button>
              <button
                onClick={() => setFilterStatus("Livré")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filterStatus === "Livré"
                    ? "bg-white text-[#DC2626] font-bold shadow-xs"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                Livrés ({delivered})
              </button>
            </div>

            <Link href="/dashboard/shipments">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Voir tous
              </Button>
            </Link>
          </div>
        </div>

        {/* Table modernisée */}
        <div className="overflow-x-auto rounded-2xl border border-zinc-200/80">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-zinc-50/80 border-b border-zinc-200 text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                <th className="py-3.5 px-4 font-bold">N° de Suivi</th>
                <th className="py-3.5 px-4 font-bold">Trajet (Origine ➔ Destination)</th>
                <th className="py-3.5 px-4 font-bold">Progression & Position</th>
                <th className="py-3.5 px-4 font-bold">Statut</th>
                <th className="py-3.5 px-4 font-bold">Arrivée estimée (ETA)</th>
                <th className="py-3.5 px-4 text-right font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredShipments.slice(0, 6).map((s) => (
                <tr
                  key={s.trackingNumber}
                  className="hover:bg-zinc-50/70 transition-colors group"
                >
                  {/* N° Suivi */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-red-50 text-[#DC2626] flex items-center justify-center flex-shrink-0">
                        {s.mode === "Aérien" ? (
                          <Plane className="w-3.5 h-3.5" />
                        ) : s.mode === "Routier" ? (
                          <Truck className="w-3.5 h-3.5" />
                        ) : (
                          <Ship className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <div>
                        <Link
                          href={`/track/${s.trackingNumber}`}
                          className="font-mono font-bold text-zinc-900 group-hover:text-[#DC2626] transition-colors"
                        >
                          {s.trackingNumber}
                        </Link>
                        <span className="block text-[10px] text-zinc-400 font-medium">
                          {s.mode} · {s.volume || s.weight || "Fret international"}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Trajet */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-zinc-900">
                      {s.destination}
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      Parti de {s.origin?.split(",")[0] || "Busan"}
                    </div>
                  </td>

                  {/* Progression */}
                  <td className="py-3.5 px-4 min-w-[160px]">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-bold text-zinc-700">{s.progress}%</span>
                      <span className="text-zinc-400 truncate max-w-[100px]">
                        {s.currentLocationName?.split(",")[0] || "En transit"}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#DC2626] to-[#EF4444] rounded-full transition-all duration-500"
                        style={{ width: `${s.progress}%` }}
                      />
                    </div>
                  </td>

                  {/* Statut */}
                  <td className="py-3.5 px-4">
                    <Badge status={s.status} size="sm" />
                  </td>

                  {/* ETA */}
                  <td className="py-3.5 px-4 font-semibold text-zinc-700">
                    {s.eta}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/track/${s.trackingNumber}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-[#DC2626] font-bold text-xs transition-colors"
                        title="Voir la carte satellite en direct"
                      >
                        <Navigation className="w-3 h-3" />
                        <span>Carte</span>
                      </Link>
                      <Link
                        href={`/dashboard/shipments/${s.trackingNumber}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-semibold text-xs transition-colors"
                        title="Voir les détails complets"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Détails</span>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Support & Concierge Card */}
      <div className="bg-gradient-to-r from-red-50 via-white to-red-50 rounded-3xl border border-red-200/80 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#DC2626] text-white flex items-center justify-center shadow-md shadow-red-500/20 flex-shrink-0">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#DC2626] bg-red-100/70 px-2.5 py-0.5 rounded-full inline-block mb-1">
              SUPPORT CLIENT & COTATIONS DÉDIÉ
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#09090B]">
              Besoin d&apos;un enlèvement urgent ou d&apos;une cotation conteneur ?
            </h3>
            <p className="text-xs text-zinc-600 mt-1 max-w-xl">
              Votre gestionnaire de compte Hervé Logistics est joignable directement par téléphone ou WhatsApp au <b>+44 7456 062192</b>.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
          <a
            href="https://wa.me/447456062192"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
          >
            <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.177 8.177 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m-3.52 4.09c-.19 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.21 3.07.15.2 2.06 3.29 5.09 4.49 2.52 1 3.03.8 3.58.75.55-.05 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.89-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51z" />
            </svg>
            <span>WhatsApp Direct</span>
          </a>
          <Link href="/dashboard/messages">
            <Button variant="secondary" size="md" leftIcon={<MessageSquare className="w-4 h-4" />}>
              Messagerie interne
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
