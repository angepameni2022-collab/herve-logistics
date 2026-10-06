"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  TableContainer,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "@/components/ui/Table";
import { Eye, Search, Filter, Plus } from "lucide-react";

export default function ClientShipmentsListPage() {
  const { shipments, currentUser } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const clientShipments = shipments.filter(
    (s) =>
      s.clientEmail.toLowerCase() === currentUser.email.toLowerCase() ||
      s.trackingNumber.startsWith("HL-") ||
      s.trackingNumber.startsWith("TL-2025-00012")
  );

  const filteredShipments = clientShipments.filter((s) => {
    const matchesSearch =
      s.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || s.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#09090B]">Mes envois</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Gérez et suivez l&apos;ensemble de vos dossiers d&apos;expédition officiels Hervé Logistics.
          </p>
        </div>

        <Link href="/dashboard/new-request">
          <Button variant="primary" size="sm" className="bg-[#DC2626] hover:bg-[#B91C1C]" leftIcon={<Plus className="w-4 h-4" />}>
            Déclarer un envoi (Obtenir code HL)
          </Button>
        </Link>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher par N° suivi, origine, destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-zinc-50 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:bg-white transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-zinc-400" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs font-semibold bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
          >
            <option value="all">Tous les statuts</option>
            <option value="En attente">En attente</option>
            <option value="Expédié">Expédié</option>
            <option value="En transit">En transit</option>
            <option value="Livré">Livré</option>
          </select>
        </div>
      </div>

      {/* Tableau des envois */}
      <TableContainer>
        <TableHead>
          <tr>
            <TableHeaderCell>N° Suivi</TableHeaderCell>
            <TableHeaderCell>Origine</TableHeaderCell>
            <TableHeaderCell>Destination</TableHeaderCell>
            <TableHeaderCell>Mode</TableHeaderCell>
            <TableHeaderCell>Statut</TableHeaderCell>
            <TableHeaderCell>ETA</TableHeaderCell>
            <TableHeaderCell className="text-right">Action</TableHeaderCell>
          </tr>
        </TableHead>
        <tbody>
          {filteredShipments.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-12 text-sm text-zinc-400">
                Aucun envoi ne correspond aux critères de recherche.
              </td>
            </tr>
          ) : (
            filteredShipments.map((s) => (
              <TableRow key={s.trackingNumber}>
                <TableCell className="font-mono font-bold text-[#DC2626]">
                  <Link href={`/dashboard/shipments/${s.trackingNumber}`} className="hover:underline">
                    {s.trackingNumber}
                  </Link>
                </TableCell>
                <TableCell className="text-zinc-700">{s.origin}</TableCell>
                <TableCell className="font-semibold text-[#09090B]">{s.destination}</TableCell>
                <TableCell className="text-zinc-600">{s.mode}</TableCell>
                <TableCell>
                  <Badge status={s.status} size="sm" />
                </TableCell>
                <TableCell className="text-zinc-600 font-medium">{s.eta}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/dashboard/shipments/${s.trackingNumber}`}>
                    <Button variant="outline" size="sm" leftIcon={<Eye className="w-3.5 h-3.5" />}>
                      Détails
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )}
        </tbody>
      </TableContainer>
    </div>
  );
}
