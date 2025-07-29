"use client"

import { useState, useEffect } from "react"
import { AppointmentService } from "@/lib/services/appointment-service"
import type { Appointment } from "@/lib/types"
import { useApp } from "@/providers/app-provider"

const appointmentService = new AppointmentService()

export function useAppointments() {
  const { user } = useApp()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user) return

      setIsLoading(true)
      setError(null)
      try {
        const userAppointments = await appointmentService.getAllAppointments(user.id)
        setAppointments(userAppointments)

        const upcoming = await appointmentService.getUpcomingAppointments(user.id)
        setUpcomingAppointments(upcoming)
      } catch (err) {
        setError("Erreur lors de la récupération des rendez-vous")
      } finally {
        setIsLoading(false)
      }
    }

    fetchAppointments()
  }, [user])

  const getAppointment = async (appointmentId: string) => {
    if (!user) return null

    setIsLoading(true)
    setError(null)
    try {
      const appointment = await appointmentService.getAppointmentById(user.id, appointmentId)
      return appointment
    } catch (err) {
      setError("Erreur lors de la récupération du rendez-vous")
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const createAppointment = async (appointment: Omit<Appointment, "id">) => {
    setIsLoading(true)
    setError(null)
    try {
      const newAppointment = await appointmentService.createAppointment(appointment)
      if (appointment.userId === user?.id) {
        setAppointments((prev) => [...prev, newAppointment])
        if (newAppointment.status === "scheduled") {
          setUpcomingAppointments((prev) => [...prev, newAppointment])
        }
      }
      return newAppointment
    } catch (err) {
      setError("Erreur lors de la création du rendez-vous")
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const updateAppointmentStatus = async (appointmentId: string, status: Appointment["status"]) => {
    if (!user) return null

    setIsLoading(true)
    setError(null)
    try {
      const updatedAppointment = await appointmentService.updateAppointmentStatus(user.id, appointmentId, status)
      if (updatedAppointment) {
        setAppointments((prev) => prev.map((a) => (a.id === appointmentId ? updatedAppointment : a)))

        if (status !== "scheduled") {
          setUpcomingAppointments((prev) => prev.filter((a) => a.id !== appointmentId))
        } else {
          const isInUpcoming = upcomingAppointments.some((a) => a.id === appointmentId)
          if (!isInUpcoming) {
            setUpcomingAppointments((prev) => [...prev, updatedAppointment])
          } else {
            setUpcomingAppointments((prev) => prev.map((a) => (a.id === appointmentId ? updatedAppointment : a)))
          }
        }
      }
      return updatedAppointment
    } catch (err) {
      setError("Erreur lors de la mise à jour du statut du rendez-vous")
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    appointments,
    upcomingAppointments,
    isLoading,
    error,
    getAppointment,
    createAppointment,
    updateAppointmentStatus,
  }
}
