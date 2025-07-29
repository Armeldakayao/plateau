"use client"

import { useState, useEffect } from "react"
import { NotificationService } from "@/lib/services/notification-service"
import type { Notification } from "@/lib/types"
import { useApp } from "@/providers/app-provider"

const notificationService = new NotificationService()

export function useNotifications() {
  const { user } = useApp()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user) return

      setIsLoading(true)
      setError(null)
      try {
        const userNotifications = await notificationService.getAllNotifications(user.id)
        setNotifications(userNotifications)

        const count = await notificationService.getUnreadCount(user.id)
        setUnreadCount(count)
      } catch (err) {
        setError("Erreur lors de la récupération des notifications")
      } finally {
        setIsLoading(false)
      }
    }

    fetchNotifications()
  }, [user])

  const markAsRead = async (notificationId: string) => {
    if (!user) return null

    setIsLoading(true)
    setError(null)
    try {
      const updatedNotification = await notificationService.markAsRead(user.id, notificationId)
      if (updatedNotification) {
        setNotifications((prev) => prev.map((n) => (n.id === notificationId ? updatedNotification : n)))
        setUnreadCount((prev) => Math.max(0, prev - 1))
      }
      return updatedNotification
    } catch (err) {
      setError("Erreur lors du marquage de la notification comme lue")
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const createNotification = async (notification: Omit<Notification, "id" | "date">) => {
    setIsLoading(true)
    setError(null)
    try {
      const newNotification = await notificationService.createNotification(notification)
      if (notification.userId === user?.id) {
        setNotifications((prev) => [...prev, newNotification])
        if (!notification.read) {
          setUnreadCount((prev) => prev + 1)
        }
      }
      return newNotification
    } catch (err) {
      setError("Erreur lors de la création de la notification")
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    markAsRead,
    createNotification,
  }
}
