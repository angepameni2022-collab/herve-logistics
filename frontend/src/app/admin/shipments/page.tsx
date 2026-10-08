"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Shipment, ShipmentStatus } from "@/data/shipments";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import {
  TableContainer,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "@/components/ui/Table";
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit2,
  Trash2,
  AlertTriangle,
  ExternalLink,
  Navigation,
} from "lucide-react";

export default function AdminShipmentsPage() {
  const { shipments, updateShipmentStatus, deleteShipment } = useApp();
  const { showToast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modeFilter, setModeFilter] = useState("all");

  // Modals state
  const [viewShipment, setViewShipment] = useState<Shipment | null>(null);
  const [editShipment, setEditShipment] = useState<Shipment | null>(null);
  const [editStatus, setEditStatus] = useState<ShipmentStatus>("En transit");
  const [editProgress, setEditProgress] = useState<number>(50);
  const [deleteTarget, setDeleteTarget] = useState<Shipment | null>(null);

  const filteredShipments = shipments.filter((s) => {
    const matchesSearch =
      s.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || s.status === statusFilter;
    const matchesMode = modeFilter === "all" || s.mode === modeFilter;
    return matchesSearch && matchesStatus && matchesMode;
  });

  const handleOpenEdit = (s: Shipment) => {
    setEditShipment(s);
    setEditStatus(s.status);
    setEditProgress(s.progress);
  };

  const handleSaveEdit = () => {
    if (!editShipment) return;
    updateShipmentStatus(editShipment.trackingNumber, editStatus, Number(editProgress));
    showToast(`Envoi ${editShipment.trackingNumber} mis à jour avec succès.`, "success");
    setEditShipment(null);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    deleteShipment(deleteTarget.trackingNumber);
    showToast(`Envoi ${deleteTarget.trackingNumber} supprimé.`, "info");
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Title & New Shipment Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#09090B]">
            Gestion des envois
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Supervision globale de tous les bordereaux et manifestes de transport.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
          <Link href="/admin/displacement" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto justify-center" leftIcon={<Navigation className="w-4 h-4 text-[#DC2626]" />}>
              Navigateur GPS (Déplacement)
            </Button>
          </Link>
          <Link href="/admin/shipments/new" className="w-full sm:w-auto">
            <Button variant="primary" className="w-full sm:w-auto justify-center" leftIcon={<Plus className="w-4 h-4" />}>
              + Nouvel envoi
            </Button>
          </Link>
        </div>
      </div>

      {/* Barre de Recherche et Filtres */}
      <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center gap-3 justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher par N°, client, origine, destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-zinc-50 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:bg-white transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Statut :</span>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-bold bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
          >
            <option value="all">Tous les statuts</option>
            <option value="En attente">En attente</option>
            <option value="Expédié">Expédié</option>
            <option value="En transit">En transit</option>
            <option value="Arrivé">Arrivé</option>
            <option value="Livré">Livré</option>
          </select>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 ml-2">
            <span>Mode :</span>
          </div>
          <select
            value={modeFilter}
            onChange={(e) => setModeFilter(e.target.value)}
            className="text-xs font-bold bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
          >
            <option value="all">Tous les modes</option>
            <option value="Maritime">Maritime</option>
            <option value="Aérien">Aérien</option>
            <option value="Routier">Routier</option>
            <option value="Conteneurs">Conteneurs</option>
            <option value="Colis & Fret">Colis & Fret</option>
            <option value="Import / Export">Import / Export</option>
          </select>
        </div>
      </div>

      {/* Tableau : | N° | Client | Origine | Destination | Mode | Statut | ETA | Actions | */}
      <TableContainer>
        <TableHead>
          <tr>
            <TableHeaderCell>N°</TableHeaderCell>
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
          {filteredShipments.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-12 text-sm text-zinc-400">
                Aucun envoi trouvé.
              </td>
            </tr>
          ) : (
            filteredShipments.map((s) => (
              <TableRow key={s.trackingNumber}>
                <TableCell className="font-mono font-bold text-[#DC2626]">
                  {s.trackingNumber}
                </TableCell>
                <TableCell className="font-bold text-[#09090B]">
                  {s.clientName}
                </TableCell>
                <TableCell className="text-zinc-600">{s.origin}</TableCell>
                <TableCell className="text-zinc-600 font-medium">{s.destination}</TableCell>
                <TableCell className="text-zinc-500 text-xs">{s.mode}</TableCell>
                <TableCell>
                  <Badge status={s.status} size="sm" />
                </TableCell>
                <TableCell className="font-medium text-zinc-600 text-xs">{s.eta}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    {/* Action : Piloter déplacement GPS */}
                    <Link
                      href="/admin/displacement"
                      className="p-1.5 rounded-lg text-[#DC2626] bg-red-50 hover:bg-red-100 transition-colors"
                      title="Piloter le déplacement sur la carte"
                      aria-label="Piloter le déplacement sur la carte"
                    >
                      <Navigation className="w-4 h-4" />
                    </Link>

                    {/* Action : Voir */}
                    <button
                      onClick={() => setViewShipment(s)}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-[#DC2626] hover:bg-zinc-100 transition-colors"
                      title="Voir les détails"
                      aria-label="Voir les détails"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {/* Action : Modifier */}
                    <button
                      onClick={() => handleOpenEdit(s)}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                      title="Modifier le statut"
                      aria-label="Modifier le statut"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    {/* Action : Supprimer */}
                    <button
                      onClick={() => setDeleteTarget(s)}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Supprimer"
                      aria-label="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </tbody>
      </TableContainer>

      {/* MODAL 1 : VOIR */}
      <Modal
        isOpen={!!viewShipment}
        onClose={() => setViewShipment(null)}
        title={viewShipment ? `Envoi ${viewShipment.trackingNumber}` : "Détails de l'envoi"}
        description={viewShipment ? `Client : ${viewShipment.clientName}` : ""}
        maxWidth="lg"
        footer={
          <>
            <Link
              href={viewShipment ? `/track/${viewShipment.trackingNumber}` : "#"}
              target="_blank"
            >
              <Button variant="secondary" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                Ouvrir la vue publique
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={() => setViewShipment(null)}>
              Fermer
            </Button>
          </>
        }
      >
        {viewShipment && (
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between p-3.5 bg-zinc-50 rounded-xl">
              <div>
                <span className="text-xs text-zinc-400 font-bold uppercase">Statut actuel</span>
                <div className="mt-0.5">
                  <Badge status={viewShipment.status} size="md" />
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-zinc-400 font-bold uppercase">Progression</span>
                <div className="text-base font-extrabold text-[#DC2626] mt-0.5">
                  {viewShipment.progress}%
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl border border-zinc-200">
                <span className="text-zinc-400 font-bold uppercase">Origine</span>
                <p className="font-bold text-[#09090B] mt-0.5">{viewShipment.origin}</p>
                <p className="text-zinc-500">{viewShipment.sender}</p>
              </div>
              <div className="p-3 rounded-xl border border-zinc-200">
                <span className="text-zinc-400 font-bold uppercase">Destination</span>
                <p className="font-bold text-[#09090B] mt-0.5">{viewShipment.destination}</p>
                <p className="text-zinc-500">{viewShipment.recipient}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-zinc-200 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-zinc-500">Mode :</span>
                <span className="font-bold text-[#09090B]">{viewShipment.mode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Poids & Volume :</span>
                <span className="font-bold text-[#09090B]">{viewShipment.weight} • {viewShipment.volume}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Navire / Convoi :</span>
                <span className="font-bold text-[#09090B]">{viewShipment.vesselName || "Standard"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Position actuelle :</span>
                <span className="font-bold text-[#DC2626]">{viewShipment.currentLocationName}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* MODAL 2 : MODIFIER */}
      <Modal
        isOpen={!!editShipment}
        onClose={() => setEditShipment(null)}
        title="Modifier le statut d'expédition"
        description={editShipment ? `Bordereau ${editShipment.trackingNumber}` : ""}
        maxWidth="md"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setEditShipment(null)}>
              Annuler
            </Button>
            <Button variant="primary" size="sm" onClick={handleSaveEdit}>
              Enregistrer
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              Statut
            </label>
            <select
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value as ShipmentStatus)}
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
              Progression ({editProgress}%)
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={editProgress}
              onChange={(e) => setEditProgress(Number(e.target.value))}
              className="w-full accent-[#DC2626]"
            />
            <div className="flex justify-between text-[11px] text-zinc-400 mt-1">
              <span>0% (Départ)</span>
              <span>50% (En transit)</span>
              <span>100% (Livré)</span>
            </div>
          </div>
        </div>
      </Modal>

      {/* MODAL 3 : SUPPRIMER */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Confirmer la suppression"
        maxWidth="sm"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setDeleteTarget(null)}>
              Annuler
            </Button>
            <Button variant="danger" size="sm" onClick={handleConfirmDelete}>
              Supprimer
            </Button>
          </>
        }
      >
        <div className="text-center py-2 space-y-3">
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto border border-red-200">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <p className="text-sm text-zinc-700">
            Êtes-vous sûr de vouloir supprimer l&apos;envoi{" "}
            <span className="font-mono font-bold text-[#09090B]">{deleteTarget?.trackingNumber}</span> ?
          </p>
          <p className="text-xs text-zinc-400">Cette action est irréversible et supprimera définitivement le dossier d&apos;expédition.</p>
        </div>
      </Modal>
    </div>
  );
}
