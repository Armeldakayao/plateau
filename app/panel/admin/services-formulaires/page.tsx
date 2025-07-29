"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Edit, Filter } from "lucide-react"
import Link from "next/link"

export default function ServicesFormulairesPage() {
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const services = [
    {
      id: "1",
      nom: "Demande de célébration de mariage",
      categorie: "État civil",
      dateCreation: "12/07/2024",
      statut: "Activé",
    },
    {
      id: "2",
      nom: "Demande de certificat de résidence",
      categorie: "Administration",
      dateCreation: "15/07/2024",
      statut: "Désactivé",
    },
    {
      id: "3",
      nom: "Demande de certificat de mariage",
      categorie: "État civil",
      dateCreation: "18/07/2024",
      statut: "Activé",
    },
    {
      id: "4",
      nom: "Demande de certificat de résidence",
      categorie: "Administration",
      dateCreation: "20/07/2024",
      statut: "Désactivé",
    },
  ]

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case "Activé":
        return <Badge className="bg-green-500 text-white hover:bg-green-500 px-3 py-1 text-xs">Activé</Badge>
      case "Désactivé":
        return <Badge className="bg-red-500 text-white hover:bg-red-500 px-3 py-1 text-xs">Désactivé</Badge>
      default:
        return <Badge variant="secondary">{statut}</Badge>
    }
  }

  const getActionButtons = (statut: string) => {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="border-blue-300 text-blue-600 bg-transparent">
          Modifier
        </Button>
        <Button variant="outline" size="sm" className="border-orange-300 text-orange-600 bg-transparent">
          <Edit className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm" className="border-red-300 text-red-600 bg-transparent">
          Supprimer
        </Button>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="mb-6">
        <nav className="text-sm text-gray-600">
          <Link href="/admin" className="hover:text-blue-600">
            Tableau de bord
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900 font-medium">Services & Formulaires</span>
        </nav>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Services & Formulaires</h1>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-600" />
                <Filter className="w-5 h-5 text-gray-400" />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="etat-civil">État civil</SelectItem>
                  <SelectItem value="administration">Administration</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="active">Activé</SelectItem>
                  <SelectItem value="inactive">Désactivé</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-gray-300 bg-transparent">
                Trier par
              </Button>
            </div>
          </div>
        </div>

        {/* Add Service Button */}
        <div className="flex justify-end mb-6">
          <Link href="/admin/services-formulaires/ajouter">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un nouveau service
            </Button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-900">Liste des services & formulaires</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-4 md:px-6 font-semibold text-gray-700 text-sm">Nom du service</th>
                <th className="text-left py-4 px-4 md:px-6 font-semibold text-gray-700 text-sm">Catégorie</th>
                <th className="text-left py-4 px-4 md:px-6 font-semibold text-gray-700 text-sm">Date création</th>
                <th className="text-left py-4 px-4 md:px-6 font-semibold text-gray-700 text-sm">Statut</th>
                <th className="text-left py-4 px-4 md:px-6 font-semibold text-gray-700 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={service.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 md:px-6 font-medium text-gray-900">{service.nom}</td>
                  <td className="py-4 px-4 md:px-6 text-gray-600">{service.categorie}</td>
                  <td className="py-4 px-4 md:px-6 text-gray-600">{service.dateCreation}</td>
                  <td className="py-4 px-4 md:px-6">{getStatusBadge(service.statut)}</td>
                  <td className="py-4 px-4 md:px-6">{getActionButtons(service.statut)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 md:px-6 py-4 border-t border-gray-200 bg-gray-50">
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
