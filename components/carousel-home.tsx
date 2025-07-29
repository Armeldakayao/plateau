// // "use client"

// // import * as React from "react"
// // import Image from "next/image"
// // import { Card } from "@/components/ui/card"
// // import {
// //   Carousel,
// //   CarouselContent,
// //   CarouselItem,
// //   CarouselNext,
// //   CarouselPrevious,
// //   type CarouselApi,
// // } from "@/components/ui/carousel"

// // type Slide = {
// //   type: "food-ad" | "city-info"
// //   imageSrc: string
// //   alt: string
// //   title?: string
// //   description?: string
// //   cta?: string
// //   address?: string
// //   social?: string
// // }

// // const slides: Slide[] = [
// //   {
// //     type: "food-ad",
// //     imageSrc: "https://lh4.googleusercontent.com/proxy/ZqWR9v2ZG1Y4eHOknDXk1EnKeErM6U4tEMWv4880LkwG6TkeQFuZPxZXWGo-hNw8hDw6ImxDMsogTsQZvGtdoTY7XQH_s9KDam_D0I5CUDjkAkALIKqy",
// //     alt: "Food advertisement with rice and chicken",
// //     title: "Rice So Nice, You'll Come Twice!",
// //     description: "One plate and you're hooked!",
// //     cta: "Order now!",
// //     social: "@rolandmoot",
// //     address: "Location: 23, Aroma Street, Lagos",
// //   },
// //   {
// //     type: "food-ad",
// //     imageSrc: "https://www.climate-chance.org/wp-content/uploads/2020/02/800px-abidjan.jpg",
// //     alt: "Stade Félix-Houphouët-Boigny",
// //     title: "Stade Félix-Houphouët-Boigny",
// //     description:
// //       "Le Stade Félix-Houphouët-Boigny, surnommé « Le Félicia », est le premier stade national polyvalent (football, rugby, athlétisme) de Côte d'Ivoire. Il fut nommé du premier Président de la Côte d'Ivoire, Félix Houphouët-Boigny. Situé dans la commune du Plateau d'Abidjan, sa capacité d'accueil précédente est de 35 000 places.",
// //   },
// //   {
// //      type: "food-ad",
// //     imageSrc: "https://www.climate-chance.org/wp-content/uploads/2020/02/800px-abidjan.jpg",
// //     alt: "Abidjan city view",
// //     title: "Abidjan, La Perle des Lagunes",
// //     description:
// //       "Abidjan est la capitale économique de la Côte d'Ivoire et l'une des villes les plus peuplées d'Afrique de l'Ouest. Elle est connue pour ses gratte-ciel, ses marchés animés et sa vie nocturne trépidante. La ville est un carrefour culturel et économique majeur de la région.",
// //   },
// // ]

// // export default function CarouselComponent() {
// //   const [api, setApi] = React.useState<CarouselApi>()
// //   const [current, setCurrent] = React.useState(0)
// //   const [count, setCount] = React.useState(0)

// //   React.useEffect(() => {
// //     if (!api) {
// //       return
// //     }

// //     setCount(api.scrollSnapList().length)
// //     setCurrent(api.selectedScrollSnap() + 1)

// //     api.on("select", () => {
// //       setCurrent(api.selectedScrollSnap() + 1)
// //     })
// //   }, [api])

// //   return (
// //     <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
// //       {/* <Image
       
// //         alt="Blurred city background"
// //         fill
// //         priority
// //         sizes="100vw"
// //         style={{ objectFit: "cover", filter: "brightness(0.5)" }}
// //         className="absolute inset-0 z-0"
// //       /> */}
// //       <div className="relative z-10 flex items-center justify-center h-full">
// //         <Carousel setApi={setApi} className="w-full max-w-6xl mx-auto">
// //           <CarouselContent>
// //             {slides.map((slide, index) => (
// //               <CarouselItem key={index}>
// //                 {slide.type === "food-ad" && (
// //                   <div className="p-4 md:p-8 flex items-center justify-center h-full">
// //                     <Card className="relative w-full border-none max-w-4xl h-[400px] md:h-[500px] lg:h-[400px]  rounded-[20px] overflow-hidden shadow-lg">
// //                       <Image
// //                         src={slide.imageSrc || "/placeholder.svg"}
// //                         alt={slide.alt}
// //                         fill
// //                         sizes="100vw"
// //                         style={{ objectFit: "cover" }}
// //                         className="absolute w-full h-full inset-0 rounded-[10px]"
// //                       />
// //                       {/* <div className="absolute bottom-4 left-4 text-white text-sm md:text-base">
// //                         <p className="font-bold">{slide.social}</p>
// //                         <p>{slide.address}</p>
// //                       </div> */}
// //                     </Card>
// //                   </div>
// //                 )}
// //                 {slide.type === "city-info" && (
// //                   <div className="p-4 md:p-8 flex items-center justify-center h-full">
// //                     <Card className="relative w-full max-w-4xl h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-lg">
// //                       <Image
// //                         src={slide.imageSrc || "/placeholder.svg"}
// //                         alt={slide.alt}
// //                         fill
// //                         sizes="100vw"
// //                         style={{ objectFit: "cover" }}
// //                         className="absolute inset-0"
// //                       />
// //                       <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6 md:p-10 text-white">
// //                         <div className="max-w-2xl">
// //                           <h2 className="text-2xl md:text-4xl font-bold mb-2">{slide.title}</h2>
// //                           <p className="text-sm md:text-base opacity-90">{slide.description}</p>
// //                         </div>
// //                       </div>
// //                     </Card>
// //                   </div>
// //                 )}
// //               </CarouselItem>
// //             ))}
// //           </CarouselContent>
// //           <CarouselPrevious className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white hover:text-black rounded-full p-2 md:p-3 transition-colors" />
// //           <CarouselNext className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white hover:text-black rounded-full p-2 md:p-3 transition-colors" />
// //         </Carousel>
// //       </div>
// //       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
// //         {Array.from({ length: count }).map((_, index) => (
// //           <div
// //             key={index}
// //             className={`w-3 h-3 rounded-full transition-colors duration-300 ${
// //               current === index + 1 ? "bg-blue-500" : "bg-white opacity-50"
// //             }`}
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   )
// // }
// "use client"

// import * as React from "react"
// import Image from "next/image"
// import { Card } from "@/components/ui/card"
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
//   type CarouselApi,
// } from "@/components/ui/carousel"
// import { motion, AnimatePresence } from "framer-motion"

// type Slide = {
//   type: "food-ad" | "city-info"
//   imageSrc: string
//   alt: string
//   title?: string
//   description?: string
//   cta?: string
//   address?: string
//   social?: string
// }

// const slides: Slide[] = [
//   {
//     type: "food-ad",
//     imageSrc:
//       "https://lh4.googleusercontent.com/proxy/ZqWR9v2ZG1Y4eHOknDXk1EnKeErM6U4tEMWv4880LkwG6TkeQFuZPxZXWGo-hNw8hDw6ImxDMsogTsQZvGtdoTY7XQH_s9KDam_D0I5CUDjkAkALIKqy",
//     alt: "Food advertisement with rice and chicken",
//     title: "Rice So Nice, You'll Come Twice!",
//     description: "One plate and you're hooked!",
//     cta: "Order now!",
//     social: "@rolandmoot",
//     address: "23, Aroma Street, Lagos",
//   },
//   {
//     type: "city-info",
//     imageSrc: "https://www.climate-chance.org/wp-content/uploads/2020/02/800px-abidjan.jpg",
//     alt: "Stade Félix-Houphouët-Boigny",
//     title: "Stade Félix-Houphouët-Boigny",
//     description:
//       "Le Félicia est le plus grand stade d’Abidjan. Il accueille les grands événements sportifs et culturels du pays.",
//   },
//   {
//     type: "city-info",
//     imageSrc: "https://www.climate-chance.org/wp-content/uploads/2020/02/800px-abidjan.jpg",
//     alt: "Abidjan city view",
//     title: "Abidjan, La Perle des Lagunes",
//     description:
//       "Abidjan est la capitale économique de la Côte d'Ivoire. Un centre dynamique entre modernité et tradition.",
//   },
// ]

// export default function CarouselComponent() {
//   const [api, setApi] = React.useState<CarouselApi>()
//   const [current, setCurrent] = React.useState(0)

//   React.useEffect(() => {
//     if (!api) return
//     setCurrent(api.selectedScrollSnap())

//     const interval = setInterval(() => {
//       api.scrollNext()
//     }, 6000)

//     api.on("select", () => {
//       setCurrent(api.selectedScrollSnap())
//     })

//     return () => clearInterval(interval)
//   }, [api])

//   return (
//     <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
//       <div className="relative z-10 flex items-center justify-center h-full">
//         <Carousel setApi={setApi} className="w-full max-w-6xl mx-auto">
//           <CarouselContent>
//             {slides.map((slide, index) => (
//               <CarouselItem key={index}>
//                 <AnimatePresence>
//                   <motion.div
//                     key={index}
//                     className="p-4 md:p-8 flex items-center justify-center h-full"
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: 0.8 }}
//                   >
//                     <Card className="relative w-full border-none max-w-4xl h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl group">
//                       <Image
//                         src={slide.imageSrc}
//                         alt={slide.alt}
//                         fill
//                         sizes="100vw"
//                         className="absolute inset-0 object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
//                       <div className="absolute bottom-6 left-6 text-white z-10 max-w-xl space-y-2">
//                         {slide.title && (
//                           <h2 className="text-2xl md:text-4xl font-bold drop-shadow-lg">{slide.title}</h2>
//                         )}
//                         {slide.description && (
//                           <p className="text-sm md:text-base opacity-90">{slide.description}</p>
//                         )}
//                         {slide.cta && (
//                           <button className="mt-2 px-4 py-2 bg-white text-black text-sm rounded hover:bg-gray-200 transition">
//                             {slide.cta}
//                           </button>
//                         )}
//                       </div>
//                     </Card>
//                   </motion.div>
//                 </AnimatePresence>
//               </CarouselItem>
//             ))}
//           </CarouselContent>

//           {/* Navigation arrows */}
//           <CarouselPrevious className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white hover:text-black rounded-full p-2 md:p-3 transition-colors" />
//           <CarouselNext className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white hover:text-black rounded-full p-2 md:p-3 transition-colors" />
//         </Carousel>
//       </div>

//       {/* Dots indicator */}
//       <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
//         {slides.map((_, index) => (
//           <div
//             key={index}
//             className={`w-3 h-3 rounded-full transition-all duration-300 ${
//               current === index ? "bg-blue-500 scale-110" : "bg-white/50"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   )
// // }
// "use client"

// import * as React from "react"
// import Image from "next/image"
// import { Card } from "@/components/ui/card"
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
//   type CarouselApi,
// } from "@/components/ui/carousel"
// import { motion, AnimatePresence } from "framer-motion"

// type Slide = {
//   type: "food-ad" | "city-info"
//   imageSrc: string
//   alt: string
//   title?: string
//   description?: string
//   cta?: string
//   address?: string
//   social?: string
// }

// const slides: Slide[] = [
//   {
//     type: "food-ad",
//     imageSrc:
//       "https://lh4.googleusercontent.com/proxy/ZqWR9v2ZG1Y4eHOknDXk1EnKeErM6U4tEMWv4880LkwG6TkeQFuZPxZXWGo-hNw8hDw6ImxDMsogTsQZvGtdoTY7XQH_s9KDam_D0I5CUDjkAkALIKqy",
//     alt: "Food advertisement with rice and chicken",
//     title: "Rice So Nice, You'll Come Twice!",
//     description: "One plate and you're hooked!",
//     cta: "Order now!",
//   },
//   {
//     type: "city-info",
//     imageSrc: "https://www.climate-chance.org/wp-content/uploads/2020/02/800px-abidjan.jpg",
//     alt: "Stade Félix-Houphouët-Boigny",
//     title: "Stade Félix-Houphouët-Boigny",
//     description:
//       "Le Félicia est le plus grand stade d’Abidjan. Il accueille les grands événements sportifs et culturels du pays.",
//   },
//   {
//     type: "city-info",
//     imageSrc: "https://www.climate-chance.org/wp-content/uploads/2020/02/800px-abidjan.jpg",
//     alt: "Abidjan city view",
//     title: "Abidjan, La Perle des Lagunes",
//     description:
//       "Abidjan est la capitale économique de la Côte d'Ivoire. Un centre dynamique entre modernité et tradition.",
//   },
// ]

// export default function CarouselComponent() {
//   const [api, setApi] = React.useState<CarouselApi>()
//   const [current, setCurrent] = React.useState(0)

//   React.useEffect(() => {
//     if (!api) return
//     setCurrent(api.selectedScrollSnap())

//     const interval = setInterval(() => {
//       api.scrollNext()
//     }, 6000)

//     api.on("select", () => {
//       setCurrent(api.selectedScrollSnap())
//     })

//     return () => clearInterval(interval)
//   }, [api])

//   return (
//     <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
//       <div className="relative z-10 flex items-center justify-center h-full">
//         <Carousel setApi={setApi} className="w-full max-w-6xl mx-auto">
//           <CarouselContent>
//             {slides.map((slide, index) => (
//               <CarouselItem key={index}>
//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={index}
//                     className="p-4 md:p-8 flex items-center justify-center h-full"
//                     initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
//                     animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     transition={{
//                       duration: 1,
//                       ease: "easeInOut",
//                     }}
//                   >
//                     <Card className="relative w-full border-none max-w-4xl h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl group">
//                       <Image
//                         src={slide.imageSrc}
//                         alt={slide.alt}
//                         fill
//                         sizes="100vw"
//                         className="absolute inset-0 object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
//                       <div className="absolute bottom-6 left-6 text-white z-10 max-w-xl space-y-2">
//                         {slide.title && (
//                           <h2 className="text-2xl md:text-4xl font-bold drop-shadow-lg">{slide.title}</h2>
//                         )}
//                         {slide.description && (
//                           <p className="text-sm md:text-base opacity-90">{slide.description}</p>
//                         )}
//                         {slide.cta && (
//                           <button className="mt-2 px-4 py-2 bg-white text-black text-sm rounded hover:bg-gray-200 transition">
//                             {slide.cta}
//                           </button>
//                         )}
//                       </div>
//                     </Card>
//                   </motion.div>
//                 </AnimatePresence>
//               </CarouselItem>
//             ))}
//           </CarouselContent>

//           {/* Navigation arrows */}
//           <CarouselPrevious className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white hover:text-black rounded-full p-2 md:p-3 transition-colors" />
//           <CarouselNext className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white hover:text-black rounded-full p-2 md:p-3 transition-colors" />
//         </Carousel>
//       </div>

//       {/* Dots */}
//       <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
//         {slides.map((_, index) => (
//           <div
//             key={index}
//             className={`w-3 h-3 rounded-full transition-all duration-300 ${
//               current === index ? "bg-blue-500 scale-110" : "bg-white/50"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   )
// // }
// "use client"

// import * as React from "react"
// import Image from "next/image"
// import { Card } from "@/components/ui/card"
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
//   type CarouselApi,
// } from "@/components/ui/carousel"
// import { motion } from "framer-motion"

// type Slide = {
//   type: "food-ad" | "city-info"
//   imageSrc: string
//   alt: string
//   title?: string
//   description?: string
//   cta?: string
//   address?: string
//   social?: string
// }

// const slides: Slide[] = [
//   {
//     type: "food-ad",
//     imageSrc:
//       "https://cdn.tripinafrica.com/1920x1080/media/jWuvEfvO1B6ICZxdkOpEEFYtmBL5EdXZui8M5TcD.jpg",
//     alt: "Food advertisement with rice and chicken",
//     title: "TripinAFrica",
//     description: "One plate and you're hooked!",
//     cta: "Order now!",
//   },
//   {
//     type: "city-info",
//     imageSrc: "https://baab.ci/wp-content/uploads/2021/06/OgoodFood_Plateau_BAAB.jpg",
//     alt: "Stade Félix-Houphouët-Boigny",
//     title: "OgoodFood Plateau",
//     description:
//       "Le Félicia est le plus grand stade d’Abidjan. Il accueille les grands événements sportifs et culturels du pays.",
//   },
//   {
//     type: "city-info",
//     imageSrc: "https://www.mangalis.com/wp-content/uploads/sites/166/2024/09/Piscine-4.jpg",
//     alt: "Abidjan city view",
//     title: "Mangalis Hotel",
//     description:
//       "Abidjan est la capitale économique de la Côte d'Ivoire. Un centre dynamique entre modernité et tradition.",
//   },
//   {
//     type: "city-info",
//     imageSrc: "https://images.trvl-media.com/lodging/1000000/40000/34700/34642/279c95a8.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
//     alt: "Abidjan city view",
//     title: "Ibis Abidjan Plateau",
//     description:
//       "Abidjan est la capitale économique de la Côte d'Ivoire. Un centre dynamique entre modernité et tradition.",
//   },
//   {
//     type: "city-info",
//     imageSrc: "https://www.yonder.fr/sites/default/files/styles/lg-insert/public/contenu/destinations/le%20toit%20restaurant%20Sofitel%20%C2%A9%C2%A0Accor.jpg?itok=dCUkX4Kv",
//     alt: "Abidjan city view",
//     title: "Yonder Restaurant",
//     description:
//       "Abidjan est la capitale économique de la Côte d'Ivoire. Un centre dynamique entre modernité et tradition.",
//   },
//   {
//     type: "city-info",
//     imageSrc: "https://baab.ci/wp-content/uploads/2020/09/Afia1-3.jpg",
//     alt: "Abidjan city view",
//     title: "Afia Restaurant",
//     description:
//       "Abidjan est la capitale economique de la Cote d'Ivoire. Un centre dynamique entre modernite et tradition.",
//   },
// ]

// export default function CarouselComponent() {
//   const [api, setApi] = React.useState<CarouselApi>()
//   const [current, setCurrent] = React.useState(0)

//   React.useEffect(() => {
//     if (!api) return

//     setCurrent(api.selectedScrollSnap())
//     const handleSelect = () => setCurrent(api.selectedScrollSnap())
//     api.on("select", handleSelect)

//     const interval = setInterval(() => {
//       api.scrollNext()
//     }, 5000)

//     return () => {
//       clearInterval(interval)
//       api.off("select", handleSelect)
//     }
//   }, [api])

//   return (
//     <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
//       <div className="relative z-10 flex items-center justify-center h-full">
//         <Carousel setApi={setApi} opts={{ loop: true }} className="w-full max-w-6xl mx-auto">
//           <CarouselContent>
//             {slides.map((slide, index) => (
//               <CarouselItem key={index}>
//                 <motion.div
//                   className="p-4 md:p-8 flex items-center justify-center h-full"
//                   initial={{ opacity: 0, scale: 0.98 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.8, ease: "easeOut" }}
//                 >
//                   <Card className="relative w-full border-none max-w-4xl h-[400px] md:h-[500px] lg:h-[650px] rounded-2xl overflow-hidden shadow-2xl group">
//                     <Image
//                       src={slide.imageSrc}
//                       alt={slide.alt}
//                       fill
//                       sizes="100vw"
//                       className="absolute inset-0 object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
//                     <div className="absolute bottom-6 left-6 text-white z-10 max-w-4xl space-y-2">
//                       {slide.title && (
//                         <h2 className="text-2xl md:text-4xl font-bold drop-shadow-lg">{slide.title}</h2>
//                       )}
//                       {/* {slide.description && (
//                         <p className="text-sm md:text-base opacity-90">{slide.description}</p>
//                       )} */}
//                       {slide.cta && (
//                         <button className="mt-2 px-4 py-2 bg-white text-black text-sm rounded hover:bg-gray-200 transition">
//                           {slide.cta}
//                         </button>
//                       )}
//                     </div>
//                   </Card>
//                 </motion.div>
//               </CarouselItem>
//             ))}
//           </CarouselContent>

//           <CarouselPrevious className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white hover:text-black rounded-full p-2 md:p-3 transition-colors" />
//           <CarouselNext className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white hover:text-black rounded-full p-2 md:p-3 transition-colors" />
//         </Carousel>
//       </div>

//       {/* Dots */}
//       <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
//         {slides.map((_, index) => (
//           <div
//             key={index}
//             className={`w-3 h-3 rounded-full transition-all duration-300 ${
//               current === index ? "bg-blue-500 scale-110" : "bg-white/50"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }
"use client"

import * as React from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { motion } from "framer-motion"
import { QRCodeSVG } from 'qrcode.react'

type Slide = {
  type: "food-ad" | "city-info"
  imageSrc: string
  alt: string
  title?: string
  description?: string
  cta?: string
  address?: string
  social?: string
  qrData?: string // URL ou données pour le QR code
  qrLabel?: string // Texte d'accompagnement pour le QR code
}

const slides: Slide[] = [
  {
    type: "food-ad",
    imageSrc:
      "https://cdn.tripinafrica.com/1920x1080/media/jWuvEfvO1B6ICZxdkOpEEFYtmBL5EdXZui8M5TcD.jpg",
    alt: "Food advertisement with rice and chicken",
    title: "TripinAFrica",
    description: "One plate and you're hooked!",
    cta: "Order now!",
    qrData: "https://tripinafrica.com/order",
    qrLabel: "Commandez ici"
  },
  {
    type: "city-info",
    imageSrc: "https://baab.ci/wp-content/uploads/2021/06/OgoodFood_Plateau_BAAB.jpg",
    alt: "Stade Félix-Houphouët-Boigny",
    title: "OgoodFood Plateau",
    description:
      "Le Félicia est le plus grand stade d'Abidjan. Il accueille les grands événements sportifs et culturels du pays.",
    qrData: "https://maps.google.com/ogoodfood-plateau",
    qrLabel: "Voir sur la carte"
  },
  {
    type: "city-info",
    imageSrc: "https://www.mangalis.com/wp-content/uploads/sites/166/2024/09/Piscine-4.jpg",
    alt: "Abidjan city view",
    title: "Mangalis Hotel",
    description:
      "Abidjan est la capitale économique de la Côte d'Ivoire. Un centre dynamique entre modernité et tradition.",
    qrData: "https://mangalis.com/booking",
    qrLabel: "Réserver"
  },
  {
    type: "city-info",
    imageSrc: "https://images.trvl-media.com/lodging/1000000/40000/34700/34642/279c95a8.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
    alt: "Abidjan city view",
    title: "Ibis Abidjan Plateau",
    description:
      "Abidjan est la capitale économique de la Côte d'Ivoire. Un centre dynamique entre modernité et tradition.",
    qrData: "https://ibis.com/abidjan-plateau",
    qrLabel: "Plus d'infos"
  },
  {
    type: "city-info",
    imageSrc: "https://www.yonder.fr/sites/default/files/styles/lg-insert/public/contenu/destinations/le%20toit%20restaurant%20Sofitel%20%C2%A9%C2%A0Accor.jpg?itok=dCUkX4Kv",
    alt: "Abidjan city view",
    title: "Yonder Restaurant",
    description:
      "Abidjan est la capitale économique de la Côte d'Ivoire. Un centre dynamique entre modernité et tradition.",
    qrData: "https://yonder.fr/reservation",
    qrLabel: "Réservation"
  },
  {
    type: "city-info",
    imageSrc: "https://baab.ci/wp-content/uploads/2020/09/Afia1-3.jpg",
    alt: "Abidjan city view",
    title: "Afia Restaurant",
    description:
      "Abidjan est la capitale economique de la Cote d'Ivoire. Un centre dynamique entre modernite et tradition.",
    qrData: "https://afia-restaurant.ci/menu",
    qrLabel: "Voir le menu"
  },
]

export default function CarouselComponent() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())
    const handleSelect = () => setCurrent(api.selectedScrollSnap())
    api.on("select", handleSelect)

    const interval = setInterval(() => {
      api.scrollNext()
    }, 5000)

    return () => {
      clearInterval(interval)
      api.off("select", handleSelect)
    }
  }, [api])

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      <div className="relative z-10 flex items-center justify-center h-full">
        <Carousel setApi={setApi} opts={{ loop: true }} className="w-full max-w-6xl mx-auto">
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <motion.div
                  className="p-4 md:p-8 flex items-center justify-center h-full"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <Card className="relative w-full border-none max-w-4xl h-[400px] md:h-[500px] lg:h-[650px] rounded-2xl overflow-hidden shadow-2xl group">
                    <Image
                      src={slide.imageSrc}
                      alt={slide.alt}
                      fill
                      sizes="100vw"
                      className="absolute inset-0 object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    
                    {/* QR Code dans le coin supérieur droit */}
                    {slide.qrData && (
                      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-20">
                        <motion.div
                          className="bg-white/95 backdrop-blur-sm p-5 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                        >
                          <QRCodeSVG
                            value={slide.qrData}
                            size={80}
                            level="M"
                            includeMargin={false}
                            className="w-16 h-16 md:w-20 md:h-20"
                          />
                          {slide.qrLabel && (
                            <p className="text-xs text-gray-700 text-center mt-1 font-medium">
                              {slide.qrLabel}
                            </p>
                          )}
                        </motion.div>
                      </div>
                    )}

                    <div className="absolute bottom-6 left-6 text-white z-10 max-w-4xl space-y-2">
                      {slide.title && (
                        <h2 className="text-2xl md:text-4xl font-bold drop-shadow-lg">{slide.title}</h2>
                      )}
                      {/* {slide.description && (
                        <p className="text-sm md:text-base opacity-90">{slide.description}</p>
                      )} */}
                      {slide.cta && (
                        <button className="mt-2 px-4 py-2 bg-white text-black text-sm rounded hover:bg-gray-200 transition">
                          {slide.cta}
                        </button>
                      )}
                    </div>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white hover:text-black rounded-full p-2 md:p-3 transition-colors" />
          <CarouselNext className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white hover:text-black rounded-full p-2 md:p-3 transition-colors" />
        </Carousel>
      </div>

      {/* Dots */}
      {/* <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index ? "bg-blue-500 scale-110" : "bg-white/50"
            }`}
          />
        ))}
      </div> */}
    </div>
  )
}