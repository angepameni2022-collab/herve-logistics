"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useToast } from "@/components/ui/Toast";
import { useApp } from "@/context/AppContext";
import {
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle,
  Send,
} from "lucide-react";

export default function ContactPage() {
  const { addContactMessage } = useApp();
  const { showToast } = useToast();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage("Veuillez renseigner votre nom complet.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Veuillez renseigner une adresse email valide.");
      return;
    }
    if (!message.trim() || message.length < 5) {
      setErrorMessage("Veuillez écrire votre message.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      addContactMessage({
        senderName: fullName,
        senderEmail: email,
        phone: phone || undefined,
        subject: "Demande de contact via le formulaire",
        message,
      });
      showToast("✓ Votre message a été envoyé avec succès.", "success");
    }, 700);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFullName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header />

      <main className="flex-1">
        {/* BANNIÈRE SUPÉRIEURE SOLID ROUGE (EXACTE AU SCREENSHOT DE RÉFÉRENCE) */}
        <section className="bg-[#DC2626] text-white pt-10 pb-24 sm:pt-14 sm:pb-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Overline */}
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-red-100 block mb-2">
              CONTACT
            </span>

            {/* H1 Title */}
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
              Parlez à un expert
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-red-50 max-w-xl leading-relaxed font-medium">
              Un devis, une question ou un suivi personnalisé ? Notre équipe est à votre écoute.
            </p>
          </div>
        </section>

        {/* CONTENU PRINCIPAL À 2 COLONNES (CHEVAUCHEMENT ÉLÉGANT) */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 pb-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* GAUCHE : 3 CARTES HORIZONTALES INDÉPENDANTES (5 colonnes) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Carte 1 : Email */}
              <a
                href="mailto:contact@hervelogistics.com"
                className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-xs hover:shadow-md hover:border-red-300 transition-all flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#DC2626] border border-red-100 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-sm sm:text-base font-semibold text-zinc-800 group-hover:text-[#DC2626] transition-colors truncate">
                  contact@hervelogistics.com
                </span>
              </a>

              {/* Carte 2 : Téléphone (Corée du Sud) */}
              <a
                href="tel:+82269598800"
                className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-xs hover:shadow-md hover:border-red-300 transition-all flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#DC2626] border border-red-100 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-sm sm:text-base font-semibold text-zinc-800 group-hover:text-[#DC2626] transition-colors">
                  +82 2-6959-8800 / +82 10-4892-7500
                </span>
              </a>

              {/* Carte 3 : Siège social (Séoul, Corée du Sud) */}
              <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#DC2626] border border-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-0.5 text-xs sm:text-sm text-zinc-600">
                  <div className="font-bold text-[#09090B] text-sm sm:text-base">
                    Hervé Logistics Korea Co., Ltd.
                  </div>
                  <div>Trade Tower, 511 Yeongdong-daero</div>
                  <div>Gangnam-gu, Séoul 06164</div>
                  <div className="text-zinc-500 font-medium">République de Corée (Corée du Sud)</div>
                </div>
              </div>
            </div>

            {/* DROITE : CARTE DU FORMULAIRE DE CONTACT (7 colonnes) */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-9 shadow-lg">
                {isSuccess ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100 shadow-xs">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-[#09090B]">
                      Votre message a été envoyé
                    </h3>
                    <p className="text-sm text-zinc-600 max-w-md mx-auto">
                      Merci pour votre prise de contact. Un expert de l&apos;équipe Hervé Logistics vous répondra dans les plus brefs délais.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Envoyer un autre message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {errorMessage && (
                      <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-[#DC2626] flex items-center gap-2 font-medium">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Champ 1 : Nom complet */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-zinc-800 mb-1.5">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder=""
                        className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 px-3.5 text-sm font-medium text-zinc-900 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
                        required
                      />
                    </div>

                    {/* Ligne à 2 champs : Email & Téléphone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-zinc-800 mb-1.5">
                          Email
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder=""
                          className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 px-3.5 text-sm font-medium text-zinc-900 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-zinc-800 mb-1.5">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder=""
                          className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 px-3.5 text-sm font-medium text-zinc-900 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
                        />
                      </div>
                    </div>

                    {/* Champ : Message */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-zinc-800 mb-1.5">
                        Message
                      </label>
                      <textarea
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder=""
                        className="w-full rounded-xl border border-zinc-200 bg-white p-3.5 text-sm font-medium text-zinc-900 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all resize-y"
                        required
                      />
                    </div>

                    {/* Bouton Noir Pleine Largeur : Envoyer le message */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 px-6 rounded-xl bg-[#09090B] hover:bg-[#18181B] active:bg-black text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-60 cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-white" />
                      <span>{isLoading ? "Envoi en cours..." : "Envoyer le message"}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
