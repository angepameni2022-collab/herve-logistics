export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  description: string;
  iconName: string;
  image: string;
  badge?: string;
  features: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "maritime",
    title: "Maritime",
    slug: "maritime",
    shortDesc: "Transport maritime mondial régulier en conteneurs FCL et LCL.",
    description: "Des liaisons maritimes régulières et sécurisées vers les plus grands ports mondiaux. Nous gérons vos expéditions complètes (FCL) ou groupées (LCL) avec une traçabilité rigoureuse.",
    iconName: "Ship",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    badge: "Fret majeur",
    features: ["Conteneurs 20' et 40'", "Groupage LCL hebdomadaire", "Formalités portuaires complètes", "Suivi AIS en temps réel"]
  },
  {
    id: "aerien",
    title: "Aérien",
    slug: "aerien",
    shortDesc: "Fret aérien express et sécurisé pour vos expéditions urgentes.",
    description: "Vitesse, sécurité et ponctualité pour vos marchandises à haute valeur ajoutée ou délais critiques. Connexions quotidiennes avec les hubs internationaux.",
    iconName: "Plane",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    badge: "Express & Prioritaire",
    features: ["Vols directs et réguliers", "Colis à forte valeur", "Contrôle thermique certifié", "Dédouanement prioritaire"]
  },
  {
    id: "routier",
    title: "Routier",
    slug: "routier",
    shortDesc: "Réseau de transport terrestre pour l'acheminement intérieur et transfrontalier.",
    description: "Flotte moderne de camions équipés de télématique de pointe. Acheminement du port ou aéroport directement vers vos entrepôts ou points de vente.",
    iconName: "Truck",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80",
    badge: "Door-to-Door",
    features: ["Camions tautliner & frigorifiques", "Convois sécurisés", "Livraison du dernier kilomètre", "Géolocalisation GPS en direct"]
  },
  {
    id: "conteneurs",
    title: "Conteneurs",
    slug: "conteneurs",
    shortDesc: "Gestion intégrale de parcs de conteneurs standards, dry, reefer et open-top.",
    description: "Location, empotage, dépotage et gestion logistique de conteneurs maritimes. Solutions adaptées aux vracs, marchandises périssables ou hors gabarit.",
    iconName: "Boxes",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    badge: "Solutions FCL",
    features: ["Conteneurs réfrigérés (Reefer)", "Dry 20' & 40' High Cube", "Inspections techniques", "Entreposage sécurisé"]
  },
  {
    id: "colis-fret",
    title: "Colis & Fret",
    slug: "colis-fret",
    shortDesc: "Envois express de paquets commerciaux et consolidation de petits volumes.",
    description: "Prise en charge rapide de vos plis, colis commerciaux et marchandises intermédiaires avec un suivi étape par étape et notification automatisée.",
    iconName: "PackageCheck",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
    badge: "Messagerie Pro",
    features: ["Emballage sur mesure", "Assurance tous risques", "Notification par SMS & Email", "Enlèvement sur site"]
  },
  {
    id: "import-export",
    title: "Import / Export",
    slug: "import-export",
    shortDesc: "Dédouanement, conformité documentaire et conseil douanier expert.",
    description: "Accompagnement expert dans toutes vos démarches réglementaires transfrontalières : déclarations en douane, licences d'importation et certificats d'origine.",
    iconName: "FileCheck2",
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=80",
    badge: "Conseil & Douane",
    features: ["Déclarations douanières simplifiées", "Gestion des accises et taxes", "Certificats de conformité", "Audit logistique"]
  }
];
