"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Download, MessageSquare, FileText, User, Clock, CheckCircle } from "lucide-react"
import Sidebar from "@/components/sidebar"

export default function DetailDemandePage() {
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Mock data - in real app, fetch based on params.id
  const demande = {
    id: params.id,
    type: "Certificat de résidence",
    numero: "LMJ-5-007",
    statut: "Terminé",
    dateEnvoi: "20/05/2024",
    dateLimite: "27/05/2024",
    dateTraitement: "25/05/2024",
    description: "Demande de certificat de résidence pour démarches administratives auprès de la banque",
    demandeur: {
      nom: "Awa Coulibaly",
      email: "awa.coulibaly@gmail.com",
      telephone: "+225 07 88 46 67 23",
      adresse: "Plateau Dokui, Abidjan",
    },
    documents: [
      { nom: "Pièce d'identité", statut: "Validé", date: "20/05/2024" },
      { nom: "Justificatif de domicile", statut: "Validé", date: "20/05/2024" },
      { nom: "Formulaire de demande", statut: "Validé", date: "20/05/2024" },
    ],
    historique: [
      { date: "25/05/2024", action: "Demande traitée et approuvée", statut: "Terminé", agent: "Marie Kouassi" },
      { date: "22/05/2024", action: "Documents vérifiés", statut: "En cours", agent: "Jean Koffi" },
      { date: "20/05/2024", action: "Demande soumise", statut: "En attente", agent: "Système" },
    ],
  }

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case "Terminé":
        return <Badge className="bg-green-500 text-white hover:bg-green-500 px-3 py-1">Terminé</Badge>
      case "En cours":
        return <Badge className="bg-blue-500 text-white hover:bg-blue-500 px-3 py-1">En cours</Badge>
      case "En attente":
        return <Badge className="bg-orange-500 text-white hover:bg-orange-500 px-3 py-1">En attente</Badge>
      case "Rejeté":
        return <Badge className="bg-red-500 text-white hover:bg-red-500 px-3 py-1">Rejeté</Badge>
      default:
        return <Badge variant="secondary">{statut}</Badge>
    }
  }

  const handleDownload = () => {
    console.log("Téléchargement du certificat")
  }

  const handleContact = () => {
    console.log("Contacter le service")
  }

  const handlePrintReceipt = () => {
    console.log("Imprimer le reçu")
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
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Détail de la demande</h1>
            <p className="text-gray-600">Numéro: {demande.numero}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations générales */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="border-b border-gray-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <CardTitle className="text-xl font-semibold text-gray-900">{demande.type}</CardTitle>
                  {getStatusBadge(demande.statut)}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Informations de la demande</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date d'envoi:</span>
                        <span className="font-medium">{demande.dateEnvoi}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date limite:</span>
                        <span className="font-medium">{demande.dateLimite}</span>
                      </div>
                      {demande.dateTraitement && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date de traitement:</span>
                          <span className="font-medium text-green-600">{demande.dateTraitement}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Demandeur</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span>{demande.demandeur.nom}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Email:</span>
                        <span>{demande.demandeur.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Téléphone:</span>
                        <span>{demande.demandeur.telephone}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Separator className="my-6" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Description</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{demande.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="border-b border-gray-200">
                <CardTitle className="text-xl font-semibold text-gray-900">Documents fournis</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {demande.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="font-medium text-gray-900">{doc.nom}</p>
                          <p className="text-sm text-gray-500">Soumis le {doc.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-green-500 text-white hover:bg-green-500 px-2 py-1 text-xs">
                          {doc.statut}
                        </Badge>
                        <Button variant="outline" size="sm" className="border-gray-300 bg-transparent hover:bg-gray-50">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Historique */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="border-b border-gray-200">
                <CardTitle className="text-xl font-semibold text-gray-900">Historique de traitement</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {demande.historique.map((etape, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {index === 0 ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Clock className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900">{etape.action}</p>
                          <span className="text-sm text-gray-500">{etape.date}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          {getStatusBadge(etape.statut)}
                          <span className="text-sm text-gray-500">par {etape.agent}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-6">
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="border-b border-gray-200">
                <CardTitle className="text-lg font-semibold text-gray-900">Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {demande.statut === "Terminé" && (
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors duration-200"
                      onClick={handleDownload}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger le certificat
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent transition-colors duration-200"
                    onClick={handleContact}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contacter le service
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent transition-colors duration-200"
                    onClick={handlePrintReceipt}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Imprimer le reçu
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Informations de contact */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="border-b border-gray-200">
                <CardTitle className="text-lg font-semibold text-gray-900">Besoin d'aide ?</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-900 mb-1">Service État Civil</p>
                    <p className="text-gray-600">+225 27 20 21 22 23</p>
                    <p className="text-gray-600">etatcivil@plateau.ci</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-1">Horaires d'ouverture</p>
                    <p className="text-gray-600">Lun - Ven: 8h00 - 16h00</p>
                    <p className="text-gray-600">Sam: 8h00 - 12h00</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
