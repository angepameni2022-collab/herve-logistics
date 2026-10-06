"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import {
  Save,
  Layout,
  Layers,
  Info,
  BarChart2,
  Trash2,
} from "lucide-react";

export default function AdminCmsPage() {
  const { cmsContent, updateCmsContent } = useApp();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<"home" | "services" | "about" | "stats">("home");

  // Local form states
  const [homeBadge, setHomeBadge] = useState(cmsContent.home.badge);
  const [heroTitle, setHeroTitle] = useState(cmsContent.home.heroTitle);
  const [heroDescription, setHeroDescription] = useState(cmsContent.home.heroDescription);
  const [heroImage, setHeroImage] = useState(cmsContent.home.heroImage);
  const [ctaBannerTitle, setCtaBannerTitle] = useState(cmsContent.home.ctaBannerTitle);
  const [ctaButtonText, setCtaButtonText] = useState(cmsContent.home.ctaButtonText);

  // Services Page CMS
  const [servicesTitle, setServicesTitle] = useState(cmsContent.servicesPage.heroTitle);
  const [servicesSubtitle, setServicesSubtitle] = useState(cmsContent.servicesPage.heroSubtitle);

  // About Page CMS
  const [aboutTitle, setAboutTitle] = useState(cmsContent.aboutPage.heroTitle);
  const [aboutSubtitle, setAboutSubtitle] = useState(cmsContent.aboutPage.heroSubtitle);
  const [historyTitle, setHistoryTitle] = useState(cmsContent.aboutPage.historyTitle);
  const [historyText1, setHistoryText1] = useState(cmsContent.aboutPage.historyText1);
  const [historyText2, setHistoryText2] = useState(cmsContent.aboutPage.historyText2);

  // Stats
  const [stat1Val, setStat1Val] = useState(cmsContent.stats[0]?.value || "");
  const [stat1Label, setStat1Label] = useState(cmsContent.stats[0]?.label || "");
  const [stat2Val, setStat2Val] = useState(cmsContent.stats[1]?.value || "");
  const [stat2Label, setStat2Label] = useState(cmsContent.stats[1]?.label || "");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const newStats = [];
    if (stat1Val.trim()) {
      newStats.push({ id: "stat-1", value: stat1Val.trim(), label: stat1Label.trim() || "Statistique 1" });
    }
    if (stat2Val.trim()) {
      newStats.push({ id: "stat-2", value: stat2Val.trim(), label: stat2Label.trim() || "Statistique 2" });
    }

    updateCmsContent({
      home: {
        ...cmsContent.home,
        badge: homeBadge,
        heroTitle,
        heroDescription,
        heroImage,
        ctaBannerTitle,
        ctaButtonText,
      },
      servicesPage: {
        heroTitle: servicesTitle,
        heroSubtitle: servicesSubtitle,
      },
      aboutPage: {
        ...cmsContent.aboutPage,
        heroTitle: aboutTitle,
        heroSubtitle: aboutSubtitle,
        historyTitle,
        historyText1,
        historyText2,
      },
      stats: newStats,
    });

    showToast("✓ Contenus CMS enregistrés avec succès (Actualisation en direct)", "success");
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#09090B]">
            Gestion des Contenus (CMS)
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Modifiez directement les textes, bannières et statistiques affichés sur le site public.
          </p>
        </div>

        <Button
          variant="primary"
          leftIcon={<Save className="w-4 h-4" />}
          onClick={handleSave}
        >
          Enregistrer tous les changements
        </Button>
      </div>

      {/* Tabs Selector */}
      <div className="flex border-b border-zinc-200 overflow-x-auto gap-2">
        <button
          onClick={() => setActiveTab("home")}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === "home"
              ? "border-[#DC2626] text-[#DC2626]"
              : "border-transparent text-zinc-500 hover:text-zinc-900"
          }`}
        >
          <Layout className="w-4 h-4" />
          <span>Page Accueil</span>
        </button>

        <button
          onClick={() => setActiveTab("services")}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === "services"
              ? "border-[#DC2626] text-[#DC2626]"
              : "border-transparent text-zinc-500 hover:text-zinc-900"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Page Services</span>
        </button>

        <button
          onClick={() => setActiveTab("about")}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === "about"
              ? "border-[#DC2626] text-[#DC2626]"
              : "border-transparent text-zinc-500 hover:text-zinc-900"
          }`}
        >
          <Info className="w-4 h-4" />
          <span>Page À propos</span>
        </button>

        <button
          onClick={() => setActiveTab("stats")}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === "stats"
              ? "border-[#DC2626] text-[#DC2626]"
              : "border-transparent text-zinc-500 hover:text-zinc-900"
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          <span>Statistiques clés</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-xs">
        {/* Section 1 : Accueil */}
        {activeTab === "home" && (
          <div className="space-y-5">
            <h2 className="text-base font-bold text-[#09090B] pb-3 border-b border-zinc-100">
              Contenus du Hero & Bannière CTA
            </h2>

            <div>
              <Input
                label="Badge supérieur"
                value={homeBadge}
                onChange={(e) => setHomeBadge(e.target.value)}
                placeholder="Ex: Transport & Logistique Internationale"
              />
            </div>

            <div>
              <Input
                label="Titre principal (H1)"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                placeholder="Ex: Une logistique fiable pour un monde plus proche"
              />
            </div>

            <div>
              <Textarea
                label="Description sous le titre"
                value={heroDescription}
                onChange={(e) => setHeroDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div>
              <Input
                label="URL Image de fond (Hero)"
                value={heroImage}
                onChange={(e) => setHeroImage(e.target.value)}
              />
            </div>

            <div className="pt-4 border-t border-zinc-100">
              <h3 className="text-xs font-bold uppercase text-zinc-400 mb-3">
                Bannière CTA (Noir carbone)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Titre CTA"
                  value={ctaBannerTitle}
                  onChange={(e) => setCtaBannerTitle(e.target.value)}
                />
                <Input
                  label="Texte du bouton CTA"
                  value={ctaButtonText}
                  onChange={(e) => setCtaButtonText(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Section 2 : Services */}
        {activeTab === "services" && (
          <div className="space-y-5">
            <h2 className="text-base font-bold text-[#09090B] pb-3 border-b border-zinc-100">
              En-tête de la page Services
            </h2>

            <div>
              <Input
                label="Titre Hero Services"
                value={servicesTitle}
                onChange={(e) => setServicesTitle(e.target.value)}
              />
            </div>

            <div>
              <Textarea
                label="Sous-titre / Description"
                value={servicesSubtitle}
                onChange={(e) => setServicesSubtitle(e.target.value)}
                rows={3}
              />
            </div>
          </div>
        )}

        {/* Section 3 : À propos */}
        {activeTab === "about" && (
          <div className="space-y-5">
            <h2 className="text-base font-bold text-[#09090B] pb-3 border-b border-zinc-100">
              Présentation & Histoire
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Titre Hero"
                value={aboutTitle}
                onChange={(e) => setAboutTitle(e.target.value)}
              />
              <Input
                label="Sous-titre"
                value={aboutSubtitle}
                onChange={(e) => setAboutSubtitle(e.target.value)}
              />
            </div>

            <div>
              <Input
                label="Titre de la section histoire"
                value={historyTitle}
                onChange={(e) => setHistoryTitle(e.target.value)}
              />
            </div>

            <div>
              <Textarea
                label="Histoire — Paragraphe 1"
                value={historyText1}
                onChange={(e) => setHistoryText1(e.target.value)}
                rows={3}
              />
            </div>

            <div>
              <Textarea
                label="Histoire — Paragraphe 2"
                value={historyText2}
                onChange={(e) => setHistoryText2(e.target.value)}
                rows={3}
              />
            </div>
          </div>
        )}

        {/* Section 4 : Statistiques */}
        {activeTab === "stats" && (
          <div className="space-y-6">
            <div className="pb-3 border-b border-zinc-100">
              <h2 className="text-base font-bold text-[#09090B]">
                Statistiques chiffrées (Facultatives)
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Si aucune valeur n&apos;est renseignée dans un bloc, il ne sera pas affiché sur le site.
              </p>
            </div>

            {/* Statistique 1 */}
            <div className="p-5 rounded-xl border border-zinc-200 bg-zinc-50 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                  Statistique 1
                </span>
                {stat1Val && (
                  <button
                    type="button"
                    onClick={() => {
                      setStat1Val("");
                      setStat1Label("");
                    }}
                    className="text-xs text-red-500 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Effacer (Masquer)
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Valeur (ex: +25 000)"
                  value={stat1Val}
                  onChange={(e) => setStat1Val(e.target.value)}
                  placeholder="+25 000"
                />
                <Input
                  label="Label (ex: Expéditions réussies)"
                  value={stat1Label}
                  onChange={(e) => setStat1Label(e.target.value)}
                  placeholder="Expéditions réussies"
                />
              </div>
            </div>

            {/* Statistique 2 */}
            <div className="p-5 rounded-xl border border-zinc-200 bg-zinc-50 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                  Statistique 2
                </span>
                {stat2Val && (
                  <button
                    type="button"
                    onClick={() => {
                      setStat2Val("");
                      setStat2Label("");
                    }}
                    className="text-xs text-red-500 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Effacer (Masquer)
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Valeur (ex: 99.4%)"
                  value={stat2Val}
                  onChange={(e) => setStat2Val(e.target.value)}
                  placeholder="99.4%"
                />
                <Input
                  label="Label (ex: Taux de ponctualité)"
                  value={stat2Label}
                  onChange={(e) => setStat2Label(e.target.value)}
                  placeholder="Taux de ponctualité"
                />
              </div>
            </div>
          </div>
        )}

        {/* Bottom Save Trigger */}
        <div className="mt-8 pt-6 border-t border-zinc-100 flex items-center justify-between">
          <p className="text-xs text-zinc-400">
            Les changements sont immédiatement synchronisés avec l&apos;interface utilisateur.
          </p>
          <Button variant="primary" onClick={handleSave}>
            Enregistrer les modifications
          </Button>
        </div>
      </div>
    </div>
  );
}
