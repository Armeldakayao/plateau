import { Demande } from "./types/demande";


export const initialDemandes: Demande[] = [
  {
    id: "1",
    type: "Certificat de résidence",
    numero: "LMJ-5-007",
    statut: "Terminé",
    dateEnvoi: "2024-05-20",
    dateLimite: "2024-05-27",
    description: "Demande de certificat de résidence pour démarches administratives",
    attachmentsCount: 5,
    details:
      "Cette demande concerne l'obtention d'un certificat de résidence pour des démarches administratives courantes. Le dossier a été completé et approuvé par les autorités compétentes. Le document est disponible pour retrait.",
  },
  {
    id: "2",
    type: "Carte de commerçant",
    numero: "JAH-6-022",
    statut: "En cours",
    dateEnvoi: "2024-04-12",
    dateLimite: "2024-04-19",
    description: "Demande de carte de commerçant pour activité commerciale",
    attachmentsCount: 3,
    details:
      "Le dossier pour la carte de commerçant est en cours de traitement. Une vérification des antécédents commerciaux est actuellement effectuée. Vous serez notifié dès que le statut changera.",
  },
  {
    id: "3",
    type: "Autorisation de domicile",
    numero: "DOM-3-015",
    statut: "En attente",
    dateEnvoi: "2024-03-15",
    dateLimite: "2024-03-22",
    description: "Autorisation de domicile pour nouvelle adresse",
    attachmentsCount: 2,
    details:
      "Votre demande d'autorisation de domicile est en attente de validation par le service d'urbanisme. Des documents supplémentaires pourraient être requis si des informations sont manquantes.",
  },
  {
    id: "4",
    type: "Extrait de naissance",
    numero: "NAI-2-008",
    statut: "Rejeté",
    dateEnvoi: "2024-02-08",
    dateLimite: "2024-02-15",
    description: "Demande d'extrait de naissance certifié",
    attachmentsCount: 1,
    details:
      "La demande d'extrait de naissance a été rejetée en raison d'informations incohérentes. Veuillez vérifier les données soumises et soumettre une nouvelle demande avec les corrections nécessaires.",
  },
  {
    id: "5",
    type: "Certificat de mariage",
    numero: "MAR-1-001",
    statut: "Terminé",
    dateEnvoi: "2024-01-01",
    dateLimite: "2024-01-08",
    description: "Demande de certificat de mariage pour mariage civil",
    attachmentsCount: 4,
    details:
      "Le certificat de mariage a été délivré et est prêt à être retiré. Toutes les formalités ont été accomplies avec succès.",
  },
  {
    id: "6",
    type: "Certificat de mariage",
    numero: "MAR-1-002",
    statut: "Terminé",
    dateEnvoi: "2024-01-10",
    dateLimite: "2024-01-17",
    description: "Demande de certificat de mariage pour mariage civil",
    attachmentsCount: 3,
    details:
      "Le certificat de mariage a été délivré et est prêt à être retiré. Toutes les formalités ont été accomplies avec succès.",
  },
  {
    id: "7",
    type: "Certificat de résidence",
    numero: "RES-7-001",
    statut: "En cours",
    dateEnvoi: "2024-06-01",
    dateLimite: "2024-06-08",
    description: "Renouvellement de certificat de résidence",
    attachmentsCount: 2,
    details:
      "Votre demande de renouvellement de certificat de résidence est en cours d'examen. Une mise à jour vous sera fournie dans les prochains jours.",
  },
  {
    id: "8",
    type: "Autorisation de construire",
    numero: "CON-8-001",
    statut: "En attente",
    dateEnvoi: "2024-06-05",
    dateLimite: "2024-06-12",
    description: "Demande d'autorisation de construire une extension",
    attachmentsCount: 6,
    details:
      "La demande d'autorisation de construire est en attente de l'avis du service d'urbanisme. Des inspections sur site pourraient être nécessaires.",
  },
  {
    id: "9",
    type: "Permis de conduire",
    numero: "PER-9-001",
    statut: "Terminé",
    dateEnvoi: "2024-05-25",
    dateLimite: "2024-06-01",
    description: "Renouvellement de permis de conduire",
    attachmentsCount: 3,
    details:
      "Votre permis de conduire a été renouvelé et est disponible pour retrait. Veuillez vous présenter au guichet avec votre pièce d'identité.",
  },
  {
    id: "10",
    type: "Déclaration de naissance",
    numero: "DEC-10-001",
    statut: "En cours",
    dateEnvoi: "2024-06-15",
    dateLimite: "2024-06-22",
    description: "Déclaration de naissance d'un enfant",
    attachmentsCount: 2,
    details:
      "La déclaration de naissance est en cours de validation. Le livret de famille sera mis à jour une fois le processus terminé.",
  },
]
