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
        {/* 1. HERO SECTION (CHARTE MAERSK & POLICE BARLOW CONDENSED)    */}
        {/* ============================================================ */}
        <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-24 sm:pt-28 pb-16 sm:pb-24 text-white">
          {/* Background Image: Multimodal Logistics with Maersk Oceanic Navy Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/hero-multimodal.png"
              alt="Hervé Logistics - Transport multimodal maritime, aérien et routier"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-hero-overlay" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-24">
            <div className="max-w-3xl text-left animate-hero-fade">
              {/* Badge: Official Live Platform Emblem (Style Maersk Star Blue) */}
              <div className="inline-flex items-center gap-2.5 rounded-sm bg-[#42B0D5] px-3.5 py-1.5 text-[11px] font-display font-bold uppercase tracking-[0.18em] text-[#00243D] shadow-md">
                <span className="h-2 w-2 rounded-full bg-[#00243D] animate-pulse" />
                <span>Plateforme internationale · Temps réel</span>
              </div>

              {/* H1 Main Title in Barlow Condensed Uppercase */}
              <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold uppercase text-white leading-[0.95] tracking-tight">
                Suivez vos <span className="text-[#42B0D5]">marchandises</span><br />
                partout dans le monde
              </h1>

              {/* Description */}
              <p className="mt-6 text-base sm:text-lg text-white/85 max-w-2xl leading-relaxed font-normal">
                Hervé Logistics réunit le maritime, l&apos;aérien, le routier et la livraison de conteneurs sur une seule plateforme. Suivi GPS, escales, ETA et documents — livrés avec la précision des leaders mondiaux.
              </p>

              {/* Barre de recherche Hero */}
              <div id="tracking" className="mt-10 max-w-3xl scroll-mt-28">
                <TrackingSearchBox />

                {/* Carte d'information expédition (Style Maersk Navy Glassmorphism) */}
                <div className="mt-4 p-4 rounded-2xl glass-dark shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
                  <div className="text-xs text-white/80">
                    <span className="font-display font-bold text-white uppercase tracking-wider block text-sm">
                      Vous souhaitez expédier des marchandises depuis la Corée ?
                    </span>
                    <span className="text-white/70 font-normal mt-0.5 block">
                      Inscription obligatoire : déposez vos informations pour recevoir votre code officiel Hervé Logistics.
                    </span>
                  </div>
                  <Link href="/auth/register" className="flex-shrink-0 w-full sm:w-auto">
                    <button
                      type="button"
                      className="w-full sm:w-auto px-5 py-2.5 rounded-sm bg-white hover:bg-white/90 text-[#00243D] font-display font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
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
        {/* 2. BANDE STATISTIQUES (DEEP MARITIME NAVY & MAERSK BLUE)    */}
        {/* ============================================================ */}
        <section className="bg-[#00243D] text-white border-y border-[#003B64] py-16 shadow-inner relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="font-display text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-white to-[#42B0D5] bg-clip-text text-transparent">
                180+
              </div>
              <div className="mt-2 font-display text-xs text-white/70 uppercase tracking-widest font-semibold">
                Pays desservis
              </div>
              <p className="mt-1 text-[11px] text-white/50 font-normal">
                Corridors Asie, Afrique & corridors mondiaux
              </p>
            </div>

            <div className="text-center group">
              <div className="font-display text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-white to-[#42B0D5] bg-clip-text text-transparent">
                24/7
              </div>
              <div className="mt-2 font-display text-xs text-white/70 uppercase tracking-widest font-semibold">
                Suivi temps réel
              </div>
              <p className="mt-1 text-[11px] text-white/50 font-normal">
                Balises AIS maritimes & satellite direct
              </p>
            </div>

            <div className="text-center group">
              <div className="font-display text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-white to-[#42B0D5] bg-clip-text text-transparent">
                99.4%
              </div>
              <div className="mt-2 font-display text-xs text-white/70 uppercase tracking-widest font-semibold">
                Taux de ponctualité
              </div>
              <p className="mt-1 text-[11px] text-white/50 font-normal">
                Conformité portuaire & livraison sécurisée
              </p>
            </div>

            <div className="text-center group">
              <div className="font-display text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-white to-[#42B0D5] bg-clip-text text-transparent">
                10M+
              </div>
              <div className="mt-2 font-display text-xs text-white/70 uppercase tracking-widest font-semibold">
                Cargaisons & conteneurs
              </div>
              <p className="mt-1 text-[11px] text-white/50 font-normal">
                Conteneurs complets FCL & groupage LCL
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. NOS SERVICES (CATALOGUE COMPLET DES 8 SERVICES)          */}
        {/* ============================================================ */}
        <section id="services" className="py-24 bg-[#F8FAFC] border-b border-slate-200/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="font-display text-sm font-bold text-[#0088B8] uppercase tracking-widest mb-2">
                Nos Services Multimodaux
              </div>
              <h2 className="mt-1 font-display text-4xl sm:text-5xl font-extrabold text-[#00243D] uppercase tracking-tight">
                Une logistique complète, sans frontières
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                De nos plateformes d&apos;empotage en Corée du Sud aux portes de vos entrepôts et points de distribution en Afrique et à l&apos;international — Hervé Logistics orchestre chaque jalon avec rigueur.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Carte 1: Transport Maritime */}
              <div className="group p-7 rounded-2xl bg-white border border-slate-200 hover:border-[#42B0D5] hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="h-12 w-12 rounded-xl bg-[#EBF6FA] flex items-center justify-center text-[#00243D] group-hover:bg-[#42B0D5] group-hover:text-white transition-all shadow-xs">
                      <Ship className="h-6 w-6" />
                    </div>
                    <span className="font-display text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-sm">
                      FCL · LCL · RoRo
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold uppercase text-[#00243D] group-hover:text-[#0088B8] transition-colors tracking-tight">
                    Transport Maritime
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Liaisons maritimes Busan ➔ Douala & Kribi, gestion de conteneurs complets et dédouanement portuaire.
                  </p>
                  <ul className="mt-4 space-y-1.5 text-xs text-slate-500 font-medium">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#42B0D5] shrink-0" />
                      <span>Conteneurs 20&apos; & 40&apos; High Cube</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#42B0D5] shrink-0" />
                      <span>Départs hebdomadaires réguliers</span>
                    </li>
                  </ul>
                </div>
                <Link href="/services" className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-display font-bold uppercase tracking-wider text-[#00243D] group-hover:text-[#42B0D5] transition-colors">
                  <span>Détails de la route</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Carte 2: Transport Aérien */}
              <div className="group p-7 rounded-2xl bg-white border border-slate-200 hover:border-[#42B0D5] hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="h-12 w-12 rounded-xl bg-[#EBF6FA] flex items-center justify-center text-[#00243D] group-hover:bg-[#42B0D5] group-hover:text-white transition-all shadow-xs">
                      <Plane className="h-6 w-6" />
                    </div>
                    <span className="font-display text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-sm">
                      Express & IATA
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold uppercase text-[#00243D] group-hover:text-[#0088B8] transition-colors tracking-tight">
                    Transport Aérien
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Fret express au départ du hub Séoul-Incheon (ICN) vers les aéroports internationaux majeurs.
                  </p>
                  <ul className="mt-4 space-y-1.5 text-xs text-slate-500 font-medium">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#42B0D5] shrink-0" />
                      <span>Transit rapide sous 48 à 72 heures</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#42B0D5] shrink-0" />
                      <span>Colis urgents & haute valeur</span>
                    </li>
                  </ul>
                </div>
                <Link href="/services" className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-display font-bold uppercase tracking-wider text-[#00243D] group-hover:text-[#42B0D5] transition-colors">
                  <span>Détails fret aérien</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Carte 3: Transport Routier */}
              <div className="group p-7 rounded-2xl bg-white border border-slate-200 hover:border-[#42B0D5] hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="h-12 w-12 rounded-xl bg-[#EBF6FA] flex items-center justify-center text-[#00243D] group-hover:bg-[#42B0D5] group-hover:text-white transition-all shadow-xs">
                      <Truck className="h-6 w-6" />
                    </div>
                    <span className="font-display text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-sm">
                      Door-to-Door
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold uppercase text-[#00243D] group-hover:text-[#0088B8] transition-colors tracking-tight">
                    Transport Routier
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Acheminement sécurisé du port de débarquement jusqu&apos;à vos dépôts, usines ou commerces.
                  </p>
                  <ul className="mt-4 space-y-1.5 text-xs text-slate-500 font-medium">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#42B0D5] shrink-0" />
                      <span>Flotte télématique connectée</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#42B0D5] shrink-0" />
                      <span>Camions plateaux & bâchés</span>
                    </li>
                  </ul>
                </div>
                <Link href="/services" className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-display font-bold uppercase tracking-wider text-[#00243D] group-hover:text-[#42B0D5] transition-colors">
                  <span>Détails routier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Carte 4: Gestion Conteneurs */}
              <div className="group p-7 rounded-2xl bg-white border border-slate-200 hover:border-[#42B0D5] hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="h-12 w-12 rounded-xl bg-[#EBF6FA] flex items-center justify-center text-[#00243D] group-hover:bg-[#42B0D5] group-hover:text-white transition-all shadow-xs">
                      <Boxes className="h-6 w-6" />
                    </div>
                    <span className="font-display text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-sm">
                      Parcs Maritimes
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold uppercase text-[#00243D] group-hover:text-[#0088B8] transition-colors tracking-tight">
                    Conteneurs
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Empotage, scellés haute sécurité et traçabilité rigoureuse de tous types de conteneurs.
                  </p>
                  <ul className="mt-4 space-y-1.5 text-xs text-slate-500 font-medium">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#42B0D5] shrink-0" />
                      <span>Dry 20&apos;, 40&apos;, High Cube, Open Top</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#42B0D5] shrink-0" />
                      <span>Conteneurs frigorifiques Reefer</span>
                    </li>
                  </ul>
                </div>
                <Link href="/services" className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-display font-bold uppercase tracking-wider text-[#00243D] group-hover:text-[#42B0D5] transition-colors">
                  <span>Détails conteneurs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Carte 5: Vente & Transport Véhicules */}
              <div className="group p-7 rounded-2xl bg-white border border-slate-200 hover:border-[#42B0D5] hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="h-12 w-12 rounded-xl bg-[#EBF6FA] flex items-center justify-center text-[#00243D] group-hover:bg-[#42B0D5] group-hover:text-white transition-all shadow-xs">
                      <Car className="h-6 w-6" />
                    </div>
                    <span className="font-display text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-sm">
                      RoRo & Sécurisé
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold uppercase text-[#00243D] group-hover:text-[#0088B8] transition-colors tracking-tight">
                    Transport Véhicules
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Sourcing en Corée, inspection certifiée avant embarquement et transit maritime sécurisé.
                  </p>
                  <ul className="mt-4 space-y-1.5 text-xs text-slate-500 font-medium">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#42B0D5] shrink-0" />
                      <span>Navires rouliers RoRo dédiés</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#42B0D5] shrink-0" />
                      <span>Formalités certificat & douane</span>
                    </li>
                  </ul>
                </div>
                <Link href="/services" className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-display font-bold uppercase tracking-wider text-[#00243D] group-hover:text-[#42B0D5] transition-colors">
                  <span>Détails transport auto</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Carte 6: Colis & Fret */}
              <div className="group p-7 rounded-2xl bg-white border border-slate-200 hover:border-[#42B0D5] hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="h-12 w-12 rounded-xl bg-[#EBF6FA] flex items-center justify-center text-[#00243D] group-hover:bg-[#42B0D5] group-hover:text-white transition-all shadow-xs">
                      <Package className="h-6 w-6" />
                    </div>
                    <span className="font-display text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-sm">
                      Messagerie Pro
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold uppercase text-[#00243D] group-hover:text-[#0088B8] transition-colors tracking-tight">
                    Colis & Fret
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Prise en charge de plis confidentiels, cartons commerciaux et palettes avec assurance fret.
                  </p>
                  <ul className="mt-4 space-y-1.5 text-xs text-slate-500 font-medium">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#42B0D5] shrink-0" />
                      <span>Assurance transport multirisque</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#42B0D5] shrink-0" />
                      <span>Notifications automatisées en continu</span>
                    </li>
                  </ul>
                </div>
                <Link href="/services" className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-display font-bold uppercase tracking-wider text-[#00243D] group-hover:text-[#42B0D5] transition-colors">
                  <span>Détails colis & fret</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Carte 7: Import / Export */}
              <div className="group p-7 rounded-2xl bg-white border border-slate-200 hover:border-[#42B0D5] hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="h-12 w-12 rounded-xl bg-[#EBF6FA] flex items-center justify-center text-[#00243D] group-hover:bg-[#42B0D5] group-hover:text-white transition-all shadow-xs">
                      <Globe2 className="h-6 w-6" />
                    </div>
                    <span className="font-display text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-sm">
                      Douane & OEA
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold uppercase text-[#00243D] group-hover:text-[#0088B8] transition-colors tracking-tight">
                    Import / Export
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Conseil réglementaire, déclarations en douane, licences de commerce et certificats d&apos;origine.
                  </p>
                  <ul className="mt-4 space-y-1.5 text-xs text-slate-500 font-medium">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#42B0D5] shrink-0" />
                      <span>Connaissements maritimes (Bill of Lading)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#42B0D5] shrink-0" />
                      <span>Dédouanement accéléré sous accises</span>
                    </li>
                  </ul>
                </div>
                <Link href="/services" className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-display font-bold uppercase tracking-wider text-[#00243D] group-hover:text-[#42B0D5] transition-colors">
                  <span>Détails import / export</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Carte 8: Entreposage & Consolidation */}
              <div className="group p-7 rounded-2xl bg-white border border-slate-200 hover:border-[#42B0D5] hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="h-12 w-12 rounded-xl bg-[#EBF6FA] flex items-center justify-center text-[#00243D] group-hover:bg-[#42B0D5] group-hover:text-white transition-all shadow-xs">
                      <Warehouse className="h-6 w-6" />
                    </div>
                    <span className="font-display text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-sm">
                      Hubs Sécurisés
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold uppercase text-[#00243D] group-hover:text-[#0088B8] transition-colors tracking-tight">
                    Entreposage
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Plateformes logistiques sécurisées 24/7, stockage sous douane et consolidation multi-fournisseurs.
                  </p>
                  <ul className="mt-4 space-y-1.5 text-xs text-slate-500 font-medium">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#42B0D5] shrink-0" />
                      <span>Stockage sous surveillance vidéo 24/7</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#42B0D5] shrink-0" />
                      <span>Palettisation, étiquetage & cross-dock</span>
                    </li>
                  </ul>
                </div>
                <Link href="/services" className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-display font-bold uppercase tracking-wider text-[#00243D] group-hover:text-[#42B0D5] transition-colors">
                  <span>Détails entreposage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. POURQUOI HERVÉ LOGISTICS (STYLE MAERSK & APERÇU TRACKING)  */}
        {/* ============================================================ */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
            {/* Colonne Gauche : Argumentaire Entreprise */}
            <div>
              <div className="font-display text-sm font-bold text-[#0088B8] uppercase tracking-widest mb-2">
                Exigence & Précision Mondiale
              </div>
              <h2 className="mt-1 font-display text-4xl sm:text-5xl font-extrabold text-[#00243D] uppercase tracking-tight leading-none">
                Une expérience de suivi digne des plus grands armateurs
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Conçue pour les importateurs et entreprises industrielles exigeantes, notre architecture vous garantit une visibilité totale sur l&apos;acheminement de vos cargaisons maritimes et aériennes.
              </p>

              <div className="mt-10 space-y-5">
                <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex gap-4 hover:border-[#42B0D5] hover:bg-white transition-all shadow-xs">
                  <div className="shrink-0 h-12 w-12 rounded-xl bg-[#EBF6FA] text-[#00243D] flex items-center justify-center font-bold">
                    <Zap className="h-6 w-6 text-[#42B0D5]" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold uppercase text-[#00243D]">Télématique Satellite & AIS en direct</h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      Coordonnées GPS maritimes précises, vitesse en nœuds, escales portuaires et heure estimée d&apos;arrivée (ETA) actualisées en continu.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex gap-4 hover:border-[#42B0D5] hover:bg-white transition-all shadow-xs">
                  <div className="shrink-0 h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold uppercase text-[#00243D]">Sécurité & Traçabilité Cryptographique</h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      Scellés numériques haute sécurité, intégrité documentaire des connaissements (Bill of Lading) et sessions chiffrées.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex gap-4 hover:border-[#42B0D5] hover:bg-white transition-all shadow-xs">
                  <div className="shrink-0 h-12 w-12 rounded-xl bg-[#EBF6FA] text-[#00243D] flex items-center justify-center font-bold">
                    <Clock className="h-6 w-6 text-[#42B0D5]" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold uppercase text-[#00243D]">Support Dédié & Alertes Étape par Étape</h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      À chaque franchissement (empotage Busan, dédouanement Asie, appareillage en haute mer), recevez vos notifications immédiates.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne Droite : Carte aperçu du suivi télématique d'élite */}
            <div className="relative animate-ship-float">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
                {/* En-tête de carte dégradé Maersk Navy */}
                <div className="bg-gradient-brand p-6 sm:p-7 text-white shadow-md relative">
                  <div className="flex items-center justify-between">
                    <div className="font-display text-[11px] uppercase tracking-widest text-[#42B0D5] font-bold bg-white/10 px-2.5 py-1 rounded-sm border border-white/15">
                      Télématique Satellite Active
                    </div>
                    <div className="text-[11px] font-medium text-white/90">
                      Vitesse : <span className="font-mono font-bold text-[#42B0D5]">18.4 nœuds</span>
                    </div>
                  </div>

                  <div className="mt-3 font-display text-3xl font-extrabold uppercase text-white tracking-wider flex items-center justify-between">
                    <span>Busan ➔ Douala</span>
                    <span className="text-xs font-mono font-bold text-[#42B0D5] bg-black/40 px-2.5 py-1 rounded-sm border border-[#42B0D5]/30">
                      HL-2026-000001
                    </span>
                  </div>

                  <div className="mt-2 text-xs text-white/80 font-normal">
                    Porte-conteneurs : <strong className="text-white font-semibold">MAERSK Mc-Kinney Møller</strong> (IMO 9619907)
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs font-bold text-white">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#42B0D5] animate-pulse" />
                      <span>En mer d&apos;Arabie · 68% complété</span>
                    </div>
                    <span className="font-mono text-white/90">ETA : 25 avr. 2026</span>
                  </div>

                  <div className="mt-3 h-2.5 bg-white/20 rounded-full overflow-hidden p-0.5">
                    <div
                      className="h-full bg-gradient-to-r from-[#42B0D5] to-emerald-400 rounded-full shadow-xs"
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
                        <div className="text-sm font-bold text-[#00243D]">Départ Port de Busan (Corée)</div>
                        <div className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Terminé</div>
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
                        <div className="text-sm font-bold text-[#00243D]">Escale Shanghai & Singapour</div>
                        <div className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Terminé</div>
                      </div>
                      <div className="text-xs text-slate-500 font-medium mt-0.5">Contrôle télématique et ravitaillement maritime</div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="relative flex flex-col items-center">
                      <div className="h-3.5 w-3.5 rounded-full bg-[#42B0D5] ring-4 ring-[#42B0D5]/20 animate-pulse" />
                      <div className="w-0.5 flex-1 mt-1 bg-slate-200" />
                    </div>
                    <div className="pb-3 flex-1">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-bold text-[#00243D]">En mer d&apos;Arabie / Océan Indien</div>
                        <div className="text-[11px] font-bold text-[#00243D] bg-[#EBF6FA] px-2 py-0.5 rounded border border-[#42B0D5]/30 animate-pulse">Position en direct</div>
                      </div>
                      <div className="text-xs text-slate-600 font-medium mt-0.5">Coordonnées GPS : Lat 02°11&apos;N, Lng 102°15&apos;E</div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="relative flex flex-col items-center">
                      <div className="h-3.5 w-3.5 rounded-full bg-slate-300 ring-4 ring-slate-100" />
                    </div>
                    <div className="pb-1 flex-1">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-slate-600">Arrivée Port de Douala (Cameroun)</div>
                        <div className="text-[11px] font-semibold text-slate-400">Prévu dans 4 jours</div>
                      </div>
                      <div className="text-xs text-slate-400 font-normal mt-0.5">Dédouanement prioritaire et livraison terminal</div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/track/HL-2026-000001"
                      className="block text-center py-3 rounded-xl bg-[#00243D] hover:bg-[#003B64] text-xs font-display font-bold uppercase tracking-wider text-white transition-all shadow-md cursor-pointer"
                    >
                      Consulter le rapport télématique complet →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Halo d'ambiance Maersk Blue */}
              <div className="absolute -z-10 -inset-8 bg-[#42B0D5]/15 opacity-70 blur-3xl rounded-full" />
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 5. BANNIÈRE CTA DE BAS DE PAGE (MAERSK DEEP NAVY ET STAR BLUE) */}
        {/* ============================================================ */}
        <section className="py-24 bg-gradient-brand text-white relative overflow-hidden shadow-2xl">
          <div className="mx-auto max-w-4xl text-center px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase text-white drop-shadow-sm tracking-tight">
              Prêt à suivre votre marchandise ?
            </h2>
            <p className="mt-4 text-white/85 text-base sm:text-lg max-w-xl mx-auto font-normal">
              Entrez votre numéro de suivi officiel et accédez immédiatement à la position exacte et aux documents.
            </p>

            <div className="mt-10 max-w-2xl mx-auto">
              <form
                onSubmit={handleCtaSearch}
                className="flex flex-col sm:flex-row gap-3 p-3 rounded-2xl glass-dark shadow-2xl"
              >
                <div className="flex-1 flex items-center gap-3 px-4">
                  <Search className="h-5 w-5 text-[#42B0D5]" />
                  <input
                    placeholder="Entrez votre numéro de suivi (ex : HL-2026-000001)"
                    className="w-full bg-transparent outline-none py-3 text-base text-white placeholder:text-white/60 font-medium"
                    value={ctaTracking}
                    onChange={(e) => setCtaTracking(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-[#42B0D5] hover:bg-[#38A4C8] text-[#00243D] shadow-lg h-12 sm:h-auto px-8 text-base font-display font-bold uppercase tracking-wider rounded-sm transition-all cursor-pointer active:scale-95"
                >
                  <span>Suivre</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs font-display font-bold uppercase tracking-wider transition-all border border-white/30 bg-white/10 text-white hover:bg-white hover:text-[#00243D] h-11 px-6 shadow-md"
              >
                Contactez nos conseillers
              </Link>
            </div>
          </div>

          {/* Sphères de lumière bleues d'ambiance */}
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#42B0D5]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cyan-400/15 blur-3xl pointer-events-none" />
        </section>
      </main>

      <Footer />
    </div>
  );
}
