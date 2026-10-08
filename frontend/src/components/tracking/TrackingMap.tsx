"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Ship, Compass, Radio, MapPin, Globe } from "lucide-react";
import { Shipment } from "@/data/shipments";

// Dynamically import Leaflet component with SSR disabled
const InteractiveLeafletMap = dynamic(
  () => import("@/components/tracking/InteractiveLeafletMap"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[420px] bg-white rounded-2xl border border-zinc-200 flex flex-col items-center justify-center text-zinc-500 gap-3 shadow-md">
        <div className="w-10 h-10 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-semibold animate-pulse text-zinc-700">
          Chargement de la carte blanche interactive...
        </span>
      </div>
    ),
  }
);

interface TrackingMapProps {
  shipment: Shipment;
}

export function TrackingMap({ shipment }: TrackingMapProps) {
  const [viewMode, setViewMode] = useState<"interactive" | "radar">("interactive");
  const [activeWaypoint, setActiveWaypoint] = useState<number | null>(2); // Default: Indian Ocean

  return (
    <div className="space-y-3">
      {/* View Mode Switcher Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-zinc-200 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("interactive")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === "interactive"
                ? "bg-[#DC2626] text-white shadow-md shadow-red-600/25"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Carte Blanche & AIS Interactive</span>
          </button>

          <button
            onClick={() => setViewMode("radar")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === "radar"
                ? "bg-[#09090B] text-white shadow-md shadow-zinc-900/25"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>Schéma Radar AIS Vectoriel</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium px-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Positions actualisées en continu</span>
        </div>
      </div>

      {/* Render Selected View */}
      {viewMode === "interactive" ? (
        <InteractiveLeafletMap shipment={shipment} />
      ) : (
        <div className="bg-[#09090B] rounded-2xl border border-zinc-800 overflow-hidden text-white shadow-xl">
          {/* Map Control Bar */}
          <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-zinc-950 border-b border-zinc-800/80 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#DC2626] flex items-center justify-center text-white shadow-sm shadow-red-500/20">
                <Compass className="w-4 h-4 animate-spin-slow" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-red-400 font-bold">
                    Tracé Vectoriel AIS Haute Fidélité
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full border border-red-500/30">
                    <Radio className="w-2.5 h-2.5 animate-pulse text-[#DC2626]" />
                    Signal actif
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">
                  {shipment.origin} → {shipment.destination}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-zinc-300">
              <span className="bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800 font-mono text-zinc-200">
                {shipment.vesselName || "Convoi Maritime Hervé Logistics"}
              </span>
            </div>
          </div>

          {/* Visual Graphical Map Area */}
          <div className="relative w-full h-[360px] sm:h-[400px] bg-gradient-to-b from-[#09090B] via-[#121214] to-black p-6 flex flex-col justify-between overflow-hidden">
            {/* Subtle grid pattern for nautical radar feel */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #DC2626 1px, transparent 0)`,
                backgroundSize: "28px 28px",
              }}
            />

            {/* Global route SVG graphic */}
            <svg
              viewBox="0 0 900 380"
              className="absolute inset-0 w-full h-full preserve-3d"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="routeGradientRed" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#DC2626" stopOpacity="0.9" />
                  <stop offset="60%" stopColor="#EF4444" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#71717A" stopOpacity="0.4" />
                </linearGradient>
                <filter id="glowRed" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Continents stylized background contours in deep charcoal */}
              <path
                d="M 680,40 Q 820,60 860,180 T 780,240 Q 730,170 700,120 Z"
                fill="#27272A"
                opacity="0.35"
              />
              <path
                d="M 520,90 L 590,130 L 550,220 L 500,170 Z"
                fill="#27272A"
                opacity="0.3"
              />
              <path
                d="M 190,110 Q 320,80 340,160 Q 330,270 260,340 Q 180,310 160,240 Q 140,160 190,110 Z"
                fill="#27272A"
                opacity="0.35"
              />

              {/* Maritime Route Line in Red / White glow */}
              <path
                d="M 800,100 C 720,180 640,240 540,230 C 420,240 320,330 250,340 C 200,310 200,220 220,195"
                stroke="url(#routeGradientRed)"
                strokeWidth="3.5"
                strokeDasharray="6 4"
                className="animate-route-dash"
              />

              {/* Waypoint Markers */}
              {/* 1. Shanghai */}
              <g transform="translate(800, 100)">
                <circle r="6" fill="#DC2626" filter="url(#glowRed)" />
                <circle r="3" fill="#FFFFFF" />
                <text x="12" y="4" fill="#FFFFFF" fontSize="12" fontWeight="bold">
                  Shanghai
                </text>
              </g>

              {/* 2. Malacca Strait */}
              <g transform="translate(630, 220)">
                <circle r="4" fill="#EF4444" />
                <text x="10" y="3" fill="#A1A1AA" fontSize="10">
                  Détroit de Malacca
                </text>
              </g>

              {/* 3. Current Position: Indian Ocean */}
              <g transform="translate(500, 230)">
                <circle r="18" fill="none" stroke="#DC2626" strokeWidth="1.5" opacity="0.5" className="animate-sonar" />
                <circle r="10" fill="#DC2626" opacity="0.8" />
                <circle r="5" fill="#FFFFFF" />
                <rect x="-14" y="-32" width="108" height="22" rx="6" fill="#18181B" stroke="#DC2626" strokeWidth="1" />
                <text x="-8" y="-18" fill="#FFFFFF" fontSize="10" fontWeight="bold">
                  ⚓ Position actuelle
                </text>
              </g>

              {/* 4. Cape Route */}
              <g transform="translate(250, 340)">
                <circle r="4" fill="#71717A" />
                <text x="-115" y="15" fill="#A1A1AA" fontSize="10">
                  Cap de Bonne-Espérance
                </text>
              </g>

              {/* 5. Douala (Destination) */}
              <g transform="translate(220, 195)">
                <circle r="7" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2" filter="url(#glowRed)" />
                <circle r="3" fill="#DC2626" />
                <text x="-95" y="4" fill="#FFFFFF" fontSize="12" fontWeight="bold">
                  Douala (Port)
                </text>
              </g>
            </svg>

            {/* Telemetry live HUD overlay */}
            <div className="relative z-10 flex justify-between items-start pointer-events-none">
              <div className="bg-[#09090B]/90 backdrop-blur-md border border-zinc-800 p-3.5 rounded-xl max-w-xs pointer-events-auto">
                <span className="text-[10px] uppercase font-bold text-zinc-400">Position actuelle reportée</span>
                <div className="text-xs font-bold text-white mt-0.5">{shipment.currentLocationName}</div>
                <div className="text-[11px] font-mono text-red-400 mt-1">
                  LAT: {shipment.currentCoordinates.lat.toFixed(2)}° | LNG: {shipment.currentCoordinates.lng.toFixed(2)}°
                </div>
              </div>

              <div className="bg-[#09090B]/90 backdrop-blur-md border border-zinc-800 p-3.5 rounded-xl pointer-events-auto text-right">
                <span className="text-[10px] uppercase font-bold text-zinc-400">Progression globale</span>
                <div className="text-sm font-extrabold text-[#DC2626]">{shipment.progress}% en route</div>
                <span className="text-[11px] text-zinc-300">ETA : {shipment.eta}</span>
              </div>
            </div>

            {/* Interactive Waypoints Tabs at Bottom */}
            <div className="relative z-10 flex overflow-x-auto gap-2 py-2 pointer-events-auto scrollbar-none">
              {shipment.waypoints.map((wp, i) => (
                <button
                  key={wp.label}
                  onClick={() => setActiveWaypoint(i)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border flex items-center gap-2 cursor-pointer ${
                    activeWaypoint === i
                      ? "bg-[#DC2626] text-white border-red-500 shadow-md shadow-red-500/25"
                      : wp.reached
                      ? "bg-zinc-900 text-zinc-200 border-zinc-800 hover:bg-zinc-800"
                      : "bg-black/60 text-zinc-500 border-zinc-900 hover:bg-zinc-900"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      wp.reached ? "bg-[#DC2626]" : "bg-zinc-600"
                    }`}
                  />
                  <span>{wp.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
