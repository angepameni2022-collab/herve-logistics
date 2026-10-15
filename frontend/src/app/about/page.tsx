"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useApp } from "@/context/AppContext";
import { ShieldCheck, HeartHandshake, Target, Award, ArrowRight, CheckCircle2, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
  const { cmsContent } = useApp();
  const { aboutPage, stats } = cmsContent;

  const values = [
    {
      title: "Fiabilité",
      desc: "Chaque expédition est traitée avec une rigueur absolue. Nous tenons nos engagements de délais et de sécurité.",
      icon: <ShieldCheck className="w-6 h-6 text-[#FFB800]" />,
    },
    {
      title: "Proximité",
      desc: "Des conseillers joignables directement et une compréhension approfondie de vos contextes locaux et régionaux.",
      icon: <HeartHandshake className="w-6 h-6 text-[#FFB800]" />,
    },
    {
      title: "Engagement",
      desc: "Une politique éco-responsable, l'optimisation des trajets et la réduction constante de l'empreinte carbone maritime.",
      icon: <Target className="w-6 h-6 text-[#FFB800]" />,
    },
    {
      title: "Excellence",
      desc: "L'amélioration continue de nos processus et l'intégration des meilleures technologies de géolocalisation et de conformité.",
      icon: <Award className="w-6 h-6 text-[#FFB800]" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header />

      <main className="flex-1">
        {/* HERO À PROPOS — MAERSK NETWORK */}
        <section className="bg-gradient-to-b from-white via-[#FFFBEB]/50 to-white text-slate-900 pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 text-center border-b border-slate-200">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-black p-2 mb-6 shadow-xl shadow-[#121212]/20 border border-slate-200 overflow-hidden">
              <img
                src="/images/logo-herve-official.png"
                alt="Logo Officiel Hervé Logistics"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-display text-xs font-bold uppercase tracking-widest text-[#B45309] bg-[#FFFBEB] px-3.5 py-1.5 rounded-sm border border-[#FFB800]/30">
              Notre Entreprise · Herv� Logistics Network
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold uppercase text-[#121212] mt-4 mb-4 tracking-tight">
              {aboutPage.heroTitle}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {aboutPage.heroSubtitle}
            </p>
          </div>
        </section>

        {/* SECTION NOTRE MISSION */}
        <section className="bg-white border-b border-slate-200/80 py-16 sm:py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#121212] text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl border border-[#27272A]">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFB800]/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-4xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-white/10 border border-white/20 text-[#FFB800] font-display text-xs font-bold tracking-wider uppercase mb-6 shadow-xs">
                  <Globe className="w-3.5 h-3.5" />
                  <span>NOTRE MISSION & ENGAGEMENT MONDIAL</span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-white tracking-tight leading-[1.05] mb-6">
                  Une exigence alignée sur les meilleurs standards mondiaux du transport
                </h2>

                <div className="space-y-5 text-base sm:text-lg text-white/85 leading-relaxed font-normal">
                  <p className="text-white font-medium">
                    {aboutPage.missionText1 || "Notre mission est simple : offrir à chaque importateur, entreprise et particulier une transparence totale, une précision d'orfèvre et un suivi télématique en temps réel, dans une interface fluide, moderne et hautement sécurisée."}
                  </p>

                  <p className="text-white/70">
                    {aboutPage.missionText2 || "Nous orchestrons le suivi de vos colis, conteneurs maritimes et véhicules à travers plus de 180 pays, en intégrant les données télématiques et les manifestes douaniers 24h/24."}
                  </p>
                </div>

                {/* Badges Interopérabilité Réseaux */}
                <div className="mt-8 pt-8 border-t border-white/15 flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="font-display text-xs font-bold uppercase tracking-wider text-white/60 mr-2">
                    Interopérabilité réseaux & corridors :
                  </span>
                  {["Lignes Maritimes Océaniques", "Fret Aérien IATA", "Connaissements B/L", "Corridors Portuaires"].map((carrier) => (
                    <span
                      key={carrier}
                      className="px-3.5 py-1.5 rounded-sm bg-white/10 border border-white/15 text-xs font-mono font-medium text-white shadow-xs"
                    >
                      {carrier}
                    </span>
                  ))}
                  <span className="px-3.5 py-1.5 rounded-sm bg-[#FFB800] text-xs font-display font-extrabold uppercase tracking-wider text-[#121212] ml-auto shadow-xs">
                    180+ Pays · 24h/24
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION NOTRE HISTOIRE */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Colonne Gauche : Texte */}
            <div>
              <span className="font-display text-xs font-bold uppercase tracking-wider text-[#B45309]">
                Genèse & Vision
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-[#121212] mt-2 mb-6 tracking-tight">
                {aboutPage.historyTitle}
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-4 font-normal">
                {aboutPage.historyText1}
              </p>

              <p className="text-base text-slate-600 leading-relaxed mb-6 font-normal">
                {aboutPage.historyText2}
              </p>

              <div className="space-y-3 pt-2 border-t border-slate-200">
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-[#FFB800] flex-shrink-0" />
                  <span>Présence dans plus de 20 pays et corridors maritimes clés.</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-[#FFB800] flex-shrink-0" />
                  <span>Certification OEA (Opérateur Économique Agréé) pour le dédouanement.</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-[#FFB800] flex-shrink-0" />
                  <span>Plateforme digitale exclusive de suivi télématique en temps réel.</span>
                </div>
              </div>
            </div>

            {/* Colonne Droite : Photo Logistique */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
                <img
                  src={aboutPage.historyImage}
                  alt="Terminal à conteneurs et infrastructure Hervé Logistics"
                  className="w-full h-[400px] sm:h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/85 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 text-[#121212] shadow-md">
                  <div className="font-display text-xs font-bold text-[#B45309] uppercase">Infrastructures certifiées</div>
                  <div className="text-sm font-bold mt-0.5">Hub logistique multimodal & terminaux sous douane</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION NOS VALEURS */}
        <section className="bg-white border-y border-slate-200 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="font-display text-xs font-bold uppercase tracking-wider text-[#B45309]">
                Ce qui nous guide
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-[#121212] mt-2 mb-4 tracking-tight">
                Nos valeurs fondamentales
              </h2>
              <p className="text-base text-slate-600 font-normal">
                Une culture d&apos;entreprise axée sur la satisfaction du client, le respect scrupuleux des normes et la recherche constante de l&apos;efficacité logistique.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((val) => (
                <div
                  key={val.title}
                  className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200 hover:border-[#FFB800] hover:shadow-lg transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#FFFBEB] border border-[#FFB800]/20 group-hover:bg-[#FFB800] flex items-center justify-center transition-all mb-5 shadow-xs">
                    {React.cloneElement(val.icon, {
                      className: "w-6 h-6 text-[#121212] group-hover:text-white transition-colors",
                    })}
                  </div>
                  <h3 className="font-display text-xl font-bold uppercase text-[#121212] mb-2">{val.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">{val.desc}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            {stats && stats.length > 0 && (
              <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 border-t border-slate-100">
                {stats.map((s) => (
                  <div key={s.id} className="text-center">
                    <div className="font-display text-4xl lg:text-5xl font-extrabold text-[#B45309] tracking-tight">
                      {s.value}
                    </div>
                    <div className="font-display text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider mt-1">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* GRANDE SECTION CTA — DEEP NAVY */}
        <section className="bg-gradient-brand text-white py-20 px-4 sm:px-6 lg:px-8 text-center border-t border-[#27272A]">
          <div className="max-w-4xl mx-auto">
            <span className="font-display text-xs font-bold uppercase tracking-widest text-[#FFB800]">
              Prêt à expédier ?
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase text-white mt-3 mb-6 tracking-tight">
              Votre partenaire logistique, aujourd&apos;hui et demain.
            </h2>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-8 font-normal">
              Bénéficiez de la fiabilité d&apos;un groupe international avec la proximité d&apos;une équipe dédiée à votre projet.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact">
                <button
                  type="button"
                  className="px-8 py-3.5 rounded-sm bg-[#FFB800] hover:bg-[#E5A800] text-[#121212] font-display font-extrabold uppercase tracking-wider text-sm transition-all shadow-lg cursor-pointer"
                >
                  Contacter un conseiller
                </button>
              </Link>
              <Link href="/services">
                <button
                  type="button"
                  className="px-8 py-3.5 rounded-sm bg-transparent border border-white/30 text-white hover:bg-white hover:text-[#121212] font-display font-bold uppercase tracking-wider text-sm transition-all cursor-pointer"
                >
                  Voir nos solutions
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
