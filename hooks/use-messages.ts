"use client"

import { useState, useEffect } from "react"
import { MessageService } from "@/lib/services/message-service"
import type { Message } from "@/lib/types"
import { useApp } from "@/providers/app-provider"

const messageService = new MessageService()

export function useMessages() {
  const { user } = useApp()
  const [messages, setMessages] = useState<Message[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMessages = async () => {
      if (!user) return

      setIsLoading(true)
      setError(null)
      try {
        const userMessages = await messageService.getAllMessages(user.id)
        setMessages(userMessages)

        const count = await messageService.getUnreadCount(user.id)
        setUnreadCount(count)
      } catch (err) {
        setError("Erreur lors de la récupération des messages")
      } finally {
        setIsLoading(false)
      }
    }

    fetchMessages()
  }, [user])

  const getMessage = async (messageId: string) => {
    if (!user) return null

    setIsLoading(true)
    setError(null)
    try {
      const message = await messageService.getMessageById(user.id, messageId)
      return message
    } catch (err) {
      setError("Erreur lors de la récupération du message")
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const markAsRead = async (messageId: string) => {
    if (!user) return null

    setIsLoading(true)
    setError(null)
    try {
      const updatedMessage = await messageService.markAsRead(user.id, messageId)
      if (updatedMessage) {
        setMessages((prev) => prev.map((m) => (m.id === messageId ? updatedMessage : m)))
        setUnreadCount((prev) => Math.max(0, prev - 1))
      }
      return updatedMessage
    } catch (err) {
      setError("Erreur lors du marquage du message comme lu")
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const sendMessage = async (message: Omit<Message, "id" | "date" | "read">) => {
    setIsLoading(true)
    setError(null)
    try {
      const newMessage = await messageService.sendMessage(message)
      return newMessage
    } catch (err) {
      setError("Erreur lors de l'envoi du message")
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    messages,
    unreadCount,
    isLoading,
    error,
    getMessage,
    markAsRead,
    sendMessage,
  }
}
