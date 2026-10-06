export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "client" | "admin";
  company: string;
  phone: string;
  country: string;
  totalShipments: number;
  activeShipments: number;
  memberSince: string;
  status: "Actif" | "Suspendu" | "En attente";
}

export const currentUserClient: UserProfile = {
  id: "usr-001",
  name: "Jean Dupont",
  email: "jean.dupont@email.com",
  role: "client",
  company: "Société Camerounaise d'Importation SARL",
  phone: "+237 699 12 34 56",
  country: "Cameroun",
  totalShipments: 2,
  activeShipments: 1,
  memberSince: "15 Janvier 2024",
  status: "Actif"
};

export const currentUserAdmin: UserProfile = {
  id: "adm-001",
  name: "Administrateur Central",
  email: "admin@translogix.com",
  role: "admin",
  company: "TransLogix Head Office",
  phone: "+33 1 42 68 55 00",
  country: "France",
  totalShipments: 5,
  activeShipments: 3,
  memberSince: "01 Janvier 2023",
  status: "Actif"
};

export const clientsData: UserProfile[] = [
  currentUserClient,
  {
    id: "usr-002",
    name: "Afriq BTP SARL",
    email: "contact@afriqbtp.ci",
    role: "client",
    company: "Afriq BTP Travaux Publics",
    phone: "+225 07 88 99 00 11",
    country: "Côte d'Ivoire",
    totalShipments: 4,
    activeShipments: 1,
    memberSince: "03 Février 2024",
    status: "Actif"
  },
  {
    id: "usr-003",
    name: "Sahel Distribution",
    email: "sahel@distribution.ne",
    role: "client",
    company: "Groupe Sahel Négoce",
    phone: "+227 90 12 34 56",
    country: "Niger",
    totalShipments: 7,
    activeShipments: 1,
    memberSince: "12 Novembre 2023",
    status: "Actif"
  },
  {
    id: "usr-004",
    name: "Sénégal Agro Services",
    email: "contact@senegalagro.sn",
    role: "client",
    company: "Sénégal Agro Import",
    phone: "+221 77 456 78 90",
    country: "Sénégal",
    totalShipments: 11,
    activeShipments: 2,
    memberSince: "20 Septembre 2023",
    status: "Actif"
  },
  {
    id: "usr-005",
    name: "Marie Martin",
    email: "marie@email.com",
    role: "client",
    company: "Martin Logistique & Co",
    phone: "+33 6 12 34 56 78",
    country: "France",
    totalShipments: 1,
    activeShipments: 0,
    memberSince: "05 Avril 2025",
    status: "En attente"
  }
];
