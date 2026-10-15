"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Shield, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { useApp } from "@/context/AppContext";

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const { clientLogin, adminLogin } = useApp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

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
      const isAdmin = cleanEmail.includes("admin") || cleanEmail === "admin@hervetransit.com";
      if (isAdmin) {
        adminLogin("admin2026", cleanEmail);
        showToast("✓ Authentification validée.", "success");
        router.push("/admin");
      } else {
        const user = clientLogin(cleanEmail, cleanPassword);
        showToast(`✓ Bienvenue ${user.name || ""} sur votre Espace !`, "success");
        router.push("/dashboard");
      }
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[#001726] relative overflow-hidden select-none">
      {/* Halos d'ambiance Maersk Blue */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#42B0D5]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#003B64]/40 rounded-full blur-2xl pointer-events-none" />

      {/* Carte Blanche Centrale */}
      <div className="bg-white rounded-[26px] sm:rounded-[30px] shadow-2xl shadow-black/40 w-full max-w-[440px] p-7 sm:p-10 relative z-10 border border-slate-100">
        {/* Lien Retour au site */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#00243D] font-medium transition-colors mb-7 group"
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
            <div className="font-display text-2xl font-extrabold text-[#00243D] uppercase tracking-tight flex items-center gap-1.5">
              <span>HERVÉ</span>
              <span className="text-[#42B0D5]">LOGISTICS</span>
            </div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
              GLOBAL LOGISTICS · MAERSK NETWORK
            </div>
          </div>
        </div>

        {/* Badge Espace Privé */}
        <div className="flex items-center gap-1.5 text-xs font-display font-extrabold text-[#0088B8] uppercase tracking-wider mb-1.5">
          <Shield className="w-4 h-4 text-[#42B0D5]" />
          <span>ESPACE PRIVÉ</span>
        </div>

        {/* Titre & Sous-titre */}
        <h1 className="font-display text-3xl font-extrabold uppercase text-[#00243D] tracking-tight leading-tight">
          Connexion à votre espace
        </h1>
        <p className="text-xs sm:text-[13px] text-slate-500 mt-2 mb-6 leading-relaxed">
          Accès sécurisé réservé aux clients et expéditeurs autorisés.
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-3 px-3.5 text-sm text-[#00243D] focus:outline-none focus:border-[#42B0D5] focus:ring-2 focus:ring-[#42B0D5]/20 transition-all font-medium"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1.5">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-3 px-3.5 text-sm text-[#00243D] focus:outline-none focus:border-[#42B0D5] focus:ring-2 focus:ring-[#42B0D5]/20 transition-all font-mono"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3.5 px-4 rounded-xl bg-[#00243D] hover:bg-[#003B64] active:scale-[0.99] text-white font-display font-extrabold uppercase tracking-wider text-sm transition-all shadow-lg shadow-[#00243D]/25 cursor-pointer disabled:opacity-60"
          >
            {isLoading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>

        {/* Lien de création de compte */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-500">
          <span>Vous souhaitez expédier ? </span>
          <Link
            href="/auth/register"
            className="font-display font-bold uppercase tracking-wider text-[#00243D] hover:text-[#42B0D5] transition-colors"
          >
            Créer un compte d&apos;expédition →
          </Link>
        </div>
      </div>
    </div>
  );
}
