"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  User,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { useApp } from "@/context/AppContext";

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const { switchUserRole } = useApp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      showToast("Veuillez saisir votre adresse email.", "error");
      return;
    }
    if (!password.trim()) {
      showToast("Veuillez saisir votre mot de passe.", "error");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      switchUserRole("client");
      showToast("✓ Bienvenue sur votre Espace Client !", "success");
      router.push("/dashboard");
    }, 600);
  };

  const handleFillDemo = () => {
    setEmail("jean.dupont@email.com");
    setPassword("password123");
    showToast("Identifiants démo client appliqués", "info");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8FAFC] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-[#09090B] border-b border-zinc-800 -z-0">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #DC2626 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Top Navbar Bar with Back Button */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-bold transition-all backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4 text-[#DC2626]" />
          <span>Retour à l&apos;accueil</span>
        </Link>

        <div className="text-right">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest hidden sm:inline-block">
            Support Client : <a href="tel:+447456062192" className="text-white hover:text-[#DC2626] transition-colors">+44 7456 062192</a>
          </span>
        </div>
      </header>

      {/* Main Login Card Section */}
      <main className="relative z-10 w-full max-w-md mx-auto px-4 py-8">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-16 h-16 rounded-full bg-white p-0.5 flex items-center justify-center shadow-xl shadow-red-600/25 group-hover:scale-105 transition-transform flex-shrink-0 overflow-hidden">
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
                Portail Voyage & Fret International
              </span>
            </div>
          </Link>
        </div>

        {/* Card Formulaire */}
        <div className="bg-white rounded-3xl border border-zinc-200/90 shadow-2xl shadow-zinc-900/10 p-7 sm:p-9 transition-all">
          {/* Dual Portal Switcher Tabs */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-zinc-100 rounded-2xl mb-7 border border-zinc-200/70">
            <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white text-[#09090B] font-bold text-xs shadow-xs border border-zinc-200">
              <User className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>Espace Client</span>
            </div>
            <Link
              href="/admin/login"
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-zinc-600 hover:text-zinc-900 font-semibold text-xs transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
              <span>Administration</span>
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-2xl font-extrabold text-[#09090B] tracking-tight">
              Connexion Client
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1 leading-relaxed">
              Consultez vos bordereaux, demandes de cotation et historique d&apos;expéditions.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Champ Email */}
            <div>
              <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                Adresse Email ou N° Client <span className="text-[#DC2626]">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nom@entreprise.com"
                  className="w-full rounded-xl border border-zinc-200 bg-white py-3 pl-10 pr-3.5 text-sm font-semibold text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-red-500 focus:ring-3 focus:ring-red-100 transition-all"
                  required
                />
              </div>
            </div>

            {/* Champ Mot de Passe */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-zinc-800">
                  Mot de Passe <span className="text-[#DC2626]">*</span>
                </label>
                <button
                  type="button"
                  onClick={() =>
                    showToast("Instructions de réinitialisation envoyées à votre adresse email.", "info")
                  }
                  className="text-xs text-[#DC2626] hover:text-[#B91C1C] hover:underline font-bold transition-colors cursor-pointer"
                >
                  Mot de passe oublié ?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-zinc-200 bg-white py-3 pl-10 pr-11 text-sm font-semibold text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-red-500 focus:ring-3 focus:ring-red-100 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 p-1 cursor-pointer transition-colors"
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Se souvenir de moi */}
            <div className="flex items-center pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-zinc-600 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-zinc-300 text-[#DC2626] focus:ring-red-500 accent-[#DC2626] cursor-pointer"
                />
                <span>Mémoriser ma session sur cet appareil</span>
              </label>
            </div>

            {/* Bouton de Connexion */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 px-4 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] active:scale-[0.99] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Connexion en cours...</span>
                </>
              ) : (
                <>
                  <span>Accéder à mon Espace Client</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Fill Pill */}
          <div className="mt-5 pt-5 border-t border-zinc-100">
            <button
              type="button"
              onClick={handleFillDemo}
              className="w-full py-2 px-3 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/80 text-[11px] font-bold text-zinc-600 hover:text-[#DC2626] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Remplir automatiquement le compte démo client</span>
            </button>
          </div>

          {/* Inscription Nouveau Client */}
          <div className="mt-5 text-center">
            <p className="text-xs text-zinc-600">
              Vous n&apos;avez pas encore d&apos;accès ?{" "}
              <Link
                href="/auth/register"
                className="font-bold text-[#DC2626] hover:underline inline-flex items-center gap-0.5"
              >
                Créer un compte client
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Security Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Chiffrement SSL 256-bit</span>
          </div>
          <span>•</span>
          <span>Hervé Logistics Korea Co., Ltd.</span>
        </div>
      </main>

      {/* Discreet Bottom Bar */}
      <footer className="relative z-10 text-center py-4 text-xs text-zinc-400 border-t border-zinc-200/50 bg-white/50 backdrop-blur-xs">
        © 2026 Hervé Logistics · Tous droits réservés.
      </footer>
    </div>
  );
}
