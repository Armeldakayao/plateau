"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const slides = [
  {
    image: "https://museeafrica.com/media/2021/10/DSC01338-scaled.jpg",
    title: "Musée des Civilisations",
    description: "15 000 pièces exposées retraçant 3 000 ans d'histoire ivoirienne.",
  },
  {
    image: "https://i1.wp.com/tcheya.com/wp-content/uploads/2019/03/gondwanaclub-1.jpg?fit=585%2C282&ssl=1",
    title: "Gondwana Club",
    description: "Rires garantis tous les week-ends avec les meilleurs humoristes africains.",
  },
  {
    image: "https://lepetitjournal.com/sites/default/files/images/annuaire/126_5dfa1771c8c08.png",
    title: "Oasis Yoga Club",
    description: "Yoga, fitness, brunch healthy dans un espace bien-être au cœur du Plateau.",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/99/Biblioth%C3%A8que_Nationale_de_C%C3%B4te_d%27Ivoire.jpg/1920px-Biblioth%C3%A8que_Nationale_de_C%C3%B4te_d%27Ivoire.jpg",
    title: "Bibliothèque Nationale",
    description: "Espace calme, culturel et éducatif, parfois animé par des événements littéraires.",
  },
  {
    image: "https://res.cloudinary.com/yafohi-travel/image/upload/f_auto/images/districts-places/catedrale-howiqpiztq.jpg",
    title: "Cathédrale Saint-Paul",
    description: "Monument emblématique mêlant spiritualité et architecture moderne.",
  },
  {
    image: "https://i0.wp.com/originalfoundblog.com/wp-content/uploads/2016/01/img_6238.jpg?fit=1024%2C683&ssl=1",
    title: "Galerie Houkami Guyzagn",
    description: "Expos gratuites et performances d'artistes africains dans un lieu discret.",
  },
  {
    image: "https://media-files.abidjan.net/photo/parc-des-expositions-dabidjan_xmwfe0yo7z.jpg",
    title: "Hall des Arts",
    description: "Expositions culturelles et artistiques dans un cadre institutionnel.",
  },
  {
    image: "https://www.presidence.ci/wp-content/uploads/2016/10/communique.jpg",
    title: "Place de la République",
    description: "Fontaines, bancs et sculptures pour flâner ou prendre des photos.",
  },
  {
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/0c/f1/4b/caption.jpg?w=700&h=400&s=1",
    title: "Mosquée Salam",
    description: "Un joyau architectural accueillant jusqu'à 6 500 fidèles.",
  },
  // {
  //   image: "/images/balade-lagune.jpg",
  //   title: "Balade sur la lagune Ébrié",
  //   description: "Moments paisibles en pirogue dès le cœur du Plateau.",
  // },
  // {
  //   image: "/images/marche-art.jpg",
  //   title: "Marché de l'Art",
  //   description: "Carrefour de culture et d'art contemporain au pied de La Pyramide.",
  // },
]

export default function InfiniteCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="relative w-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Carousel Container */}
      <div className="overflow-hidden rounded-lg relative h-[700px]">
        {/* Image Container - Only this moves */}
        <div className="absolute inset-0 w-full h-full">
          <AnimatePresence mode="wait">
          <motion.div
  key={currentSlide}
  initial={{ opacity: 0, x: 100 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.7 }}
  className="absolute inset-0 w-full h-full"
>
  {/* Image Slide */}
  <Image
    src={slides[currentSlide].image}
    alt={slides[currentSlide].title}
    fill
    className="object-cover"
  />

  {/* Overlay par-dessus l’image */}
  <div className="absolute inset-0 bg-black/30 z-10" />
</motion.div>

          </AnimatePresence>
        </div>

        {/* LEFT Overlay - Fixed */}
        <div className="absolute top-0 left-0 z-10 h-full w-32 bg-gradient-to-r from-black/50 to-black/50 pointer-events-none" />

        {/* RIGHT Overlay - Fixed */}
        <div className="absolute top-0 right-0 z-10 h-full w-32 bg-gradient-to-l from-black/50 to-black/50 pointer-events-none" />

        {/* Text Overlay - Fixed */}
        <div className="absolute bottom-0 left-0   right-0 mx-32  text-white px-20 p-8 z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-5xl font-bold">{slides[currentSlide].title}</h3>
              <p className="mt-2 text-2xl">{slides[currentSlide].description}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dots Navigation */}
      <motion.div
        className="flex justify-center mt-10 space-x-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}