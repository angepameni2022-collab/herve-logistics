"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { Save } from "lucide-react";

export default function AdminSettingsPage() {
  const { showToast } = useToast();
  const [platformName, setPlatformName] = useState("TransLogix");
  const [supportEmail, setSupportEmail] = useState("support@translogix.com");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [aisInterval, setAisInterval] = useState("15");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Paramètres généraux enregistrés.", "success");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#09090B]">
          Paramètres du Système
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Configuration des protocoles télématiques, alertes et notifications de la plateforme.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-xs">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
              Paramètres généraux
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nom de la plateforme"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
              />
              <Input
                label="Email support expéditions"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Intervalle d&apos;actualisation AIS Satellites (Minutes)
              </label>
              <select
                value={aisInterval}
                onChange={(e) => setAisInterval(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-[#09090B] focus:ring-2 focus:ring-[#DC2626]"
              >
                <option value="5">Toutes les 5 minutes (Haute fréquence)</option>
                <option value="15">Toutes les 15 minutes (Recommandé)</option>
                <option value="60">Toutes les 60 minutes</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-100 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
              Notifications et automatisation
            </h3>

            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="rounded border-zinc-300 text-[#DC2626] focus:ring-[#DC2626]"
              />
              <span className="text-sm text-zinc-700 font-medium">
                Notifier automatiquement les clients lors des changements de statut d&apos;envoi
              </span>
            </label>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" variant="primary" leftIcon={<Save className="w-4 h-4" />}>
              Enregistrer les paramètres
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
