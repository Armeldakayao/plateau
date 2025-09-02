

"use client"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRegisterMutation } from "@/hooks/auth/use-auth-mutations"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, motion } from "framer-motion"
import { AlertCircle, Check, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { citiesCoteIvoire } from "@/lib/cities-cotedivoire"
import { countries } from "@/lib/countries"

const formSchema = z
  .object({
    firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
    lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    birthDate: z.string().min(1, "La date de naissance est requise"),
    birthPlace: z.string().min(1, "Le lieu de naissance est requis"),
    nationality: z.string().min(1, "La nationalité est requise"),
    city: z.string().min(1, "La commune est requise"),
    email: z.string().email("Email invalide"),
    phone: z.string().min(10, "Le numéro de téléphone doit contenir au moins 10 caractères"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    confirmPassword: z.string().min(6, "La confirmation du mot de passe est requise"),
    idType: z.string().min(1, "Le type de pièce d'identité est requis"),
    idNumber: z.string().min(4, "Le numéro de pièce d'identité est requis"),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "Vous devez accepter les conditions d'utilisation",
    }),
    acceptDataPolicy: z.boolean().refine((val) => val === true, {
      message: "Vous devez accepter la politique de confidentialité",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  })

const steps = [
  {
    id: 1,
    title: "Informations personnelles",
    description: "Vos informations de base",
    fields: ["firstName", "lastName", "birthDate", "birthPlace"],
  },
  {
    id: 2,
    title: "Localisation",
    description: "Nationalité et commune",
    fields: ["nationality", "city"],
  },
  {
    id: 3,
    title: "Contacts & Sécurité",
    description: "Email et mot de passe",
    fields: ["email", "phone", "password", "confirmPassword"],
  },
  {
    id: 4,
    title: "Justificatifs",
    description: "Pièce d'identité",
    fields: ["idType", "idNumber"],
  },
  {
    id: 5,
    title: "Validation",
    description: "Consentements finaux",
    fields: ["acceptTerms", "acceptDataPolicy"],
  },
]

export default function InscriptionPage() {
  const router = useRouter()
  const registerMutation = useRegisterMutation()
  const [currentStep, setCurrentStep] = useState(1)
  const [error, setError] = useState("")
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
const {toast}=useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      birthDate: "",
      birthPlace: "",
      nationality: "",
      city: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      idType: "",
      idNumber: "",
      acceptTerms: false,
      acceptDataPolicy: false,
    },
  })

  const validateCurrentStep = async () => {
    const currentStepFields = steps.find((step) => step.id === currentStep)?.fields || []
    const isValid = await form.trigger(currentStepFields as any)
    return isValid
  }

  const nextStep = async () => {
    const isValid = await validateCurrentStep()
    if (isValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
      toast({
        title: "Etape suivante",
        description: "Veuillez remplir la prochaine étape",
      })
    } else {
      toast({
        title: "Erreur",
        description: "Veuillez remplir la prochaine étape",
        variant: "destructive",
      })
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepCompleted = (stepId: number) => {
    const stepFields = steps.find((step) => step.id === stepId)?.fields || []
    return stepFields.every((field) => {
      const value = form.getValues(field as any)
      return value !== "" && value !== false
    })
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError("")

    try {
      const response = await registerMutation.mutateAsync({
        firstName: values.firstName,
        lastName: values.lastName,
        birthDate: values.birthDate,
        birthPlace: values.birthPlace,
        nationality: values.nationality,
        city: values.city,
        email: values.email,
        phone: values.phone,
        password: values.password,
        confirmPassword: values.confirmPassword,
        idType: values.idType,
        idNumber: values.idNumber,
        acceptTerms: values.acceptTerms,
        acceptDataPolicy: values.acceptDataPolicy,
      })

      // Stocker les infos pour la vérification OTP
      sessionStorage.setItem(
        "pendingRegistration",
        JSON.stringify({
          //@ts-ignore
          email: response.email,
          //@ts-ignore
          userId: response.userId,
        }),
      )

      toast({
        title: "Succès",
        description: "Inscription avec succes.",
      })

      // setAlertMessage(
      //   "Félicitations ! Votre compte a été créé avec succès. Vous allez être redirigé vers la vérification OTP.",
      // )
      // setShowSuccessAlert(true)

      setTimeout(() => {
        router.push("/verification-otp")
      }, 3000)
    } catch (error: any) {
      console.error(error)
      const errorMessage = error?.message || "Une erreur est survenue lors de l'inscription."
      setError(errorMessage)

      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
      })

      // setAlertMessage(errorMessage)
      // setShowErrorAlert(true)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal">Nom *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="py-3 rounded border border-gray-300 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal">Prénom *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="py-3 rounded border border-gray-300 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal">Date de naissance *</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className="py-3 rounded border border-gray-300 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthPlace"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal">Lieu de naissance *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="py-3 rounded border border-gray-300 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal">Nationalité *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="py-3 rounded border border-gray-300 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                          <SelectValue placeholder="Sélectionnez votre nationalité" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-60">
                        {countries.map((country) => (
                          <SelectItem key={country.value} value={country.value}>
                            {country.label}
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
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal">Commune *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="py-3 rounded border border-gray-300 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                          <SelectValue placeholder="Sélectionnez votre commune" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-60">
                        {citiesCoteIvoire.map((city) => (
                          <SelectItem key={city.value} value={city.value}>
                            {city.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal">Email *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        className="py-3 rounded border border-gray-300 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal">Téléphone mobile *</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        {...field}
                        className="py-3 rounded border border-gray-300 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal">Mot de passe *</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        className="py-3 rounded border border-gray-300 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal">Confirmer mot de passe *</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        className="py-3 rounded border border-gray-300 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </motion.div>
        )

      case 4:
        return (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="idType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal">Type de pièce d'identité *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="py-3 rounded border border-gray-300 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                          <SelectValue placeholder="Sélectionnez un type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="cni">Carte Nationale d'Identité</SelectItem>
                        <SelectItem value="passeport">Passeport</SelectItem>
                        <SelectItem value="permis">Permis de conduire</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="idNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal">Numéro de pièce *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="py-3 rounded border border-gray-300 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* <motion.div
              className="mt-4 p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center flex-col">
                <Upload className="h-8 w-8 text-green-500 mb-2" />
                <p className="text-sm font-medium text-gray-700">Télécharger la pièce d'identité</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG jusqu'à 5MB</p>
              </div>
            </motion.div> */}
          </motion.div>
        )

      case 5:
        return (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-lg transition-all duration-200 hover:bg-gray-50">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal">
                        J'accepte les conditions générales d'utilisation *
                      </FormLabel>
                      <p className="text-xs text-gray-500">
                        En cochant cette case, vous acceptez nos conditions d'utilisation
                      </p>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="acceptDataPolicy"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-lg transition-all duration-200 hover:bg-gray-50">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal">
                        Je consens au traitement de mes données personnelles *
                      </FormLabel>
                      <p className="text-xs text-gray-500">
                        Conformément au RGPD, nous traitons vos données pour la création de votre compte
                      </p>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <>
      <div className="">
        {/* Background Image - Full Screen */}
        

        {/* Back Button and Title */}
        <div className="relative z-10 pt-48 px-6">
          <div className="max-w-4xl mx-auto">
            
            <motion.h1
              className="text-2xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Inscrivez-vous pour rejoindre l'Espace Citoyen
            </motion.h1>
          </div>
        </div>

        {/* Form Overlay */}
        <div className=" flex justify-center px-4 pb-8">
          <motion.div
            className="w-full max-w-4xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mx-4">
              {/* Progress Indicator */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center justify-between mb-4">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <motion.div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                          currentStep === step.id
                            ? "bg-blue-500 text-white"
                            : isStepCompleted(step.id)
                              ? "bg-green-500 text-white"
                              : currentStep > step.id
                                ? "bg-green-500 text-white"
                                : "bg-gray-200 text-gray-600"
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {currentStep > step.id || isStepCompleted(step.id) ? <Check className="w-5 h-5" /> : step.id}
                      </motion.div>
                      {index < steps.length - 1 && (
                        <div
                          className={`w-12 h-1 mx-2 transition-all duration-300 ${
                            currentStep > step.id ? "bg-green-500" : "bg-gray-200"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {steps.find((step) => step.id === currentStep)?.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {steps.find((step) => step.id === currentStep)?.description}
                  </p>
                </div>
              </motion.div>

              {error && (
                <motion.div
                  className="bg-red-50 text-red-500 p-3 rounded-md mb-6 text-sm"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  {error}
                </motion.div>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="min-h-[170px]"
                    >
                      {renderStepContent()}
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <motion.div
                    className="flex justify-between pt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="flex items-center gap-2 bg-transparent transition-all duration-200 hover:scale-105"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Précédent
                    </Button>

                    {currentStep < steps.length ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="flex items-center gap-2 text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200 hover:scale-105"
                      >
                        Suivant
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 transition-all duration-200 hover:scale-105"
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Création en cours...
                          </>
                        ) : (
                          <>
                            Créer mon compte
                            <Check className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                    )}
                  </motion.div>
                </form>
              </Form>

              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <p className="text-sm text-black">
                  Vous avez déjà un compte ?{" "}
                  <Link
                    href="/connexion"
                    className="text-black font-bold underline hover:text-blue-600 transition-colors"
                  >
                    Connectez-vous
                  </Link>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Success Alert Dialog */}
      <AlertDialog open={showSuccessAlert} onOpenChange={setShowSuccessAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <AlertDialogTitle>Inscription réussie !</AlertDialogTitle>
            </div>
            <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowSuccessAlert(false)}>Continuer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Error Alert Dialog */}
      <AlertDialog open={showErrorAlert} onOpenChange={setShowErrorAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-red-600" />
              <AlertDialogTitle>Erreur d'inscription</AlertDialogTitle>
            </div>
            <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowErrorAlert(false)}>Réessayer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
