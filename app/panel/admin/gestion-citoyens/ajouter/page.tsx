"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function AjouterCitoyenPage() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    dateNaissance: "",
    lieuNaissance: "",
    adresse: "",
    profession: "",
    statut: "Actif",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Nouveau citoyen ajouté:", formData)
    // Ici vous ajouteriez la logique pour sauvegarder
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
          <Link href="/admin/gestion-citoyens" className="hover:text-blue-600">
            Gestion des citoyens
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900 font-medium">Ajouter un citoyen</span>
        </nav>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/admin/gestion-citoyens">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Ajouter un nouveau citoyen</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="shadow-sm border-gray-200">
          <CardHeader className="bg-blue-50 border-b border-blue-200">
            <CardTitle className="text-xl font-semibold text-blue-600">Informations personnelles</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                <Input
                  value={formData.nom}
                  onChange={(e) => handleInputChange("nom", e.target.value)}
                  placeholder="Nom de famille"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
                <Input
                  value={formData.prenom}
                  onChange={(e) => handleInputChange("prenom", e.target.value)}
                  placeholder="Prénom"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="adresse@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
                <Input
                  value={formData.telephone}
                  onChange={(e) => handleInputChange("telephone", e.target.value)}
                  placeholder="07 XX XX XX XX"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date de naissance</label>
                <Input
                  type="date"
                  value={formData.dateNaissance}
                  onChange={(e) => handleInputChange("dateNaissance", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lieu de naissance</label>
                <Input
                  value={formData.lieuNaissance}
                  onChange={(e) => handleInputChange("lieuNaissance", e.target.value)}
                  placeholder="Ville, Pays"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                <Input
                  value={formData.adresse}
                  onChange={(e) => handleInputChange("adresse", e.target.value)}
                  placeholder="Adresse complète"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Profession</label>
                <Input
                  value={formData.profession}
                  onChange={(e) => handleInputChange("profession", e.target.value)}
                  placeholder="Profession"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                <Select value={formData.statut} onValueChange={(value) => handleInputChange("statut", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Actif">Actif</SelectItem>
                    <SelectItem value="Inactif">Inactif</SelectItem>
                    <SelectItem value="Bloqué">Bloqué</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 mt-8">
          <Link href="/admin/gestion-citoyens">
            <Button variant="outline" className="border-gray-300 bg-transparent">
              Annuler
            </Button>
          </Link>
          <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
            <Save className="w-4 h-4 mr-2" />
            Enregistrer le citoyen
          </Button>
        </div>
      </form>
    </div>
  )
}
