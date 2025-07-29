export type User = {
  id: string
  nom: string
  prenom: string
  email: string
  telephone: string
  commune: string
}

export type Demande = {
  id: string
  userId: string
  type: string
  reference: string
  status: "En cours" | "Traitée" | "Rejetée"
  date: string
  documents?: Document[]
  action?: string
}

export type Document = {
  id: string
  name: string
  url: string
  type: string
}

export type Message = {
  id: string
  userId: string
  title: string
  content: string
  date: string
  read: boolean
}

export type Service = {
  id: string
  title: string
  description: string
  category: "etat-civil" | "urbanisme" | "education" | "environnement"
  duree: string
  conditions: string[]
  documents: string[]
}

export type Notification = {
  id: string
  userId: string
  title: string
  content: string
  date: string
  read: boolean
  type: "info" | "warning" | "success" | "error"
}

export type Appointment = {
  id: string
  userId: string
  title: string
  description?: string
  date: string
  time: string
  location?: string
  status: "scheduled" | "completed" | "cancelled"
}
