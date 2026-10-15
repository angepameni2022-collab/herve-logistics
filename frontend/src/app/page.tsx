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
  MessageSquare,
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

                {/* Carte d'information expédition (Transmettez vos informations par messagerie) */}
                <div className="mt-4 p-4 rounded-2xl glass-dark shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
                  <div className="text-xs text-white/80">
                    <span className="font-display font-bold text-white uppercase tracking-wider block text-sm">
                      Vous souhaitez expédier ou obtenir votre code de suivi ?
                    </span>
                    <span className="text-white/70 font-normal mt-0.5 block">
                      Transmettez vos bordereaux ou détails par messagerie. Votre agent dédié enregistre votre fret et vous remet directement votre code officiel.
                    </span>
                  </div>
                  <a
                    href="https://wa.me/447456062192?text=Bonjour%2C%20je%20souhaite%20exp%C3%A9dier%20un%20colis%20ou%20obtenir%20mon%20code%20de%20suivi%20officiel."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-full sm:w-auto"
                  >
                    <button
                      type="button"
                      className="w-full sm:w-auto px-5 py-2.5 rounded-sm bg-[#42B0D5] hover:bg-[#38A4C8] text-[#00243D] font-display font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Contacter sur WhatsApp</span>
                    </button>
                  </a>
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
        {/* 4. POURQUOI HERVÉ LOGISTICS (EXACTEMENT COMME LA CAPTURE 1)  */}
        {/* ============================================================ */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Colonne Gauche : Argumentaire Entreprise */}
            <div>
              <div className="font-display text-xs sm:text-sm font-bold text-[#E5A800] uppercase tracking-[0.2em] mb-2">
                POURQUOI HERVÉ LOGISTICS
              </div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-[46px] font-extrabold text-[#111827] uppercase tracking-tight leading-[1.05]">
                Une expérience de suivi digne des leaders mondiaux
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-500 leading-relaxed font-normal">
                Une plateforme SaaS conçue pour les entreprises exigeantes, avec la finition et la fiabilité que vous attendez d&apos;un acteur international.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      Suivi temps réel
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed">
                      Position GPS actualisée, escales, ETA et vitesse en direct.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      Sécurité maximale
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed">
                      Chiffrement, RLS, protection multi-couches et journal d&apos;activité.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      Notifications instantanées
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed">
                      À chaque étape, vous êtes informé automatiquement.
                    </p>
                  </div>
                </div>
              </div>

              {/* Attribution de votre code par messagerie */}
              <div className="mt-8 p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5 text-xs text-slate-600">
                <div className="w-8 h-8 rounded-lg bg-[#42B0D5]/15 text-[#00243D] flex items-center justify-center shrink-0 mt-0.5">
                  <MessageSquare className="w-4 h-4 text-[#42B0D5]" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-sm">
                    Attribution directe de votre numéro de suivi
                  </span>
                  <span className="text-slate-500 leading-relaxed block mt-0.5">
                    Transmettez simplement vos informations ou bordereaux par WhatsApp ou messagerie. Notre équipe enregistre votre expédition et vous transmet directement votre numéro de suivi officiel.
                  </span>
                </div>
              </div>
            </div>

            {/* Colonne Droite : Carte démo identique à la capture 1 */}
            <div className="relative max-w-[480px] w-full mx-auto lg:ml-auto">
              {/* Halo d'ambiance doux */}
              <div className="absolute -inset-4 bg-amber-100/40 rounded-3xl blur-2xl -z-10" />

              <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white">
                {/* En-tête sombre arrondi de la carte */}
                <div className="bg-[#121212] p-6 sm:p-7 text-white">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    NUMÉRO DE SUIVI
                  </div>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-wide mt-1">
                    ALT-2026-000001
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-white/90">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>En transit — 68% complété</span>
                  </div>
                  <div className="mt-2.5 h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-400 via-emerald-400 to-emerald-500 rounded-full"
                      style={{ width: "68%" }}
                    />
                  </div>
                </div>

                {/* Corps blanc de la carte : les 4 étapes exactes de la capture 1 */}
                <div className="p-6 sm:p-7 space-y-5 bg-white">
                  {/* Étape 1 : Départ Shanghai */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <div className="w-0.5 bg-emerald-500 flex-1 my-1" />
                    </div>
                    <div className="pb-1">
                      <div className="text-sm font-semibold text-slate-900 leading-tight">
                        Départ Shanghai
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Il y a 12 jours
                      </div>
                    </div>
                  </div>

                  {/* Étape 2 : Escale Singapour */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <div className="w-0.5 bg-emerald-500 flex-1 my-1" />
                    </div>
                    <div className="pb-1">
                      <div className="text-sm font-semibold text-slate-900 leading-tight">
                        Escale Singapour
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Il y a 5 jours
                      </div>
                    </div>
                  </div>

                  {/* Étape 3 : En mer d'Arabie (En cours / Jaune) */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 mt-1.5 shrink-0 ring-4 ring-amber-100" />
                      <div className="w-0.5 bg-slate-200 flex-1 my-1" />
                    </div>
                    <div className="pb-1">
                      <div className="text-sm font-semibold text-yellow-500 leading-tight">
                        En mer d&apos;Arabie
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Actuellement
                      </div>
                    </div>
                  </div>

                  {/* Étape 4 : Arrivée Le Havre (À venir / Gris) */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                    </div>
                    <div className="pb-1">
                      <div className="text-sm font-semibold text-slate-900 leading-tight">
                        Arrivée Le Havre
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Dans 4 jours (ETA)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
