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
  CheckCircle2,
  Navigation,
  Anchor,
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
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl text-left">
              {/* Badge: Official Logo Emblem (Bright & Luminous) */}
              <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-white/80 text-slate-900 mb-6 shadow-xl">
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
              <p className="text-sm sm:text-base lg:text-lg text-white/95 max-w-2xl leading-relaxed mb-8 drop-shadow-md font-medium">
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
        {/* 2. BANDE STATISTIQUES (LUMINEUSE, GAIE ET ULTRA-PRO) */}
        {/* ============================================================ */}
        <section className="bg-gradient-to-b from-white via-red-50/20 to-white text-slate-900 border-y border-slate-200/90 py-16 shadow-xs relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-red-200 hover:-translate-y-1 transition-all flex flex-col justify-between">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#DC2626] mb-4">
                <Globe2 className="w-5 h-5" />
              </div>
              <div>
                <div className="font-mono text-4xl lg:text-5xl font-black bg-gradient-to-r from-[#DC2626] to-[#E11D48] bg-clip-text text-transparent">
                  180+
                </div>
                <div className="mt-2 text-xs text-slate-900 uppercase tracking-wider font-black">
                  Pays desservis
                </div>
                <p className="mt-1 text-[11px] text-slate-500 font-medium">
                  Corridors Asie, Afrique & corridors mondiaux
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-red-200 hover:-translate-y-1 transition-all flex flex-col justify-between">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#DC2626] mb-4">
                <Navigation className="w-5 h-5" />
              </div>
              <div>
                <div className="font-mono text-4xl lg:text-5xl font-black bg-gradient-to-r from-[#DC2626] to-[#E11D48] bg-clip-text text-transparent">
                  24/7
                </div>
                <div className="mt-2 text-xs text-slate-900 uppercase tracking-wider font-black">
                  Suivi temps réel
                </div>
                <p className="mt-1 text-[11px] text-slate-500 font-medium">
                  Balises AIS maritimes & satellite direct
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-red-200 hover:-translate-y-1 transition-all flex flex-col justify-between">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#DC2626] mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="font-mono text-4xl lg:text-5xl font-black bg-gradient-to-r from-[#DC2626] to-[#E11D48] bg-clip-text text-transparent">
                  99.4%
                </div>
                <div className="mt-2 text-xs text-slate-900 uppercase tracking-wider font-black">
                  Taux de ponctualité
                </div>
                <p className="mt-1 text-[11px] text-slate-500 font-medium">
                  Conformité portuaire & livraison sécurisée
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-red-200 hover:-translate-y-1 transition-all flex flex-col justify-between">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#DC2626] mb-4">
                <Boxes className="w-5 h-5" />
              </div>
              <div>
                <div className="font-mono text-4xl lg:text-5xl font-black bg-gradient-to-r from-[#DC2626] to-[#E11D48] bg-clip-text text-transparent">
                  10M+
                </div>
                <div className="mt-2 text-xs text-slate-900 uppercase tracking-wider font-black">
                  Cargaisons & colis
                </div>
                <p className="mt-1 text-[11px] text-slate-500 font-medium">
                  Conteneurs complets FCL & groupage LCL
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. NOS SERVICES (CATALOGUE COMPLET DES 8 SERVICES PROFESSIONNELS) */}
        {/* ============================================================ */}
        <section id="services" className="py-24 bg-slate-50/70 border-b border-slate-200/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-[#DC2626] text-xs font-black uppercase tracking-wider mb-3">
                Solutions Logistiques Multimodales
              </div>
              <h2 className="mt-1 font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
                8 filières spécialisées pour votre chaîne d&apos;approvisionnement
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                De nos plateformes d&apos;empotage en Corée du Sud aux portes de vos entrepôts et points de distribution en Afrique et à l&apos;international — Hervé Logistics orchestre chaque jalon avec rigueur.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Carte 1: Transport Maritime */}
              <div className="group p-6 rounded-2xl bg-white border border-slate-200/90 hover:shadow-xl hover:border-red-300 hover:-translate-y-1 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#DC2626] group-hover:bg-[#DC2626] group-hover:text-white transition-all shadow-xs">
                      <Ship className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full group-hover:bg-red-50 group-hover:text-[#DC2626] transition-colors">
                      FCL · LCL · RoRo
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-[#DC2626] transition-colors tracking-tight">
                    Transport Maritime
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Liaisons maritimes Busan ➔ Douala & Kribi, gestion de conteneurs complets et dédouanement portuaire.
                  </p>
                  <ul className="mt-4 space-y-1.5 text-xs text-slate-500 font-medium">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Conteneurs 20&apos; & 40&apos; High Cube</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Départs réguliers chaque semaine</span>
                    </li>
                  </ul>
                </div>
                <Link href="/services" className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600 group-hover:text-[#DC2626] transition-colors">
                  <span>Détails de la route</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Carte 2: Transport Aérien */}
              <div className="group p-6 rounded-2xl bg-white border border-slate-200/90 hover:shadow-xl hover:border-red-300 hover:-translate-y-1 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#DC2626] group-hover:bg-[#DC2626] group-hover:text-white transition-all shadow-xs">
                      <Plane className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full group-hover:bg-red-50 group-hover:text-[#DC2626] transition-colors">
                      Express & IATA
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-[#DC2626] transition-colors tracking-tight">
                    Transport Aérien
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Fret express au départ du hub Séoul-Incheon (ICN) vers les aéroports internationaux majeurs.
                  </p>
                  <ul className="mt-4 space-y-1.5 text-xs text-slate-500 font-medium">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Transit rapide sous 48 à 72 heures</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Colis urgents & haute valeur</span>
                    </li>
                  </ul>
                </div>
                <Link href="/services" className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600 group-hover:text-[#DC2626] transition-colors">
                  <span>Détails fret aérien</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Carte 3: Transport Routier */}
              <div className="group p-6 rounded-2xl bg-white border border-slate-200/90 hover:shadow-xl hover:border-red-300 hover:-translate-y-1 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#DC2626] group-hover:bg-[#DC2626] group-hover:text-white transition-all shadow-xs">
                      <Truck className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full group-hover:bg-red-50 group-hover:text-[#DC2626] transition-colors">
                      Door-to-Door
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-[#DC2626] transition-colors tracking-tight">
                    Transport Routier
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Acheminement sécurisé du port de débarquement jusqu&apos;à vos dépôts, usines ou commerces.
                  </p>
                  <ul className="mt-4 space-y-1.5 text-xs text-slate-500 font-medium">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Flotte télématique connectée</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Camions plateaux & bâchés</span>
                    </li>
                  </ul>
                </div>
                <Link href="/services" className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600 group-hover:text-[#DC2626] transition-colors">
                  <span>Détails routier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Carte 4: Gestion Conteneurs */}
              <div className="group p-6 rounded-2xl bg-white border border-slate-200/90 hover:shadow-xl hover:border-red-300 hover:-translate-y-1 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#DC2626] group-hover:bg-[#DC2626] group-hover:text-white transition-all shadow-xs">
                      <Boxes className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full group-hover:bg-red-50 group-hover:text-[#DC2626] transition-colors">
                      Parcs Maritimes
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-[#DC2626] transition-colors tracking-tight">
                    Gestion Conteneurs
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Empotage, scellés haute sécurité et traçabilité rigoureuse de tous types de conteneurs.
                  </p>
                  <ul className="mt-4 space-y-1.5 text-xs text-slate-500 font-medium">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Dry 20&apos;, 40&apos;, High Cube, Open Top</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Conteneurs frigorifiques Reefer</span>
                    </li>
                  </ul>
                </div>
                <Link href="/services" className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600 group-hover:text-[#DC2626] transition-colors">
                  <span>Détails conteneurs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Carte 5: Vente & Transport Véhicules */}
              <div className="group p-6 rounded-2xl bg-white border border-slate-200/90 hover:shadow-xl hover:border-red-300 hover:-translate-y-1 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#DC2626] group-hover:bg-[#DC2626] group-hover:text-white transition-all shadow-xs">
                      <Car className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full group-hover:bg-red-50 group-hover:text-[#DC2626] transition-colors">
                      RoRo & Sécurisé
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-[#DC2626] transition-colors tracking-tight">
                    Transport Véhicules
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Sourcing en Corée, inspection certifiée avant embarquement et transit maritime sécurisé.
                  </p>
                  <ul className="mt-4 space-y-1.5 text-xs text-slate-500 font-medium">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Navires rouliers RoRo dédiés</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Formalités carte grise & conformité</span>
                    </li>
                  </ul>
                </div>
                <Link href="/services" className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600 group-hover:text-[#DC2626] transition-colors">
                  <span>Détails transport auto</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Carte 6: Colis & Fret */}
              <div className="group p-6 rounded-2xl bg-white border border-slate-200/90 hover:shadow-xl hover:border-red-300 hover:-translate-y-1 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#DC2626] group-hover:bg-[#DC2626] group-hover:text-white transition-all shadow-xs">
                      <Package className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full group-hover:bg-red-50 group-hover:text-[#DC2626] transition-colors">
                      Messagerie Pro
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-[#DC2626] transition-colors tracking-tight">
                    Colis & Fret
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Prise en charge de plis confidentiels, cartons commerciaux et palettes avec assurance fret.
                  </p>
                  <ul className="mt-4 space-y-1.5 text-xs text-slate-500 font-medium">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Assurance transport multirisque</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Notifications automatisées en continu</span>
                    </li>
                  </ul>
                </div>
                <Link href="/services" className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600 group-hover:text-[#DC2626] transition-colors">
                  <span>Détails colis & fret</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Carte 7: Import / Export */}
              <div className="group p-6 rounded-2xl bg-white border border-slate-200/90 hover:shadow-xl hover:border-red-300 hover:-translate-y-1 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#DC2626] group-hover:bg-[#DC2626] group-hover:text-white transition-all shadow-xs">
                      <Globe2 className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full group-hover:bg-red-50 group-hover:text-[#DC2626] transition-colors">
                      Douane & OEA
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-[#DC2626] transition-colors tracking-tight">
                    Import / Export
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Conseil réglementaire, déclarations en douane, licences de commerce et certificats d&apos;origine.
                  </p>
                  <ul className="mt-4 space-y-1.5 text-xs text-slate-500 font-medium">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Connaissements maritimes (Bill of Lading)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Dédouanement accéléré sous accises</span>
                    </li>
                  </ul>
                </div>
                <Link href="/services" className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600 group-hover:text-[#DC2626] transition-colors">
                  <span>Détails import / export</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Carte 8: Entreposage & Consolidation */}
              <div className="group p-6 rounded-2xl bg-white border border-slate-200/90 hover:shadow-xl hover:border-red-300 hover:-translate-y-1 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#DC2626] group-hover:bg-[#DC2626] group-hover:text-white transition-all shadow-xs">
                      <Warehouse className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full group-hover:bg-red-50 group-hover:text-[#DC2626] transition-colors">
                      Hubs Sécurisés
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-[#DC2626] transition-colors tracking-tight">
                    Entreposage & Consolidation
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Plateformes logistiques sécurisées 24/7, stockage sous douane et consolidation multi-fournisseurs.
                  </p>
                  <ul className="mt-4 space-y-1.5 text-xs text-slate-500 font-medium">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Stockage sous surveillance vidéo 24/7</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Palettisation, étiquetage & cross-dock</span>
                    </li>
                  </ul>
                </div>
                <Link href="/services" className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600 group-hover:text-[#DC2626] transition-colors">
                  <span>Détails entreposage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. POURQUOI HERVÉ LOGISTICS (SPLIT COLUMN AVEC CARTE TRACKING ULTRA-PRO) */}
        {/* ============================================================ */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
            {/* Colonne Gauche : Argumentaire Entreprise */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-[#DC2626] text-xs font-black uppercase tracking-wider mb-3">
                Exigence & Précision Mondiale
              </div>
              <h2 className="mt-1 text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Une expérience de suivi digne des plus grands armateurs
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Conçue pour les importateurs et entreprises industrielles exigeantes, notre architecture vous garantit une visibilité totale sur l&apos;acheminement de vos cargaisons maritimes et aériennes.
              </p>

              <div className="mt-10 space-y-5">
                <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 flex gap-4 hover:border-red-200 hover:bg-white transition-all shadow-xs">
                  <div className="shrink-0 h-12 w-12 rounded-xl bg-red-50 text-[#DC2626] border border-red-100 flex items-center justify-center font-bold">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-base">Télématique Satellite & AIS en direct</h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      Coordonnées GPS maritimes précises, vitesse en nœuds, escales portuaires et heure estimée d&apos;arrivée (ETA) actualisées en continu.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 flex gap-4 hover:border-red-200 hover:bg-white transition-all shadow-xs">
                  <div className="shrink-0 h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center font-bold">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-base">Sécurité & Traçabilité Cryptographique</h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      Scellés numériques haute sécurité, intégrité documentaire des connaissements (Bill of Lading) et sessions httpOnly protégées.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 flex gap-4 hover:border-red-200 hover:bg-white transition-all shadow-xs">
                  <div className="shrink-0 h-12 w-12 rounded-xl bg-red-50 text-[#DC2626] border border-red-100 flex items-center justify-center font-bold">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-base">Support Dédié & Alertes Étape par Étape</h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      À chaque franchissement (empotage Busan, dédouanement Asie, appareillage en haute mer), recevez vos notifications immédiates.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne Droite : Carte aperçu du suivi télématique d'élite */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 bg-white">
                {/* En-tête de carte dégradé carmin */}
                <div className="bg-gradient-to-r from-[#DC2626] via-[#E11D48] to-[#B91C1C] p-6 sm:p-7 text-white shadow-md relative">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-red-100 font-bold bg-white/15 px-2.5 py-1 rounded-full border border-white/20">
                      Télématique Satellite Active
                    </div>
                    <div className="text-[11px] font-bold text-white/90">
                      Vitesse : <span className="font-mono font-black text-white">18.4 nœuds</span>
                    </div>
                  </div>

                  <div className="mt-3 font-mono text-2xl font-black text-white tracking-wider flex items-center justify-between">
                    <span>Busan ➔ Douala</span>
                    <span className="text-xs font-mono font-bold text-red-100 bg-black/25 px-2.5 py-1 rounded-md">
                      HL-2026-000001
                    </span>
                  </div>

                  <div className="mt-2 text-xs text-white/80 font-medium">
                    Porte-conteneurs : <strong className="text-white">MAERSK Mc-Kinney Møller</strong> (IMO 9619907)
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs font-bold text-white">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>En mer d&apos;Arabie · 68% complété</span>
                    </div>
                    <span className="font-mono text-white/90">ETA : 25 avr. 2026</span>
                  </div>

                  <div className="mt-3 h-2.5 bg-white/25 rounded-full overflow-hidden p-0.5">
                    <div
                      className="h-full bg-white rounded-full shadow-xs"
                      style={{ width: "68%" }}
                    />
                  </div>
                </div>

                {/* Timeline des étapes maritime */}
                <div className="p-6 space-y-4 bg-white">
                  <div className="flex gap-4">
                    <div className="relative flex flex-col items-center">
                      <div className="h-3.5 w-3.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                      <div className="w-0.5 flex-1 mt-1 bg-emerald-500" />
                    </div>
                    <div className="pb-3 flex-1">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-black text-slate-900">Départ Port de Busan (Corée)</div>
                        <div className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Terminé</div>
                      </div>
                      <div className="text-xs text-slate-500 font-medium mt-0.5">Empotage conteneurs 40&apos; HC scellés & appareillage</div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="relative flex flex-col items-center">
                      <div className="h-3.5 w-3.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                      <div className="w-0.5 flex-1 mt-1 bg-emerald-500" />
                    </div>
                    <div className="pb-3 flex-1">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-black text-slate-900">Escale Shanghai & Singapour</div>
                        <div className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Terminé</div>
                      </div>
                      <div className="text-xs text-slate-500 font-medium mt-0.5">Contrôle télématique et ravitaillement maritime</div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="relative flex flex-col items-center">
                      <div className="h-3.5 w-3.5 rounded-full bg-[#DC2626] ring-4 ring-red-100 animate-pulse" />
                      <div className="w-0.5 flex-1 mt-1 bg-slate-200" />
                    </div>
                    <div className="pb-3 flex-1">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-black text-[#DC2626]">En mer d&apos;Arabie / Océan Indien</div>
                        <div className="text-[11px] font-bold text-[#DC2626] bg-red-50 px-2 py-0.5 rounded border border-red-200 animate-pulse">Position en direct</div>
                      </div>
                      <div className="text-xs text-slate-600 font-semibold mt-0.5">Coordonnées GPS : Lat 02°11&apos;N, Lng 102°15&apos;E</div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="relative flex flex-col items-center">
                      <div className="h-3.5 w-3.5 rounded-full bg-slate-300 ring-4 ring-slate-100" />
                    </div>
                    <div className="pb-1 flex-1">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-bold text-slate-600">Arrivée Port de Douala (Cameroun)</div>
                        <div className="text-[11px] font-semibold text-slate-400">Prévu dans 4 jours</div>
                      </div>
                      <div className="text-xs text-slate-400 font-medium mt-0.5">Dédouanement prioritaire et livraison terminal</div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/track/HL-2026-000001"
                      className="block text-center py-3 rounded-xl bg-slate-50 hover:bg-red-50 text-xs font-black uppercase tracking-wider text-slate-700 hover:text-[#DC2626] border border-slate-200 hover:border-red-200 transition-all shadow-xs"
                    >
                      Consulter le rapport télématique complet →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Halo d'ambiance doux */}
              <div className="absolute -z-10 -inset-8 bg-red-500/10 opacity-70 blur-3xl rounded-full" />
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
