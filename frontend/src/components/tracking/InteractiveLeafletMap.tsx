"use client";

import React, { useEffect, useRef, useState } from "react";
import { Shipment } from "@/data/shipments";
import { Compass, Layers, Maximize2, Radio, Ship, Navigation } from "lucide-react";
import L from "leaflet";

interface InteractiveLeafletMapProps {
  shipment: Shipment;
}

type MapLayerType = "dark" | "satellite" | "osm";

export default function InteractiveLeafletMap({ shipment }: InteractiveLeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [activeLayer, setActiveLayer] = useState<MapLayerType>("dark");
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  // Key coordinates (Maritime route from Busan, Korea to Douala, Cameroon)
  const busanCoords: [number, number] = [35.1028, 129.0403]; // Busan Port, South Korea
  const shanghaiCoords: [number, number] = [31.2304, 121.4737]; // Shanghai, China
  const singaporeCoords: [number, number] = [1.3521, 103.8198]; // Singapore / Malacca
  const currentVesselCoords: [number, number] = [3.5, 78.5]; // Central Indian Ocean (Current AIS Position)
  const madagascarCoords: [number, number] = [-12.0, 50.0];
  const capeCoords: [number, number] = [-34.35, 18.5];
  const doualaCoords: [number, number] = [4.0511, 9.7679]; // Douala Port, Cameroon

  // Full Route Waypoints
  const routeWaypoints: [number, number][] = [
    busanCoords,
    shanghaiCoords,
    singaporeCoords,
    currentVesselCoords,
    madagascarCoords,
    capeCoords,
    doualaCoords,
  ];

  // Tile Providers (100% Free, NO API Key, NO Watermarks!)
  const getTileConfig = (layer: MapLayerType) => {
    switch (layer) {
      case "satellite":
        return {
          url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          attribution: '&copy; Esri &mdash; Maxar, Earthstar Geographics, USDA',
          maxZoom: 18,
        };
      case "osm":
        return {
          url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        };
      case "dark":
      default:
        return {
          url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
          attribution: '&copy; Esri &mdash; DeLorme, NAVTEQ',
          maxZoom: 16,
        };
    }
  };

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Initialize Leaflet Map
    const map = L.map(mapContainerRef.current, {
      center: currentVesselCoords,
      zoom: 3,
      minZoom: 2,
      maxZoom: 16,
      zoomControl: false,
    });

    mapInstanceRef.current = map;

    // Add Zoom Control bottom right
    L.control.zoom({ position: "bottomright" }).addTo(map);

    // Initial Tile Layer: ESRI Dark Gray Canvas (Clean, no watermark!)
    const initialConfig = getTileConfig("dark");
    const tiles = L.tileLayer(initialConfig.url, {
      attribution: initialConfig.attribution,
      maxZoom: initialConfig.maxZoom,
    }).addTo(map);
    tileLayerRef.current = tiles;

    // 1. Custom DivIcon: Origin (Busan, South Korea)
    const originIcon = L.divIcon({
      className: "custom-map-icon",
      html: `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 30px; height: 30px;">
          <div style="position: absolute; width: 26px; height: 26px; background: rgba(220, 38, 38, 0.35); border-radius: 50%; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="width: 14px; height: 14px; background: #DC2626; border: 2.5px solid #FFFFFF; border-radius: 50%; box-shadow: 0 0 10px rgba(220, 38, 38, 0.9);"></div>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });

    // 2. Custom DivIcon: Vessel in Indian Ocean
    const vesselIcon = L.divIcon({
      className: "custom-vessel-icon",
      html: `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 44px; height: 44px;">
          <div style="position: absolute; width: 40px; height: 40px; background: rgba(220, 38, 38, 0.35); border-radius: 50%; animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position: absolute; width: 28px; height: 28px; background: rgba(220, 38, 38, 0.65); border-radius: 50%;"></div>
          <div style="position: relative; width: 22px; height: 22px; background: #DC2626; border: 2px solid #FFFFFF; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 14px #DC2626;">
            <svg style="width: 12px; height: 12px; fill: white;" viewBox="0 0 24 24">
              <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.5 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
              <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 6"/>
              <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/>
              <path d="M12 10v4"/>
              <path d="M12 2v3"/>
            </svg>
          </div>
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 22],
    });

    // 3. Custom DivIcon: Destination (Douala)
    const destIcon = L.divIcon({
      className: "custom-dest-icon",
      html: `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 28px; height: 28px;">
          <div style="width: 14px; height: 14px; background: #10B981; border: 2.5px solid #FFFFFF; border-radius: 50%; box-shadow: 0 0 10px rgba(16, 185, 129, 0.9);"></div>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    // 1. Origin Marker (Busan, Korea)
    L.marker(busanCoords, { icon: originIcon })
      .addTo(map)
      .bindPopup(`
        <div style="font-family: inherit;">
          <div style="color: #DC2626; font-size: 11px; font-weight: 700; text-transform: uppercase;">Hub de départ (Corée du Sud)</div>
          <div style="font-size: 14px; font-weight: 700; color: #FFFFFF; margin-top: 2px;">Port de Busan, Corée du Sud</div>
          <div style="font-size: 12px; color: #9CA3AF; margin-top: 4px;">Embarquement & expédition Hervé Logistics</div>
          <div style="font-size: 11px; color: #10B981; margin-top: 2px;">✓ Prise en charge validée</div>
        </div>
      `);

    // 2. Waypoint (Shanghai)
    L.circleMarker(shanghaiCoords, { radius: 4, color: "#DC2626", fillColor: "#FFFFFF", fillOpacity: 1 })
      .addTo(map)
      .bindPopup(`<div style="color:#FFF; font-weight:bold;">Escale Shanghai, Chine</div>`);

    // 3. Waypoint (Singapore)
    L.circleMarker(singaporeCoords, { radius: 4, color: "#DC2626", fillColor: "#FFFFFF", fillOpacity: 1 })
      .addTo(map)
      .bindPopup(`<div style="color:#FFF; font-weight:bold;">Détroit de Malacca / Singapour</div>`);

    // 4. Current Vessel Marker (Indian Ocean)
    const vesselMarker = L.marker(currentVesselCoords, { icon: vesselIcon })
      .addTo(map)
      .bindPopup(`
        <div style="font-family: inherit; min-width: 220px;">
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
            <span style="display: inline-block; width: 8px; height: 8px; background: #DC2626; border-radius: 50%;"></span>
            <span style="color: #F87171; font-size: 11px; font-weight: 700; text-transform: uppercase;">Position AIS en direct</span>
          </div>
          <div style="font-size: 14px; font-weight: 700; color: #FFFFFF;">${shipment.vesselName || "MAERSK Mc-Kinney Møller"}</div>
          <div style="font-size: 12px; color: #E5E7EB; margin-top: 4px;">Zone : Océan Indien Central</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-top: 8px; padding-top: 8px; border-top: 1px solid #374151; font-size: 11px;">
            <div><span style="color: #9CA3AF;">Vitesse :</span> <b style="color: #FFFFFF;">18.4 nœuds</b></div>
            <div><span style="color: #9CA3AF;">Cap :</span> <b style="color: #FFFFFF;">245° SO</b></div>
            <div><span style="color: #9CA3AF;">Progression :</span> <b style="color: #DC2626;">${shipment.progress}%</b></div>
            <div><span style="color: #9CA3AF;">ETA Douala :</span> <b style="color: #10B981;">${shipment.eta}</b></div>
          </div>
        </div>
      `);

    // Auto-open vessel popup
    vesselMarker.openPopup();

    // 5. Destination Marker (Douala)
    L.marker(doualaCoords, { icon: destIcon })
      .addTo(map)
      .bindPopup(`
        <div style="font-family: inherit;">
          <div style="color: #10B981; font-size: 11px; font-weight: 700; text-transform: uppercase;">Destination Finale</div>
          <div style="font-size: 14px; font-weight: 700; color: #FFFFFF; margin-top: 2px;">Douala, Cameroun</div>
          <div style="font-size: 12px; color: #9CA3AF; margin-top: 4px;">Arrivée estimée : <b>${shipment.eta}</b></div>
          <div style="font-size: 11px; color: #60A5FA; margin-top: 2px;">Dédouanement portuaire programmé</div>
        </div>
      `);

    // Traveled polyline (Busan -> Shanghai -> Singapore -> Indian Ocean)
    const completedLeg: [number, number][] = [busanCoords, shanghaiCoords, singaporeCoords, currentVesselCoords];
    L.polyline(completedLeg, {
      color: "#DC2626",
      weight: 3.5,
      opacity: 0.95,
      lineCap: "round",
    }).addTo(map);

    // Remaining polyline (Indian Ocean -> Madagascar -> Cape -> Douala) dashed
    const remainingLeg: [number, number][] = [currentVesselCoords, madagascarCoords, capeCoords, doualaCoords];
    L.polyline(remainingLeg, {
      color: "#EF4444",
      weight: 2.5,
      opacity: 0.55,
      dashArray: "6, 8",
    }).addTo(map);

    // Fit map bounds
    const bounds = L.latLngBounds(routeWaypoints);
    map.fitBounds(bounds, { padding: [50, 50] });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Switch Layer
  const setLayer = (layer: MapLayerType) => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    setActiveLayer(layer);

    tileLayerRef.current.remove();

    const config = getTileConfig(layer);
    const tiles = L.tileLayer(config.url, {
      attribution: config.attribution,
      maxZoom: config.maxZoom,
    }).addTo(mapInstanceRef.current);
    tileLayerRef.current = tiles;
  };

  const centerOnVessel = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo(currentVesselCoords, 6, { duration: 1.5 });
  };

  const fitFullRoute = () => {
    if (!mapInstanceRef.current) return;
    const bounds = L.latLngBounds(routeWaypoints);
    mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50], duration: 1.5 });
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-zinc-800 bg-[#09090B] shadow-2xl">
      {/* Map Interactive Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-zinc-950/95 border-b border-zinc-800 backdrop-blur-sm z-10 relative">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[#DC2626] text-white shadow-md shadow-red-600/30">
            <Compass className="w-4 h-4 animate-spin-slow" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-zinc-950"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-red-500 uppercase tracking-wider">
                CARTE DE SUIVI MARITIME ACTIVE
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
                <Radio className="w-2.5 h-2.5 animate-pulse text-[#DC2626]" />
                Signal GPS / AIS vérifié
              </span>
            </div>
            <p className="text-xs text-zinc-300 font-medium">
              Busan, Corée du Sud <span className="text-red-500 font-bold">→</span> {shipment.destination} · Navire : <span className="text-white font-semibold">{shipment.vesselName || "MAERSK Mc-Kinney Møller"}</span>
            </p>
          </div>
        </div>

        {/* Action Controls & Layer Selector */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={centerOnVessel}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-200 transition-colors cursor-pointer"
            title="Centrer sur la position actuelle du navire"
          >
            <Ship className="w-3.5 h-3.5 text-[#DC2626]" />
            <span className="hidden sm:inline">Navire</span>
          </button>

          <button
            onClick={fitFullRoute}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-200 transition-colors cursor-pointer"
            title="Afficher tout l'itinéraire"
          >
            <Maximize2 className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden sm:inline">Trajet complet</span>
          </button>

          {/* 3 Watermark-Free Layer Toggles */}
          <div className="flex items-center bg-zinc-900 p-0.5 rounded-lg border border-zinc-800 text-xs">
            <button
              onClick={() => setLayer("dark")}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                activeLayer === "dark"
                  ? "bg-[#DC2626] text-white font-bold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Mode Sombre
            </button>
            <button
              onClick={() => setLayer("satellite")}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                activeLayer === "satellite"
                  ? "bg-[#DC2626] text-white font-bold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Satellite
            </button>
            <button
              onClick={() => setLayer("osm")}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                activeLayer === "osm"
                  ? "bg-[#DC2626] text-white font-bold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              OSM
            </button>
          </div>
        </div>
      </div>

      {/* Leaflet Map Canvas */}
      <div className="relative w-full h-[420px] sm:h-[480px] bg-[#09090B]">
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Floating Telemetry HUD Card */}
        <div className="absolute top-4 left-4 z-[500] pointer-events-none hidden md:block">
          <div className="p-3.5 bg-zinc-950/90 backdrop-blur-md rounded-xl border border-zinc-800 shadow-xl pointer-events-auto max-w-[240px]">
            <div className="flex items-center gap-2 mb-2">
              <Navigation className="w-3.5 h-3.5 text-[#DC2626]" />
              <span className="text-[11px] font-bold tracking-wide uppercase text-zinc-300">
                TÉLÉMÉTRIE EN COURS
              </span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Lat/Long:</span>
                <span className="font-mono text-zinc-200">03°30&apos;N / 78°30&apos;E</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Vitesse fond:</span>
                <span className="font-medium text-emerald-400">18.4 nœuds</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Prochaine escale:</span>
                <span className="font-medium text-zinc-200">Cap de Bonne-Esp.</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Arrivée prévue:</span>
                <span className="font-medium text-[#DC2626]">{shipment.eta}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legend Overlay at bottom left */}
        <div className="absolute bottom-4 left-4 z-[500] pointer-events-none">
          <div className="px-3 py-2 bg-zinc-950/90 backdrop-blur-md rounded-lg border border-zinc-800 text-[11px] text-zinc-300 flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626] ring-2 ring-red-500/30"></span>
              Départ (Corée)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
              Position active
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Arrivée (Douala)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
