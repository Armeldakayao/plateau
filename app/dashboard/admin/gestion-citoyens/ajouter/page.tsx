// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { ArrowLeft, Save } from "lucide-react"
// import Link from "next/link"

// export default function AjouterCitoyenPage() {
//   const [formData, setFormData] = useState({
//     nom: "",
//     prenom: "",
//     email: "",
//     telephone: "",
//     dateNaissance: "",
//     lieuNaissance: "",
//     adresse: "",
//     profession: "",
//     statut: "Actif",
//   })

//   const handleInputChange = (field: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     console.log("Nouveau citoyen ajouté:", formData)
//     // Ici vous ajouteriez la logique pour sauvegarder
//   }

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       {/* Breadcrumb */}
//       <div className="mb-6">
//         <nav className="text-sm text-gray-600">
//           <Link href="/admin" className="hover:text-blue-600">
//             Tableau de bord
//           </Link>
//           <span className="mx-2">›</span>
//           <Link href="/admin/gestion-citoyens" className="hover:text-blue-600">
//             Gestion des citoyens
//           </Link>
//           <span className="mx-2">›</span>
//           <span className="text-gray-900 font-medium">Ajouter un citoyen</span>
//         </nav>
//       </div>

//       <div className="mb-6">
//         <div className="flex items-center gap-4 mb-4">
//           <Link href="/admin/gestion-citoyens">
//             <Button variant="outline" size="sm">
//               <ArrowLeft className="w-4 h-4 mr-2" />
//               Retour
//             </Button>
//           </Link>
//           <h1 className="text-3xl font-bold text-gray-900">Ajouter un nouveau citoyen</h1>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit}>
//         <Card className="shadow-sm border-gray-200">
//           <CardHeader className="bg-blue-50 border-b border-blue-200">
//             <CardTitle className="text-xl font-semibold text-blue-600">Informations personnelles</CardTitle>
//           </CardHeader>
//           <CardContent className="p-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
//                 <Input
//                   value={formData.nom}
//                   onChange={(e) => handleInputChange("nom", e.target.value)}
//                   placeholder="Nom de famille"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
//                 <Input
//                   value={formData.prenom}
//                   onChange={(e) => handleInputChange("prenom", e.target.value)}
//                   placeholder="Prénom"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
//                 <Input
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => handleInputChange("email", e.target.value)}
//                   placeholder="adresse@email.com"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
//                 <Input
//                   value={formData.telephone}
//                   onChange={(e) => handleInputChange("telephone", e.target.value)}
//                   placeholder="07 XX XX XX XX"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Date de naissance</label>
//                 <Input
//                   type="date"
//                   value={formData.dateNaissance}
//                   onChange={(e) => handleInputChange("dateNaissance", e.target.value)}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Lieu de naissance</label>
//                 <Input
//                   value={formData.lieuNaissance}
//                   onChange={(e) => handleInputChange("lieuNaissance", e.target.value)}
//                   placeholder="Ville, Pays"
//                 />
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
//                 <Input
//                   value={formData.adresse}
//                   onChange={(e) => handleInputChange("adresse", e.target.value)}
//                   placeholder="Adresse complète"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Profession</label>
//                 <Input
//                   value={formData.profession}
//                   onChange={(e) => handleInputChange("profession", e.target.value)}
//                   placeholder="Profession"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
//                 <Select value={formData.statut} onValueChange={(value) => handleInputChange("statut", value)}>
//                   <SelectTrigger>
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Actif">Actif</SelectItem>
//                     <SelectItem value="Inactif">Inactif</SelectItem>
//                     <SelectItem value="Bloqué">Bloqué</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <div className="flex gap-4 mt-8">
//           <Link href="/admin/gestion-citoyens">
//             <Button variant="outline" className="border-gray-300 bg-transparent">
//               Annuler
//             </Button>
//           </Link>
//           <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
//             <Save className="w-4 h-4 mr-2" />
//             Enregistrer le citoyen
//           </Button>
//         </div>
//       </form>
//     </div>
//   )
// }
"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { User, Phone, FileText, Shield, Check, Upload, X } from "lucide-react"

interface CitoyenData {
  nom: string
  prenom: string
  dateNaissance: string
  lieuResidence: string
  typeDocument: string
  telephone: string
  email: string
  pieceIdentite: File | null
  justificatifDomicile: File | null
  motDePasse: string
  confirmationMotDePasse: string
}

interface FileUploadProps {
  onFileSelect: (file: File | null) => void
  selectedFile: File | null
  label: string
  accept?: string
}

function FileUpload({ onFileSelect, selectedFile, label, accept = "image/*,.pdf" }: FileUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0])
      }
    },
    [onFileSelect],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  })

  const removeFile = () => {
    onFileSelect(null)
  }

  return (
    <div className="">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      {!selectedFile ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-orange-400 hover:bg-orange-50"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
          {isDragActive ? (
            <p className="text-sm text-blue-600">Déposez le fichier ici...</p>
          ) : (
            <div>
              <p className="text-sm text-gray-600 mb-1">Glissez-déposez un fichier ici</p>
              <p className="text-xs text-gray-500">ou cliquez pour sélectionner</p>
              <p className="text-xs text-gray-400 mt-1">PDF, PNG, JPG (max 5MB)</p>
            </div>
          )}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="border border-green-200 bg-green-50 rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">{selectedFile.name}</p>
                <p className="text-xs text-green-600">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={removeFile}
              className="p-1 text-red-500 hover:bg-red-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default function AddCitoyenForm() {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [confirmationCode, setConfirmationCode] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const [citoyenData, setCitoyenData] = useState<CitoyenData>({
    nom: "",
    prenom: "",
    dateNaissance: "",
    lieuResidence: "",
    typeDocument: "",
    telephone: "",
    email: "",
    pieceIdentite: null,
    justificatifDomicile: null,
    motDePasse: "",
    confirmationMotDePasse: "",
  })

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulation d'envoi
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setShowConfirmationModal(true)
  }

  const handleConfirmation = async () => {
    if (confirmationCode.length === 6) {
      setIsSubmitting(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSubmitting(false)
      setIsSuccess(true)
      setTimeout(() => {
        setShowConfirmationModal(false)
        setIsSuccess(false)
        // Reset form
        setCitoyenData({
          nom: "",
          prenom: "",
          dateNaissance: "",
          lieuResidence: "",
          typeDocument: "",
          telephone: "",
          email: "",
          pieceIdentite: null,
          justificatifDomicile: null,
          motDePasse: "",
          confirmationMotDePasse: "",
        })
        setConfirmationCode("")
      }, 2000)
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
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6 m-7">
      {/* Breadcrumb */}
      <motion.div variants={itemVariants}>
        <nav className="text-sm text-gray-600 mb-4">
          <span className="text-blue-600 font-medium">Gestion des citoyens</span>
          <span className="mx-2">›</span>
          <span className="text-gray-900">Ajout citoyen</span>
        </nav>
      </motion.div>

      {/* Informations personnelles */}
      <motion.div className="" variants={itemVariants}>
        <Card className=" border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <User className="w-5 h-5" />
              Informations personnelles
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                <Input
                  placeholder="Nom de famille"
                  value={citoyenData.nom}
                  onChange={(e) => setCitoyenData({ ...citoyenData, nom: e.target.value })}
                  className="border-gray-300 focus:border-blue-500"
                />
              </motion.div>
              <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                <Input
                  placeholder="Prénom"
                  value={citoyenData.prenom}
                  onChange={(e) => setCitoyenData({ ...citoyenData, prenom: e.target.value })}
                  className="border-gray-300 focus:border-blue-500"
                />
              </motion.div>
              <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date de naissance</label>
                <Input
                  type="date"
                  value={citoyenData.dateNaissance}
                  onChange={(e) => setCitoyenData({ ...citoyenData, dateNaissance: e.target.value })}
                  className="border-gray-300 focus:border-blue-500"
                />
              </motion.div>
              <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lieu de résidence</label>
                <Input
                  placeholder="Adresse complète"
                  value={citoyenData.lieuResidence}
                  onChange={(e) => setCitoyenData({ ...citoyenData, lieuResidence: e.target.value })}
                  className="border-gray-300 focus:border-blue-500"
                />
              </motion.div>
              <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type de document</label>
                <Select
                  value={citoyenData.typeDocument}
                  onValueChange={(value) => setCitoyenData({ ...citoyenData, typeDocument: value })}
                >
                  <SelectTrigger className="border-gray-300">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cni">Carte Nationale d'Identité</SelectItem>
                    <SelectItem value="passeport">Passeport</SelectItem>
                    <SelectItem value="permis">Permis de conduire</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Coordonnées */}
      <motion.div variants={itemVariants}>
        <Card className=" border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Phone className="w-5 h-5" />
              Coordonnées
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone mobile</label>
                <div className="relative">
                  <Input
                    placeholder="+225 XX XX XX XX XX"
                    value={citoyenData.telephone}
                    onChange={(e) => setCitoyenData({ ...citoyenData, telephone: e.target.value })}
                    className="border-gray-300 focus:border-green-500"
                  />
                  <Badge className="absolute right-2 top-2 bg-green-500 text-white text-xs">Contrôle du code</Badge>
                </div>
              </motion.div>
              <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <Input
                  type="email"
                  placeholder="exemple@email.com"
                  value={citoyenData.email}
                  onChange={(e) => setCitoyenData({ ...citoyenData, email: e.target.value })}
                  className="border-gray-300 focus:border-green-500"
                />
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Documents justificatifs */}
      <motion.div variants={itemVariants}>
        <Card className=" border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50 border-b">
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <FileText className="w-5 h-5" />
              Documents justificatifs (optionnels)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FileUpload
                label="Pièce d'identité"
                selectedFile={citoyenData.pieceIdentite}
                onFileSelect={(file) => setCitoyenData({ ...citoyenData, pieceIdentite: file })}
              />
              <FileUpload
                label="Justificatif de domicile"
                selectedFile={citoyenData.justificatifDomicile}
                onFileSelect={(file) => setCitoyenData({ ...citoyenData, justificatifDomicile: file })}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Sécurité du compte */}
      <motion.div variants={itemVariants}>
        <Card className=" border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <Shield className="w-5 h-5" />
              Sécurité du compte
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={citoyenData.motDePasse}
                  onChange={(e) => setCitoyenData({ ...citoyenData, motDePasse: e.target.value })}
                  className="border-gray-300 focus:border-purple-500"
                />
              </motion.div>
              <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirmation mot de passe</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={citoyenData.confirmationMotDePasse}
                  onChange={(e) => setCitoyenData({ ...citoyenData, confirmationMotDePasse: e.target.value })}
                  className="border-gray-300 focus:border-purple-500"
                />
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Button */}
      <motion.div variants={itemVariants} className="flex justify-center">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-12 py-3 text-lg shadow-lg"
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
              />
            ) : null}
            {isSubmitting ? "Enregistrement..." : "Enregistrer citoyen"}
          </Button>
        </motion.div>
      </motion.div>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmationModal} onOpenChange={setShowConfirmationModal}>
        <DialogContent className="sm:max-w-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <DialogHeader className="text-center">
              <DialogTitle className="text-xl font-semibold text-green-700 mb-4">
                Confirmation du numéro de téléphone
              </DialogTitle>
              <p className="text-gray-600 mb-6">Un code de confirmation a été envoyé sur le numéro</p>
            </DialogHeader>

            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <Input
                    placeholder="Saisir le code"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                    className="text-center text-lg tracking-widest"
                    maxLength={6}
                  />
                  <Button
                    onClick={handleConfirmation}
                    disabled={confirmationCode.length !== 6 || isSubmitting}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                    ) : null}
                    Valider
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Check className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-green-700 mb-2">Citoyen enregistré !</h3>
                  <p className="text-gray-600">Le compte a été créé avec succès</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
