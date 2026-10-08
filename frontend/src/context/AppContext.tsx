"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { shipmentsData as initialShipments, Shipment, TrackingEvent, ShipmentStatus } from "@/data/shipments";
import { initialMessages, ContactMessage } from "@/data/messages";
import { initialCmsContent, CmsContent } from "@/data/content";
import { initialActivityLogs, ActivityLogItem } from "@/data/activity";
import { clientsData, UserProfile, currentUserClient, currentUserAdmin } from "@/data/users";

export interface ClientShipmentInput {
  senderName: string;
  senderPhone: string;
  senderAddress?: string;
  senderCityCountry: string; // e.g. "Séoul / Port de Busan, Corée du Sud"
  recipientName: string;
  recipientPhone: string;
  recipientAddress?: string;
  destinationCityCountry: string; // e.g. "Douala, Cameroun"
  mode: "Maritime" | "Aérien" | "Routier" | "Conteneurs" | "Colis & Fret" | "Import / Export";
  cargoType: string;
  weight: string;
  volume: string;
  notes?: string;
}

export interface DisplacementUpdate {
  lat: number;
  lng: number;
  locationName: string;
  progress: number;
  status: ShipmentStatus;
  eventDescription?: string;
}

interface AppContextType {
  shipments: Shipment[];
  getShipmentByNumber: (num: string) => Shipment | undefined;
  addShipment: (newShipment: Omit<Shipment, "progress" | "events" | "waypoints" | "currentCoordinates" | "currentLocationName">) => Shipment;
  submitClientShipmentRequest: (data: ClientShipmentInput) => Shipment;
  registerClientAccount: (clientData: { fullName: string; email: string; phone: string; company?: string; address?: string }) => void;
  updateShipmentStatus: (trackingNumber: string, status: ShipmentStatus, progress: number) => void;
  navigateShipmentDisplacement: (trackingNumber: string, update: DisplacementUpdate) => void;
  deleteShipment: (trackingNumber: string) => void;
  addTrackingEvent: (trackingNumber: string, event: Omit<TrackingEvent, "id">) => void;

  messages: ContactMessage[];
  addContactMessage: (msg: { senderName: string; senderEmail: string; phone?: string; subject: string; message: string }) => void;
  markMessageRead: (id: string) => void;
  archiveMessage: (id: string) => void;
  replyMessage: (id: string, replyText: string) => void;

  cmsContent: CmsContent;
  updateCmsContent: (newContent: Partial<CmsContent>) => void;

  activityLogs: ActivityLogItem[];
  addActivityLog: (user: string, action: ActivityLogItem["action"], target: string, details: string) => void;

  clients: UserProfile[];
  currentUser: UserProfile;
  switchUserRole: (role: "client" | "admin") => void;
  clientLogin: (emailOrId: string, password?: string) => UserProfile;

  isAdminAuthenticated: boolean;
  adminLogin: (passwordOrPin: string, email?: string) => boolean;
  adminLogout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_SHIPMENTS = "hl_shipments_v2";
const STORAGE_KEY_ADMIN_AUTH = "hl_admin_auth_v2";
const STORAGE_KEY_CLIENTS = "hl_clients_v2";
const STORAGE_KEY_CURRENT_CLIENT = "hl_current_client_v2";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [shipments, setShipments] = useState<Shipment[]>(initialShipments);
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [cmsContent, setCmsContent] = useState<CmsContent>(initialCmsContent);
  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>(initialActivityLogs);
  const [clients, setClients] = useState<UserProfile[]>(clientsData);
  const [currentUser, setCurrentUser] = useState<UserProfile>(currentUserClient);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  // Load persisted shipments, clients and auth state on client mount
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const savedShipments = localStorage.getItem(STORAGE_KEY_SHIPMENTS);
        if (savedShipments) {
          const parsed = JSON.parse(savedShipments);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setShipments(parsed);
          }
        }
        const savedClients = localStorage.getItem(STORAGE_KEY_CLIENTS);
        if (savedClients) {
          const parsedClients = JSON.parse(savedClients);
          if (Array.isArray(parsedClients) && parsedClients.length > 0) {
            setClients(parsedClients);
          }
        }
        const savedUser = localStorage.getItem(STORAGE_KEY_CURRENT_CLIENT);
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          if (parsedUser && parsedUser.email) {
            setCurrentUser(parsedUser);
          }
        }
        const savedAuth = localStorage.getItem(STORAGE_KEY_ADMIN_AUTH);
        if (savedAuth === "true") {
          setIsAdminAuthenticated(true);
        }
      }
    } catch {
      // LocalStorage error fallback
    }
  }, []);

  // Sync shipments to localStorage whenever updated
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY_SHIPMENTS, JSON.stringify(shipments));
      }
    } catch {
      // LocalStorage error fallback
    }
  }, [shipments]);

  // Sync clients to localStorage whenever updated
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY_CLIENTS, JSON.stringify(clients));
      }
    } catch {}
  }, [clients]);

  // Sync current client session to localStorage
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && currentUser.role === "client") {
        localStorage.setItem(STORAGE_KEY_CURRENT_CLIENT, JSON.stringify(currentUser));
      }
    } catch {}
  }, [currentUser]);

  const adminLogin = (passwordOrPin: string, email?: string): boolean => {
    // Valid admin keys: "2026", "admin2026", "herve2026", "admin" or any key >= 4 chars
    const clean = passwordOrPin.trim();
    if (clean === "2026" || clean === "admin2026" || clean === "herve2026" || clean === "admin" || clean.length >= 4) {
      setIsAdminAuthenticated(true);
      const adminEmail = email?.trim() || "admin@hervelogistics.com";
      const adminName = adminEmail.includes("@")
        ? adminEmail.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
        : "Admin Principal";

      const updatedAdminUser: UserProfile = {
        ...currentUserAdmin,
        name: adminName,
        email: adminEmail,
        role: "admin",
      };

      setCurrentUser(updatedAdminUser);
      try {
        localStorage.setItem(STORAGE_KEY_ADMIN_AUTH, "true");
        localStorage.setItem(STORAGE_KEY_CURRENT_CLIENT, JSON.stringify(updatedAdminUser));
      } catch {}
      addActivityLog(adminName, "Connexion", adminEmail, "Authentification Console Admin réussie");
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    setCurrentUser(currentUserClient);
    try {
      localStorage.removeItem(STORAGE_KEY_ADMIN_AUTH);
      localStorage.removeItem(STORAGE_KEY_CURRENT_CLIENT);
    } catch {}
  };

  const getShipmentByNumber = (num: string) => {
    const cleanNum = num.trim().toUpperCase();
    if (cleanNum === "ALT-2026-000001") {
      return shipments.find((s) => s.trackingNumber === "HL-2026-000001");
    }
    return shipments.find((s) => s.trackingNumber.toUpperCase() === cleanNum);
  };

  const addActivityLog = (user: string, action: ActivityLogItem["action"], target: string, details: string) => {
    const now = new Date();
    const dateFormatted = `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`;
    const timeFormatted = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const newLog: ActivityLogItem = {
      id: `act-${Date.now()}`,
      date: dateFormatted,
      time: timeFormatted,
      user,
      action,
      target,
      details,
    };
    setActivityLogs((prev) => [newLog, ...prev]);
  };

  const registerClientAccount = (clientData: {
    fullName: string;
    email: string;
    phone: string;
    company?: string;
    address?: string;
  }) => {
    const newProfile: UserProfile = {
      id: `usr-${Date.now()}`,
      name: clientData.fullName,
      email: clientData.email,
      role: "client",
      company: clientData.company || "Particulier / Entreprise",
      phone: clientData.phone,
      country: clientData.address || "Corée du Sud & International",
      totalShipments: 0,
      activeShipments: 0,
      memberSince: new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }),
      status: "Actif",
    };

    setClients((prev) => [newProfile, ...prev]);
    setCurrentUser(newProfile);
    addActivityLog(clientData.fullName, "Création", clientData.email, "Inscription client obligatoire validée");
  };

  const clientLogin = (emailOrId: string, _password?: string): UserProfile => {
    const clean = emailOrId.trim().toLowerCase();
    const found = clients.find(
      (c) => c.email.toLowerCase() === clean || c.id.toLowerCase() === clean
    );

    if (found) {
      setCurrentUser(found);
      addActivityLog(found.name, "Connexion", found.email, "Authentification Espace Client réussie");
      return found;
    }

    // Auto-create & authenticate real client profile for this account
    const cleanName = emailOrId.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const newProfile: UserProfile = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: cleanName || "Client Hervé Logistics",
      email: emailOrId.trim(),
      role: "client",
      company: "Client Fret & Transit",
      phone: "+44 7456 062192",
      country: "Corée du Sud & International",
      totalShipments: 0,
      activeShipments: 0,
      memberSince: new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }),
      status: "Actif",
    };

    setClients((prev) => [newProfile, ...prev]);
    setCurrentUser(newProfile);
    addActivityLog(newProfile.name, "Connexion", newProfile.email, "Authentification Espace Client réussie");
    return newProfile;
  };

  const getDestCoordinates = (dest: string): { lat: number; lng: number } => {
    const d = dest.toLowerCase();
    if (d.includes("douala") || d.includes("cameroun") || d.includes("cameroon")) return { lat: 4.05, lng: 9.70 };
    if (d.includes("abidjan") || d.includes("ivoire")) return { lat: 5.36, lng: -4.00 };
    if (d.includes("dakar") || d.includes("senegal") || d.includes("sénégal")) return { lat: 14.71, lng: -17.46 };
    if (d.includes("libreville") || d.includes("gabon")) return { lat: 0.41, lng: 9.45 };
    if (d.includes("pointe-noire") || d.includes("congo") || d.includes("brazzaville")) return { lat: -4.79, lng: 11.86 };
    if (d.includes("kinshasa") || d.includes("rdc")) return { lat: -4.32, lng: 15.31 };
    if (d.includes("lomé") || d.includes("lome") || d.includes("togo")) return { lat: 6.13, lng: 1.22 };
    if (d.includes("cotonou") || d.includes("benin") || d.includes("bénin")) return { lat: 6.37, lng: 2.43 };
    if (d.includes("le havre") || d.includes("paris") || d.includes("france")) return { lat: 49.49, lng: 0.10 };
    if (d.includes("shanghai") || d.includes("chine") || d.includes("china")) return { lat: 31.23, lng: 121.47 };
    return { lat: 4.05, lng: 9.70 };
  };

  const submitClientShipmentRequest = (data: ClientShipmentInput): Shipment => {
    const randCode = Math.floor(100000 + Math.random() * 900000);
    const trackingNumber = `HL-2026-${randCode}`;

    const destCoords = getDestCoordinates(data.destinationCityCountry);
    const now = new Date();
    const departureDateFormatted = now.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
    const etaDate = new Date(now.getTime() + (data.mode === "Aérien" ? 4 : 16) * 24 * 60 * 60 * 1000);
    const etaFormatted = etaDate.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });

    const newShipment: Shipment = {
      trackingNumber,
      clientName: currentUser.name || data.senderName,
      clientEmail: currentUser.email || "client@hervelogistics.com",
      sender: `${data.senderName} (${data.senderCityCountry || "Corée du Sud"})`,
      recipient: `${data.recipientName} (${data.destinationCityCountry})`,
      origin: data.senderCityCountry || "Busan, Corée du Sud",
      destination: data.destinationCityCountry,
      mode: data.mode,
      status: "Expédié",
      progress: 18,
      eta: etaFormatted,
      departureDate: departureDateFormatted,
      weight: data.weight || "1 250 kg",
      volume: data.volume || "Conteneur FCL / Colisage standard",
      vesselName: data.mode === "Aérien" ? "Korean Air Cargo / KE-840" : "Hervé Korea Express — HL Voyager 07",
      currentLocationName: `Hub Logistique Hervé Logistics — ${data.senderCityCountry || "Busan, Corée du Sud"}`,
      currentCoordinates: { lat: 35.10, lng: 129.04 },
      waypoints: [
        { label: `${data.senderCityCountry || "Busan, Corée du Sud"} (Origine)`, lat: 35.10, lng: 129.04, reached: true },
        { label: "Détroit de Malacca (Escale internationale)", lat: 2.19, lng: 102.25, reached: false },
        { label: `${data.destinationCityCountry} (Destination finale)`, lat: destCoords.lat, lng: destCoords.lng, reached: false },
      ],
      events: [
        {
          id: `evt-${Date.now()}`,
          date: departureDateFormatted,
          time: now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
          status: "Expédié",
          location: data.senderCityCountry || "Busan, Corée du Sud",
          description: `Prise en charge officielle par Hervé Logistics Korea Co., Ltd. Attribution du numéro de suivi ${trackingNumber}. Marchandise : ${data.cargoType} (${data.weight}, ${data.volume}). Destinataire : ${data.recipientName} (${data.destinationCityCountry}).`,
          completed: true,
        },
      ],
    };

    setShipments((prev) => [newShipment, ...prev]);

    setCurrentUser((prev) => ({
      ...prev,
      totalShipments: prev.totalShipments + 1,
      activeShipments: prev.activeShipments + 1,
    }));

    addActivityLog(
      currentUser.name || data.senderName,
      "Création",
      trackingNumber,
      `Attribution code de suivi officiel : ${data.cargoType} (${data.senderCityCountry} → ${data.destinationCityCountry})`
    );

    return newShipment;
  };

  const addShipment = (data: Omit<Shipment, "progress" | "events" | "waypoints" | "currentCoordinates" | "currentLocationName">): Shipment => {
    const newShipment: Shipment = {
      ...data,
      progress: data.status === "Livré" ? 100 : data.status === "Arrivé" ? 90 : data.status === "En transit" ? 50 : data.status === "Expédié" ? 25 : 5,
      currentLocationName: `${data.origin} (Départ)`,
      currentCoordinates: { lat: 35.10, lng: 129.04 },
      waypoints: [
        { label: `${data.origin} (Départ)`, lat: 35.10, lng: 129.04, reached: true },
        { label: `${data.destination} (Arrivée)`, lat: 4.05, lng: 9.76, reached: false },
      ],
      events: [
        {
          id: `evt-${Date.now()}`,
          date: new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" }),
          time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
          status: data.status,
          location: data.origin,
          description: `Création du dossier d'expédition pour ${data.recipient}.`,
          completed: true,
        },
      ],
    };

    setShipments((prev) => [newShipment, ...prev]);
    addActivityLog("Admin", "Création", newShipment.trackingNumber, `Nouvel envoi créé (${data.origin} → ${data.destination})`);
    return newShipment;
  };

  // Controller function allowing admin to navigate parcel displacement
  const navigateShipmentDisplacement = (trackingNumber: string, update: DisplacementUpdate) => {
    const now = new Date();
    const dateFormatted = now.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
    const timeFormatted = now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

    setShipments((prev) =>
      prev.map((s) => {
        if (s.trackingNumber.toUpperCase() === trackingNumber.toUpperCase()) {
          const updatedEvents = update.eventDescription
            ? [
                {
                  id: `evt-${Date.now()}`,
                  date: dateFormatted,
                  time: timeFormatted,
                  status: update.status,
                  location: update.locationName,
                  description: update.eventDescription,
                  lat: update.lat,
                  lng: update.lng,
                  completed: true,
                },
                ...s.events,
              ]
            : s.events;

          return {
            ...s,
            currentCoordinates: { lat: update.lat, lng: update.lng },
            currentLocationName: update.locationName,
            progress: Math.min(100, Math.max(0, update.progress)),
            status: update.status,
            events: updatedEvents,
          };
        }
        return s;
      })
    );

    addActivityLog(
      "Admin",
      "Modification",
      trackingNumber,
      `Déplacement navigué : ${update.locationName} (${update.lat.toFixed(2)}°, ${update.lng.toFixed(2)}°) — ${update.progress}% — Statut: ${update.status}`
    );
  };

  const updateShipmentStatus = (trackingNumber: string, status: ShipmentStatus, progress: number) => {
    setShipments((prev) =>
      prev.map((s) => (s.trackingNumber === trackingNumber ? { ...s, status, progress } : s))
    );
    addActivityLog("Admin", "Modification", trackingNumber, `Statut mis à jour : ${status} (${progress}%)`);
  };

  const deleteShipment = (trackingNumber: string) => {
    setShipments((prev) => prev.filter((s) => s.trackingNumber !== trackingNumber));
    addActivityLog("Admin", "Suppression", trackingNumber, `Suppression de l'envoi`);
  };

  const addTrackingEvent = (trackingNumber: string, eventData: Omit<TrackingEvent, "id">) => {
    const newEvent: TrackingEvent = {
      ...eventData,
      id: `evt-${Date.now()}`,
    };

    setShipments((prev) =>
      prev.map((s) => {
        if (s.trackingNumber === trackingNumber) {
          const updatedEvents = [newEvent, ...s.events];
          return {
            ...s,
            events: updatedEvents,
            currentLocationName: eventData.location,
            status: eventData.status === "Arrivée prévue" ? s.status : eventData.status,
          };
        }
        return s;
      })
    );

    addActivityLog("Admin", "Modification", trackingNumber, `Événement ajouté : ${eventData.location} (${eventData.status})`);
  };

  const addContactMessage = (msg: { senderName: string; senderEmail: string; phone?: string; subject: string; message: string }) => {
    const now = new Date();
    const dateFormatted = `${now.getDate()} ${now.toLocaleDateString("fr-FR", { month: "short" })}. ${now.getFullYear()}`;
    const timeFormatted = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      ...msg,
      date: dateFormatted,
      time: timeFormatted,
      read: false,
      archived: false,
      replied: false,
    };

    setMessages((prev) => [newMsg, ...prev]);
    addActivityLog(msg.senderName, "Notification", "Nouveau Message", `Message reçu : ${msg.subject}`);
  };

  const markMessageRead = (id: string) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
  };

  const archiveMessage = (id: string) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, archived: true } : m)));
    addActivityLog("Admin", "Modification", `Message #${id}`, `Message archivé`);
  };

  const replyMessage = (id: string, replyText: string) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, replied: true, read: true } : m)));
    addActivityLog("Admin", "Notification", `Message #${id}`, `Réponse envoyée au client`);
  };

  const updateCmsContent = (newContent: Partial<CmsContent>) => {
    setCmsContent((prev) => ({ ...prev, ...newContent }));
    addActivityLog("Admin", "Modification", "CMS Contenus", "Mise à jour des contenus éditoriaux");
  };

  const switchUserRole = (role: "client" | "admin") => {
    setCurrentUser(role === "client" ? currentUserClient : currentUserAdmin);
  };

  return (
    <AppContext.Provider
      value={{
        shipments,
        getShipmentByNumber,
        addShipment,
        submitClientShipmentRequest,
        registerClientAccount,
        updateShipmentStatus,
        navigateShipmentDisplacement,
        deleteShipment,
        addTrackingEvent,
        messages,
        addContactMessage,
        markMessageRead,
        archiveMessage,
        replyMessage,
        cmsContent,
        updateCmsContent,
        activityLogs,
        addActivityLog,
        clients,
        currentUser,
        switchUserRole,
        clientLogin,
        isAdminAuthenticated,
        adminLogin,
        adminLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
