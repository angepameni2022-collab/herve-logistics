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
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[#FFC700] select-none">
      {/* Carte Blanche Centrale */}
      <div className="bg-white rounded-[26px] sm:rounded-[30px] shadow-2xl shadow-black/15 w-full max-w-[440px] p-7 sm:p-10 relative">
        {/* Lien Retour au site */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 font-medium transition-colors mb-7 group"
        >
          <span className="text-slate-400 group-hover:-translate-x-0.5 transition-transform">←</span>
          <span>Retour au site</span>
        </Link>

        {/* Logo de marque */}
        <div className="flex items-center gap-3.5 mb-7">
          <div className="w-14 h-14 rounded-2xl bg-[#FFC700] p-1 flex items-center justify-center shadow-xs border border-amber-300/60 flex-shrink-0">
            <Image
              src="/images/logo-herve-hv.png"
              alt="Hervé Transit"
              width={48}
              height={48}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <div className="leading-tight">
            <div className="text-xl font-black text-slate-950 tracking-tight flex items-center gap-1.5">
              <span>HERVÉ</span>
              <span className="text-[#DC2626]">TRANSIT</span>
            </div>
            <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mt-0.5">
              GLOBAL LOGISTICS
            </div>
          </div>
        </div>

        {/* Badge Espace Privé */}
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#E5A500] uppercase tracking-wider mb-1.5">
          <Shield className="w-3.5 h-3.5 text-[#E5A500]" />
          <span>ESPACE PRIVÉ</span>
        </div>

        {/* Titre & Sous-titre */}
        <h1 className="text-2xl sm:text-[25px] font-black text-slate-950 tracking-tight leading-snug">
          Connexion à votre espace
        </h1>
        <p className="text-xs sm:text-[13px] text-slate-500 mt-2 mb-6 leading-relaxed">
          Accès sécurisé réservé aux clients et expéditeurs autorisés.
        </p>

        {/* Message d'erreur */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-[#DC2626] font-semibold flex items-center gap-2 mb-4">
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
              className="w-full rounded-xl border border-slate-200/90 bg-white py-3 px-3.5 text-sm text-slate-900 focus:outline-none focus:border-[#FFC700] focus:ring-2 focus:ring-[#FFC700]/30 transition-all font-medium"
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
              className="w-full rounded-xl border border-slate-200/90 bg-white py-3 px-3.5 text-sm text-slate-900 focus:outline-none focus:border-[#FFC700] focus:ring-2 focus:ring-[#FFC700]/30 transition-all font-mono"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3.5 px-4 rounded-xl bg-[#171717] hover:bg-black active:scale-[0.99] text-white font-bold text-sm tracking-wide transition-all shadow-md cursor-pointer disabled:opacity-60"
          >
            {isLoading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>

        {/* Lien de création de compte */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-500">
          <span>Vous souhaitez expédier ? </span>
          <Link
            href="/auth/register"
            className="font-bold text-slate-900 hover:text-[#DC2626] transition-colors"
          >
            Créer un compte d&apos;expédition →
          </Link>
        </div>
      </div>
    </div>
  );
}
