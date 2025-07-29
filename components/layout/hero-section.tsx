"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Users, MapPin, Briefcase, CalendarDays, Landmark, FileText } from "lucide-react"
import IconLinkCard from "./icon-link-card"
// import IconLinkCard from "./ui/icon-link-card"

export default function HeroSection() {
  const stats = [
    { icon: "/stat1.svg", value: "1.4 M", label: "Habitants" },
    { icon: "/stat2.svg", value: "100 Km²", label: "Superficie" },
    { icon: "/stat3.svg", value: "8,9 %", label: "d’emploi" },
  ]

  const iconLinks = [
    { icon: "/link1.svg", title: "Demander un rendez-vous" },
    { icon: "/link2.svg", title: "Célébrer mon mariage" },
    { icon: "/link3.svg", title: "État civil" },
    { icon: "/link3.svg", title: "Demander un partenariat" },
    { icon: "/link4.svg", title: "Visiter ma commune" }, // Ajoutez une icone et un titre pour "Signaler un problème" },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
   
    <section className="relative h-full py-40 ">
  {/* Vidéo de fond */}
  <video
    className="absolute inset-0 w-full h-full object-cover object-center"
    src="/videos/bg-home-mairie.mp4"
    autoPlay
    muted
    loop
    playsInline
  />

  {/* Overlay en dégradé */}
  <div className="absolute inset-0 bg-gradient-to-t from-[#0D4C8E]/40 to-[#0D4C8E]/40" />

  {/* Contenu par-dessus la vidéo */}
  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white ">
    {/* Headings */}
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-4 max-w-4xl pb-7 ">
      <motion.h1
        variants={item}
        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter drop-shadow-lg pt-16"
      >
        BIENVENUE DANS VOTRE COMMUNE
      </motion.h1>
      <motion.p variants={item} className="text-lg md:text-xl lg:text-3xl max-w-4xl pb-16 mx-auto drop-shadow-md">
        Faites vos demandes sans vous déplacer : état civil, rendez-vous, réservations, signalements…
      </motion.p>
    </motion.div>

    {/* Icon links */}
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid bg-[#1A6BAF]/70  grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-12 w-full max-w-full px-4 py-5 lg:px-28"
    >
      {iconLinks.map(({ icon, title }) => (
        <motion.div key={title} variants={item}>
          <IconLinkCard icon={`/images/${icon}`} title={title} />
        </motion.div>
      ))}
    </motion.div>

    {/* Stats */}
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="bg-[#F5F5F5] hidden  rounded-[4px] pl-10  dark:bg-gray-800/90 z-50 absolute -bottom-60 border shadow-xl p-6 md:p-10 mt-12 w-full max-w-4xl lg:grid grid-cols-1 lg:grid-cols-3 gap-6 text-gray-800 dark:text-white"
    >
      {stats.map(({ icon: StatIcon, value, label }) => (
        <motion.div key={label} variants={item} className="flex gap-4  items-center ">
          <img src={`/images/${StatIcon}`} alt="" className="w-20 h-20"/>
         <div>
             <div className="text-4xl text-[#1A6BAF] font-bold">{value}</div>
          <div className="text-[18px]">{label}</div>
         </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>

  )
}
