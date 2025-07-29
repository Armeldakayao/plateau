"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, MapPin, Phone, Globe, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Define the data structure for a detail item
interface DetailItem {
  id: string
  type: "restaurant" | "hotel" | "activity"
  image: string
  title: string
  description: string
  rating?: number
  reviews?: number
  location?: string // For activities
  address?: string
  phone?: string
  website?: string
  // Add more specific details as needed
}

// Fake data for demonstration
const allItems: DetailItem[] = [
  {
    id: "restaurant-1",
    type: "restaurant",
    image: "/placeholder.svg?height=400&width=600&text=Le+Régal+du+Plateau",
    title: "Le Régal du Plateau",
    description:
      "Découvrez une cuisine ivoirienne authentique et savoureuse dans un cadre chaleureux. Notre buffet varié et nos spécialités locales raviront vos papilles. Idéal pour les déjeuners d'affaires et les dîners en famille.",
    rating: 4.5,
    reviews: 123,
    address: "Rue du Commerce, Immeuble Le Régal, Plateau, Abidjan",
    phone: "+225 07 07 07 07 07",
    website: "https://www.leregalduplateau.ci",
  },
  {
    id: "restaurant-2",
    type: "restaurant",
    image: "/placeholder.svg?height=400&width=600&text=Ambiance+Chez+Kaffi",
    title: "Ambiance Chez Kaffi",
    description:
      "Un lieu emblématique pour les grillades africaines et une ambiance conviviale. Venez déguster nos brochettes et poissons braisés dans une atmosphère festive.",
    rating: 4.8,
    reviews: 89,
    address: "Boulevard de la République, Plateau, Abidjan",
    phone: "+225 05 05 05 05 05",
    website: "https://www.chezkaffi.ci",
  },
  {
    id: "restaurant-3",
    type: "restaurant",
    image: "/placeholder.svg?height=400&width=600&text=Le+Bistrot+du+Plateau",
    title: "Le Bistrot du Plateau",
    description:
      "Cuisine française classique et brasserie élégante. Profitez d'un cadre raffiné pour vos repas d'affaires ou vos dîners romantiques.",
    rating: 4.2,
    reviews: 150,
    address: "Avenue Chardy, Plateau, Abidjan",
    phone: "+225 01 01 01 01 01",
    website: "https://www.lebistrotduplateau.ci",
  },
  {
    id: "restaurant-4",
    type: "restaurant",
    image: "/placeholder.svg?height=400&width=600&text=Saveurs+d'Abidjan",
    title: "Saveurs d'Abidjan",
    description:
      "Une expérience culinaire fusion, mêlant saveurs locales et internationales. Un restaurant gastronomique pour une soirée inoubliable.",
    rating: 4.7,
    reviews: 75,
    address: "Rue des Banques, Plateau, Abidjan",
    phone: "+225 03 03 03 03 03",
    website: "https://www.saveursdabidjan.ci",
  },
  {
    id: "hotel-1",
    type: "hotel",
    image: "/placeholder.svg?height=400&width=600&text=Hôtel+Pullman+Abidjan",
    title: "Hôtel Pullman Abidjan",
    description:
      "Hôtel de luxe avec des chambres spacieuses, une piscine extérieure, un centre de fitness et plusieurs restaurants. Idéalement situé au cœur du Plateau.",
    rating: 4.6,
    reviews: 250,
    address: "Avenue Abdoulaye Fadiga, Plateau, Abidjan",
    phone: "+225 27 20 20 20 20",
    website: "https://www.pullmanhotels.com/abidjan",
  },
  {
    id: "hotel-2",
    type: "hotel",
    image: "/placeholder.svg?height=400&width=600&text=Résidence+Le+Plateau",
    title: "Résidence Le Plateau",
    description:
      "Appartements modernes et entièrement équipés pour des séjours de courte ou longue durée. Profitez du confort d'un chez-soi avec les services hôteliers.",
    rating: 4.3,
    reviews: 180,
    address: "Rue du Dr Crozet, Plateau, Abidjan",
    phone: "+225 27 22 22 22 22",
    website: "https://www.residenceleplateau.ci",
  },
  {
    id: "hotel-3",
    type: "hotel",
    image: "/placeholder.svg?height=400&width=600&text=Hôtel+Tiama",
    title: "Hôtel Tiama",
    description:
      "Un hôtel 5 étoiles emblématique au cœur d'Abidjan, offrant un service impeccable, des chambres élégantes et des installations de première classe.",
    rating: 4.7,
    reviews: 300,
    address: "Boulevard de la République, Plateau, Abidjan",
    phone: "+225 27 20 30 30 30",
    website: "https://www.hoteltiama.ci",
  },
  {
    id: "activity-1",
    type: "activity",
    image: "/placeholder.svg?height=400&width=600&text=Galerie+Cécile+Fakhoury",
    title: "La Galerie Cécile Fakhoury",
    description:
      "Découvrez l'art contemporain africain et international dans cette galerie de renom. Des expositions régulières mettent en lumière des talents émergents et confirmés.",
    location: "Rue des Jardins, Plateau",
    address: "Rue des Jardins, Plateau, Abidjan",
    website: "https://www.cecilefakhoury.com",
  },
  {
    id: "activity-2",
    type: "activity",
    image: "/placeholder.svg?height=400&width=600&text=Le+District+d'Abidjan+Fakhoury",
    title: "Le District d'Abidjan Fakhoury",
    description:
      "Un espace culturel dynamique proposant des événements, des ateliers et des performances artistiques. Un lieu de rencontre pour la créativité.",
    location: "Rue du Commerce, Plateau",
    address: "Rue du Commerce, Plateau, Abidjan",
    website: "https://www.ledistrictabidjan.ci",
  },
  {
    id: "activity-3",
    type: "activity",
    image: "/placeholder.svg?height=400&width=600&text=Cathédrale+Saint-Paul",
    title: "Cathédrale Saint-Paul d'Abidjan",
    description:
      "Chef-d'œuvre architectural moderne, cette cathédrale est un site religieux et touristique majeur. Admirez son design unique et sa vue panoramique.",
    location: "Boulevard de la République",
    address: "Boulevard de la République, Plateau, Abidjan",
    website: "https://fr.wikipedia.org/wiki/Cath%C3%A9drale_Saint-Paul_d%27Abidjan",
  },
  {
    id: "activity-4",
    type: "activity",
    image: "/placeholder.svg?height=400&width=600&text=Musée+des+Civilisations",
    title: "Musée des Civilisations de Côte d'Ivoire",
    description:
      "Plongez dans l'histoire et la culture ivoirienne à travers une riche collection d'artefacts, de masques et de sculptures traditionnelles.",
    location: "Avenue du 26 Septembre",
    address: "Avenue du 26 Septembre, Plateau, Abidjan",
    website: "https://www.museecivilisationsci.org",
  },
]

export default function DetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params

  const item = allItems.find((i) => i.id === id)

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Contenu non trouvé</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Désolé, l'élément que vous recherchez n'existe pas ou a été supprimé.</p>
            <Button onClick={() => router.back()} className="bg-primary hover:bg-primary/90 text-white">
              Retour
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative w-full h-64 md:h-[450px]  overflow-hidden">
        <Image src={"/images/service2.svg"} alt={item.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h1 className="text-3xl md:text-5xl font-bold">{item.title}</h1>
          <p className="text-lg md:text-xl opacity-90">{item.description}</p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6 shadow-md rounded-lg">
              <CardContent className="p-0">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Détails</h2>
                <p className="text-gray-700 mb-4">{item.description}</p>

                {item.type === "restaurant" || item.type === "hotel" ? (
                  <div className="flex items-center text-lg text-gray-700 mb-2">
                    <Star className="w-5 h-5 text-yellow-500 mr-2 fill-yellow-500" />
                    <span>{item.rating?.toFixed(1)}</span>
                    <span className="ml-2 text-gray-500">({item.reviews} avis)</span>
                  </div>
                ) : null}

                {item.address && (
                  <div className="flex items-center text-gray-700 mb-2">
                    <MapPin className="w-5 h-5 text-gray-600 mr-2" />
                    <span>{item.address}</span>
                  </div>
                )}

                {item.phone && (
                  <div className="flex items-center text-gray-700 mb-2">
                    <Phone className="w-5 h-5 text-gray-600 mr-2" />
                    <a href={`tel:${item.phone}`} className="hover:underline">
                      {item.phone}
                    </a>
                  </div>
                )}

                {item.website && (
                  <div className="flex items-center text-gray-700 mb-2">
                    <Globe className="w-5 h-5 text-gray-600 mr-2" />
                    <a
                      href={item.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-blue-600"
                    >
                      Visiter le site web
                    </a>
                  </div>
                )}

                {item.type === "restaurant" && (
                  <Badge variant="secondary" className="mt-4 bg-orange-500 text-white">
                    Restaurant
                  </Badge>
                )}
                {item.type === "hotel" && (
                  <Badge variant="secondary" className="mt-4 bg-blue-500 text-white">
                    Hôtel
                  </Badge>
                )}
                {item.type === "activity" && (
                  <Badge variant="secondary" className="mt-4 bg-green-500 text-white">
                    Activité
                  </Badge>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 shadow-md rounded-lg">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-xl font-bold text-gray-800">Informations Complémentaires</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-2 text-gray-700">
                  <li>
                    <Info className="inline-block w-4 h-4 mr-2 text-gray-600" />
                    Horaires: 08:00 - 22:00
                  </li>
                  <li>
                    <Info className="inline-block w-4 h-4 mr-2 text-gray-600" />
                    Parking disponible
                  </li>
                  <li>
                    <Info className="inline-block w-4 h-4 mr-2 text-gray-600" />
                    Accès PMR
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Button
              onClick={() => router.back()}
              className="mt-8 w-full bg-gray-800 hover:bg-gray-700 text-white rounded-[5px]"
            >
              Retour à la liste
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
