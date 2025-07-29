export const APP_NAME = "Plateforme de Services Municipaux"
export const APP_DESCRIPTION = "Accédez à tous les services en ligne de votre commune"

export const CATEGORIES = [
  {
    id: "etat-civil",
    name: "État civil",
    description: "Actes de naissance, mariage, décès, etc.",
    icon: "User",
  },
  {
    id: "urbanisme",
    name: "Urbanisme",
    description: "Permis de construire, déclarations de travaux, etc.",
    icon: "Landmark",
  },
  {
    id: "education",
    name: "Éducation",
    description: "Inscriptions scolaires, cantine, etc.",
    icon: "School",
  },
  {
    id: "environnement",
    name: "Environnement",
    description: "Collecte des déchets, signalements, etc.",
    icon: "Leaf",
  },
]

export const COMMUNE_INFO = {
  name: "Le Plateau",
  address: "1 Place de l'Hôtel de Ville",
  postalCode: "00000",
  phone: "01 23 45 67 89",
  email: "contact@leplateau.fr",
  website: "www.leplateau.fr",
  hours: {
    weekdays: "9h - 17h",
    saturday: "9h - 12h",
    sunday: "Fermé",
  },
  socialMedia: {
    facebook: "facebook.com/leplateau",
    twitter: "twitter.com/leplateau",
    instagram: "instagram.com/leplateau",
  },
  stats: {
    population: 12500,
    services: 27,
    requests: 3450,
    satisfaction: 98,
  },
}

export const STORAGE_KEYS = {
  USER: "user",
  DEMANDES: "demandes",
  MESSAGES: "messages",
  NOTIFICATIONS: "notifications",
  APPOINTMENTS: "appointments",
}

export const ROUTES = {
  HOME: "/",
  LOGIN: "/connexion",
  REGISTER: "/inscription",
  DASHBOARD: "/dashboard",
  SERVICES: "/services",
  DEMANDES: "/dashboard/demandes",
  MESSAGES: "/dashboard/messages",
  NOTIFICATIONS: "/dashboard/notifications",
  PROFILE: "/dashboard/profil",
  VERIFY_OTP: "/verification-otp",
}
