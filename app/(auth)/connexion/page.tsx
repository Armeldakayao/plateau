"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useApp } from "@/providers/app-provider"
import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
})

export default function ConnexionPage() {
  const { login } = useApp()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setError("")
    try {
      await login(values.email, values.password)
      router.push("/verification-otp")
    } catch (error) {
      setError("Identifiants incorrects. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <motion.div
        className="w-full md:w-1/2 bg-green-500 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-secondary/50 z-10"></div>
        <Image src="/images/auth-bg.svg" alt="Connexion" fill className="object-cover" />
        
      </motion.div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-8">
            <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Link>
          </div>

          <h2 className="text-4xl text-center leading-10 font-bold mb-10">Connectez-vous en tant que Citoyen</h2>

          {error && <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4 text-sm">{error}</div>}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-normal">Email ou Numéro de telephone</FormLabel>
                    <FormControl>
                      <Input placeholder="votre@email.com ou 06 00 00 00 00" {...field} className="py-6 rounded border border-gray-300" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-normal">Mot de passe</FormLabel>
                    <FormControl>
                     <div className="py-1 px-2 rounded border border-gray-300 flex justify-between items-center gap-2">
                       <Input type="password" placeholder="••••••••" {...field} className="border-none w-full p-0" />
                        <p className=" ">
              <Link href="/mot-de-passe-oublie" className="underline flex  font-semibold text-lg">
                Oublié?
              </Link>
            </p>
                     </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-secondary py-6 text-white text-lg rounded hover:bg-green-600" disabled={isSubmitting}>
                {isSubmitting ? "Connexion en cours..." : "Se connecter"}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-lg text-black">
              Vous n'avez pas de compte ?{" "}
              <Link href="/inscription" className="text-black font-bold underline">
               Inscrivez-vous
              </Link>
            </p>
           
          </div>
        </motion.div>
      </div>
    </div>
  )
}
