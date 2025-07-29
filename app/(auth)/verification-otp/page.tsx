"use client"

import type React from "react"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  digit1: z.string().length(1, "Requis"),
  digit2: z.string().length(1, "Requis"),
  digit3: z.string().length(1, "Requis"),
  digit4: z.string().length(1, "Requis"),
  digit5: z.string().length(1, "Requis"),
  digit6: z.string().length(1, "Requis"),
})

export default function VerificationOTPPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setError("")

    // Simuler une vérification
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/dashboard")
    }, 1500)
  }

  // Gérer le focus automatique sur le champ suivant
  const handleDigitInput = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const value = e.target.value
    if (value.length === 1) {
      const nextField = document.querySelector(`input[name="${getNextFieldName(fieldName)}"]`) as HTMLInputElement
      if (nextField) {
        nextField.focus()
      }
    }
  }

  const getNextFieldName = (currentField: string) => {
    const currentDigit = Number.parseInt(currentField.replace("digit", ""))
    const nextDigit = currentDigit + 1
    return nextDigit <= 6 ? `digit${nextDigit}` : ""
  }

  return (
    <>
     <div className="mb-6 p-7">
          <Link href="/connexion" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-16 w-16 text-secondary" />
            
          </Link>
        </div>
    <div className="h-[calc(100vh-30vh)] flex items-center justify-center p-4">
      
      <motion.div
        className="w-full max-w-xl  p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
       

        <div className="text-center mb-8">
          <h1 className="text-xl lg:text-3xl font-bold text-primary">
            Nous avions envoyé un code de vérification sur votre numéro
          </h1>
        </div>

        {error && <div className="bg-red-50 text-red-500 p-3 rounded-md mb-6 text-sm">{error}</div>}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-center gap-4">
              {[1, 2, 3, 4, 5, 6].map((digit) => (
                <FormField
                  key={`digit${digit}`}
                  control={form.control}
                  name={`digit${digit}` as keyof z.infer<typeof formSchema>}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-16 h-16 bg-gray-200 rounded-xl border-none text-center text-xl font-bold"
                          maxLength={1}
                          onChange={(e) => {
                            field.onChange(e)
                            handleDigitInput(e, `digit${digit}`)
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <div className="text-center flex items-center justify-center gap-2 text-lg text-muted-foreground">
              <p>Code valide pour 2 minutes?</p>
              <p className="">
                <Link href="#" className="text-black font-bold underline">
                  Renvoyer le code
                </Link>
              </p>
            </div>

            <div className="flex items-center justify-center">
              <Button type="submit" className="px-16 bg-secondary rounded-xl py-6 hover:bg-green-600" disabled={isSubmitting}>
              {isSubmitting ? "Vérification..." : "Confirmer"}
            </Button>
            </div>
          </form>
        </Form>
      </motion.div>
    </div>
    </>
    
  )
}
