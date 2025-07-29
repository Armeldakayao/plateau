"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download } from "lucide-react"
import Link from "next/link"

interface SuiviDemandeProps {
  params: { id: string }
}

export default function SuiviDemandePage({ params }: SuiviDemandeProps) {
  const demande = {
    id: params.id,
    type: "Demande de Mariage Civil",
    agent: "Adjé Bernadette - État civil",
    statut: "En cours",
    dateCreation: "12 juillet 2024",
    futursEpoux: [
      {
        nom: "KOUAME Jean-Cédric",
        dateNaissance: "12 mai 1987",
        lieuNaissance: "Abidjan",
        statut: "Célibataire",
        typeDocument: "Extrait d'acte de naissance",
        numeroDocument: "2024-2024-2472",
        dateDelivrance: "12/05/2024",
        lieuDelivrance: "Mairie du Plateau",
        nomPere: "KOUAME",
        nomMere: "KONE Mariam",
        lieuResidence: "Salle des mariages, Mairie du Plateau",
        adresseResidence: "Abidjan, Plateau, Rue de la République",
        profession: "Fonctionnaire",
      },
    ],
    piecesJointes: [
      { nom: "Acte de naissance", statut: "Approuvé", couleur: "green" },
      { nom: "Certificat de célibat", statut: "Approuvé", couleur: "green" },
      { nom: "Pièce d'identité (Passeport)", statut: "Approuvé", couleur: "green" },
      { nom: "Pièce d'identité (Carte)", statut: "Approuvé", couleur: "green" },
      { nom: "Certificat de capacité (Fonctionnel)", statut: "Approuvé", couleur: "green" },
      { nom: "Attestation (Signature Maire)", statut: "Approuvé", couleur: "green" },
    ],
    paiement: {
      statut: "Paiement confirmé (2€)",
      couleur: "orange",
    },
  }

  const getStatusBadge = (statut: string, couleur: string) => {
    const colorClasses = {
      green: "bg-green-500 text-white hover:bg-green-500",
      orange: "bg-orange-500 text-white hover:bg-orange-500",
      blue: "bg-blue-500 text-white hover:bg-blue-500",
    }

    return <Badge className={`${colorClasses[couleur as keyof typeof colorClasses]} px-3 py-1 text-xs`}>{statut}</Badge>
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="mb-6">
        <nav className="text-sm text-gray-600">
          <Link href="/admin" className="hover:text-blue-600">
            Tableau de bord
          </Link>
          <span className="mx-2">›</span>
          <Link href="/admin/gestion-demandes" className="hover:text-blue-600">
            Gestion des demandes
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900 font-medium">Détail d'une Demande de Mariage Civil</span>
        </nav>
      </div>

      {/* Header */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Détail d'une Demande de Mariage Civil</h1>
        <div className="flex items-center gap-4">
          <p className="text-gray-700">
            <span className="font-medium">Agent connecté :</span> {demande.agent}
          </p>
          <Button className="bg-green-600 hover:bg-green-700 text-white">Ajouter / Historique</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Informations sur le citoyen */}
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="text-xl font-semibold text-green-600">Informations sur le citoyen</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {demande.futursEpoux.map((epoux, index) => (
                <div key={index} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold text-gray-700 text-sm">Nom & Prénom</label>
                      <p className="text-gray-600">{epoux.nom}</p>
                    </div>
                    <div>
                      <label className="font-semibold text-gray-700 text-sm">Date de naissance</label>
                      <p className="text-gray-600">{epoux.dateNaissance}</p>
                    </div>
                    <div>
                      <label className="font-semibold text-gray-700 text-sm">Lieu de naissance</label>
                      <p className="text-gray-600">{epoux.lieuNaissance}</p>
                    </div>
                    <div>
                      <label className="font-semibold text-gray-700 text-sm">Statut actuel</label>
                      <p className="text-gray-600">{epoux.statut}</p>
                    </div>
                    <div>
                      <label className="font-semibold text-gray-700 text-sm">Type de document</label>
                      <p className="text-gray-600">{epoux.typeDocument}</p>
                    </div>
                    <div>
                      <label className="font-semibold text-gray-700 text-sm">N° de document</label>
                      <p className="text-gray-600">{epoux.numeroDocument}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Détails du rendez-vous */}
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="bg-orange-50 border-b border-orange-200">
              <CardTitle className="text-xl font-semibold text-orange-600">Détails du rendez-vous</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="font-semibold text-gray-700 text-sm">Service concerné</label>
                  <p className="text-gray-600">Célébration de mariage</p>
                </div>
                <div>
                  <label className="font-semibold text-gray-700 text-sm">Date du rendez-vous</label>
                  <p className="text-gray-600">Vendredi 30 juillet 2024</p>
                </div>
                <div>
                  <label className="font-semibold text-gray-700 text-sm">Heure</label>
                  <p className="text-gray-600">14h00 - 15h00</p>
                </div>
                <div>
                  <label className="font-semibold text-gray-700 text-sm">Lieu du rendez-vous</label>
                  <p className="text-gray-600">Salle des mariages, Mairie du Plateau</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Documents liés */}
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Documents liés <span className="text-sm font-normal">(si joint par le citoyen)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {demande.piecesJointes.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-900 text-sm">{doc.nom}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(doc.statut, doc.couleur)}
                      <Button variant="outline" size="sm" className="border-gray-300 bg-transparent">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white">
                Télécharger tous les fichiers
              </Button>
            </CardContent>
          </Card>

          {/* Paiement */}
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="bg-orange-50 border-b border-orange-200">
              <CardTitle className="text-lg font-semibold text-orange-600">Paiement</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <span className="font-medium text-gray-900">Total à payer : 500 000 FCFA</span>
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <span className="font-medium text-gray-900">Paiement par espèces uniquement</span>
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <span className="font-medium text-gray-900">Date limite : 15 septembre 2024</span>
                </div>
              </div>
              <div className="mt-4">{getStatusBadge(demande.paiement.statut, demande.paiement.couleur)}</div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Button className="bg-green-600 hover:bg-green-700 text-white">Valider et programmer</Button>
            <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent">
              Rejeter la demande
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
