"use client"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { getNewsById, newsData } from "@/lib/news-data"

export default function ActualiteDetail() {
  const params = useParams()
  const router = useRouter()
  const articleId = params.id as string

  const article = getNewsById(articleId)

  // Articles similaires (même catégorie, excluant l'article actuel)
  const relatedArticles = newsData.filter((a) => a.category === article?.category && a.id !== articleId).slice(0, 3)

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Article non trouvé</h1>
          <p className="text-gray-600 mb-4">L'article demandé n'existe pas.</p>
          <Link href="/actualites">
            <Button className="bg-primary text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux actualités
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = article.title

    let shareUrl = ""
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400")
    }
  }

  return (
    <div className="min-h-screen  bg-gray-50">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-4 py-8"
      >
        {/* Navigation */}
        <motion.div variants={itemVariants} className="mb-8 pt-40">
          <Button variant="ghost" onClick={() => router.back()} className="text-primary hover:text-primary/80 p-0">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
        </motion.div>

        {/* Article Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="mb-4">
            <Badge className="bg-green-600 text-white text-lg px-4 py-2 rounded-[4px]">{article.category}</Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">{article.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span className="text-lg">{article.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span className="text-lg">{article.author}</span>
            </div>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed max-w-4xl">{article.description}</p>
        </motion.div>

        {/* Article Image */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="relative h-[400px] md:h-[600px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src={article.imageSrc || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Article Content */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-8 md:p-12">
              <div
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: article.content
                    .replace(/\n\n/g, "</p><p>")
                    .replace(/\n/g, "<br>")
                    .replace(/## (.*)/g, '<h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">$1</h2>')
                    .replace(/### (.*)/g, '<h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">$1</h3>')
                    .replace(/- (.*)/g, '<li class="mb-2">$1</li>')
                    .replace(/<li/g, '<ul class="list-disc pl-6 mb-4"><li')
                    .replace(/<\/li>(?!.*<li)/g, "</li></ul>"),
                }}
              />

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-500 font-medium">Tags :</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Share */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Partager
              </h3>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare("facebook")}
                  className="flex-1 text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare("twitter")}
                  className="flex-1 text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare("linkedin")}
                  className="flex-1 text-blue-700 border-blue-700 hover:bg-blue-700 hover:text-white"
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </Card>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Articles similaires</h3>
                <div className="space-y-4">
                  {relatedArticles.map((relatedArticle) => (
                    <Link key={relatedArticle.id} href={`/actualites/${relatedArticle.id}`} className="block group">
                      <div className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="relative w-20 h-16 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={relatedArticle.imageSrc || "/placeholder.svg"}
                            alt={relatedArticle.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800 group-hover:text-primary transition-colors line-clamp-2 text-sm leading-tight">
                            {relatedArticle.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">{relatedArticle.date}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/actualites">
                  <Button
                    variant="outline"
                    className="w-full mt-4 text-primary border-primary hover:bg-primary hover:text-white bg-transparent"
                  >
                    Voir toutes les actualités
                  </Button>
                </Link>
              </Card>
            )}

            {/* Contact */}
            <Card className="p-6 bg-blue-50 border-blue-200">
              <h3 className="text-xl font-bold text-blue-800 mb-4">Besoin d'informations ?</h3>
              <p className="text-blue-700 mb-4 text-sm">
                Contactez notre service communication pour plus de détails sur cet article.
              </p>
              <div className="space-y-2 text-sm text-blue-700">
                <p>
                  <strong>Email :</strong> communication@mairie-plateau.fr
                </p>
                <p>
                  <strong>Téléphone :</strong> 01 23 45 67 89
                </p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Navigation to other articles */}
        <motion.div variants={itemVariants} className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <Link href="/actualites">
              <Button
                variant="outline"
                className="text-primary border-primary hover:bg-primary hover:text-white bg-transparent"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Toutes les actualités
              </Button>
            </Link>
            <div className="text-sm text-gray-500">
              Article publié le {article.date} par {article.author}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
