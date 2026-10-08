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
      icon: <ShieldCheck className="w-6 h-6 text-[#DC2626]" />,
    },
    {
      title: "Proximité",
      desc: "Des conseillers joignables directement et une compréhension approfondie de vos contextes locaux et régionaux.",
      icon: <HeartHandshake className="w-6 h-6 text-[#DC2626]" />,
    },
    {
      title: "Engagement",
      desc: "Une politique éco-responsable, l'optimisation des trajets et la réduction constante de l'empreinte carbone maritime.",
      icon: <Target className="w-6 h-6 text-[#DC2626]" />,
    },
    {
      title: "Excellence",
      desc: "L'amélioration continue de nos processus et l'intégration des meilleures technologies de géolocalisation et de conformité.",
      icon: <Award className="w-6 h-6 text-[#DC2626]" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header />

      <main className="flex-1">
        {/* HERO À PROPOS — NOIR & ROUGE */}
        <section className="bg-[#09090B] text-white py-20 px-4 sm:px-6 lg:px-8 text-center border-b border-zinc-800">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-black p-1 mb-6 shadow-2xl shadow-red-600/30 border border-zinc-800 overflow-hidden">
              <img
                src="/images/logo-herve-hv.png"
                alt="Logo Officiel Hervé Logistics"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-red-400 bg-red-950/60 px-3.5 py-1.5 rounded-full border border-red-500/40">
              Notre Entreprise
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-4">
              {aboutPage.heroTitle}
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
              {aboutPage.heroSubtitle}
            </p>
          </div>
        </section>

        {/* SECTION NOTRE MISSION (BIO OFFICIELLE) */}
        <section className="bg-white border-b border-zinc-200/80 py-16 sm:py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#09090B] text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl border border-zinc-800">
              <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-4xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-500/40 text-[#DC2626] text-xs font-black tracking-wider uppercase mb-6">
                  <Globe className="w-3.5 h-3.5" />
                  <span>NOTRE MISSION & ENGAGEMENT MONDIAL</span>
                </div>

                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.2] mb-6">
                  La même rigueur et transparence que les plus grands transporteurs mondiaux
                </h2>

                <div className="space-y-5 text-base sm:text-lg text-zinc-300 leading-relaxed">
                  <p className="font-medium text-white/95">
                    {aboutPage.missionText1 || "Notre mission est simple : offrir à chaque client la même transparence, la même précision et le même niveau de service que les plus grands transporteurs mondiaux — DHL, FedEx, UPS, MSC, Maersk ou CMA CGM — dans une interface fluide, moderne et sécurisée."}
                  </p>

                  <p className="text-zinc-300">
                    {aboutPage.missionText2 || "Nous accompagnons entreprises, importateurs et particuliers dans le suivi de leurs colis, conteneurs et véhicules à travers plus de 180 pays, 24h/24."}
                  </p>
                </div>

                {/* Badges Leaders Mondiaux */}
                <div className="mt-8 pt-8 border-t border-zinc-800/80 flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 mr-2">
                    Exigence & Standards :
                  </span>
                  {["DHL", "FedEx", "UPS", "MSC", "Maersk", "CMA CGM"].map((carrier) => (
                    <span
                      key={carrier}
                      className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-700/80 text-xs font-mono font-bold text-zinc-200"
                    >
                      {carrier}
                    </span>
                  ))}
                  <span className="px-3.5 py-1.5 rounded-lg bg-red-950/60 border border-red-600/40 text-xs font-black text-red-400 ml-auto">
                    180+ Pays · 24h/24
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION NOTRE HISTOIRE (2 COLONNES) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Colonne Gauche : Texte */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                Genèse & Vision
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#09090B] mt-2 mb-6">
                {aboutPage.historyTitle}
              </h2>

              <p className="text-base text-zinc-600 leading-relaxed mb-4">
                {aboutPage.historyText1}
              </p>

              <p className="text-base text-zinc-600 leading-relaxed mb-6">
                {aboutPage.historyText2}
              </p>

              <div className="space-y-3 pt-2 border-t border-zinc-200">
                <div className="flex items-center gap-3 text-sm text-zinc-700">
                  <CheckCircle2 className="w-5 h-5 text-[#DC2626] flex-shrink-0" />
                  <span>Présence dans plus de 20 pays et corridors maritimes clés.</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-700">
                  <CheckCircle2 className="w-5 h-5 text-[#DC2626] flex-shrink-0" />
                  <span>Certification OEA (Opérateur Économique Agréé) pour le dédouanement.</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-700">
                  <CheckCircle2 className="w-5 h-5 text-[#DC2626] flex-shrink-0" />
                  <span>Plateforme digitale exclusive de suivi télématique en temps réel.</span>
                </div>
              </div>
            </div>

            {/* Colonne Droite : Photo Logistique */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-zinc-200">
                <img
                  src={aboutPage.historyImage}
                  alt="Terminal à conteneurs et infrastructure Hervé Logistics"
                  className="w-full h-[400px] sm:h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-zinc-200 text-[#09090B] shadow-md">
                  <div className="text-xs font-bold text-[#DC2626] uppercase">Infrastructures certifiées</div>
                  <div className="text-sm font-bold mt-0.5">Hub logistique multimodal & terminaux sous douane</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION NOS VALEURS (4 CARTES) */}
        <section className="bg-white border-y border-zinc-200 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                Ce qui nous guide
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#09090B] mt-2 mb-4">
                Nos valeurs fondamentales
              </h2>
              <p className="text-base text-zinc-600">
                Une culture d&apos;entreprise axée sur la satisfaction du client, le respect scrupuleux des normes et la recherche constante de l&apos;efficacité logistique.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((val) => (
                <div
                  key={val.title}
                  className="bg-[#F8FAFC] p-6 rounded-2xl border border-zinc-200 hover:border-red-300 hover:shadow-lg transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#FEF2F2] border border-red-100 group-hover:bg-[#DC2626] group-hover:border-red-600 flex items-center justify-center transition-all mb-5 shadow-xs">
                    {React.cloneElement(val.icon, {
                      className: "w-6 h-6 text-[#DC2626] group-hover:text-white transition-colors",
                    })}
                  </div>
                  <h3 className="text-lg font-bold text-[#09090B] mb-2">{val.title}</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            {stats && stats.length > 0 && (
              <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 border-t border-zinc-100">
                {stats.map((s) => (
                  <div key={s.id} className="text-center">
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#DC2626] tracking-tight">
                      {s.value}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-zinc-700 uppercase tracking-wider mt-1">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* GRANDE SECTION CTA — NOIR ET ROUGE */}
        <section className="bg-[#09090B] text-white py-20 px-4 sm:px-6 lg:px-8 text-center border-t border-zinc-800">
          <div className="max-w-4xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-red-400">
              Prêt à expédier ?
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-3 mb-6">
              Votre partenaire logistique, aujourd&apos;hui et demain.
            </h2>
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto mb-8">
              Bénéficiez de la fiabilité d&apos;un groupe international avec la proximité d&apos;une équipe dédiée à votre projet.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Contacter un conseiller
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-zinc-700 text-white hover:bg-zinc-900"
                >
                  Voir nos solutions
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
