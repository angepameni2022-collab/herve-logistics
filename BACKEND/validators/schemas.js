const { z } = require("zod");

const connexionSchema = z.object({
  email: z.string().trim().email("Format d'email invalide").max(150),
  mot_de_passe: z.string().min(1, "Le mot de passe est obligatoire").max(100)
});

const clientCreateSchema = z.object({
  nom: z.string().trim().min(2, "Le nom est trop court").max(100),
  email: z.string().trim().email("Format d'email invalide").max(150),
  mot_de_passe: z.string().min(6, "Le mot de passe doit comporter au moins 6 caractères").max(100),
  role: z.enum(["client", "admin"]).default("client")
});

const colisCreateSchema = z.object({
  client_id: z.number().int().positive(),
  tracking: z.string().trim().min(3).max(50),
  navire: z.string().trim().min(1).max(100).default("Hervé Carrier I"),
  mode: z.string().trim().default("Maritime"),
  etat: z.string().trim().default("En transit"),
  position: z.string().trim().default("En mer"),
  eta: z.string().trim().default("15 mai 2026"),
  depart_nom: z.string().trim().min(1).max(100),
  depart_lat: z.number().min(-90).max(90),
  depart_lng: z.number().min(-180).max(180),
  arrivee_nom: z.string().trim().min(1).max(100),
  arrivee_lat: z.number().min(-90).max(90),
  arrivee_lng: z.number().min(-180).max(180),
  actuelle_lat: z.number().min(-90).max(90),
  actuelle_lng: z.number().min(-180).max(180),
  vitesse: z.number().min(0).max(150).nullable().optional(),
  heures_ecoulees: z.number().min(0).default(0),
  nb_colis: z.number().int().min(1).default(1),
  type: z.string().trim().default("Conteneur 40' HC"),
  conteneur: z.string().trim().max(50).default("MSKU-7894210")
});

const colisPatchSchema = z.object({
  etat: z.string().trim().max(100).optional(),
  position: z.string().trim().max(150).optional(),
  actuelle_lat: z.number().min(-90).max(90).optional(),
  actuelle_lng: z.number().min(-180).max(180).optional(),
  vitesse: z.number().min(0).max(150).nullable().optional(),
  navire: z.string().trim().max(100).optional(),
  eta: z.string().trim().max(100).optional(),
  heures_ecoulees: z.number().min(0).optional()
});

const evenementCreateSchema = z.object({
  titre: z.string().trim().min(2, "Le titre est obligatoire").max(200),
  date: z.string().trim().min(2, "La date est obligatoire").max(100)
});

module.exports = {
  connexionSchema,
  clientCreateSchema,
  colisCreateSchema,
  colisPatchSchema,
  evenementCreateSchema
};
