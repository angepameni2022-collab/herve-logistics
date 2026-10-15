"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TrackingSearchBox } from "@/components/tracking/TrackingSearchBox";
import {
  Ship,
  Plane,
  Truck,
  Boxes,
  Package,
  Globe2,
  Car,
  Warehouse,
  Zap,
  Shield,
  Clock,
  ArrowRight,
  Search,
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [ctaTracking, setCtaTracking] = useState("");

  const handleCtaSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (ctaTracking.trim()) {
      router.push(`/track/${encodeURIComponent(ctaTracking.trim())}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header />

      <main className="flex-1">
        {/* ============================================================ */}
        {/* 1. HERO SECTION (INCHANGÉ — GARDE VOTRE HERO ORIGINAL) */}
        {/* ============================================================ */}
        <section className="relative min-h-[640px] sm:min-h-[720px] lg:min-h-[780px] flex items-center text-white overflow-hidden pt-28 sm:pt-36 pb-16 sm:pb-24">
          {/* Background Image: Multimodal Logistics */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/hero-multimodal.png"
              alt="Hervé Logistics - Transport multimodal maritime, aérien et routier"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl text-left">
              {/* Badge: Official Logo Emblem (Bright & Luminous) */}
              <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/60 text-slate-900 mb-6 shadow-xl">
                <div className="w-7 h-7 rounded-lg bg-[#DC2626] p-0.5 overflow-hidden flex-shrink-0 border border-red-700/30 shadow-xs flex items-center justify-center">
                  <span className="font-mono text-xs font-black text-white leading-none">HV</span>
                </div>
                <div className="flex items-center gap-2 pr-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-slate-900 text-xs font-black tracking-wider uppercase">
                    HERVÉ LOGISTICS · PLATEFORME OFFICIELLE
                  </span>
                </div>
              </div>

              {/* H1 Main Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.08] mb-5 drop-shadow-lg">
                SUIVEZ VOS <span className="text-[#DC2626]">MARCHANDISES</span><br />
                PARTOUT DANS LE MONDE
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl leading-relaxed mb-8 drop-shadow-md font-medium">
                Hervé Logistics réunit le maritime, l&apos;aérien, le routier et la livraison de conteneurs sur une seule plateforme. Suivi GPS, escales, ETA et documents — livrés avec la précision des leaders mondiaux.
              </p>

              {/* Barre de recherche Hero */}
              <div id="tracking" className="w-full max-w-2xl scroll-mt-28">
                <TrackingSearchBox />

                {/* Carte d'information lumineuse et accueillante */}
                <div className="mt-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/90 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
                  <div className="text-xs text-slate-600">
                    <span className="font-black text-slate-900 block text-sm">
                      Vous souhaitez expédier des marchandises depuis la Corée ?
                    </span>
                    <span className="text-slate-600 font-medium mt-0.5 block">
                      Inscription obligatoire : déposez vos informations pour recevoir votre code officiel Hervé Logistics.
                    </span>
                  </div>
                  <Link href="/auth/register" className="flex-shrink-0 w-full sm:w-auto">
                    <button
                      type="button"
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#DC2626] to-[#E11D48] hover:from-[#B91C1C] hover:to-[#BE123C] text-white font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-red-500/25 active:scale-95 cursor-pointer"
                    >
                      S&apos;inscrire & Expédier
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 2. BANDE STATISTIQUES (LUMINEUSE, GAIE ET CHALEUREUSE) */}
        {/* ============================================================ */}
        <section className="bg-gradient-to-b from-white via-red-50/30 to-white text-slate-900 border-y border-slate-200/90 py-16 shadow-xs relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center p-6 rounded-2xl bg-white border border-red-100 shadow-sm hover:shadow-md hover:border-red-200 transition-all">
              <div className="font-mono text-4xl lg:text-5xl font-black bg-gradient-to-r from-[#DC2626] to-[#E11D48] bg-clip-text text-transparent">
                180+
              </div>
              <div className="mt-2 text-xs text-slate-600 uppercase tracking-widest font-extrabold">
                Pays desservis
              </div>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white border border-red-100 shadow-sm hover:shadow-md hover:border-red-200 transition-all">
              <div className="font-mono text-4xl lg:text-5xl font-black bg-gradient-to-r from-[#DC2626] to-[#E11D48] bg-clip-text text-transparent">
                24/7
              </div>
              <div className="mt-2 text-xs text-slate-600 uppercase tracking-widest font-extrabold">
                Suivi temps réel
              </div>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white border border-red-100 shadow-sm hover:shadow-md hover:border-red-200 transition-all">
              <div className="font-mono text-4xl lg:text-5xl font-black bg-gradient-to-r from-[#DC2626] to-[#E11D48] bg-clip-text text-transparent">
                99.4%
              </div>
              <div className="mt-2 text-xs text-slate-600 uppercase tracking-widest font-extrabold">
                Taux de livraison
              </div>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white border border-red-100 shadow-sm hover:shadow-md hover:border-red-200 transition-all">
              <div className="font-mono text-4xl lg:text-5xl font-black bg-gradient-to-r from-[#DC2626] to-[#E11D48] bg-clip-text text-transparent">
                10M+
              </div>
              <div className="mt-2 text-xs text-slate-600 uppercase tracking-widest font-extrabold">
                Colis suivis
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. NOS SERVICES (CATALOGUE COMPLET DES 8 SERVICES) */}
        {/* ============================================================ */}
        <section id="services" className="py-24 bg-slate-50/70 border-b border-slate-200/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <div className="text-xs font-black text-[#DC2626] uppercase tracking-widest">
                Nos services
              </div>
              <h2 className="mt-2 font-black text-3xl sm:text-4xl text-[#09090B] tracking-tight">
                Une logistique complète, sans frontières
              </h2>
              <p className="mt-3 text-sm sm:text-base text-zinc-600">
                De l&apos;entrepôt d&apos;origine en Corée du Sud à la porte de votre destinataire en Afrique ou à l&apos;international — Hervé Logistics orchestre chaque étape.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Carte 1: Transport Maritime */}
              <div className="group p-6 rounded-2xl bg-white border border-zinc-200/90 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between">
                <div>
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#DC2626] to-[#8f1212] flex items-center justify-center text-white shadow-md group-hover:shadow-red-500/30 transition-shadow">
                    <Ship className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-[#09090B]">
                    Transport Maritime
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-zinc-500 leading-relaxed">
                    Conteneurs FCL/LCL, navires directs Busan ➔ Douala & Kribi, dédouanement portuaire complet.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-100 text-[11px] font-bold text-[#DC2626] uppercase tracking-wider">
                  FCL · LCL · RoRo
                </div>
              </div>

              {/* Carte 2: Transport Aérien */}
              <div className="group p-6 rounded-2xl bg-white border border-zinc-200/90 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between">
                <div>
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#DC2626] to-[#8f1212] flex items-center justify-center text-white shadow-md group-hover:shadow-red-500/30 transition-shadow">
                    <Plane className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-[#09090B]">
                    Transport Aérien
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-zinc-500 leading-relaxed">
                    Fret express et standard depuis l&apos;aéroport d&apos;Incheon (ICN), tracking temps réel, conformité IATA.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-100 text-[11px] font-bold text-[#DC2626] uppercase tracking-wider">
                  Express · Standard · Charter
                </div>
              </div>

              {/* Carte 3: Transport Routier */}
              <div className="group p-6 rounded-2xl bg-white border border-zinc-200/90 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between">
                <div>
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#DC2626] to-[#8f1212] flex items-center justify-center text-white shadow-md group-hover:shadow-red-500/30 transition-shadow">
                    <Truck className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-[#09090B]">
                    Transport Routier
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-zinc-500 leading-relaxed">
                    Livraison porte-à-porte, acheminement vers les villes intérieures, groupage et camions dédiés.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-100 text-[11px] font-bold text-[#DC2626] uppercase tracking-wider">
                  Door-to-Door · Flotte GPS
                </div>
              </div>

              {/* Carte 4: Gestion de Conteneurs */}
              <div className="group p-6 rounded-2xl bg-white border border-zinc-200/90 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between">
                <div>
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#DC2626] to-[#8f1212] flex items-center justify-center text-white shadow-md group-hover:shadow-red-500/30 transition-shadow">
                    <Boxes className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-[#09090B]">
                    Gestion Conteneurs
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-zinc-500 leading-relaxed">
                    20&apos;, 40&apos;, High Cube, Reefer. Suivi par coordonnées GPS maritimes et scellés numériques.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-100 text-[11px] font-bold text-[#DC2626] uppercase tracking-wider">
                  20&apos; · 40&apos; · HC · Reefer
                </div>
              </div>

              {/* Carte 5: Vente & Transport Véhicules */}
              <div className="group p-6 rounded-2xl bg-white border border-zinc-200/90 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between">
                <div>
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#DC2626] to-[#8f1212] flex items-center justify-center text-white shadow-md group-hover:shadow-red-500/30 transition-shadow">
                    <Car className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-[#09090B]">
                    Transport Véhicules
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-zinc-500 leading-relaxed">
                    Achat, inspection technique et fret RoRo ou conteneur auto de véhicules neufs et d&apos;occasion.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-100 text-[11px] font-bold text-[#DC2626] uppercase tracking-wider">
                  RoRo · Auto sécurisé
                </div>
              </div>

              {/* Carte 6: Colis & Fret */}
              <div className="group p-6 rounded-2xl bg-white border border-zinc-200/90 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between">
                <div>
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#DC2626] to-[#8f1212] flex items-center justify-center text-white shadow-md group-hover:shadow-red-500/30 transition-shadow">
                    <Package className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-[#09090B]">
                    Colis & Fret
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-zinc-500 leading-relaxed">
                    Des petits colis aux palettes industrielles complètes, assurance fret maritime et notifications.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-100 text-[11px] font-bold text-[#DC2626] uppercase tracking-wider">
                  Messagerie · Assurance
                </div>
              </div>

              {/* Carte 7: Import / Export */}
              <div className="group p-6 rounded-2xl bg-white border border-zinc-200/90 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between">
                <div>
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#DC2626] to-[#8f1212] flex items-center justify-center text-white shadow-md group-hover:shadow-red-500/30 transition-shadow">
                    <Globe2 className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-[#09090B]">
                    Import / Export
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-zinc-500 leading-relaxed">
                    Documentation export Asie, licences maritimes, déclarations en douane et certificat d&apos;origine.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-100 text-[11px] font-bold text-[#DC2626] uppercase tracking-wider">
                  Douane · Licences · OEA
                </div>
              </div>

              {/* Carte 8: Entreposage & Consolidation */}
              <div className="group p-6 rounded-2xl bg-white border border-zinc-200/90 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between">
                <div>
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#DC2626] to-[#8f1212] flex items-center justify-center text-white shadow-md group-hover:shadow-red-500/30 transition-shadow">
                    <Warehouse className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-[#09090B]">
                    Entreposage & Consolidation
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-zinc-500 leading-relaxed">
                    Hubs logistiques sous douane, consolidation multi-fournisseurs, palettisation et préparation.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-100 text-[11px] font-bold text-[#DC2626] uppercase tracking-wider">
                  Hubs 24/7 · Stockage sécurisé
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. POURQUOI HERVÉ LOGISTICS (SPLIT COLUMN AVEC CARTE TRACKING) */}
        {/* ============================================================ */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
            {/* Colonne Gauche : Argumentaire */}
            <div>
              <div className="text-xs font-black text-[#DC2626] uppercase tracking-widest">
                Pourquoi Hervé Logistics
              </div>
              <h2 className="mt-2 text-3xl sm:text-4xl font-black text-[#09090B] tracking-tight">
                Une expérience de suivi digne des leaders mondiaux
              </h2>
              <p className="mt-4 text-sm sm:text-base text-zinc-600 leading-relaxed">
                Une plateforme logistique conçue pour les importateurs et entreprises exigeantes, avec la finition et la fiabilité que vous attendez d&apos;un opérateur international.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex gap-4">
                  <div className="shrink-0 h-11 w-11 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#09090B]">Suivi temps réel</h3>
                    <p className="mt-1 text-xs sm:text-sm text-zinc-500">
                      Position GPS actualisée, escales, ETA et vitesse de navigation en direct.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 h-11 w-11 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#09090B]">Sécurité maximale</h3>
                    <p className="mt-1 text-xs sm:text-sm text-zinc-500">
                      Chiffrement, cookies httpOnly sécurisés, protection multi-couches et étanchéité des données.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 h-11 w-11 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#09090B]">Notifications instantanées</h3>
                    <p className="mt-1 text-xs sm:text-sm text-zinc-500">
                      À chaque étape (empotage, formalités douanières, départ du port), votre statut s&apos;actualise.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne Droite : Carte aperçu du suivi avec en-tête rouge radieux et progression émeraude */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-red-100">
                <div className="bg-gradient-to-r from-[#DC2626] via-[#E11D48] to-[#B91C1C] p-6 sm:p-7 text-white shadow-md">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-red-100 font-bold">
                    Démonstration en direct · HL-2026-000001
                  </div>
                  <div className="mt-1 font-mono text-2xl font-black text-white tracking-wider">
                    Busan ➔ Douala
                  </div>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-white bg-black/20 px-3 py-1 rounded-full backdrop-blur-xs">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>En transit maritime — 68% complété</span>
                  </div>
                  <div className="mt-3 h-2.5 bg-white/25 rounded-full overflow-hidden p-0.5">
                    <div
                      className="h-full bg-white rounded-full shadow-xs"
                      style={{ width: "68%" }}
                    />
                  </div>
                </div>

                <div className="p-6 space-y-4 bg-white">
                  <div className="flex gap-4">
                    <div className="relative flex flex-col items-center">
                      <div className="h-3 w-3 rounded-full bg-emerald-500" />
                      <div className="w-px flex-1 mt-1 bg-emerald-500" />
                    </div>
                    <div className="pb-3">
                      <div className="text-sm font-semibold text-[#09090B]">Départ Busan (Corée)</div>
                      <div className="text-xs text-zinc-400">Il y a 12 jours</div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="relative flex flex-col items-center">
                      <div className="h-3 w-3 rounded-full bg-emerald-500" />
                      <div className="w-px flex-1 mt-1 bg-emerald-500" />
                    </div>
                    <div className="pb-3">
                      <div className="text-sm font-semibold text-[#09090B]">Escale Singapour</div>
                      <div className="text-xs text-zinc-400">Il y a 5 jours</div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="relative flex flex-col items-center">
                      <div className="h-3 w-3 rounded-full bg-[#DC2626] animate-pulse" />
                      <div className="w-px flex-1 mt-1 bg-zinc-200" />
                    </div>
                    <div className="pb-3">
                      <div className="text-sm font-bold text-[#DC2626]">Détroit de Malacca</div>
                      <div className="text-xs text-zinc-400">Actuellement (Position en direct)</div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="relative flex flex-col items-center">
                      <div className="h-3 w-3 rounded-full bg-zinc-300" />
                    </div>
                    <div className="pb-3">
                      <div className="text-sm font-semibold text-zinc-600">Arrivée Douala (Cameroun)</div>
                      <div className="text-xs text-zinc-400">Dans 4 jours (ETA)</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -z-10 -inset-8 bg-red-500/15 opacity-40 blur-3xl rounded-full" />
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 5. BANNIÈRE CTA DE BAS DE PAGE (RADIEUSE, CHALEUREUSE ET GAIE) */}
        {/* ============================================================ */}
        <section className="py-24 bg-gradient-to-br from-[#DC2626] via-[#E11D48] to-[#991B1B] text-white relative overflow-hidden shadow-2xl">
          <div className="mx-auto max-w-4xl text-center px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider mb-4 border border-white/30">
              Plateforme Ouverte 24/7
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white drop-shadow-sm">
              Prêt à suivre votre marchandise ?
            </h2>
            <p className="mt-4 text-red-50 text-base sm:text-lg max-w-xl mx-auto font-medium">
              Entrez votre numéro de suivi officiel et accédez immédiatement à la position exacte et aux documents.
            </p>

            <div className="mt-10">
              <form
                onSubmit={handleCtaSearch}
                className="flex flex-col sm:flex-row gap-3 p-3 rounded-2xl bg-white shadow-2xl border border-white max-w-2xl mx-auto"
              >
                <div className="flex-1 flex items-center gap-3 px-4">
                  <Search className="h-5 w-5 text-slate-400" />
                  <input
                    placeholder="Entrez votre numéro de suivi (ex : HL-2026-000001)"
                    className="w-full bg-transparent outline-none py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 font-medium"
                    value={ctaTracking}
                    onChange={(e) => setCtaTracking(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-gradient-to-r from-[#DC2626] to-[#E11D48] hover:from-[#B91C1C] hover:to-[#BE123C] text-white shadow-lg h-12 sm:h-auto px-7 text-sm font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer active:scale-95"
                >
                  <span>Suivre</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-xs font-black uppercase tracking-wider transition-all border-2 border-white bg-white text-[#DC2626] hover:bg-red-50 h-11 px-6 shadow-lg"
              >
                Contactez nos conseillers
              </Link>
            </div>
          </div>

          {/* Sphères de lumière festives et lumineuses */}
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-amber-300/30 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-rose-300/30 blur-3xl pointer-events-none" />
        </section>
      </main>

      <Footer />
    </div>
  );
}
