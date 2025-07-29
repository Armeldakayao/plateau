"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, X } from "lucide-react"
import Link from "next/link"

interface FormField {
  id: string
  intitule: string
  type: string
  obligatoire: boolean
  aideUtilisateur: string
}

interface Document {
  id: string
  nom: string
  type: string
  obligatoire: boolean
  aideUtilisateur: string
}

export default function AjouterServicePage() {
  const [showAddFieldModal, setShowAddFieldModal] = useState(false)
  const [showAddDocModal, setShowAddDocModal] = useState(false)
  const [formFields, setFormFields] = useState<FormField[]>([
    {
      id: "1",
      intitule: "Nom du demandeur",
      type: "Texte",
      obligatoire: true,
      aideUtilisateur: "Ex: +225700000000",
    },
    {
      id: "2",
      intitule: "Téléphone",
      type: "Numéro",
      obligatoire: true,
      aideUtilisateur: "Ex: +225700000000",
    },
  ])

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      nom: "CNI des deux conjoints",
      type: "PDF",
      obligatoire: true,
      aideUtilisateur: "Joindre recto + verso dans un seul fichier PDF seul",
    },
    {
      id: "2",
      nom: "Acte de naissance",
      type: "PDF & JPG",
      obligatoire: true,
      aideUtilisateur: "Documents attestant et devant dater de moins de 3 mois",
    },
  ])

  const AddFieldModal = () => {
    if (!showAddFieldModal) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="bg-blue-600 text-white">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Nouveau Champs</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-blue-700"
                onClick={() => setShowAddFieldModal(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom du Champs</label>
                <Input placeholder="Nom du champs" className="border-gray-300" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <Select>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue placeholder="Sélectionner le type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="texte">Texte</SelectItem>
                    <SelectItem value="numero">Numéro</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aide pour l'utilisateur</label>
                <Textarea placeholder="Saisir votre texte" className="border-gray-300" />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Obligatoire</span>
                <div className="flex gap-2">
                  <Badge className="bg-green-500 text-white hover:bg-green-500 cursor-pointer">Oui</Badge>
                  <Badge variant="outline" className="cursor-pointer">
                    Non
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                className="flex-1 border-red-300 text-red-600 bg-transparent"
                onClick={() => setShowAddFieldModal(false)}
              >
                Annuler
              </Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">Ajouter le Champs</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const AddDocumentModal = () => {
    if (!showAddDocModal) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="bg-blue-600 text-white">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Ajouter un document demandé</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-blue-700"
                onClick={() => setShowAddDocModal(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom du document</label>
                <Input placeholder="Nom du document" className="border-gray-300" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type accepté</label>
                <Select>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue placeholder="Sélectionner le type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="jpg">JPG</SelectItem>
                    <SelectItem value="png">PNG</SelectItem>
                    <SelectItem value="pdf-jpg">PDF & JPG</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aide pour l'utilisateur</label>
                <Textarea placeholder="Saisir votre texte" className="border-gray-300" />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Obligatoire</span>
                <div className="flex gap-2">
                  <Badge className="bg-green-500 text-white hover:bg-green-500 cursor-pointer">Oui</Badge>
                  <Badge variant="outline" className="cursor-pointer">
                    Non
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                className="flex-1 border-red-300 text-red-600 bg-transparent"
                onClick={() => setShowAddDocModal(false)}
              >
                Annuler
              </Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">Ajouter le document</Button>
            </div>
          </CardContent>
        </Card>
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
          <Link href="/admin/services-formulaires" className="hover:text-blue-600">
            Services & Formulaires
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900 font-medium">Ajout d'un nouveau service</span>
        </nav>
      </div>

      {/* Header */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 md:p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Ajout d'un nouveau service</h1>
          <div className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Service Espace Citoyen
            <br />
            Secrétaire Générale
          </div>
        </div>
      </div>

      <div className="max-w-6xl space-y-8">
        {/* Informations générales du service */}
        <Card className="shadow-sm border-gray-200">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-xl font-semibold text-gray-900">Informations générales du service</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom du service</label>
                <Input placeholder="Nom officiel du service (ex: mariage)" className="border-gray-300" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                <Select>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="etat-civil">État civil</SelectItem>
                    <SelectItem value="administration">Administration</SelectItem>
                    <SelectItem value="urbanisme">Urbanisme</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <Textarea
                  placeholder="Description détaillée du service proposé dans la commune de l'Plateau"
                  className="border-gray-300"
                  rows={3}
                />
              </div>
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Icône du (optionnel)</label>
                <Input placeholder="URL de l'icône ou nom" className="border-gray-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Détails et Conditions de la Demande */}
        <Card className="shadow-sm border-gray-200">
          <CardHeader className="bg-orange-50 border-b border-orange-200">
            <CardTitle className="text-xl font-semibold text-orange-600">Détails et Conditions de la Demande</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conditions ou informations importantes à connaître
              </label>
              <Textarea
                placeholder="La demande doit être déposée au moins 10 jours avant la date souhaitée..."
                className="border-gray-300"
                rows={6}
              />
            </div>
          </CardContent>
        </Card>

        {/* Champs du Formulaire Citoyen à créer */}
        <Card className="shadow-sm border-gray-200">
          <CardHeader className="border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="text-xl font-semibold text-gray-900">
                Champs du Formulaire Citoyen à créer
              </CardTitle>
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => setShowAddFieldModal(true)}
              >
                Ajouter un Champs
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="text-left py-3 px-4 md:px-6 font-semibold text-sm">Intitulé</th>
                    <th className="text-left py-3 px-4 md:px-6 font-semibold text-sm">Type de champ</th>
                    <th className="text-left py-3 px-4 md:px-6 font-semibold text-sm">Obligatoire</th>
                    <th className="text-left py-3 px-4 md:px-6 font-semibold text-sm">Aide utilisateur</th>
                  </tr>
                </thead>
                <tbody>
                  {formFields.map((field, index) => (
                    <tr key={field.id} className="border-b border-gray-100">
                      <td className="py-3 px-4 md:px-6 font-medium text-gray-900">{field.intitule}</td>
                      <td className="py-3 px-4 md:px-6 text-gray-600">{field.type}</td>
                      <td className="py-3 px-4 md:px-6">
                        {field.obligatoire ? (
                          <Badge className="bg-green-500 text-white hover:bg-green-500">Oui</Badge>
                        ) : (
                          <Badge variant="outline">Non</Badge>
                        )}
                      </td>
                      <td className="py-3 px-4 md:px-6 text-gray-600 text-sm">{field.aideUtilisateur}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Documents à fournir */}
        <Card className="shadow-sm border-gray-200">
          <CardHeader className="border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="text-xl font-semibold text-gray-900">Documents à fournir</CardTitle>
              <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => setShowAddDocModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un document demandé
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="text-left py-3 px-4 md:px-6 font-semibold text-sm">Nom du document</th>
                    <th className="text-left py-3 px-4 md:px-6 font-semibold text-sm">Type accepté</th>
                    <th className="text-left py-3 px-4 md:px-6 font-semibold text-sm">Obligatoire</th>
                    <th className="text-left py-3 px-4 md:px-6 font-semibold text-sm">Aide utilisateur</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc, index) => (
                    <tr key={doc.id} className="border-b border-gray-100">
                      <td className="py-3 px-4 md:px-6 font-medium text-gray-900">{doc.nom}</td>
                      <td className="py-3 px-4 md:px-6 text-gray-600">{doc.type}</td>
                      <td className="py-3 px-4 md:px-6">
                        {doc.obligatoire ? (
                          <Badge className="bg-green-500 text-white hover:bg-green-500">Oui</Badge>
                        ) : (
                          <Badge variant="outline">Non</Badge>
                        )}
                      </td>
                      <td className="py-3 px-4 md:px-6 text-gray-600 text-sm">{doc.aideUtilisateur}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Message de confirmation automatique */}
        <Card className="shadow-sm border-gray-200">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-xl font-semibold text-blue-600">Message de confirmation automatique</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message envoyé au citoyen</label>
              <Textarea
                placeholder="Bonjour, votre demande a bien été reçue. Vous recevrez une notification dès qu'elle sera traitée..."
                className="border-gray-300"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pb-8">
          <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent px-8">
            Annuler
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white px-8">Enregistrer le service et publier</Button>
        </div>
      </div>

      <AddFieldModal />
      <AddDocumentModal />
    </div>
  )
}
