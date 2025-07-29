// "use client"

// import type React from "react"

// import { z } from "zod"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
// import { useState } from "react"
// import { motion } from "framer-motion"
// import Link from "next/link"
// import { ArrowLeft } from "lucide-react"
// import { useRouter } from "next/navigation"

// const formSchema = z.object({
//   digit1: z.string().length(1, "Requis"),
//   digit2: z.string().length(1, "Requis"),
//   digit3: z.string().length(1, "Requis"),
//   digit4: z.string().length(1, "Requis"),
//   digit5: z.string().length(1, "Requis"),
//   digit6: z.string().length(1, "Requis"),
// })

// export default function VerificationOTPPage() {
//   const router = useRouter()
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [error, setError] = useState("")

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       digit1: "",
//       digit2: "",
//       digit3: "",
//       digit4: "",
//       digit5: "",
//       digit6: "",
//     },
//   })

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     setIsSubmitting(true)
//     setError("")

//     // Simuler une vérification
//     setTimeout(() => {
//       setIsSubmitting(false)
//       router.push("/dashboard/client/tableau-de-bord")
//     }, 1500)
//   }

//   // Gérer le focus automatique sur le champ suivant
//   const handleDigitInput = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
//     const value = e.target.value
//     if (value.length === 1) {
//       const nextField = document.querySelector(`input[name="${getNextFieldName(fieldName)}"]`) as HTMLInputElement
//       if (nextField) {
//         nextField.focus()
//       }
//     }
//   }

//   const getNextFieldName = (currentField: string) => {
//     const currentDigit = Number.parseInt(currentField.replace("digit", ""))
//     const nextDigit = currentDigit + 1
//     return nextDigit <= 6 ? `digit${nextDigit}` : ""
//   }

//   return (
//     <>
//      <div className="mb-6 p-7">
//           <Link href="/connexion" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
//             <ArrowLeft className="mr-2 h-16 w-16 text-secondary" />
            
//           </Link>
//         </div>
//     <div className="h-[calc(100vh-30vh)] flex items-center justify-center p-4">
      
//       <motion.div
//         className="w-full max-w-xl  p-8"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
       

//         <div className="text-center mb-8">
//           <h1 className="text-xl lg:text-3xl font-bold text-primary">
//             Nous avions envoyé un code de vérification sur votre numéro
//           </h1>
//         </div>

//         {error && <div className="bg-red-50 text-red-500 p-3 rounded-md mb-6 text-sm">{error}</div>}

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <div className="flex justify-center gap-4">
//               {[1, 2, 3, 4, 5, 6].map((digit) => (
//                 <FormField
//                   key={`digit${digit}`}
//                   control={form.control}
//                   name={`digit${digit}` as keyof z.infer<typeof formSchema>}
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormControl>
//                         <Input
//                           {...field}
//                           className="w-16 h-16 bg-gray-200 rounded-xl border-none text-center text-xl font-bold"
//                           maxLength={1}
//                           onChange={(e) => {
//                             field.onChange(e)
//                             handleDigitInput(e, `digit${digit}`)
//                           }}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               ))}
//             </div>

//             <div className="text-center flex items-center justify-center gap-2 text-lg text-muted-foreground">
//               <p>Code valide pour 2 minutes?</p>
//               <p className="">
//                 <Link href="#" className="text-black font-bold underline">
//                   Renvoyer le code
//                 </Link>
//               </p>
//             </div>

//             <div className="flex items-center justify-center">
//               <Button type="submit" className="px-16 bg-secondary rounded-xl py-6 hover:bg-green-600" disabled={isSubmitting}>
//               {isSubmitting ? "Vérification..." : "Confirmer"}
//             </Button>
//             </div>
//           </form>
//         </Form>
//       </motion.div>
//     </div>
//     </>
    
//   )
// }
"use client"

import type React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  digit1: z.string().length(1, "Requis").regex(/^\d$/, "Seuls les chiffres sont autorisés"),
  digit2: z.string().length(1, "Requis").regex(/^\d$/, "Seuls les chiffres sont autorisés"),
  digit3: z.string().length(1, "Requis").regex(/^\d$/, "Seuls les chiffres sont autorisés"),
  digit4: z.string().length(1, "Requis").regex(/^\d$/, "Seuls les chiffres sont autorisés"),
  digit5: z.string().length(1, "Requis").regex(/^\d$/, "Seuls les chiffres sont autorisés"),
  digit6: z.string().length(1, "Requis").regex(/^\d$/, "Seuls les chiffres sont autorisés"),
})

export default function VerificationOTPPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [timeLeft, setTimeLeft] = useState(120) // 2 minutes en secondes
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      digit1: "",
      digit2: "",
      digit3: "",
      digit4: "",
      digit5: "",
      digit6: "",
    },
  })

  // Timer pour le countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  // Formatage du temps
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Vérification automatique quand tous les champs sont remplis
  useEffect(() => {
    const values = form.getValues()
    const allFieldsFilled = Object.values(values).every((value) => value.length === 1)

    if (allFieldsFilled) {
      // Petite pause pour l'UX puis soumission automatique
      setTimeout(() => {
        form.handleSubmit(onSubmit)()
      }, 300)
    }
  }, [form.watch()])

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setError("")

    // Simuler une vérification
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/dashboard/client/tableau-de-bord")
    }, 1500)
  }

  // Gérer l'input avec validation des chiffres uniquement
  const handleDigitInput = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string, index: number) => {
    const value = e.target.value

    // N'accepter que les chiffres
    if (!/^\d*$/.test(value)) {
      return
    }

    // Si un chiffre est entré, passer au champ suivant
    if (value.length === 1 && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // Gérer la suppression (backspace)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  // Gérer le collage de code
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)

    if (pastedData.length === 6) {
      const digits = pastedData.split("")
      digits.forEach((digit, index) => {
        form.setValue(`digit${index + 1}` as keyof z.infer<typeof formSchema>, digit)
      })
      inputRefs.current[5]?.focus()
    }
  }

  const resendCode = () => {
    setTimeLeft(120)
    setError("")
    form.reset()
    inputRefs.current[0]?.focus()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header avec bouton retour */}
      <div className="p-4 sm:p-6 lg:p-8">
        <Link
          href="/connexion"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Retour</span>
        </Link>
      </div>

      {/* Contenu principal */}
      <div className="flex items-center justify-center px-4 py-8 sm:py-12">
        <motion.div
          className="w-full max-w-md sm:max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Titre */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary leading-tight">
              Nous avons envoyé un code de vérification sur votre numéro
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-2">
              Saisissez le code à 6 chiffres reçu par SMS
            </p>
          </div>

          {/* Message d'erreur */}
          {error && (
            <motion.div
              className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 text-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {error}
            </motion.div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Champs OTP */}
              <div className="flex justify-center gap-2 sm:gap-3 lg:gap-4">
                {[1, 2, 3, 4, 5, 6].map((digit, index) => (
                  <FormField
                    key={`digit${digit}`}
                    control={form.control}
                    name={`digit${digit}` as keyof z.infer<typeof formSchema>}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            ref={(el) => {
                              inputRefs.current[index] = el
                            }}
                            className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gray-100 hover:bg-gray-200 focus:bg-white rounded-xl border-2 border-gray-200 focus:border-primary text-center text-lg sm:text-xl font-bold transition-all duration-200"
                            maxLength={1}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            autoComplete="one-time-code"
                            onChange={(e) => {
                              // Filtrer pour n'accepter que les chiffres
                              const value = e.target.value.replace(/\D/g, "")
                              field.onChange(value)
                              handleDigitInput(e, `digit${digit}`, index)
                            }}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={handlePaste}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              {/* Timer et lien de renvoi */}
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-sm sm:text-base text-muted-foreground">
                  <span>Code valide pour</span>
                  <span className="font-mono font-bold text-primary">{formatTime(timeLeft)}</span>
                </div>

                {timeLeft > 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Vous n'avez pas reçu le code ?{" "}
                    <button
                      type="button"
                      onClick={resendCode}
                      className="text-primary font-semibold underline hover:no-underline transition-all"
                      disabled={isSubmitting}
                    >
                      Renvoyer le code
                    </button>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={resendCode}
                    className="text-red-500 font-semibold underline hover:no-underline transition-all"
                  >
                    Code expiré - Renvoyer un nouveau code
                  </button>
                )}
              </div>

              {/* Bouton de confirmation */}
              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  className="w-full sm:w-auto px-8 sm:px-16 bg-secondary hover:bg-secondary/90 rounded-xl py-3 sm:py-6 text-base sm:text-lg font-semibold transition-all duration-200 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Vérification...
                    </div>
                  ) : (
                    "Confirmer"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          {/* Indication de vérification automatique */}
          <div className="text-center mt-6">
            <p className="text-xs sm:text-sm text-muted-foreground">
              La vérification se fera automatiquement une fois tous les chiffres saisis
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
