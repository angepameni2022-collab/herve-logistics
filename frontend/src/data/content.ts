export interface StatItem {
  id: string;
  value: string;
  label: string;
}

export interface CmsContent {
  home: {
    badge: string;
    heroTitle: string;
    heroDescription: string;
    heroImage: string;
    ctaBannerTitle: string;
    ctaBannerDesc: string;
    ctaButtonText: string;
  };
  servicesPage: {
    heroTitle: string;
    heroSubtitle: string;
  };
  aboutPage: {
    heroTitle: string;
    heroSubtitle: string;
    missionTitle?: string;
    missionText1?: string;
    missionText2?: string;
    historyTitle: string;
    historyText1: string;
    historyText2: string;
    historyImage: string;
  };
  stats: StatItem[];
}

export const initialCmsContent: CmsContent = {
  home: {
    badge: "PLATEFORME INTERNATIONALE · TEMPS RÉEL",
    heroTitle: "SUIVEZ VOS MARCHANDISES PARTOUT DANS LE MONDE",
    heroDescription: "Hervé Logistics réunit le maritime, l'aérien, le routier et la livraison de conteneurs sur une seule plateforme. Suivi GPS, escales, ETA et documents — livrés avec la précision des leaders mondiaux.",
    heroImage: "/images/hero-multimodal.png",
    ctaBannerTitle: "Besoin d'aide ? Contactez-nous !",
    ctaBannerDesc: "Notre équipe est disponible 24h/24 pour répondre à tous vos impératifs logistiques.",
    ctaButtonText: "Nous contacter →"
  },
  servicesPage: {
    heroTitle: "Nos services",
    heroSubtitle: "Des solutions logistiques complètes pour tous vos besoins."
  },
  aboutPage: {
    heroTitle: "À propos de Hervé Logistics",
    heroSubtitle: "Une entreprise engagée pour une logistique durable et performante.",
    missionTitle: "Notre Mission",
    missionText1: "Notre mission est simple : offrir à chaque client la même transparence, la même précision et le même niveau de service que les plus grands transporteurs mondiaux — DHL, FedEx, UPS, MSC, Maersk ou CMA CGM — dans une interface fluide, moderne et sécurisée.",
    missionText2: "Nous accompagnons entreprises, importateurs et particuliers dans le suivi de leurs colis, conteneurs et véhicules à travers plus de 180 pays, 24h/24.",
    historyTitle: "Notre histoire",
    historyText1: "Établie en Corée du Sud au cœur du dynamisme commercial asiatique, Hervé Logistics est devenue une référence majeure dans le transport multimodal et le dédouanement international.",
    historyText2: "Depuis notre siège à Séoul et nos corridors logistiques majeurs (Busan, Incheon), nous combinons puissance opérationnelle, rigueur réglementaire et technologies de traçabilité temps réel pour relier l'Asie, l'Afrique, l'Europe et les Amériques.",
    historyImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"
  },
  stats: [
    { id: "stat-1", value: "+25 000", label: "Expéditions réussies" },
    { id: "stat-2", value: "99.4%", label: "Taux de ponctualité" },
    { id: "stat-3", value: "120+", label: "Destinations mondiales" },
    { id: "stat-4", value: "24/7", label: "Support dédié" }
  ]
};
