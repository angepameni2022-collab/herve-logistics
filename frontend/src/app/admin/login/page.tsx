"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Shield, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { useApp } from "@/context/AppContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const { adminLogin, switchUserRole } = useApp();

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanEmail = adminEmail.trim();
    const cleanPassword = adminPassword.trim();

    if (!cleanEmail) {
      setErrorMsg("Veuillez saisir votre adresse email.");
      return;
    }
    if (!cleanPassword) {
      setErrorMsg("Veuillez saisir votre mot de passe.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const success = adminLogin(cleanPassword, cleanEmail);
      if (success) {
        switchUserRole("admin");
        showToast("✓ Authentification Administrateur validée.", "success");
        router.push("/admin");
      } else {
        setErrorMsg("Identifiants incorrects. Veuillez vérifier vos accès administrateur.");
      }
    }, 400);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[#121212] relative overflow-hidden select-none">
      {/* Halos d'ambiance Maersk Blue */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#FFB800]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#27272A]/40 rounded-full blur-2xl pointer-events-none" />

      {/* Carte Blanche Centrale */}
      <div className="bg-white rounded-[26px] sm:rounded-[30px] shadow-2xl shadow-black/40 w-full max-w-[440px] p-7 sm:p-10 relative z-10 border border-slate-100">
        {/* Lien Retour au site */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#121212] font-medium transition-colors mb-7 group"
        >
          <span className="text-slate-400 group-hover:-translate-x-0.5 transition-transform">←</span>
          <span>Retour au site</span>
        </Link>

        {/* Logo de marque Officiel */}
        <div className="flex items-center gap-3.5 mb-7">
          <div className="w-14 h-14 rounded-xl bg-black p-1 flex items-center justify-center shadow-md border border-slate-200 overflow-hidden flex-shrink-0">
            <Image
              src="/images/logo-herve-official.png"
              alt="Hervé Logistics"
              width={56}
              height={56}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="leading-tight">
            <div className="font-display text-2xl font-extrabold text-[#121212] uppercase tracking-tight flex items-center gap-1.5">
              <span>HERVÉ</span>
              <span className="text-[#FFB800]">LOGISTICS</span>
            </div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
              CONSOLE ADMIN · ESPACE RESTREINT
            </div>
          </div>
        </div>

        {/* Badge Espace Privé */}
        <div className="flex items-center gap-1.5 text-xs font-display font-extrabold text-[#B45309] uppercase tracking-wider mb-1.5">
          <Shield className="w-4 h-4 text-[#FFB800]" />
          <span>ESPACE PRIVÉ</span>
        </div>

        {/* Titre & Sous-titre */}
        <h1 className="font-display text-3xl font-extrabold uppercase text-[#121212] tracking-tight leading-tight">
          Connexion administrateur
        </h1>
        <p className="text-xs sm:text-[13px] text-slate-500 mt-2 mb-6 leading-relaxed">
          Réservé aux comptes autorisés. Aucune inscription publique n&apos;est possible.
        </p>

        {/* Message d'erreur */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-semibold flex items-center gap-2 mb-4">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Formulaire de Connexion */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-3 px-3.5 text-sm text-[#121212] focus:outline-none focus:border-[#FFB800] focus:ring-2 focus:ring-[#FFB800]/20 transition-all font-medium"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1.5">
              Mot de passe
            </label>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-3 px-3.5 text-sm text-[#121212] focus:outline-none focus:border-[#FFB800] focus:ring-2 focus:ring-[#FFB800]/20 transition-all font-mono"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3.5 px-4 rounded-xl bg-[#121212] hover:bg-[#27272A] active:scale-[0.99] text-white font-display font-extrabold uppercase tracking-wider text-sm transition-all shadow-lg shadow-[#121212]/25 cursor-pointer disabled:opacity-60"
          >
            {isLoading ? "Vérification en cours..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
