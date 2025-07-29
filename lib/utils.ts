import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const [day, month, year] = dateString.split("/").map(Number)
  const date = new Date(year, month - 1, day)

  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date)
}

export function formatDateTime(dateString: string, timeString: string): string {
  const [day, month, year] = dateString.split("/").map(Number)
  const [hours, minutes] = timeString.split(":").map(Number)

  const date = new Date(year, month - 1, day, hours, minutes)

  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date)
}

export function generateReference(type: string, index: number): string {
  const prefix = type.substring(0, 2).toUpperCase()
  const year = new Date().getFullYear()

  return `${prefix}-${year}-${String(index).padStart(3, "0")}`
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text

  return text.substring(0, maxLength) + "..."
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "En cours":
      return "bg-blue-100 text-blue-800"
    case "Traitée":
      return "bg-green-100 text-green-800"
    case "Rejetée":
      return "bg-red-100 text-red-800"
    case "scheduled":
      return "bg-blue-100 text-blue-800"
    case "completed":
      return "bg-green-100 text-green-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function getStatusBadge(status: string): {
  variant: "default" | "outline" | "secondary" | "destructive"
  label: string
} {
  switch (status) {
    case "En cours":
      return { variant: "outline", label: "En cours" }
    case "Traitée":
      return { variant: "default", label: "Traitée" }
    case "Rejetée":
      return { variant: "destructive", label: "Rejetée" }
    case "scheduled":
      return { variant: "outline", label: "Planifié" }
    case "completed":
      return { variant: "default", label: "Terminé" }
    case "cancelled":
      return { variant: "destructive", label: "Annulé" }
    default:
      return { variant: "secondary", label: status }
  }
}
