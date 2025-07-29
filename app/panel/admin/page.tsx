"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Eye } from "lucide-react"
import Link from "next/link"

export default function AdminDashboardPage() {
  const stats = [
    { label: "Demandes en attente", value: "42", color: "bg-blue-500" },
    { label: "Demandes traitées", value: "12", color: "bg-green-500" },
    { label: "RDV aujourd'hui", value: "24", color: "bg-orange-500" },
  ]

  const dernieresDemandes = [
    {
      id: "1",
      demandeur: "Koffi Stephane",
      type: "Certificat de résidence",
      date: "28/07/2024",
      statut: "En cours",
    },
    {
      id: "2",
      demandeur: "Alioune Mamadou",
      type: "Résidence",
      date: "26/07/2024",
      statut: "Nouveau",
    },
    {
      id: "3",
      demandeur: "Coulibaly Fatou",
      type: "Autorisation de domicile",
      date: "26/07/2024",
      statut: "Validé",
    },
  ]

  const rendezVousJour = [
    {
      id: "1",
      heure: "09h00 - 10h 14mn",
      description: "Autorisation mariage",
    },
    {
      id: "2",
      heure: "10h15 - 11h Mercredi 7",
      description: "Demande manuel de résidence",
    },
  ]

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case "Validé":
        return <Badge className="bg-green-500 text-white hover:bg-green-500 px-3 py-1 text-xs">Validé</Badge>
      case "En cours":
        return <Badge className="bg-blue-500 text-white hover:bg-blue-500 px-3 py-1 text-xs">En cours</Badge>
      case "Nouveau":
        return <Badge className="bg-orange-500 text-white hover:bg-orange-500 px-3 py-1 text-xs">Nouveau</Badge>
      default:
        return <Badge variant="secondary">{statut}</Badge>
    }
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Bonjour, Mme Akoua</h2>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-sm border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <span className="text-white font-bold text-xl">{stat.value}</span>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Dernières demandes reçues */}
        <Card className="shadow-sm border-gray-200">
          <CardHeader className="border-b border-gray-200">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-gray-900">Dernières demandes reçues</CardTitle>
              <Link href="/admin/gestion-demandes" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Voir toutes les demandes
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm">Demandeur</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm">Type de demande</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm">Date de demande</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm">Statut</th>
                    <th className="w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {dernieresDemandes.map((demande, index) => (
                    <tr key={demande.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6 font-medium text-gray-900">{demande.demandeur}</td>
                      <td className="py-4 px-6 text-gray-600">{demande.type}</td>
                      <td className="py-4 px-6 text-gray-600">{demande.date}</td>
                      <td className="py-4 px-6">{getStatusBadge(demande.statut)}</td>
                      <td className="py-4 px-6">
                        <Link href={`/admin/gestion-demandes/${demande.id}`}>
                          <Button variant="outline" size="sm" className="border-gray-300 bg-transparent text-sm">
                            Voir
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Rendez-vous du jour */}
        <Card className="shadow-sm border-gray-200">
          <CardHeader className="border-b border-gray-200">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-gray-900">Rendez-vous du jour</CardTitle>
              <Link href="/admin/rendez-vous" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Voir tous les rendez-vous
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {rendezVousJour.map((rdv) => (
                <div key={rdv.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{rdv.heure}</p>
                    <p className="text-sm text-gray-600">{rdv.description}</p>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Voir détails
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
