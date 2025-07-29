export interface Demande {
  id: string
  type: string
  numero: string
  statut: string
  dateEnvoi: string
  dateLimite: string
  description: string
  attachmentsCount: number
  details: string // Added for the details page
}
