"use client"

import type React from "react"

import Image from "next/image"
import { motion } from "framer-motion"
import { Hotel, Utensils, Sparkles, Star, MapPin } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useRef } from "react"

// --- PandaAvatar Component ---
interface PandaAvatarProps {
  size?: "sm" | "md" | "lg"
}

function PandaAvatar({ size = "md" }: PandaAvatarProps) {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  const avatarSize = sizeClasses[size]

  return (
    <motion.div
      className={`relative rounded-full overflow-hidden border-4 border-white shadow-lg ${avatarSize}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
      whileHover={{ scale: 1.1 }}
    >
      <Image src="/placeholder.svg?height=64&width=64" alt="Panda Avatar" fill style={{ objectFit: "cover" }} />
    </motion.div>
  )
}

// --- HeroSection Component ---
function HeroSection() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.05, boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)" },
  }

  const sphereVariants = {
    animate: {
      y: ["0%", "10%", "-5%", "0%"],
      x: ["0%", "-5%", "5%", "0%"],
      rotate: [0, 360],
      transition: {
        duration: 10,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        repeatType: "reverse",
      },
    },
  }

  return (
   <section className="relative overflow-hidden py-20 md:py-40 text-white">
  {/* Background image */}
  <div className="absolute inset-0 z-0">
   <Image
              src="/images/service2.svg" // ← Remplace par ton image réelle
              alt="Image de fond section services"
              fill
              className="object-cover  z-0"
              priority
            />
    {/* Gradient overlay */}
    {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-purple-800 opacity-80" /> */}
  </div>

  {/* Background spheres */}


  {/* Content */}
  <div className="relative z-20 container py-32 mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-16">
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl text-center lg:text-left"
    >
      <h1 className="text-4xl md:text-7xl font-bold leading-tight mb-4">Explorez le Plateau autrement !</h1>
      <p className="text-lg md:text-2xl opacity-90">
        Découvrez les meilleures adresses pour vous restaurer, séjourner ou sortir dans le panorama du Plateau.
      </p>
    </motion.div>

    <div className="relative w-full max-w-md lg:max-w-none lg:w-auto flex flex-col items-center lg:items-end gap-4 mt-8 lg:mt-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute -top-16 right-0 lg:-right-16 z-30"
      >
        <PandaAvatar size="lg" />
      </motion.div>

    <div className="grid grid-cols-2 gap-4 w-full max-w-xs md:max-w-sm lg:max-w-none">
  {/* Carte 1 en haut à gauche */}
  <motion.div
    className="bg-white text-blue-800 p-7 rounded-[5px] shadow-lg flex flex-col gap-2 cursor-pointer"
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    whileHover="hover"
    transition={{ delay: 0.4 }}
  >
    <div className="py-4">
      <Hotel className="w-16 h-16" />
      <div className="pt-7">
        <span className="font-medium text-sm md:text-2xl pt-10 pl-2">
          Voir les <span className="font-bold">Hôtels</span>
        </span>
      </div>
    </div>
  </motion.div>

  {/* Carte 3 à droite, centrée verticalement sur deux lignes */}
  <motion.div
    className="bg-white text-blue-800 p-7 rounded-[5px] shadow-lg flex flex-col gap-2 cursor-pointer row-span-2 self-center"
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    whileHover="hover"
    transition={{ delay: 0.4 }}
  >
    <div className="py-4">
      <Hotel className="w-16 h-16" />
      <div className="pt-7">
        <span className="font-medium text-sm md:text-2xl pt-10 pl-2">
          Voir les <span className="font-bold">Hôtels</span>
        </span>
      </div>
    </div>
  </motion.div>

  {/* Carte 2 en bas à gauche */}
  <motion.div
    className="bg-white text-blue-800 p-10 rounded-[5px] shadow-lg flex flex-col gap-2 cursor-pointer"
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    whileHover="hover"
    transition={{ delay: 0.4 }}
  >
    <div className="py-4">
      <Hotel className="w-16 h-16" />
      <div className="pt-7">
        <span className="font-medium text-sm md:text-2xl pt-10 pl-2">
          Voir les <span className="font-bold">Hôtels</span>
        </span>
      </div>
    </div>
  </motion.div>
</div>

    </div>
  </div>
</section>

  )
}

// --- SectionHeader Component ---
interface SectionHeaderProps {
  icon?: string
  title: string
  description?: string
  bgColor?: string
  textColor?: string
  descriptionColor?: string
  pandaIcon?: boolean
}

function SectionHeader({
  icon,
  title,
  description,
  bgColor = "bg-transparent",
  textColor = "text-gray-900",
  descriptionColor = "text-gray-600",
  pandaIcon = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
      className={`relative flex flex-row items-center justify-center py-4 px-4 rounded-[8px] mb-8 ${bgColor}`}
    >
      {icon && (
        <div className="">
          <Image
            src={'/images/dev.svg'}
            alt="Section Icon"
            width={48}
            height={48}
            className="w-12 h-12 md:w-40 md:h-40"
          />
        </div>
      )}
      <h2 className={`${textColor} text-2xl md:text-5xl font-bold text-center`}>{title}</h2>
      {description && <p className={`${descriptionColor} mt-2 text-center text-sm md:text-base`}>{description}</p>}
      
    </motion.div>
  )
}

// --- CardCarousel Component ---
interface CardCarouselProps {
  children: React.ReactNode
}

function CardCarousel({ children }: CardCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
    if (scrollRef.current) {
      // Calculate scroll position based on the width of the first child card
      // and the gap between cards. Assuming a consistent card width and gap.
      const firstChild = scrollRef.current.children[0] as HTMLElement
      if (firstChild) {
        const cardWidth = firstChild.offsetWidth // Includes padding/border if any
        const gap = 16 // Tailwind 'px-2' on child means 8px padding on each side, so 16px total gap between cards
        const scrollPosition = index * (cardWidth + gap)
        scrollRef.current.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        })
      }
    }
  }

  const totalCards = Array.isArray(children) ? children.length : 1
  const dots = Array.from({ length: totalCards }, (_, i) => i)

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
        onScroll={() => {
          if (scrollRef.current) {
            const scrollLeft = scrollRef.current.scrollLeft
            const firstChild = scrollRef.current.children[0] as HTMLElement
            if (firstChild) {
              const cardWidth = firstChild.offsetWidth
              const gap = 16 // Same gap as used in handleDotClick
              setCurrentIndex(Math.round(scrollLeft / (cardWidth + gap)))
            }
          }
        }}
      >
        {Array.isArray(children) ? (
          children.map((child, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-2 snap-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {child}
            </motion.div>
          ))
        ) : (
          <motion.div
            className="flex-shrink-0 w-full px-2 snap-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        )}
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        {dots.map((index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${currentIndex === index ? "bg-gray-800" : "bg-gray-300"}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

// --- RestaurantCard Component ---
interface RestaurantCardProps {
  image: string
  title: string
  description: string
  rating: number
  reviews: number
}

function RestaurantCard({ image, title, description, rating, reviews }: RestaurantCardProps) {
  return (
    <Card className="w-full rounded-lg  shadow-md hover:shadow-lg transition-shadow duration-300">
      <Image
        src={"https://toohotel.com/wp-content/uploads/2025/06/TOO_restaurant_Panoramique_vue_Paris_nuit_v2.jpg"}
        alt={title}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl text-primary font-semibold mb-1">{title}</h3>
            <div className="flex items-center text-sm text-gray-700">
          <Star className="w-4 h-4 text-yellow-500 mr-1 fill-yellow-500" />
          <span>{rating.toFixed(1)}</span>
          <span className="ml-2 text-gray-500">({reviews} avis)</span>
        </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-fit bg-orange-500 hover:bg-orange-600 text-white rounded-[5px]">Plus d'infos</Button>
      </CardFooter>
    </Card>
  )
}

// --- HotelCard Component ---
interface HotelCardProps {
  image: string
  title: string
  description: string
  rating: number
  reviews: number
}

function HotelCard({ image, title, description, rating, reviews }: HotelCardProps) {
  return (
    <Card className="w-full rounded-[8px] overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Image
        src={"https://brigade-hocare.com/info/wp-content/uploads/2024/09/decoration-restaurant.png"}
        alt={title}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-4">
        <h3 className="text-2xl font-bold text-primary mb-1">{title}</h3>
        <p className="text-lg text-gray-600 mb-2">{description}</p>
        <div className="flex items-center text-sm text-gray-700">
          <Star className="w-4 h-4 text-yellow-500 mr-1 fill-yellow-500" />
          <span>{rating.toFixed(1)}</span>
          <span className="ml-2 text-gray-500">({reviews} avis)</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-fit bg-secondary hover:bg-secondary text-white rounded-[4px]">Plus d'infos</Button>
      </CardFooter>
    </Card>
  )
}

// --- ActivityCard Component ---
interface ActivityCardProps {
  image: string
  title: string
  location: string
}

function ActivityCard({ image, title, location }: ActivityCardProps) {
  return (
    <Card className="w-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-1 text-gray-500" />
          <span>{location}</span>
        </div>
      </CardContent>
    </Card>
  )
}

// --- MapSection Component ---
function MapSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="relative w-full h-[400px] md:h-[700px] rounded-lg overflow-hidden "
    >
      {/* Iframe de la carte */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.021286271501!2d-4.016107524225443!3d5.324698935535924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1edf6f6d6df9f%3A0xbac527e7b5c6fc97!2sM%C3%B6venpick%20Hotel%20Abidjan!5e0!3m2!1sfr!2sci!4v1690102063412!5m2!1sfr!2sci"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 w-full h-full border-0"
      ></iframe>

      {/* Marqueur 1 : Mairie du Plateau */}
      <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-2 bg-white p-2 rounded-full shadow-md z-10">
        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        <span className="font-semibold text-sm md:text-base">Mairie du Plateau</span>
      </div>

      {/* Avatar au centre */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <PandaAvatar size="lg" />
      </div>

      {/* Marqueur 2 : Mövenpick */}
      <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 flex items-center space-x-2 bg-white p-2 rounded-full shadow-md z-10">
        <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse" />
        <span className="font-semibold text-sm md:text-base">Mövenpick Hotel Abidjan</span>
      </div>
    </motion.div>
  )
}

// --- Main Page Component ---
export default function HomePage() {
  const restaurants = [
    {
      id: "1",
      image: "/placeholder.svg?height=200&width=300",
      title: "Le Régal du Plateau",
      description: "Cuisine ivoirienne, Buffet - €€",
      rating: 4.5,
      reviews: 123,
    },
    {
      id: "2",
      image: "/placeholder.svg?height=200&width=300",
      title: "Ambiance Chez Kaffi",
      description: "Africaine, Grillades - €€€",
      rating: 4.8,
      reviews: 89,
    },
    {
      id: "3",
      image: "/placeholder.svg?height=200&width=300",
      title: "Le Bistrot du Plateau",
      description: "Française, Brasserie - €€",
      rating: 4.2,
      reviews: 150,
    },
    {
      id: "4",
      image: "/placeholder.svg?height=200&width=300",
      title: "Saveurs d'Abidjan",
      description: "Fusion, Gastronomique - €€€€",
      rating: 4.7,
      reviews: 75,
    },
  ]

  const hotels = [
    {
      id: "1",
      image: "/placeholder.svg?height=200&width=300",
      title: "Hôtel Pullman Abidjan",
      description: "Hôtel de luxe avec vue sur la lagune",
      rating: 4.6,
      reviews: 250,
    },
    {
      id: "2",
      image: "/placeholder.svg?height=200&width=300",
      title: "Résidence Le Plateau",
      description: "Appartements modernes pour séjours",
      rating: 4.3,
      reviews: 180,
    },
    {
      id: "3",
      image: "/placeholder.svg?height=200&width=300",
      title: "Hôtel Tiama",
      description: "Hôtel 5 étoiles au cœur du Plateau",
      rating: 4.7,
      reviews: 300,
    },
  ]

  const activities = [
    {
      id: "1",
      image: "/placeholder.svg?height=200&width=300",
      title: "La Galerie Cécile Fakhoury",
      location: "Rue des Jardins, Plateau",
    },
    {
      id: "2",
      image: "/placeholder.svg?height=200&width=300",
      title: "Le District d'Abidjan Fakhoury",
      location: "Rue du Commerce, Plateau",
    },
    {
      id: "3",
      image: "/placeholder.svg?height=200&width=300",
      title: "Cathédrale Saint-Paul d'Abidjan",
      location: "Boulevard de la République",
    },
    {
      id: "4",
      image: "/placeholder.svg?height=200&width=300",
      title: "Musée des Civilisations de Côte d'Ivoire",
      location: "Avenue du 26 Septembre",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />

      <main className=" mx-auto  py-8 space-y-16">
        <section className="px-20">
          <SectionHeader
            icon="/placeholder.svg?height=48&width=48"
            title="Les meilleures tables du Plateau"
            bgColor="bg-orange-400"
            textColor="text-white"
          />
          <CardCarousel>
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} {...restaurant} />
            ))}
          </CardCarousel>
        </section>

       <section className="relative w-full h-[800px] py-10 overflow-hidden">

  {/* Vidéo de fond */}
  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute top-0 left-0 w-full h-full object-cover z-0"
  >
    <source src="/videos/blue-digital.mp4" type="video/mp4" />
    Votre navigateur ne supporte pas la vidéo HTML5.
  </video>

  {/* Overlay sombre pour meilleure lisibilité */}
  {/* <div className="absolute inset-0 bg-black bg-opacity-10 z-10" /> */}

  {/* Contenu du carousel */}
          <h1 className="text-5xl font-bold text-white text-center">Ou dromir sur le Plateau</h1>
  <div className="relative z-20 m-20 bg-white rounded-[8px] px-4  py-20">
    <CardCarousel>
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} {...hotel} />
      ))}
    </CardCarousel>
  </div>
</section>


        <section className="px-20">
          <SectionHeader
            title="Activités & Découvertes"
            description=""
            textColor="text-green-600"
            descriptionColor="text-gray-700"
          />
          <CardCarousel>
            {activities.map((activity) => (
              <ActivityCard key={activity.id} {...activity} />
            ))}
          </CardCarousel>
        </section>

        <section>
          <MapSection />
        </section>
      </main>
    </div>
  )
}
