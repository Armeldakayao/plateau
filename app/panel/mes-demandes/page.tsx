"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Search, Filter, Download, Plus, Calendar } from "lucide-react"
import Sidebar from "@/components/sidebar"

export default function MesDemandesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const demandes = [
    {
      id: "1",
      type: "Certificat de résidence",
      numero: "LMJ-5-007",
      statut: "Terminé",
      dateEnvoi: "20/05/2024",
      dateLimite: "27/05/2024",
      description: "Demande de certificat de résidence pour démarches administratives",
    },
    {
      id: "2",
      type: "Carte de commerçant",
      numero: "JAH-6-022",
      statut: "En cours",
      dateEnvoi: "12/04/2024",
      dateLimite: "19/04/2024",
      description: "Demande de carte de commerçant pour activité commerciale",
    },
    {
      id: "3",
      type: "Autorisation de domicile",
      numero: "DOM-3-015",
      statut: "En attente",
      dateEnvoi: "15/03/2024",
      dateLimite: "22/03/2024",
      description: "Autorisation de domicile pour nouvelle adresse",
    },
    {
      id: "4",
      type: "Extrait de naissance",
      numero: "NAI-2-008",
      statut: "Rejeté",
      dateEnvoi: "08/02/2024",
      dateLimite: "15/02/2024",
      description: "Demande d'extrait de naissance certifié",
    },
  ]

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case "Terminé":
        return <Badge className="bg-green-500 text-white hover:bg-green-500 px-3 py-1 text-xs">Terminé</Badge>
      case "En cours":
        return <Badge className="bg-blue-500 text-white hover:bg-blue-500 px-3 py-1 text-xs">En cours</Badge>
      case "En attente":
        return <Badge className="bg-orange-500 text-white hover:bg-orange-500 px-3 py-1 text-xs">En attente</Badge>
      case "Rejeté":
        return <Badge className="bg-red-500 text-white hover:bg-red-500 px-3 py-1 text-xs">Rejeté</Badge>
      default:
        return <Badge variant="secondary">{statut}</Badge>
    }
  }

  const filteredDemandes = demandes.filter((demande) => {
    const matchesSearch =
      demande.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      demande.numero.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || demande.statut === statusFilter
    const matchesType = typeFilter === "all" || demande.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const handleExport = () => {
    console.log("Export des demandes")
  }

  const handleNewDemande = () => {
    console.log("Nouvelle demande")
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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Mes demandes</h1>
            <p className="text-gray-600">Suivez l'état de vos demandes administratives</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent transition-colors duration-200"
              onClick={handleExport}
            >
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
              onClick={handleNewDemande}
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle demande
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
                  placeholder="Rechercher une demande..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="Terminé">Terminé</SelectItem>
                  <SelectItem value="En cours">En cours</SelectItem>
                  <SelectItem value="En attente">En attente</SelectItem>
                  <SelectItem value="Rejeté">Rejeté</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="Filtrer par type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="Certificat de résidence">Certificat de résidence</SelectItem>
                  <SelectItem value="Carte de commerçant">Carte de commerçant</SelectItem>
                  <SelectItem value="Autorisation de domicile">Autorisation de domicile</SelectItem>
                  <SelectItem value="Extrait de naissance">Extrait de naissance</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent transition-colors duration-200"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtres avancés
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Demandes List */}
        <Card className="shadow-sm border-gray-200">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-xl font-semibold text-gray-900">
              Liste des demandes ({filteredDemandes.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-4 md:px-6 font-semibold text-gray-700 text-sm">Type de demande</th>
                    <th className="text-left py-4 px-4 md:px-6 font-semibold text-gray-700 text-sm hidden sm:table-cell">
                      Numéro
                    </th>
                    <th className="text-left py-4 px-4 md:px-6 font-semibold text-gray-700 text-sm">Statut</th>
                    <th className="text-left py-4 px-4 md:px-6 font-semibold text-gray-700 text-sm hidden md:table-cell">
                      Date d'envoi
                    </th>
                    <th className="text-left py-4 px-4 md:px-6 font-semibold text-gray-700 text-sm hidden lg:table-cell">
                      Date limite
                    </th>
                    <th className="text-left py-4 px-4 md:px-6 font-semibold text-gray-700 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDemandes.map((demande) => (
                    <tr
                      key={demande.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="py-4 px-4 md:px-6">
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{demande.type}</p>
                          <p className="text-xs text-gray-500 mt-1 hidden sm:block">{demande.description}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 md:px-6 text-gray-600 text-sm hidden sm:table-cell font-mono">
                        {demande.numero}
                      </td>
                      <td className="py-4 px-4 md:px-6">{getStatusBadge(demande.statut)}</td>
                      <td className="py-4 px-4 md:px-6 text-gray-600 text-sm hidden md:table-cell">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {demande.dateEnvoi}
                        </div>
                      </td>
                      <td className="py-4 px-4 md:px-6 text-gray-600 text-sm hidden lg:table-cell">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {demande.dateLimite}
                        </div>
                      </td>
                      <td className="py-4 px-4 md:px-6">
                        <Link href={`/mes-demandes/${demande.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent transition-colors duration-200"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Voir
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredDemandes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">Aucune demande trouvée</p>
                <p className="text-gray-400 text-sm mb-6">Essayez de modifier vos critères de recherche</p>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
                  onClick={handleNewDemande}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Créer une nouvelle demande
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
