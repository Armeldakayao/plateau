// // "use client";

// // import { z } from "zod";
// // import { useForm } from "react-hook-form";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import {
// //   Form,
// //   FormControl,
// //   FormField,
// //   FormItem,
// //   FormLabel,
// //   FormMessage,
// // } from "@/components/ui/form";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import { Checkbox } from "@/components/ui/checkbox";
// // import { useApp } from "@/providers/app-provider";
// // import { useState } from "react";
// // import { motion } from "framer-motion";
// // import Link from "next/link";
// // import { ArrowLeft, Upload } from "lucide-react";
// // import Image from "next/image";

// // const formSchema = z
// //   .object({
// //     nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
// //     prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
// //     dateNaissance: z.string().min(1, "La date de naissance est requise"),
// //     lieuNaissance: z.string().min(1, "Le lieu de naissance est requis"),
// //     nationalite: z.string().min(1, "La nationalité est requise"),
// //     commune: z.string().min(1, "La commune est requise"),
// //     email: z.string().email("Email invalide"),
// //     telephone: z
// //       .string()
// //       .min(10, "Le numéro de téléphone doit contenir au moins 10 caractères"),
// //     password: z
// //       .string()
// //       .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
// //     confirmPassword: z
// //       .string()
// //       .min(6, "La confirmation du mot de passe est requise"),
// //     typeIdentite: z.string().min(1, "Le type de pièce d'identité est requis"),
// //     numeroIdentite: z
// //       .string()
// //       .min(1, "Le numéro de pièce d'identité est requis"),
// //     acceptTerms: z.boolean().refine((val) => val === true, {
// //       message: "Vous devez accepter les conditions d'utilisation",
// //     }),
// //     acceptDataPolicy: z.boolean().refine((val) => val === true, {
// //       message: "Vous devez accepter la politique de confidentialité",
// //     }),
// //   })
// //   .refine((data) => data.password === data.confirmPassword, {
// //     message: "Les mots de passe ne correspondent pas",
// //     path: ["confirmPassword"],
// //   });

// // export default function InscriptionPage() {
// //   const { register } = useApp();
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [error, setError] = useState("");

// //   const form = useForm<z.infer<typeof formSchema>>({
// //     resolver: zodResolver(formSchema),
// //     defaultValues: {
// //       nom: "",
// //       prenom: "",
// //       dateNaissance: "",
// //       lieuNaissance: "",
// //       nationalite: "",
// //       commune: "",
// //       email: "",
// //       telephone: "",
// //       password: "",
// //       confirmPassword: "",
// //       typeIdentite: "",
// //       numeroIdentite: "",
// //       acceptTerms: false,
// //       acceptDataPolicy: false,
// //     },
// //   });

// //   async function onSubmit(values: z.infer<typeof formSchema>) {
// //     setIsSubmitting(true);
// //     setError("");
// //     try {
// //       await register({
// //         nom: values.nom,
// //         prenom: values.prenom,
// //         email: values.email,
// //         telephone: values.telephone,
// //         commune: values.commune,
// //       });
// //     } catch (error) {
// //       setError(
// //         "Une erreur est survenue lors de l'inscription. Veuillez réessayer."
// //       );
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   }

// //   return (
// //     <div className="flex h-screen overflow-hidden">
// //       <div className="relative h-screen  ">
// //         <div className="absolute inset-0">
// //           <Image
// //             src="/images/bg-auth.jpg"
// //             alt="Personnes souriantes"
// //             // width={800}
// //             // height={500}
// //             fill
// //             className="w-full h-full object-cover "
// //           />
// //         </div>
// //         <div className="absolute inset-0 bg-secondary/50"></div>

// //         <div className="relative z-10 flex flex-col justify-center h-full px-6">
// //           <div onClick={() => window.history.back()} className="max-w-4xl mx-auto space-y-16">
// //             {/* <Button variant="ghost" className="text-white h-20 w-20 hover:bg-white/20 mb-4 p-2"> */}
// //             <ArrowLeft className="h-20 w-20 text-white" />
// //             {/* </Button> */}
// //             <h1 className="text-xl md:text-7xl font-bold text-white text-center">
// //               Inscrivez-vous pour rejoindre l'Espace Citoyen
// //             </h1>
// //           </div>
// //         </div>
// //       </div>
// //       <div className="w-full">
// //         <div className="max-h-[95vh] w-full   mx-auto py-8 px-4">
// //           {/* <div className="mb-8">
// //           <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
// //             <ArrowLeft className="mr-2 h-4 w-4" />
// //             Retour à l'accueil
// //           </Link>
// //         </div> */}

// //           <motion.div
// //             className=" "
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.5 }}
// //           >
// //             <div className="p-8">
// //               {error && (
// //                 <div className="bg-red-50 text-red-500 p-3 rounded-md mb-6 text-sm">
// //                   {error}
// //                 </div>
// //               )}

// //               <Form {...form}>
// //                 <form
// //                   onSubmit={form.handleSubmit(onSubmit)}
// //                   className="space-y-12"
// //                 >
// //                  <div className="max-h-[75vh] w-full overflow-auto">
// //                    <div >
// //                     <h2 className="text-2xl text-primary font-semibold mb-4">
// //                       Informations personnelles
// //                     </h2>
// //                     <div className="grid md:grid-cols-2 gap-6">
// //                       <FormField
// //                         control={form.control}
// //                         name="nom"
// //                         render={({ field }) => (
// //                           <FormItem>
// //                             <FormLabel className="text-lg font-normal">
// //                               Nom
// //                             </FormLabel>
// //                             <FormControl>
// //                               <Input
// //                                 {...field}
// //                                 className="py-6 rounded border border-gray-300"
// //                               />
// //                             </FormControl>
// //                             <FormMessage />
// //                           </FormItem>
// //                         )}
// //                       />

// //                       <FormField
// //                         control={form.control}
// //                         name="prenom"
// //                         render={({ field }) => (
// //                           <FormItem>
// //                             <FormLabel className="text-lg font-normal">
// //                               Prénom
// //                             </FormLabel>
// //                             <FormControl>
// //                               <Input
// //                                 {...field}
// //                                 className="py-6 rounded border border-gray-300"
// //                               />
// //                             </FormControl>
// //                             <FormMessage />
// //                           </FormItem>
// //                         )}
// //                       />

// //                       <FormField
// //                         control={form.control}
// //                         name="dateNaissance"
// //                         render={({ field }) => (
// //                           <FormItem>
// //                             <FormLabel className="text-lg font-normal">
// //                               Date de naissance
// //                             </FormLabel>
// //                             <FormControl>
// //                               <Input
// //                                 type="date"
// //                                 {...field}
// //                                 className="py-6 rounded border border-gray-300"
// //                               />
// //                             </FormControl>
// //                             <FormMessage />
// //                           </FormItem>
// //                         )}
// //                       />

// //                       <FormField
// //                         control={form.control}
// //                         name="lieuNaissance"
// //                         render={({ field }) => (
// //                           <FormItem>
// //                             <FormLabel className="text-lg font-normal">
// //                               Lieu de naissance
// //                             </FormLabel>
// //                             <FormControl>
// //                               <Input
// //                                 {...field}
// //                                 className="py-6 rounded border border-gray-300"
// //                               />
// //                             </FormControl>
// //                             <FormMessage />
// //                           </FormItem>
// //                         )}
// //                       />

// //                       <FormField
// //                         control={form.control}
// //                         name="nationalite"
// //                         render={({ field }) => (
// //                           <FormItem>
// //                             <FormLabel className="text-lg font-normal">
// //                               Nationalité
// //                             </FormLabel>
// //                             <Select
// //                               onValueChange={field.onChange}
// //                               defaultValue={field.value}
// //                             >
// //                               <FormControl>
// //                                 <SelectTrigger className="py-6 rounded border border-gray-300">
// //                                   <SelectValue placeholder="Sélectionnez votre nationalité" />
// //                                 </SelectTrigger>
// //                               </FormControl>
// //                               <SelectContent>
// //                                 <SelectItem value="francaise">
// //                                   Française
// //                                 </SelectItem>
// //                                 <SelectItem value="autre">Autre</SelectItem>
// //                               </SelectContent>
// //                             </Select>
// //                             <FormMessage />
// //                           </FormItem>
// //                         )}
// //                       />

// //                       <FormField
// //                         control={form.control}
// //                         name="commune"
// //                         render={({ field }) => (
// //                           <FormItem>
// //                             <FormLabel className="text-lg font-normal">
// //                               Commune
// //                             </FormLabel>
// //                             <Select
// //                               onValueChange={field.onChange}
// //                               defaultValue={field.value}
// //                             >
// //                               <FormControl>
// //                                 <SelectTrigger className="py-6 rounded border border-gray-300">
// //                                   <SelectValue placeholder="Sélectionnez votre commune" />
// //                                 </SelectTrigger>
// //                               </FormControl>
// //                               <SelectContent>
// //                                 <SelectItem value="le-plateau">
// //                                   Le Plateau
// //                                 </SelectItem>
// //                                 <SelectItem value="autre">
// //                                   Autre commune
// //                                 </SelectItem>
// //                               </SelectContent>
// //                             </Select>
// //                             <FormMessage />
// //                           </FormItem>
// //                         )}
// //                       />
// //                     </div>
// //                   </div>

// //                   <div>
// //                     <h2 className="text-2xl text-primary font-semibold mb-4">
// //                       Contacts & Sécurité
// //                     </h2>
// //                     <div className="grid md:grid-cols-2 gap-6">
// //                       <FormField
// //                         control={form.control}
// //                         name="email"
// //                         render={({ field }) => (
// //                           <FormItem>
// //                             <FormLabel className="text-lg font-normal">
// //                               Email
// //                             </FormLabel>
// //                             <FormControl>
// //                               <Input
// //                                 type="email"
// //                                 {...field}
// //                                 className="py-6 rounded border border-gray-300"
// //                               />
// //                             </FormControl>
// //                             <FormMessage />
// //                           </FormItem>
// //                         )}
// //                       />

// //                       <FormField
// //                         control={form.control}
// //                         name="telephone"
// //                         render={({ field }) => (
// //                           <FormItem>
// //                             <FormLabel className="text-lg font-normal">
// //                               Téléphone mobile
// //                             </FormLabel>
// //                             <FormControl>
// //                               <Input
// //                                 type="tel"
// //                                 {...field}
// //                                 className="py-6 rounded border border-gray-300"
// //                               />
// //                             </FormControl>
// //                             <FormMessage />
// //                           </FormItem>
// //                         )}
// //                       />

// //                       <FormField
// //                         control={form.control}
// //                         name="password"
// //                         render={({ field }) => (
// //                           <FormItem>
// //                             <FormLabel className="text-lg font-normal">
// //                               Mot de passe
// //                             </FormLabel>
// //                             <FormControl>
// //                               <Input
// //                                 type="password"
// //                                 {...field}
// //                                 className="py-6 rounded border border-gray-300"
// //                               />
// //                             </FormControl>
// //                             <FormMessage />
// //                           </FormItem>
// //                         )}
// //                       />

// //                       <FormField
// //                         control={form.control}
// //                         name="confirmPassword"
// //                         render={({ field }) => (
// //                           <FormItem>
// //                             <FormLabel className="text-lg font-normal">
// //                               Confirmer mot de passe
// //                             </FormLabel>
// //                             <FormControl>
// //                               <Input
// //                                 type="password"
// //                                 {...field}
// //                                 className="py-6 rounded border border-gray-300"
// //                               />
// //                             </FormControl>
// //                             <FormMessage />
// //                           </FormItem>
// //                         )}
// //                       />
// //                     </div>
// //                   </div>

// //                   <div>
// //                     <h2 className="text-2xl text-primary font-semibold mb-4">
// //                       Justificatifs
// //                     </h2>
// //                     <div className="grid md:grid-cols-2 gap-6">
// //                       <FormField
// //                         control={form.control}
// //                         name="typeIdentite"
// //                         render={({ field }) => (
// //                           <FormItem>
// //                             <FormLabel className="text-lg font-normal">
// //                               Type de pièce d'identité
// //                             </FormLabel>
// //                             <Select
// //                               onValueChange={field.onChange}
// //                               defaultValue={field.value}
// //                             >
// //                               <FormControl>
// //                                 <SelectTrigger className="py-6 rounded border border-gray-300">
// //                                   <SelectValue placeholder="Sélectionnez un type" />
// //                                 </SelectTrigger>
// //                               </FormControl>
// //                               <SelectContent>
// //                                 <SelectItem value="cni">
// //                                   Carte Nationale d'Identité
// //                                 </SelectItem>
// //                                 <SelectItem value="passeport">
// //                                   Passeport
// //                                 </SelectItem>
// //                                 <SelectItem value="permis">
// //                                   Permis de conduire
// //                                 </SelectItem>
// //                               </SelectContent>
// //                             </Select>
// //                             <FormMessage />
// //                           </FormItem>
// //                         )}
// //                       />

// //                       <FormField
// //                         control={form.control}
// //                         name="numeroIdentite"
// //                         render={({ field }) => (
// //                           <FormItem>
// //                             <FormLabel className="text-lg font-normal">
// //                               Numéro de pièce
// //                             </FormLabel>
// //                             <FormControl>
// //                               <Input
// //                                 {...field}
// //                                 className="py-6 rounded border border-gray-300"
// //                               />
// //                             </FormControl>
// //                             <FormMessage />
// //                           </FormItem>
// //                         )}
// //                       />
// //                     </div>

// //                     <div className="mt-4 p-10 border border-dashed rounded bg-gray-200">
// //                       <div className="flex items-center justify-center flex-col p-4">
// //                         <Upload className="h-8 w-8 text-green-500 mb-2" />
// //                         <p className="text-sm font-medium mb-1">
// //                           Télécharger la pièce
// //                         </p>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   <div className="space-y-4">
// //                     <FormField
// //                       control={form.control}
// //                       name="acceptTerms"
// //                       render={({ field }) => (
// //                         <FormItem className="flex flex-row items-start space-x-3 space-y-0">
// //                           <FormControl>
// //                             <Checkbox
// //                               checked={field.value}
// //                               onCheckedChange={field.onChange}
// //                             />
// //                           </FormControl>
// //                           <div className="space-y-1 leading-none">
// //                             <FormLabel className="text-lg font-normal">
// //                               J'accepte les conditions générales d'utilisation
// //                             </FormLabel>
// //                             <FormMessage />
// //                           </div>
// //                         </FormItem>
// //                       )}
// //                     />

// //                     <FormField
// //                       control={form.control}
// //                       name="acceptDataPolicy"
// //                       render={({ field }) => (
// //                         <FormItem className="flex flex-row items-start space-x-3 space-y-0">
// //                           <FormControl>
// //                             <Checkbox
// //                               checked={field.value}
// //                               onCheckedChange={field.onChange}
// //                             />
// //                           </FormControl>
// //                           <div className="space-y-1 leading-none">
// //                             <FormLabel className="text-lg font-normal">
// //                               Je consens au traitement de mes données
// //                               personnelles
// //                             </FormLabel>
// //                             <FormMessage />
// //                           </div>
// //                         </FormItem>
// //                       )}
// //                     />
// //                   </div>
// //                  </div>

// //                   <Button
// //                     type="submit"
// //                     className="w-full bg-green-500 hover:bg-green-600"
// //                     disabled={isSubmitting}
// //                   >
// //                     {isSubmitting ? "Création en cours..." : "Créer mon compte"}
// //                   </Button>
// //                 </form>
// //               </Form>

// //               <div className="mt-6 text-center">
// //                 <p className="text-lg text-black">
// //                   Vous avez déjà un compte ?{" "}
// //                   <Link
// //                     href="/connexion"
// //                     className="text-black font-bold underline"
// //                   >
// //                    Connectez-vous
// //                   </Link>
// //                 </p>
// //               </div>
// //             </div>
// //           </motion.div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// "use client"
// import { z } from "zod"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Checkbox } from "@/components/ui/checkbox"
// import { useApp } from "@/providers/app-provider"
// import { useState } from "react"
// import { motion } from "framer-motion"
// import Link from "next/link"
// import { ArrowLeft, Upload } from "lucide-react"
// import Image from "next/image"

// const formSchema = z
//   .object({
//     nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
//     prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
//     dateNaissance: z.string().min(1, "La date de naissance est requise"),
//     lieuNaissance: z.string().min(1, "Le lieu de naissance est requis"),
//     nationalite: z.string().min(1, "La nationalité est requise"),
//     commune: z.string().min(1, "La commune est requise"),
//     email: z.string().email("Email invalide"),
//     telephone: z.string().min(10, "Le numéro de téléphone doit contenir au moins 10 caractères"),
//     password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
//     confirmPassword: z.string().min(6, "La confirmation du mot de passe est requise"),
//     typeIdentite: z.string().min(1, "Le type de pièce d'identité est requis"),
//     numeroIdentite: z.string().min(1, "Le numéro de pièce d'identité est requis"),
//     acceptTerms: z.boolean().refine((val) => val === true, {
//       message: "Vous devez accepter les conditions d'utilisation",
//     }),
//     acceptDataPolicy: z.boolean().refine((val) => val === true, {
//       message: "Vous devez accepter la politique de confidentialité",
//     }),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Les mots de passe ne correspondent pas",
//     path: ["confirmPassword"],
//   })

// export default function InscriptionPage() {
//   const { register } = useApp()
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [error, setError] = useState("")

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       nom: "",
//       prenom: "",
//       dateNaissance: "",
//       lieuNaissance: "",
//       nationalite: "",
//       commune: "",
//       email: "",
//       telephone: "",
//       password: "",
//       confirmPassword: "",
//       typeIdentite: "",
//       numeroIdentite: "",
//       acceptTerms: false,
//       acceptDataPolicy: false,
//     },
//   })

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     setIsSubmitting(true)
//     setError("")
//     try {
//       await register({
//         nom: values.nom,
//         prenom: values.prenom,
//         email: values.email,
//         telephone: values.telephone,
//         commune: values.commune,
//       })
//     } catch (error) {
//       setError("Une erreur est survenue lors de l'inscription. Veuillez réessayer.")
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <div className="min-h-screen relative overflow-hidden bg-blue-900">
//       {/* Background Image - Full Screen */}
//       <div className="absolute  inset-0 z-0">
//         <Image src="/images/bg-signup.jpg" alt="Personnes souriantes" height={100}  width={1200} className="w-full h-full object-contain" />
//         {/* <div className="absolute inset-0 bg-secondary/50"></div> */}
//       </div>

//       {/* Back Button and Title */}
//       <div className="relative z-10 pt-8 px-6">
//         <div className="max-w-4xl mx-auto">
//           <div onClick={() => window.history.back()} className="cursor-pointer mb-8">
//             <ArrowLeft className="h-12 w-12 text-white hover:text-white/80 transition-colors" />
//           </div>
//           <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-8">
//             Inscrivez-vous pour rejoindre l'Espace Citoyen
//           </h1>
//         </div>
//       </div>

//       {/* Form Overlay */}
//       <div className="relative z-10 flex justify-center px-4 pb-8">
//         <motion.div
//           className="w-full max-w-4xl"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mx-4">
//             {error && <div className="bg-red-50 text-red-500 p-3 rounded-md mb-6 text-sm">{error}</div>}

//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//                 <div className="max-h-[45vh] overflow-auto pr-2">
//                   {/* Informations personnelles */}
//                   <div className="mb-8">
//                     <h2 className="text-xl text-primary font-semibold mb-4">Informations personnelles</h2>
//                     <div className="grid md:grid-cols-2 gap-4">
//                       <FormField
//                         control={form.control}
//                         name="nom"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="text-sm font-normal">Nom</FormLabel>
//                             <FormControl>
//                               <Input {...field} className="py-3 rounded border border-gray-300" />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name="prenom"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="text-sm font-normal">Prénom</FormLabel>
//                             <FormControl>
//                               <Input {...field} className="py-3 rounded border border-gray-300" />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name="dateNaissance"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="text-sm font-normal">Date de naissance</FormLabel>
//                             <FormControl>
//                               <Input type="date" {...field} className="py-3 rounded border border-gray-300" />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name="lieuNaissance"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="text-sm font-normal">Lieu de naissance</FormLabel>
//                             <FormControl>
//                               <Input {...field} className="py-3 rounded border border-gray-300" />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name="nationalite"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="text-sm font-normal">Nationalité</FormLabel>
//                             <Select onValueChange={field.onChange} defaultValue={field.value}>
//                               <FormControl>
//                                 <SelectTrigger className="py-3 rounded border border-gray-300">
//                                   <SelectValue placeholder="Sélectionnez votre nationalité" />
//                                 </SelectTrigger>
//                               </FormControl>
//                               <SelectContent>
//                                 <SelectItem value="francaise">Française</SelectItem>
//                                 <SelectItem value="autre">Autre</SelectItem>
//                               </SelectContent>
//                             </Select>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name="commune"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="text-sm font-normal">Commune</FormLabel>
//                             <Select onValueChange={field.onChange} defaultValue={field.value}>
//                               <FormControl>
//                                 <SelectTrigger className="py-3 rounded border border-gray-300">
//                                   <SelectValue placeholder="Sélectionnez votre commune" />
//                                 </SelectTrigger>
//                               </FormControl>
//                               <SelectContent>
//                                 <SelectItem value="le-plateau">Le Plateau</SelectItem>
//                                 <SelectItem value="autre">Autre commune</SelectItem>
//                               </SelectContent>
//                             </Select>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                   </div>

//                   {/* Contacts & Sécurité */}
//                   <div className="mb-8">
//                     <h2 className="text-xl text-primary font-semibold mb-4">Contacts & Sécurité</h2>
//                     <div className="grid md:grid-cols-2 gap-4">
//                       <FormField
//                         control={form.control}
//                         name="email"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="text-sm font-normal">Email</FormLabel>
//                             <FormControl>
//                               <Input type="email" {...field} className="py-3 rounded border border-gray-300" />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name="telephone"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="text-sm font-normal">Téléphone mobile</FormLabel>
//                             <FormControl>
//                               <Input type="tel" {...field} className="py-3 rounded border border-gray-300" />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name="password"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="text-sm font-normal">Mot de passe</FormLabel>
//                             <FormControl>
//                               <Input type="password" {...field} className="py-3 rounded border border-gray-300" />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name="confirmPassword"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="text-sm font-normal">Confirmer mot de passe</FormLabel>
//                             <FormControl>
//                               <Input type="password" {...field} className="py-3 rounded border border-gray-300" />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                   </div>

//                   {/* Justificatifs */}
//                   <div className="mb-8">
//                     <h2 className="text-xl text-primary font-semibold mb-4">Justificatifs</h2>
//                     <div className="grid md:grid-cols-2 gap-4">
//                       <FormField
//                         control={form.control}
//                         name="typeIdentite"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="text-sm font-normal">Type de pièce d'identité</FormLabel>
//                             <Select onValueChange={field.onChange} defaultValue={field.value}>
//                               <FormControl>
//                                 <SelectTrigger className="py-3 rounded border border-gray-300">
//                                   <SelectValue placeholder="Sélectionnez un type" />
//                                 </SelectTrigger>
//                               </FormControl>
//                               <SelectContent>
//                                 <SelectItem value="cni">Carte Nationale d'Identité</SelectItem>
//                                 <SelectItem value="passeport">Passeport</SelectItem>
//                                 <SelectItem value="permis">Permis de conduire</SelectItem>
//                               </SelectContent>
//                             </Select>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name="numeroIdentite"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="text-sm font-normal">Numéro de pièce</FormLabel>
//                             <FormControl>
//                               <Input {...field} className="py-3 rounded border border-gray-300" />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                     <div className="mt-4 p-6 border border-dashed rounded bg-gray-50">
//                       <div className="flex items-center justify-center flex-col">
//                         <Upload className="h-6 w-6 text-green-500 mb-2" />
//                         <p className="text-sm font-medium">Télécharger la pièce</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Consentements */}
//                   <div className="space-y-4 mb-6">
//                     <FormField
//                       control={form.control}
//                       name="acceptTerms"
//                       render={({ field }) => (
//                         <FormItem className="flex flex-row items-start space-x-3 space-y-0">
//                           <FormControl>
//                             <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//                           </FormControl>
//                           <div className="space-y-1 leading-none">
//                             <FormLabel className="text-sm font-normal">
//                               J'accepte les conditions générales d'utilisation
//                             </FormLabel>
//                             <FormMessage />
//                           </div>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="acceptDataPolicy"
//                       render={({ field }) => (
//                         <FormItem className="flex flex-row items-start space-x-3 space-y-0">
//                           <FormControl>
//                             <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//                           </FormControl>
//                           <div className="space-y-1 leading-none">
//                             <FormLabel className="text-sm font-normal">
//                               Je consens au traitement de mes données personnelles
//                             </FormLabel>
//                             <FormMessage />
//                           </div>
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                 </div>

//                 <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 py-3" disabled={isSubmitting}>
//                   {isSubmitting ? "Création en cours..." : "Créer mon compte"}
//                 </Button>
//               </form>
//             </Form>

//             <div className="mt-6 text-center">
//               <p className="text-sm text-black">
//                 Vous avez déjà un compte ?{" "}
//                 <Link href="/connexion" className="text-black font-bold underline">
//                   Connectez-vous
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   )
// }
"use client"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useApp } from "@/providers/app-provider"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Upload, ChevronRight, ChevronLeft, Check } from "lucide-react"
import Image from "next/image"

const formSchema = z
  .object({
    nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
    dateNaissance: z.string().min(1, "La date de naissance est requise"),
    lieuNaissance: z.string().min(1, "Le lieu de naissance est requis"),
    nationalite: z.string().min(1, "La nationalité est requise"),
    commune: z.string().min(1, "La commune est requise"),
    email: z.string().email("Email invalide"),
    telephone: z.string().min(10, "Le numéro de téléphone doit contenir au moins 10 caractères"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    confirmPassword: z.string().min(6, "La confirmation du mot de passe est requise"),
    typeIdentite: z.string().min(1, "Le type de pièce d'identité est requis"),
    numeroIdentite: z.string().min(1, "Le numéro de pièce d'identité est requis"),
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
    fields: ["nom", "prenom", "dateNaissance", "lieuNaissance"],
  },
  {
    id: 2,
    title: "Localisation",
    description: "Nationalité et commune",
    fields: ["nationalite", "commune"],
  },
  {
    id: 3,
    title: "Contacts & Sécurité",
    description: "Email et mot de passe",
    fields: ["email", "telephone", "password", "confirmPassword"],
  },
  {
    id: 4,
    title: "Justificatifs",
    description: "Pièce d'identité",
    fields: ["typeIdentite", "numeroIdentite"],
  },
  {
    id: 5,
    title: "Validation",
    description: "Consentements finaux",
    fields: ["acceptTerms", "acceptDataPolicy"],
  },
]

export default function InscriptionPage() {
  const { register } = useApp()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
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
    setIsSubmitting(true)
    setError("")
    try {
      await register({
        nom: values.nom,
        prenom: values.prenom,
        email: values.email,
        telephone: values.telephone,
        commune: values.commune,
      })
    } catch (error) {
      setError("Une erreur est survenue lors de l'inscription. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal">Nom *</FormLabel>
                    <FormControl>
                      <Input {...field} className="py-3 rounded border border-gray-300" />
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
                    <FormLabel className="text-sm font-normal">Prénom *</FormLabel>
                    <FormControl>
                      <Input {...field} className="py-3 rounded border border-gray-300" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dateNaissance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal">Date de naissance *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} className="py-3 rounded border border-gray-300" />
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
                    <FormLabel className="text-sm font-normal">Lieu de naissance *</FormLabel>
                    <FormControl>
                      <Input {...field} className="py-3 rounded border border-gray-300" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nationalite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal">Nationalité *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="py-3 rounded border border-gray-300">
                          <SelectValue placeholder="Sélectionnez votre nationalité" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="francaise">Française</SelectItem>
                        <SelectItem value="ivoirienne">Ivoirienne</SelectItem>
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
                    <FormLabel className="text-sm font-normal">Commune *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="py-3 rounded border border-gray-300">
                          <SelectValue placeholder="Sélectionnez votre commune" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="le-plateau">Le Plateau</SelectItem>
                        <SelectItem value="cocody">Cocody</SelectItem>
                        <SelectItem value="yopougon">Yopougon</SelectItem>
                        <SelectItem value="autre">Autre commune</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal">Email *</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} className="py-3 rounded border border-gray-300" />
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
                    <FormLabel className="text-sm font-normal">Téléphone mobile *</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} className="py-3 rounded border border-gray-300" />
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
                      <Input type="password" {...field} className="py-3 rounded border border-gray-300" />
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
                      <Input type="password" {...field} className="py-3 rounded border border-gray-300" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="typeIdentite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal">Type de pièce d'identité *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="py-3 rounded border border-gray-300">
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
                name="numeroIdentite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal">Numéro de pièce *</FormLabel>
                    <FormControl>
                      <Input {...field} className="py-3 rounded border border-gray-300" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-4 p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center justify-center flex-col">
                <Upload className="h-8 w-8 text-green-500 mb-2" />
                <p className="text-sm font-medium text-gray-700">Télécharger la pièce d'identité</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG jusqu'à 5MB</p>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-lg">
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
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-lg">
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
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen relative bg-[#071827] overflow-hidden">
      {/* Background Image - Full Screen */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/bg-signup.jpg" alt="Personnes souriantes" fill className="w-full h-full object-contain" />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Back Button and Title */}
      <div className="relative z-10 pt-48 px-6">
        <div className="max-w-4xl mx-auto">
          <div onClick={() => window.history.back()} className="cursor-pointer mb-8">
            <ArrowLeft className="h-12 w-12 text-white hover:text-white/80 transition-colors" />
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-8">
            Inscrivez-vous pour rejoindre l'Espace Citoyen
          </h1>
        </div>
      </div>

      {/* Form Overlay */}
      <div className="relative z-10 flex justify-center px-4 pb-8">
        <motion.div
          className="w-full max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mx-4">
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                        currentStep === step.id
                          ? "bg-blue-500 text-white"
                          : isStepCompleted(step.id)
                            ? "bg-green-500 text-white"
                            : currentStep > step.id
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {currentStep > step.id || isStepCompleted(step.id) ? <Check className="w-5 h-5" /> : step.id}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-12 h-1 mx-2 transition-all ${
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
            </div>

            {error && <div className="bg-red-50 text-red-500 p-3 rounded-md mb-6 text-sm">{error}</div>}

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
                <div className="flex justify-between pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Précédent
                  </Button>

                  {currentStep < steps.length ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600"
                    >
                      Suivant
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="flex items-center gap-2 bg-green-500 hover:bg-green-600"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Création en cours..." : "Créer mon compte"}
                      <Check className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-sm text-black">
                Vous avez déjà un compte ?{" "}
                <Link href="/connexion" className="text-black font-bold underline">
                  Connectez-vous
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
