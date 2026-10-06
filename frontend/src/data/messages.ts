export interface ContactMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  phone?: string;
  subject: string;
  message: string;
  date: string;
  time: string;
  read: boolean;
  archived: boolean;
  replied: boolean;
}

export const initialMessages: ContactMessage[] = [
  {
    id: "msg-001",
    senderName: "Marie Martin",
    senderEmail: "marie@email.com",
    phone: "+33 6 12 34 56 78",
    subject: "Demande de cotation fret maritime Shanghai → Douala",
    message: "Bonjour, je souhaiterais obtenir un devis pour une expédition maritime de 2 conteneurs 40 pieds au départ de Shanghai vers Douala, livraison prévue fin mai.",
    date: "18 avr. 2025",
    time: "14:22",
    read: false,
    archived: false,
    replied: false
  },
  {
    id: "msg-002",
    senderName: "Patrick Nganou",
    senderEmail: "p.nganou@groupetransit.cm",
    phone: "+237 677 88 99 00",
    subject: "Partenariat transport routier corridor Douala-Ndjamena",
    message: "Bonjour l'équipe TransLogix. Nous cherchons un partenaire fiable pour assurer le relais logistique sur le corridor Tchad depuis le port de Douala. Pouvons-nous échanger cette semaine ?",
    date: "17 avr. 2025",
    time: "09:40",
    read: true,
    archived: false,
    replied: true
  },
  {
    id: "msg-003",
    senderName: "Sophie Leclerc",
    senderEmail: "sophie.l@agro-nord.fr",
    phone: "+33 1 45 67 89 10",
    subject: "Fret aérien express produits périssables",
    message: "Bonjour, nous avons une cargaison urgente sous température dirigée à expédier vers Abidjan vendredi. Avez-vous de la capacité disponible sur vos vols réguliers ?",
    date: "16 avr. 2025",
    time: "16:15",
    read: true,
    archived: false,
    replied: false
  },
  {
    id: "msg-004",
    senderName: "Ibrahim Traoré",
    senderEmail: "i.traore@mali-import.ml",
    phone: "+223 76 54 32 10",
    subject: "Suivi conteneur en transit Cotonou",
    message: "Bonjour, je sollicite un point d'étape sur le dossier de dédouanement de nos marchandises arrivées au port la semaine dernière. Merci d'avance.",
    date: "14 avr. 2025",
    time: "11:05",
    read: true,
    archived: true,
    replied: true
  }
];
