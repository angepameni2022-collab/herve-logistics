"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Box, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { useApp } from "@/context/AppContext";

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const { switchUserRole } = useApp();

  const [email, setEmail] = useState("jean.dupont@email.com");
  const [password, setPassword] = useState("••••••••");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      showToast("Connexion réussie (Mode Démo)", "success");
      if (email.includes("admin")) {
        switchUserRole("admin");
        router.push("/admin");
      } else {
        switchUserRole("client");
        router.push("/dashboard");
      }
    }, 600);
  };

  const handleQuickLogin = (role: "client" | "admin") => {
    if (role === "admin") {
      setEmail("admin@translogix.com");
      switchUserRole("admin");
      showToast("Connexion en tant qu'Administrateur", "info");
      router.push("/admin");
    } else {
      setEmail("jean.dupont@email.com");
      switchUserRole("client");
      showToast("Connexion en tant que Client", "info");
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] relative">
      {/* Background visual accents */}
      <div className="absolute top-0 left-0 right-0 h-80 bg-[#09090B] border-b border-zinc-800 -z-0" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo Card Top */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-[#DC2626] flex items-center justify-center text-white shadow-xl shadow-red-600/30 group-hover:scale-105 transition-transform">
              <span className="text-base font-black tracking-tighter flex items-center gap-0.5">
                HL <span className="text-xs">▶</span>
              </span>
            </div>
            <div className="text-left">
              <span className="text-2xl font-black text-white tracking-tight leading-none block">
                HERVÉ <span className="text-[#DC2626]">LOGISTICS</span>
              </span>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Transit & Logistique Internationale · Corée du Sud
              </span>
            </div>
          </Link>
        </div>

        {/* Card Formulaire */}
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-2xl p-8 sm:p-10">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-extrabold text-[#09090B]">
              Connectez-vous à votre compte
            </h1>
            <p className="text-sm text-zinc-500 mt-1.5">
              Accédez à vos envois et suivez vos commandes.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                label="Email professionnel"
                type="email"
                placeholder="nom@entreprise.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4 text-zinc-400" />}
                required
              />
            </div>

            <div>
              <Input
                label="Mot de passe"
                type="password"
                placeholder="Votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="w-4 h-4 text-zinc-400" />}
                required
              />
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
                onClick={() => showToast("Lien de réinitialisation simulé envoyé par email", "info")}
                className="text-[#DC2626] hover:underline font-bold"
              >
                Mot de passe oublié ?
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-4"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Se connecter
            </Button>
          </form>

          {/* Quick Demo Logins for Client / Admin */}
          <div className="mt-6 pt-6 border-t border-zinc-100">
            <p className="text-xs text-center text-zinc-400 font-bold mb-3">
              Accès rapide démo frontend :
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickLogin("client")}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold bg-[#FEF2F2] text-[#DC2626] hover:bg-red-100 transition-colors border border-red-200"
              >
                <span>Accès Client</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin("admin")}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold bg-zinc-900 text-white hover:bg-black transition-colors"
              >
                <span>Accès Admin</span>
              </button>
            </div>
          </div>

          {/* Register Link */}
          <p className="mt-8 text-center text-xs text-zinc-500">
            Pas encore de compte ?{" "}
            <Link href="/auth/register" className="font-bold text-[#DC2626] hover:underline">
              S&apos;inscrire
            </Link>
          </p>
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
