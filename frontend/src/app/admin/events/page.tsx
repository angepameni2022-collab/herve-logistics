"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input, Textarea } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import {
  CalendarCheck2,
  Plus,
  MapPin,
  Calendar,
  Compass,
} from "lucide-react";
import { ShipmentStatus } from "@/data/shipments";

export default function AdminEventsPage() {
  const { shipments, addTrackingEvent } = useApp();
  const { showToast } = useToast();

  const [selectedTrackingNumber, setSelectedTrackingNumber] = useState<string>(
    shipments[0]?.trackingNumber || "HL-2026-000001"
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State for new event
  const [targetShipment, setTargetShipment] = useState(
    shipments[0]?.trackingNumber || "HL-2026-000001"
  );
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("19 avr. 2026");
  const [time, setTime] = useState("14:30");
  const [status, setStatus] = useState<ShipmentStatus>("En transit");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("-2.45");
  const [longitude, setLongitude] = useState("45.10");

  const activeShipment = shipments.find((s) => s.trackingNumber === selectedTrackingNumber) || shipments[0];

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim() || !description.trim()) {
      showToast("Veuillez renseigner le lieu et la description de l'événement.", "error");
      return;
    }

    addTrackingEvent(targetShipment, {
      date,
      time,
      status,
      location,
      description,
      lat: parseFloat(latitude) || undefined,
      lng: parseFloat(longitude) || undefined,
      completed: true,
    });

    setIsAddModalOpen(false);
    showToast("✓ Événement ajouté.", "success");

    // Reset form
    setLocation("");
    setDescription("");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#09090B]">
            Événements de suivi
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Mettez à jour les points de passage, jalons douaniers et positions GPS des navires.
          </p>
        </div>

        <Button
          variant="primary"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => {
            setTargetShipment(selectedTrackingNumber);
            setIsAddModalOpen(true);
          }}
        >
          + Ajouter un événement
        </Button>
      </div>

      {/* Shipment selector card */}
      <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <CalendarCheck2 className="w-5 h-5 text-[#DC2626]" />
          <div>
            <span className="text-xs font-bold uppercase text-zinc-400">Envoi sélectionné :</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-mono font-bold text-base text-[#09090B]">
                {activeShipment?.trackingNumber}
              </span>
              <Badge status={activeShipment?.status} size="sm" />
              <span className="text-xs text-zinc-500">
                ({activeShipment?.origin} → {activeShipment?.destination})
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500 font-medium">Changer d&apos;envoi :</span>
          <select
            value={selectedTrackingNumber}
            onChange={(e) => setSelectedTrackingNumber(e.target.value)}
            className="text-xs font-bold bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
          >
            {shipments.map((s) => (
              <option key={s.trackingNumber} value={s.trackingNumber}>
                {s.trackingNumber} — {s.destination}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Liste des Événements */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-zinc-100">
          <div>
            <h2 className="text-base font-bold text-[#09090B]">
              Chronologie des jalons ({activeShipment?.events?.length || 0})
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Positions géolocalisées enregistrées pour ce bordereau.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {activeShipment?.events?.map((evt, idx) => (
            <div
              key={evt.id}
              className="p-4.5 rounded-xl border border-zinc-200 bg-zinc-50/60 hover:bg-[#FEF2F2]/40 hover:border-red-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-bold text-zinc-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#DC2626]" />
                    {evt.date} à {evt.time}
                  </span>
                  <Badge status={evt.status} size="sm" />
                  {idx === 0 && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-red-100 text-[#DC2626] px-2 py-0.5 rounded-full">
                      Dernier point
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#DC2626] flex-shrink-0" />
                  <h3 className="text-sm font-bold text-[#09090B]">{evt.location}</h3>
                </div>

                <p className="text-xs text-zinc-600 pl-6 leading-relaxed">
                  {evt.description}
                </p>
              </div>

              {evt.lat && evt.lng && (
                <div className="text-right flex-shrink-0 bg-white p-2.5 rounded-lg border border-zinc-200">
                  <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-600">
                    <Compass className="w-3 h-3 text-[#DC2626]" />
                    <span>LAT: {evt.lat.toFixed(2)}°</span>
                  </div>
                  <div className="text-[11px] font-mono text-zinc-500">
                    LNG: {evt.lng.toFixed(2)}°
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* MODAL AJOUTER UN ÉVÉNEMENT */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="+ Ajouter un événement"
        description="Enregistrez une étape de transit ou mise à jour géolocalisée."
        maxWidth="lg"
      >
        <form onSubmit={handleCreateEvent} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              Envoi concerné
            </label>
            <select
              value={targetShipment}
              onChange={(e) => setTargetShipment(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-[#09090B] focus:ring-2 focus:ring-[#DC2626]"
            >
              {shipments.map((s) => (
                <option key={s.trackingNumber} value={s.trackingNumber}>
                  {s.trackingNumber} ({s.origin} → {s.destination})
                </option>
              ))}
            </select>
          </div>

          <div>
            <Input
              label="Lieu *"
              placeholder="Ex: Détroit de Malacca, Point de transit maritime"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                label="Date *"
                placeholder="Ex: 19 avr. 2025"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                label="Heure *"
                placeholder="Ex: 14:30"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              Statut associé
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ShipmentStatus)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-[#09090B] focus:ring-2 focus:ring-[#DC2626]"
            >
              <option value="Expédié">Expédié</option>
              <option value="En transit">En transit</option>
              <option value="Arrivé">Arrivé</option>
              <option value="Livré">Livré</option>
            </select>
          </div>

          <div>
            <Textarea
              label="Description *"
              placeholder="Ex: Passage au large du détroit sous surveillance radar satisfaisante."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Latitude (optionnel)"
              placeholder="Ex: 2.19"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
            <Input
              label="Longitude (optionnel)"
              placeholder="Ex: 102.25"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-100">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>
              Annuler
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Enregistrer l&apos;événement
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
