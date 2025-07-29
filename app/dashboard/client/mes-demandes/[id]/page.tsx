"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Download, MessageSquare, FileText, User, Clock, CheckCircle, Check } from "lucide-react"
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
           
            size="sm"
            onClick={() => router.back()}
            className=" text-white hover:bg-primary text-lg p-2 bg-primary transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à mes demandes
          </Button>
         
        </div>
<div
  className="relative p-8 w-full text-center mb-6 bg-cover bg-center rounded-lg"
  style={{ backgroundImage: "url('/images/bg-demande.svg')" }}
>
  {/* Overlay sombre pour lisibilité */}
  <div className="absolute inset-0 bg-black/10 rounded-lg"></div>

  {/* Contenu au-dessus de l'overlay */}
  <div className="relative z-10">
    <h1 className="text-2xl md:text-5xl font-bold text-white">Détail de la demande</h1>
    <p className="text-gray-700">Numéro: {demande.numero}</p>
  </div>
</div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations générales */}
            <Card className="shadow-sm border-orange-400">

              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="">
                    <h4 className="font-bold text-orange-500 text-xl mb-3">Recaptulatif de la demande</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex gap-2 items-center">
                        <span className="text-primary text-lg">Type de demande:</span>
                        <span className="text-lg text-gray-500">{demande.type}</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <span className="text-primary text-lg">Date de depot :</span>
                        <span className="text-lg text-gray-500">{demande.dateEnvoi}</span>
                      </div>
                       <div className="flex gap-2 items-center">
                        <span className="text-primary text-lg">Numero de dossier :</span>
                        <span className="text-lg text-gray-500">{demande.numero}</span>
                      </div>
                       <div className="flex gap-2 items-center">
                        <span className="text-primary text-lg">Statut de la demande :</span>
                        <span className="text-lg text-secondary">{demande.statut}</span>
                      </div>
                      {demande.dateTraitement && (
                         <div className="flex gap-2 items-center">
                        <span className="text-black text-lg">Prochain etape :</span>
                        <span className="text-lg text-gray-700">Payement a effectuer</span> <span className="font-medium">{demande.dateTraitement}</span>
                      </div>
                      )}
                      <Button className="mt-3 text-lg text-white bg-secondary" variant="default" ><Download className="w-4 h-4 mr-2" />Telecharger toutes les pieces</Button>
                    </div>
                  </div>
                 
                </div>
               
              </CardContent>
            </Card>
               <Card className="shadow-sm border-orange-400">

              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="">
                    <h4 className="font-bold text-orange-500 text-xl mb-3">Futur epoux</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex gap-2 items-center">
                        <span className="text-primary text-lg">Conjoint 1 :</span>
                        <span className="text-lg text-gray-500">KOUASSI Jean-Cédric</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <span className="text-primary text-lg">Conjoint 2 :</span>
                        <span className="text-lg text-gray-500">KONE Mariam</span>
                      </div>
                       <div className="flex gap-2 items-center">
                        <span className="text-primary text-lg">Adresse Commune :</span>
                        <span className="text-lg text-gray-500">Abidjan</span>
                      </div>
                       <div className="flex gap-2 items-center">
                        <span className="text-primary text-lg">Telephone :</span>
                        <span className="text-lg text-secondary">+225 07 08 09 10</span>
                      </div>
                       <div className="flex gap-2 items-center">
                        <span className="text-primary text-lg">Email :</span>
                        <span className="text-lg text-secondary">LxI3o@example.com</span>
                      </div>
                      
                      
                    </div>
                  </div>
                 
                </div>
               
              </CardContent>
            </Card>
               <Card className="shadow-sm border-secondary">

              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="">
                    <h4 className="font-bold text-secondary text-xl mb-3">Piece jointe</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex gap-2 items-center">
                        <span className="text-gray-400 text-lg">Acte de naissance :</span>
                        <span className="text-lg text-gray-500"><Check className="w-5 h-5 text-gray-500" /></span>
                      </div>
                       <div className="flex gap-2 items-center">
                        <span className="text-gray-400 text-lg">Certificat de naissance :</span>
                        <span className="text-lg text-gray-500"><Check className="w-5 h-5 text-gray-500" /></span>
                      </div>
                       <div className="flex gap-2 items-center">
                        <span className="text-gray-400 text-lg">Acte de mariage :</span>
                        <span className="text-lg text-gray-500"><Check className="w-5 h-5 text-gray-500" /></span>
                      </div>
                       <div className="flex gap-2 items-center">
                        <span className="text-gray-400 text-lg">Certificat de mariage :</span>
                        <span className="text-lg text-gray-500"><Check className="w-5 h-5 text-gray-500" /></span>
                      </div>
                      <Button className="mt-3 text-lg text-white bg-secondary" variant="default" ><Download className="w-4 h-4 mr-2" />Telecharger toutes les pieces</Button>
                      
                    </div>
                  </div>
                 
                </div>
               
              </CardContent>
            </Card>
            {/* Documents */}
            {/* <Card className="shadow-sm border-gray-200">
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
            </Card> */}
            <Card className="shadow-sm border-orange-400">

              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="">
                    <h4 className="font-bold text-orange-500 text-xl mb-3">Details de la ceremonie</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex gap-2 items-center">
                        <span className="text-primary text-lg">Date demandee:</span>
                        <span className="text-lg text-primary">12 juillet 2024</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <span className="text-primary text-lg">Heure:</span>
                        <span className="text-lg text-primary">9h00</span>
                      </div>
                       <div className="flex gap-2 items-center">
                        <span className="text-primary text-lg">Lieu de la ceremonie :</span>
                        <span className="text-lg text-primary">Centre de mariage</span>
                      </div>
                       <div className="flex gap-2 items-center">
                        <span className="text-primary text-lg">Montant :</span>
                        <span className="text-lg text-primary">6832 FCFA</span>
                      </div>
                    
                      
                    </div>
                  </div>
                 
                </div>
               
              </CardContent>
            </Card>
            {/* Historique */}
          
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-6">
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="border-b border-gray-200 bg-primary rounded-t-lg">
                <CardTitle className="text-xl  text-white text-center font-bold">Historique / Suivi</CardTitle>
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
                         
                          <span className="text-sm text-gray-500">12 juillet 2024</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
