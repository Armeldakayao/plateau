"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {
  Newspaper,
  Plus,
  Edit,
  Archive,
  Trash2,
  Search,
  FileText,
  ImageIcon,
  Upload,
  X,
  AlertTriangle,
} from "lucide-react"

interface Actualite {
  id: string
  date: string
  title: string
  category: string
  status: "Publié" | "Brouillon" | "Archivé"
  author: string
  resume: string
  content: string
  illustration: File | null
  documents: File[]
}

interface NewActualite {
  title: string
  category: string
  resume: string
  content: string
  illustration: File | null
  documents: File[]
}

interface FileUploadProps {
  onFileSelect: (file: File | null) => void
  selectedFile: File | null
  label: string
  accept?: string
  multiple?: boolean
  onMultipleFileSelect?: (files: File[]) => void
  selectedFiles?: File[]
}

function FileUpload({
  onFileSelect,
  selectedFile,
  label,
  accept = "image/*,.pdf",
  multiple = false,
  onMultipleFileSelect,
  selectedFiles = [],
}: FileUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (multiple && onMultipleFileSelect) {
        onMultipleFileSelect([...selectedFiles, ...acceptedFiles])
      } else if (acceptedFiles.length > 0 && onFileSelect) {
        onFileSelect(acceptedFiles[0])
      }
    },
    [multiple, onMultipleFileSelect, selectedFiles, onFileSelect],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: multiple
      ? {
          "application/pdf": [".pdf"],
          "application/msword": [".doc"],
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
        }
      : {
          "image/*": [".png", ".jpg", ".jpeg"],
          "application/pdf": [".pdf"],
        },
    multiple,
  })

  const removeFile = (index?: number) => {
    if (multiple && onMultipleFileSelect && typeof index === "number") {
      const newFiles = selectedFiles.filter((_, i) => i !== index)
      onMultipleFileSelect(newFiles)
    } else if (onFileSelect) {
      onFileSelect(null)
    }
  }

  const hasFiles = multiple ? selectedFiles.length > 0 : selectedFile !== null

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      {!hasFiles ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
          {isDragActive ? (
            <p className="text-sm text-blue-600">Déposez le(s) fichier(s) ici...</p>
          ) : (
            <div>
              <p className="text-sm text-gray-600 mb-1">
                Glissez-déposez {multiple ? "des fichiers" : "un fichier"} ici
              </p>
              <p className="text-xs text-gray-500">ou cliquez pour sélectionner</p>
              <p className="text-xs text-gray-400 mt-1">
                {multiple ? "PDF, DOC, DOCX (max 5MB chacun)" : "PDF, PNG, JPG (max 5MB)"}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {multiple ? (
            selectedFiles.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-green-200 bg-green-50 rounded-lg p-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-green-800">{file.name}</p>
                      <p className="text-xs text-green-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFile(index)}
                    className="p-1 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))
          ) : selectedFile ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border border-green-200 bg-green-50 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ImageIcon className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-800">{selectedFile.name}</p>
                    <p className="text-xs text-green-600">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeFile()}
                  className="p-1 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ) : null}

          {/* Add more files button for multiple */}
          {multiple && (
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
            >
              <input {...getInputProps()} />
              <Plus className="w-5 h-5 mx-auto text-gray-400 mb-1" />
              <p className="text-xs text-gray-500">Ajouter d'autres fichiers</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
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
              Êtes-vous sûr de vouloir supprimer cette actualité ?
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

export default function ActualitesManager() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingActualite, setEditingActualite] = useState<Actualite | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; actualite: Actualite | null }>({
    isOpen: false,
    actualite: null,
  })

  const [actualites, setActualites] = useState<Actualite[]>([
    {
      id: "1",
      date: "23/01/2025",
      title: "Matinée de l'innovation numérique",
      category: "Événement",
      status: "Publié",
      author: "Admin",
      resume: "Grande matinée dédiée à l'innovation numérique dans notre commune",
      content: "Nous organisons une grande matinée dédiée à l'innovation numérique...",
      illustration: null,
      documents: [],
    },
    {
      id: "2",
      date: "23/01/2025",
      title: "Coupure d'eau prévue le 24/01",
      category: "Alerte citoyenne",
      status: "Brouillon",
      author: "Admin",
      resume: "Interruption temporaire de l'approvisionnement en eau",
      content: "En raison de travaux de maintenance sur le réseau...",
      illustration: null,
      documents: [],
    },
    {
      id: "3",
      date: "23/01/2025",
      title: "Forum des jeunes du Plateau",
      category: "Vie locale",
      status: "Publié",
      author: "Admin",
      resume: "Rencontre annuelle des jeunes de notre commune",
      content: "Le forum annuel des jeunes se déroulera...",
      illustration: null,
      documents: [],
    },
  ])

  const [newActualite, setNewActualite] = useState<NewActualite>({
    title: "",
    category: "",
    resume: "",
    content: "",
    illustration: null,
    documents: [],
  })

  const addActualite = () => {
    if (newActualite.title && newActualite.category) {
      const actualite: Actualite = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString("fr-FR"),
        title: newActualite.title,
        category: newActualite.category,
        status: "Brouillon",
        author: "Admin",
        resume: newActualite.resume,
        content: newActualite.content,
        illustration: newActualite.illustration,
        documents: newActualite.documents,
      }
      setActualites([actualite, ...actualites])
      setNewActualite({
        title: "",
        category: "",
        resume: "",
        content: "",
        illustration: null,
        documents: [],
      })
      setShowAddModal(false)
    }
  }

  const openEditModal = (actualite: Actualite) => {
    setEditingActualite(actualite)
    setNewActualite({
      title: actualite.title,
      category: actualite.category,
      resume: actualite.resume,
      content: actualite.content,
      illustration: actualite.illustration,
      documents: actualite.documents,
    })
    setShowEditModal(true)
  }

  const updateActualite = () => {
    if (editingActualite && newActualite.title && newActualite.category) {
      setActualites(
        actualites.map((item) =>
          item.id === editingActualite.id
            ? {
                ...item,
                title: newActualite.title,
                category: newActualite.category,
                resume: newActualite.resume,
                content: newActualite.content,
                illustration: newActualite.illustration,
                documents: newActualite.documents,
              }
            : item,
        ),
      )
      setShowEditModal(false)
      setEditingActualite(null)
      setNewActualite({
        title: "",
        category: "",
        resume: "",
        content: "",
        illustration: null,
        documents: [],
      })
    }
  }

  const openDeleteModal = (actualite: Actualite) => {
    setDeleteModal({ isOpen: true, actualite })
  }

  const confirmDelete = () => {
    if (deleteModal.actualite) {
      setActualites(actualites.filter((item) => item.id !== deleteModal.actualite!.id))
    }
    setDeleteModal({ isOpen: false, actualite: null })
  }

  const toggleStatus = (id: string) => {
    setActualites(
      actualites.map((item) =>
        item.id === id ? { ...item, status: item.status === "Publié" ? "Brouillon" : "Publié" } : item,
      ),
    )
  }

  const filteredActualites = actualites.filter((item) => {
    if (searchTerm && !item.title.toLowerCase().includes(searchTerm.toLowerCase())) return false
    if (filterCategory !== "all" && item.category !== filterCategory) return false
    if (filterStatus !== "all" && item.status !== filterStatus) return false
    return true
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Publié":
        return "bg-green-500 text-white"
      case "Brouillon":
        return "bg-orange-500 text-white"
      case "Archivé":
        return "bg-gray-500 text-white"
      default:
        return "bg-gray-500 text-white"
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

  const resetForm = () => {
    setNewActualite({
      title: "",
      category: "",
      resume: "",
      content: "",
      illustration: null,
      documents: [],
    })
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6">
      <motion.div variants={itemVariants}>
        <Card className=" border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Newspaper className="w-5 h-5" />
                Actualités et communication
              </CardTitle>
              <Dialog
                open={showAddModal}
                onOpenChange={(open) => {
                  setShowAddModal(open)
                  if (!open) resetForm()
                }}
              >
                <DialogTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Nouvelle Actualité
                    </Button>
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <DialogHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white -m-6 mb-6 p-6 rounded-t-lg">
                      <DialogTitle className="text-lg">Créer / Modifier une actualité</DialogTitle>
                      <div className="bg-orange-500 text-white px-3 py-1 rounded-lg text-sm inline-block mt-2">
                        Une Écrire Avec Secrétaire Générale
                      </div>
                    </DialogHeader>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Titre de l'article</label>
                          <Input
                            placeholder="Coupure d'eau prévue le 24/01"
                            value={newActualite.title}
                            onChange={(e) => setNewActualite({ ...newActualite, title: e.target.value })}
                            className="border-gray-300 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                          <Select
                            value={newActualite.category}
                            onValueChange={(value) => setNewActualite({ ...newActualite, category: value })}
                          >
                            <SelectTrigger className="border-gray-300">
                              <SelectValue placeholder="Alerte citoyenne" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Événement">Événement</SelectItem>
                              <SelectItem value="Alerte citoyenne">Alerte citoyenne</SelectItem>
                              <SelectItem value="Vie locale">Vie locale</SelectItem>
                              <SelectItem value="Administration">Administration</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Résumé court</label>
                        <Input
                          placeholder="100 caractères max"
                          value={newActualite.resume}
                          onChange={(e) => setNewActualite({ ...newActualite, resume: e.target.value })}
                          className="border-gray-300 focus:border-blue-500"
                          maxLength={100}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contenu principal</label>
                        <Textarea
                          placeholder="Rédigez le contenu de votre actualité..."
                          value={newActualite.content}
                          onChange={(e) => setNewActualite({ ...newActualite, content: e.target.value })}
                          className="border-gray-300 focus:border-blue-500 min-h-32"
                          rows={6}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FileUpload
                          label="Illustration principale"
                          selectedFile={newActualite.illustration}
                          onFileSelect={(file) => setNewActualite({ ...newActualite, illustration: file })}
                          accept="image/*"
                        />
                        
                        <FileUpload
                          label="Documents joints"
                          selectedFiles={newActualite.documents}
                          onMultipleFileSelect={(files) => setNewActualite({ ...newActualite, documents: files })}
                          onFileSelect={() => {}} // Provide a no-op function
                          selectedFile={null} // Provide a default value
                          accept=".pdf,.doc,.docx"
                          multiple={true}
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 mt-8">
                      <Button
                        variant="outline"
                        className="flex-1 border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
                        onClick={() => setShowAddModal(false)}
                      >
                        Sauvegarder en brouillon
                      </Button>
                      <Button
                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                        onClick={addActualite}
                      >
                        Publier maintenant
                      </Button>
                    </div>
                  </motion.div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {/* Filters and Search */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 flex-1 min-w-64">
                <Search className="w-4 h-4 text-gray-500" />
                <Input
                  placeholder="Recherche par mot-clé ou titre"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="Publié">Publié</SelectItem>
                  <SelectItem value="Brouillon">Brouillon</SelectItem>
                  <SelectItem value="Archivé">Archivé</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes catégories</SelectItem>
                  <SelectItem value="Événement">Événement</SelectItem>
                  <SelectItem value="Alerte citoyenne">Alerte citoyenne</SelectItem>
                  <SelectItem value="Vie locale">Vie locale</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
              <div className="grid grid-cols-12 gap-4 p-4 font-semibold text-sm">
                <div className="col-span-2">Date</div>
                <div className="col-span-4">Titre</div>
                <div className="col-span-2">Catégorie</div>
                <div className="col-span-2">Statut</div>
                <div className="col-span-2">Actions</div>
              </div>
            </div>

            {/* Table Content */}
            <div className="bg-white rounded-b-lg border border-t-0">
              <AnimatePresence>
                {filteredActualites.map((actualite, index) => (
                  <motion.div
                    key={actualite.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 hover:bg-blue-50 transition-colors"
                  >
                    <div className="col-span-2 text-sm text-gray-600">{actualite.date}</div>
                    <div className="col-span-4 font-medium text-gray-900">{actualite.title}</div>
                    <div className="col-span-2 text-sm text-gray-600">{actualite.category}</div>
                    <div className="col-span-2">
                      <Badge className={getStatusColor(actualite.status)}>{actualite.status}</Badge>
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleStatus(actualite.id)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Archiver"
                      >
                        <Archive className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => openEditModal(actualite)}
                        className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                        title="Modifier"
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => openDeleteModal(actualite)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredActualites.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-white rounded-b-lg border border-t-0"
              >
                <Newspaper className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-500 mb-2">Aucune actualité trouvée</h3>
                <p className="text-gray-400">Créez votre première actualité pour commencer</p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Edit Modal */}
      <Dialog
        open={showEditModal}
        onOpenChange={(open) => {
          setShowEditModal(open)
          if (!open) {
            setEditingActualite(null)
            resetForm()
          }
        }}
      >
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <DialogHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white -m-6 mb-6 p-6 rounded-t-lg">
              <DialogTitle className="text-lg">Modifier l'actualité</DialogTitle>
              <div className="bg-orange-500 text-white px-3 py-1 rounded-lg text-sm inline-block mt-2">
                Modification en cours
              </div>
            </DialogHeader>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Titre de l'article</label>
                  <Input
                    placeholder="Titre de l'actualité"
                    value={newActualite.title}
                    onChange={(e) => setNewActualite({ ...newActualite, title: e.target.value })}
                    className="border-gray-300 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                  <Select
                    value={newActualite.category}
                    onValueChange={(value) => setNewActualite({ ...newActualite, category: value })}
                  >
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Événement">Événement</SelectItem>
                      <SelectItem value="Alerte citoyenne">Alerte citoyenne</SelectItem>
                      <SelectItem value="Vie locale">Vie locale</SelectItem>
                      <SelectItem value="Administration">Administration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Résumé court</label>
                <Input
                  placeholder="100 caractères max"
                  value={newActualite.resume}
                  onChange={(e) => setNewActualite({ ...newActualite, resume: e.target.value })}
                  className="border-gray-300 focus:border-green-500"
                  maxLength={100}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contenu principal</label>
                <Textarea
                  placeholder="Rédigez le contenu de votre actualité..."
                  value={newActualite.content}
                  onChange={(e) => setNewActualite({ ...newActualite, content: e.target.value })}
                  className="border-gray-300 focus:border-green-500 min-h-32"
                  rows={6}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FileUpload
                  label="Illustration principale"
                  selectedFile={newActualite.illustration}
                  onFileSelect={(file) => setNewActualite({ ...newActualite, illustration: file })}
                  accept="image/*"
                />
                <FileUpload
                  label="Documents joints"
                  selectedFiles={newActualite.documents}
                  onMultipleFileSelect={(files) => setNewActualite({ ...newActualite, documents: files })}
                  onFileSelect={() => {}} // Provide a no-op function
                  selectedFile={null} // Provide a default value
                  accept=".pdf,.doc,.docx"
                  multiple={true}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <Button
                variant="outline"
                className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent"
                onClick={() => setShowEditModal(false)}
              >
                Annuler
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                onClick={updateActualite}
              >
                Mettre à jour
              </Button>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, actualite: null })}
        onConfirm={confirmDelete}
        title={deleteModal.actualite?.title || ""}
      />
    </motion.div>
  )
}
