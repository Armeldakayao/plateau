// "use client"

// import type React from "react"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { z } from "zod"
// import { Upload, X } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

// const partenariatSchema = z.object({
//   organizationName: z.string().min(2, "Le nom de l'organisation est requis"),
//   organizationType: z.enum(
//     ["Entreprise privée", "ONG / Association", "Institution publique", "Organisation internationale", "Autre"],
//     {
//       required_error: "Veuillez sélectionner un type de structure.",
//     },
//   ),
//   otherOrganizationType: z.string().optional(),
//   activitySector: z.enum(
//     [
//       "Urbanisme / Habitat",
//       "Santé / Bien-être",
//       "Éducation / Formation",
//       "Environnement / Énergie",
//       "Digital / Innovation",
//       "Culture / Tourisme",
//       "Inclusion sociale",
//       "Autre",
//     ],
//     {
//       required_error: "Veuillez sélectionner un secteur d'activité.",
//     },
//   ),
//   otherActivitySector: z.string().optional(),
//   originCountry: z.string().min(2, "Le pays d'origine est requis"),
//   originCity: z.string().min(2, "La ville d'origine est requise"),
//   creationYear: z.string().min(4, "L'année de création est requise"),
//   website: z.string().url("URL invalide").optional().or(z.literal("")),
//   contactName: z.string().min(2, "Le nom du responsable est requis"),
//   contactFunction: z.string().min(2, "La fonction du responsable est requise"),
//   contactPhone: z.string().min(10, "Le numéro de téléphone est requis"),
//   contactEmail: z.string().email("Email professionnel invalide"),
//   partnershipNature: z.enum(
//     [
//       "Partenariat financier (sponsoring, mécénat…)",
//       "Partenariat technique (expertise, outils, technologie…)",
//       "Partenariat opérationnel (événement, projet terrain…)",
//       "Coopération institutionnelle",
//       "Appui logistique ou matériel",
//       "Autre",
//     ],
//     {
//       required_error: "Veuillez sélectionner la nature du partenariat.",
//     },
//   ),
//   otherPartnershipNature: z.string().optional(),
//   concernedService: z.enum(["État civil", "Tourisme", "Environnement", "Éducation", "Communication", "Smart City"], {
//     required_error: "Veuillez sélectionner un service concerné.",
//   }),
//   proposalDescription: z.string().min(10, "La description est trop courte").max(800, "La description est trop longue"),
//   mairieObjectives: z.string().min(10, "Les objectifs pour la mairie sont requis"),
//   structureObjectives: z.string().min(10, "Les objectifs pour votre structure sont requis"),
//   partnershipDuration: z.enum(
//     ["Ponctuel (événement ou action spécifique)", "Sur 6 mois", "Sur 12 mois", "Pluriannuel", "À discuter"],
//     {
//       required_error: "Veuillez sélectionner une durée de partenariat.",
//     },
//   ),
//   startDate: z.string().min(1, "La date de démarrage est requise"),
//   certifyAccuracy: z.boolean().refine((val) => val === true, {
//     message: "Vous devez certifier l'exactitude des informations.",
//   }),
//   authorizeContact: z.boolean().refine((val) => val === true, {
//     message: "Vous devez autoriser la mairie à vous contacter.",
//   }),
//   acknowledgeNoValidation: z.boolean().refine((val) => val === true, {
//     message: "Vous devez prendre connaissance de cette clause.",
//   }),
// })

// type PartenariatFormValues = z.infer<typeof partenariatSchema>

// interface PartenariatFormProps {
//   onSubmit: (data: PartenariatFormValues, files: File[]) => void
//   isSubmitting: boolean
//   files: File[]
//   handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
//   removeFile: (index: number) => void
// }

// export default function PartenariatForm({
//   onSubmit,
//   isSubmitting,
//   files,
//   handleFileUpload,
//   removeFile,
// }: PartenariatFormProps) {
//   const form = useForm<PartenariatFormValues>({
//     resolver: zodResolver(partenariatSchema),
//     defaultValues: {
//       organizationName: "",
//       organizationType: undefined,
//       otherOrganizationType: "",
//       activitySector: undefined,
//       otherActivitySector: "",
//       originCountry: "",
//       originCity: "",
//       creationYear: "",
//       website: "",
//       contactName: "",
//       contactFunction: "",
//       contactPhone: "",
//       contactEmail: "",
//       partnershipNature: undefined,
//       otherPartnershipNature: "",
//       concernedService: undefined,
//       proposalDescription: "",
//       mairieObjectives: "",
//       structureObjectives: "",
//       partnershipDuration: undefined,
//       startDate: "",
//       certifyAccuracy: false,
//       authorizeContact: false,
//       acknowledgeNoValidation: false,
//     },
//   })

//   const organizationType = form.watch("organizationType")
//   const activitySector = form.watch("activitySector")
//   const partnershipNature = form.watch("partnershipNature")

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit((data) => onSubmit(data, files))} className="space-y-6">
//         <h3 className="text-xl font-semibold text-gray-800 mb-4">Informations sur la structure demandeuse</h3>
//         <FormField
//           control={form.control}
//           name="organizationName"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Nom de l’organisation / entreprise / institution</FormLabel>
//               <FormControl>
//                 <Input placeholder="Nom de votre structure" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="organizationType"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Type de structure :</FormLabel>
//               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Sélectionnez un type" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   <SelectItem value="Entreprise privée">Entreprise privée</SelectItem>
//                   <SelectItem value="ONG / Association">ONG / Association</SelectItem>
//                   <SelectItem value="Institution publique">Institution publique</SelectItem>
//                   <SelectItem value="Organisation internationale">Organisation internationale</SelectItem>
//                   <SelectItem value="Autre">Autre :</SelectItem>
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         {organizationType === "Autre" && (
//           <FormField
//             control={form.control}
//             name="otherOrganizationType"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Précisez le type de structure</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Ex: Collectivité locale" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         )}
//         <FormField
//           control={form.control}
//           name="activitySector"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Secteur d’activité</FormLabel>
//               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Sélectionnez un secteur" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   <SelectItem value="Urbanisme / Habitat">Urbanisme / Habitat</SelectItem>
//                   <SelectItem value="Santé / Bien-être">Santé / Bien-être</SelectItem>
//                   <SelectItem value="Éducation / Formation">Éducation / Formation</SelectItem>
//                   <SelectItem value="Environnement / Énergie">Environnement / Énergie</SelectItem>
//                   <SelectItem value="Digital / Innovation">Digital / Innovation</SelectItem>
//                   <SelectItem value="Culture / Tourisme">Culture / Tourisme</SelectItem>
//                   <SelectItem value="Inclusion sociale">Inclusion sociale</SelectItem>
//                   <SelectItem value="Autre">Autre :</SelectItem>
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         {activitySector === "Autre" && (
//           <FormField
//             control={form.control}
//             name="otherActivitySector"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Précisez le secteur d'activité</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Ex: Agriculture" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         )}
//         <div className="grid md:grid-cols-2 gap-4">
//           <FormField
//             control={form.control}
//             name="originCountry"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Pays d’origine</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Pays" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="originCity"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Ville d’origine</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Ville" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         <FormField
//           control={form.control}
//           name="creationYear"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Année de création</FormLabel>
//               <FormControl>
//                 <Input type="number" placeholder="Ex: 2000" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="website"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Site web (ou page sociale)</FormLabel>
//               <FormControl>
//                 <Input placeholder="https://www.example.com" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="contactName"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Nom du responsable de la demande</FormLabel>
//               <FormControl>
//                 <Input placeholder="Nom et Prénom" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="contactFunction"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Fonction</FormLabel>
//               <FormControl>
//                 <Input placeholder="Ex: Directeur Général" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <div className="grid md:grid-cols-2 gap-4">
//           <FormField
//             control={form.control}
//             name="contactPhone"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Téléphone / WhatsApp</FormLabel>
//                 <FormControl>
//                   <Input type="tel" placeholder="0123456789" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="contactEmail"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email professionnel</FormLabel>
//                 <FormControl>
//                   <Input type="email" placeholder="contact@example.com" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <h3 className="text-xl font-semibold text-gray-800 mb-4 pt-6">Objet de la demande de partenariat</h3>
//         <FormField
//           control={form.control}
//           name="partnershipNature"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Nature du partenariat souhaité :</FormLabel>
//               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Sélectionnez la nature du partenariat" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   <SelectItem value="Partenariat financier (sponsoring, mécénat…)">
//                     Partenariat financier (sponsoring, mécénat…)
//                   </SelectItem>
//                   <SelectItem value="Partenariat technique (expertise, outils, technologie…)">
//                     Partenariat technique (expertise, outils, technologie…)
//                   </SelectItem>
//                   <SelectItem value="Partenariat opérationnel (événement, projet terrain…)">
//                     Partenariat opérationnel (événement, projet terrain…)
//                   </SelectItem>
//                   <SelectItem value="Coopération institutionnelle">Coopération institutionnelle</SelectItem>
//                   <SelectItem value="Appui logistique ou matériel">Appui logistique ou matériel</SelectItem>
//                   <SelectItem value="Autre">Autre :</SelectItem>
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         {partnershipNature === "Autre" && (
//           <FormField
//             control={form.control}
//             name="otherPartnershipNature"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Précisez la nature du partenariat</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Ex: Échange culturel" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         )}
//         <FormField
//           control={form.control}
//           name="concernedService"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Quel service ou direction de la mairie est concerné ?</FormLabel>
//               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Sélectionnez un service" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   <SelectItem value="État civil">État civil</SelectItem>
//                   <SelectItem value="Tourisme">Tourisme</SelectItem>
//                   <SelectItem value="Environnement">Environnement</SelectItem>
//                   <SelectItem value="Éducation">Éducation</SelectItem>
//                   <SelectItem value="Communication">Communication</SelectItem>
//                   <SelectItem value="Smart City">Smart City</SelectItem>
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="proposalDescription"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Description synthétique de la proposition (800 caractères max)</FormLabel>
//               <FormControl>
//                 <Textarea
//                   placeholder="Décrivez votre proposition de partenariat..."
//                   className="resize-none"
//                   maxLength={800}
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="mairieObjectives"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Objectifs visés pour la mairie</FormLabel>
//               <FormControl>
//                 <Textarea
//                   placeholder="Ex: Améliorer l'accès à l'éducation pour les jeunes"
//                   className="resize-none"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="structureObjectives"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Objectifs visés pour votre structure</FormLabel>
//               <FormControl>
//                 <Textarea
//                   placeholder="Ex: Développer notre visibilité et notre impact social"
//                   className="resize-none"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <div>
//           <Label className="text-base font-medium">Documents à joindre (obligatoires ou recommandés)</Label>
//           <div className="mt-2">
//             <div className="flex items-center justify-center w-full">
//               <label className="flex flex-col items-center justify-center w-full h-32 border border-gray-300 border-dashed rounded cursor-pointer hover:bg-gray-100">
//                 <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                   <Upload className="w-8 h-8 mb-4 text-gray-500" />
//                   <p className="mb-2 text-sm text-gray-500">
//                     <span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez
//                   </p>
//                   <p className="text-xs text-gray-500">PDF, JPG ou PNG (MAX. 5MB)</p>
//                 </div>
//                 <input
//                   type="file"
//                   className="hidden"
//                   multiple
//                   accept=".pdf,.jpg,.jpeg,.png,.ppt,.pptx"
//                   onChange={handleFileUpload}
//                 />
//               </label>
//             </div>
//             {files.length > 0 && (
//               <div className="mt-4">
//                 <h4 className="text-sm font-medium mb-2">Fichiers sélectionnés:</h4>
//                 <div className="space-y-2">
//                   {files.map((file, index) => (
//                     <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
//                       <span className="text-sm truncate max-w-xs">{file.name}</span>
//                       <Button
//                         type="button"
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => removeFile(index)}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         <X className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         <h3 className="text-xl font-semibold text-gray-800 mb-4 pt-6">Proposition de calendrier / durée</h3>
//         <FormField
//           control={form.control}
//           name="partnershipDuration"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Souhaitez-vous un partenariat :</FormLabel>
//               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Sélectionnez une durée" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   <SelectItem value="Ponctuel (événement ou action spécifique)">
//                     Ponctuel (événement ou action spécifique)
//                   </SelectItem>
//                   <SelectItem value="Sur 6 mois">Sur 6 mois</SelectItem>
//                   <SelectItem value="Sur 12 mois">Sur 12 mois</SelectItem>
//                   <SelectItem value="Pluriannuel">Pluriannuel</SelectItem>
//                   <SelectItem value="À discuter">À discuter</SelectItem>
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="startDate"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Date souhaitée de démarrage du partenariat :</FormLabel>
//               <FormControl>
//                 <Input type="date" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <h3 className="text-xl font-semibold text-gray-800 mb-4 pt-6">Engagements et validation</h3>
//         <FormField
//           control={form.control}
//           name="certifyAccuracy"
//           render={({ field }) => (
//             <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
//               <FormControl>
//                 <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//               </FormControl>
//               <div className="space-y-1 leading-none">
//                 <FormLabel>Je certifie que les informations fournies sont exactes et sincères</FormLabel>
//               </div>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="authorizeContact"
//           render={({ field }) => (
//             <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
//               <FormControl>
//                 <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//               </FormControl>
//               <div className="space-y-1 leading-none">
//                 <FormLabel>
//                   J’accepte que la Mairie du Plateau me contacte pour suite à donner à cette demande
//                 </FormLabel>
//               </div>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="acknowledgeNoValidation"
//           render={({ field }) => (
//             <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
//               <FormControl>
//                 <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//               </FormControl>
//               <div className="space-y-1 leading-none">
//                 <FormLabel>
//                   Je suis conscient(e) que cette demande ne vaut pas validation automatique du partenariat
//                 </FormLabel>
//               </div>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button
//           type="submit"
//           className="w-full bg-primary py-6 text-white text-lg rounded hover:bg-primary"
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? "Soumission en cours..." : "Soumettre ma demande"}
//         </Button>
//       </form>
//     </Form>
//   )
// }
"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Upload, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import {
  partenariatOrganizationSchema,
  partenariatContactSchema,
  partenariatDetailsSchema,
  partenariatCalendarSchema,
  partenariatValidationSchema,
  type PartenariatFormValues,
} from "@/lib/schemas"

interface PartenariatFormProps {
  onSubmit: (data: PartenariatFormValues, files: File[]) => void
  isSubmitting: boolean
  files: File[]
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  removeFile: (index: number) => void
}

export default function PartenariatForm({
  onSubmit,
  isSubmitting,
  files,
  handleFileUpload,
  removeFile,
}: PartenariatFormProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const form = useForm<PartenariatFormValues>({
    resolver: zodResolver(
      partenariatOrganizationSchema
        .merge(partenariatContactSchema)
        .merge(partenariatDetailsSchema)
        .merge(partenariatCalendarSchema)
        .merge(partenariatValidationSchema)
    ),
    defaultValues: {
      organizationName: "",
      organizationType: undefined,
      otherOrganizationType: "",
      activitySector: undefined,
      otherActivitySector: "",
      originCountry: "",
      originCity: "",
      creationYear: "",
      website: "",
      contactName: "",
      contactFunction: "",
      contactPhone: "",
      contactEmail: "",
      partnershipNature: undefined,
      otherPartnershipNature: "",
      concernedService: undefined,
      proposalDescription: "",
      mairieObjectives: "",
      structureObjectives: "",
      partnershipDuration: undefined,
      startDate: "",
      certifyAccuracy: false,
      authorizeContact: false,
      acknowledgeNoValidation: false,
    },
  })

  const organizationType = form.watch("organizationType")
  const activitySector = form.watch("activitySector")
  const partnershipNature = form.watch("partnershipNature")

  const handleNext = async () => {
    let isValid = false
    if (currentStep === 0) {
      isValid = await form.trigger(
        Object.keys(partenariatOrganizationSchema.shape) as (keyof PartenariatFormValues)[]

      )
    } else if (currentStep === 1) {
      isValid = await form.trigger(Object.keys(partenariatContactSchema.shape) as (keyof PartenariatFormValues)[])
    } else if (currentStep === 2) {
      isValid = await form.trigger(Object.keys(partenariatDetailsSchema.shape) as (keyof PartenariatFormValues)[])
    } else if (currentStep === 3) {
      isValid = await form.trigger(Object.keys(partenariatCalendarSchema.shape) as (keyof PartenariatFormValues)[])
    } else if (currentStep === 4) {
      isValid = await form.trigger(Object.keys(partenariatValidationSchema.shape) as (keyof PartenariatFormValues)[])
    }

    if (isValid) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleSubmitForm = (data: PartenariatFormValues) => {
    onSubmit(data, files)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-6">
        {currentStep === 0 && (
          <>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Informations sur la structure demandeuse</h3>
            <FormField
              control={form.control}
              name="organizationName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de l’organisation / entreprise / institution</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom de votre structure" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="organizationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de structure :</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Entreprise privée">Entreprise privée</SelectItem>
                      <SelectItem value="ONG / Association">ONG / Association</SelectItem>
                      <SelectItem value="Institution publique">Institution publique</SelectItem>
                      <SelectItem value="Organisation internationale">Organisation internationale</SelectItem>
                      <SelectItem value="Autre">Autre :</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {organizationType === "Autre" && (
              <FormField
                control={form.control}
                name="otherOrganizationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Précisez le type de structure</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Collectivité locale" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="activitySector"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secteur d’activité</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un secteur" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Urbanisme / Habitat">Urbanisme / Habitat</SelectItem>
                      <SelectItem value="Santé / Bien-être">Santé / Bien-être</SelectItem>
                      <SelectItem value="Éducation / Formation">Éducation / Formation</SelectItem>
                      <SelectItem value="Environnement / Énergie">Environnement / Énergie</SelectItem>
                      <SelectItem value="Digital / Innovation">Digital / Innovation</SelectItem>
                      <SelectItem value="Culture / Tourisme">Culture / Tourisme</SelectItem>
                      <SelectItem value="Inclusion sociale">Inclusion sociale</SelectItem>
                      <SelectItem value="Autre">Autre :</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {activitySector === "Autre" && (
              <FormField
                control={form.control}
                name="otherActivitySector"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Précisez le secteur d'activité</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Agriculture" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="originCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pays d’origine</FormLabel>
                    <FormControl>
                      <Input placeholder="Pays" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="originCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ville d’origine</FormLabel>
                    <FormControl>
                      <Input placeholder="Ville" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="creationYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Année de création</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Ex: 2000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site web (ou page sociale)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://www.example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {currentStep === 1 && (
          <>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 pt-6">Informations de contact</h3>
            <FormField
              control={form.control}
              name="contactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du responsable de la demande</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom et Prénom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactFunction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fonction</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Directeur Général" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone / WhatsApp</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="0123456789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email professionnel</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="contact@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 pt-6">Objet de la demande de partenariat</h3>
            <FormField
              control={form.control}
              name="partnershipNature"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nature du partenariat souhaité :</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez la nature du partenariat" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Partenariat financier (sponsoring, mécénat…)">
                        Partenariat financier (sponsoring, mécénat…)
                      </SelectItem>
                      <SelectItem value="Partenariat technique (expertise, outils, technologie…)">
                        Partenariat technique (expertise, outils, technologie…)
                      </SelectItem>
                      <SelectItem value="Partenariat opérationnel (événement, projet terrain…)">
                        Partenariat opérationnel (événement, projet terrain…)
                      </SelectItem>
                      <SelectItem value="Coopération institutionnelle">Coopération institutionnelle</SelectItem>
                      <SelectItem value="Appui logistique ou matériel">Appui logistique ou matériel</SelectItem>
                      <SelectItem value="Autre">Autre :</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {partnershipNature === "Autre" && (
              <FormField
                control={form.control}
                name="otherPartnershipNature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Précisez la nature du partenariat</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Échange culturel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="concernedService"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quel service ou direction de la mairie est concerné ?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="État civil">État civil</SelectItem>
                      <SelectItem value="Tourisme">Tourisme</SelectItem>
                      <SelectItem value="Environnement">Environnement</SelectItem>
                      <SelectItem value="Éducation">Éducation</SelectItem>
                      <SelectItem value="Communication">Communication</SelectItem>
                      <SelectItem value="Smart City">Smart City</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="proposalDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description synthétique de la proposition (800 caractères max)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Décrivez votre proposition de partenariat..."
                      className="resize-none"
                      maxLength={800}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mairieObjectives"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Objectifs visés pour la mairie</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ex: Améliorer l'accès à l'éducation pour les jeunes"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="structureObjectives"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Objectifs visés pour votre structure</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ex: Développer notre visibilité et notre impact social"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Label className="text-base font-medium">Documents à joindre (obligatoires ou recommandés)</Label>
              <div className="mt-2">
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border border-gray-300 border-dashed rounded cursor-pointer hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez
                      </p>
                      <p className="text-xs text-gray-500">PDF, JPG ou PNG (MAX. 5MB)</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.ppt,.pptx"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
                {files.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Fichiers sélectionnés:</h4>
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                          <span className="text-sm truncate max-w-xs">{file.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {currentStep === 3 && (
          <>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 pt-6">Proposition de calendrier / durée</h3>
            <FormField
              control={form.control}
              name="partnershipDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Souhaitez-vous un partenariat :</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une durée" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Ponctuel (événement ou action spécifique)">
                        Ponctuel (événement ou action spécifique)
                      </SelectItem>
                      <SelectItem value="Sur 6 mois">Sur 6 mois</SelectItem>
                      <SelectItem value="Sur 12 mois">Sur 12 mois</SelectItem>
                      <SelectItem value="Pluriannuel">Pluriannuel</SelectItem>
                      <SelectItem value="À discuter">À discuter</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date souhaitée de démarrage du partenariat :</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {currentStep === 4 && (
          <>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 pt-6">Engagements et validation</h3>
            <FormField
              control={form.control}
              name="certifyAccuracy"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Je certifie que les informations fournies sont exactes et sincères</FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="authorizeContact"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>J’accepte que la Mairie du Plateau me contacte pour suite à donner à cette demande</FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="acknowledgeNoValidation"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Je suis conscient(e) que cette demande ne vaut pas validation automatique du partenariat
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <div className="flex justify-between gap-4">
          {currentStep > 0 && (
            <Button type="button" variant="outline" onClick={handlePrevious} className="w-full">
              Précédent
            </Button>
          )}
          {currentStep < 4 ? (
            <Button type="button" onClick={handleNext} className="w-full">
              Suivant
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-primary py-6 text-white text-lg rounded hover:bg-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Soumission en cours..." : "Soumettre ma demande"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}
