"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Lock,
  Mail,
  KeyRound,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Navigation,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { useApp } from "@/context/AppContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const { adminLogin, switchUserRole } = useApp();

  const [adminEmail, setAdminEmail] = useState("admin@hervelogistics.com");
  const [adminPassword, setAdminPassword] = useState("admin2026");
  const [adminPin, setAdminPin] = useState("2026");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!adminEmail.trim()) {
      setErrorMsg("Veuillez saisir votre identifiant administrateur.");
      return;
    }
    if (!adminPassword.trim()) {
      setErrorMsg("Veuillez saisir le mot de passe administrateur.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const success = adminLogin(adminPassword || adminPin);
      if (success) {
        switchUserRole("admin");
        showToast("✓ Authentification Administrateur validée.", "success");
        router.push("/admin/displacement");
      } else {
        setErrorMsg("Identifiants incorrects. Veuillez utiliser le code démo '2026'.");
      }
    }, 500);
  };

  const handleFillDemo = () => {
    setAdminEmail("admin@hervelogistics.com");
    setAdminPassword("admin2026");
    setAdminPin("2026");
    setErrorMsg(null);
    showToast("Identifiants administrateur préremplis", "info");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-[#09090B] relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navbar Bar with Back Button */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-bold transition-all backdrop-blur-md"
        >
          <span>← Retour à l&apos;accueil</span>
        </Link>
        <div className="text-right">
          <span className="text-[11px] font-bold text-red-400 uppercase tracking-widest hidden sm:inline-block">
            Accès Réservé Personnel Interne
          </span>
        </div>
      </header>

      <div className="relative z-10 w-full max-w-md my-8">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-16 h-16 rounded-full bg-white p-0.5 flex items-center justify-center shadow-xl shadow-red-600/30 group-hover:scale-105 transition-transform flex-shrink-0 overflow-hidden">
              <Image
                src="/images/logo-herve-official.png"
                alt="Hervé Logistics Logo"
                width={64}
                height={64}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="text-left">
              <span className="text-2xl font-black text-white tracking-tight leading-none block">
                HERVÉ <span className="text-[#DC2626]">LOGISTICS</span>
              </span>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Portail de Contrôle Opérationnel & GPS
              </span>
            </div>
          </Link>
        </div>

        {/* Dedicated Admin Card */}
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-2xl p-7 sm:p-9 relative">
          {/* Dual Portal Switcher Tabs */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-zinc-100 rounded-2xl mb-7 border border-zinc-200/70">
            <Link
              href="/auth/login"
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-zinc-600 hover:text-zinc-900 font-semibold text-xs transition-colors"
            >
              <span>Espace Client</span>
            </Link>
            <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white text-[#09090B] font-bold text-xs shadow-xs border border-zinc-200">
              <ShieldCheck className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>Administration</span>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-black text-[#09090B]">
              Console Admin
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Réservé à l&apos;équipe de pilotage pour la gestion et le déplacement des colis.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 mb-5 rounded-xl bg-red-50 border border-red-200 text-xs text-[#DC2626] flex items-center gap-2 font-semibold">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                Identifiant Administrateur
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@hervelogistics.com"
                  className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-3.5 text-sm font-semibold text-zinc-900 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                Mot de Passe / Clé Secrète
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-3.5 text-sm font-semibold text-zinc-900 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all font-mono"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                Code PIN d&apos;autorisation rapide (ex: 2026)
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  maxLength={6}
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  placeholder="2026"
                  className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-3.5 text-sm font-bold text-zinc-900 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all font-mono tracking-widest"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 px-4 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] active:bg-black text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-500/25 transition-all disabled:opacity-60 cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              <span>{isLoading ? "Vérification..." : "Accéder à la Console Admin"}</span>
            </button>
          </form>

          {/* Quick Demo Button */}
          <div className="mt-5 pt-5 border-t border-zinc-100 text-center">
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-xs text-zinc-500 hover:text-[#DC2626] font-semibold transition-colors cursor-pointer"
            >
              ⚡ Remplir avec les identifiants de démonstration (admin@hervelogistics.com / 2026)
            </button>
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/auth/login"
              className="text-xs text-zinc-500 hover:text-zinc-800 transition-colors"
            >
              ← Revenir à l&apos;Espace Client standard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
