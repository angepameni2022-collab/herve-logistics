"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

interface StatsColis {
  parcouru: number;
  restant: number;
  total: number;
  vitesse: number | null;
  heures_ecoulees: number;
  heures_restantes: number;
  nb_colis: number;
  type: string;
  conteneur: string;
}

interface PointPassage {
  nom: string;
  lat: number;
  lng: number;
  statut: "franchi" | "a_venir";
}

interface Evenement {
  titre: string;
  date: string;
}

interface ColisData {
  colis_id: number;
  tracking: string;
  navire: string;
  mode: string;
  etat: string;
  position: string;
  eta: string;
  progression: number;
  depart: { nom: string; lat: number; lng: number };
  arrivee: { nom: string; lat: number; lng: number };
  actuelle: { lat: number; lng: number };
  points_passage: PointPassage[];
  stats: StatsColis;
  evenements: Evenement[];
  token_partage?: string;
}

interface ColisItemListe {
  tracking: string;
  navire: string;
  trajet: string;
}

function SuiviContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [colis, setColis] = useState<ColisData | null>(null);
  const [listeColis, setListeColis] = useState<ColisItemListe[]>([]);
  const [message, setMessage] = useState<{ text: string; type: "error" | "info" } | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
  const tokenPartage = searchParams.get("partage");
  const trackingParam = searchParams.get("tracking");

  // Charger les données
  const chargerDonnees = async (silencieux = false) => {
    if (!silencieux) setIsLoading(true);

    try {
      if (tokenPartage) {
        // Mode Partage public
        setIsReadOnly(true);
        const res = await fetch(`${backendUrl}/api/partage?token=${encodeURIComponent(tokenPartage)}`);
        const data = await res.json();

        if (!res.ok) {
          setMessage({ text: data.message || "Lien invalide ou expiré.", type: "error" });
          setColis(null);
          setIsLoading(false);
          return;
        }

        setColis(data.colis);
        setMessage(null);
      } else {
        // Mode Client connecté
        setIsReadOnly(false);
        const url = `${backendUrl}/api/mon-colis${trackingParam ? `?tracking=${encodeURIComponent(trackingParam)}` : ""}`;
        const res = await fetch(url, { credentials: "include" });

        if (res.status === 401) {
          // Visiteur non connecté ou session expirée -> renvoi vers /connexion
          router.push("/connexion");
          return;
        }

        const data = await res.json();

        if (!res.ok) {
          setMessage({ text: data.message || "Erreur de chargement.", type: "error" });
          setIsLoading(false);
          return;
        }

        if (!data.colis && (!data.liste_colis || data.liste_colis.length === 0)) {
          setMessage({ text: "Aucun colis n'est associé à ton compte.", type: "info" });
          setColis(null);
          setIsLoading(false);
          return;
        }

        setColis(data.colis);
        setListeColis(data.liste_colis || []);
        setMessage(null);
      }
    } catch (err) {
      if (!silencieux) {
        setMessage({ text: "Erreur serveur : impossible de joindre le service de suivi. Veuillez réessayer.", type: "error" });
      }
    } finally {
      if (!silencieux) setIsLoading(false);
    }
  };

  useEffect(() => {
    chargerDonnees();

    // Rafraîchissement automatique toutes les 60 secondes sans recharger
    const interval = setInterval(() => {
      chargerDonnees(true);
    }, 60000);

    return () => clearInterval(interval);
  }, [tokenPartage, trackingParam]);

  // Copier le numéro de tracking
  const copierTracking = () => {
    if (!colis?.tracking) return;
    navigator.clipboard.writeText(colis.tracking).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  // Partager le suivi
  const partagerSuivi = async () => {
    if (!colis?.token_partage) return;
    const shareUrl = `${window.location.origin}/suivi?partage=${encodeURIComponent(colis.token_partage)}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Suivi Hervé Transit — ${colis.tracking}`,
          text: `Suivez en direct l'acheminement de la cargaison ${colis.tracking} :`,
          url: shareUrl,
        });
        return;
      } catch (err) {}
    }

    navigator.clipboard.writeText(shareUrl).then(() => {
      setMessage({ text: "Lien de suivi copié dans le presse-papier !", type: "info" });
      setTimeout(() => setMessage(null), 4000);
    });
  };

  // Régénérer le lien de partage
  const regenererPartage = async () => {
    if (!colis?.colis_id) return;
    if (!confirm("Voulez-vous vraiment générer un nouveau lien ? L'ancien lien sera immédiatement invalidé.")) return;

    try {
      const res = await fetch(`${backendUrl}/api/colis/${colis.colis_id}/regenerer-partage`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ text: data.message || "Impossible de régénérer le lien.", type: "error" });
        return;
      }
      setColis((prev) => prev ? { ...prev, token_partage: data.token_partage } : null);
      setMessage({ text: "Nouveau lien généré avec succès ! L'ancien lien est désormais invalide.", type: "info" });
      setTimeout(() => setMessage(null), 4000);
    } catch (err) {
      setMessage({ text: "Erreur réseau lors de la régénération du lien.", type: "error" });
    }
  };

  // Déconnexion
  const deconnecter = async () => {
    try {
      await fetch(`${backendUrl}/api/deconnexion`, { method: "POST", credentials: "include" });
    } catch (e) {}
    router.push("/connexion");
  };

  // Coordonnées approximatives pour le SVG 700x400
  const shipLat = colis?.actuelle?.lat ?? 2.19;
  const shipLng = colis?.actuelle?.lng ?? 102.25;
  let shipX = 465;
  let shipY = 260;
  if (shipLng > 70) {
    const ratio = (shipLng - 70) / (130 - 70);
    shipX = 380 + ratio * 210;
    shipY = 280 - (shipLat / 40) * 180;
  } else {
    const ratio = (shipLng - 5) / (70 - 5);
    shipX = 230 + ratio * 150;
    shipY = 250 - (shipLat / 35) * 100;
  }
  shipX = Math.max(100, Math.min(650, shipX));
  shipY = Math.max(50, Math.min(360, shipY));

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#16130f] flex flex-col items-center justify-start font-sans">
      <div className="w-full max-w-[560px] min-h-screen bg-white shadow-lg flex flex-col">
        {/* En-tête */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="p-3.5 flex items-center justify-between border-b border-slate-100">
            <Link href="/" className="flex items-center gap-2.5 text-[#121212] no-underline">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 bg-black shadow-xs flex items-center justify-center flex-shrink-0">
                <Image
                  src="/images/logo-herve-official.png"
                  alt="Hervé Logistics Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="font-display text-lg font-extrabold uppercase text-[#121212] leading-tight">
                  Hervé <span className="text-[#FFB800]">Logistics</span>
                </h1>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Suivi maritime international
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>En direct</span>
              </div>
              {!isReadOnly && (
                <button
                  onClick={deconnecter}
                  className="px-2.5 py-1 text-[11px] font-bold text-slate-500 bg-slate-100 hover:bg-red-50 hover:text-[#d62828] rounded-md transition-colors border border-slate-200"
                >
                  Déconnexion
                </button>
              )}
            </div>
          </div>

          {/* Menu défilant horizontalement */}
          <nav className="flex overflow-x-auto whitespace-nowrap px-3 scrollbar-none">
            <Link href="/" className="px-3.5 py-3 text-xs font-semibold text-slate-500 hover:text-[#d62828] border-b-2 border-transparent transition-colors">
              Accueil
            </Link>
            <Link href="/services" className="px-3.5 py-3 text-xs font-semibold text-slate-500 hover:text-[#d62828] border-b-2 border-transparent transition-colors">
              Services
            </Link>
            <Link href="/about" className="px-3.5 py-3 text-xs font-semibold text-slate-500 hover:text-[#d62828] border-b-2 border-transparent transition-colors">
              À propos
            </Link>
            <Link href="/contact" className="px-3.5 py-3 text-xs font-semibold text-slate-500 hover:text-[#d62828] border-b-2 border-transparent transition-colors">
              Contact
            </Link>
            <Link href="/suivi" className="px-3.5 py-3 text-xs font-bold text-[#d62828] border-b-2 border-[#d62828]">
              Suivi de colis
            </Link>
          </nav>
        </header>

        {/* Corps principal */}
        <main className="flex-1 p-4 flex flex-col gap-4">
          {/* Bannière mode lecture seule */}
          {isReadOnly && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs font-semibold flex items-center gap-2">
              🔒 Vous visualisez ce suivi en mode invité (lecture seule).
            </div>
          )}

          {/* Messages d'erreur ou d'info */}
          {message && (
            <div
              className={`p-3.5 rounded-xl text-xs font-medium ${
                message.type === "error"
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-blue-50 text-blue-700 border border-blue-200"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Sélecteur si plusieurs colis */}
          {!isReadOnly && listeColis.length > 1 && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5" htmlFor="selectColis">
                Sélectionner votre colis à suivre
              </label>
              <select
                id="selectColis"
                value={colis?.tracking || ""}
                onChange={(e) => router.push(`/suivi?tracking=${encodeURIComponent(e.target.value)}`)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-[#16130f] focus:outline-none focus:border-[#d62828]"
              >
                {listeColis.map((c) => (
                  <option key={c.tracking} value={c.tracking}>
                    {c.tracking} — {c.navire} ({c.trajet})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Données du colis */}
          {colis && (
            <div className="space-y-4">
              {/* Carte Numéro de tracking */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-xs">
                <div>
                  <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 bg-red-100 text-[#d62828] rounded-full mb-1">
                    {colis.etat}
                  </span>
                  <div className="font-['Barlow_Condensed',sans-serif] text-2xl font-extrabold tracking-wider text-[#16130f]">
                    {colis.tracking}
                  </div>
                </div>
                <button
                  onClick={copierTracking}
                  className={`px-3 py-2 border rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    isCopied
                      ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                      : "bg-slate-100 hover:bg-slate-200 text-[#16130f] border-slate-300"
                  }`}
                >
                  {isCopied ? "✓ Copié !" : "Copier"}
                </button>
              </div>

              {/* Bloc Position actuelle : Dégradé rouge foncé #8f1212 → #d62828 */}
              <div className="bg-gradient-to-br from-[#8f1212] to-[#d62828] text-white rounded-2xl p-4 shadow-md">
                <div className="text-[10px] font-bold uppercase tracking-wider opacity-85">
                  Position Actuelle
                </div>
                <div className="font-['Barlow_Condensed',sans-serif] text-2xl font-bold uppercase mt-0.5">
                  {colis.position}
                </div>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/20 text-xs">
                  <span>Navire : <strong>{colis.navire || "—"}</strong></span>
                  <span>ETA : <strong>{colis.eta || "—"}</strong></span>
                </div>
              </div>

              {/* Barre de Progression */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Progression maritime
                  </span>
                  <span className="font-['Barlow_Condensed',sans-serif] text-2xl font-extrabold text-[#d62828]">
                    {colis.progression}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#d62828] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${colis.progression}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 font-medium pt-1">
                  <span>{colis.depart?.nom} (A)</span>
                  <span>{colis.arrivee?.nom} (B)</span>
                </div>
              </div>

              {/* Carte Maritime Interactive */}
              <div className="bg-[#a9d3ee] border border-[#8fb6d1] rounded-2xl h-64 relative overflow-hidden shadow-xs">
                {/* Contrôles Zoom */}
                <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(2.5, z * 1.2))}
                    className="w-8 h-8 bg-white border border-[#8fb6d1] rounded-lg font-bold text-slate-700 flex items-center justify-center shadow-xs hover:bg-slate-50"
                  >
                    +
                  </button>
                  <button
                    onClick={() => setZoomLevel((z) => Math.max(0.7, z * 0.8))}
                    className="w-8 h-8 bg-white border border-[#8fb6d1] rounded-lg font-bold text-slate-700 flex items-center justify-center shadow-xs hover:bg-slate-50"
                  >
                    −
                  </button>
                </div>

                <svg
                  viewBox="0 0 700 400"
                  preserveAspectRatio="xMidYMid meet"
                  className="w-full h-full transition-transform duration-300 origin-center"
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  {/* Terres blanches contour #8fb6d1 */}
                  <path
                    d="M 400,20 Q 480,30 580,20 Q 660,60 620,120 Q 560,140 520,190 Q 480,220 460,260 Q 440,240 420,200 Q 380,180 340,160 Q 310,120 320,60 Z"
                    fill="#ffffff"
                    stroke="#8fb6d1"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 470,250 Q 485,280 480,300 Q 460,310 440,290 Z"
                    fill="#ffffff"
                    stroke="#8fb6d1"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 280,140 Q 340,150 350,200 Q 360,260 320,330 Q 280,380 250,370 Q 210,320 200,260 Q 180,220 220,170 Z"
                    fill="#ffffff"
                    stroke="#8fb6d1"
                    strokeWidth="1.5"
                  />

                  {/* Trajet parcouru rouge */}
                  <path
                    d={`M 590,95 Q 520,170 ${shipX},${shipY}`}
                    fill="none"
                    stroke="#d62828"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  {/* Trajet restant pointillé blanc */}
                  <path
                    d={`M ${shipX},${shipY} Q 350,340 240,245`}
                    fill="none"
                    stroke="#ffffff"
                    strokeDasharray="5,5"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Marqueur A */}
                  <g transform="translate(590, 95)">
                    <circle r="9" fill="#d62828" stroke="#ffffff" strokeWidth="2" />
                    <text x="0" y="3.5" fontSize="10" fontWeight="bold" fill="#ffffff" textAnchor="middle">A</text>
                  </g>

                  {/* Marqueur B */}
                  <g transform="translate(240, 245)">
                    <circle r="9" fill="#d62828" stroke="#ffffff" strokeWidth="2" />
                    <text x="0" y="3.5" fontSize="10" fontWeight="bold" fill="#ffffff" textAnchor="middle">B</text>
                  </g>

                  {/* Navire */}
                  <g transform={`translate(${shipX}, ${shipY})`}>
                    <circle r="14" fill="#ffffff" stroke="#d62828" strokeWidth="2" />
                    <path d="M -6,2 L 6,2 L 4,6 L -4,6 Z M -2,1 L -2,-5 L 3,-2 L -2,-2 Z" fill="#d62828" />
                  </g>
                </svg>

                {/* Légende */}
                <div className="absolute bottom-2.5 left-2.5 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] font-semibold text-slate-700 flex items-center gap-3 border border-[#8fb6d1]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-1 bg-[#d62828] rounded-full" />
                    <span>Parcouru</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-0 border-t-2 border-dashed border-slate-700" />
                    <span>Restant</span>
                  </div>
                </div>
              </div>

              {/* Statistiques en grille */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-white border border-slate-200 rounded-xl p-3">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Distance parcourue</div>
                  <div className="font-['Barlow_Condensed',sans-serif] text-xl font-bold text-[#16130f]">
                    {colis.stats.parcouru ? colis.stats.parcouru.toLocaleString("fr-FR") : "0"} km
                  </div>
                  <div className="text-[10px] text-slate-500">Total : {colis.stats.total ? colis.stats.total.toLocaleString("fr-FR") : "0"} km</div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-3">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Distance restante</div>
                  <div className="font-['Barlow_Condensed',sans-serif] text-xl font-bold text-[#16130f]">
                    {colis.stats.restant ? colis.stats.restant.toLocaleString("fr-FR") : "0"} km
                  </div>
                  <div className="text-[10px] text-slate-500">{100 - colis.progression}% restant</div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-3">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Vitesse navire</div>
                  <div className="font-['Barlow_Condensed',sans-serif] text-xl font-bold text-[#16130f]">
                    {colis.stats.vitesse === null || colis.stats.vitesse === undefined || colis.stats.vitesse === 0
                      ? "—"
                      : `${colis.stats.vitesse} km/h`}
                  </div>
                  <div className="text-[10px] text-slate-500">Croisière maritime</div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-3">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Heures restantes</div>
                  <div className="font-['Barlow_Condensed',sans-serif] text-xl font-bold text-[#16130f]">
                    {colis.stats.heures_restantes ? `${colis.stats.heures_restantes} h` : "—"}
                  </div>
                  <div className="text-[10px] text-slate-500">Écoulées : {colis.stats.heures_ecoulees || 0} h</div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-3">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Nombre de colis</div>
                  <div className="font-['Barlow_Condensed',sans-serif] text-xl font-bold text-[#16130f]">
                    {colis.stats.nb_colis || 1}
                  </div>
                  <div className="text-[10px] text-slate-500">{colis.stats.type || "Conteneur 40' HC"}</div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-3">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">N° Conteneur</div>
                  <div className="font-['Barlow_Condensed',sans-serif] text-sm font-bold text-[#16130f] truncate mt-1">
                    {colis.stats.conteneur || "—"}
                  </div>
                  <div className="text-[10px] text-slate-500">Scellé maritime officiel</div>
                </div>
              </div>

              {/* Historique des étapes */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-['Barlow_Condensed',sans-serif] text-lg font-bold uppercase text-[#16130f]">
                    Historique des étapes
                  </h3>
                  {colis.evenements && colis.evenements.length > 0 && (
                    <span className="text-[11px] text-slate-400 font-semibold">
                      ({colis.evenements.length} étapes)
                    </span>
                  )}
                </div>

                {!colis.evenements || colis.evenements.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-400">
                    Aucun événement répertorié pour le moment.
                  </div>
                ) : (
                  <div className="relative pl-5 space-y-3.5 before:content-[''] before:absolute before:top-2 before:bottom-2 before:left-1.5 before:w-0.5 before:bg-slate-100">
                    {colis.evenements.slice().reverse().map((ev, i) => (
                      <div key={i} className="relative">
                        <span
                          className={`absolute -left-5 top-1 w-2.5 h-2.5 rounded-full border-2 border-white shadow-xs ${
                            i === 0 ? "bg-[#d62828]" : "bg-slate-300"
                          }`}
                        />
                        <div className="text-xs font-bold text-[#16130f]">{ev.titre}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{ev.date}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bouton Partager & Régénérer (Masqué en lecture seule) */}
              {!isReadOnly && (
                <div className="space-y-2 pt-1">
                  <button
                    onClick={partagerSuivi}
                    className="w-full py-3.5 bg-[#d62828] hover:bg-[#8f1212] text-white font-['Barlow_Condensed',sans-serif] text-lg font-bold uppercase tracking-wider rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Partager le suivi</span>
                  </button>
                  <button
                    onClick={regenererPartage}
                    className="w-full py-2.5 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 text-xs font-semibold rounded-xl transition-colors"
                  >
                    🔄 Régénérer le lien sécurisé (invalide le précédent)
                  </button>
                </div>
              )}
            </div>
          )}
        </main>

        <footer className="p-4 text-center border-t border-slate-100 text-xs text-slate-400">
          © 2026 Hervé Logistics Korea Co., Ltd. Tous droits réservés.
        </footer>
      </div>
    </div>
  );
}

export default function SuiviClientPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center font-sans text-xs text-slate-400">
          Chargement du suivi maritime...
        </div>
      }
    >
      <SuiviContent />
    </Suspense>
  );
}

