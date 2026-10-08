"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck, Eye, EyeOff, User } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { useApp } from "@/context/AppContext";

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const { switchUserRole } = useApp();

  const [email, setEmail] = useState("jean.dupont@email.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      switchUserRole("client");
      showToast("Connexion réussie à votre Espace Client !", "success");
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] relative">
      {/* Background visual accents */}
      <div className="absolute top-0 left-0 right-0 h-80 bg-[#09090B] border-b border-zinc-800 -z-0" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo Top */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-14 h-14 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-xl shadow-red-600/20 group-hover:scale-105 transition-transform flex-shrink-0">
              <Image
                src="/images/logo-herve.png"
                alt="Hervé Logistics Logo"
                width={56}
                height={56}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="text-left">
              <span className="text-2xl font-black text-white tracking-tight leading-none block">
                HERVÉ <span className="text-[#DC2626]">LOGISTICS</span>
              </span>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Transit & Logistique Internationale
              </span>
            </div>
          </Link>
        </div>

        {/* Card Formulaire Client */}
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-2xl p-8 sm:p-10">
          <div className="mb-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-xs font-bold uppercase tracking-wider mb-2">
              <User className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>Espace Client & Expéditions</span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#09090B]">
              Connexion Client
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Consultez vos bordereaux, demandes de cotation et historique.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                Email ou Identifiant Client
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nom@entreprise.com"
                  className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-3.5 text-sm font-semibold text-zinc-900 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                Mot de Passe
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Votre mot de passe"
                  className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-10 text-sm font-semibold text-zinc-900 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Options : Se souvenir de moi & Mot de passe oublié */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-zinc-600 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-zinc-300 text-[#DC2626] focus:ring-[#DC2626]"
                />
                <span>Se souvenir de moi</span>
              </label>

              <button
                type="button"
                onClick={() => showToast("Lien de réinitialisation envoyé par email", "info")}
                className="text-[#DC2626] hover:underline font-bold"
              >
                Mot de passe oublié ?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-3 py-3.5 px-4 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] active:bg-black text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-500/25 transition-all disabled:opacity-60 cursor-pointer"
            >
              <span>{isLoading ? "Connexion en cours..." : "Accéder à mon Espace Client"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Inscription Client */}
          <div className="mt-6 pt-5 border-t border-zinc-100 text-center">
            <p className="text-xs text-zinc-600">
              Vous êtes nouveau client ?{" "}
              <Link href="/auth/register" className="font-bold text-[#DC2626] hover:underline">
                Créer un compte client
              </Link>
            </p>
          </div>

          {/* Formulaire Admin Séparé - Lien dédié */}
          <div className="mt-4 p-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-center">
            <p className="text-[11px] text-zinc-500 mb-1">
              Vous faites partie de l&apos;équipe Hervé Logistics ?
            </p>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-900 hover:text-[#DC2626] transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>Accéder au formulaire d&apos;administration séparé →</span>
            </Link>
          </div>
        </div>

        {/* Security badge footer */}
        <div className="mt-6 text-center text-xs text-zinc-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Portail sécurisé Hervé Logistics Korea · SSL 256-bit</span>
        </div>
      </div>
    </div>
  );
}
