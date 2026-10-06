"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { StatCard } from "@/components/ui/StatCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  TableContainer,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "@/components/ui/Table";
import {
  Package,
  Ship,
  CheckCircle2,
  Clock,
  ArrowRight,
  Eye,
  Plus,
} from "lucide-react";

export default function ClientDashboardPage() {
  const { shipments, currentUser } = useApp();

  const clientShipments = shipments.filter(
    (s) =>
      s.clientEmail.toLowerCase() === currentUser.email.toLowerCase() ||
      s.trackingNumber.startsWith("HL-") ||
      s.trackingNumber.startsWith("TL-2025-00012")
  );

  const total = clientShipments.length;
  const inTransit = clientShipments.filter((s) => s.status === "En transit").length;
  const delivered = clientShipments.filter((s) => s.status === "Livré").length;
  const pending = clientShipments.filter((s) => s.status === "En attente" || s.status === "Expédié").length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header : Bonjour, Nom 👋 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#09090B]">
            Bonjour, {currentUser.name || "Client"} 👋
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Voici la synthèse de vos expéditions maritimes et aériennes Hervé Logistics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/track/HL-2026-000001">
            <Button variant="outline" size="sm">
              Suivi satellite
            </Button>
          </Link>
          <Link href="/dashboard/new-request">
            <Button variant="primary" size="sm" className="bg-[#DC2626] hover:bg-[#B91C1C]" leftIcon={<Plus className="w-4 h-4" />}>
              Déclarer un envoi (Code HL)
            </Button>
          </Link>
        </div>
      </div>

      {/* Bannière Déclaration & Attribution de Code */}
      <div className="bg-[#09090B] text-white rounded-2xl p-6 border border-zinc-800 shadow-md flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />
        <div className="space-y-1 relative z-10">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#DC2626] bg-red-950/80 px-2.5 py-0.5 rounded border border-red-800/60 inline-block mb-1">
            SERVICE EXPÉDITION & FRET INTERNATIONAL
          </span>
          <h3 className="text-lg font-black text-white">
            Vous souhaitez faire acheminer une nouvelle marchandise ?
          </h3>
          <p className="text-xs text-zinc-400 max-w-xl">
            Transmettez les informations de votre expéditeur et destinataire. Hervé Logistics vous génère et attribue immédiatement votre code officiel de suivi international.
          </p>
        </div>
        <Link href="/dashboard/new-request" className="relative z-10 w-full md:w-auto flex-shrink-0">
          <Button variant="primary" size="md" className="w-full bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Déposer mes informations
          </Button>
        </Link>
      </div>

      {/* Statistiques : Total 2, En transit 1, Livrés 1, En attente 0 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total des envois"
          value={total}
          icon={<Package className="w-5 h-5 text-[#DC2626]" />}
          subtitle="Toutes expéditions"
        />
        <StatCard
          title="En transit"
          value={inTransit}
          icon={<Ship className="w-5 h-5 text-[#DC2626]" />}
          trend="+1 cette semaine"
          trendDirection="up"
        />
        <StatCard
          title="Livrés"
          value={delivered}
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          subtitle="Finalisés avec succès"
        />
        <StatCard
          title="En attente"
          value={pending}
          icon={<Clock className="w-5 h-5 text-amber-600" />}
          subtitle="Préparation douanière"
        />
      </div>

      {/* Section : Mes envois récents */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-lg font-bold text-[#09090B]">Mes envois récents</h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Consultez l&apos;état d&apos;avancement et l&apos;estimation de livraison.
            </p>
          </div>

          <Link href="/dashboard/shipments">
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Voir tous mes envois
            </Button>
          </Link>
        </div>

        {/* Table : N° suivi | Destination | Statut | ETA | Action */}
        <TableContainer>
          <TableHead>
            <tr>
              <TableHeaderCell>N° suivi</TableHeaderCell>
              <TableHeaderCell>Destination</TableHeaderCell>
              <TableHeaderCell>Statut</TableHeaderCell>
              <TableHeaderCell>ETA</TableHeaderCell>
              <TableHeaderCell className="text-right">Action</TableHeaderCell>
            </tr>
          </TableHead>
          <tbody>
            {clientShipments.slice(0, 5).map((s) => (
              <TableRow key={s.trackingNumber}>
                <TableCell className="font-mono font-bold text-[#DC2626]">
                  <Link href={`/dashboard/shipments/${s.trackingNumber}`} className="hover:underline">
                    {s.trackingNumber}
                  </Link>
                </TableCell>
                <TableCell className="font-semibold text-[#09090B]">
                  {s.destination}
                </TableCell>
                <TableCell>
                  <Badge status={s.status} size="sm" />
                </TableCell>
                <TableCell className="text-zinc-600 font-medium">
                  {s.eta}
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/dashboard/shipments/${s.trackingNumber}`}>
                    <Button variant="outline" size="sm" leftIcon={<Eye className="w-3.5 h-3.5" />}>
                      Voir
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </TableContainer>
      </div>

      {/* Info Card Pro */}
      <div className="bg-[#FEF2F2] rounded-2xl border border-red-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-[#09090B]">
            Besoin d&apos;un enlèvement urgent ou d&apos;une cotation conteneur ?
          </h3>
          <p className="text-xs text-zinc-600 mt-1">
            Votre chargé de compte dédié Hervé Logistics est joignable directement par messagerie interne.
          </p>
        </div>
        <Link href="/dashboard/messages">
          <Button variant="primary" size="sm">
            Ouvrir la messagerie
          </Button>
        </Link>
      </div>
    </div>
  );
}
