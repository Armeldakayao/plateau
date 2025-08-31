"use client"

import { useState } from "react"
// import { useServiceRequests, useServiceRequestStatistics } from "@/hooks/use-service-requests"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Clock, FileText, Filter, Plus, Search, Users } from "lucide-react"
import type { ServiceRequestFilters } from "@/lib/types/service-request"
import Link from "next/link"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useServiceRequests } from "@/hooks"
import { useServiceRequestStatistics } from "@/hooks/services-requests/use-service-request"

const ETAT_OPTIONS = [
  { value: "en_attente", label: "En attente", color: "bg-yellow-100 text-yellow-800" },
  { value: "en_cours", label: "En cours", color: "bg-blue-100 text-blue-800" },
  { value: "validee", label: "Terminé", color: "bg-green-100 text-green-800" },
   { value: "termine", label: "Terminé", color: "bg-green-100 text-green-800" },
  { value: "annule", label: "Annulé", color: "bg-red-100 text-red-800" },
]

const TYPE_OPTIONS = [
  { value: "rdv", label: "Rendez-vous" },
  { value: "partenariat", label: "Partenariat" },
  { value: "mariage", label: "Mariage" },
]

const PRIORITE_OPTIONS = [
  { value: "basse", label: "Basse" },
  { value: "normale", label: "Normale" },
  { value: "haute", label: "Haute" },
  { value: "urgente", label: "Urgente" },
]

export default function AdminServiceRequestsPage() {
  const [filters, setFilters] = useState<ServiceRequestFilters>({
    page: 1,
    limit: 10,
     //@ts-ignore
    type: "",
     //@ts-ignore
    etat: "",
     //@ts-ignore
    priorite: "",
    search: "",
  })

  const { data: requests, isLoading } = useServiceRequests(filters)
  const { data: stats } = useServiceRequestStatistics()

  const updateFilter = (key: keyof ServiceRequestFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }))
  }

  const clearFilters = () => {
     //@ts-ignore
    setFilters({ page: 1, limit: 10, type: "", etat: "", priorite: "", search: "" })
  }

  const getEtatBadge = (etat: string) => {
    const option = ETAT_OPTIONS.find((opt) => opt.value === etat)
    return <Badge className={option?.color || "bg-gray-100 text-gray-800"}>{option?.label || etat}</Badge>
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Demandes</h1>
          <p className="text-muted-foreground">Gérez toutes les demandes de services des citoyens</p>
        </div>
        {/* <Button asChild>
          <Link href="/admin/service-requests/create">
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle demande
          </Link>
        </Button> */}
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border rounded-[10px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Demandes</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{
                 //@ts-ignore
              stats.general.total}</div>
            </CardContent>
          </Card>

          <Card className="border rounded-[10px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Retard</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{
                 //@ts-ignore
              stats.general.demandesEnRetard}</div>
            </CardContent>
          </Card>

          <Card className="border rounded-[10px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temps Moyen</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{
                 //@ts-ignore
              stats.traitements.tempsTraitementMoyen}h</div>
            </CardContent>
          </Card>

          {/* <Card className="border rounded-[10px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Agents Actifs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
            </CardContent>
          </Card> */}
        </div>
      )}

      {/* Filters */}
      <Card className="border rounded-[10px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtres
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                 //@ts-ignore
                value={filters.search || ""}
                 //@ts-ignore
                onChange={(e) => updateFilter("search", e.target.value)}
                className="pl-10"
              />
            </div>

            {/* <Select value={filters.type} onValueChange={(value) => updateFilter("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Type de demande" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les types</SelectItem>
                {TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.etat} onValueChange={(value) => updateFilter("etat", value)}>
              <SelectTrigger>
                <SelectValue placeholder="État" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les états</SelectItem>
                {ETAT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.priorite} onValueChange={(value) => updateFilter("priorite", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Priorité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Toutes les priorités</SelectItem>
                {PRIORITE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}

            <Button variant="outline" onClick={clearFilters}>
              Réinitialiser
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Requests Table */}
      <Card className="border rounded-[10px]">
        <CardHeader>
          <CardTitle>Liste des Demandes</CardTitle>
          <CardDescription>{
             //@ts-ignore
          requests?.total || 0} demande(s) trouvée(s)</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Référence</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Demandeur</TableHead>
                  <TableHead>État</TableHead>
                  {/* <TableHead>Priorité</TableHead> */}
                  <TableHead>Date limite</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests?.data?.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{
                       //@ts-ignore
                    request.numeroReference}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {TYPE_OPTIONS.find((t) => t.value === request.type)?.label || request.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          { //@ts-ignore
                          request.nom} {request.prenom}
                        </div>
                        <div className="text-sm text-muted-foreground">{
                           //@ts-ignore
                        request.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{ //@ts-ignore
                    getEtatBadge(request.traitements[0].etat || request.etat)}</TableCell>
                    {/* <TableCell>
                      <Badge variant={request.priorite === "urgente" ? "destructive" : "secondary"}>
                        {PRIORITE_OPTIONS.find((p) => p.value === request.priorite)?.label || request.priorite}
                      </Badge>
                    </TableCell> */}
                    <TableCell>
                      { //@ts-ignore
                      format(new Date(request.dateLimiteTraitement), "dd/MM/yyyy", { locale: fr })}
                    </TableCell>
                    <TableCell>
                      <Button className="rounded-[5px]" variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/admin/service-request/${request.id}`}>Voir détails</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
