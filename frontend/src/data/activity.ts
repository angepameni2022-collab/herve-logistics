export interface ActivityLogItem {
  id: string;
  date: string;
  time: string;
  user: string;
  action: "Création" | "Modification" | "Suppression" | "Notification" | "Connexion";
  target: string;
  details: string;
}

export const initialActivityLogs: ActivityLogItem[] = [
  {
    id: "act-1",
    date: "18/04/2025",
    time: "10:15",
    user: "Admin",
    action: "Modification",
    target: "TL-2025-000123",
    details: "Mise à jour du statut en transit (Position Océan Indien)"
  },
  {
    id: "act-2",
    date: "18/04/2025",
    time: "09:30",
    user: "Admin",
    action: "Création",
    target: "TL-2025-000127",
    details: "Création nouvel envoi Reefer Rotterdam → Dakar"
  },
  {
    id: "act-3",
    date: "17/04/2025",
    time: "16:45",
    user: "SuperAdmin",
    action: "Notification",
    target: "jean.dupont@email.com",
    details: "Envoi automatique d'alerte ETA pour TL-2025-000123"
  },
  {
    id: "act-4",
    date: "17/04/2025",
    time: "11:20",
    user: "Admin",
    action: "Modification",
    target: "CMS Accueil",
    details: "Mise à jour de la bannière CTA et statistiques clés"
  },
  {
    id: "act-5",
    date: "16/04/2025",
    time: "14:10",
    user: "Operateur Douala",
    action: "Modification",
    target: "TL-2025-000124",
    details: "Clôture d'envoi et passage en statut Livré"
  },
  {
    id: "act-6",
    date: "15/04/2025",
    time: "08:50",
    user: "Admin",
    action: "Connexion",
    target: "Session Admin",
    details: "Connexion sécurisée depuis l'adresse IP 192.168.1.42"
  }
];
