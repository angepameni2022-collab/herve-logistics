"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TrackingSearchBox } from "@/components/tracking/TrackingSearchBox";
import { ServiceCard } from "@/components/services/ServiceCard";
import { servicesData } from "@/data/services";
import { useApp } from "@/context/AppContext";
import {
  ShieldCheck,
  Zap,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  const { cmsContent } = useApp();
  const { home, stats } = cmsContent;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header />

      <main className="flex-1">
        {/* HERO SECTION — EXACT REPRODUCTION OF USER REFERENCE SCREENSHOT */}
        <section className="relative min-h-[640px] sm:min-h-[720px] lg:min-h-[780px] flex items-center text-white overflow-hidden pt-28 sm:pt-36 pb-16 sm:pb-24">
          {/* Background Image: Multimodal Logistics (Airplane, Maersk Ship, Truck at Sunset) */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/hero-multimodal.png"
              alt="Hervé Logistics - Transport multimodal maritime, aérien et routier"
              className="w-full h-full object-cover object-center"
            />
            {/* Cinematic Gradient: Balanced contrast for text while showcasing sunset, ship, plane and truck */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl text-left">
              {/* Badge: Official Logo Emblem + International Platform */}
              <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-zinc-700/80 text-white mb-6 shadow-xl">
                <div className="w-7 h-7 rounded-lg bg-black p-0.5 overflow-hidden flex-shrink-0 border border-zinc-700/80 shadow-sm">
                  <img
                    src="/images/logo-herve-hv.png"
                    alt="Logo Officiel Hervé Logistics"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex items-center gap-2 pr-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white text-xs font-black tracking-wider uppercase">HERVÉ LOGISTICS · PLATEFORME OFFICIELLE</span>
                </div>
              </div>

              {/* H1 Main Title: Pure white and vibrant red accent */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.08] mb-5 drop-shadow-md">
                SUIVEZ VOS <span className="text-[#DC2626]">MARCHANDISES</span><br />
                PARTOUT DANS LE MONDE
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base lg:text-lg text-zinc-200 max-w-2xl leading-relaxed mb-8 drop-shadow-sm font-medium">
                Hervé Logistics réunit le maritime, l&apos;aérien, le routier et la livraison de conteneurs sur une seule plateforme. Suivi GPS, escales, ETA et documents — livrés avec la précision des leaders mondiaux.
              </p>

              {/* Prominent Dark Glass Tracking Box with HL-2026-000001 */}
              <div className="w-full max-w-2xl">
                <TrackingSearchBox />

                {/* Banner Inscription Obligatoire & Attribution Code Tracking */}
                <div className="mt-4 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-zinc-700/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
                  <div className="text-xs text-zinc-300">
                    <span className="font-bold text-white block">
                      Vous souhaitez expédier des marchandises depuis la Corée ?
                    </span>
                    <span className="text-zinc-400">
                      Inscription obligatoire : déposez vos informations pour recevoir votre code officiel Hervé Logistics.
                    </span>
                  </div>
                  <Link href="/auth/register" className="flex-shrink-0 w-full sm:w-auto">
                    <button
                      type="button"
                      className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      S&apos;inscrire & Expédier
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES RAPIDES (6 Cartes sous le Hero) */}
        <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                Solutions multimodales
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#09090B] mt-1">
                Nos expertises transport
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#DC2626] hover:text-[#09090B] transition-colors"
            >
              <span>Découvrir tous les services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>

        {/* SECTION EXPÉRIENCE DE SUIVI DIGNE DES LEADERS MONDIAUX (EXACT REPRODUCTION FROM SCREENSHOT) */}
        <section className="py-20 sm:py-28 bg-white border-y border-zinc-200/80 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* LEFT COLUMN: TITLE & FEATURES */}
              <div className="lg:col-span-7">
                {/* Red Overline Badge/Subtitle */}
                <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#DC2626]">
                  POURQUOI HERVÉ LOGISTICS
                </span>

                {/* H2 Title */}
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#09090B] mt-3 mb-5 tracking-tight leading-[1.15]">
                  Une expérience de suivi digne des leaders mondiaux
                </h2>

                {/* Paragraph Description */}
                <div className="space-y-3 mb-8 max-w-xl text-zinc-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    Notre mission est simple : offrir à chaque client la même transparence, la même précision et le même niveau de service que les plus grands transporteurs mondiaux — <strong className="text-[#09090B]">DHL, FedEx, UPS, MSC, Maersk ou CMA CGM</strong> — dans une interface fluide, moderne et sécurisée.
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-500">
                    Nous accompagnons entreprises, importateurs et particuliers dans le suivi de leurs colis, conteneurs et véhicules à travers plus de 180 pays, 24h/24.
                  </p>
                </div>

                {/* 3 Feature Items with Soft Green Badges */}
                <div className="space-y-6">
                  {/* Feature 1: Suivi temps réel */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100/80 flex items-center justify-center flex-shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                      <Zap className="w-5 h-5 fill-emerald-600/20" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-[#09090B]">
                        Suivi temps réel
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-500 mt-0.5 leading-relaxed">
                        Position GPS actualisée, escales, ETA et vitesse en direct.
                      </p>
                    </div>
                  </div>

                  {/* Feature 2: Sécurité maximale */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100/80 flex items-center justify-center flex-shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                      <ShieldCheck className="w-5 h-5 fill-emerald-600/20" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-[#09090B]">
                        Sécurité maximale
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-500 mt-0.5 leading-relaxed">
                        Chiffrement, RLS, protection multi-couches et journal d&apos;activité.
                      </p>
                    </div>
                  </div>

                  {/* Feature 3: Notifications instantanées */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100/80 flex items-center justify-center flex-shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                      <Clock className="w-5 h-5 fill-emerald-600/20" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-[#09090B]">
                        Notifications instantanées
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-500 mt-0.5 leading-relaxed">
                        À chaque étape, vous êtes informé automatiquement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: HIGH-FIDELITY TRACKING PREVIEW CARD */}
              <div className="lg:col-span-5 relative">
                {/* Soft subtle red ambient halo glow behind the card */}
                <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-tr from-red-500/20 via-red-100/30 to-transparent rounded-[2.5rem] blur-2xl -z-10 pointer-events-none" />

                <Link
                  href="/track/HL-2026-000001"
                  className="block bg-white rounded-3xl border border-zinc-200/90 shadow-2xl hover:shadow-red-500/10 hover:border-zinc-300 transition-all duration-300 overflow-hidden group"
                  title="Cliquez pour tester le suivi interactif"
                >
                  {/* Card Header (Deep Carbon Black) */}
                  <div className="bg-[#09090B] p-6 sm:p-7 text-white">
                    <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-semibold mb-1">
                      NUMÉRO DE SUIVI
                    </div>
                    <div className="text-xl sm:text-2xl font-black font-mono tracking-tight text-white mb-3 flex items-center justify-between">
                      <span>HL-2026-000001</span>
                      <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-zinc-400 group-hover:text-[#DC2626] transition-colors">
                        Voir →
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-3">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>En transit — 68% complété</span>
                    </div>

                    {/* Progress Bar (Red glow gradient) */}
                    <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full w-[68%] bg-gradient-to-r from-[#DC2626] to-[#EF4444] rounded-full animate-shimmer" />
                    </div>
                  </div>

                  {/* Card Body (Vertical Connected Timeline) */}
                  <div className="p-6 sm:p-8 space-y-6 bg-white">
                    {/* Step 1: Départ Shanghai */}
                    <div className="flex items-start gap-4 relative">
                      <div className="flex flex-col items-center">
                        <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-emerald-50 flex-shrink-0" />
                        <div className="w-0.5 h-9 bg-emerald-500/40 mt-1" />
                      </div>
                      <div className="-mt-0.5">
                        <div className="text-sm font-bold text-[#09090B]">Départ Shanghai</div>
                        <div className="text-xs text-zinc-400 mt-0.5 font-medium">Il y a 12 jours</div>
                      </div>
                    </div>

                    {/* Step 2: Escale Singapour */}
                    <div className="flex items-start gap-4 relative">
                      <div className="flex flex-col items-center">
                        <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-emerald-50 flex-shrink-0" />
                        <div className="w-0.5 h-9 bg-zinc-200 mt-1" />
                      </div>
                      <div className="-mt-0.5">
                        <div className="text-sm font-bold text-[#09090B]">Escale Singapour</div>
                        <div className="text-xs text-zinc-400 mt-0.5 font-medium">Il y a 5 jours</div>
                      </div>
                    </div>

                    {/* Step 3: En mer d'Arabie (Current Step in Red) */}
                    <div className="flex items-start gap-4 relative">
                      <div className="flex flex-col items-center">
                        <div className="w-3.5 h-3.5 rounded-full bg-[#DC2626] ring-4 ring-red-100 flex-shrink-0 animate-pulse" />
                        <div className="w-0.5 h-9 bg-zinc-200 mt-1" />
                      </div>
                      <div className="-mt-0.5">
                        <div className="text-sm font-bold text-[#DC2626]">En mer d&apos;Arabie</div>
                        <div className="text-xs text-zinc-400 mt-0.5 font-medium">Actuellement</div>
                      </div>
                    </div>

                    {/* Step 4: Arrivée Le Havre / Douala (ETA) */}
                    <div className="flex items-start gap-4">
                      <div className="w-3.5 h-3.5 rounded-full bg-zinc-300 ring-4 ring-zinc-100 flex-shrink-0" />
                      <div className="-mt-0.5">
                        <div className="text-sm font-semibold text-zinc-600">Arrivée Le Havre</div>
                        <div className="text-xs text-zinc-400 mt-0.5 font-medium">Dans 4 jours (ETA)</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Optional CMS Stats Block */}
            {stats && stats.length > 0 && (
              <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 border-t border-zinc-100">
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

        {/* CTA BANNER NOIR CARBONE & ROUGE */}
        <section className="bg-[#09090B] text-white py-16 sm:py-20 relative overflow-hidden border-t border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-red-400">
                Assistance continue
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2 mb-3">
                {home.ctaBannerTitle}
              </h2>
              <p className="text-base text-zinc-300">{home.ctaBannerDesc}</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-[#DC2626] hover:bg-[#B91C1C] text-white shadow-lg shadow-red-600/30 text-base"
                >
                  {home.ctaButtonText}
                </Button>
              </Link>
              <Link href="/track/HL-2026-000001">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-zinc-700 text-white hover:bg-zinc-900 text-base"
                >
                  Suivre un envoi en direct
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
