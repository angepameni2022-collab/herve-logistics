"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useToast } from "@/components/ui/Toast";
import { useApp } from "@/context/AppContext";
import { COUNTRIES_LIST } from "@/data/countries";
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
  const [phone, setPhone] = useState("+82 ");
  const [country, setCountry] = useState("Corée du Sud");
  const [subject, setSubject] = useState("Demande de cotation / Devis de fret maritime ou aérien");
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
        subject: `[${country}] ${subject}`,
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
        {/* BANNIÈRE SUPÉRIEURE MAERSK DEEP NAVY */}
        <section className="bg-[#00243D] text-white pt-28 pb-24 sm:pt-36 sm:pb-32 px-4 sm:px-6 lg:px-8 border-b border-[#003B64] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#42B0D5]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-6xl mx-auto relative z-10">
            {/* Overline */}
            <span className="font-display text-xs sm:text-sm font-bold uppercase tracking-widest text-[#42B0D5] block mb-2">
              CONTACT & DÉPARTEMENT EXPÉDITION
            </span>

            {/* H1 Title */}
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold uppercase text-white tracking-tight mb-3">
              Parlez à un expert logistique
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-white/80 max-w-xl leading-relaxed font-normal">
              Un devis, une question ou un suivi personnalisé ? Notre équipe est à votre écoute 24/7.
            </p>
          </div>
        </section>

        {/* CONTENU PRINCIPAL À 2 COLONNES */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 pb-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* GAUCHE : CARTES D'INFORMATION */}
            <div className="lg:col-span-5 space-y-4">
              {/* Carte 1 : Email */}
              <a
                href="mailto:contact@hervelogistics.com"
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-[#42B0D5] transition-all flex items-center gap-4 group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#EBF6FA] text-[#00243D] border border-[#42B0D5]/30 flex items-center justify-center flex-shrink-0 group-hover:bg-[#42B0D5] group-hover:text-white transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-sm sm:text-base font-semibold text-slate-800 group-hover:text-[#0088B8] transition-colors truncate">
                  contact@hervelogistics.com
                </span>
              </a>

              {/* Carte 2 : Téléphone */}
              <a
                href="tel:+447456062192"
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-[#42B0D5] transition-all flex items-center gap-4 group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#EBF6FA] text-[#00243D] border border-[#42B0D5]/30 flex items-center justify-center flex-shrink-0 group-hover:bg-[#42B0D5] group-hover:text-white transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display text-xs text-slate-400 font-bold uppercase tracking-wider">Téléphone direct</div>
                  <span className="text-sm sm:text-base font-bold text-[#00243D] group-hover:text-[#0088B8] transition-colors">
                    +44 7456 062192
                  </span>
                </div>
              </a>

              {/* Carte WhatsApp */}
              <a
                href="https://wa.me/447456062192"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl border border-emerald-200 p-5 shadow-xs hover:shadow-md hover:border-emerald-400 transition-all flex items-center gap-4 group"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.177 8.177 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m-3.52 4.09c-.19 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.21 3.07.15.2 2.06 3.29 5.09 4.49 2.52 1 3.03.8 3.58.75.55-.05 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.89-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51z" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-display text-xs text-emerald-700 font-bold uppercase tracking-wider">Support WhatsApp 24/7</span>
                  </div>
                  <span className="text-sm sm:text-base font-bold text-emerald-900 group-hover:text-emerald-700 transition-colors">
                    Discuter au +44 7456 062192
                  </span>
                </div>
              </a>

              {/* Carte 3 : Siège social */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#EBF6FA] text-[#00243D] border border-[#42B0D5]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-[#42B0D5]" />
                </div>
                <div className="space-y-0.5 text-xs sm:text-sm text-slate-600">
                  <div className="font-display font-bold text-[#00243D] text-base uppercase">
                    Hervé Logistics Korea Co., Ltd.
                  </div>
                  <div>Trade Tower, 511 Yeongdong-daero</div>
                  <div>Gangnam-gu, Séoul 06164</div>
                  <div className="text-slate-500 font-medium">République de Corée (Corée du Sud)</div>
                </div>
              </div>
            </div>

            {/* DROITE : FORMULAIRE DE CONTACT */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xl">
                {isSuccess ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100 shadow-xs">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className="font-display text-2xl font-bold uppercase text-[#00243D]">
                      Votre message a été envoyé
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto">
                      Merci pour votre prise de contact. Un conseiller de l&apos;équipe Hervé Logistics vous répondra dans les plus brefs délais.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-sm bg-[#00243D] hover:bg-[#003B64] text-white font-display text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Envoyer un autre message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {errorMessage && (
                      <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 flex items-center gap-2 font-medium">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Champ 1 : Nom complet */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
                        Nom complet <span className="text-[#0088B8]">*</span>
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ex: Paul Martin"
                        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3.5 text-sm font-medium text-slate-900 focus:outline-none focus:border-[#42B0D5] focus:ring-2 focus:ring-[#42B0D5]/20 transition-all"
                        required
                      />
                    </div>

                    {/* Champ 2 : Email */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
                        Adresse Email <span className="text-[#0088B8]">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="votre.email@domaine.com"
                        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3.5 text-sm font-medium text-slate-900 focus:outline-none focus:border-[#42B0D5] focus:ring-2 focus:ring-[#42B0D5]/20 transition-all"
                        required
                      />
                    </div>

                    {/* Ligne à 2 champs : Pays & Téléphone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
                          Pays concerné
                        </label>
                        <select
                          value={country}
                          onChange={(e) => {
                            const newCountry = e.target.value;
                            setCountry(newCountry);
                            const found = COUNTRIES_LIST.find((c) => c.name === newCountry);
                            if (found?.dialCode) {
                              setPhone(found.dialCode + " ");
                            }
                          }}
                          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3.5 text-sm font-medium text-slate-900 focus:outline-none focus:border-[#42B0D5] focus:ring-2 focus:ring-[#42B0D5]/20 transition-all"
                        >
                          {COUNTRIES_LIST.map((c) => (
                            <option key={c.code} value={c.name}>
                              {c.name} {c.dialCode ? `(${c.dialCode})` : ""}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
                          Numéro de Téléphone
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+82 ... ou +237..."
                          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3.5 text-sm font-medium text-slate-900 focus:outline-none focus:border-[#42B0D5] focus:ring-2 focus:ring-[#42B0D5]/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Ligne : Objet de la demande */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
                        Objet de votre demande
                      </label>
                      <select
                        aria-label="Objet de votre demande"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3.5 text-sm font-medium text-slate-900 focus:outline-none focus:border-[#42B0D5] focus:ring-2 focus:ring-[#42B0D5]/20 transition-all"
                      >
                        <option value="Demande de cotation / Devis de fret maritime ou aérien">Demande de cotation / Devis de fret maritime ou aérien</option>
                        <option value="Assistance sur le suivi d'une expédition en cours">Assistance sur le suivi d&apos;une expédition en cours</option>
                        <option value="Formalités de dédouanement et transit portuaire">Formalités de dédouanement et transit portuaire</option>
                        <option value="Partenariat commercial & affrètement régulier">Partenariat commercial & affrètement régulier</option>
                        <option value="Autre renseignement">Autre renseignement</option>
                      </select>
                    </div>

                    {/* Champ : Message */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                          Votre message détaillé <span className="text-[#0088B8]">*</span>
                        </label>
                        <span className="text-[11px] text-slate-400">Précisez vos volumes et destinations</span>
                      </div>
                      <textarea
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Bonjour, je souhaite expédier un conteneur depuis Busan vers Douala..."
                        className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-sm font-medium text-slate-900 focus:outline-none focus:border-[#42B0D5] focus:ring-2 focus:ring-[#42B0D5]/20 transition-all resize-y"
                        required
                      />
                    </div>

                    {/* Bouton Maersk Blue / Navy */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 px-6 rounded-xl bg-[#00243D] hover:bg-[#003B64] active:scale-[0.99] text-white font-display font-extrabold uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#00243D]/20 transition-all disabled:opacity-60 cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-[#42B0D5]" />
                      <span>{isLoading ? "Envoi en cours..." : "Transmettre ma demande à l'équipe"}</span>
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
