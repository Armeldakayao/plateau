"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit } from "lucide-react"
import Link from "next/link"

export default function GestionCitoyensPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const citoyens = [
    {
      id: "1",
      nomPrenom: "Koffi Stephane",
      telephone: "07 88 46 67 23",
      dateInscription: "12/07/2024",
      statut: "Actif",
    },
    {
      id: "2",
      nomPrenom: "Alioune Mamadou",
      telephone: "07 88 46 67 23",
      dateInscription: "12/07/2024",
      statut: "Inactif",
    },
    {
      id: "3",
      nomPrenom: "Coulibaly Fatou",
      telephone: "07 88 46 67 23",
      dateInscription: "12/07/2024",
      statut: "Bloqué",
    },
    {
      id: "4",
      nomPrenom: "Alioune Mamadou",
      telephone: "07 88 46 67 23",
      dateInscription: "12/07/2024",
      statut: "Inactif",
    },
    {
      id: "5",
      nomPrenom: "Coulibaly Fatou",
      telephone: "07 88 46 67 23",
      dateInscription: "12/07/2024",
      statut: "Actif",
    },
  ]

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case "Actif":
        return <Badge className="bg-green-500 text-white hover:bg-green-500 px-3 py-1 text-xs">Actif</Badge>
      case "Inactif":
        return <Badge className="bg-red-500 text-white hover:bg-red-500 px-3 py-1 text-xs">Inactif</Badge>
      case "Bloqué":
        return <Badge className="bg-orange-500 text-white hover:bg-orange-500 px-3 py-1 text-xs">Bloqué</Badge>
      default:
        return <Badge variant="secondary">{statut}</Badge>
    }
  }

  const getActionButtons = (statut: string) => {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="border-blue-300 text-blue-600 bg-transparent">
          <Edit className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm" className="border-orange-300 text-orange-600 bg-transparent">
          Éditer
        </Button>
        {statut === "Actif" ? (
          <Button variant="outline" size="sm" className="border-red-300 text-red-600 bg-transparent">
            Bloquer
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="border-green-300 text-green-600 bg-transparent">
            Activer
          </Button>
        )}
      </div>
    )
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
          <span className="text-gray-900 font-medium">Gestion des citoyens</span>
        </nav>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Gestion des citoyens</h1>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Rechercher un citoyen</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Recherchez par nom, email, numéro de téléphone, et n°..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Filtrer par statut d'inscription</Button>
              <Button variant="outline" className="border-gray-300 bg-transparent">
                Filtrer par
              </Button>
              <Button variant="outline" className="border-gray-300 bg-transparent">
                Tri
              </Button>
            </div>
          </div>
        </div>

        {/* Add Citizen Button */}
        <div className="flex justify-end mb-6">
          <Link href="/admin/gestion-citoyens/ajouter">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter manuellement un citoyen
            </Button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-900">Liste des citoyens enregistrés</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Nom & Prénom</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Téléphone</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Date d'inscription</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Statut</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {citoyens.map((citoyen, index) => (
                <tr key={citoyen.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-900">{citoyen.nomPrenom}</td>
                  <td className="py-4 px-6 text-gray-600">{citoyen.telephone}</td>
                  <td className="py-4 px-6 text-gray-600">{citoyen.dateInscription}</td>
                  <td className="py-4 px-6">{getStatusBadge(citoyen.statut)}</td>
                  <td className="py-4 px-6">{getActionButtons(citoyen.statut)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-500">Précédent</div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-transparent">
              1
            </Button>
          </div>
          <div className="text-sm text-blue-600 cursor-pointer hover:text-blue-700">Précédent</div>
        </div>
      </div>
    </div>
  )
}
