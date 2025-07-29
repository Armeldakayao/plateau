"use client"

import type React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const rendezVousSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  telephone: z.string().min(10, "Le numéro de téléphone doit contenir au moins 10 caractères"),
  profession: z.string().optional(),
  institution: z.string().optional(),
  nationalId: z.string().optional(),
  meetingTarget: z.enum(["Maire", "Adjoint au Maire", "Directeur de Service", "Autre"], {
    required_error: "Veuillez sélectionner une cible de rendez-vous.",
  }),
  otherMeetingTarget: z.string().optional(),
  subject: z.enum(
    [
      "Urbanisme",
      "Demande d’appui administratif",
      "Projet entrepreneurial",
      "Question foncière",
      "Partenariat public-privé",
      "Réclamation citoyenne",
      "Autre",
    ],
    {
      required_error: "Veuillez sélectionner un sujet principal.",
    },
  ),
  otherSubject: z.string().optional(),
  preferredSlot1: z.string().min(1, "Ce créneau est requis"),
  preferredSlot2: z.string().min(1, "Ce créneau est requis"),
  preferredSlot3: z.string().min(1, "Ce créneau est requis"),
  meetingType: z.enum(["En présentiel à la mairie", "En visioconférence (Zoom/Google Meet)", "Par téléphone"], {
    required_error: "Veuillez sélectionner un type de rendez-vous.",
  }),
  certifyAccuracy: z.boolean().refine((val) => val === true, {
    message: "Vous devez certifier l'exactitude des informations.",
  }),
  authorizeContact: z.boolean().refine((val) => val === true, {
    message: "Vous devez autoriser la mairie à vous contacter.",
  }),
})

type RendezVousFormValues = z.infer<typeof rendezVousSchema>

interface RendezVousFormProps {
  onSubmit: (data: RendezVousFormValues, files: File[]) => void
  isSubmitting: boolean
  files: File[]
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  removeFile: (index: number) => void
}

export default function RendezVousForm({
  onSubmit,
  isSubmitting,
  files,
  handleFileUpload,
  removeFile,
}: RendezVousFormProps) {
  const form = useForm<RendezVousFormValues>({
    resolver: zodResolver(rendezVousSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      profession: "",
      institution: "",
      nationalId: "",
      meetingTarget: undefined,
      otherMeetingTarget: "",
      subject: undefined,
      otherSubject: "",
      preferredSlot1: "",
      preferredSlot2: "",
      preferredSlot3: "",
      meetingType: undefined,
      certifyAccuracy: false,
      authorizeContact: false,
    },
  })

  const meetingTarget = form.watch("meetingTarget")
  const subject = form.watch("subject")

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => onSubmit(data, files))} className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Informations personnelles</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="nom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Votre nom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prenom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input placeholder="Votre prénom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="votre@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telephone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="0123456789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="profession"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profession</FormLabel>
                <FormControl>
                  <Input placeholder="Votre profession" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="institution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Structure / Institution (si applicable)</FormLabel>
                <FormControl>
                  <Input placeholder="Nom de l'institution" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="nationalId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Identifiant national (facultatif – pour accès rapide via QR)</FormLabel>
              <FormControl>
                <Input placeholder="Votre identifiant national" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <h3 className="text-xl font-semibold text-gray-800 mb-4 pt-6">Objet du rendez-vous</h3>
        <FormField
          control={form.control}
          name="meetingTarget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Souhaitez-vous rencontrer :</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une personne" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Maire">Le Maire</SelectItem>
                  <SelectItem value="Adjoint au Maire">Un Adjoint au Maire</SelectItem>
                  <SelectItem value="Directeur de Service">Un Directeur de Service</SelectItem>
                  <SelectItem value="Autre">Autre</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {meetingTarget === "Autre" && (
          <FormField
            control={form.control}
            name="otherMeetingTarget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Précisez la personne à rencontrer</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Chef de service X" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sujet principal du rendez-vous</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un sujet" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Urbanisme">Urbanisme</SelectItem>
                  <SelectItem value="Demande d’appui administratif">Demande d’appui administratif</SelectItem>
                  <SelectItem value="Projet entrepreneurial">Projet entrepreneurial</SelectItem>
                  <SelectItem value="Question foncière">Question foncière</SelectItem>
                  <SelectItem value="Partenariat public-privé">Partenariat public-privé</SelectItem>
                  <SelectItem value="Réclamation citoyenne">Réclamation citoyenne</SelectItem>
                  <SelectItem value="Autre">Autre (précisez)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {subject === "Autre" && (
          <FormField
            control={form.control}
            name="otherSubject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Précisez le sujet</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Problème de voisinage" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <h3 className="text-xl font-semibold text-gray-800 mb-4 pt-6">Disponibilités</h3>
        <p className="text-sm text-gray-600 mb-2">Choisissez 3 créneaux de préférence (JJ/MM/AAAA HH:MM)</p>
        <div className="grid md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="preferredSlot1"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Créneau 1</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 01/01/2025 10:00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="preferredSlot2"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Créneau 2</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 02/01/2025 14:30" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="preferredSlot3"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Créneau 3</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 03/01/2025 11:00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="meetingType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Souhaitez-vous un rendez-vous :</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un type de rendez-vous" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="En présentiel à la mairie">En présentiel à la mairie</SelectItem>
                  <SelectItem value="En visioconférence (Zoom/Google Meet)">
                    En visioconférence (Zoom/Google Meet)
                  </SelectItem>
                  <SelectItem value="Par téléphone">Par téléphone</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Label className="text-base font-medium">Pièces justificatives (facultatif)</Label>
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

        <h3 className="text-xl font-semibold text-gray-800 mb-4 pt-6">Validation & engagement</h3>
        <FormField
          control={form.control}
          name="certifyAccuracy"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Je certifie l'exactitude des informations fournies</FormLabel>
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
                <FormLabel>J’autorise la mairie à me contacter via WhatsApp ou appel vocal</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-primary py-6 text-white text-lg rounded hover:bg-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Soumission en cours..." : "Soumettre ma demande"}
        </Button>
      </form>
    </Form>
  )
}
