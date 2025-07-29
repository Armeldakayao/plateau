"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

export default function GestionDemandesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const demandes = [
    {
      id: "1",
      nomPrenom: "Koffi Stephane",
      typeDemande: "Certificat de résidence",
      dateDemande: "28/07/2024",
      statut: "En cours",
    },
    {
      id: "2",
      nomPrenom: "Alioune Mamadou",
      typeDemande: "Extrait d'acte de naissance",
      dateDemande: "26/07/2024",
      statut: "Validé",
    },
    {
      id: "3",
      nomPrenom: "Coulibaly Fatou",
      typeDemande: "Attestation de domicile",
      dateDemande: "25/07/2024",
      statut: "Validé",
    },
  ]

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case "Validé":
        return <Badge className="bg-green-500 text-white hover:bg-green-500 px-3 py-1 text-xs">Validé</Badge>
      case "En cours":
        return <Badge className="bg-blue-500 text-white hover:bg-blue-500 px-3 py-1 text-xs">En cours</Badge>
      case "Refusé":
        return <Badge className="bg-red-500 text-white hover:bg-red-500 px-3 py-1 text-xs">Refusé</Badge>
      default:
        return <Badge variant="secondary">{statut}</Badge>
    }
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      {/* <div className="mb-6">
        <nav className="text-sm text-gray-600">
          <Link href="/admin" className="hover:text-blue-600">
            Tableau de bord
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900 font-medium">Suivi et traitement des demandes citoyennes</span>
        </nav>
      </div> */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-600 mb-7"><span className="text-primary">Suivi et traitement des</span> demandes citoyennes</h1>

        {/* Filters */}
        <div className="bg-primary text-white p-5 rounded-[10px] mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Type de demande</label>
              <Select>
                <SelectTrigger className="bg-white rounded-[7px] text-gray-900">
                  <SelectValue placeholder="Tous" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="certificat">Certificat</SelectItem>
                  <SelectItem value="attestation">Attestation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Statut</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-white rounded-[7px] text-gray-900">
                  <SelectValue placeholder="Tous" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="validé">Validé</SelectItem>
                  <SelectItem value="en-cours">En cours</SelectItem>
                  <SelectItem value="refusé">Refusé</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <Select>
                <SelectTrigger className="bg-white rounded-[7px] text-gray-900">
                  <SelectValue placeholder="Toutes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="today">Aujourd'hui</SelectItem>
                  <SelectItem value="week">Cette semaine</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Recherche par nom</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Nom du demandeur"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white text-gray-900"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Nom & Prénom</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Type de demande</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Date de demande</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Statut</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {demandes.map((demande, index) => (
                <tr key={demande.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-900">{demande.nomPrenom}</td>
                  <td className="py-4 px-6 text-gray-600">{demande.typeDemande}</td>
                  <td className="py-4 px-6 text-gray-600">{demande.dateDemande}</td>
                  <td className="py-4 px-6">{getStatusBadge(demande.statut)}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/gestion-demandes/${demande.id}`}>
                        <Button variant="outline" size="sm" className="border-gray-300 bg-transparent">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" className="border-orange-300 text-orange-600 bg-transparent">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-red-300 text-red-600 bg-transparent">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
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
          <div className="text-sm text-blue-600 cursor-pointer hover:text-blue-700">Suivant</div>
        </div>
      </div>
    </div>
  )
}
