"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ConnexionPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{ text: string; type: "error" | "success" } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!email.trim() || !password.trim()) {
      setMessage({ text: "Veuillez renseigner votre email et votre mot de passe.", type: "error" });
      return;
    }

    setIsLoading(true);

    try {
      // Appel API backend Express sur port 5000 avec cookie session
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
      const res = await fetch(`${backendUrl}/api/connexion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: email.trim(), mot_de_passe: password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ text: data.message || "Email ou mot de passe incorrect.", type: "error" });
        setIsLoading(false);
        return;
      }

      setMessage({ text: "Connexion réussie ! Redirection vers votre suivi...", type: "success" });
      setTimeout(() => {
        router.push("/suivi");
      }, 600);
    } catch (err) {
      setMessage({ text: "Erreur serveur ou connexion impossible. Veuillez réessayer.", type: "error" });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#16130f] flex flex-col items-center justify-start font-sans">
      <div className="w-full max-w-[560px] min-h-screen bg-white shadow-lg flex flex-col">
        {/* En-tête avec Menu défilant horizontalement */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="p-4 flex items-center justify-between border-b border-slate-100">
            <Link href="/" className="flex items-center gap-2.5 text-[#16130f] no-underline">
              <div className="w-9 h-9 bg-[#d62828] text-white rounded-lg flex items-center justify-center font-extrabold text-xl font-['Barlow_Condensed',sans-serif]">
                HV
              </div>
              <div>
                <h1 className="font-['Barlow_Condensed',sans-serif] text-lg font-extrabold uppercase text-[#d62828] leading-tight">
                  Hervé Transit
                </h1>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Suivi maritime international
                </p>
              </div>
            </Link>
          </div>

          {/* Menu défilant horizontalement */}
          <nav className="flex overflow-x-auto whitespace-nowrap px-3 scrollbar-none">
            <Link href="/" className="px-3.5 py-3 text-xs font-semibold text-slate-500 hover:text-[#d62828] border-b-2 border-transparent transition-colors">
              Accueil
            </Link>
            <Link href="/services" className="px-3.5 py-3 text-xs font-semibold text-slate-500 hover:text-[#d62828] border-b-2 border-transparent transition-colors">
              Services
            </Link>
            <Link href="/about" className="px-3.5 py-3 text-xs font-semibold text-slate-500 hover:text-[#d62828] border-b-2 border-transparent transition-colors">
              À propos
            </Link>
            <Link href="/contact" className="px-3.5 py-3 text-xs font-semibold text-slate-500 hover:text-[#d62828] border-b-2 border-transparent transition-colors">
              Contact
            </Link>
            <Link href="/connexion" className="px-3.5 py-3 text-xs font-bold text-[#d62828] border-b-2 border-[#d62828]">
              Connexion
            </Link>
          </nav>
        </header>

        {/* Formulaire de Connexion */}
        <main className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
          <div className="space-y-6">
            <div>
              <h2 className="font-['Barlow_Condensed',sans-serif] text-3xl font-extrabold uppercase text-[#16130f] tracking-tight">
                Espace Client
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Connectez-vous pour accéder au suivi en direct de vos expéditions maritimes.
              </p>
            </div>

            {message && (
              <div
                className={`p-3.5 rounded-lg text-xs font-medium leading-relaxed ${
                  message.type === "error"
                    ? "bg-red-50 text-red-700 border border-red-200"
                    : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#16130f] uppercase tracking-wider mb-2" htmlFor="email">
                  Adresse email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre-email@domaine.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#d62828] focus:ring-2 focus:ring-red-100 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#16130f] uppercase tracking-wider mb-2" htmlFor="password">
                  Mot de passe
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#d62828] focus:ring-2 focus:ring-red-100 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-[#d62828] hover:bg-[#8f1212] text-white font-['Barlow_Condensed',sans-serif] text-lg font-bold uppercase tracking-wider rounded-xl transition-colors shadow-md disabled:opacity-50 mt-2"
              >
                {isLoading ? "Connexion en cours..." : "Se connecter"}
              </button>
            </form>

            <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-xl text-xs text-slate-600 space-y-1.5">
              <p className="font-bold text-[#16130f]">Comptes de démonstration préconfigurés :</p>
              <p>Client : <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-[#16130f]">client@hervetransit.com</code> / <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-[#16130f]">Client123!Transit</code></p>
              <p>Admin : <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-[#16130f]">admin@hervetransit.com</code> / <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-[#16130f]">Admin123!Herve</code></p>
            </div>
          </div>
        </main>

        <footer className="p-4 text-center border-t border-slate-100 text-xs text-slate-400">
          © 2026 Hervé Logistics Korea Co., Ltd. Tous droits réservés.
        </footer>
      </div>
    </div>
  );
}
