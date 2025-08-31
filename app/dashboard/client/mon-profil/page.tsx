// // "use client"
// // import { useState, useEffect } from "react"
// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"
// // import { Switch } from "@/components/ui/switch"
// // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// // import { Badge } from "@/components/ui/badge"
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogFooter,
// //   DialogHeader,
// //   DialogTitle,
// // } from "@/components/ui/dialog"
// // import { Mail, Shield, Download, Edit, Save, X, Calendar, Eye, EyeOff } from "lucide-react"
// // import Sidebar from "@/components/sidebar"
// // import { useRouter } from "next/navigation"
// // import { useChangePasswordMutation, useProfile, useUpdateProfile } from "@/hooks"

// // export default function MonProfilUserPage() {
// //   const router = useRouter()
// //   const [isEditing, setIsEditing] = useState(false)

// //   const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)
// //   const [passwordData, setPasswordData] = useState({
// //     currentPassword: "",
// //     newPassword: "",
// //     confirmPassword: "",
// //   })
// //   const [showPasswords, setShowPasswords] = useState({
// //     current: false,
// //     new: false,
// //     confirm: false,
// //   })
// //   const [passwordError, setPasswordError] = useState("")

// //   // Hooks pour récupérer et mettre à jour le profil
// //   const { data: profileData, isLoading, error, refetch } = useProfile()
// //   const updateProfileMutation = useUpdateProfile()
// //   const changePasswordMutation = useChangePasswordMutation()

// //   // État local pour les modifications
// //   const [editedData, setEditedData] = useState({
// //     firstName: "",
// //     lastName: "",
// //     email: "",
// //     phone: "",
// //     birthDate: "", // Format ISO 8601 pour l'API
// //     birthPlace: "",
// //     nationality: "",
// //     city: "",
// //   })

// //   const [notifications, setNotifications] = useState({
// //     email: true,
// //     sms: false,
// //     push: true,
// //     newsletter: true,
// //   })

// //   // Fonction pour convertir une date ISO en format YYYY-MM-DD pour l'input date
// //   const formatDateForInput = (isoDate) => {
// //     if (!isoDate) return ""
// //     try {
// //       const date = new Date(isoDate)
// //       return date.toISOString().split("T")[0] // Format YYYY-MM-DD
// //     } catch (error) {
// //       return ""
// //     }
// //   }

// //   // Fonction pour convertir une date du format YYYY-MM-DD vers ISO 8601
// //   const formatDateForAPI = (dateString) => {
// //     if (!dateString) return ""
// //     try {
// //       const date = new Date(dateString + "T00:00:00.000Z")
// //       return date.toISOString()
// //     } catch (error) {
// //       return ""
// //     }
// //   }

// //   // Fonction pour afficher une date en format français
// //   const formatDateForDisplay = (isoDate) => {
// //     if (!isoDate) return ""
// //     try {
// //       const date = new Date(isoDate)
// //       return date.toLocaleDateString("fr-FR")
// //     } catch (error) {
// //       return ""
// //     }
// //   }

// //   // Mettre à jour les données locales quand le profil est chargé
// //   useEffect(() => {
// //     if (profileData) {
// //       const formattedData = {
// //         firstName: profileData.firstName || "",
// //         lastName: profileData.lastName || "",
// //         email: profileData.email || "",
// //         phone: profileData.phone || "",
// //         birthDate: profileData.birthDate || "",
// //         birthPlace: profileData.birthPlace || "",
// //         nationality: profileData.nationality || "",
// //         city: profileData.city || "",
// //       }
// //       setEditedData(formattedData)
// //     }
// //   }, [profileData])

// //   const handleEdit = () => {
// //     setIsEditing(true)
// //   }

// //   const handleCancel = () => {
// //     setIsEditing(false)
// //     // Remettre les données originales
// //     if (profileData) {
// //       const formattedData = {
// //         firstName: profileData.firstName || "",
// //         lastName: profileData.lastName || "",
// //         email: profileData.email || "",
// //         phone: profileData.phone || "",
// //         birthDate: profileData.birthDate || "",
// //         birthPlace: profileData.birthPlace || "",
// //         nationality: profileData.nationality || "",
// //         city: profileData.city || "",
// //       }
// //       setEditedData(formattedData)
// //     }
// //   }

// //   const handleSave = async () => {
// //     try {
// //       // Préparer les données pour l'API
// //       const dataToSend = {
// //         firstName: editedData.firstName,
// //         lastName: editedData.lastName,
// //         email: editedData.email,
// //         phone: editedData.phone,
// //         birthDate: editedData.birthDate ? editedData.birthDate.split("T")[0] : "",
// //         birthPlace: editedData.birthPlace,
// //         nationality: editedData.nationality,
// //         city: editedData.city,
// //       }

// //       console.log("Données envoyées à l'API:", dataToSend)

// //       await updateProfileMutation.mutateAsync(dataToSend)
// //       setIsEditing(false)
// //       refetch() // Recharger les données
// //     } catch (error) {
// //       console.error("Erreur lors de la sauvegarde:", error)
// //     }
// //   }

// //   const handleNotificationChange = (key: string, value: boolean) => {
// //     setNotifications((prev) => ({ ...prev, [key]: value }))
// //     console.log(`Notification ${key} ${value ? "activée" : "désactivée"}`)
// //   }

// //   const handleDownloadData = () => {
// //     // Créer un fichier JSON avec les données du profil
// //     if (profileData) {
// //       const dataStr = JSON.stringify(profileData, null, 2)
// //       const dataBlob = new Blob([dataStr], { type: "application/json" })
// //       const url = URL.createObjectURL(dataBlob)
// //       const link = document.createElement("a")
// //       link.href = url
// //       link.download = "mes_donnees_personnelles.json"
// //       link.click()
// //       URL.revokeObjectURL(url)
// //     }
// //   }

// //   const handleChangePassword = () => {
// //     setIsChangePasswordOpen(true)
// //     setPasswordError("")
// //     setPasswordData({
// //       currentPassword: "",
// //       newPassword: "",
// //       confirmPassword: "",
// //     })
// //   }

// //   const handlePasswordSubmit = async () => {
// //     setPasswordError("")

// //     // Validation
// //     if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
// //       setPasswordError("Tous les champs sont requis")
// //       return
// //     }

// //     if (passwordData.newPassword !== passwordData.confirmPassword) {
// //       setPasswordError("Les nouveaux mots de passe ne correspondent pas")
// //       return
// //     }

// //     if (passwordData.newPassword.length < 8) {
// //       setPasswordError("Le nouveau mot de passe doit contenir au moins 8 caractères")
// //       return
// //     }

// //     if (passwordData.currentPassword === passwordData.newPassword) {
// //       setPasswordError("Le nouveau mot de passe doit être différent de l'ancien")
// //       return
// //     }

// //     try {
// //       await changePasswordMutation.mutateAsync({
// //         currentPassword: passwordData.currentPassword,
// //         newPassword: passwordData.newPassword,
// //       })

// //       setIsChangePasswordOpen(false)
// //       setPasswordData({
// //         currentPassword: "",
// //         newPassword: "",
// //         confirmPassword: "",
// //       })

// //       // Optionally show success message
// //       console.log("Mot de passe changé avec succès")
// //     } catch (error) {
// //       setPasswordError("Erreur lors du changement de mot de passe. Vérifiez votre mot de passe actuel.")
// //     }
// //   }

// //   const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
// //     setShowPasswords((prev) => ({
// //       ...prev,
// //       [field]: !prev[field],
// //     }))
// //   }

// //   const documents = [
// //     {
// //       nom: "Pièce d'identité",
// //       type: profileData?.idType?.toUpperCase() || "CNI",
// //       dateExpiration: "15/03/2030",
// //       statut: profileData?.isVerified ? "Valide" : "En attente",
// //     },
// //     { nom: "Justificatif de domicile", type: "Facture", dateExpiration: "15/01/2025", statut: "Valide" },
// //     { nom: "Extrait de naissance", type: "Acte", dateExpiration: "N/A", statut: "Valide" },
// //   ]

// //   // États de chargement et d'erreur
// //   if (isLoading) {
// //     return (
// //       <div className="flex min-h-screen bg-gray-50">
// //         <Sidebar />
// //         <div className="flex-1 md:ml-64 flex items-center justify-center">
// //           <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
// //         </div>
// //       </div>
// //     )
// //   }

// //   if (error) {
// //     return (
// //       <div className="flex min-h-screen bg-gray-50">
// //         <Sidebar />
// //         <div className="flex-1 md:ml-64 flex items-center justify-center">
// //           <div className="text-center">
// //             <p className="text-red-600 mb-4">Erreur lors du chargement du profil</p>
// //             <Button onClick={() => refetch()}>Réessayer</Button>
// //           </div>
// //         </div>
// //       </div>
// //     )
// //   }

// //   if (!profileData) {
// //     return (
// //       <div className="flex min-h-screen bg-gray-50">
// //         <Sidebar />
// //         <div className="flex-1 md:ml-64 flex items-center justify-center">
// //           <p>Aucune donnée de profil trouvée</p>
// //         </div>
// //       </div>
// //     )
// //   }

// //   const fullName = `${profileData.firstName} ${profileData.lastName}`
// //   const userInitials = `${profileData.firstName?.[0] || ""}${profileData.lastName?.[0] || ""}`.toUpperCase()

// //   return (
// //     <div className="flex min-h-screen bg-gray-50">
// //       <Sidebar />
// //       <div className="flex-1 md:ml-72 p-4 md:p-8">
// //         {/* Header */}
// //         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
// //           <div>
// //             <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Mon profil</h1>
// //             <p className="text-gray-600">Gérez vos informations personnelles et préférences</p>
// //           </div>
// //           <div className="flex gap-2">
// //             <Button
// //               variant="outline"
// //               className="border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent transition-colors duration-200"
// //               onClick={handleDownloadData}
// //             >
// //               <Download className="w-4 h-4 mr-2" />
// //               Télécharger mes données
// //             </Button>
// //             {!isEditing ? (
// //               <Button
// //                 className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
// //                 onClick={handleEdit}
// //               >
// //                 <Edit className="w-4 h-4 mr-2" />
// //                 Modifier
// //               </Button>
// //             ) : (
// //               <div className="flex gap-2">
// //                 <Button
// //                   variant="outline"
// //                   className="border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent transition-colors duration-200"
// //                   onClick={handleCancel}
// //                   disabled={updateProfileMutation.isPending}
// //                 >
// //                   <X className="w-4 h-4 mr-2" />
// //                   Annuler
// //                 </Button>
// //                 <Button
// //                   className="bg-green-600 hover:bg-green-700 text-white transition-colors duration-200"
// //                   onClick={handleSave}
// //                   disabled={updateProfileMutation.isPending}
// //                 >
// //                   {updateProfileMutation.isPending ? (
// //                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
// //                   ) : (
// //                     <Save className="w-4 h-4 mr-2" />
// //                   )}
// //                   Enregistrer
// //                 </Button>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
// //           {/* Main Content */}
// //           <div className="lg:col-span-2 space-y-6">
// //             {/* Informations personnelles */}
// //             <Card className="shadow-sm border-gray-200">
// //               <CardHeader className="border-b border-gray-200">
// //                 <CardTitle className="text-xl font-semibold text-gray-900">Informations personnelles</CardTitle>
// //               </CardHeader>
// //               <CardContent className="p-6">
// //                 <div className="flex items-center gap-6 mb-6">
// //                   <Avatar className="w-20 h-20 border-4 border-gray-200">
// //                     <AvatarImage src="/placeholder.svg?height=80&width=80" />
// //                     <AvatarFallback className="text-xl font-semibold bg-blue-100 text-blue-600">
// //                       {userInitials}
// //                     </AvatarFallback>
// //                   </Avatar>
// //                   <div>
// //                     <h3 className="text-xl font-bold text-gray-900">{fullName}</h3>
// //                     <p className="text-gray-600">{profileData.city}</p>
// //                     <Badge
// //                       className={`mt-2 ${profileData.isVerified ? "bg-green-500 hover:bg-green-500" : "bg-yellow-500 hover:bg-yellow-500"} text-white`}
// //                     >
// //                       {profileData.isVerified ? "Compte vérifié" : "En attente de vérification"}
// //                     </Badge>
// //                   </div>
// //                 </div>

// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                   <div className="space-y-4">
// //                     <div>
// //                       <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
// //                         Prénom
// //                       </Label>
// //                       {isEditing ? (
// //                         <Input
// //                           id="firstName"
// //                           value={editedData.firstName}
// //                           onChange={(e) => setEditedData((prev) => ({ ...prev, firstName: e.target.value }))}
// //                           className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
// //                         />
// //                       ) : (
// //                         <p className="mt-1 text-gray-900">{profileData.firstName}</p>
// //                       )}
// //                     </div>
// //                     <div>
// //                       <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
// //                         Nom
// //                       </Label>
// //                       {isEditing ? (
// //                         <Input
// //                           id="lastName"
// //                           value={editedData.lastName}
// //                           onChange={(e) => setEditedData((prev) => ({ ...prev, lastName: e.target.value }))}
// //                           className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
// //                         />
// //                       ) : (
// //                         <p className="mt-1 text-gray-900">{profileData.lastName}</p>
// //                       )}
// //                     </div>
// //                     <div>
// //                       <Label htmlFor="email" className="text-sm font-medium text-gray-700">
// //                         Adresse email
// //                       </Label>
// //                       {isEditing ? (
// //                         <Input
// //                           id="email"
// //                           type="email"
// //                           value={editedData.email}
// //                           onChange={(e) => setEditedData((prev) => ({ ...prev, email: e.target.value }))}
// //                           className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
// //                         />
// //                       ) : (
// //                         <p className="mt-1 text-gray-900">{profileData.email}</p>
// //                       )}
// //                     </div>
// //                     <div>
// //                       <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
// //                         Téléphone
// //                       </Label>
// //                       {isEditing ? (
// //                         <Input
// //                           id="phone"
// //                           value={editedData.phone}
// //                           onChange={(e) => setEditedData((prev) => ({ ...prev, phone: e.target.value }))}
// //                           className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
// //                         />
// //                       ) : (
// //                         <p className="mt-1 text-gray-900">{profileData.phone}</p>
// //                       )}
// //                     </div>
// //                   </div>
// //                   <div className="space-y-4">
// //                     <div>
// //                       <Label htmlFor="city" className="text-sm font-medium text-gray-700">
// //                         Ville
// //                       </Label>
// //                       {isEditing ? (
// //                         <Input
// //                           id="city"
// //                           value={editedData.city}
// //                           onChange={(e) => setEditedData((prev) => ({ ...prev, city: e.target.value }))}
// //                           className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
// //                         />
// //                       ) : (
// //                         <p className="mt-1 text-gray-900">{profileData.city}</p>
// //                       )}
// //                     </div>
// //                     <div>
// //                       <Label htmlFor="birthPlace" className="text-sm font-medium text-gray-700">
// //                         Lieu de naissance
// //                       </Label>
// //                       {isEditing ? (
// //                         <Input
// //                           id="birthPlace"
// //                           value={editedData.birthPlace}
// //                           onChange={(e) => setEditedData((prev) => ({ ...prev, birthPlace: e.target.value }))}
// //                           className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
// //                         />
// //                       ) : (
// //                         <p className="mt-1 text-gray-900">{profileData.birthPlace}</p>
// //                       )}
// //                     </div>
// //                     <div>
// //                       <Label htmlFor="birthDate" className="text-sm font-medium text-gray-700">
// //                         Date de naissance
// //                       </Label>
// //                       {isEditing ? (
// //                         <div className="relative mt-1">
// //                           <Input
// //                             id="birthDate"
// //                             type="date"
// //                             value={formatDateForInput(editedData.birthDate)}
// //                             onChange={(e) => setEditedData((prev) => ({ ...prev, birthDate: e.target.value }))}
// //                             className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-10"
// //                           />
// //                           <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
// //                         </div>
// //                       ) : (
// //                         <p className="mt-1 text-gray-900">{formatDateForDisplay(profileData.birthDate)}</p>
// //                       )}
// //                     </div>
// //                     <div>
// //                       <Label htmlFor="nationality" className="text-sm font-medium text-gray-700">
// //                         Nationalité
// //                       </Label>
// //                       {isEditing ? (
// //                         <Input
// //                           id="nationality"
// //                           value={editedData.nationality}
// //                           onChange={(e) => setEditedData((prev) => ({ ...prev, nationality: e.target.value }))}
// //                           className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
// //                         />
// //                       ) : (
// //                         <p className="mt-1 text-gray-900">{profileData.nationality}</p>
// //                       )}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>

// //             {/* Préférences de notification */}
// //             <Card className="shadow-sm border-gray-200">
// //               <CardHeader className="border-b border-gray-200">
// //                 <CardTitle className="text-xl font-semibold text-gray-900">Préférences de notification</CardTitle>
// //               </CardHeader>
// //               <CardContent className="p-6">
// //                 <div className="space-y-6">
// //                   <div className="flex items-center justify-between">
// //                     <div className="flex items-center gap-3">
// //                       <Mail className="w-5 h-5 text-gray-400" />
// //                       <div>
// //                         <p className="font-medium text-gray-900">Notifications par email</p>
// //                         <p className="text-sm text-gray-500">Recevez les mises à jour par email</p>
// //                       </div>
// //                     </div>
// //                     <Switch
// //                       checked={notifications.email}
// //                       onCheckedChange={(checked) => handleNotificationChange("email", checked)}
// //                     />
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </div>

// //           {/* Sidebar */}
// //           <div className="space-y-6">
// //             {/* Documents */}
// //             <Card className="shadow-sm border-gray-200">
// //               <CardHeader className="border-b border-gray-200">
// //                 <CardTitle className="text-lg font-semibold text-gray-900">Mes documents</CardTitle>
// //               </CardHeader>
// //               <CardContent className="p-6">
// //                 <div className="space-y-4">
// //                   {documents.map((doc, index) => (
// //                     <div key={index} className="p-3 border border-gray-200 rounded-lg">
// //                       <div className="flex items-center justify-between mb-2">
// //                         <p className="font-medium text-gray-900 text-sm">{doc.nom}</p>
// //                         <div className="flex items-center">
// //                           <Badge
// //                             className={`text-xs ${doc.statut === "Valide" ? "bg-green-500 hover:bg-green-500" : "bg-yellow-500 hover:bg-yellow-500"} text-white`}
// //                           >
// //                             {doc.statut}
// //                           </Badge>
// //                           <Download
// //                             className="w-4 h-4 text-gray-500 ml-2 cursor-pointer hover:text-blue-600 transition-colors duration-200"
// //                             onClick={() => console.log(`Télécharger ${doc.nom}`)}
// //                           />
// //                         </div>
// //                       </div>
// //                       <p className="text-xs text-gray-500">Type: {doc.type}</p>
// //                       <p className="text-xs text-gray-500">Expire: {doc.dateExpiration}</p>
// //                       {profileData.idNumber && index === 0 && (
// //                         <p className="text-xs text-gray-500">Numéro: {profileData.idNumber}</p>
// //                       )}
// //                     </div>
// //                   ))}
// //                 </div>
// //               </CardContent>
// //             </Card>

// //             {/* Sécurité */}
// //             <Card className="shadow-sm border-gray-200">
// //               <CardHeader className="border-b border-gray-200">
// //                 <CardTitle className="text-lg font-semibold text-gray-900">Sécurité</CardTitle>
// //               </CardHeader>
// //               <CardContent className="p-6">
// //                 <div className="space-y-4">
// //                   <Button
// //                     variant="outline"
// //                     className="w-full justify-start border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent transition-colors duration-200"
// //                     onClick={handleChangePassword}
// //                     disabled={changePasswordMutation.isPending}
// //                   >
// //                     <Shield className="w-4 h-4 mr-2" />
// //                     Changer le mot de passe
// //                   </Button>
// //                   <div className="text-sm text-gray-500">
// //                     <p className="font-medium mb-2">Informations du compte :</p>
// //                     <p>Rôle: {profileData.role}</p>
// //                     <p>Membre depuis: {new Date(profileData.createdAt).toLocaleDateString("fr-FR")}</p>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>

// //             {/* Zone de danger */}
// //             <Card className="shadow-sm border-red-200">
// //               <CardHeader className="border-b border-red-200">
// //                 <CardTitle className="text-lg font-semibold text-red-600">Zone de danger</CardTitle>
// //               </CardHeader>
// //               <CardContent className="p-6">
// //                 <div className="space-y-4">
// //                   <p className="text-sm text-gray-600">
// //                     La suppression de votre compte est irréversible. Toutes vos données seront perdues.
// //                   </p>
// //                   <Button
// //                     variant="outline"
// //                     className="w-full border-red-600 text-red-600 hover:bg-red-50 bg-transparent transition-colors duration-200"
// //                     onClick={() => console.log("Suppression du compte demandée")}
// //                   >
// //                     Supprimer mon compte
// //                   </Button>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </div>
// //         </div>
// //       </div>

// //       <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
// //         <DialogContent className="sm:max-w-md">
// //           <DialogHeader>
// //             <DialogTitle className="flex items-center gap-2">
// //               <Shield className="w-5 h-5 text-blue-600" />
// //               Changer le mot de passe
// //             </DialogTitle>
// //             <DialogDescription>
// //               Saisissez votre mot de passe actuel et choisissez un nouveau mot de passe sécurisé.
// //             </DialogDescription>
// //           </DialogHeader>

// //           <div className="space-y-4 py-4">
// //             {/* Current Password */}
// //             <div className="space-y-2">
// //               <Label htmlFor="currentPassword">Mot de passe actuel</Label>
// //               <div className="relative">
// //                 <Input
// //                   id="currentPassword"
// //                   type={showPasswords.current ? "text" : "password"}
// //                   value={passwordData.currentPassword}
// //                   onChange={(e) => setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))}
// //                   className="pr-10"
// //                   placeholder="Entrez votre mot de passe actuel"
// //                 />
// //                 <button
// //                   type="button"
// //                   onClick={() => togglePasswordVisibility("current")}
// //                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
// //                 >
// //                   {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
// //                 </button>
// //               </div>
// //             </div>

// //             {/* New Password */}
// //             <div className="space-y-2">
// //               <Label htmlFor="newPassword">Nouveau mot de passe</Label>
// //               <div className="relative">
// //                 <Input
// //                   id="newPassword"
// //                   type={showPasswords.new ? "text" : "password"}
// //                   value={passwordData.newPassword}
// //                   onChange={(e) => setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))}
// //                   className="pr-10"
// //                   placeholder="Entrez votre nouveau mot de passe"
// //                 />
// //                 <button
// //                   type="button"
// //                   onClick={() => togglePasswordVisibility("new")}
// //                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
// //                 >
// //                   {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
// //                 </button>
// //               </div>
// //               <p className="text-xs text-gray-500">Le mot de passe doit contenir au moins 8 caractères</p>
// //             </div>

// //             {/* Confirm New Password */}
// //             <div className="space-y-2">
// //               <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
// //               <div className="relative">
// //                 <Input
// //                   id="confirmPassword"
// //                   type={showPasswords.confirm ? "text" : "password"}
// //                   value={passwordData.confirmPassword}
// //                   onChange={(e) => setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
// //                   className="pr-10"
// //                   placeholder="Confirmez votre nouveau mot de passe"
// //                 />
// //                 <button
// //                   type="button"
// //                   onClick={() => togglePasswordVisibility("confirm")}
// //                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
// //                 >
// //                   {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Error Message */}
// //             {passwordError && (
// //               <div className="p-3 bg-red-50 border border-red-200 rounded-md">
// //                 <p className="text-sm text-red-600">{passwordError}</p>
// //               </div>
// //             )}
// //           </div>

// //           <DialogFooter>
// //             <Button
// //               variant="outline"
// //               onClick={() => setIsChangePasswordOpen(false)}
// //               disabled={changePasswordMutation.isPending}
// //             >
// //               Annuler
// //             </Button>
// //             <Button
// //               onClick={handlePasswordSubmit}
// //               disabled={changePasswordMutation.isPending}
// //               className="bg-blue-600 hover:bg-blue-700"
// //             >
// //               {changePasswordMutation.isPending ? (
// //                 <>
// //                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
// //                   Changement...
// //                 </>
// //               ) : (
// //                 "Changer le mot de passe"
// //               )}
// //             </Button>
// //           </DialogFooter>
// //         </DialogContent>
// //       </Dialog>
// //     </div>
// //   )
// // }
// "use client"
// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Switch } from "@/components/ui/switch"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import { Mail, Shield, Download, Edit, Save, X, Calendar, Eye, EyeOff } from "lucide-react"
// import Sidebar from "@/components/sidebar"
// import { useRouter } from "next/navigation"
// import { useChangePasswordMutation, useProfile, useUpdateProfile } from "@/hooks"

// import { DocumentList } from "@/components/document-list"
// import { ProfilePhotoUpload } from "@/components/dashboard/profile-photo-upload"
// import { useUserFiles } from "@/hooks/uploads/use-upload-mutations"
// import jsPDF from "jspdf";

// export default function MonProfilUserPage() {
//   const router = useRouter()
//   const [isEditing, setIsEditing] = useState(false)
// const {data}=useUserFiles()
//   const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   })
//   const [showPasswords, setShowPasswords] = useState({
//     current: false,
//     new: false,
//     confirm: false,
//   })
//   const [passwordError, setPasswordError] = useState("")

//   // Hooks pour récupérer et mettre à jour le profil
//   const { data: profileData, isLoading, error, refetch } = useProfile()
//   const updateProfileMutation = useUpdateProfile()
//   const changePasswordMutation = useChangePasswordMutation()

//   // État local pour les modifications
//   const [editedData, setEditedData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     birthDate: "", // Format ISO 8601 pour l'API
//     birthPlace: "",
//     nationality: "",
//     city: "",
//   })

//   const [notifications, setNotifications] = useState({
//     email: true,
//     sms: false,
//     push: true,
//     newsletter: true,
//   })

//   // Fonction pour convertir une date ISO en format YYYY-MM-DD pour l'input date
//   const formatDateForInput = (isoDate) => {
//     if (!isoDate) return ""
//     try {
//       const date = new Date(isoDate)
//       return date.toISOString().split("T")[0] // Format YYYY-MM-DD
//     } catch (error) {
//       return ""
//     }
//   }

//   // Fonction pour convertir une date du format YYYY-MM-DD vers ISO 8601
//   const formatDateForAPI = (dateString) => {
//     if (!dateString) return ""
//     try {
//       const date = new Date(dateString + "T00:00:00.000Z")
//       return date.toISOString()
//     } catch (error) {
//       return ""
//     }
//   }

//   // Fonction pour afficher une date en format français
//   const formatDateForDisplay = (isoDate) => {
//     if (!isoDate) return ""
//     try {
//       const date = new Date(isoDate)
//       return date.toLocaleDateString("fr-FR")
//     } catch (error) {
//       return ""
//     }
//   }

//   // Mettre à jour les données locales quand le profil est chargé
//   useEffect(() => {
//     if (profileData) {
//       const formattedData = {
//         firstName: profileData.firstName || "",
//         lastName: profileData.lastName || "",
//         email: profileData.email || "",
//         phone: profileData.phone || "",
//         birthDate: profileData.birthDate || "",
//         birthPlace: profileData.birthPlace || "",
//         nationality: profileData.nationality || "",
//         city: profileData.city || "",
//       }
//       setEditedData(formattedData)
//     }
//   }, [profileData])

//   const handleEdit = () => {
//     setIsEditing(true)
//   }

//   const handleCancel = () => {
//     setIsEditing(false)
//     // Remettre les données originales
//     if (profileData) {
//       const formattedData = {
//         firstName: profileData.firstName || "",
//         lastName: profileData.lastName || "",
//         email: profileData.email || "",
//         phone: profileData.phone || "",
//         birthDate: profileData.birthDate || "",
//         birthPlace: profileData.birthPlace || "",
//         nationality: profileData.nationality || "",
//         city: profileData.city || "",
//       }
//       setEditedData(formattedData)
//     }
//   }

//   const handleSave = async () => {
//     try {
//       // Préparer les données pour l'API
//       const dataToSend = {
//         firstName: editedData.firstName,
//         lastName: editedData.lastName,
//         email: editedData.email,
//         phone: editedData.phone,
//         birthDate: editedData.birthDate ? editedData.birthDate.split("T")[0] : "",
//         birthPlace: editedData.birthPlace,
//         nationality: editedData.nationality,
//         city: editedData.city,
//       }

//       console.log("Données envoyées à l'API:", dataToSend)

//       await updateProfileMutation.mutateAsync(dataToSend)
//       setIsEditing(false)
//       refetch() // Recharger les données
//     } catch (error) {
//       console.error("Erreur lors de la sauvegarde:", error)
//     }
//   }

//   const handleNotificationChange = (key: string, value: boolean) => {
//     setNotifications((prev) => ({ ...prev, [key]: value }))
//     console.log(`Notification ${key} ${value ? "activée" : "désactivée"}`)
//   }



// // Si tu veux utiliser une vraie police Jakarta, tu dois l'importer en tant que ttf ou base64.
// // Pour l'exemple, on utilisera "helvetica" qui est similaire.
// // Avec jsPDF 2.x, tu peux ajouter une police custom via doc.addFileToVFS et doc.addFont.

// const handleDownloadData = () => {
//   if (!profileData) return;

//   const doc = new jsPDF();
//   const pageWidth = doc.internal.pageSize.getWidth();
//   let y = 20;

//   // ---- En-tête ----
//   doc.setFillColor(0, 123, 255); // bleu
//   doc.rect(0, 0, pageWidth, 20, "F"); // rectangle rempli en haut
//   doc.setTextColor(255, 255, 255); // texte blanc
//   doc.setFont("helvetica", "bold"); // remplacer par "Jakarta" si ajoutée
//   doc.setFontSize(18);
//   doc.text("Mes Données Personnelles", pageWidth / 2, 14, { align: "center" });

//   y += 10;

//   // ---- Corps du PDF ----
//   doc.setTextColor(0, 0, 0);
//   doc.setFontSize(12);

//   // Champs à exclure
//   const excludeFields = ["id", "idNumber", "isVerified"];

//   for (const [key, value] of Object.entries(profileData)) {
//     if (excludeFields.includes(key)) continue;

//     // Nom du champ en gras
//     doc.setFont("helvetica", "bold"); // remplacer par "Jakarta" si ajoutée
//     doc.text(`${key}:`, 10, y);

//     // Valeur en normal
//     doc.setFont("helvetica", "normal"); // remplacer par "Jakarta" si ajoutée
//     doc.text(String(value), 50, y);

//     y += 10;

//     // Gestion page suivante si besoin
//     if (y > 280) {
//       doc.addPage();
//       y = 20;
//     }
//   }

//   // ---- Pied de page ----
//   doc.setFontSize(10);
//   doc.setTextColor(100);
//   doc.text(
//     "Mise à jour le " + new Date().toLocaleString("fr-FR"),
//     pageWidth / 2,
//     290,
//     { align: "center" }
//   );

//   doc.save(profileData.firstName + " " + profileData.lastName + ".pdf");
// };


//   const handleChangePassword = () => {
//     setIsChangePasswordOpen(true)
//     setPasswordError("")
//     setPasswordData({
//       currentPassword: "",
//       newPassword: "",
//       confirmPassword: "",
//     })
//   }

//   const handlePasswordSubmit = async () => {
//     setPasswordError("")

//     // Validation
//     if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
//       setPasswordError("Tous les champs sont requis")
//       return
//     }

//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       setPasswordError("Les nouveaux mots de passe ne correspondent pas")
//       return
//     }

//     if (passwordData.newPassword.length < 8) {
//       setPasswordError("Le nouveau mot de passe doit contenir au moins 8 caractères")
//       return
//     }

//     if (passwordData.currentPassword === passwordData.newPassword) {
//       setPasswordError("Le nouveau mot de passe doit être différent de l'ancien")
//       return
//     }

//     try {
//       await changePasswordMutation.mutateAsync({
//         currentPassword: passwordData.currentPassword,
//         newPassword: passwordData.newPassword,
//       })

//       setIsChangePasswordOpen(false)
//       setPasswordData({
//         currentPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//       })

//       // Optionally show success message
//       console.log("Mot de passe changé avec succès")
//     } catch (error) {
//       setPasswordError("Erreur lors du changement de mot de passe. Vérifiez votre mot de passe actuel.")
//     }
//   }

//   const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
//     setShowPasswords((prev) => ({
//       ...prev,
//       [field]: !prev[field],
//     }))
//   }

//   // États de chargement et d'erreur
//   if (isLoading) {
//     return (
//       <div className="flex min-h-screen bg-gray-50">
//         <Sidebar />
//         <div className="flex-1 md:ml-64 flex items-center justify-center">
//           <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="flex min-h-screen bg-gray-50">
//         <Sidebar />
//         <div className="flex-1 md:ml-64 flex items-center justify-center">
//           <div className="text-center">
//             <p className="text-red-600 mb-4">Erreur lors du chargement du profil</p>
//             <Button onClick={() => refetch()}>Réessayer</Button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (!profileData) {
//     return (
//       <div className="flex min-h-screen bg-gray-50">
//         <Sidebar />
//         <div className="flex-1 md:ml-64 flex items-center justify-center">
//           <p>Aucune donnée de profil trouvée</p>
//         </div>
//       </div>
//     )
//   }

//   const fullName = `${profileData.firstName} ${profileData.lastName}`
//   const userInitials = `${profileData.firstName?.[0] || ""}${profileData.lastName?.[0] || ""}`.toUpperCase()

//   return (
//     <div className="flex min-h-screen bg-gray-50">
     
//       <div className="flex-1 p-4">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Mon profil</h1>
//             <p className="text-gray-600">Gérez vos informations personnelles et préférences</p>
//           </div>
//           <div className="flex gap-2">
//             <Button
//               variant="outline"
//               className="border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent transition-colors duration-200"
//               onClick={handleDownloadData}
//             >
//               <Download className="w-4 h-4 mr-2" />
//               Télécharger mes données
//             </Button>
//             {!isEditing ? (
//               <Button
//                 className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
//                 onClick={handleEdit}
//               >
//                 <Edit className="w-4 h-4 mr-2" />
//                 Modifier
//               </Button>
//             ) : (
//               <div className="flex gap-2">
//                 <Button
//                   variant="outline"
//                   className="border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent transition-colors duration-200"
//                   onClick={handleCancel}
//                   disabled={updateProfileMutation.isPending}
//                 >
//                   <X className="w-4 h-4 mr-2" />
//                   Annuler
//                 </Button>
//                 <Button
//                   className="bg-green-600 hover:bg-green-700 text-white transition-colors duration-200"
//                   onClick={handleSave}
//                   disabled={updateProfileMutation.isPending}
//                 >
//                   {updateProfileMutation.isPending ? (
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                   ) : (
//                     <Save className="w-4 h-4 mr-2" />
//                   )}
//                   Enregistrer
//                 </Button>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Photo de profil */}
//             <Card className="shadow-sm border-gray-200">
//               <CardHeader className="border-b border-gray-200">
//                 <CardTitle className="text-xl font-semibold text-gray-900">Photo de profil</CardTitle>
//               </CardHeader>
//               <CardContent className="p-6">
//                 <ProfilePhotoUpload
//                   currentPhotoUrl={data?.profilePhoto}
//                   userInitials={userInitials}
//                   onPhotoUpdated={() => refetch()}
//                 />
//               </CardContent>
//             </Card>

//             {/* Informations personnelles */}
//             <Card className="shadow-sm border-gray-200">
//               <CardHeader className="border-b border-gray-200 flex flex-row items-center justify-between">
//                 <CardTitle className="text-xl font-semibold text-gray-900">Informations personnelles</CardTitle>
//                 {!isEditing ? (
//                   <Button
//                     className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
//                     onClick={() => setIsEditing(true)}
//                   >
//                     <Edit className="w-4 h-4 mr-2" />
//                     Modifier
//                   </Button>
//                 ) : (
//                   <div className="flex gap-2">
//                     <Button
//                       variant="outline"
//                       onClick={() => setIsEditing(false)}
//                       disabled={updateProfileMutation.isPending}
//                     >
//                       <X className="w-4 h-4 mr-2" />
//                       Annuler
//                     </Button>
//                     <Button
//                       className="bg-green-600 hover:bg-green-700 text-white"
//                       onClick={handleSave}
//                       disabled={updateProfileMutation.isPending}
//                     >
//                       <Save className="w-4 h-4 mr-2" />
//                       Enregistrer
//                     </Button>
//                   </div>
//                 )}
//               </CardHeader>
//               <CardContent className="p-6">
//                 <div className="flex items-center gap-6 mb-6">
//                   <Avatar className="w-20 h-20 border-4 border-gray-200">
//                     <AvatarImage src={data?.profilePhoto || "/placeholder.svg"} />
//                     <AvatarFallback className="text-xl font-semibold bg-blue-100 text-blue-600">
//                       {userInitials}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-900">{fullName}</h3>
//                     <p className="text-gray-600">{profileData.city}</p>
//                     <Badge
//                       className={`mt-2 ${profileData.isVerified ? "bg-green-500 hover:bg-green-500" : "bg-yellow-500 hover:bg-yellow-500"} text-white`}
//                     >
//                       {profileData.isVerified ? "Compte vérifié" : "En attente de vérification"}
//                     </Badge>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-4">
//                     <div>
//                       <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
//                         Prénom
//                       </Label>
//                       {isEditing ? (
//                         <Input
//                           id="firstName"
//                           value={editedData.firstName}
//                           onChange={(e) => setEditedData((prev) => ({ ...prev, firstName: e.target.value }))}
//                           className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                         />
//                       ) : (
//                         <p className="mt-1 text-gray-900">{profileData.firstName}</p>
//                       )}
//                     </div>
//                     <div>
//                       <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
//                         Nom
//                       </Label>
//                       {isEditing ? (
//                         <Input
//                           id="lastName"
//                           value={editedData.lastName}
//                           onChange={(e) => setEditedData((prev) => ({ ...prev, lastName: e.target.value }))}
//                           className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                         />
//                       ) : (
//                         <p className="mt-1 text-gray-900">{profileData.lastName}</p>
//                       )}
//                     </div>
//                     <div>
//                       <Label htmlFor="email" className="text-sm font-medium text-gray-700">
//                         Adresse email
//                       </Label>
//                       {isEditing ? (
//                         <Input
//                           id="email"
//                           type="email"
//                           value={editedData.email}
//                           onChange={(e) => setEditedData((prev) => ({ ...prev, email: e.target.value }))}
//                           className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                         />
//                       ) : (
//                         <p className="mt-1 text-gray-900">{profileData.email}</p>
//                       )}
//                     </div>
//                     <div>
//                       <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
//                         Téléphone
//                       </Label>
//                       {isEditing ? (
//                         <Input
//                           id="phone"
//                           value={editedData.phone}
//                           onChange={(e) => setEditedData((prev) => ({ ...prev, phone: e.target.value }))}
//                           className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                         />
//                       ) : (
//                         <p className="mt-1 text-gray-900">{profileData.phone}</p>
//                       )}
//                     </div>
//                   </div>
//                   <div className="space-y-4">
//                     <div>
//                       <Label htmlFor="city" className="text-sm font-medium text-gray-700">
//                         Ville
//                       </Label>
//                       {isEditing ? (
//                         <Input
//                           id="city"
//                           value={editedData.city}
//                           onChange={(e) => setEditedData((prev) => ({ ...prev, city: e.target.value }))}
//                           className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                         />
//                       ) : (
//                         <p className="mt-1 text-gray-900">{profileData.city}</p>
//                       )}
//                     </div>
//                     <div>
//                       <Label htmlFor="birthPlace" className="text-sm font-medium text-gray-700">
//                         Lieu de naissance
//                       </Label>
//                       {isEditing ? (
//                         <Input
//                           id="birthPlace"
//                           value={editedData.birthPlace}
//                           onChange={(e) => setEditedData((prev) => ({ ...prev, birthPlace: e.target.value }))}
//                           className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                         />
//                       ) : (
//                         <p className="mt-1 text-gray-900">{profileData.birthPlace}</p>
//                       )}
//                     </div>
//                     <div>
//                       <Label htmlFor="birthDate" className="text-sm font-medium text-gray-700">
//                         Date de naissance
//                       </Label>
//                       {isEditing ? (
//                         <div className="relative mt-1">
//                           <Input
//                             id="birthDate"
//                             type="date"
//                             value={formatDateForInput(editedData.birthDate)}
//                             onChange={(e) => setEditedData((prev) => ({ ...prev, birthDate: e.target.value }))}
//                             className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-10"
//                           />
//                           <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//                         </div>
//                       ) : (
//                         <p className="mt-1 text-gray-900">{formatDateForDisplay(profileData.birthDate)}</p>
//                       )}
//                     </div>
//                     <div>
//                       <Label htmlFor="nationality" className="text-sm font-medium text-gray-700">
//                         Nationalité
//                       </Label>
//                       {isEditing ? (
//                         <Input
//                           id="nationality"
//                           value={editedData.nationality}
//                           onChange={(e) => setEditedData((prev) => ({ ...prev, nationality: e.target.value }))}
//                           className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                         />
//                       ) : (
//                         <p className="mt-1 text-gray-900">{profileData.nationality}</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Préférences de notification */}
//             <Card className="shadow-sm border-gray-200">
//               <CardHeader className="border-b border-gray-200">
//                 <CardTitle className="text-xl font-semibold text-gray-900">Préférences de notification</CardTitle>
//               </CardHeader>
//               <CardContent className="p-6">
//                 <div className="space-y-6">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <Mail className="w-5 h-5 text-gray-400" />
//                       <div>
//                         <p className="font-medium text-gray-900">Notifications par email</p>
//                         <p className="text-sm text-gray-500">Recevez les mises à jour par email</p>
//                       </div>
//                     </div>
//                     <Switch
//                       checked={notifications.email}
//                       onCheckedChange={(checked) => handleNotificationChange("email", checked)}
//                     />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Documents récents */}
//             <DocumentList showAll={false} canManage={true} maxItems={5} />

//             {/* Sécurité */}
//             <Card className="shadow-sm border-gray-200">
//               <CardHeader className="border-b border-gray-200">
//                 <CardTitle className="text-lg font-semibold text-gray-900">Sécurité</CardTitle>
//               </CardHeader>
//               <CardContent className="p-6">
//                 <div className="space-y-4">
//                   <Button
//                     variant="outline"
//                     className="w-full justify-start border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent transition-colors duration-200"
//                     onClick={handleChangePassword}
//                     disabled={changePasswordMutation.isPending}
//                   >
//                     <Shield className="w-4 h-4 mr-2" />
//                     Changer le mot de passe
//                   </Button>
//                   <div className="text-sm text-gray-500">
//                     <p className="font-medium mb-2">Informations du compte :</p>
//                     <p>Rôle: {profileData.role}</p>
//                     <p>Membre depuis: {new Date(profileData.createdAt).toLocaleDateString("fr-FR")}</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Zone de danger */}
//             <Card className="shadow-sm border-red-200">
//               <CardHeader className="border-b border-red-200">
//                 <CardTitle className="text-lg font-semibold text-red-600">Zone de danger</CardTitle>
//               </CardHeader>
//               <CardContent className="p-6">
//                 <div className="space-y-4">
//                   <p className="text-sm text-gray-600">
//                     La suppression de votre compte est irréversible. Toutes vos données seront perdues.
//                   </p>
//                   <Button
//                     variant="outline"
//                     className="w-full border-red-600 text-red-600 hover:bg-red-50 bg-transparent transition-colors duration-200"
//                     onClick={() => console.log("Suppression du compte demandée")}
//                   >
//                     Supprimer mon compte
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>

//       <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle className="flex items-center gap-2">
//               <Shield className="w-5 h-5 text-blue-600" />
//               Changer le mot de passe
//             </DialogTitle>
//             <DialogDescription>
//               Saisissez votre mot de passe actuel et choisissez un nouveau mot de passe sécurisé.
//             </DialogDescription>
//           </DialogHeader>

//           <div className="space-y-4 py-4">
//             {/* Current Password */}
//             <div className="space-y-2">
//               <Label htmlFor="currentPassword">Mot de passe actuel</Label>
//               <div className="relative">
//                 <Input
//                   id="currentPassword"
//                   type={showPasswords.current ? "text" : "password"}
//                   value={passwordData.currentPassword}
//                   onChange={(e) => setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))}
//                   className="pr-10"
//                   placeholder="Entrez votre mot de passe actuel"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => togglePasswordVisibility("current")}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                 </button>
//               </div>
//             </div>

//             {/* New Password */}
//             <div className="space-y-2">
//               <Label htmlFor="newPassword">Nouveau mot de passe</Label>
//               <div className="relative">
//                 <Input
//                   id="newPassword"
//                   type={showPasswords.new ? "text" : "password"}
//                   value={passwordData.newPassword}
//                   onChange={(e) => setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))}
//                   className="pr-10"
//                   placeholder="Entrez votre nouveau mot de passe"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => togglePasswordVisibility("new")}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                 </button>
//               </div>
//               <p className="text-xs text-gray-500">Le mot de passe doit contenir au moins 8 caractères</p>
//             </div>

//             {/* Confirm New Password */}
//             <div className="space-y-2">
//               <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
//               <div className="relative">
//                 <Input
//                   id="confirmPassword"
//                   type={showPasswords.confirm ? "text" : "password"}
//                   value={passwordData.confirmPassword}
//                   onChange={(e) => setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
//                   className="pr-10"
//                   placeholder="Confirmez votre nouveau mot de passe"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => togglePasswordVisibility("confirm")}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                 </button>
//               </div>
//             </div>

//             {/* Error Message */}
//             {passwordError && (
//               <div className="p-3 bg-red-50 border border-red-200 rounded-md">
//                 <p className="text-sm text-red-600">{passwordError}</p>
//               </div>
//             )}
//           </div>

//           <DialogFooter>
//             <Button
//               variant="outline"
//               onClick={() => setIsChangePasswordOpen(false)}
//               disabled={changePasswordMutation.isPending}
//             >
//               Annuler
//             </Button>
//             <Button
//               onClick={handlePasswordSubmit}
//               disabled={changePasswordMutation.isPending}
//               className="bg-blue-600 hover:bg-blue-700"
//             >
//               {changePasswordMutation.isPending ? (
//                 <>
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                   Changement...
//                 </>
//               ) : (
//                 "Changer le mot de passe"
//               )}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }



"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Mail,
  Shield,
  Download,
  Edit,
  Save,
  X,
  Calendar,
  Eye,
  EyeOff,
  User,
  MapPin,
  Phone,
  Globe,
  Star,
  Award,
  Clock,
  FileText,
  Settings,
  Sparkles,
} from "lucide-react"
import Sidebar from "@/components/sidebar"
import { useRouter } from "next/navigation"
import { useChangePasswordMutation, useProfile, useUpdateProfile } from "@/hooks"

import { DocumentList } from "@/components/document-list"
import { ProfilePhotoUpload } from "@/components/dashboard/profile-photo-upload"
import { useUserFiles } from "@/hooks/uploads/use-upload-mutations"
import jsPDF from "jspdf"
import { Bell } from "lucide-react"

export default function MonProfilUserPage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const { data } = useUserFiles()
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [passwordError, setPasswordError] = useState("")

  // Hooks pour récupérer et mettre à jour le profil
  const { data: profileData, isLoading, error, refetch } = useProfile()
  const updateProfileMutation = useUpdateProfile()
  const changePasswordMutation = useChangePasswordMutation()

  // État local pour les modifications
  const [editedData, setEditedData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    birthPlace: "",
    nationality: "",
    city: "",
  })

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    newsletter: true,
  })

  // Fonction pour convertir une date ISO en format YYYY-MM-DD pour l'input date
   //@ts-ignore
  const formatDateForInput = (isoDate) => {
    if (!isoDate) return ""
    try {
      const date = new Date(isoDate)
      return date.toISOString().split("T")[0] // Format YYYY-MM-DD
    } catch (error) {
      return ""
    }
  }

  // Fonction pour convertir une date du format YYYY-MM-DD vers ISO 8601
   //@ts-ignore
  const formatDateForAPI = (dateString) => {
    if (!dateString) return ""
    try {
      const date = new Date(dateString + "T00:00:00.000Z")
      return date.toISOString()
    } catch (error) {
      return ""
    }
  }

  // Fonction pour afficher une date en format français
   //@ts-ignore
  const formatDateForDisplay = (isoDate) => {
    if (!isoDate) return ""
    try {
      const date = new Date(isoDate)
      return date.toLocaleDateString("fr-FR")
    } catch (error) {
      return ""
    }
  }

  // Mettre à jour les données locales quand le profil est chargé
  useEffect(() => {
    if (profileData) {
      const formattedData = {
         //@ts-ignore
        firstName: profileData.firstName || "",
         //@ts-ignore
        lastName: profileData.lastName || "",
         //@ts-ignore
        email: profileData.email || "",
         //@ts-ignore
        phone: profileData.phone || "",
         //@ts-ignore
        birthDate: profileData.birthDate || "",
         //@ts-ignore
        birthPlace: profileData.birthPlace || "",
         //@ts-ignore
        nationality: profileData.nationality || "",
         //@ts-ignore
        city: profileData.city || "",
      }
      setEditedData(formattedData)
    }
  }, [profileData])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    if (profileData) {
      const formattedData = {
         //@ts-ignore
        firstName: profileData.firstName || "",
         //@ts-ignore
        lastName: profileData.lastName || "",
         //@ts-ignore
        email: profileData.email || "",
         //@ts-ignore
        phone: profileData.phone || "",
         //@ts-ignore
        birthDate: profileData.birthDate || "",
         //@ts-ignore
        birthPlace: profileData.birthPlace || "",
         //@ts-ignore
        nationality: profileData.nationality || "",
         //@ts-ignore
        city: profileData.city || "",
      }
      setEditedData(formattedData)
    }
  }

  const handleSave = async () => {
    try {
      const dataToSend = {
        firstName: editedData.firstName,
        lastName: editedData.lastName,
        email: editedData.email,
        phone: editedData.phone,
        birthDate: editedData.birthDate ? editedData.birthDate.split("T")[0] : "",
        birthPlace: editedData.birthPlace,
        nationality: editedData.nationality,
        city: editedData.city,
      }

      await updateProfileMutation.mutateAsync(dataToSend)
      setIsEditing(false)
      refetch()
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error)
    }
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  const handleDownloadData = () => {
    if (!profileData) return

    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    let y = 20

    doc.setFillColor(0, 123, 255)
    doc.rect(0, 0, pageWidth, 20, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFont("helvetica", "bold")
    doc.setFontSize(18)
    doc.text("Mes Données Personnelles", pageWidth / 2, 14, { align: "center" })

    y += 10

    doc.setTextColor(0, 0, 0)
    doc.setFontSize(12)

    const excludeFields = ["id", "idNumber", "isVerified"]

    for (const [key, value] of Object.entries(profileData)) {
      if (excludeFields.includes(key)) continue

      doc.setFont("helvetica", "bold")
      doc.text(`${key}:`, 10, y)

      doc.setFont("helvetica", "normal")
      doc.text(String(value), 50, y)

      y += 10

      if (y > 280) {
        doc.addPage()
        y = 20
      }
    }

    doc.setFontSize(10)
    doc.setTextColor(100)
    doc.text("Mise à jour le " + new Date().toLocaleString("fr-FR"), pageWidth / 2, 290, { align: "center" })
 //@ts-ignore
    doc.save(profileData.firstName + " " + profileData.lastName + ".pdf")
  }

  const handleChangePassword = () => {
    setIsChangePasswordOpen(true)
    setPasswordError("")
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  const handlePasswordSubmit = async () => {
    setPasswordError("")

    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError("Tous les champs sont requis")
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Les nouveaux mots de passe ne correspondent pas")
      return
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordError("Le nouveau mot de passe doit contenir au moins 8 caractères")
      return
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
      setPasswordError("Le nouveau mot de passe doit être différent de l'ancien")
      return
    }

    try {
      await changePasswordMutation.mutateAsync({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      })

      setIsChangePasswordOpen(false)
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      setPasswordError("Erreur lors du changement de mot de passe. Vérifiez votre mot de passe actuel.")
    }
  }

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  // États de chargement et d'erreur
  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
       
        <div className="flex-1  flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
        
        <div className="flex-1  flex items-center justify-center">
          <div className="text-center">
            <p className="text-destructive mb-4">Erreur lors du chargement du profil</p>
            <Button onClick={() => refetch()}>Réessayer</Button>
          </div>
        </div>
      </div>
    )
  }

  if (!profileData) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
        
        <div className="flex-1  flex items-center justify-center">
          <p>Aucune donnée de profil trouvée</p>
        </div>
      </div>
    )
  }
 //@ts-ignore
  const fullName = `${profileData.firstName} ${profileData.lastName}`
   //@ts-ignore
  const userInitials = `${profileData.firstName?.[0] || ""}${profileData.lastName?.[0] || ""}`.toUpperCase()

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
     

      <div className="flex-1  p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-primary via-secondary to-accent rounded-3xl border">
                <User className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">Mon Profil</h1>
                <p className="text-muted-foreground text-lg">Gérez vos informations personnelles et préférences</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-2 border-border/50 text-muted-foreground hover:bg-accent/10 bg-transparent transition-all duration-200 hover:scale-105 px-6 py-3 rounded-2xl shadow-lg"
              onClick={handleDownloadData}
            >
              <Download className="w-5 h-5 mr-2" />
              Télécharger mes données
            </Button>
            {!isEditing ? (
              <Button
                className="bg-gradient-to-r from-primary via-secondary to-accent hover:from-primary/90 hover:via-secondary/90 hover:to-accent/90 text-white transition-all duration-200 hover:scale-105 px-8 py-3 rounded-2xl shadow-xl"
                onClick={handleEdit}
              >
                <Edit className="w-5 h-5 mr-2" />
                Modifier
              </Button>
            ) : (
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="border-2 border-border/50 text-muted-foreground hover:bg-accent/10 bg-transparent transition-all duration-200 hover:scale-105 px-6 py-3 rounded-2xl"
                  onClick={handleCancel}
                  disabled={updateProfileMutation.isPending}
                >
                  <X className="w-5 h-5 mr-2" />
                  Annuler
                </Button>
                <Button
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white transition-all duration-200 hover:scale-105 px-8 py-3 rounded-2xl shadow-xl"
                  onClick={handleSave}
                  disabled={updateProfileMutation.isPending}
                >
                  {updateProfileMutation.isPending ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Save className="w-5 h-5 mr-2" />
                  )}
                  Enregistrer
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-8">
            {/* Profile Header Card */}
            <Card className="border bg-gradient-to-br from-card to-card/80 backdrop-blur-sm overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"></div>
              <CardContent className="relative p-8">
                <div className="flex items-center gap-8 mb-8">
                  <div className="relative">
                    <Avatar className="w-32 h-32 border-4 border-white shadow-2xl ring-4 ring-primary/20">
                      <AvatarImage src={ //@ts-ignore
                        data?.profilePhoto || "/placeholder.svg"} />
                      <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-primary to-secondary text-white">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 p-2 bg-gradient-to-br from-green-400 to-green-500 rounded-full shadow-lg">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-3xl font-bold text-foreground">{fullName}</h2>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-5 h-5" />
                      <span className="text-lg">{ //@ts-ignore
                      profileData.city}</span>
                    </div>
                    <div className="flex gap-3">
                      <Badge
                        className={`px-4 py-2 text-sm font-semibold ${
                         //@ts-ignore
                          profileData.isVerified
                            ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                            : "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg"
                        }`}
                      >
                        { //@ts-ignore
                        profileData.isVerified ? (
                          <>
                            <Award className="w-4 h-4 mr-2" />
                            Compte vérifié
                          </>
                        ) : (
                          <>
                            <Clock className="w-4 h-4 mr-2" />
                            En attente de vérification
                          </>
                        )}
                      </Badge>
                      <Badge variant="secondary" className="px-4 py-2 text-sm font-semibold bg-primary/10 text-primary">
                        <Star className="w-4 h-4 mr-2" />
                        { //@ts-ignore
                        profileData.role}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Photo Upload Section */}
                <div className="border-t border-border/20 pt-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Photo de profil
                  </h3>
                  <ProfilePhotoUpload
                    currentPhotoUrl={
                       //@ts-ignore
                      data?.profilePhoto}
                    userInitials={userInitials}
                    onPhotoUpdated={() => refetch()}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card className="border bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
              <CardHeader className="border-b border-border/20 bg-gradient-to-r from-primary/5 to-secondary/5">
                <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
                  <FileText className="w-6 h-6 text-primary" />
                  Informations personnelles
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="firstName"
                        className="text-sm font-semibold text-foreground flex items-center gap-2"
                      >
                        <User className="w-4 h-4" />
                        Prénom
                      </Label>
                      {isEditing ? (
                        <Input
                          id="firstName"
                          value={editedData.firstName}
                          onChange={(e) => setEditedData((prev) => ({ ...prev, firstName: e.target.value }))}
                          className="h-12 border-2 border-border/50 rounded-xl focus:border-primary focus:ring-primary/20 bg-background/50"
                        />
                      ) : (
                        <p className="text-lg font-medium text-foreground bg-muted/30 p-4 rounded-xl">
                          { //@ts-ignore
                          profileData.firstName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="lastName"
                        className="text-sm font-semibold text-foreground flex items-center gap-2"
                      >
                        <User className="w-4 h-4" />
                        Nom
                      </Label>
                      {isEditing ? (
                        <Input
                          id="lastName"
                          value={editedData.lastName}
                          onChange={(e) => setEditedData((prev) => ({ ...prev, lastName: e.target.value }))}
                          className="h-12 border-2 border-border/50 rounded-xl focus:border-primary focus:ring-primary/20 bg-background/50"
                        />
                      ) : (
                        <p className="text-lg font-medium text-foreground bg-muted/30 p-4 rounded-xl">
                          { //@ts-ignore
                          profileData.lastName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Adresse email
                      </Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={editedData.email}
                          onChange={(e) => setEditedData((prev) => ({ ...prev, email: e.target.value }))}
                          className="h-12 border-2 border-border/50 rounded-xl focus:border-primary focus:ring-primary/20 bg-background/50"
                        />
                      ) : (
                        <p className="text-lg font-medium text-foreground bg-muted/30 p-4 rounded-xl">
                          { //@ts-ignore
                          profileData.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Téléphone
                      </Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={editedData.phone}
                          onChange={(e) => setEditedData((prev) => ({ ...prev, phone: e.target.value }))}
                          className="h-12 border-2 border-border/50 rounded-xl focus:border-primary focus:ring-primary/20 bg-background/50"
                        />
                      ) : (
                        <p className="text-lg font-medium text-foreground bg-muted/30 p-4 rounded-xl">
                          { //@ts-ignore
                          profileData.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Ville
                      </Label>
                      {isEditing ? (
                        <Input
                          id="city"
                          value={editedData.city}
                          onChange={(e) => setEditedData((prev) => ({ ...prev, city: e.target.value }))}
                          className="h-12 border-2 border-border/50 rounded-xl focus:border-primary focus:ring-primary/20 bg-background/50"
                        />
                      ) : (
                        <p className="text-lg font-medium text-foreground bg-muted/30 p-4 rounded-xl">
                          { //@ts-ignore
                          profileData.city}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="birthPlace"
                        className="text-sm font-semibold text-foreground flex items-center gap-2"
                      >
                        <MapPin className="w-4 h-4" />
                        Lieu de naissance
                      </Label>
                      {isEditing ? (
                        <Input
                          id="birthPlace"
                          value={editedData.birthPlace}
                          onChange={(e) => setEditedData((prev) => ({ ...prev, birthPlace: e.target.value }))}
                          className="h-12 border-2 border-border/50 rounded-xl focus:border-primary focus:ring-primary/20 bg-background/50"
                        />
                      ) : (
                        <p className="text-lg font-medium text-foreground bg-muted/30 p-4 rounded-xl">
                          { //@ts-ignore
                          profileData.birthPlace}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="birthDate"
                        className="text-sm font-semibold text-foreground flex items-center gap-2"
                      >
                        <Calendar className="w-4 h-4" />
                        Date de naissance
                      </Label>
                      {isEditing ? (
                        <div className="relative">
                          <Input
                            id="birthDate"
                            type="date"
                            value={formatDateForInput(editedData.birthDate)}
                            onChange={(e) => setEditedData((prev) => ({ ...prev, birthDate: e.target.value }))}
                            className="h-12 border-2 border-border/50 rounded-xl focus:border-primary focus:ring-primary/20 bg-background/50 pr-12"
                          />
                          <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                        </div>
                      ) : (
                        <p className="text-lg font-medium text-foreground bg-muted/30 p-4 rounded-xl">
                          { //@ts-ignore
                          formatDateForDisplay(profileData.birthDate)}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="nationality"
                        className="text-sm font-semibold text-foreground flex items-center gap-2"
                      >
                        <Globe className="w-4 h-4" />
                        Nationalité
                      </Label>
                      {isEditing ? (
                        <Input
                          id="nationality"
                          value={editedData.nationality}
                          onChange={(e) => setEditedData((prev) => ({ ...prev, nationality: e.target.value }))}
                          className="h-12 border-2 border-border/50 rounded-xl focus:border-primary focus:ring-primary/20 bg-background/50"
                        />
                      ) : (
                        <p className="text-lg font-medium text-foreground bg-muted/30 p-4 rounded-xl">
                          { //@ts-ignore
                          profileData.nationality}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="border bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
              <CardHeader className="border-b border-border/20 bg-gradient-to-r from-primary/5 to-secondary/5">
                <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
                  <Bell className="w-6 h-6 text-primary" />
                  Préférences de notification
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-muted/20 to-muted/10 rounded-2xl border border-border/20">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg text-foreground">Notifications par email</p>
                        <p className="text-muted-foreground">Recevez les mises à jour importantes par email</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                      className="scale-125"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Documents récents */}
            <DocumentList showAll={false} canManage={true} maxItems={5} />

            {/* Security Card */}
            <Card className="border bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
              <CardHeader className="border-b border-primary/30 bg-gradient-to-r from-green-500/10 to-blue-500/10">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-3">
                  <Shield className="w-6 h-6 text-green-600" />
                  Sécurité
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <Button
                  variant="outline"
                  className="w-full justify-start border-2 border-primary/30 text-primary hover:bg-primary/10 bg-transparent transition-all duration-200 hover:scale-105 h-14 rounded-2xl "
                  onClick={handleChangePassword}
                  disabled={changePasswordMutation.isPending}
                >
                  <Shield className="w-5 h-5 mr-3" />
                  <span className="font-semibold">Changer le mot de passe</span>
                </Button>

                <div className="p-4 bg-gradient-to-r from-muted/20 to-muted/10 rounded-2xl border border-border/20">
                  <p className="font-semibold mb-3 text-foreground">Informations du compte</p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span>
                        Rôle: <span className="font-medium text-foreground">{
                           //@ts-ignore
                        profileData.role}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>
                        Membre depuis:{" "}
                        <span className="font-medium text-foreground">
                          { //@ts-ignore
                          new Date(profileData.createdAt).toLocaleDateString("fr-FR")}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/20 dark:to-red-900/20 backdrop-blur-sm">
              <CardHeader className="border-b border-red-200/50 bg-gradient-to-r from-red-500/10 to-red-600/10">
                <CardTitle className="text-xl font-bold text-red-600 flex items-center gap-3">
                  <X className="w-6 h-6" />
                  Zone de danger
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-sm text-muted-foreground">
                  La suppression de votre compte est irréversible. Toutes vos données seront perdues définitivement.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-2 border-red-500/50 text-red-600 hover:bg-red-50 bg-transparent transition-all duration-200 hover:scale-105 h-12 rounded-2xl"
                  onClick={() => console.log("Suppression du compte demandée")}
                >
                  <X className="w-5 h-5 mr-2" />
                  Supprimer mon compte
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Password Change Dialog */}
      <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl">
              <Shield className="w-6 h-6 text-primary" />
              Changer le mot de passe
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Saisissez votre mot de passe actuel et choisissez un nouveau mot de passe sécurisé.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="font-semibold">
                Mot de passe actuel
              </Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPasswords.current ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                  className="h-12 pr-12 border-2 border-border/50 rounded-xl focus:border-primary focus:ring-primary/20"
                  placeholder="Entrez votre mot de passe actuel"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("current")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="font-semibold">
                Nouveau mot de passe
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPasswords.new ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))}
                  className="h-12 pr-12 border-2 border-border/50 rounded-xl focus:border-primary focus:ring-primary/20"
                  placeholder="Entrez votre nouveau mot de passe"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("new")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">Le mot de passe doit contenir au moins 8 caractères</p>
            </div>

            {/* Confirm New Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="font-semibold">
                Confirmer le nouveau mot de passe
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPasswords.confirm ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                  className="h-12 pr-12 border-2 border-border/50 rounded-xl focus:border-primary focus:ring-primary/20"
                  placeholder="Confirmez votre nouveau mot de passe"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirm")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {passwordError && (
              <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                <p className="text-sm text-red-600 font-medium">{passwordError}</p>
              </div>
            )}
          </div>

          <DialogFooter className="gap-3">
            <Button
              variant="outline"
              onClick={() => setIsChangePasswordOpen(false)}
              disabled={changePasswordMutation.isPending}
              className="px-6 py-3 rounded-xl"
            >
              Annuler
            </Button>
            <Button
              onClick={handlePasswordSubmit}
              disabled={changePasswordMutation.isPending}
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 px-8 py-3 rounded-xl shadow-lg"
            >
              {changePasswordMutation.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Changement...
                </>
              ) : (
                "Changer le mot de passe"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
