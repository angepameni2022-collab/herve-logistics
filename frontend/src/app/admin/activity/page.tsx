"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Badge } from "@/components/ui/Badge";
import {
  TableContainer,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "@/components/ui/Table";
import { Search, Filter, Calendar } from "lucide-react";

export default function AdminActivityPage() {
  const { activityLogs } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("all");

  const filteredLogs = activityLogs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = actionFilter === "all" || log.action === actionFilter;
    return matchesSearch && matchesAction;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#09090B]">
          Journal d&apos;activité
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Traçabilité des actions administratives, modifications de statuts et alertes système.
        </p>
      </div>

      {/* Barre de Recherche et Filtres */}
      <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher par utilisateur, élément ou détail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-zinc-50 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:bg-white transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-zinc-400" />
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="text-xs font-bold bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
          >
            <option value="all">Toutes les actions</option>
            <option value="Création">Création</option>
            <option value="Modification">Modification</option>
            <option value="Suppression">Suppression</option>
            <option value="Notification">Notification</option>
            <option value="Connexion">Connexion</option>
          </select>
        </div>
      </div>

      {/* Table : | Date | Utilisateur | Action | Élément | */}
      <TableContainer>
        <TableHead>
          <tr>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Utilisateur</TableHeaderCell>
            <TableHeaderCell>Action</TableHeaderCell>
            <TableHeaderCell>Élément</TableHeaderCell>
            <TableHeaderCell>Détails</TableHeaderCell>
          </tr>
        </TableHead>
        <tbody>
          {filteredLogs.map((log) => {
            const badgeVariant =
              log.action === "Création"
                ? "success"
                : log.action === "Modification"
                ? "primary"
                : log.action === "Suppression"
                ? "danger"
                : "neutral";

            return (
              <TableRow key={log.id}>
                <TableCell className="font-mono text-xs text-zinc-600">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{log.date}</span>
                    <span className="text-zinc-400">· {log.time}</span>
                  </div>
                </TableCell>
                <TableCell className="font-bold text-[#09090B]">
                  {log.user}
                </TableCell>
                <TableCell>
                  <Badge variant={badgeVariant} size="sm">
                    {log.action}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono font-bold text-[#DC2626] text-xs">
                  {log.target}
                </TableCell>
                <TableCell className="text-zinc-600 text-xs">
                  {log.details}
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>
      </TableContainer>
    </div>
  );
}
