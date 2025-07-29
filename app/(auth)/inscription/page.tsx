"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useApp } from "@/providers/app-provider";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Upload } from "lucide-react";
import Image from "next/image";

const formSchema = z
  .object({
    nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
    dateNaissance: z.string().min(1, "La date de naissance est requise"),
    lieuNaissance: z.string().min(1, "Le lieu de naissance est requis"),
    nationalite: z.string().min(1, "La nationalité est requise"),
    commune: z.string().min(1, "La commune est requise"),
    email: z.string().email("Email invalide"),
    telephone: z
      .string()
      .min(10, "Le numéro de téléphone doit contenir au moins 10 caractères"),
    password: z
      .string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    confirmPassword: z
      .string()
      .min(6, "La confirmation du mot de passe est requise"),
    typeIdentite: z.string().min(1, "Le type de pièce d'identité est requis"),
    numeroIdentite: z
      .string()
      .min(1, "Le numéro de pièce d'identité est requis"),
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
  });

export default function InscriptionPage() {
  const { register } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      dateNaissance: "",
      lieuNaissance: "",
      nationalite: "",
      commune: "",
      email: "",
      telephone: "",
      password: "",
      confirmPassword: "",
      typeIdentite: "",
      numeroIdentite: "",
      acceptTerms: false,
      acceptDataPolicy: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setError("");
    try {
      await register({
        nom: values.nom,
        prenom: values.prenom,
        email: values.email,
        telephone: values.telephone,
        commune: values.commune,
      });
    } catch (error) {
      setError(
        "Une erreur est survenue lors de l'inscription. Veuillez réessayer."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="relative min-h-[60vh] py-10 rounded-b-2xl ">
        <div className="absolute inset-0">
          <Image
            src="/images/auth-bg.svg"
            alt="Personnes souriantes"
            // width={800}
            // height={500}
            fill
            className="w-full h-full object-cover rounded-b-[60px]"
          />
        </div>
        <div className="absolute inset-0 bg-secondary/50 rounded-b-[60px]"></div>

        <div className="relative z-10 flex flex-col justify-center h-full px-6">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* <Button variant="ghost" className="text-white h-20 w-20 hover:bg-white/20 mb-4 p-2"> */}
            <ArrowLeft className="h-20 w-20 text-white" />
            {/* </Button> */}
            <h1 className="text-xl md:text-7xl font-bold text-white text-center">
              Inscrivez-vous pour rejoindre l'Espace Citoyen
            </h1>
          </div>
        </div>
      </div>
      <div className="min-h-screen bg-gray-50">
        <div className="container lg:max-w-5xl mx-auto py-8 px-4">
          {/* <div className="mb-8">
          <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Link>
        </div> */}

          <motion.div
            className=" "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-8">
              {error && (
                <div className="bg-red-50 text-red-500 p-3 rounded-md mb-6 text-sm">
                  {error}
                </div>
              )}

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-12"
                >
                  <div>
                    <h2 className="text-2xl text-primary font-semibold mb-4">
                      Informations personnelles
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="nom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-normal">
                              Nom
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="py-6 rounded border border-gray-300"
                              />
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
                            <FormLabel className="text-lg font-normal">
                              Prénom
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="py-6 rounded border border-gray-300"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="dateNaissance"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-normal">
                              Date de naissance
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                {...field}
                                className="py-6 rounded border border-gray-300"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lieuNaissance"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-normal">
                              Lieu de naissance
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="py-6 rounded border border-gray-300"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="nationalite"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-normal">
                              Nationalité
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="py-6 rounded border border-gray-300">
                                  <SelectValue placeholder="Sélectionnez votre nationalité" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="francaise">
                                  Française
                                </SelectItem>
                                <SelectItem value="autre">Autre</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="commune"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-normal">
                              Commune
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="py-6 rounded border border-gray-300">
                                  <SelectValue placeholder="Sélectionnez votre commune" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="le-plateau">
                                  Le Plateau
                                </SelectItem>
                                <SelectItem value="autre">
                                  Autre commune
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl text-primary font-semibold mb-4">
                      Contacts & Sécurité
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-normal">
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                {...field}
                                className="py-6 rounded border border-gray-300"
                              />
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
                            <FormLabel className="text-lg font-normal">
                              Téléphone mobile
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                {...field}
                                className="py-6 rounded border border-gray-300"
                              />
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
                            <FormLabel className="text-lg font-normal">
                              Mot de passe
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                {...field}
                                className="py-6 rounded border border-gray-300"
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
                            <FormLabel className="text-lg font-normal">
                              Confirmer mot de passe
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                {...field}
                                className="py-6 rounded border border-gray-300"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl text-primary font-semibold mb-4">
                      Justificatifs
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="typeIdentite"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-normal">
                              Type de pièce d'identité
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="py-6 rounded border border-gray-300">
                                  <SelectValue placeholder="Sélectionnez un type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="cni">
                                  Carte Nationale d'Identité
                                </SelectItem>
                                <SelectItem value="passeport">
                                  Passeport
                                </SelectItem>
                                <SelectItem value="permis">
                                  Permis de conduire
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="numeroIdentite"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-normal">
                              Numéro de pièce
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="py-6 rounded border border-gray-300"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mt-4 p-10 border border-dashed rounded bg-gray-200">
                      <div className="flex items-center justify-center flex-col p-4">
                        <Upload className="h-8 w-8 text-green-500 mb-2" />
                        <p className="text-sm font-medium mb-1">
                          Télécharger la pièce
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="acceptTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-lg font-normal">
                              J'accepte les conditions générales d'utilisation
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="acceptDataPolicy"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-lg font-normal">
                              Je consens au traitement de mes données
                              personnelles
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Création en cours..." : "Créer mon compte"}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 text-center">
                <p className="text-lg text-black">
                  Vous avez déjà un compte ?{" "}
                  <Link
                    href="/connexion"
                    className="text-black font-bold underline"
                  >
                   Connectez-vous
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
