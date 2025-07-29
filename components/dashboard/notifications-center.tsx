"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Bell, Eye, Trash2, Filter, Calendar, User, AlertTriangle, FileText } from "lucide-react"

interface Notification {
  id: string
  type: string
  title: string
  description: string
  date: string
  time: string
  status: "nouveau" | "lu" | "traité"
  priority: "haute" | "normale" | "basse"
  details: {
    demandeur: string
    service: string
    reference: string
    documents: string[]
    commentaire: string
  }
}

interface ConfirmDeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
}

function ConfirmDeleteModal({ isOpen, onClose, onConfirm, title }: ConfirmDeleteModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <DialogHeader className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <DialogTitle className="text-xl font-semibold text-gray-900 mb-2">Confirmer la suppression</DialogTitle>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer cette notification ?
              <br />
              <span className="font-medium">"{title}"</span>
            </p>
          </DialogHeader>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent"
            >
              Annuler
            </Button>
            <Button onClick={onConfirm} className="flex-1 bg-red-600 hover:bg-red-700 text-white">
              Supprimer
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}

interface NotificationDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  notification: Notification | null
}

function NotificationDetailsModal({ isOpen, onClose, notification }: NotificationDetailsModalProps) {
  if (!notification) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <DialogHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white -m-6 mb-6 p-6 rounded-t-lg">
            <DialogTitle className="text-lg">Détails de la notification</DialogTitle>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                {notification.type}
              </Badge>
              <Badge
                className={`${
                  notification.priority === "haute"
                    ? "bg-red-500"
                    : notification.priority === "normale"
                      ? "bg-blue-500"
                      : "bg-gray-500"
                } text-white`}
              >
                {notification.priority}
              </Badge>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">{notification.title}</h3>
              <p className="text-gray-600 mb-4">{notification.description}</p>
              <div className="text-sm text-gray-500">
                {notification.date} à {notification.time}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Demandeur
                </h4>
                <p className="text-gray-700">{notification.details.demandeur}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Service demandé</h4>
                <p className="text-gray-700">{notification.details.service}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Référence</h4>
                <p className="text-gray-700 font-mono text-sm">{notification.details.reference}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Documents joints
                </h4>
                <div className="space-y-1">
                  {notification.details.documents.map((doc, index) => (
                    <p key={index} className="text-gray-700 text-sm">
                      • {doc}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {notification.details.commentaire && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Commentaire</h4>
                <p className="text-blue-800">{notification.details.commentaire}</p>
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-8">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Fermer
            </Button>
            <Button className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
              Marquer comme traité
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}

export default function NotificationCenter() {
  const [filterType, setFilterType] = useState("all")
  const [filterDate, setFilterDate] = useState("all")
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; notification: Notification | null }>({
    isOpen: false,
    notification: null,
  })
  const [detailsModal, setDetailsModal] = useState<{ isOpen: boolean; notification: Notification | null }>({
    isOpen: false,
    notification: null,
  })

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "Demande citoyenne",
      title: "Nouvelle demande de célébration de mariage",
      description: "Demande reçue pour le 8/01/25",
      date: "16/01/25",
      time: "09:42",
      status: "nouveau",
      priority: "normale",
      details: {
        demandeur: "Jean Dupont & Marie Martin",
        service: "Célébration de mariage",
        reference: "MAR-2025-001",
        documents: ["CNI des conjoints", "Certificat de célibat", "Acte de naissance"],
        commentaire: "Demande urgente pour célébration le 8 janvier 2025",
      },
    },
    {
      id: "2",
      type: "Demande citoyenne",
      title: "Un document a été ajouté à la demande #2025-00034",
      description: "(preuve de résidence)",
      date: "16/01/25",
      time: "09:42",
      status: "nouveau",
      priority: "haute",
      details: {
        demandeur: "Pierre Kouassi",
        service: "Certificat de résidence",
        reference: "RES-2025-034",
        documents: ["Facture d'électricité", "Contrat de bail"],
        commentaire: "Document manquant ajouté - dossier complet",
      },
    },
    {
      id: "3",
      type: "Demande citoyenne",
      title: "Nouvelle demande reçue pour le 20/07/25 à 16h00",
      description: "Service: Acte de naissance",
      date: "14/01/25",
      time: "14:12",
      status: "lu",
      priority: "normale",
      details: {
        demandeur: "Aya Traoré",
        service: "Acte de naissance",
        reference: "ACT-2025-078",
        documents: ["Déclaration de naissance", "CNI des parents"],
        commentaire: "Première demande d'acte de naissance",
      },
    },
  ])

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, status: "lu" } : notif)))
  }

  const openDeleteModal = (notification: Notification) => {
    setDeleteModal({ isOpen: true, notification })
  }

  const confirmDelete = () => {
    if (deleteModal.notification) {
      setNotifications(notifications.filter((notif) => notif.id !== deleteModal.notification!.id))
    }
    setDeleteModal({ isOpen: false, notification: null })
  }

  const openDetailsModal = (notification: Notification) => {
    setDetailsModal({ isOpen: true, notification })
    markAsRead(notification.id)
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, status: "lu" })))
  }

  const filteredNotifications = notifications.filter((notif) => {
    if (filterType !== "all" && notif.type !== filterType) return false
    return true
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "nouveau":
        return "bg-blue-500"
      case "lu":
        return "bg-gray-400"
      case "traité":
        return "bg-green-500"
      default:
        return "bg-gray-400"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "haute":
        return "border-l-red-500"
      case "normale":
        return "border-l-blue-500"
      case "basse":
        return "border-l-gray-400"
      default:
        return "border-l-gray-400"
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6">
      <motion.div variants={itemVariants}>
        <Card className=" border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Bell className="w-5 h-5" />
                Centre de Notifications
              </CardTitle>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={markAllAsRead}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                >
                  Marquer tout comme lu
                </Button>
              </motion.div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrer par type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    <SelectItem value="Demande citoyenne">Demande citoyenne</SelectItem>
                    <SelectItem value="Système">Système</SelectItem>
                    <SelectItem value="Urgence">Urgence</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <Select value={filterDate} onValueChange={setFilterDate}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrer par date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les dates</SelectItem>
                    <SelectItem value="today">Aujourd'hui</SelectItem>
                    <SelectItem value="week">Cette semaine</SelectItem>
                    <SelectItem value="month">Ce mois</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-4">
              <AnimatePresence>
                {filteredNotifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`bg-white rounded-lg border-l-4 ${getPriorityColor(notification.priority)} shadow-sm hover:shadow-md transition-shadow p-4 cursor-pointer`}
                    onClick={() => openDetailsModal(notification)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-gray-500" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {notification.type}
                            </Badge>
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(notification.status)}`} />
                          </div>
                          <h4 className="font-medium text-gray-900 mb-1">{notification.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{notification.description}</p>
                          <div className="text-xs text-gray-500">
                            {notification.date} - {notification.time}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4" onClick={(e) => e.stopPropagation()}>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openDetailsModal(notification)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Voir les détails"
                        >
                          <Eye className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openDeleteModal(notification)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredNotifications.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <Bell className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-500 mb-2">Aucune notification</h3>
                <p className="text-gray-400">Toutes les notifications ont été traitées</p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, notification: null })}
        onConfirm={confirmDelete}
        title={deleteModal.notification?.title || ""}
      />

      {/* Notification Details Modal */}
      <NotificationDetailsModal
        isOpen={detailsModal.isOpen}
        onClose={() => setDetailsModal({ isOpen: false, notification: null })}
        notification={detailsModal.notification}
      />
    </motion.div>
  )
}
