"use client";

import React, { use } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { TrackingProgress } from "@/components/tracking/TrackingProgress";
import { TrackingTimeline } from "@/components/tracking/TrackingTimeline";
import { TrackingMap } from "@/components/tracking/TrackingMap";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ArrowLeft,
  MapPin,
  Anchor,
  Scale,
  Printer,
  ShieldCheck,
} from "lucide-react";

export default function ClientShipmentDetailPage({
  params,
}: {
  params: Promise<{ numero: string }>;
}) {
  const unwrappedParams = use(params);
  const rawNumero = decodeURIComponent(unwrappedParams.numero || "");
  const { getShipmentByNumber } = useApp();

  const shipment = getShipmentByNumber(rawNumero);

  if (!shipment) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center">
        <h2 className="text-xl font-bold text-[#09090B]">Expédition introuvable</h2>
        <p className="text-sm text-zinc-500 mt-2">
          Le numéro {rawNumero} ne correspond à aucune expédition associée à votre compte.
        </p>
        <Link href="/dashboard/shipments" className="mt-6 inline-block">
          <Button variant="primary" size="sm">
            Retour à mes envois
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/dashboard/shipments"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-[#DC2626] transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour à la liste des envois</span>
          </Link>

          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#09090B] font-mono">
              {shipment.trackingNumber}
            </h1>
            <Badge status={shipment.status} size="md" />
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            Créé le {shipment.departureDate} • Mode : {shipment.mode}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-zinc-700 bg-white border border-zinc-200 hover:bg-zinc-50 transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Bordereau PDF</span>
          </button>
          <Link href="/dashboard/messages">
            <Button variant="secondary" size="sm">
              Assistance sur cet envoi
            </Button>
          </Link>
        </div>
      </div>

      {/* Barre de Progression */}
      <TrackingProgress status={shipment.status} progress={shipment.progress} />

      {/* Grille des caractéristiques détaillées de l'envoi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Origine & Expéditeur */}
        <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
            <MapPin className="w-4 h-4 text-[#DC2626]" />
            <span>Origine & Expéditeur</span>
          </div>
          <p className="text-base font-bold text-[#09090B]">{shipment.origin}</p>
          <p className="text-xs text-zinc-600 font-medium mt-1">{shipment.sender}</p>
          <p className="text-[11px] text-zinc-400 mt-0.5">Départ le : {shipment.departureDate}</p>
        </div>

        {/* Destination & Destinataire */}
        <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>Destination & Destinataire</span>
          </div>
          <p className="text-base font-bold text-[#09090B]">{shipment.destination}</p>
          <p className="text-xs text-zinc-600 font-medium mt-1">{shipment.recipient}</p>
          <p className="text-[11px] text-[#DC2626] font-bold mt-0.5">ETA : {shipment.eta}</p>
        </div>

        {/* Transport & Navire / Convoi */}
        <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
            <Anchor className="w-4 h-4 text-[#DC2626]" />
            <span>Vecteur de transport</span>
          </div>
          <p className="text-base font-bold text-[#09090B]">{shipment.mode}</p>
          <p className="text-xs text-zinc-600 font-medium mt-1 truncate">
            {shipment.vesselName || "Affrètement Hervé Logistics"}
          </p>
          <p className="text-[11px] text-zinc-400 mt-0.5">{shipment.currentLocationName}</p>
        </div>

        {/* Poids & Conditionnement */}
        <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
            <Scale className="w-4 h-4 text-[#DC2626]" />
            <span>Charge & Volume</span>
          </div>
          <p className="text-base font-bold text-[#09090B]">{shipment.weight}</p>
          <p className="text-xs text-zinc-600 font-medium mt-1">{shipment.volume}</p>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Fret scellé certifié</span>
          </div>
        </div>
      </div>

      {/* Carte */}
      <div>
        <TrackingMap shipment={shipment} />
      </div>

      {/* Timeline */}
      <div>
        <TrackingTimeline events={shipment.events} />
      </div>
    </div>
  );
}
