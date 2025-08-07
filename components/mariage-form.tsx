// "use client"

// import type React from "react"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { z } from "zod"
// import { Upload, X } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

// const conjointSchema = z.object({
//   nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
//   prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
//   dob: z.string().min(1, "La date de naissance est requise"),
//   pob: z.string().min(1, "Le lieu de naissance est requis"),
//   nationality: z.string().min(1, "La nationalité est requise"),
//   profession: z.string().min(1, "La profession est requise"),
//   address: z.string().min(5, "L'adresse est requise"),
//   phone: z.string().min(10, "Le numéro de téléphone est requis"),
//   email: z.string().email("Email invalide"),
//   idNumber: z.string().min(1, "Le numéro CNI/Passeport est requis"),
// })

// const mariageSchema = z.object({
//   conjoint1: conjointSchema,
//   conjoint2: conjointSchema,
//   marriageType: z.enum(["Mariage civil uniquement", "Mariage civil + cérémonie (avec décoration, invités…)"], {
//     required_error: "Veuillez sélectionner un type de mariage.",
//   }),
//   guestEstimate: z.enum(["Moins de 20", "Entre 20 et 50", "Plus de 50"], {
//     required_error: "Veuillez estimer le nombre d'invités.",
//   }),
//   celebrationLanguage: z.enum(["Français", "Anglais", "Autre (à préciser)"], {
//     required_error: "Veuillez sélectionner une langue de célébration.",
//   }),
//   otherCelebrationLanguage: z.string().optional(),
//   date1: z.string().min(1, "La première date est requise"),
//   time1: z.string().min(1, "La première heure est requise"),
//   date2: z.string().min(1, "La deuxième date est requise"),
//   time2: z.string().min(1, "La deuxième heure est requise"),
//   date3: z.string().min(1, "La troisième date est requise"),
//   time3: z.string().min(1, "La troisième heure est requise"),
//   reserveRoom: z.boolean(),
//   roomType: z
//     .enum(["Salle standard", "Salle prestige (décoration, fleurs, sono)", "Salle extérieure couverte"])
//     .optional(),
//   photoSpace: z.boolean(),
//   onlinePayment: z.boolean(),
//   certifyAccuracy: z.boolean().refine((val) => val === true, {
//     message: "Vous devez certifier l'exactitude des informations.",
//   }),
//   authorizeContact: z.boolean().refine((val) => val === true, {
//     message: "Vous devez autoriser la mairie à vous contacter.",
//   }),
// })

// type MariageFormValues = z.infer<typeof mariageSchema>

// interface MariageFormProps {
//   onSubmit: (data: MariageFormValues, files: File[]) => void
//   isSubmitting: boolean
//   files: File[]
//   handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
//   removeFile: (index: number) => void
// }

// export default function MariageForm({ onSubmit, isSubmitting, files, handleFileUpload, removeFile }: MariageFormProps) {
//   const form = useForm<MariageFormValues>({
//     resolver: zodResolver(mariageSchema),
//     defaultValues: {
//       conjoint1: {
//         nom: "",
//         prenom: "",
//         dob: "",
//         pob: "",
//         nationality: "",
//         profession: "",
//         address: "",
//         phone: "",
//         email: "",
//         idNumber: "",
//       },
//       conjoint2: {
//         nom: "",
//         prenom: "",
//         dob: "",
//         pob: "",
//         nationality: "",
//         profession: "",
//         address: "",
//         phone: "",
//         email: "",
//         idNumber: "",
//       },
//       marriageType: undefined,
//       guestEstimate: undefined,
//       celebrationLanguage: undefined,
//       otherCelebrationLanguage: "",
//       date1: "",
//       time1: "",
//       date2: "",
//       time2: "",
//       date3: "",
//       time3: "",
//       reserveRoom: false,
//       roomType: undefined,
//       photoSpace: false,
//       onlinePayment: false,
//       certifyAccuracy: false,
//       authorizeContact: false,
//     },
//   })

//   const reserveRoom = form.watch("reserveRoom")
//   const celebrationLanguage = form.watch("celebrationLanguage")

//   const renderConjointFields = (conjointNum: 1 | 2) => (
//     <>
//       <h3 className="text-xl font-semibold text-gray-800 mb-4 pt-6">Conjoint(e) {conjointNum}</h3>
//       <div className="grid md:grid-cols-2 gap-4">
//         <FormField
//           control={form.control}
//           name={`conjoint${conjointNum}.nom`}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Nom</FormLabel>
//               <FormControl>
//                 <Input placeholder="Nom" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name={`conjoint${conjointNum}.prenom`}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Prénom</FormLabel>
//               <FormControl>
//                 <Input placeholder="Prénom" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>
//       <div className="grid md:grid-cols-2 gap-4">
//         <FormField
//           control={form.control}
//           name={`conjoint${conjointNum}.dob`}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Date de naissance</FormLabel>
//               <FormControl>
//                 <Input type="date" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name={`conjoint${conjointNum}.pob`}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Lieu de naissance</FormLabel>
//               <FormControl>
//                 <Input placeholder="Lieu de naissance" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>
//       <FormField
//         control={form.control}
//         name={`conjoint${conjointNum}.nationality`}
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Nationalité</FormLabel>
//             <FormControl>
//               <Input placeholder="Nationalité" {...field} />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//       <FormField
//         control={form.control}
//         name={`conjoint${conjointNum}.profession`}
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Profession</FormLabel>
//             <FormControl>
//               <Input placeholder="Profession" {...field} />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//       <FormField
//         control={form.control}
//         name={`conjoint${conjointNum}.address`}
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Adresse complète</FormLabel>
//             <FormControl>
//               <Input placeholder="Adresse complète" {...field} />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//       <div className="grid md:grid-cols-2 gap-4">
//         <FormField
//           control={form.control}
//           name={`conjoint${conjointNum}.phone`}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Téléphone</FormLabel>
//               <FormControl>
//                 <Input type="tel" placeholder="Téléphone" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name={`conjoint${conjointNum}.email`}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input type="email" placeholder="Email" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>
//       <FormField
//         control={form.control}
//         name={`conjoint${conjointNum}.idNumber`}
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Numéro CNI ou passeport</FormLabel>
//             <FormControl>
//               <Input placeholder="Numéro CNI ou passeport" {...field} />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     </>
//   )

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit((data) => onSubmit(data, files))} className="space-y-6">
//         {renderConjointFields(1)}
//         {renderConjointFields(2)}

//         <h3 className="text-xl font-semibold text-gray-800 mb-4 pt-6">Informations sur la célébration souhaitée</h3>
//         <FormField
//           control={form.control}
//           name="marriageType"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Type de mariage :</FormLabel>
//               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Sélectionnez le type de mariage" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   <SelectItem value="Mariage civil uniquement">Mariage civil uniquement</SelectItem>
//                   <SelectItem value="Mariage civil + cérémonie (avec décoration, invités…)">
//                     Mariage civil + cérémonie (avec décoration, invités…)
//                   </SelectItem>
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="guestEstimate"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Nombre d’invités estimé :</FormLabel>
//               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Estimez le nombre d'invités" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   <SelectItem value="Moins de 20">Moins de 20</SelectItem>
//                   <SelectItem value="Entre 20 et 50">Entre 20 et 50</SelectItem>
//                   <SelectItem value="Plus de 50">Plus de 50</SelectItem>
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="celebrationLanguage"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Langue de la célébration souhaitée :</FormLabel>
//               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Sélectionnez une langue" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   <SelectItem value="Français">Français</SelectItem>
//                   <SelectItem value="Anglais">Anglais</SelectItem>
//                   <SelectItem value="Autre (à préciser)">Autre (à préciser)</SelectItem>
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         {celebrationLanguage === "Autre (à préciser)" && (
//           <FormField
//             control={form.control}
//             name="otherCelebrationLanguage"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Précisez la langue</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Ex: Espagnol" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         )}

//         <h3 className="text-xl font-semibold text-gray-800 mb-4 pt-6">Proposition de dates</h3>
//         <p className="text-sm text-gray-600 mb-2">
//           Veuillez proposer jusqu’à 3 créneaux de préférence (JJ/MM/AAAA HH:MM)
//         </p>
//         <div className="grid md:grid-cols-2 gap-4">
//           <FormField
//             control={form.control}
//             name="date1"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="sr-only">Date 1</FormLabel>
//                 <FormControl>
//                   <Input type="date" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="time1"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="sr-only">Heure 1</FormLabel>
//                 <FormControl>
//                   <Input type="time" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="date2"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="sr-only">Date 2</FormLabel>
//                 <FormControl>
//                   <Input type="date" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="time2"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="sr-only">Heure 2</FormLabel>
//                 <FormControl>
//                   <Input type="time" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="date3"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="sr-only">Date 3</FormLabel>
//                 <FormControl>
//                   <Input type="date" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="time3"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="sr-only">Heure 3</FormLabel>
//                 <FormControl>
//                   <Input type="time" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <FormField
//           control={form.control}
//           name="reserveRoom"
//           render={({ field }) => (
//             <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
//               <FormControl>
//                 <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//               </FormControl>
//               <div className="space-y-1 leading-none">
//                 <FormLabel>Souhaitez-vous réserver une salle de réception dans la mairie ?</FormLabel>
//               </div>
//             </FormItem>
//           )}
//         />
//         {reserveRoom && (
//           <FormField
//             control={form.control}
//             name="roomType"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Type de salle souhaitée :</FormLabel>
//                 <Select onValueChange={field.onChange} defaultValue={field.value}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Sélectionnez un type de salle" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value="Salle standard">Salle standard</SelectItem>
//                     <SelectItem value="Salle prestige (décoration, fleurs, sono)">
//                       Salle prestige (décoration, fleurs, sono)
//                     </SelectItem>
//                     <SelectItem value="Salle extérieure couverte">Salle extérieure couverte</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         )}
//         <FormField
//           control={form.control}
//           name="photoSpace"
//           render={({ field }) => (
//             <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
//               <FormControl>
//                 <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//               </FormControl>
//               <div className="space-y-1 leading-none">
//                 <FormLabel>Besoin d’un espace photo officiel ?</FormLabel>
//               </div>
//             </FormItem>
//           )}
//         />

//         <div>
//           <Label className="text-base font-medium">Pièces à fournir (à uploader directement)</Label>
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
//                   accept=".pdf,.jpg,.jpeg,.png"
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

//         <h3 className="text-xl font-semibold text-gray-800 mb-4 pt-6">Paiement & validation</h3>
//         <FormField
//           control={form.control}
//           name="onlinePayment"
//           render={({ field }) => (
//             <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
//               <FormControl>
//                 <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//               </FormControl>
//               <div className="space-y-1 leading-none">
//                 <FormLabel>Souhaitez-vous effectuer le paiement en ligne ?</FormLabel>
//               </div>
//             </FormItem>
//           )}
//         />

//         <h3 className="text-xl font-semibold text-gray-800 mb-4 pt-6">Confirmation & Suivi</h3>
//         <FormField
//           control={form.control}
//           name="certifyAccuracy"
//           render={({ field }) => (
//             <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
//               <FormControl>
//                 <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//               </FormControl>
//               <div className="space-y-1 leading-none">
//                 <FormLabel>Je certifie l’exactitude des informations fournies</FormLabel>
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
//                 <FormLabel>J’autorise la mairie à me contacter via WhatsApp / Email</FormLabel>
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
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {
  conjointSchema,
  mariageCelebrationSchema,
  mariageDatesRoomSchema,
  mariagePaymentValidationSchema,
  type MariageFormValues,
} from "@/lib/schemas"
import { countries } from "@/lib/countries"

interface MariageFormProps {
  onSubmit: (data: MariageFormValues, files: File[]) => void
  isSubmitting: boolean
  files: File[]
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  removeFile: (index: number) => void
}

export default function MariageForm({
  onSubmit,
  isSubmitting,
  files,
  handleFileUpload,
  removeFile,
}: MariageFormProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const form = useForm<MariageFormValues>({
    resolver: zodResolver(
      conjointSchema
        .partial() // Make conjoint fields optional for initial form state
        .merge(conjointSchema.partial()) // For conjoint2
        .merge(mariageCelebrationSchema)
        .merge(mariageDatesRoomSchema)
        .merge(mariagePaymentValidationSchema)
    ),
    defaultValues: {
      conjoint1: {
        nom: "",
        prenom: "",
        dob: "",
        pob: "",
        nationality: "",
        profession: "",
        address: "",
        phone: "",
        email: "",
        idNumber: "",
        maritalStatus: undefined,
      },
      conjoint2: {
        nom: "",
        prenom: "",
        dob: "",
        pob: "",
        nationality: "",
        profession: "",
        address: "",
        phone: "",
        email: "",
        idNumber: "",
        maritalStatus: undefined,
      },
      marriageType: undefined,
      guestEstimate: undefined,
      celebrationLanguage: undefined,
      otherCelebrationLanguage: "",
      date1: "",
      time1: "",
      date2: "",
      time2: "",
      date3: "",
      time3: "",
      reserveRoom: false,
      roomType: undefined,
      photoSpace: false,
      onlinePayment: false,
      certifyAccuracy: false,
      authorizeContact: false,
    },
  })

  const reserveRoom = form.watch("reserveRoom")
  const celebrationLanguage = form.watch("celebrationLanguage")

  const handleNext = async () => {
    let isValid = false
    if (currentStep === 0) {
      isValid = await form.trigger(
        Object.keys(conjointSchema.shape).map((key) => `conjoint1.${key}`) as (keyof MariageFormValues)[]
      )
    } else if (currentStep === 1) {
      isValid = await form.trigger(
        Object.keys(conjointSchema.shape).map((key) => `conjoint2.${key}`) as (keyof MariageFormValues)[]
      )
    } else if (currentStep === 2) {
      isValid = await form.trigger(Object.keys(mariageCelebrationSchema.shape) as (keyof MariageFormValues)[])
    } else if (currentStep === 3) {
      isValid = await form.trigger(Object.keys(mariageDatesRoomSchema.shape) as (keyof MariageFormValues)[])
    } else if (currentStep === 4) {
      isValid = await form.trigger(Object.keys(mariagePaymentValidationSchema.shape) as (keyof MariageFormValues)[])
    }

    if (isValid) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleSubmitForm = (data: MariageFormValues) => {
    onSubmit(data, files)
  }

  const renderConjointFields = (conjointNum: 1 | 2) => (
    <>
      <h3 className="text-xl font-semibold text-gray-800 mb-4 pt-6">Conjoint(e) {conjointNum}</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`conjoint${conjointNum}.nom`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Nom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`conjoint${conjointNum}.prenom`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input placeholder="Prénom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`conjoint${conjointNum}.dob`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date de naissance</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`conjoint${conjointNum}.pob`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lieu de naissance</FormLabel>
              <FormControl>
                <Input placeholder="Lieu de naissance" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name={`conjoint${conjointNum}.nationality`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nationalité</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une nationalité" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`conjoint${conjointNum}.profession`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Profession</FormLabel>
            <FormControl>
              <Input placeholder="Profession" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`conjoint${conjointNum}.address`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Adresse complète</FormLabel>
            <FormControl>
              <Input placeholder="Adresse complète" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`conjoint${conjointNum}.phone`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="Téléphone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`conjoint${conjointNum}.email`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name={`conjoint${conjointNum}.idNumber`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Numéro CNI ou passeport</FormLabel>
            <FormControl>
              <Input placeholder="Numéro CNI ou passeport" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`conjoint${conjointNum}.maritalStatus`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Situation matrimoniale</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une situation" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Célibataire">Célibataire</SelectItem>
                <SelectItem value="Marié(e)">Marié(e)</SelectItem>
                <SelectItem value="Divorcé(e)">Divorcé(e)</SelectItem>
                <SelectItem value="Veuf(ve)">Veuf(ve)</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-6">
        {currentStep === 0 && renderConjointFields(1)}

        {currentStep === 1 && renderConjointFields(2)}

        {currentStep === 2 && (
          <>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 pt-6">Informations sur la célébration souhaitée</h3>
            <FormField
              control={form.control}
              name="marriageType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de mariage :</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez le type de mariage" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Mariage civil uniquement">Mariage civil uniquement</SelectItem>
                      <SelectItem value="Mariage civil + cérémonie (avec décoration, invités…)">
                        Mariage civil + cérémonie (avec décoration, invités…)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="guestEstimate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre d’invités estimé :</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Estimez le nombre d'invités" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Moins de 20">Moins de 20</SelectItem>
                      <SelectItem value="Entre 20 et 50">Entre 20 et 50</SelectItem>
                      <SelectItem value="Plus de 50">Plus de 50</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="celebrationLanguage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Langue de la célébration souhaitée :</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une langue" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Français">Français</SelectItem>
                      <SelectItem value="Anglais">Anglais</SelectItem>
                      <SelectItem value="Autre (à préciser)">Autre (à préciser)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {celebrationLanguage === "Autre (à préciser)" && (
              <FormField
                control={form.control}
                name="otherCelebrationLanguage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Précisez la langue</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Espagnol" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </>
        )}

        {currentStep === 3 && (
          <>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 pt-6">Proposition de dates</h3>
            <p className="text-sm text-gray-600 mb-2">
              Veuillez proposer jusqu’à 3 créneaux de préférence (JJ/MM/AAAA HH:MM)
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Date 1</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Heure 1</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Date 2</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Heure 2</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date3"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Date 3</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time3"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Heure 3</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="reserveRoom"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Souhaitez-vous réserver une salle de réception dans la mairie ?</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            {reserveRoom && (
              <FormField
                control={form.control}
                name="roomType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type de salle souhaitée :</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un type de salle" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Salle standard">Salle standard</SelectItem>
                        <SelectItem value="Salle prestige (décoration, fleurs, sono)">
                          Salle prestige (décoration, fleurs, sono)
                        </SelectItem>
                        <SelectItem value="Salle extérieure couverte">Salle extérieure couverte</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="photoSpace"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Besoin d’un espace photo officiel ?</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <div>
              <Label className="text-base font-medium">Pièces à fournir (à uploader directement)</Label>
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
                      accept=".pdf,.jpg,.jpeg,.png"
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

        {currentStep === 4 && (
          <>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 pt-6">Paiement & validation</h3>
            <FormField
              control={form.control}
              name="onlinePayment"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Souhaitez-vous effectuer le paiement en ligne ?</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-4 pt-6">Confirmation & Suivi</h3>
            <FormField
              control={form.control}
              name="certifyAccuracy"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Je certifie l’exactitude des informations fournies</FormLabel>
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
                    <FormLabel>J’autorise la mairie à me contacter via WhatsApp / Email</FormLabel>
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
