"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { User, Building, Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";

export default function ClientProfilePage() {
  const { currentUser } = useApp();
  const { showToast } = useToast();

  const [name, setName] = useState(currentUser.name);
  const [company, setCompany] = useState(currentUser.company);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [country, setCountry] = useState(currentUser.country);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Profil mis à jour avec succès (Simulation frontend)", "success");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#09090B]">Mon profil</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Gérez vos informations de compte, entreprise et coordonnées de facturation.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-4 pb-6 mb-6 border-b border-zinc-100">
          <div className="w-16 h-16 rounded-2xl bg-[#DC2626] text-white flex items-center justify-center font-extrabold text-xl shadow-md shadow-red-500/20">
            JD
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#09090B]">{name}</h2>
            <p className="text-xs text-zinc-500">{company}</p>
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full mt-1 border border-emerald-200">
              <CheckCircle2 className="w-3 h-3" />
              Compte client certifié
            </span>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Nom complet"
              value={name}
              onChange={(e) => setName(e.target.value)}
              leftIcon={<User className="w-4 h-4 text-zinc-400" />}
            />
            <Input
              label="Raison Sociale / Entreprise"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              leftIcon={<Building className="w-4 h-4 text-zinc-400" />}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email de contact"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4 text-zinc-400" />}
            />
            <Input
              label="Téléphone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              leftIcon={<Phone className="w-4 h-4 text-zinc-400" />}
            />
          </div>

          <div>
            <Input
              label="Pays d'implantation"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              leftIcon={<MapPin className="w-4 h-4 text-zinc-400" />}
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-100">
            <Button type="submit" variant="primary">
              Enregistrer les modifications
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
