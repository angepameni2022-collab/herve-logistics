"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { UserProfile } from "@/data/users";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import {
  TableContainer,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "@/components/ui/Table";
import { Search, Filter, Eye, Mail, Phone, Building } from "lucide-react";

export default function AdminClientsPage() {
  const { clients } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedClient, setSelectedClient] = useState<UserProfile | null>(null);

  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#09090B]">
          Portefeuille Clients
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Suivi des comptes entreprises, statuts de compte et historique d&apos;expéditions.
        </p>
      </div>

      {/* Recherche et Filtres */}
      <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher par client, société ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-zinc-50 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:bg-white transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-zinc-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-bold bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
          >
            <option value="all">Tous les statuts</option>
            <option value="Actif">Actif</option>
            <option value="En attente">En attente</option>
            <option value="Suspendu">Suspendu</option>
          </select>
        </div>
      </div>

      {/* Tableau : | Client | Email | Envois | Date | Statut | Actions | */}
      <TableContainer>
        <TableHead>
          <tr>
            <TableHeaderCell>Client</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Envois</TableHeaderCell>
            <TableHeaderCell>Date d&apos;inscription</TableHeaderCell>
            <TableHeaderCell>Statut</TableHeaderCell>
            <TableHeaderCell className="text-right">Actions</TableHeaderCell>
          </tr>
        </TableHead>
        <tbody>
          {filteredClients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FEF2F2] border border-red-200 text-[#DC2626] font-bold text-xs flex items-center justify-center">
                    {client.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <span className="font-bold text-[#09090B] block">{client.name}</span>
                    <span className="text-xs text-zinc-500">{client.company}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-zinc-600 text-xs font-mono">{client.email}</TableCell>
              <TableCell>
                <span className="font-bold text-[#DC2626]">{client.totalShipments}</span>
                <span className="text-xs text-zinc-400 ml-1">({client.activeShipments} actifs)</span>
              </TableCell>
              <TableCell className="text-zinc-600 text-xs">{client.memberSince}</TableCell>
              <TableCell>
                <Badge status={client.status} size="sm" />
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Eye className="w-3.5 h-3.5" />}
                  onClick={() => setSelectedClient(client)}
                >
                  Fiche
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </TableContainer>

      {/* Modal Fiche Client */}
      <Modal
        isOpen={!!selectedClient}
        onClose={() => setSelectedClient(null)}
        title={selectedClient?.name || "Fiche Client"}
        description={selectedClient?.company}
        maxWidth="md"
        footer={
          <Button variant="outline" size="sm" onClick={() => setSelectedClient(null)}>
            Fermer
          </Button>
        }
      >
        {selectedClient && (
          <div className="space-y-4 text-sm">
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase text-zinc-400">Statut du compte</span>
                <div className="mt-1">
                  <Badge status={selectedClient.status} size="md" />
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold uppercase text-zinc-400">Total Expéditions</span>
                <p className="text-lg font-bold text-[#DC2626] mt-0.5">
                  {selectedClient.totalShipments} dossiers
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 p-2.5 rounded-lg border border-zinc-200">
                <Building className="w-4 h-4 text-zinc-400" />
                <span className="text-zinc-500">Société :</span>
                <span className="font-bold text-[#09090B]">{selectedClient.company}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg border border-zinc-200">
                <Mail className="w-4 h-4 text-zinc-400" />
                <span className="text-zinc-500">Email :</span>
                <span className="font-bold text-[#09090B]">{selectedClient.email}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg border border-zinc-200">
                <Phone className="w-4 h-4 text-zinc-400" />
                <span className="text-zinc-500">Téléphone :</span>
                <span className="font-bold text-[#09090B]">{selectedClient.phone}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
