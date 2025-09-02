"use client"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  ArrowLeft,
  Upload,
  ChevronRight,
  ChevronLeft,
  Check,
  CheckCircle,
  AlertCircle,
  Shield,
  Users,
  Settings,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useRegisterMutation } from "@/hooks/auth/use-auth-mutations"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { countries } from "@/lib/countries"
import { citiesCoteIvoire } from "@/lib/cities-cotedivoire"
import { useToast } from "@/hooks/use-toast"
import { BackgroundAnimated } from "../layout"

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
    icon: Users,
  },
  {
    id: 2,
    title: "Localisation",
    description: "Nationalité et commune",
    fields: ["nationality", "city"],
    icon: Settings,
  },
  {
    id: 3,
    title: "Contacts & Sécurité",
    description: "Email et mot de passe",
    fields: ["email", "phone", "password", "confirmPassword"],
    icon: Shield,
  },
  {
    id: 4,
    title: "Justificatifs",
    description: "Pièce d'identité",
    fields: ["idType", "idNumber"],
    icon: Upload,
  },
  {
    id: 5,
    title: "Validation",
    description: "Consentements finaux",
    fields: ["acceptTerms", "acceptDataPolicy"],
    icon: CheckCircle,
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
  const { toast } = useToast()
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
        //@ts-ignore
        role: "admin",
      })

      sessionStorage.setItem(
        "pendingAdminRegistration",
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

      setTimeout(() => {
        router.push("/admin-auth/verification-otp")
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
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Nom *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-12 bg-white/80 backdrop-blur-sm border-slate-200 rounded-xl transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:bg-white"
                        placeholder="Votre nom de famille"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Prénom *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-12 bg-white/80 backdrop-blur-sm border-slate-200 rounded-xl transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:bg-white"
                        placeholder="Votre prénom"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Date de naissance *</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className="h-12 bg-white/80 backdrop-blur-sm border-slate-200 rounded-xl transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:bg-white"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthPlace"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Lieu de naissance *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-12 bg-white/80 backdrop-blur-sm border-slate-200 rounded-xl transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:bg-white"
                        placeholder="Ville de naissance"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Nationalité *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-slate-200 rounded-xl transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200">
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
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Commune *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-slate-200 rounded-xl transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200">
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
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Email *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        className="h-12 bg-white/80 backdrop-blur-sm border-slate-200 rounded-xl transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:bg-white"
                        placeholder="votre@email.com"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Téléphone mobile *</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        {...field}
                        className="h-12 bg-white/80 backdrop-blur-sm border-slate-200 rounded-xl transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:bg-white"
                        placeholder="+225 XX XX XX XX XX"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Mot de passe *</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        className="h-12 bg-white/80 backdrop-blur-sm border-slate-200 rounded-xl transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:bg-white"
                        placeholder="Minimum 6 caractères"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Confirmer mot de passe *</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        className="h-12 bg-white/80 backdrop-blur-sm border-slate-200 rounded-xl transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:bg-white"
                        placeholder="Répétez votre mot de passe"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>
          </motion.div>
        )

      case 4:
        return (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="idType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Type de pièce d'identité *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-slate-200 rounded-xl transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200">
                          <SelectValue placeholder="Sélectionnez un type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="cni">Carte Nationale d'Identité</SelectItem>
                        <SelectItem value="passeport">Passeport</SelectItem>
                        <SelectItem value="permis">Permis de conduire</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="idNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Numéro de pièce *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-12 bg-white/80 backdrop-blur-sm border-slate-200 rounded-xl transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:bg-white"
                        placeholder="Numéro de votre pièce"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>
            {/* <motion.div
              className="mt-6 p-8 border-2 border-dashed border-indigo-200 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 transition-all duration-300 cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center flex-col">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                  <Upload className="h-8 w-8 text-indigo-600" />
                </div>
                <p className="text-lg font-semibold text-white mb-2">Télécharger la pièce d'identité</p>
                <p className="text-sm text-slate-500">PNG, JPG jusqu'à 5MB • Glissez-déposez ou cliquez</p>
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
                  <FormItem className="flex flex-row items-start space-x-4 space-y-0 p-6 border border-slate-200 rounded-2xl transition-all duration-200 hover:bg-slate-50 bg-white/60 backdrop-blur-sm">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-1 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                      />
                    </FormControl>
                    <div className="space-y-2 leading-none">
                      <FormLabel className="text-sm font-medium text-white">
                        J'accepte les conditions générales d'utilisation *
                      </FormLabel>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        En cochant cette case, vous acceptez nos conditions d'utilisation et notre politique de service
                      </p>
                      <FormMessage className="text-red-400" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="acceptDataPolicy"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-4 space-y-0 p-6 border border-slate-200 rounded-2xl transition-all duration-200 hover:bg-slate-50 bg-white/60 backdrop-blur-sm">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-1 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                      />
                    </FormControl>
                    <div className="space-y-2 leading-none">
                      <FormLabel className="text-sm font-medium text-white">
                        Je consens au traitement de mes données personnelles *
                      </FormLabel>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Conformément au RGPD, nous traitons vos données pour la création de votre compte et
                        l'amélioration de nos services
                      </p>
                      <FormMessage className="text-red-400" />
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
      <div className="min-h-screen relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Geometric Background Pattern */}
        <div className="absolute inset-0 z-0">
          <BackgroundAnimated/>
          {/* <div className="absolute top-0 left-0 w-full h-full opacity-30">
            <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full blur-3xl"></div>
            <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full blur-2xl"></div>
            <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-br from-indigo-400 to-blue-400 rounded-full blur-2xl"></div>
          </div>

          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div> */}
        </div>

        {/* Header Section */}
        <div className="relative z-10 pt-8 px-6">
          <div className="max-w-6xl mx-auto">
           

            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Panneau d'Administration</h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Créez votre compte administrateur pour accéder à l'Espace Admin
              </p>
            </motion.div>
          </div>
        </div>

        {/* Main Form Container */}
        <div className="relative z-10 flex justify-center px-4 pb-12">
          <motion.div
            className="w-full max-w-4xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
              {/* Enhanced Progress Indicator */}
              <motion.div
                className="mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center justify-between mb-8">
                  {steps.map((step, index) => {
                    const Icon = step.icon
                    return (
                      <div key={step.id} className="flex items-center">
                        <motion.div
                          className={`relative w-14 h-14 rounded-2xl flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                            currentStep === step.id
                              ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg"
                              : isStepCompleted(step.id) || currentStep > step.id
                                ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg"
                                : "bg-slate-100 text-slate-400 border-2 border-slate-200"
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {currentStep > step.id || isStepCompleted(step.id) ? (
                            <Check className="w-6 h-6" />
                          ) : (
                            <Icon className="w-6 h-6" />
                          )}

                          {/* Active step pulse effect */}
                          {currentStep === step.id && (
                            <motion.div
                              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                              style={{ zIndex: -1, opacity: 0.3 }}
                            />
                          )}
                        </motion.div>

                        {index < steps.length - 1 && (
                          <div className="flex-1 mx-4">
                            <div
                              className={`h-2 rounded-full transition-all duration-500 ${
                                currentStep > step.id
                                  ? "bg-gradient-to-r from-green-500 to-emerald-600"
                                  : "bg-slate-200"
                              }`}
                            />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {steps.find((step) => step.id === currentStep)?.title}
                  </h2>
                  <p className="text-white">{steps.find((step) => step.id === currentStep)?.description}</p>
                </div>
              </motion.div>

              {error && (
                <motion.div
                  className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-8 text-sm flex items-center gap-3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  {error}
                </motion.div>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="min-h-[200px]"
                    >
                      {renderStepContent()}
                    </motion.div>
                  </AnimatePresence>

                  {/* Enhanced Navigation Buttons */}
                  <motion.div
                    className="flex justify-between pt-8 border-t border-slate-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="flex items-center gap-2 h-12 px-6 bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-slate-50 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Précédent
                    </Button>

                    {currentStep < steps.length ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="flex items-center gap-2 h-12 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white transition-all duration-200 hover:scale-105 shadow-lg rounded-xl"
                      >
                        Suivant
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="flex items-center gap-2 h-12 px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white transition-all duration-200 hover:scale-105 shadow-lg rounded-xl"
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
                className="mt-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <p className="text-sm text-white">
                  Vous avez déjà un compte ?{" "}
                  <Link
                    href="/admin-auth/connexion"
                    className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors underline decoration-2 underline-offset-2"
                  >
                    Connectez-vous
                  </Link>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

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
