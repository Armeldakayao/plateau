"use client"

import { useState, useEffect } from "react"
import { DemandeService } from "@/lib/services/demande-service"
import type { Demande } from "@/lib/types"
import { useApp } from "@/providers/app-provider"

const demandeService = new DemandeService()

export function useDemandes() {
  const { user } = useApp()
  const [demandes, setDemandes] = useState<Demande[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDemandes = async () => {
      if (!user) return

      setIsLoading(true)
      setError(null)
      try {
        const userDemandes = await demandeService.getAllDemandes(user.id)
        setDemandes(userDemandes)
      } catch (err) {
        setError("Erreur lors de la récupération des demandes")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDemandes()
  }, [user])

  const getDemande = async (demandeId: string) => {
    if (!user) return null

    setIsLoading(true)
    setError(null)
    try {
      const demande = await demandeService.getDemandeById(user.id, demandeId)
      return demande
    } catch (err) {
      setError("Erreur lors de la récupération de la demande")
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const createDemande = async (demande: Omit<Demande, "id" | "userId" | "reference" | "date" | "status">) => {
    if (!user) return null

    setIsLoading(true)
    setError(null)
    try {
      const newDemande = await demandeService.createDemande(user.id, demande)
      setDemandes((prev) => [...prev, newDemande])
      return newDemande
    } catch (err) {
      setError("Erreur lors de la création de la demande")
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const updateDemandeStatus = async (demandeId: string, status: Demande["status"]) => {
    if (!user) return null

    setIsLoading(true)
    setError(null)
    try {
      const updatedDemande = await demandeService.updateDemandeStatus(user.id, demandeId, status)
      if (updatedDemande) {
        setDemandes((prev) => prev.map((d) => (d.id === demandeId ? updatedDemande : d)))
      }
      return updatedDemande
    } catch (err) {
      setError("Erreur lors de la mise à jour du statut de la demande")
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    demandes,
    isLoading,
    error,
    getDemande,
    createDemande,
    updateDemandeStatus,
  }
}
