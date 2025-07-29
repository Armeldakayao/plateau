"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, MapPin, Bell, Shield, Download, Edit, Save, X } from 'lucide-react'
import Sidebar from "@/components/sidebar"
import { useRouter } from "next/navigation"

export default function MonProfilPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [profileData, setProfileData] = useState({
    nom: "Awa Coulibaly",
    email: "awa.coulibaly@gmail.com",
    telephone: "+225 07 88 46 67 23",
    adresse: "Plateau Dokui, Abidjan",
    quartier: "Plateau Dokui",
    dateNaissance: "15/03/1985",
    profession: "Commerçante",
    situationMatrimoniale: "Mariée",
  })

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    newsletter: true,
  })

  const [editedData, setEditedData] = useState(profileData)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
   
    return () => clearTimeout(timer)
  }, [])

  const handleEdit = () => {
    setIsEditing(true)
    setEditedData(profileData)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedData(profileData)
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setProfileData(editedData)
      setIsEditing(false)
      setIsSaving(false)
      console.log("Profil mis à jour:", editedData)
    }, 2000)
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }))
    console.log(`Notification ${key} ${value ? 'activée' : 'désactivée'}`)
  }

  const handleDownloadData = () => {
    console.log("Téléchargement des données personnelles")
  }

  const handleChangePassword = () => {
    console.log("Changement de mot de passe")
  }

  const handleDeleteAccount = () => {
    console.log("Suppression du compte demandée")
  }

  const documents = [
    { nom: "Pièce d'identité", type: "CNI", dateExpiration: "15/03/2030", statut: "Valide" },
    { nom: "Justificatif de domicile", type: "Facture", dateExpiration: "15/01/2025", statut: "Valide" },
    { nom: "Extrait de naissance", type: "Acte", dateExpiration: "N/A", statut: "Valide" },
  ]

  const router = useRouter()

  if (isLoading) {
    // window.location.reload()
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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Mon profil</h1>
            <p className="text-gray-600">Gérez vos informations personnelles et préférences</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent transition-colors duration-200"
              onClick={handleDownloadData}
            >
              <Download className="w-4 h-4 mr-2" />
              Télécharger mes données
            </Button>
            {!isEditing ? (
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
                onClick={handleEdit}
              >
                <Edit className="w-4 h-4 mr-2" />
                Modifier
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent transition-colors duration-200"
                  onClick={handleCancel}
                  disabled={isSaving}
                >
                  <X className="w-4 h-4 mr-2" />
                  Annuler
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white transition-colors duration-200"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Enregistrer
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations personnelles */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="border-b border-gray-200">
                <CardTitle className="text-xl font-semibold text-gray-900">Informations personnelles</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center gap-6 mb-6">
                  <Avatar className="w-20 h-20 border-4 border-gray-200">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback className="text-xl font-semibold bg-blue-100 text-blue-600">
                      AC
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{profileData.nom}</h3>
                    <p className="text-gray-600">{profileData.profession}</p>
                    <Badge className="bg-green-500 text-white hover:bg-green-500 mt-2">
                      Compte vérifié
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="nom" className="text-sm font-medium text-gray-700">
                        Nom complet
                      </Label>
                      {isEditing ? (
                        <Input
                          id="nom"
                          value={editedData.nom}
                          onChange={(e) => setEditedData(prev => ({ ...prev, nom: e.target.value }))}
                          className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">{profileData.nom}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Adresse email
                      </Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={editedData.email}
                          onChange={(e) => setEditedData(prev => ({ ...prev, email: e.target.value }))}
                          className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">{profileData.email}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="telephone" className="text-sm font-medium text-gray-700">
                        Téléphone
                      </Label>
                      {isEditing ? (
                        <Input
                          id="telephone"
                          value={editedData.telephone}
                          onChange={(e) => setEditedData(prev => ({ ...prev, telephone: e.target.value }))}
                          className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">{profileData.telephone}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="profession" className="text-sm font-medium text-gray-700">
                        Profession
                      </Label>
                      {isEditing ? (
                        <Input
                          id="profession"
                          value={editedData.profession}
                          onChange={(e) => setEditedData(prev => ({ ...prev, profession: e.target.value }))}
                          className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">{profileData.profession}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="adresse" className="text-sm font-medium text-gray-700">
                        Adresse
                      </Label>
                      {isEditing ? (
                        <Input
                          id="adresse"
                          value={editedData.adresse}
                          onChange={(e) => setEditedData(prev => ({ ...prev, adresse: e.target.value }))}
                          className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">{profileData.adresse}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="quartier" className="text-sm font-medium text-gray-700">
                        Quartier
                      </Label>
                      {isEditing ? (
                        <Input
                          id="quartier"
                          value={editedData.quartier}
                          onChange={(e) => setEditedData(prev => ({ ...prev, quartier: e.target.value }))}
                          className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">{profileData.quartier}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="dateNaissance" className="text-sm font-medium text-gray-700">
                        Date de naissance
                      </Label>
                      <p className="mt-1 text-gray-900">{profileData.dateNaissance}</p>
                    </div>
                    <div>
                      <Label htmlFor="situationMatrimoniale" className="text-sm font-medium text-gray-700">
                        Situation matrimoniale
                      </Label>
                      {isEditing ? (
                        <Input
                          id="situationMatrimoniale"
                          value={editedData.situationMatrimoniale}
                          onChange={(e) => setEditedData(prev => ({ ...prev, situationMatrimoniale: e.target.value }))}
                          className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">{profileData.situationMatrimoniale}</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Préférences de notification */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="border-b border-gray-200">
                <CardTitle className="text-xl font-semibold text-gray-900">Préférences de notification</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">Notifications par email</p>
                        <p className="text-sm text-gray-500">Recevez les mises à jour par email</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                    />
                  </div>
                  <Separator />
                  {/* <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">Notifications SMS</p>
                        <p className="text-sm text-gray-500">Recevez les alertes importantes par SMS</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">Notifications push</p>
                        <p className="text-sm text-gray-500">Recevez les notifications dans votre navigateur</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">Newsletter</p>
                        <p className="text-sm text-gray-500">Recevez les actualités de la mairie</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.newsletter}
                      onCheckedChange={(checked) => handleNotificationChange('newsletter', checked)}
                    />
                  </div> */}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Documents */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="border-b border-gray-200">
                <CardTitle className="text-lg font-semibold text-gray-900">Mes documents</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {documents.map((doc, index) => (
                    <div key={index} className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-gray-900 text-sm">{doc.nom}</p>
                       <div className="flex items-center">
                         <Badge className="bg-green-500 text-white hover:bg-green-500 text-xs">
                          {doc.statut}
                        </Badge>
                        <Download className="w-4 h-4 text-gray-500 ml-2 cursor-pointer hover:text-blue-600 transition-colors duration-200" onClick={() => console.log(`Télécharger ${doc.nom}`)} />
                       </div>
                      </div>
                      <p className="text-xs text-gray-500">Type: {doc.type}</p>
                      <p className="text-xs text-gray-500">Expire: {doc.dateExpiration}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sécurité */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="border-b border-gray-200">
                <CardTitle className="text-lg font-semibold text-gray-900">Sécurité</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent transition-colors duration-200"
                    onClick={handleChangePassword}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Changer le mot de passe
                  </Button>
                  <div className="text-sm text-gray-500">
                    <p className="font-medium mb-2">Dernière connexion :</p>
                    <p>Aujourd'hui à 14:30</p>
                    <p>Adresse IP: 192.168.1.1</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Zone de danger */}
            <Card className="shadow-sm border-red-200">
              <CardHeader className="border-b border-red-200">
                <CardTitle className="text-lg font-semibold text-red-600">Zone de danger</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    La suppression de votre compte est irréversible. Toutes vos données seront perdues.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-red-600 text-red-600 hover:bg-red-50 bg-transparent transition-colors duration-200"
                    onClick={handleDeleteAccount}
                  >
                    Supprimer mon compte
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
