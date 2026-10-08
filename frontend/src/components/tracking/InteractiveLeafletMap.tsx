"use client";

import React, { useEffect, useRef, useState } from "react";
import { Shipment } from "@/data/shipments";
import { Compass, Maximize2, Radio, Ship, Navigation, CheckCircle2 } from "lucide-react";
import L from "leaflet";

interface InteractiveLeafletMapProps {
  shipment: Shipment;
}

type MapLayerType = "light" | "osm" | "satellite" | "dark";

export default function InteractiveLeafletMap({ shipment }: InteractiveLeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [activeLayer, setActiveLayer] = useState<MapLayerType>("light");
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const vesselMarkerRef = useRef<L.Marker | null>(null);
  const completedPolylineRef = useRef<L.Polyline | null>(null);
  const remainingPolylineRef = useRef<L.Polyline | null>(null);

  // Derive coordinates dynamically from shipment or fallback to international maritime corridor
  const busanCoords: [number, number] = [35.1028, 129.0403]; // Busan Port, South Korea
  const shanghaiCoords: [number, number] = [31.2304, 121.4737]; // Shanghai, China
  const singaporeCoords: [number, number] = [1.3521, 103.8198]; // Singapore / Malacca
  const madagascarCoords: [number, number] = [-12.0, 50.0];
  const capeCoords: [number, number] = [-34.35, 18.5];
  const doualaCoords: [number, number] = [4.0511, 9.7679]; // Douala Port, Cameroon

  const currentCoords: [number, number] = [
    shipment.currentCoordinates?.lat ?? 3.5,
    shipment.currentCoordinates?.lng ?? 78.5,
  ];

  // Full route waypoints
  const routeWaypoints: [number, number][] = [
    busanCoords,
    shanghaiCoords,
    singaporeCoords,
    currentCoords,
    madagascarCoords,
    capeCoords,
    doualaCoords,
  ];

  // Map Tile Providers (Free, high performance, light/white default)
  const getTileConfig = (layer: MapLayerType) => {
    switch (layer) {
      case "osm":
        return {
          url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19,
        };
      case "satellite":
        return {
          url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          attribution: '&copy; Esri &mdash; Maxar, Earthstar Geographics',
          maxZoom: 18,
        };
      case "dark":
        return {
          url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
          attribution: '&copy; Esri &mdash; DeLorme, NAVTEQ',
          maxZoom: 16,
        };
      case "light":
      default:
        // Pure White / Positron Cartography
        return {
          url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
          attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
          maxZoom: 19,
        };
    }
  };

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Initialize Leaflet Map in Light / White Mode
    const map = L.map(mapContainerRef.current, {
      center: currentCoords,
      zoom: 3,
      minZoom: 2,
      maxZoom: 18,
      zoomControl: false,
    });

    mapInstanceRef.current = map;

    // Add Zoom Control bottom right
    L.control.zoom({ position: "bottomright" }).addTo(map);

    // Initial Tile Layer: CartoDB Positron (Clean, pure white/light theme)
    const initialConfig = getTileConfig("light");
    const tiles = L.tileLayer(initialConfig.url, {
      attribution: initialConfig.attribution,
      maxZoom: initialConfig.maxZoom,
    }).addTo(map);
    tileLayerRef.current = tiles;

    // 1. Custom Origin Icon (Busan, South Korea)
    const originIcon = L.divIcon({
      className: "custom-map-icon",
      html: `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px;">
          <div style="position: absolute; width: 28px; height: 28px; background: rgba(220, 38, 38, 0.25); border-radius: 50%; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="width: 16px; height: 16px; background: #DC2626; border: 2.5px solid #FFFFFF; border-radius: 50%; box-shadow: 0 2px 8px rgba(220, 38, 38, 0.6);"></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    // 2. Custom Vessel / Parcel Live Icon
    const vesselIcon = L.divIcon({
      className: "custom-vessel-icon",
      html: `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 48px; height: 48px;">
          <div style="position: absolute; width: 44px; height: 44px; background: rgba(220, 38, 38, 0.25); border-radius: 50%; animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position: absolute; width: 32px; height: 32px; background: rgba(220, 38, 38, 0.35); border-radius: 50%;"></div>
          <div style="position: relative; width: 26px; height: 26px; background: #DC2626; border: 2.5px solid #FFFFFF; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(220, 38, 38, 0.65);">
            <svg style="width: 14px; height: 14px; fill: white;" viewBox="0 0 24 24">
              <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.5 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
              <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 6"/>
              <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/>
              <path d="M12 10v4"/>
              <path d="M12 2v3"/>
            </svg>
          </div>
        </div>
      `,
      iconSize: [48, 48],
      iconAnchor: [24, 24],
    });

    // 3. Custom Destination Icon (Douala, Cameroon)
    const destIcon = L.divIcon({
      className: "custom-dest-icon",
      html: `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px;">
          <div style="width: 16px; height: 16px; background: #10B981; border: 2.5px solid #FFFFFF; border-radius: 50%; box-shadow: 0 2px 8px rgba(16, 185, 129, 0.6);"></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    // Origin Marker
    L.marker(busanCoords, { icon: originIcon })
      .addTo(map)
      .bindPopup(`
        <div style="font-family: inherit; color: #0F172A; min-width: 200px;">
          <div style="color: #DC2626; font-size: 11px; font-weight: 800; text-transform: uppercase;">Hub de départ (Corée du Sud)</div>
          <div style="font-size: 13px; font-weight: 700; color: #0F172A; margin-top: 2px;">Port de Busan, Corée du Sud</div>
          <div style="font-size: 11px; color: #64748B; margin-top: 2px;">Prise en charge & scellage Hervé Logistics</div>
          <div style="font-size: 11px; color: #10B981; font-weight: 600; margin-top: 4px;">✓ Expédié avec succès</div>
        </div>
      `);

    // Waypoints
    L.circleMarker(shanghaiCoords, { radius: 5, color: "#DC2626", fillColor: "#FFFFFF", fillOpacity: 1, weight: 2 })
      .addTo(map)
      .bindPopup(`<div style="color:#0F172A; font-weight:700; font-size:12px;">Escale Shanghai, Chine</div>`);

    L.circleMarker(singaporeCoords, { radius: 5, color: "#DC2626", fillColor: "#FFFFFF", fillOpacity: 1, weight: 2 })
      .addTo(map)
      .bindPopup(`<div style="color:#0F172A; font-weight:700; font-size:12px;">Passage Détroit de Malacca / Singapour</div>`);

    // Live Vessel / Parcel Marker
    const vesselMarker = L.marker(currentCoords, { icon: vesselIcon })
      .addTo(map)
      .bindPopup(`
        <div style="font-family: inherit; min-width: 230px; color: #0F172A;">
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
            <span style="display: inline-block; width: 8px; height: 8px; background: #DC2626; border-radius: 50%;"></span>
            <span style="color: #DC2626; font-size: 11px; font-weight: 800; text-transform: uppercase;">Position actuelle du colis</span>
          </div>
          <div style="font-size: 14px; font-weight: 800; color: #0F172A;">${shipment.currentLocationName || "En transit international"}</div>
          <div style="font-size: 11px; color: #64748B; margin-top: 2px;">Convoi : ${shipment.vesselName || "Hervé Korea Express"}</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-top: 8px; padding-top: 8px; border-top: 1px solid #E2E8F0; font-size: 11px;">
            <div><span style="color: #64748B;">Progression :</span> <b style="color: #DC2626;">${shipment.progress}%</b></div>
            <div><span style="color: #64748B;">Statut :</span> <b style="color: #0F172A;">${shipment.status}</b></div>
            <div><span style="color: #64748B;">Coordonnées :</span> <b style="color: #0F172A;">${currentCoords[0].toFixed(2)}°, ${currentCoords[1].toFixed(2)}°</b></div>
            <div><span style="color: #64748B;">ETA Douala :</span> <b style="color: #10B981;">${shipment.eta}</b></div>
          </div>
        </div>
      `);
    vesselMarkerRef.current = vesselMarker;

    // Destination Marker
    L.marker(doualaCoords, { icon: destIcon })
      .addTo(map)
      .bindPopup(`
        <div style="font-family: inherit; min-width: 200px; color: #0F172A;">
          <div style="color: #10B981; font-size: 11px; font-weight: 800; text-transform: uppercase;">Destination finale</div>
          <div style="font-size: 13px; font-weight: 700; color: #0F172A; margin-top: 2px;">${shipment.destination || "Douala, Cameroun"}</div>
          <div style="font-size: 11px; color: #64748B; margin-top: 2px;">Arrivée estimée : <b style="color:#0F172A;">${shipment.eta}</b></div>
          <div style="font-size: 11px; color: #2563EB; font-weight: 600; margin-top: 4px;">Dédouanement portuaire programmé</div>
        </div>
      `);

    // Traveled polyline (Busan -> Shanghai -> Singapore -> current position)
    const completedLeg: [number, number][] = [busanCoords, shanghaiCoords, singaporeCoords, currentCoords];
    const completedLine = L.polyline(completedLeg, {
      color: "#DC2626",
      weight: 4,
      opacity: 0.95,
      lineCap: "round",
    }).addTo(map);
    completedPolylineRef.current = completedLine;

    // Remaining polyline (current position -> Madagascar -> Cape -> Douala) dashed
    const remainingLeg: [number, number][] = [currentCoords, madagascarCoords, capeCoords, doualaCoords];
    const remainingLine = L.polyline(remainingLeg, {
      color: "#F87171",
      weight: 3,
      opacity: 0.75,
      dashArray: "6, 8",
    }).addTo(map);
    remainingPolylineRef.current = remainingLine;

    // Fit map bounds
    const bounds = L.latLngBounds(routeWaypoints);
    map.fitBounds(bounds, { padding: [50, 50] });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Effect: update vessel marker & polyline when coordinates change dynamically
  useEffect(() => {
    if (!mapInstanceRef.current || !vesselMarkerRef.current) return;

    const newCoords: [number, number] = [
      shipment.currentCoordinates?.lat ?? 3.5,
      shipment.currentCoordinates?.lng ?? 78.5,
    ];

    // Move marker smoothly
    vesselMarkerRef.current.setLatLng(newCoords);

    // Update popup content
    vesselMarkerRef.current.setPopupContent(`
      <div style="font-family: inherit; min-width: 230px; color: #0F172A;">
        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
          <span style="display: inline-block; width: 8px; height: 8px; background: #DC2626; border-radius: 50%;"></span>
          <span style="color: #DC2626; font-size: 11px; font-weight: 800; text-transform: uppercase;">Position actuelle du colis</span>
        </div>
        <div style="font-size: 14px; font-weight: 800; color: #0F172A;">${shipment.currentLocationName || "En transit"}</div>
        <div style="font-size: 11px; color: #64748B; margin-top: 2px;">Convoi : ${shipment.vesselName || "Hervé Korea Express"}</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-top: 8px; padding-top: 8px; border-top: 1px solid #E2E8F0; font-size: 11px;">
          <div><span style="color: #64748B;">Progression :</span> <b style="color: #DC2626;">${shipment.progress}%</b></div>
          <div><span style="color: #64748B;">Statut :</span> <b style="color: #0F172A;">${shipment.status}</b></div>
          <div><span style="color: #64748B;">Coordonnées :</span> <b style="color: #0F172A;">${newCoords[0].toFixed(2)}°, ${newCoords[1].toFixed(2)}°</b></div>
          <div><span style="color: #64748B;">ETA Douala :</span> <b style="color: #10B981;">${shipment.eta}</b></div>
        </div>
      </div>
    `);

    // Redraw polylines
    if (completedPolylineRef.current) {
      completedPolylineRef.current.setLatLngs([busanCoords, shanghaiCoords, singaporeCoords, newCoords]);
    }
    if (remainingPolylineRef.current) {
      remainingPolylineRef.current.setLatLngs([newCoords, madagascarCoords, capeCoords, doualaCoords]);
    }

    // Pan smoothly to updated location
    mapInstanceRef.current.panTo(newCoords, { animate: true, duration: 1 });
  }, [shipment.currentCoordinates?.lat, shipment.currentCoordinates?.lng, shipment.progress, shipment.status, shipment.currentLocationName]);

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
    mapInstanceRef.current.flyTo(currentCoords, 6, { duration: 1.5 });
  };

  const fitFullRoute = () => {
    if (!mapInstanceRef.current) return;
    const bounds = L.latLngBounds(routeWaypoints);
    mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50], duration: 1.5 });
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-zinc-200 bg-white shadow-lg">
      {/* Map Interactive Toolbar (Pure White Theme) */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-white border-b border-zinc-200 z-10 relative">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[#DC2626] text-white shadow-md shadow-red-500/20">
            <Compass className="w-4 h-4 animate-spin-slow" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider">
                CARTE DE SUIVI BLANCHE HAUTE PRÉCISION
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Radio className="w-2.5 h-2.5 animate-pulse text-emerald-600" />
                Signal GPS / AIS actif
              </span>
            </div>
            <p className="text-xs text-zinc-600 font-medium">
              {shipment.origin || "Busan, Corée du Sud"} <span className="text-[#DC2626] font-bold">→</span> {shipment.destination || "Douala, Cameroun"} · Position : <span className="text-zinc-900 font-bold">{shipment.currentLocationName}</span>
            </p>
          </div>
        </div>

        {/* Action Controls & Layer Selector */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={centerOnVessel}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-xs font-semibold text-zinc-800 transition-colors cursor-pointer"
            title="Centrer sur la position actuelle du colis"
          >
            <Ship className="w-3.5 h-3.5 text-[#DC2626]" />
            <span className="hidden sm:inline">Position colis</span>
          </button>

          <button
            onClick={fitFullRoute}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-xs font-semibold text-zinc-800 transition-colors cursor-pointer"
            title="Afficher tout l'itinéraire mondial"
          >
            <Maximize2 className="w-3.5 h-3.5 text-zinc-600" />
            <span className="hidden sm:inline">Trajet complet</span>
          </button>

          {/* Layer Selector */}
          <div className="flex items-center bg-zinc-100 p-0.5 rounded-lg border border-zinc-200 text-xs font-semibold">
            <button
              onClick={() => setLayer("light")}
              className={`px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs rounded-md transition-all cursor-pointer ${
                activeLayer === "light"
                  ? "bg-white text-[#DC2626] font-bold shadow-xs border border-zinc-200"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              Carte Blanche
            </button>
            <button
              onClick={() => setLayer("osm")}
              className={`px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs rounded-md transition-all cursor-pointer ${
                activeLayer === "osm"
                  ? "bg-white text-[#DC2626] font-bold shadow-xs border border-zinc-200"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              OSM
            </button>
            <button
              onClick={() => setLayer("satellite")}
              className={`px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs rounded-md transition-all cursor-pointer ${
                activeLayer === "satellite"
                  ? "bg-white text-[#DC2626] font-bold shadow-xs border border-zinc-200"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              Satellite
            </button>
          </div>
        </div>
      </div>

      {/* Leaflet Map Canvas (White Base) */}
      <div className="relative w-full h-[400px] sm:h-[500px] bg-[#F8FAFC]">
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Floating Telemetry HUD Card (Clean White Glass) */}
        <div className="absolute top-4 left-4 z-[500] pointer-events-none hidden md:block">
          <div className="p-3.5 bg-white/95 backdrop-blur-md rounded-xl border border-zinc-200 shadow-xl pointer-events-auto max-w-[250px]">
            <div className="flex items-center gap-2 mb-2">
              <Navigation className="w-3.5 h-3.5 text-[#DC2626]" />
              <span className="text-[11px] font-black tracking-wide uppercase text-zinc-800">
                TÉLÉMÉTRIE EN DIRECT
              </span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-600">
                <span>Position actuelle:</span>
                <span className="font-mono font-bold text-zinc-900">
                  {currentCoords[0].toFixed(2)}°N / {currentCoords[1].toFixed(2)}°E
                </span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Progression:</span>
                <span className="font-bold text-[#DC2626]">{shipment.progress}%</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Statut du convoi:</span>
                <span className="font-bold text-emerald-600">{shipment.status}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Arrivée prévue (ETA):</span>
                <span className="font-bold text-zinc-900">{shipment.eta}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legend Overlay at bottom left (White Theme) */}
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-[500] pointer-events-none max-w-[calc(100%-1.5rem)]">
          <div className="px-2.5 py-1.5 sm:px-3.5 sm:py-2 bg-white/95 backdrop-blur-md rounded-xl border border-zinc-200 text-[10px] sm:text-[11px] font-semibold text-zinc-700 flex flex-wrap items-center gap-2 sm:gap-4 shadow-md">
            <span className="flex items-center gap-1.5">
              <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#DC2626] ring-2 ring-red-200"></span>
              <span>Départ ({shipment.origin?.split(",")[0] || "Busan"})</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#DC2626] animate-ping"></span>
              <span>Position ({shipment.progress}%)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-emerald-500"></span>
              <span>Destination ({shipment.destination?.split(",")[0] || "Douala"})</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
