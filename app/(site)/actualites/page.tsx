// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardTitle,
// } from "@/components/ui/card";
// import { Search } from "lucide-react";
// import ServiceCard from "@/components/service-card";

// export default function Home() {
//   // Dummy data for news cards to easily map and render
//   const newsArticles = [
//     {
//       category: "Communiqué officiel",
//       date: "01 Juin 2025",
//       title: "Projet de rénovation urbaine",
//       description:
//         "La Mairie du Plateau a lancé un ambitieux projet de rénovation urbaine visant à moderniser les infrastructures et améliorer le cadre de vie des habitants.",
//       imageSrc: "/placeholder.svg?height=150&width=250",
//     },
//     {
//       category: "Vie citoyenne",
//       date: "28 Mai 2025",
//       title: "Ateliers de participation citoyenne",
//       description:
//         "Des ateliers participatifs sont organisés pour recueillir les avis des citoyens sur les projets de développement local.",
//       imageSrc: "/placeholder.svg?height=150&width=250",
//     },
//     {
//       category: "Travaux publics",
//       date: "25 Mai 2025",
//       title: "Avancement des chantiers routiers",
//       description:
//         "Les travaux de réhabilitation des principales artères du Plateau progressent selon le calendrier prévu.",
//       imageSrc: "/placeholder.svg?height=150&width=250",
//     },
//     {
//       category: "Événementiel",
//       date: "21 Mai 2025",
//       title: "Fête de la Musique 2025",
//       description:
//         "La Fête de la Musique revient au Plateau avec une programmation riche et variée, promettant une journée pleine de mélodies et de festivités.",
//       imageSrc: "/placeholder.svg?height=150&width=250",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header Section */}
//       <header className="relative bg-primary text-white py-16 md:py-40 overflow-hidden">
//  <Image
//             src="/images/service2.svg" // ← Remplace par ton image réelle
//             alt="Image de fond section services"
//             fill
//             className="object-cover  z-0"
//             priority
//           />
//         <div className="relative container py-28 mx-auto px-4 text-center">
//           <h1 className="text-4xl md:text-7xl pt-7 font-bold mb-4">
//             ACTUALITÉS & COMMUNIQUÉS
//           </h1>
//           <p className="text-lg md:text-3xl max-w-5xl mx-auto mb-8">
//             Retrouvez ici toutes les informations officielles, événements et
//             mises à jour de la Mairie du Plateau.
//           </p>
//           <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-3xl mx-auto">
//             <div className="relative flex-1 w-full">
//               <Input
//                 type="text"
//                 placeholder="Rechercher un article"
//                 className="w-full pl-10 pr-4 py-7  bg-white text-gray-800 border-none focus:ring-2 focus:ring-blue-500"
//               />
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
//             </div>
//             <Select>
//               <SelectTrigger className="w-full md:w-[180px]  py-7 rounded-[5px]  bg-white text-gray-800 border-none focus:ring-2 focus:ring-blue-500">
//                 <SelectValue className="placeholder:font-medium  placeholder:text-lg placeholder:text-primary" placeholder="Filtré par" />
//               </SelectTrigger>
//               <SelectContent className="bg-white text-gray-800">
//                 <SelectItem value="all">Tout</SelectItem>
//                 <SelectItem value="official">Communiqué officiel</SelectItem>
//                 <SelectItem value="citizen">Vie citoyenne</SelectItem>
//                 <SelectItem value="public-works">Travaux publics</SelectItem>
//                 <SelectItem value="events">Événementiel</SelectItem>
//               </SelectContent>
//             </Select>
//             <Select>
//               <SelectTrigger className="w-full md:w-[180px] py-7 rounded-[5px]  bg-secondary text-gray-800 border-none focus:ring-2 focus:ring-blue-500">
//                 <SelectValue placeholder="Période" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">Toutes les périodes</SelectItem>
//                 <SelectItem value="today">Aujourd&apos;hui</SelectItem>
//                 <SelectItem value="week">Cette semaine</SelectItem>
//                 <SelectItem value="month">Ce mois-ci</SelectItem>
//                 <SelectItem value="year">Cette année</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </header>

//       <main className="container mx-auto px-4 py-12 md:py-16">
//         {/* Featured Section */}
//         <section className="mb-16">
//           <h2 className="text-5xl font-bold text-center text-primary mb-8">
//             À la Une
//           </h2>
//           <Card className="border-none shadow-none mx-auto rounded-lg overflow-hidden">
//             <Image
//               src="/images/mairie.svg"
//               alt="Réouverture de la Maison du Citoyen"
//               width={500}
//               height={450}
//               className="w-full h-auto object-cover"
//             />
//             <CardContent className="p-6 text-center">
//               <span className="inline-block  text-secondary text-3xl font-semibold px-3 py-1 rounded-full mb-3">
//                 Communiqué officiel
//               </span>
//               <CardTitle className="text-4xl font-bold text-gray-800 mb-2">
//                 Réouverture de la Maison du Citoyen
//               </CardTitle>
//               <CardDescription className="text-gray-400 text-3xl mt-4 font-bold mb-4">
//                 04 Juin 2025
//               </CardDescription>
//               <p className="text-gray-600 leading-10 mx-auto max-w-5xl text-2xl mb-6">
//                 La Mairie du Plateau annonce la réouverture officielle de la
//                 Maison du Citoyen à partir du lundi 17 juin 2025. Les travaux de
//                 réaménagement ont permis d&apos;intégrer un guichet unique
//                 numérique, des bornes interactives et un espace d&apos;accueil
//                 modernisé. 👉 Les horaires restent inchangés : du lundi au
//                 vendredi, de 08h à 17h.
//               </p>
//               <Button
//                 variant="outline"
//                 className="border-green-600 text-xl py-5 text-green-600 hover:bg-green-600 hover:text-white bg-transparent font-bold rounded-[4px]"
//               >
//                 Lire la suite
//               </Button>
//             </CardContent>
//           </Card>
//         </section>

//         {/* Latest News Section */}
//         <section className="mb-16">
//           <h2 className="text-4xl font-bold  text-primary mb-8">
//             Dernières actualités
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-16">
//             {newsArticles.map((article, index) => (
//               <Card
//                 key={index}
//                 className="rounded-[5px] p-0 bg-transparent shadow-none border-none overflow-hidden relative"
//               >
//                 <div className="h-[200px] overflow-hidden">
//                   <Image
//                     src={ "/images/mairie.svg"}
//                     alt={article.title}
//                     width={500}
//                     height={405}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <CardContent className=" flex bg-transparent min-h-2xl max-h-2xl overflow-auto relative shadow-none border-none p-0 -mt-8 rounded-t-lg z-10">
//                   <div className="w-10"></div>
//                   <div className="w-full bg-gray-100 space-y-4 p-10 rounded-[8px]  shadow">
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="inline-block bg-green-600 p-2  text-white text-lg mb-2 font-semibold px-4 py-1 rounded-[4px]">
//                         {article.category}
//                       </span>
//                       <span className="text-gray-500 text-lg">
//                         {article.date}
//                       </span>
//                     </div>
//                     <CardTitle className="text-2xl font-bold text-black mb-2">
//                       {article.title}
//                     </CardTitle>
//                     <p className="text-gray-700 text-xl line-clamp-3 mb-4">
//                       {article.description.slice(0, 100)}...
//                     </p>
//                     <Button
//                       variant="link"
//                       className="p-0 h-auto text-green-600 text-xl hover:underline flex items-center gap-1"
//                     >
//                       Lire tout <span className="text-xl">›</span>
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </section>

//         {/* Upcoming Events Section */}

//         {/* Service Card Section - Example Usage */}
//       </main>
//     <section className="relative bg-primary text-white py-12 md:py-28 rounded-lg shadow-lg overflow-hidden">
//   {/* VIDEO BACKGROUND */}
//   <video
//     autoPlay
//     loop
//     muted
//     playsInline
//     className="absolute top-0 left-0 w-full h-full object-cover z-0"
//   >
//     <source src="/videos/blue-digital.mp4" type="video/mp4" />
//     Votre navigateur ne supporte pas la vidéo.
//   </video>

//   {/* OVERLAY SOMBRE (optionnel) */}
//   {/* <div className="absolute inset-0 bg-black bg-opacity-60 z-10" /> */}

//   {/* CONTENU */}
//   <div className="relative z-20">
//     <h2 className="text-4xl font-bold text-center mb-20">PROCHAINS ÉVÉNEMENTS</h2>
//     <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
//       {/* Event List */}
//       <div className="grid gap-7">
//         {[1, 2, 3].map((_, index) => (
//           <div key={index} className="bg-white text-gray-800 p-4 rounded-[5px] shadow-md">
//             <p className="text-lg font-semibold flex items-center gap-2 text-green-600">
//               <div className="w-2 h-2 rounded-full bg-green-600"></div>21 Juin 2025
//             </p>
//             <h3 className="text-2xl font-bold text-primary mt-2">Fête de la Musique</h3>
//             <p className="text-lg mt-2 text-gray-400">Place de la publique</p>
//           </div>
//         ))}
//       </div>

//       {/* Calendar */}
//       <div className="bg-white text-gray-800 p-6 rounded-[5px] shadow-md">
//         <div className="flex justify-between items-center mb-4">
//           <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
//             &lt;
//           </Button>
//           <h3 className="text-xl font-bold">Juin 2025</h3>
//           <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
//             &gt;
//           </Button>
//         </div>
//         <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-600 mb-2">
//           <span>Lun</span>
//           <span>Mar</span>
//           <span>Mer</span>
//           <span>Jeu</span>
//           <span>Ven</span>
//           <span>Sam</span>
//           <span>Dim</span>
//         </div>
//         <div className="grid grid-cols-7 text-center text-gray-700">
//           {Array.from({ length: 30 }).map((_, i) => (
//             <div
//               key={i}
//               className={`p-2 rounded-full flex items-center justify-center ${
//                 [20, 3].includes(i) ? "bg-green-600 text-white" : ""
//               } ${i === 6 ? "bg-blue-600 text-white" : ""}`}
//             >
//               {i + 1}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   </div>
// </section>

//     </div>
//   );
// }
"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"
import { motion } from "framer-motion"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hover: { scale: 1.02, transition: { duration: 0.2 } },
}

export default function Home() {
  // Dummy data for news cards to easily map and render
  const newsArticles = [
    {
      category: "Communiqué officiel",
      date: "01 Juin 2025",
      title: "Projet de rénovation urbaine",
      description:
        "La Mairie du Plateau a lancé un ambitieux projet de rénovation urbaine visant à moderniser les infrastructures et améliorer le cadre de vie des habitants.",
      imageSrc: "/placeholder.svg?height=150&width=250",
    },
    {
      category: "Vie citoyenne",
      date: "28 Mai 2025",
      title: "Ateliers de participation citoyenne",
      description:
        "Des ateliers participatifs sont organisés pour recueillir les avis des citoyens sur les projets de développement local.",
      imageSrc: "/placeholder.svg?height=150&width=250",
    },
    {
      category: "Travaux publics",
      date: "25 Mai 2025",
      title: "Avancement des chantiers routiers",
      description:
        "Les travaux de réhabilitation des principales artères du Plateau progressent selon le calendrier prévu.",
      imageSrc: "/placeholder.svg?height=150&width=250",
    },
    {
      category: "Événementiel",
      date: "21 Mai 2025",
      title: "Fête de la Musique 2025",
      description:
        "La Fête de la Musique revient au Plateau avec une programmation riche et variée, promettant une journée pleine de mélodies et de festivités.",
      imageSrc: "/placeholder.svg?height=150&width=250",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <motion.header
        className="relative bg-primary text-white py-16 md:py-40 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Image
          src="/images/service2.svg" // ← Remplace par ton image réelle
          alt="Image de fond section services"
          fill
          className="object-cover z-0"
          priority // Mark as priority for LCP [^3]
        />
        <div className="relative container py-28 mx-auto px-4 text-center">
          <motion.h1 className="text-4xl md:text-7xl pt-7 font-bold mb-4" variants={itemVariants}>
            ACTUALITÉS & COMMUNIQUÉS
          </motion.h1>
          <motion.p className="text-lg md:text-3xl max-w-5xl mx-auto mb-8" variants={itemVariants}>
            Retrouvez ici toutes les informations officielles, événements et mises à jour de la Mairie du Plateau.
          </motion.p>
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-3xl mx-auto"
            variants={containerVariants}
          >
            <motion.div className="relative flex-1 w-full" variants={itemVariants}>
              <Input
                type="text"
                placeholder="Rechercher un article"
                className="w-full pl-10 pr-4 py-7 bg-white text-gray-800 border-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Select>
                <SelectTrigger className="w-full md:w-[180px] py-7 rounded-[5px] bg-white text-gray-800 border-none focus:ring-2 focus:ring-blue-500">
                  <SelectValue
                    className="placeholder:font-medium placeholder:text-lg placeholder:text-primary"
                    placeholder="Filtré par"
                  />
                </SelectTrigger>
                <SelectContent className="bg-white text-gray-800">
                  <SelectItem value="all">Tout</SelectItem>
                  <SelectItem value="official">Communiqué officiel</SelectItem>
                  <SelectItem value="citizen">Vie citoyenne</SelectItem>
                  <SelectItem value="public-works">Travaux publics</SelectItem>
                  <SelectItem value="events">Événementiel</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Select>
                <SelectTrigger className="w-full md:w-[180px] py-7 rounded-[5px] bg-secondary text-gray-800 border-none focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Période" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les périodes</SelectItem>
                  <SelectItem value="today">Aujourd&apos;hui</SelectItem>
                  <SelectItem value="week">Cette semaine</SelectItem>
                  <SelectItem value="month">Ce mois-ci</SelectItem>
                  <SelectItem value="year">Cette année</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
          </motion.div>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-12 md:py-16">
        {/* Featured Section */}
        <section className="mb-16">
          <motion.h2
            className="text-5xl font-bold text-center text-primary mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={itemVariants}
          >
            À la Une
          </motion.h2>
          <motion.div
            className="mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
          >
            <Card className="border-none shadow-none mx-auto rounded-lg overflow-hidden">
              <Image
                src="/images/mairie.svg"
                alt="Réouverture de la Maison du Citoyen"
                width={500}
                height={450}
                className="w-full h-auto object-cover"
              />
              <CardContent className="p-6 text-center">
                <span className="inline-block text-secondary text-3xl font-semibold px-3 py-1 rounded-full mb-3">
                  Communiqué officiel
                </span>
                <CardTitle className="text-4xl font-bold text-gray-800 mb-2">
                  Réouverture de la Maison du Citoyen
                </CardTitle>
                <CardDescription className="text-gray-400 text-3xl mt-4 font-bold mb-4">04 Juin 2025</CardDescription>
                <p className="text-gray-600 leading-10 mx-auto max-w-5xl text-2xl mb-6">
                  La Mairie du Plateau annonce la réouverture officielle de la Maison du Citoyen à partir du lundi 17
                  juin 2025. Les travaux de réaménagement ont permis d&apos;intégrer un guichet unique numérique, des
                  bornes interactives et un espace d&apos;accueil modernisé. 👉 Les horaires restent inchangés : du
                  lundi au vendredi, de 08h à 17h.
                </p>
                <Button
                  variant="outline"
                  className="border-green-600 text-xl py-5 text-green-600 hover:bg-green-600 hover:text-white bg-transparent font-bold rounded-[4px]"
                >
                  Lire la suite
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Latest News Section */}
        <section className="mb-16">
          <motion.h2
            className="text-4xl font-bold text-primary mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={itemVariants}
          >
            Dernières actualités
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            {newsArticles.map((article, index) => (
              <motion.div key={index} variants={cardVariants} whileHover="hover">
                <Card className="rounded-[5px] p-0 bg-transparent shadow-none border-none overflow-hidden relative">
                  <div className="h-[200px] overflow-hidden">
                    <Image
                      src={"/images/mairie.svg"}
                      alt={article.title}
                      width={500}
                      height={405}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="flex bg-transparent min-h-2xl max-h-2xl overflow-auto relative shadow-none border-none p-0 -mt-8 rounded-t-lg z-10">
                    <div className="w-10"></div>
                    <div className="w-full bg-gray-100 space-y-4 p-10 rounded-[8px] shadow">
                      <div className="flex justify-between items-center mb-2">
                        <span className="inline-block bg-green-600 p-2 text-white text-lg mb-2 font-semibold px-4 py-1 rounded-[4px]">
                          {article.category}
                        </span>
                        <span className="text-gray-500 text-lg">{article.date}</span>
                      </div>
                      <CardTitle className="text-2xl font-bold text-black mb-2">{article.title}</CardTitle>
                      <p className="text-gray-700 text-xl line-clamp-3 mb-4">{article.description.slice(0, 100)}...</p>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-green-600 text-xl hover:underline flex items-center gap-1"
                      >
                        Lire tout <span className="text-xl">›</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Upcoming Events Section */}
      </main>
      <motion.section
        className="relative bg-primary text-white py-12 md:py-28 rounded-lg shadow-lg overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* VIDEO BACKGROUND */}
        <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0">
          <source src="/videos/blue-digital.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo.
        </video>
        {/* OVERLAY SOMBRE (optionnel) */}
        {/* <div className="absolute inset-0 bg-black bg-opacity-60 z-10" /> */}
        {/* CONTENU */}
        <div className="relative z-20">
          <motion.h2 className="text-4xl font-bold text-center mb-20" variants={itemVariants}>
            PROCHAINS ÉVÉNEMENTS
          </motion.h2>
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Event List */}
            <motion.div className="grid gap-7" variants={containerVariants}>
              {[1, 2, 3].map((_, index) => (
                <motion.div
                  key={index}
                  className="bg-white text-gray-800 p-4 rounded-[5px] shadow-md"
                  variants={itemVariants}
                >
                  <p className="text-lg font-semibold flex items-center gap-2 text-green-600">
                    <div className="w-2 h-2 rounded-full bg-green-600"></div>
                    21 Juin 2025
                  </p>
                  <h3 className="text-2xl font-bold text-primary mt-2">Fête de la Musique</h3>
                  <p className="text-lg mt-2 text-gray-400">Place de la publique</p>
                </motion.div>
              ))}
            </motion.div>
            {/* Calendar */}
            <motion.div className="bg-white text-gray-800 p-6 rounded-[5px] shadow-md" variants={itemVariants}>
              <div className="flex justify-between items-center mb-4">
                <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
                  &lt;
                </Button>
                <h3 className="text-xl font-bold">Juin 2025</h3>
                <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
                  &gt;
                </Button>
              </div>
              <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-600 mb-2">
                <span>Lun</span>
                <span>Mar</span>
                <span>Mer</span>
                <span>Jeu</span>
                <span>Ven</span>
                <span>Sam</span>
                <span>Dim</span>
              </div>
              <div className="grid grid-cols-7 text-center text-gray-700">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded-full flex items-center justify-center ${
                      [20, 3].includes(i) ? "bg-green-600 text-white" : ""
                    } ${i === 6 ? "bg-blue-600 text-white" : ""}`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
