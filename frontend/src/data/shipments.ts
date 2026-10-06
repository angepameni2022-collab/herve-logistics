export type ShipmentStatus = "En attente" | "Expédié" | "En transit" | "Arrivé" | "Livré";

export interface TrackingEvent {
  id: string;
  date: string;
  time: string;
  status: ShipmentStatus | "Arrivée prévue";
  location: string;
  description: string;
  lat?: number;
  lng?: number;
  completed: boolean;
}

export interface Shipment {
  trackingNumber: string;
  clientName: string;
  clientEmail: string;
  sender: string;
  recipient: string;
  origin: string;
  destination: string;
  mode: "Maritime" | "Aérien" | "Routier" | "Conteneurs" | "Colis & Fret" | "Import / Export";
  status: ShipmentStatus;
  progress: number; // 0 to 100
  eta: string;
  departureDate: string;
  weight: string;
  volume: string;
  vesselName?: string;
  currentLocationName: string;
  currentCoordinates: { lat: number; lng: number };
  waypoints: { label: string; lat: number; lng: number; reached: boolean }[];
  events: TrackingEvent[];
}

export const shipmentsData: Shipment[] = [
  {
    trackingNumber: "HL-2026-000001",
    clientName: "Jean Dupont",
    clientEmail: "jean.dupont@email.com",
    sender: "Hervé Logistics Korea Co., Ltd. (Busan Port Hub)",
    recipient: "Société d'Importation & Transit SARL",
    origin: "Busan, Corée du Sud",
    destination: "Douala, Cameroun",
    mode: "Maritime",
    status: "En transit",
    progress: 79,
    eta: "25 avr. 2026",
    departureDate: "12 avr. 2026",
    weight: "14 850 kg",
    volume: "2 × Conteneur 40' High Cube",
    vesselName: "MAERSK Mc-Kinney Møller (IMO: 9619907)",
    currentLocationName: "En transit maritime — Océan Indien",
    currentCoordinates: { lat: -4.21, lng: 55.45 },
    waypoints: [
      { label: "Busan, Corée du Sud (Origine)", lat: 35.10, lng: 129.04, reached: true },
      { label: "Shanghai, Chine (Escale)", lat: 31.23, lng: 121.47, reached: true },
      { label: "Détroit de Malacca", lat: 2.19, lng: 102.25, reached: true },
      { label: "Océan Indien (Position actuelle)", lat: -4.21, lng: 55.45, reached: true },
      { label: "Cap de Bonne-Espérance", lat: -34.35, lng: 18.47, reached: false },
      { label: "Port de Douala, Cameroun (Arrivée)", lat: 4.05, lng: 9.76, reached: false }
    ],
    events: [
      {
        id: "evt-hl-1",
        date: "12 avr. 2026",
        time: "08:30",
        status: "Expédié",
        location: "Shanghai, Chine",
        description: "Marchandise prise en charge par l'expéditeur et scellage des conteneurs.",
        lat: 31.2304,
        lng: 121.4737,
        completed: true
      },
      {
        id: "evt-hl-2",
        date: "16 avr. 2026",
        time: "16:20",
        status: "En transit",
        location: "Port de Shanghai, Chine",
        description: "Embarquement validé sur le porte-conteneurs MAERSK et appareillage.",
        lat: 31.2304,
        lng: 121.4737,
        completed: true
      },
      {
        id: "evt-hl-3",
        date: "18 avr. 2026",
        time: "10:15",
        status: "En transit",
        location: "Océan Indien",
        description: "En transit maritime international. Balise AIS et conditions de navigation optimales.",
        lat: -4.21,
        lng: 55.45,
        completed: true
      },
      {
        id: "evt-hl-4",
        date: "25 avr. 2026",
        time: "08:00",
        status: "Arrivée prévue",
        location: "Douala, Cameroun",
        description: "Arrivée estimée au quai à conteneurs du Port Autonome de Douala. Dédouanement.",
        lat: 4.0511,
        lng: 9.7679,
        completed: false
      }
    ]
  },
  {
    trackingNumber: "TL-2025-000123",
    clientName: "Jean Dupont",
    clientEmail: "jean.dupont@email.com",
    sender: "Shanghai Global Trading Co., Ltd.",
    recipient: "Société Camerounaise d'Importation SARL",
    origin: "Shanghai, Chine",
    destination: "Douala, Cameroun",
    mode: "Maritime",
    status: "En transit",
    progress: 79,
    eta: "25 avr. 2025",
    departureDate: "12 avr. 2025",
    weight: "14 850 kg",
    volume: "2 × Conteneur 40' High Cube",
    vesselName: "CMA CGM Palais Royal (IMO: 9839181)",
    currentLocationName: "En transit maritime — Océan Indien",
    currentCoordinates: { lat: -4.21, lng: 55.45 },
    waypoints: [
      { label: "Shanghai, Chine (Origine)", lat: 31.23, lng: 121.47, reached: true },
      { label: "Détroit de Malacca", lat: 2.19, lng: 102.25, reached: true },
      { label: "Océan Indien (Position actuelle)", lat: -4.21, lng: 55.45, reached: true },
      { label: "Cap de Bonne-Espérance", lat: -34.35, lng: 18.47, reached: false },
      { label: "Port de Douala, Cameroun (Arrivée)", lat: 4.05, lng: 9.76, reached: false }
    ],
    events: [
      {
        id: "evt-1",
        date: "12 avr. 2025",
        time: "08:30",
        status: "Expédié",
        location: "Shanghai, Chine",
        description: "Marchandise prise en charge par l'expéditeur et scellage des conteneurs.",
        lat: 31.2304,
        lng: 121.4737,
        completed: true
      },
      {
        id: "evt-2",
        date: "16 avr. 2025",
        time: "16:20",
        status: "En transit",
        location: "Port de Shanghai, Chine",
        description: "Embarquement sur le navire et validation des manifestes de douane.",
        lat: 30.6279,
        lng: 122.0642,
        completed: true
      },
      {
        id: "evt-3",
        date: "18 avr. 2025",
        time: "10:15",
        status: "En transit",
        location: "Océan Indien",
        description: "En transit maritime régulier vers la côte atlantique africaine.",
        lat: -4.21,
        lng: 55.45,
        completed: true
      },
      {
        id: "evt-4",
        date: "25 avr. 2025",
        time: "08:00",
        status: "Arrivée prévue",
        location: "Douala, Cameroun",
        description: "Arrivée estimée au quai à conteneurs du Port Autonome de Douala.",
        lat: 4.0511,
        lng: 9.7679,
        completed: false
      }
    ]
  },
  {
    trackingNumber: "TL-2025-000124",
    clientName: "Jean Dupont",
    clientEmail: "jean.dupont@email.com",
    sender: "Pharma France Distribution",
    recipient: "Cabinet Médical du Littoral",
    origin: "Paris, France",
    destination: "Douala, Cameroun",
    mode: "Aérien",
    status: "Livré",
    progress: 100,
    eta: "14 avr. 2025",
    departureDate: "10 avr. 2025",
    weight: "340 kg",
    volume: "1.8 m³ (Sous chaîne du froid)",
    vesselName: "Air France Cargo AF0784",
    currentLocationName: "Douala, Cameroun (Livré)",
    currentCoordinates: { lat: 4.0511, lng: 9.7679 },
    waypoints: [
      { label: "Paris CDG", lat: 49.0097, lng: 2.5479, reached: true },
      { label: "Hub N'Djamena", lat: 12.1348, lng: 15.0557, reached: true },
      { label: "Aéroport de Douala", lat: 4.006, lng: 9.719, reached: true }
    ],
    events: [
      {
        id: "evt-21",
        date: "10 avr. 2025",
        time: "09:00",
        status: "Expédié",
        location: "Paris CDG, France",
        description: "Enregistrement au terminal fret Charles de Gaulle.",
        completed: true
      },
      {
        id: "evt-22",
        date: "12 avr. 2025",
        time: "14:15",
        status: "En transit",
        location: "En vol international",
        description: "Vol direct cargo à destination du Cameroun.",
        completed: true
      },
      {
        id: "evt-23",
        date: "13 avr. 2025",
        time: "18:30",
        status: "Arrivé",
        location: "Aéroport de Douala, Cameroun",
        description: "Contrôles douaniers et déchargement réussis.",
        completed: true
      },
      {
        id: "evt-24",
        date: "14 avr. 2025",
        time: "11:45",
        status: "Livré",
        location: "Douala Bonanjo, Cameroun",
        description: "Livraison effectuée avec signature du destinataire.",
        completed: true
      }
    ]
  },
  {
    trackingNumber: "TL-2025-000125",
    clientName: "Afriq BTP SARL",
    clientEmail: "contact@afriqbtp.ci",
    sender: "Euro Machinery NV",
    recipient: "Afriq BTP SARL Abidjan",
    origin: "Anvers, Belgique",
    destination: "Abidjan, Côte d'Ivoire",
    mode: "Conteneurs",
    status: "En attente",
    progress: 15,
    eta: "08 mai 2025",
    departureDate: "28 avr. 2025",
    weight: "28 500 kg",
    volume: "3 × Conteneur 40' Flat Rack",
    vesselName: "Maersk Bintan",
    currentLocationName: "Terminal d'Anvers (En attente d'embarquement)",
    currentCoordinates: { lat: 51.2194, lng: 4.4025 },
    waypoints: [
      { label: "Anvers, Belgique", lat: 51.2194, lng: 4.4025, reached: true },
      { label: "Port d'Abidjan", lat: 5.3097, lng: -4.0127, reached: false }
    ],
    events: [
      {
        id: "evt-31",
        date: "20 avr. 2025",
        time: "11:00",
        status: "En attente",
        location: "Port d'Anvers, Belgique",
        description: "Dossier d'empotage validé. Attente de la fenêtre de chargement.",
        completed: true
      }
    ]
  },
  {
    trackingNumber: "TL-2025-000126",
    clientName: "Sahel Distribution",
    clientEmail: "sahel@distribution.ne",
    sender: "Port Autonome de Cotonou",
    recipient: "Entrepôts Sahel Niamey",
    origin: "Cotonou, Bénin",
    destination: "Niamey, Niger",
    mode: "Routier",
    status: "Expédié",
    progress: 45,
    eta: "27 avr. 2025",
    departureDate: "22 avr. 2025",
    weight: "32 000 kg",
    volume: "2 semi-remorques bâchées",
    vesselName: "Convoi Routier TL-Truck-08",
    currentLocationName: "Parakou, Bénin",
    currentCoordinates: { lat: 9.3371, lng: 2.6303 },
    waypoints: [
      { label: "Cotonou, Bénin", lat: 6.3654, lng: 2.4183, reached: true },
      { label: "Parakou, Bénin", lat: 9.3371, lng: 2.6303, reached: true },
      { label: "Poste-frontière Malanville", lat: 11.868, lng: 3.383, reached: false },
      { label: "Niamey, Niger", lat: 13.5116, lng: 2.1254, reached: false }
    ],
    events: [
      {
        id: "evt-41",
        date: "22 avr. 2025",
        time: "07:30",
        status: "Expédié",
        location: "Port de Cotonou, Bénin",
        description: "Départ du convoi sécurisé après formalités de transit douanier.",
        completed: true
      },
      {
        id: "evt-42",
        date: "23 avr. 2025",
        time: "15:10",
        status: "En transit",
        location: "Parakou, Bénin",
        description: "Point de contrôle relais réussi. Reprise de route vers le Nord.",
        completed: true
      }
    ]
  },
  {
    trackingNumber: "TL-2025-000127",
    clientName: "Sénégal Agro Services",
    clientEmail: "contact@senegalagro.sn",
    sender: "Rotterdam Agri Export",
    recipient: "Sénégal Agro Dakar",
    origin: "Rotterdam, Pays-Bas",
    destination: "Dakar, Sénégal",
    mode: "Maritime",
    status: "En transit",
    progress: 62,
    eta: "02 mai 2025",
    departureDate: "18 avr. 2025",
    weight: "22 100 kg",
    volume: "1 × Reefer 40'",
    vesselName: "MSC Grandiosa V",
    currentLocationName: "Large des Îles Canaries",
    currentCoordinates: { lat: 28.1248, lng: -15.43 },
    waypoints: [
      { label: "Rotterdam, Pays-Bas", lat: 51.9244, lng: 4.4777, reached: true },
      { label: "Détroit de Gibraltar", lat: 35.9644, lng: -5.6027, reached: true },
      { label: "Canaries (En mer)", lat: 28.1248, lng: -15.43, reached: true },
      { label: "Port de Dakar, Sénégal", lat: 14.6928, lng: -17.4467, reached: false }
    ],
    events: [
      {
        id: "evt-51",
        date: "18 avr. 2025",
        time: "12:00",
        status: "Expédié",
        location: "Rotterdam, Pays-Bas",
        description: "Conteneur frigorifique branché et scellé à bord.",
        completed: true
      },
      {
        id: "evt-52",
        date: "21 avr. 2025",
        time: "20:45",
        status: "En transit",
        location: "Détroit de Gibraltar",
        description: "Passage atlantique sous suivi satellite continu.",
        completed: true
      }
    ]
  }
];
