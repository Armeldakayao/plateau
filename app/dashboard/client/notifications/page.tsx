"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Search, Filter, Trash2, Check, CheckCheck, Calendar, MessageSquare, AlertCircle } from 'lucide-react'
import Sidebar from "@/components/sidebar"

interface Notification {
  id: string
  titre: string
  message: string
  type: "info" | "success" | "warning" | "error"
  date: string
  isRead: boolean
  priority: "low" | "medium" | "high"
}

export default function NotificationsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([])

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      titre: "Demande approuvée",
      message: "Votre demande de certificat de résidence (LMJ-5-007) a été approuvée et est prête pour téléchargement.",
      type: "success",
      date: "28/07/2024 14:30",
      isRead: false,
      priority: "high"
    },
    {
      id: "2",
      titre: "Rendez-vous programmé",
      message: "Votre rendez-vous pour le 12/08/2024 à 14h00 a été confirmé. Merci de vous présenter 15 minutes avant l'heure.",
      type: "info",
      date: "27/07/2024 09:15",
      isRead: false,
      priority: "medium"
    },
    {
      id: "3",
      titre: "Document manquant",
      message: "Il manque un justificatif de domicile pour votre demande JAH-6-022. Veuillez le fournir dans les 48h.",
      type: "warning",
      date: "26/07/2024 16:45",
      isRead: true,
      priority: "high"
    },
    {
      id: "4",
      titre: "Maintenance programmée",
      message: "Une maintenance du système aura lieu le 30/07/2024 de 2h à 4h du matin. Les services seront temporairement indisponibles.",
      type: "info",
      date: "25/07/2024 11:20",
      isRead: true,
      priority: "low"
    },
    {
      id: "5",
      titre: "Invitation assemblée citoyenne",
      message: "Vous êtes invité à participer à l'assemblée citoyenne du 10/08/2024 à 18h à la mairie du Plateau.",
      type: "info",
      date: "24/07/2024 08:00",
      isRead: false,
      priority: "medium"
    },
    {
      id: "6",
      titre: "Demande rejetée",
      message: "Votre demande DOM-3-015 a été rejetée. Motif: Documents non conformes. Vous pouvez faire une nouvelle demande.",
      type: "error",
      date: "23/07/2024 13:10",
      isRead: true,
      priority: "high"
    }
  ])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "success":
        return <Check className="w-4 h-4 text-green-500" />
      case "warning":
        return <AlertCircle className="w-4 h-4 text-orange-500" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <Bell className="w-4 h-4 text-blue-500" />
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "success":
        return <Badge className="bg-green-500 text-white hover:bg-green-500 text-xs">Succès</Badge>
      case "warning":
        return <Badge className="bg-orange-500 text-white hover:bg-orange-500 text-xs">Attention</Badge>
      case "error":
        return <Badge className="bg-red-500 text-white hover:bg-red-500 text-xs">Erreur</Badge>
      default:
        return <Badge className="bg-blue-500 text-white hover:bg-blue-500 text-xs">Info</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="outline" className="border-red-500 text-red-500 text-xs">Haute</Badge>
      case "medium":
        return <Badge variant="outline" className="border-orange-500 text-orange-500 text-xs">Moyenne</Badge>
      default:
        return <Badge variant="outline" className="border-gray-500 text-gray-500 text-xs">Basse</Badge>
    }
  }

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch = notification.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || notification.type === typeFilter
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "read" && notification.isRead) ||
                         (statusFilter === "unread" && !notification.isRead)
    
    return matchesSearch && matchesType && matchesStatus
  })

  const unreadCount = notifications.filter(n => !n.isRead).length

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    )
    console.log(`Notification ${id} marquée comme lue`)
  }

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    )
    console.log("Toutes les notifications marquées comme lues")
  }

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
    console.log(`Notification ${id} supprimée`)
  }

  const handleDeleteSelected = () => {
    setNotifications(prev => prev.filter(notification => !selectedNotifications.includes(notification.id)))
    setSelectedNotifications([])
    console.log("Notifications sélectionnées supprimées")
  }

  const handleSelectNotification = (id: string) => {
    setSelectedNotifications(prev => 
      prev.includes(id) 
        ? prev.filter(notifId => notifId !== id)
        : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([])
    } else {
      setSelectedNotifications(filteredNotifications.map(n => n.id))
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 md:ml-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 md:ml-64 p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
              Notifications
              {unreadCount > 0 && (
                <Badge className="bg-red-500 text-white hover:bg-red-500 ml-3">
                  {unreadCount} non lues
                </Badge>
              )}
            </h1>
           
          </div>
          <div className="flex gap-2">
            {selectedNotifications.length > 0 && (
              <Button
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent transition-colors duration-200"
                onClick={handleDeleteSelected}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Supprimer ({selectedNotifications.length})
              </Button>
            )}
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0}
            >
              <CheckCheck className="w-4 h-4 mr-2" />
              Tout marquer comme lu
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="shadow-sm border-gray-200 mb-6">
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher une notification..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="Filtrer par type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="info">Information</SelectItem>
                  <SelectItem value="success">Succès</SelectItem>
                  <SelectItem value="warning">Attention</SelectItem>
                  <SelectItem value="error">Erreur</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="unread">Non lues</SelectItem>
                  <SelectItem value="read">Lues</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent transition-colors duration-200"
                onClick={handleSelectAll}
              >
                <Filter className="w-4 h-4 mr-2" />
                {selectedNotifications.length === filteredNotifications.length ? "Désélectionner tout" : "Sélectionner tout"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <div className="shadow-none border-none">
          <div className="">
            <div className="text-2xl font-semibold text-gray-900">
              Liste des notifications ({filteredNotifications.length})
            </div>
          </div>
          <div className="p-0 flex flex-col space-y-4 mt-4">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">Aucune notification trouvée</p>
                <p className="text-gray-400 text-sm">Essayez de modifier vos critères de recherche</p>
              </div>
            ) : (
              <div className=" spcace-y-7 gap-7 flex flex-col ">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 md:p-6 border border-primary rounded-lg hover:bg-gray-50 transition-colors duration-200 ${
                      !notification.isRead ? "bg-blue-50/30" : ""
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={selectedNotifications.includes(notification.id)}
                        onChange={() => handleSelectNotification(notification.id)}
                        className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex-shrink-0 mt-1">
                        {getTypeIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className={`font-semibold text-xl text-gray-900 ${!notification.isRead ? "font-bold" : ""}`}>
                              {notification.titre}
                            </h3>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          {/* <div className="flex items-center gap-2 flex-shrink-0">
                            {getTypeBadge(notification.type)}
                            {getPriorityBadge(notification.priority)}
                          </div> */}
                        </div>
                        <p className="text-gray-600 text-md mb-3 leading-relaxed">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-md text-gray-500">
                            <Calendar className="w-3 h-3" />
                            {notification.date}
                          </div>
                          <div className="flex items-center gap-2">
                            {!notification.isRead && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent text-xs transition-colors duration-200"
                                onClick={() => handleMarkAsRead(notification.id)}
                              >
                                <Check className="w-3 h-3 mr-1" />
                                Marquer comme lu
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent text-xs transition-colors duration-200"
                              onClick={() => handleDelete(notification.id)}
                            >
                              <Trash2 className="w-3 h-3 mr-1" />
                              Supprimer
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
