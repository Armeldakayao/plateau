import { z } from "zod";

// RendezVous Form Schemas
export const rendezVousPersonalSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  telephone: z.string().min(10, "Le numéro de téléphone doit contenir au moins 10 caractères"),
  profession: z.string().optional(),
  institution: z.string().optional(),
  nationalId: z.string().optional(),
});

export const rendezVousMeetingSchema = z.object({
  meetingTarget: z.enum(["Maire", "Adjoint au Maire", "Directeur de Service", "Autre"], {
    required_error: "Veuillez sélectionner une cible de rendez-vous.",
  }),
  otherMeetingTarget: z.string().optional(),
  subject: z.enum(
    ["Urbanisme", "Demande d’appui administratif", "Projet entrepreneurial", "Question foncière", "Partenariat public-privé", "Réclamation citoyenne", "Autre"],
    { required_error: "Veuillez sélectionner un sujet principal." }
  ),
  otherSubject: z.string().optional(),
  preferredSlot1: z.string().min(1, "Ce créneau est requis"),
  preferredSlot2: z.string().min(1, "Ce créneau est requis"),
  preferredSlot3: z.string().min(1, "Ce créneau est requis"),
  meetingType: z.enum(["En présentiel à la mairie", "En visioconférence (Zoom/Google Meet)", "Par téléphone"], {
    required_error: "Veuillez sélectionner un type de rendez-vous.",
  }),
});

export const rendezVousValidationSchema = z.object({
  certifyAccuracy: z.boolean().refine((val) => val === true, {
    message: "Vous devez certifier l'exactitude des informations.",
  }),
  authorizeContact: z.boolean().refine((val) => val === true, {
    message: "Vous devez autoriser la mairie à vous contacter.",
  }),
});

export type RendezVousFormValues = z.infer<typeof rendezVousPersonalSchema> &
  z.infer<typeof rendezVousMeetingSchema> &
  z.infer<typeof rendezVousValidationSchema>;

// Partenariat Form Schemas
export const partenariatOrganizationSchema = z.object({
  organizationName: z.string().min(2, "Le nom de l'organisation est requis"),
  organizationType: z.enum(["Entreprise privée", "ONG / Association", "Institution publique", "Organisation internationale", "Autre"], {
    required_error: "Veuillez sélectionner un type de structure.",
  }),
  otherOrganizationType: z.string().optional(),
  activitySector: z.enum(["Urbanisme / Habitat", "Santé / Bien-être", "Éducation / Formation", "Environnement / Énergie", "Digital / Innovation", "Culture / Tourisme", "Inclusion sociale", "Autre"], {
    required_error: "Veuillez sélectionner un secteur d'activité.",
  }),
  otherActivitySector: z.string().optional(),
  originCountry: z.string().min(2, "Le pays d'origine est requis"),
  originCity: z.string().min(2, "La ville d'origine est requise"),
  creationYear: z.string().min(4, "L'année de création est requise"),
  website: z.string().url("URL invalide").optional().or(z.literal("")),
});

export const partenariatContactSchema = z.object({
  contactName: z.string().min(2, "Le nom du responsable est requis"),
  contactFunction: z.string().min(2, "La fonction du responsable est requise"),
  contactPhone: z.string().min(10, "Le numéro de téléphone est requis"),
  contactEmail: z.string().email("Email professionnel invalide"),
});

export const partenariatDetailsSchema = z.object({
  partnershipNature: z.enum(["Partenariat financier (sponsoring, mécénat…)", "Partenariat technique (expertise, outils, technologie…)", "Partenariat opérationnel (événement, projet terrain…)", "Coopération institutionnelle", "Appui logistique ou matériel", "Autre"], {
    required_error: "Veuillez sélectionner la nature du partenariat.",
  }),
  otherPartnershipNature: z.string().optional(),
  concernedService: z.enum(["État civil", "Tourisme", "Environnement", "Éducation", "Communication", "Smart City"], {
    required_error: "Veuillez sélectionner un service concerné.",
  }),
  proposalDescription: z.string().min(10, "La description est trop courte").max(800, "La description est trop longue"),
  mairieObjectives: z.string().min(10, "Les objectifs pour la mairie sont requis"),
  structureObjectives: z.string().min(10, "Les objectifs pour votre structure sont requis"),
});

export const partenariatCalendarSchema = z.object({
  partnershipDuration: z.enum(["Ponctuel (événement ou action spécifique)", "Sur 6 mois", "Sur 12 mois", "Pluriannuel", "À discuter"], {
    required_error: "Veuillez sélectionner une durée de partenariat.",
  }),
  startDate: z.string().min(1, "La date de démarrage est requise"),
});

export const partenariatValidationSchema = z.object({
  certifyAccuracy: z.boolean().refine((val) => val === true, {
    message: "Vous devez certifier l'exactitude des informations.",
  }),
  authorizeContact: z.boolean().refine((val) => val === true, {
    message: "Vous devez autoriser la mairie à vous contacter.",
  }),
  acknowledgeNoValidation: z.boolean().refine((val) => val === true, {
    message: "Vous devez prendre connaissance de cette clause.",
  }),
});

export type PartenariatFormValues = z.infer<typeof partenariatOrganizationSchema> &
  z.infer<typeof partenariatContactSchema> &
  z.infer<typeof partenariatDetailsSchema> &
  z.infer<typeof partenariatCalendarSchema> &
  z.infer<typeof partenariatValidationSchema>;

// Mariage Form Schemas
export const conjointSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  dob: z.string().min(1, "La date de naissance est requise"),
  pob: z.string().min(1, "Le lieu de naissance est requis"),
  nationality: z.string().min(1, "La nationalité est requise"),
  profession: z.string().min(1, "La profession est requise"),
  address: z.string().min(5, "L'adresse est requise"),
  phone: z.string().min(10, "Le numéro de téléphone est requis"),
  email: z.string().email("Email invalide"),
  idNumber: z.string().min(1, "Le numéro CNI/Passeport est requis"),
  maritalStatus: z.enum(["Célibataire", "Marié(e)", "Divorcé(e)", "Veuf(ve)"], {
    required_error: "Veuillez sélectionner une situation matrimoniale.",
  }),
});

export const mariageCelebrationSchema = z.object({
  marriageType: z.enum(["Mariage civil uniquement", "Mariage civil + cérémonie (avec décoration, invités…)"], {
    required_error: "Veuillez sélectionner un type de mariage.",
  }),
  guestEstimate: z.enum(["Moins de 20", "Entre 20 et 50", "Plus de 50"], {
    required_error: "Veuillez estimer le nombre d'invités.",
  }),
  celebrationLanguage: z.enum(["Français", "Anglais", "Autre (à préciser)"], {
    required_error: "Veuillez sélectionner une langue de célébration.",
  }),
  otherCelebrationLanguage: z.string().optional(),
});

export const mariageDatesRoomSchema = z.object({
  date1: z.string().min(1, "La première date est requise"),
  time1: z.string().min(1, "La première heure est requise"),
  date2: z.string().min(1, "La deuxième date est requise"),
  time2: z.string().min(1, "La deuxième heure est requise"),
  date3: z.string().min(1, "La troisième date est requise"),
  time3: z.string().min(1, "La troisième heure est requise"),
  reserveRoom: z.boolean(),
  roomType: z.enum(["Salle standard", "Salle prestige (décoration, fleurs, sono)", "Salle extérieure couverte"]).optional(),
  photoSpace: z.boolean(),
});

export const mariagePaymentValidationSchema = z.object({
  onlinePayment: z.boolean(),
  certifyAccuracy: z.boolean().refine((val) => val === true, {
    message: "Vous devez certifier l'exactitude des informations.",
  }),
  authorizeContact: z.boolean().refine((val) => val === true, {
    message: "Vous devez autoriser la mairie à vous contacter.",
  }),
});

export type MariageFormValues = {
  conjoint1: z.infer<typeof conjointSchema>;
  conjoint2: z.infer<typeof conjointSchema>;
} & z.infer<typeof mariageCelebrationSchema> &
  z.infer<typeof mariageDatesRoomSchema> &
  z.infer<typeof mariagePaymentValidationSchema>;
