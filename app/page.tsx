"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"
import {
  Mail,
  Twitter,
  Palette,
  Brush,
  Zap,
  Heart,
  Layout,
  Upload,
  Plus,
  Briefcase,
  Linkedin,
  Camera,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowUpRight,
} from "lucide-react"

const paintings = [
  {
    id: 1,
    title: "Sunset Dreams",
    category: "painting",
    image: "/placeholder-t7yiv.png",
    description: "A vibrant exploration of color and emotion, capturing the essence of twilight.",
    images: ["/placeholder-t7yiv.png", "/sunset-painting-detail-1.jpg", "/sunset-painting-detail-2.jpg"],
  },
  {
    id: 2,
    title: "Ocean Waves",
    category: "painting",
    image: "/placeholder-1lffd.png",
    description: "The rhythm of the sea captured in bold brushstrokes and flowing forms.",
    images: ["/placeholder-1lffd.png", "/ocean-waves-painting-detail-1.jpg", "/ocean-waves-painting-detail-2.jpg"],
  },
  {
    id: 3,
    title: "Floral Sleeve",
    category: "painting",
    image: "/placeholder-zg4x3.png",
    description: "Delicate botanicals intertwined in a symphony of ink and skin.",
    images: ["/placeholder-zg4x3.png", "/floral-painting-detail-1.jpg", "/floral-painting-detail-2.jpg"],
  },
]

const digitalArt = [
  {
    id: 1,
    title: "Neon City",
    category: "digital",
    image: "/neon-cyberpunk-city.png",
    description: "Ilustración digital de una ciudad futurista con luces de neón.",
    images: ["/neon-cyberpunk-city.png", "/neon-city-detail-1.jpg", "/neon-city-detail-2.jpg"],
  },
  {
    id: 2,
    title: "Fantasy Portrait",
    category: "digital",
    image: "/fantasy-character-portrait-digital-painting.jpg",
    description: "Retrato digital de un personaje de fantasía con detalles mágicos.",
    images: [
      "/fantasy-character-portrait-digital-painting.jpg",
      "/fantasy-portrait-detail-1.jpg",
      "/fantasy-portrait-detail-2.jpg",
    ],
  },
  {
    id: 3,
    title: "Abstract Dreams",
    category: "digital",
    image: "/colorful-abstract-digital-art.png",
    description: "Arte digital abstracto con colores vibrantes y formas fluidas.",
    images: ["/colorful-abstract-digital-art.png", "/abstract-art-detail-1.jpg", "/abstract-art-detail-2.jpg"],
  },
]

const tattoos = [
  {
    id: 1,
    title: "Mandala Design",
    category: "tattoo",
    image: "/mandala-tattoo-design-black-ink.jpg",
    description: "Diseño de mandala intrincado con patrones geométricos detallados.",
    images: [
      "/mandala-tattoo-design-black-ink.jpg",
      "/mandala-tattoo-detail-1.jpg",
      "/placeholder.svg?height=600&width=600",
    ],
  },
  {
    id: 2,
    title: "Botanical Sleeve",
    category: "tattoo",
    image: "/placeholder.svg?height=600&width=600",
    description: "Manga completa con diseño botánico de flores y hojas.",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
  {
    id: 3,
    title: "Geometric Wolf",
    category: "tattoo",
    image: "/placeholder.svg?height=600&width=600",
    description: "Diseño de lobo con estilo geométrico y líneas precisas.",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
]

const graphicDesigns = [
  {
    id: 1,
    title: "Identidad Corporativa Buka",
    type: "Branding",
    image: "/gym-branding-design.png",
    description:
      "Diseño completo de identidad visual para un gimnasio ficticio, incluyendo logo, una one page y expansiones de la marca. Para ver más ingresa aquí.",
    link: "https://www.behance.net/gallery/231852521/Identidad-de-marca-BUKA",
  },
  {
    id: 2,
    title: "Trabajo realizado con malla",
    type: "Illustration",
    image: "/robot-illustration.jpg",
    description:
      "Este robot se realizó con el programa illustrator, utilizando todas las herramientas del programa, desde malla hasta pluma y degradados.",
  },
  {
    id: 3,
    title: "Fotomontaje Photoshop",
    type: "Photomontage",
    image: "/photomontage-artwork.jpg",
    description: "Fotomontaje realista realizado con el programa photoshop",
  },
  {
    id: 4,
    title: "Pagina web desde cero",
    type: "Web Development",
    image: "/website-project.png",
    description:
      "Esta pagina la realice con HTML y CSS en Visual Studio Code para un proyecto de da vinci. Si queres verla completa ingresá aquí.",
    link: "https://www.behance.net/gallery/234360823/Web-page-Marandina",
  },
  {
    id: 5,
    title: "Collage",
    type: "Collage",
    image: "/collage-artwork.jpg",
    description: "Collage realizado en photoshop con elementos centrados en un molino.",
  },
  {
    id: 6,
    title: "Portada película",
    type: "Movie Poster",
    image: "/movie-poster.jpg",
    description: "Portada para película infantil realizada con photoshop e inteligencia artificial.",
  },
]

const categories = [
  { id: "all", label: "Diseño Multimedia", icon: Palette },
  { id: "painting", label: "Paintings", icon: Brush },
  { id: "digital", label: "Digital Art", icon: Zap },
  { id: "tattoo", label: "Tattoos", icon: Heart },
]

const UploadCard = ({ title, description }: { title: string; description: string }) => (
  <Card className="art-card group cursor-pointer overflow-hidden border-2 border-dashed border-muted-foreground/20 hover:border-primary/50 bg-transparent">
    <CardContent className="p-0">
      <AspectRatio ratio={1}>
        <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-muted/10 to-muted/30 group-hover:from-primary/5 group-hover:to-primary/10 transition-all duration-700">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-all duration-500 animate-morph">
              <Plus
                className="w-10 h-10 text-primary/60 group-hover:text-primary transition-colors duration-300 group-hover:rotate-90 transform"
                style={{ transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
              />
            </div>
          </div>
          <Upload className="w-5 h-5 text-muted-foreground/50 mb-3 group-hover:translate-y-[-4px] transition-transform duration-300" />
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/60">Nueva Obra</p>
        </div>
      </AspectRatio>
      <div className="p-6 border-t border-border/50">
        <h3 className="font-serif text-lg font-bold mb-1 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground/70 text-sm leading-relaxed">{description}</p>
      </div>
    </CardContent>
  </Card>
)

interface CarouselItem {
  id: number
  title: string
  category: string
  image: string
  description: string
  images: string[]
}

const ImageCarousel = ({
  item,
  onClose,
}: {
  item: CarouselItem
  onClose: () => void
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(onClose, 300)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % item.images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + item.images.length) % item.images.length)
  }

  return (
    <div
      className={`fixed inset-0 z-50 gallery-view flex flex-col transition-all duration-300 ${isExiting ? "opacity-0" : "opacity-100"}`}
    >
      {/* Minimal header */}
      <div className="gallery-controls absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-6 md:p-10">
        <div className="animate-slide-in">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mb-1">{item.category}</p>
          <h2 className="font-serif text-2xl md:text-4xl font-bold text-white">{item.title}</h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="w-12 h-12 rounded-full border border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Image display */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-16 relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="gallery-controls absolute left-4 md:left-10 z-10 w-14 h-14 rounded-full border border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        <div className="relative w-full max-w-5xl h-full max-h-[70vh] animate-scale-in">
          {item.images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
                index === currentIndex
                  ? "opacity-100 scale-100"
                  : index < currentIndex
                    ? "opacity-0 scale-95 -translate-x-full"
                    : "opacity-0 scale-95 translate-x-full"
              }`}
            >
              <Image
                src={img || "/placeholder.svg"}
                alt={`${item.title} - Image ${index + 1}`}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="gallery-controls absolute right-4 md:right-10 z-10 w-14 h-14 rounded-full border border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Minimal footer */}
      <div className="gallery-controls absolute bottom-0 left-0 right-0 p-6 md:p-10">
        <div className="flex items-center justify-between">
          <p className="text-white/60 text-sm max-w-xl leading-relaxed hidden md:block">{item.description}</p>
          <div className="flex items-center gap-3 mx-auto md:mx-0">
            {item.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-500 ${
                  index === currentIndex ? "w-12 h-1 bg-white" : "w-6 h-1 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const ArtworkCard = ({
  item,
  onSelect,
  index = 0,
}: {
  item: CarouselItem
  onSelect: (item: CarouselItem) => void
  index?: number
}) => (
  <Card
    className="art-card group cursor-pointer overflow-hidden border-0 bg-card"
    onClick={() => onSelect(item)}
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <CardContent className="p-0">
      <AspectRatio ratio={1}>
        <div className="relative w-full h-full overflow-hidden">
          <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="art-card-image object-cover" />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
            <Badge className="w-fit mb-2 bg-white/10 backdrop-blur-sm text-white border-0 font-mono text-[10px] uppercase tracking-wider">
              {item.category}
            </Badge>
            <h3 className="font-serif text-xl text-white font-bold">{item.title}</h3>
          </div>
          {/* Corner accent */}
          <div className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-45">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
        </div>
      </AspectRatio>
      <div className="p-5 border-t border-border/30">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-serif text-lg font-bold leading-tight group-hover:text-primary transition-colors duration-300">
            {item.title}
          </h3>
        </div>
        <p className="text-muted-foreground/70 text-sm line-clamp-2 leading-relaxed">{item.description}</p>
      </div>
    </CardContent>
  </Card>
)

export default function MarandinaPortfolio() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isVisible, setIsVisible] = useState(false)
  const [selectedArtwork, setSelectedArtwork] = useState<CarouselItem | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrollTop / docHeight, 1)
      setScrollProgress(progress)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const closeCarousel = () => {
    setSelectedArtwork(null)
  }

  const getBackgroundStyle = () => {
    const hue1 = 45 + scrollProgress * 30
    const sat1 = 10 + scrollProgress * 15
    const light1 = 98 - scrollProgress * 3

    const hue2 = 270 - scrollProgress * 40
    const sat2 = 20 + scrollProgress * 10
    const light2 = 95 - scrollProgress * 5

    return {
      background: `
        linear-gradient(
          ${135 + scrollProgress * 45}deg,
          hsl(${hue1}, ${sat1}%, ${light1}%) 0%,
          hsl(${hue2}, ${sat2}%, ${light2}%) 50%,
          hsl(${hue1 + 20}, ${sat1 + 5}%, ${light1 - 2}%) 100%
        )
      `,
      transition: "background 0.3s ease-out",
    }
  }

  return (
    <div className="min-h-screen grain-overlay" style={getBackgroundStyle()}>
      {selectedArtwork && <ImageCarousel item={selectedArtwork} onClose={closeCarousel} />}

      <section className="relative flex items-center justify-center py-16 md:py-24 overflow-hidden px-4">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #8C5CF2 0%, transparent 50%),
                             radial-gradient(circle at 80% 50%, #F28322 0%, transparent 50%)`,
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <div
              className="mb-8 animate-float"
              style={{
                transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
                transition: "transform 0.5s ease-out",
              }}
            >
              <div
                className="inline-flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full flex-shrink-0"
                style={{ backgroundColor: "#8C5CF2" }}
              >
                <Image
                  src="/images/marandina-logo-float.png"
                  alt="Marandina Logo"
                  width={140}
                  height={140}
                  className="drop-shadow-2xl w-24 h-24 md:w-32 md:h-32 object-contain flex-shrink-0"
                />
              </div>
            </div>

            <div className="overflow-hidden mb-4">
              <h1
                className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
                style={{ color: "#F28322" }}
              >
                Natalia
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1
                className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[0.95]"
                style={{ animationDelay: "0.2s" }}
              >
                Espain
              </h1>
            </div>

            <p
              className="mt-6 font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground/60 animate-fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              Artista Multidisciplinaria
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="border border-border/30 bg-white/60 backdrop-blur-md p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent" />

            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
              <div className="md:col-span-7">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-3">Sobre mí</p>
                <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6 text-foreground leading-[0.95]">Natalia</h2>
                <p className="text-base md:text-lg text-foreground/60 leading-relaxed mb-6">
                  Soy una artista multidisciplinaria apasionada que cree en el poder del color, la forma y la emoción para
                  transformar espacios y almas. Actualmente soy estudiante de la Escuela Da Vinci en la carrera de Diseño
                  Multimedia, donde perfecciono mis habilidades técnicas y creativas.
                </p>
                <p className="text-sm text-foreground/40 leading-relaxed mb-8">
                  Mi trayectoria abarca pinturas tradicionales, arte digital de vanguardia y diseños de tatuajes
                  significativos. Cada medio ofrece un lenguaje único para expresar las historias vibrantes que viven
                  dentro de todos nosotros.
                </p>

                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground/60 mb-4">Conectemos</p>
                  <div className="flex gap-3">
                    {[
                      { icon: Mail, label: "Email" },
                      { icon: Camera, label: "Instagram" },
                      { icon: Briefcase, label: "Behance" },
                      { icon: Linkedin, label: "LinkedIn" },
                      { icon: Twitter, label: "TikTok" },
                    ].map(({ icon: Icon, label }) => (
                      <Button
                        key={label}
                        variant="outline"
                        size="icon"
                        className="magnetic-btn w-12 h-12 border-border/50 hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-300 bg-transparent"
                      >
                        <Icon className="w-4 h-4" />
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="md:col-span-5 flex justify-end">
                <div className="relative">
                  <div
                    className="absolute -inset-4 border border-primary/20 -z-10"
                    style={{ transform: "translate(8px, 8px)" }}
                  />
                  <div className="w-72 h-72 md:w-80 md:h-80 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                    <Image
                      src="/images/natalia-photo.jpg"
                      alt="Natalia Espain"
                      width={320}
                      height={320}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-16 px-4">
        <div className="max-w-7xl mx-auto relative z-10">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <div className="mb-16 border-b border-border/30">
              <TabsList className="bg-transparent h-auto p-0 gap-0 w-full justify-start">
                {categories.map((category, idx) => {
                  const Icon = category.icon
                  return (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="relative px-6 py-4 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground/60 data-[state=active]:text-foreground bg-transparent border-0 rounded-none transition-all duration-300 hover:text-foreground data-[state=active]:shadow-none"
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{category.label}</span>
                      </span>
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 data-[state=active]:scale-x-100 transition-transform duration-300 origin-left" />
                    </TabsTrigger>
                  )
                })}
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0 animate-fade-in-up">
              <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#8C5CF2" }}
                    >
                      <Layout className="w-5 h-5 text-white" />
                    </div>
                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground/60">Portfolio</p>
                  </div>
                  <h2 className="font-serif text-5xl md:text-7xl font-bold text-foreground leading-[0.9]">
                    Diseñadora
                    <br />
                    <span className="text-primary">Multimedia</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  <UploadCard title="Agregar Diseño" description="Sube un nuevo proyecto de diseño multimedia" />
                  {graphicDesigns.map((design, idx) => (
                    <Dialog key={design.id}>
                      <DialogTrigger asChild>
                        <Card
                          className="art-card group cursor-pointer overflow-hidden border-0 bg-card"
                          style={{ animationDelay: `${idx * 0.1}s` }}
                        >
                          <CardContent className="p-0">
                            <AspectRatio ratio={1}>
                              <div className="relative w-full h-full overflow-hidden">
                                <Image
                                  src={design.image || "/placeholder.svg"}
                                  alt={design.title}
                                  fill
                                  className={`art-card-image object-cover ${design.id === 6 ? "object-bottom" : ""}`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                                  <Badge className="w-fit mb-2 bg-white/10 backdrop-blur-sm text-white border-0 font-mono text-[10px] uppercase tracking-wider">
                                    {design.type}
                                  </Badge>
                                  <h3 className="font-serif text-xl text-white font-bold">{design.title}</h3>
                                </div>
                                <div className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-45">
                                  <ArrowUpRight className="w-4 h-4 text-white" />
                                </div>
                              </div>
                            </AspectRatio>
                            <div className="p-5 border-t border-border/30">
                              <h3 className="font-serif text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                                {design.title}
                              </h3>
                              <p className="text-muted-foreground leading-relaxed mb-8">
                                {design.link ? (
                                  <>
                                    {design.description.split("aquí")[0]}
                                    <a
                                      href={design.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-primary hover:underline"
                                    >
                                      aquí
                                    </a>
                                    {design.description.split("aquí")[1] || ""}
                                  </>
                                ) : (
                                  design.description
                                )}
                              </p>
                              <Button className="w-full bg-primary hover:bg-primary/90 font-mono text-xs uppercase tracking-wider">
                                Solicitar Cotización
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl border-0 bg-card/95 backdrop-blur-xl p-0 overflow-hidden">
                        <div className="grid md:grid-cols-2">
                          <div className="relative aspect-square">
                            <Image
                              src={design.image || "/placeholder.svg"}
                              alt={design.title}
                              fill
                              className={`object-cover ${design.id === 6 ? "object-bottom" : ""}`}
                            />
                          </div>
                          <div className="p-8 md:p-10 flex flex-col justify-center">
                            <Badge className="w-fit mb-4 bg-primary/10 text-primary border-0 font-mono text-[10px] uppercase tracking-wider">
                              {design.type}
                            </Badge>
                            <h3 className="font-serif text-3xl font-bold mb-4">{design.title}</h3>
                            <p className="text-muted-foreground leading-relaxed mb-8">
                              {design.link ? (
                                <>
                                  {design.description.split("aquí")[0]}
                                  <a
                                    href={design.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                  >
                                    aquí
                                  </a>
                                  {design.description.split("aquí")[1] || ""}
                                </>
                              ) : (
                                design.description
                              )}
                            </p>
                            <Button className="w-full bg-primary hover:bg-primary/90 font-mono text-xs uppercase tracking-wider">
                              Solicitar Cotización
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="painting" className="mt-0 animate-fade-in-up">
              <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#8C5CF2" }}
                    >
                      <Brush className="w-5 h-5 text-white" />
                    </div>
                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground/60">Colección</p>
                  </div>
                  <h2 className="font-serif text-5xl md:text-7xl font-bold text-foreground leading-[0.9]">Paintings</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  <UploadCard title="Agregar Pintura" description="Sube una nueva pintura para tu colección" />
                  {paintings.map((item, idx) => (
                    <ArtworkCard key={item.id} item={item} onSelect={setSelectedArtwork} index={idx} />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="digital" className="mt-0 animate-fade-in-up">
              <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#8C5CF2" }}
                    >
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground/60">Exploración</p>
                  </div>
                  <h2 className="font-serif text-5xl md:text-7xl font-bold text-foreground leading-[0.9]">
                    Digital
                    <br />
                    <span className="text-secondary">Art</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  <UploadCard title="Agregar Arte Digital" description="Sube una nueva obra de arte digital" />
                  {digitalArt.map((item, idx) => (
                    <ArtworkCard key={item.id} item={item} onSelect={setSelectedArtwork} index={idx} />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tattoo" className="mt-0 animate-fade-in-up">
              <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#8C5CF2" }}
                    >
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground/60">
                      Arte en piel
                    </p>
                  </div>
                  <h2 className="font-serif text-5xl md:text-7xl font-bold text-foreground leading-[0.9]">Tattoos</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  <UploadCard title="Agregar Tatuaje" description="Sube un nuevo diseño de tatuaje" />
                  {tattoos.map((item, idx) => (
                    <ArtworkCard key={item.id} item={item} onSelect={setSelectedArtwork} index={idx} />
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <footer className="py-16 md:py-24 px-4 border-t border-border/30 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground/60 mb-4">Sígueme</p>
              <div className="flex gap-3">
                {[Mail, Camera, Briefcase, Linkedin, Twitter].map((Icon, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="icon"
                    className="magnetic-btn w-12 h-12 border-border/50 hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-300 bg-transparent"
                  >
                    <Icon className="w-4 h-4" />
                  </Button>
                ))}
              </div>
            </div>
            <div className="text-right">
              <p className="font-serif text-2xl md:text-3xl font-bold mb-2">Marandina</p>
              <p className="font-mono text-xs text-muted-foreground/60">© 2026 Todos los derechos reservados</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
