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
  Plus,
  ArrowRight,
  Activity,
  Eye,
  BarChart3,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { shipments, activityLogs } = useApp();

  const total = shipments.length;
  const inTransit = shipments.filter((s) => s.status === "En transit").length;
  const delivered = shipments.filter((s) => s.status === "Livré").length;
  const pending = shipments.filter((s) => s.status === "En attente").length;

  const monthlyVolumes = [
    { month: "Nov", volume: 38, maritime: 24, aerien: 14 },
    { month: "Déc", volume: 52, maritime: 35, aerien: 17 },
    { month: "Jan", volume: 46, maritime: 30, aerien: 16 },
    { month: "Fév", volume: 64, maritime: 42, aerien: 22 },
    { month: "Mar", volume: 78, maritime: 50, aerien: 28 },
    { month: "Avr", volume: 92, maritime: 60, aerien: 32 },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
            Administration Centrale
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#09090B] mt-0.5">
            Tableau de bord
          </h1>
          <p className="text-sm text-zinc-500">
            Aperçu en temps réel des flux de transport et de la performance opérationnelle.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/events">
            <Button variant="outline" size="sm">
              Événements
            </Button>
          </Link>
          <Link href="/admin/shipments/new">
            <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
              Nouvel envoi
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Statistiques : Total envois, En transit, Livrés, En attente */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total envois"
          value={total}
          icon={<Package className="w-5 h-5 text-[#DC2626]" />}
          trend="+18% ce mois"
          trendDirection="up"
        />
        <StatCard
          title="En transit"
          value={inTransit}
          icon={<Ship className="w-5 h-5 text-[#DC2626]" />}
          subtitle="En mer ou sur route"
        />
        <StatCard
          title="Livrés"
          value={delivered}
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          trend="99.4% conformité"
          trendDirection="up"
        />
        <StatCard
          title="En attente"
          value={pending}
          icon={<Clock className="w-5 h-5 text-amber-600" />}
          subtitle="En cours de douane"
        />
      </div>

      {/* Graphique d'activité et Activité récente */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Graphique (8 cols) en Rouge / Noir */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-zinc-200 p-6 shadow-xs flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="text-base font-bold text-[#09090B] flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#DC2626]" />
                Volume des flux logistiques (EVP & Tonnes)
              </h2>
              <p className="text-xs text-zinc-500">Progression semestrielle par canal maritime et aérien</p>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="flex items-center gap-1.5 text-zinc-700">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#DC2626]" />
                Fret Maritime
              </span>
              <span className="flex items-center gap-1.5 text-zinc-700">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#18181B]" />
                Fret Aérien
              </span>
            </div>
          </div>

          {/* Bar Chart en Rouge et Noir */}
          <div className="h-64 w-full flex items-end justify-between gap-4 pt-6 pb-2 px-2 border-b border-zinc-100">
            {monthlyVolumes.map((item) => {
              const maxVal = 100;
              const maritimeHeight = (item.maritime / maxVal) * 100;
              const aerienHeight = (item.aerien / maxVal) * 100;

              return (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="text-[11px] font-bold text-zinc-400 group-hover:text-[#DC2626] transition-colors">
                    {item.volume}k
                  </div>
                  <div className="w-full max-w-[42px] flex items-end gap-1.5 h-44 bg-zinc-50 rounded-lg p-1 border border-zinc-100">
                    <div
                      className="w-1/2 bg-[#DC2626] rounded-t-md transition-all group-hover:brightness-110"
                      style={{ height: `${maritimeHeight}%` }}
                    />
                    <div
                      className="w-1/2 bg-[#18181B] rounded-t-md transition-all group-hover:brightness-125"
                      style={{ height: `${aerienHeight}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-zinc-600 mt-1">{item.month}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
            <span>Données compilées des hubs portuaires mondiaux</span>
            <span className="font-bold text-[#DC2626]">+24.8% vs période précédente</span>
          </div>
        </div>

        {/* Activité Récente (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-zinc-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-[#09090B] flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#DC2626]" />
                Activité récente
              </h2>
              <Link href="/admin/activity" className="text-xs font-bold text-[#DC2626] hover:underline">
                Voir tout
              </Link>
            </div>

            <div className="space-y-4">
              {activityLogs.slice(0, 4).map((log) => (
                <div key={log.id} className="p-3 rounded-xl bg-zinc-50 border border-zinc-100 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#09090B]">{log.target}</span>
                    <span className="text-zinc-400">{log.time}</span>
                  </div>
                  <p className="text-zinc-600 leading-snug">{log.details}</p>
                  <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-1">
                    <span>Par : {log.user}</span>
                    <span className="font-bold text-[#DC2626]">{log.action}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link href="/admin/activity" className="mt-4 block">
            <Button variant="ghost" size="sm" className="w-full text-xs">
              Consulter le journal complet →
            </Button>
          </Link>
        </div>
      </div>

      {/* Derniers envois (Tableau) */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-lg font-bold text-[#09090B]">Derniers envois enregistrés</h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Supervision des opérations de transit multimodal.
            </p>
          </div>

          <Link href="/admin/shipments">
            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Gérer tous les envois
            </Button>
          </Link>
        </div>

        <TableContainer>
          <TableHead>
            <tr>
              <TableHeaderCell>N° Suivi</TableHeaderCell>
              <TableHeaderCell>Client</TableHeaderCell>
              <TableHeaderCell>Origine</TableHeaderCell>
              <TableHeaderCell>Destination</TableHeaderCell>
              <TableHeaderCell>Mode</TableHeaderCell>
              <TableHeaderCell>Statut</TableHeaderCell>
              <TableHeaderCell>ETA</TableHeaderCell>
              <TableHeaderCell className="text-right">Actions</TableHeaderCell>
            </tr>
          </TableHead>
          <tbody>
            {shipments.slice(0, 5).map((s) => (
              <TableRow key={s.trackingNumber}>
                <TableCell className="font-mono font-bold text-[#DC2626]">
                  <Link href={`/admin/shipments?search=${s.trackingNumber}`} className="hover:underline">
                    {s.trackingNumber}
                  </Link>
                </TableCell>
                <TableCell className="font-bold text-[#09090B]">{s.clientName}</TableCell>
                <TableCell className="text-zinc-600">{s.origin}</TableCell>
                <TableCell className="text-zinc-600 font-medium">{s.destination}</TableCell>
                <TableCell className="text-zinc-500 text-xs">{s.mode}</TableCell>
                <TableCell>
                  <Badge status={s.status} size="sm" />
                </TableCell>
                <TableCell className="font-medium text-zinc-600 text-xs">{s.eta}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/track/${s.trackingNumber}`}>
                    <Button variant="ghost" size="sm" leftIcon={<Eye className="w-3.5 h-3.5" />}>
                      Aperçu
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </TableContainer>
      </div>
    </div>
  );
}
