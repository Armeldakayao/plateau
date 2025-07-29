"use client"

import { useState, useEffect } from "react"
import { ServiceService } from "@/lib/services/service-service"
import type { Service } from "@/lib/types"

const serviceService = new ServiceService()

export function useServices() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const allServices = await serviceService.getAllServices()
        setServices(allServices)
      } catch (err) {
        setError("Erreur lors de la récupération des services")
      } finally {
        setIsLoading(false)
      }
    }

    fetchServices()
  }, [])

  const getService = async (serviceId: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const service = await serviceService.getServiceById(serviceId)
      return service
    } catch (err) {
      setError("Erreur lors de la récupération du service")
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const getServicesByCategory = async (category: Service["category"]) => {
    setIsLoading(true)
    setError(null)
    try {
      const categoryServices = await serviceService.getServicesByCategory(category)
      return categoryServices
    } catch (err) {
      setError("Erreur lors de la récupération des services par catégorie")
      return []
    } finally {
      setIsLoading(false)
    }
  }

  return {
    services,
    isLoading,
    error,
    getService,
    getServicesByCategory,
  }
}
