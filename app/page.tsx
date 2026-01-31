"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Mail, Instagram, Linkedin, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react"

// Colores de la marca por categoría
const categoryColors = {
  diseno: { r: 242, g: 131, b: 34 },   // naranja #F28322
  paintings: { r: 242, g: 179, b: 61 }, // dorado #F2B33D
  digital: { r: 140, g: 92, b: 242 },  // violeta #8C5CF2
  tattoos: { r: 242, g: 131, b: 34 },  // naranja #F28322
  videos: { r: 242, g: 179, b: 61 },   // dorado #F2B33D
  tienda: { r: 140, g: 92, b: 242 },   // violeta #8C5CF2
}

// Componente de estela del mouse
function MouseTrail({ color }: { color: { r: number; g: number; b: number } }) {
  const [trails, setTrails] = useState<{ x: number; y: number; id: number }[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const newTrail = {
      x: e.clientX,
      y: e.clientY,
      id: Date.now(),
    }
    setTrails((prev) => [...prev.slice(-15), newTrail])
  }, [])

  useEffect(() => {
    if (!isClient) return
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove, isClient])

  useEffect(() => {
    if (!isClient) return
    const interval = setInterval(() => {
      setTrails((prev) => prev.slice(1))
    }, 40)
    return () => clearInterval(interval)
  }, [isClient])

  if (!isClient) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]" style={{ isolation: "isolate" }}>
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: trail.x,
            top: trail.y,
            width: `${12 + index * 2}px`,
            height: `${12 + index * 2}px`,
            background: `radial-gradient(circle, rgba(${color.r}, ${color.g}, ${color.b}, ${0.3 + index * 0.04}) 0%, transparent 70%)`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  )
}

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#trabajo", label: "Trabajo" },
  { href: "#skills", label: "Skills" },
  { href: "#tienda", label: "Tienda" },
  { href: "#contacto", label: "Contacto" },
]

interface Work {
  id: number
  title: string
  category: string
  type: string
  image: string
  description: string
  link?: string
  size: string
  cardType?: "expander" | "slider" | "video" | "store" | "default" // expander = modal con info, slider = modal con carrusel, video = reproductor de video, store = tienda
  images?: string[] // array de imágenes para el slider
  video?: string // ruta al archivo de video local
  youtubeId?: string // ID del video de YouTube
  // Campos para tienda
  price?: number // precio en pesos
  dimensions?: string // medidas del producto
  available?: boolean // disponibilidad
}

const allWorks: Work[] = [
  // ============ EXPANDER CARDS (Diseño Multimedia) ============
  {
    id: 1,
    title: "Identidad Corporativa Buka",
    category: "diseno",
    type: "Branding",
    image: "/gym-branding-design.png",
    description: "Diseño completo de identidad visual para un gimnasio ficticio, incluyendo logo, una one page y expansiones de la marca.",
    link: "https://www.behance.net/gallery/231852521/Identidad-de-marca-BUKA",
    size: "tall",
    cardType: "expander",
  },
  {
    id: 2,
    title: "Trabajo realizado con malla",
    category: "diseno",
    type: "Illustration",
    image: "/robot-illustration.jpg",
    description: "Robot realizado con Illustrator, utilizando herramientas de malla, pluma y degradados.",
    size: "normal",
    cardType: "expander",
  },
  {
    id: 3,
    title: "Fotomontaje Photoshop",
    category: "diseno",
    type: "Photomontage",
    image: "/photomontage-artwork.jpg",
    description: "Fotomontaje creativo/experimental realizado con Photoshop.",
    size: "wide",
    cardType: "expander",
  },
  {
    id: 4,
    title: "Pagina web desde cero",
    category: "diseno",
    type: "Web Development",
    image: "/website-project.png",
    description: "Página web realizada con HTML y CSS en Visual Studio Code para un proyecto de Da Vinci.",
    link: "https://www.behance.net/gallery/234360823/Web-page-Marandina",
    size: "normal",
    cardType: "expander",
  },
  {
    id: 5,
    title: "Collage",
    category: "diseno",
    type: "Collage",
    image: "/collage-artwork.jpg",
    description: "Collage realizado en Photoshop con elementos centrados en un molino.",
    size: "tall",
    cardType: "expander",
  },
  {
    id: 6,
    title: "Portada película",
    category: "diseno",
    type: "Movie Poster",
    image: "/movie-poster.jpg",
    description: "Portada para película infantil realizada con Photoshop e inteligencia artificial.",
    size: "full",
    cardType: "expander",
  },
  {
    id: 42,
    title: "Fotomontaje Realista",
    category: "diseno",
    type: "Photomontage",
    image: "/mujer-tattoo.jpg",
    description: "Proyecto para la materia Photoshop. Composición donde la modelo fue integrada digitalmente al fondo, trabajando luces, sombras y color para lograr una fusión realista con el entorno.",
    size: "tall",
    cardType: "expander",
  },
  // ============ DEFAULT CARDS ============
  // ============ EXPANDER CARDS (Paintings) ============
  {
    id: 7,
    title: "Pintura Acuarela",
    category: "paintings",
    type: "Painting",
    image: "/images/acuarela.jpg",
    description: "Técnica artística que utiliza pigmentos diluidos en agua, creando transparencias y capas sutiles que permiten que la luz del papel brille a través de los colores.",
    size: "tall",
    cardType: "expander",
  },
  {
    id: 8,
    title: "Cerebro",
    category: "paintings",
    type: "Painting",
    image: "/images/cerebro.jpg",
    description: "Representación artística del órgano más complejo del cuerpo humano, explorando la conexión entre mente, creatividad y emociones a través del color y la forma.",
    size: "normal",
    cardType: "expander",
  },
  {
    id: 9,
    title: "Dragón",
    category: "paintings",
    type: "Painting",
    image: "/images/dragon.jpg",
    description: "Criatura mitológica capturada en lienzo, simbolizando poder, sabiduría y la magia que habita en las leyendas ancestrales de diversas culturas.",
    size: "full",
    cardType: "expander",
  },
  {
    id: 16,
    title: "Gorriones",
    category: "paintings",
    type: "Painting",
    image: "/images/gorriones.jpg",
    description: "Pequeñas aves que representan la libertad y la simplicidad de la naturaleza, capturadas con delicadeza en cada pincelada.",
    size: "tall",
    cardType: "expander",
  },
  {
    id: 17,
    title: "Medusas",
    category: "paintings",
    type: "Painting",
    image: "/images/medusas.jpg",
    description: "Criaturas marinas etéreas que flotan en las profundidades del océano, sus formas translúcidas danzan con gracia y misterio.",
    size: "normal",
    cardType: "expander",
  },
  {
    id: 18,
    title: "Peces",
    category: "paintings",
    type: "Painting",
    image: "/images/peces.jpg",
    description: "Vida acuática en movimiento, colores vibrantes que capturan la esencia del mundo submarino y su belleza natural.",
    size: "full",
    cardType: "expander",
  },
  {
    id: 19,
    title: "Tristeza",
    category: "paintings",
    type: "Painting",
    image: "/images/tristeza.jpg",
    description: "Expresión emocional profunda plasmada en el lienzo, explorando la melancolía como parte esencial de la experiencia humana.",
    size: "full",
    cardType: "expander",
  },
  {
    id: 25,
    title: "Omniman",
    category: "paintings",
    type: "Painting",
    image: "/images/omniman.jpg",
    description: "Fan art del icónico personaje de Invincible, capturando su presencia imponente y poder absoluto.",
    size: "tall",
    cardType: "expander",
  },
  // ============ SLIDER CARDS (Digital Art) ============
  {
    id: 10,
    title: "Ilustración en Procreate",
    category: "digital",
    type: "Digital Art",
    image: "/images/moth-violeta.jpg",
    description: "Serie de polillas ilustradas en Procreate con diferentes paletas de colores.",
    size: "tall",
    cardType: "slider",
    images: ["/images/moth-violeta.jpg", "/images/moth-bordo.jpg", "/images/moth-negra.jpg"],
  },
  {
    id: 20,
    title: "Sketchbook Digital",
    category: "digital",
    type: "Digital Art",
    image: "/images/sketchbook/rana.png",
    description: "",
    size: "normal",
    cardType: "slider",
    images: [
      "/images/sketchbook/rana.png",
      "/images/sketchbook/IMG_2066.PNG",
      "/images/sketchbook/sketch1637193809721.png",
      "/images/sketchbook/sketch1638294831353.png",
      "/images/sketchbook/sketch1647983506990.png",
    ],
  },
  {
    id: 21,
    title: "Pink Background Series",
    category: "digital",
    type: "Digital Art",
    image: "/images/pinkbg/ave.png",
    description: "",
    size: "wide",
    cardType: "slider",
    images: [
      "/images/pinkbg/ave.png",
      "/images/pinkbg/sketch1656138197403.png",
      "/images/pinkbg/sketch1663033521765.png",
      "/images/pinkbg/sketch1666725493437.png",
      "/images/pinkbg/sketch1671645802405.png",
    ],
  },
  {
    id: 26,
    title: "Procreate Art",
    category: "digital",
    type: "Digital Art",
    image: "/images/procreate/portada1.JPG",
    description: "Colección de ilustraciones y dibujos creados en Procreate, explorando diferentes estilos y técnicas digitales.",
    size: "tall",
    cardType: "slider",
    images: [
      "/images/procreate/portada1.JPG",
      "/images/procreate/draw1.JPG",
      "/images/procreate/draw2.JPG",
      "/images/procreate/draw3.png",
      "/images/procreate/formas.JPG",
      "/images/procreate/samurai.JPG",
    ],
  },
  {
    id: 27,
    title: "Flash Tattoos",
    category: "digital",
    type: "Digital Art",
    image: "/images/flash-tattoos/portada.png",
    description: "Diseños creados para flash tattoos.",
    size: "normal",
    cardType: "slider",
    images: [
      "/images/flash-tattoos/portada.png",
      "/images/flash-tattoos/illustraciones-varias1.png",
      "/images/flash-tattoos/illustraciones-varias2.png",
    ],
  },
  {
    id: 28,
    title: "Anime Fan Art",
    category: "digital",
    type: "Digital Art",
    image: "/images/anime.PNG",
    description: "Ilustración de personaje anime con estilo digital vibrante.",
    size: "tall",
    cardType: "expander",
  },
  {
    id: 29,
    title: "Geométrico",
    category: "digital",
    type: "Digital Art",
    image: "/images/geometrico.JPG",
    description: "Composición geométrica abstracta con formas y patrones precisos.",
    size: "normal",
    cardType: "expander",
  },
  // ============ SLIDER CARDS (Tattoos) ============
  {
    id: 13,
    title: "Acuarela",
    category: "tattoos",
    type: "Watercolor",
    image: "/images/tattoos/acuarela/portada.jpg",
    description: "Tatuajes estilo acuarela con colores fluidos y efectos de pintura que simulan el arte tradicional.",
    size: "tall",
    cardType: "slider",
    images: [
      "/images/tattoos/acuarela/portada.jpg",
      "/images/tattoos/acuarela/20240929_163147.jpg",
    ],
  },
  {
    id: 14,
    title: "Anime",
    category: "tattoos",
    type: "Anime Style",
    image: "/images/tattoos/anime/portada.jpg",
    description: "Tatuajes inspirados en el estilo anime y manga japonés, con personajes y escenas de series favoritas.",
    size: "tall",
    cardType: "slider",
    images: [
      "/images/tattoos/anime/portada.jpg",
      "/images/tattoos/anime/20240127_192454.jpg",
      "/images/tattoos/anime/20250111_144822.jpg",
      "/images/tattoos/anime/Gemini_Generated_Image_iwfmfliwfmfliwfm.png",
      "/images/tattoos/anime/IMG_20211215_215305572_HDR.jpg",
      "/images/tattoos/anime/IMG_20211220_181339245.jpg",
    ],
  },
  {
    id: 15,
    title: "Blackwork",
    category: "tattoos",
    type: "Black Ink",
    image: "/images/tattoos/blackwork/portada.jpg",
    description: "Tatuajes en tinta negra sólida con diseños bold, patrones geométricos y alto contraste.",
    size: "tall",
    cardType: "slider",
    images: [
      "/images/tattoos/blackwork/portada.jpg",
      "/images/tattoos/blackwork/20231230_022023.jpg",
      "/images/tattoos/blackwork/20240106_131148.jpg",
      "/images/tattoos/blackwork/20250308_141727.jpg",
      "/images/tattoos/blackwork/20250827_211602.jpg",
      "/images/tattoos/blackwork/IMG_0754.jpg",
    ],
  },
  {
    id: 16,
    title: "Color",
    category: "tattoos",
    type: "Full Color",
    image: "/images/tattoos/color/portada.jpg",
    description: "Tatuajes a todo color con paletas vibrantes y saturadas que dan vida a cualquier diseño.",
    size: "tall",
    cardType: "slider",
    images: [
      "/images/tattoos/color/portada.jpg",
      "/images/tattoos/color/20250201_192221.jpg",
      "/images/tattoos/color/20250815_181741.jpg",
      "/images/tattoos/color/IMG_20220105_175759657.jpg",
    ],
  },
  {
    id: 17,
    title: "Puntillismo",
    category: "tattoos",
    type: "Dotwork",
    image: "/images/tattoos/puntillismo/portada.jpg",
    description: "Técnica de puntillismo que crea imágenes y sombras utilizando miles de pequeños puntos.",
    size: "tall",
    cardType: "slider",
    images: [
      "/images/tattoos/puntillismo/portada.jpg",
      "/images/tattoos/puntillismo/20250205_224747.jpg",
      "/images/tattoos/puntillismo/20250726_155455.jpg",
    ],
  },
  {
    id: 18,
    title: "Varios",
    category: "tattoos",
    type: "Mixed Styles",
    image: "/images/tattoos/varios/portada.JPG",
    description: "Colección de trabajos diversos que combinan diferentes técnicas y estilos únicos.",
    size: "tall",
    cardType: "slider",
    images: [
      "/images/tattoos/varios/portada.JPG",
      "/images/tattoos/varios/20231223_180947.jpg",
      "/images/tattoos/varios/20250426_124030.jpg",
    ],
  },
  // ============ VIDEO CARDS ============
  {
    id: 30,
    title: "Video para TikTok",
    category: "videos",
    type: "Social Media",
    image: "https://img.youtube.com/vi/lO-05i7ye2s/maxresdefault.jpg",
    description: "Video editado con Premiere Pro para un proyecto de la universidad Da Vinci.",
    size: "tall",
    cardType: "video",
    youtubeId: "lO-05i7ye2s",
  },
  {
    id: 31,
    title: "Instagram Stories",
    category: "videos",
    type: "Social Media",
    image: "https://img.youtube.com/vi/_Po89Cb6_N0/maxresdefault.jpg",
    description: "Video diseñado para historias de Instagram, editado con After Effects.",
    size: "tall",
    cardType: "video",
    youtubeId: "_Po89Cb6_N0",
  },
  {
    id: 32,
    title: "Video Vía Pública",
    category: "videos",
    type: "Advertising",
    image: "https://img.youtube.com/vi/ohnjv39kp-Q/maxresdefault.jpg",
    description: "Video pensado para un mockup de vía pública, editado con After Effects.",
    size: "wide",
    cardType: "video",
    youtubeId: "ohnjv39kp-Q",
  },
  {
    id: 33,
    title: "No llegues a tu punto de quiebre",
    category: "videos",
    type: "Experimental",
    image: "/videos/portada-clip.png",
    description: "Clip experimental para la materia Guion y Narrativa, concientizando sobre el estrés laboral. Editado con Premiere Pro.",
    size: "wide",
    cardType: "video",
    youtubeId: "hQLif2a9h18",
  },
  {
    id: 34,
    title: "Portfolio de Video",
    category: "videos",
    type: "Showreel",
    image: "https://img.youtube.com/vi/rBCkVrD6Das/maxresdefault.jpg",
    description: "Video realizado para el final de la materia Edición. Integra todos los proyectos del cuatrimestre utilizando principalmente After Effects.",
    size: "wide",
    cardType: "video",
    youtubeId: "rBCkVrD6Das",
  },
]

// ============ TIENDA - PRODUCTOS SEPARADOS ============
const storeProducts: Work[] = [
  {
    id: 35,
    title: "Bolsas de Tela",
    category: "tienda",
    type: "Accesorios",
    image: "/images/tienda/bolsas/bolsa-1.jpg",
    description: "Bolsa de tela estampada con diseños de Marandina.",
    size: "wide",
    cardType: "store",
    images: [
      "/images/tienda/bolsas/bolsa-1.jpg",
      "/images/tienda/bolsas/bolsa-2.jpg",
      "/images/tienda/bolsas/bolsa-3.jpg",
      "/images/tienda/bolsas/bolsa-4.jpg",
      "/images/tienda/bolsas/bolsa-5.jpg",
      "/images/tienda/bolsas/bolsa-6.jpg",
      "/images/tienda/bolsas/bolsa-7.jpg",
    ],
    price: 8000,
    dimensions: "35x40 cm",
    available: true,
  },
  {
    id: 36,
    title: "Cuarzos",
    category: "tienda",
    type: "Cuadro",
    image: "/images/tienda/cuadros/cuarzos.jpg",
    description: "Cuadro pintado a mano con acrílico, diseño único.",
    size: "tall",
    cardType: "store",
    price: 18000,
    dimensions: "22x27 cm",
    available: true,
  },
  {
    id: 37,
    title: "Cactus",
    category: "tienda",
    type: "Cuadro",
    image: "/images/tienda/cuadros/cactus.jpg",
    description: "Cuadro pintado a mano con acrílico, diseño único.",
    size: "normal",
    cardType: "store",
    price: 13000,
    dimensions: "15x15 cm",
    available: true,
  },
  {
    id: 38,
    title: "Corazón Psicodélico",
    category: "tienda",
    type: "Cuadro",
    image: "/images/tienda/cuadros/corazon-psicodelico.jpg",
    description: "Cuadro pintado a mano con acrílico, diseño único.",
    size: "normal",
    cardType: "store",
    price: 13000,
    dimensions: "15x15 cm",
    available: true,
  },
  {
    id: 39,
    title: "Mandarinas",
    category: "tienda",
    type: "Cuadro",
    image: "/images/tienda/cuadros/mandarinas.jpg",
    description: "Cuadro pintado a mano con acrílico, diseño único.",
    size: "normal",
    cardType: "store",
    price: 13000,
    dimensions: "15x15 cm",
    available: true,
  },
  {
    id: 40,
    title: "Ojos",
    category: "tienda",
    type: "Cuadro",
    image: "/images/tienda/cuadros/ojos.jpg",
    description: "Cuadro pintado a mano con acrílico, diseño único.",
    size: "normal",
    cardType: "store",
    price: 13000,
    dimensions: "15x15 cm",
    available: true,
  },
  {
    id: 41,
    title: "Palmeras",
    category: "tienda",
    type: "Cuadro",
    image: "/images/tienda/cuadros/palmeras.jpg",
    description: "Cuadro pintado a mano con acrílico, diseño único.",
    size: "normal",
    cardType: "store",
    price: 13000,
    dimensions: "15x15 cm",
    available: true,
  },
]

const categories = [
  { id: "diseno", label: "Diseño" },
  { id: "paintings", label: "Paintings" },
  { id: "digital", label: "Digital" },
  { id: "tattoos", label: "Tattoos" },
  { id: "videos", label: "Videos" },
]

// Skills/herramientas
const skills = [
  { name: "Figma", icon: "/images/skills/figma.svg" },
  { name: "Illustrator", icon: "/images/skills/illustrator.svg" },
  { name: "Photoshop", icon: "/images/skills/photoshop.svg" },
  { name: "After Effects", icon: "/images/skills/aftereffects.svg" },
  { name: "Premiere Pro", icon: "/images/skills/premiere.svg" },
  { name: "Canva", icon: "/images/skills/canva.svg" },
  { name: "Procreate", icon: "/images/skills/procreate.svg" },
]

// Modal con slider de imágenes y zoom
function SliderModal({ work, onClose }: { work: Work; onClose: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)
  const images = work.images || [work.image]

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (zoomedImage) {
          setZoomedImage(null)
        } else {
          onClose()
        }
      }
      if (!zoomedImage) {
        if (e.key === 'ArrowRight') setCurrentIndex((prev) => (prev + 1) % images.length)
        if (e.key === 'ArrowLeft') setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose, images.length, zoomedImage])

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <div
      className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
      style={{ animationDuration: '0.3s' }}
    >
      {/* Zoom overlay */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center cursor-zoom-out p-4"
          onClick={() => setZoomedImage(null)}
        >
          <Image
            src={zoomedImage}
            alt="Zoom"
            fill
            className="object-contain"
          />
          <button
            onClick={() => setZoomedImage(null)}
            className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-primary transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Botón cerrar */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-primary transition-all"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Título */}
      <div className="absolute top-6 left-6 z-10">
        <h2
          className="text-2xl md:text-3xl font-bold text-foreground"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {work.title}
        </h2>
        <p className="text-sm text-muted mt-1">Click en una imagen para hacer zoom</p>
      </div>

      {/* Mobile: Slider */}
      <div className="md:hidden w-full h-full flex items-center justify-center">
        {images.length > 1 && (
          <button
            onClick={prevSlide}
            className="absolute left-4 z-10 w-10 h-10 rounded-full bg-surface/80 border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-primary transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        <div className="w-full h-full flex items-center justify-center p-16">
          <div className="relative w-full h-full max-h-[70vh]">
            {images.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-500 cursor-zoom-in ${
                  index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
                onClick={() => setZoomedImage(img)}
              >
                <Image
                  src={img}
                  alt={`${work.title} - ${index + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {images.length > 1 && (
          <button
            onClick={nextSlide}
            className="absolute right-4 z-10 w-10 h-10 rounded-full bg-surface/80 border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-primary transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {images.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-primary w-8" : "bg-muted hover:bg-foreground"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop: Grid de imágenes con zoom */}
      <div className="hidden md:flex w-full h-full items-center justify-center p-24 gap-6 flex-wrap overflow-y-auto">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative h-[60vh] w-auto cursor-zoom-in hover:scale-[1.02] transition-transform"
            style={{ minWidth: '250px', maxWidth: '400px', flex: '1 1 300px' }}
            onClick={() => setZoomedImage(img)}
          >
            <Image
              src={img}
              alt={`${work.title} - ${index + 1}`}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// Modal de pantalla completa para trabajos de diseño
function FullscreenModal({ work, onClose }: { work: Work; onClose: () => void }) {
  useEffect(() => {
    // Bloquear scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  // Cerrar con Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm animate-fade-in-up"
      style={{ animationDuration: '0.3s' }}
    >
      {/* Botón cerrar */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-primary transition-all"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Contenido */}
      <div className="h-full overflow-y-auto">
        <div className="min-h-full flex flex-col md:flex-row">
          {/* Imagen - lado izquierdo */}
          <div className="md:w-1/2 lg:w-3/5 h-[50vh] md:h-screen md:sticky md:top-0 bg-surface flex items-center justify-center p-8">
            <div className="relative w-full h-full max-w-2xl">
              <Image
                src={work.image}
                alt={work.title}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Info - lado derecho */}
          <div className="md:w-1/2 lg:w-2/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <span className="inline-block px-4 py-2 mb-6 text-xs uppercase tracking-wider bg-primary/20 text-primary rounded-full w-fit">
              {work.type}
            </span>

            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {work.title}
            </h2>

            <p className="text-lg text-muted leading-relaxed mb-8">
              {work.description}
            </p>

            {work.link && (
              <a
                href={work.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors w-fit"
              >
                Ver proyecto completo
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Modal para videos
function VideoModal({ work, onClose }: { work: Work; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm animate-fade-in-up flex flex-col"
      style={{ animationDuration: '0.3s' }}
    >
      {/* Botón cerrar */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-primary transition-all"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Contenido */}
      <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
        {/* Video - lado izquierdo */}
        <div className="md:w-2/3 h-[50vh] md:h-full bg-black flex items-center justify-center p-4 md:p-8">
          {work.youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${work.youtubeId}?autoplay=1&rel=0`}
              title={work.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full max-w-4xl rounded-lg"
              style={{ aspectRatio: '16/9', maxHeight: '80vh' }}
            />
          ) : (
            <video
              src={work.video}
              controls
              autoPlay
              className="max-w-full max-h-full rounded-lg"
              style={{ maxHeight: '80vh' }}
            >
              Tu navegador no soporta el tag de video.
            </video>
          )}
        </div>

        {/* Info - lado derecho */}
        <div className="md:w-1/3 p-6 md:p-10 flex flex-col justify-center bg-surface/50 overflow-y-auto">
          <span className="inline-block px-4 py-2 mb-4 text-xs uppercase tracking-wider bg-accent/20 text-accent rounded-full w-fit">
            {work.type}
          </span>

          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {work.title}
          </h2>

          <p className="text-base text-muted leading-relaxed">
            {work.description}
          </p>
        </div>
      </div>
    </div>
  )
}

// Modal para tienda
function StoreModal({ work, onClose }: { work: Work; onClose: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const images = work.images || [work.image]

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (images.length > 1) {
        if (e.key === 'ArrowRight') setCurrentIndex((prev) => (prev + 1) % images.length)
        if (e.key === 'ArrowLeft') setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose, images.length])

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(price)
  }

  const whatsappLink = `https://wa.me/5491134249079?text=Hola! Me interesa ${work.title}`

  return (
    <div
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm animate-fade-in-up"
      style={{ animationDuration: '0.3s' }}
    >
      {/* Botón cerrar */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-primary transition-all"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Contenido */}
      <div className="h-full overflow-y-auto">
        <div className="min-h-full flex flex-col md:flex-row">
          {/* Imagen/Slider - lado izquierdo */}
          <div className="md:w-1/2 lg:w-3/5 h-[50vh] md:h-screen md:sticky md:top-0 bg-surface flex items-center justify-center p-8 relative">
            {images.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 z-10 w-10 h-10 rounded-full bg-background/80 border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-primary transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 z-10 w-10 h-10 rounded-full bg-background/80 border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-primary transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            <div className="relative w-full h-full max-w-2xl">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-500 ${
                    index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${work.title} - ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>

            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? "bg-primary w-8" : "bg-muted hover:bg-foreground"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Info - lado derecho */}
          <div className="md:w-1/2 lg:w-2/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <span className="inline-block px-4 py-2 mb-4 text-xs uppercase tracking-wider bg-primary/20 text-primary rounded-full w-fit">
              {work.type}
            </span>

            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {work.title}
            </h2>

            {/* Precio */}
            {work.price && (
              <p className="text-3xl md:text-4xl font-bold text-secondary mb-4">
                {formatPrice(work.price)}
              </p>
            )}

            {/* Medidas */}
            {work.dimensions && (
              <p className="text-muted mb-2">
                <span className="font-medium text-foreground">Medidas:</span> {work.dimensions}
              </p>
            )}

            {/* Disponibilidad */}
            <p className="mb-6">
              {work.available ? (
                <span className="text-green-500 font-medium">✓ Disponible</span>
              ) : (
                <span className="text-red-500 font-medium">✗ No disponible</span>
              )}
            </p>

            <p className="text-muted leading-relaxed mb-8">
              {work.description}
            </p>

            {/* Botón WhatsApp */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium transition-colors w-fit"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Contactame
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MarandinaPortfolio() {
  const [activeFilter, setActiveFilter] = useState("diseno")
  const [isVisible, setIsVisible] = useState(false)
  const [selectedWork, setSelectedWork] = useState<Work | null>(null)
  const [selectedStoreProduct, setSelectedStoreProduct] = useState<Work | null>(null)
  const [trailColor, setTrailColor] = useState(categoryColors.diseno)
  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Cambiar color cuando cambia el filtro
  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId)
    setTrailColor(categoryColors[filterId as keyof typeof categoryColors] || categoryColors.diseno)
  }

  const filteredWorks = activeFilter === "todos"
    ? allWorks
    : allWorks.filter(work => work.category === activeFilter)

  const handleCardClick = (work: Work) => {
    // Cambiar color de la estela según la categoría del trabajo
    setTrailColor(categoryColors[work.category as keyof typeof categoryColors] || categoryColors.diseno)

    // Abrir modal para cards tipo "expander", "slider", "video" o "store"
    if (work.cardType === "expander" || work.cardType === "slider" || work.cardType === "video" || work.cardType === "store") {
      setSelectedWork(work)
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Manchas de pintura / glow de fondo */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Mancha violeta arriba izquierda */}
        <div
          className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(140, 92, 242, 0.35) 0%, transparent 60%)",
            filter: "blur(40px)",
          }}
        />
        {/* Mancha naranja arriba derecha */}
        <div
          className="absolute top-40 -right-10 w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(242, 131, 34, 0.3) 0%, transparent 60%)",
            filter: "blur(50px)",
          }}
        />
        {/* Mancha dorada centro izquierda */}
        <div
          className="absolute top-[60%] -left-10 w-[450px] h-[450px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(242, 179, 61, 0.25) 0%, transparent 60%)",
            filter: "blur(45px)",
          }}
        />
        {/* Mancha violeta abajo derecha */}
        <div
          className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(140, 92, 242, 0.3) 0%, transparent 60%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      {/* Estela del mouse */}
      <MouseTrail color={trailColor} />

      {/* Modal de pantalla completa */}
      {selectedWork && selectedWork.cardType === "slider" && (
        <SliderModal work={selectedWork} onClose={() => setSelectedWork(null)} />
      )}
      {selectedWork && selectedWork.cardType === "expander" && (
        <FullscreenModal work={selectedWork} onClose={() => setSelectedWork(null)} />
      )}
      {selectedWork && selectedWork.cardType === "video" && (
        <VideoModal work={selectedWork} onClose={() => setSelectedWork(null)} />
      )}
      {selectedWork && selectedWork.cardType === "store" && (
        <StoreModal work={selectedWork} onClose={() => setSelectedWork(null)} />
      )}
      {selectedStoreProduct && (
        <StoreModal work={selectedStoreProduct} onClose={() => setSelectedStoreProduct(null)} />
      )}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-2 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="#inicio" className="flex items-center group">
            <Image
              src="/images/marandina-logo.png"
              alt="Marandina"
              width={200}
              height={56}
              className="h-12 md:h-14 w-auto object-contain"
            />
          </a>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

        </div>
      </header>

      {/* Header Image */}
      <div className="w-full relative mt-[64px] md:mt-[72px] flex justify-center bg-background">
        <Image
          src="/images/header.jpg"
          alt="Header"
          width={1200}
          height={400}
          className="w-full max-w-5xl h-auto object-contain"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      {/* Hero Section con logo flotante y info completa */}
      <section id="inicio" className="hero-gradient animate-gradient min-h-[80vh] flex items-center relative px-6 md:px-12 py-16">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            {/* Left: Logo + Name + Description */}
            <div className="order-2 md:order-1">
              {/* Logo flotante */}
              <div
                className="mb-8 animate-float opacity-0 animate-fade-in-up"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="inline-flex items-center justify-center w-28 h-28 md:w-32 md:h-32 rounded-full bg-primary/20 animate-pulse-glow">
                  <Image
                    src="/images/marandina-logo-float.png"
                    alt="Marandina Logo"
                    width={100}
                    height={100}
                    className="w-20 h-20 md:w-24 md:h-24 object-contain"
                  />
                </div>
              </div>

              {/* Nombre */}
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] mb-4 opacity-0 animate-fade-in-up"
                style={{ animationDelay: "0.2s", fontFamily: "var(--font-playfair)" }}
              >
                <span className="text-secondary">Natalia</span>{" "}
                <span className="text-foreground">Espain</span>
              </h1>

              {/* Subtítulo */}
              <p
                className="text-xs uppercase tracking-[0.3em] text-primary mb-8 opacity-0 animate-fade-in-up font-medium"
                style={{ animationDelay: "0.3s" }}
              >
                Artista Multimedia
              </p>

              {/* Descripción completa */}
              <p
                className="text-foreground leading-relaxed mb-4 opacity-0 animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                Soy una artista multidisciplinaria apasionada que cree en el poder del <span className="text-secondary">color</span>,
                la <span className="text-secondary">forma</span> y la <span className="text-secondary">emoción</span> para transformar espacios y almas. Actualmente soy estudiante
                de la <span className="text-secondary">Escuela Da Vinci</span> en la carrera de Diseño Multimedia, donde perfecciono mis
                habilidades técnicas y creativas.
              </p>

              <p
                className="text-foreground leading-relaxed mb-8 opacity-0 animate-fade-in-up"
                style={{ animationDelay: "0.5s" }}
              >
                Mi trayectoria abarca <span className="text-secondary">pinturas tradicionales</span>, <span className="text-secondary">arte digital</span> de vanguardia y <span className="text-secondary">diseños
                de tatuajes</span> significativos. Cada medio ofrece un lenguaje único para expresar las
                historias vibrantes que viven dentro de todos nosotros.
              </p>

              {/* Social links */}
              <div className="relative z-10">
                <p
                  className="text-xs uppercase tracking-[0.2em] text-muted mb-4 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: "0.6s" }}
                >
                  Conectemos
                </p>
                <div
                  className="flex gap-3 opacity-0 animate-fade-in-up relative z-10"
                  style={{ animationDelay: "0.7s" }}
                >
                  <a href="mailto:nataliaespain97@gmail.com" className="social-btn relative z-20" aria-label="Email" onClick={(e) => e.stopPropagation()}>
                    <Mail className="w-5 h-5" />
                  </a>
                  <a href="https://www.instagram.com/marandina.tt/" target="_blank" rel="noopener noreferrer" className="social-btn relative z-20" aria-label="Instagram" onClick={(e) => e.stopPropagation()}>
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://www.behance.net/nataliaespain" target="_blank" rel="noopener noreferrer" className="social-btn relative z-20" aria-label="Behance" onClick={(e) => e.stopPropagation()}>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/in/natalia-espain-0b1a5817a/" target="_blank" rel="noopener noreferrer" className="social-btn relative z-20" aria-label="LinkedIn" onClick={(e) => e.stopPropagation()}>
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Photo with glow effect */}
            <div className="order-1 md:order-2 flex justify-center md:justify-end">
              <div
                className="photo-glow rounded-2xl overflow-hidden opacity-0 animate-fade-in-up"
                style={{ animationDelay: "0.3s" }}
              >
                <Image
                  src="/images/natalia-photo.jpg"
                  alt="Natalia Espain"
                  width={400}
                  height={500}
                  className="w-64 md:w-72 lg:w-80 h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="trabajo" className="py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="mb-10 text-center">
            <h2
              className="text-4xl md:text-5xl font-bold text-foreground mb-3"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Mis <span className="text-primary">Proyectos</span>
            </h2>
            <p className="text-muted max-w-xl mx-auto">
              Una colección de mis proyectos de diseño, ilustración y arte digital
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleFilterChange(cat.id)}
                className={`filter-pill ${activeFilter === cat.id ? "active" : ""}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="masonry-grid">
            {filteredWorks.map((work, idx) => (
              <div
                key={work.id}
                className="masonry-item opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <div
                  className="gallery-card group cursor-pointer"
                  onClick={() => handleCardClick(work)}
                >
                  <div
                    className={`relative overflow-hidden ${
                      work.size === "tall" ? "aspect-[3/4]" :
                      work.size === "wide" ? "aspect-[4/3]" :
                      work.size === "full" ? "aspect-[2/3]" :
                      "aspect-square"
                    }`}
                  >
                    {work.cardType === "video" && work.video && !work.youtubeId ? (
                      <video
                        src={work.video}
                        muted
                        loop
                        playsInline
                        className="gallery-card-image object-cover w-full h-full absolute inset-0"
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => {
                          e.currentTarget.pause()
                          e.currentTarget.currentTime = 0
                        }}
                      />
                    ) : (
                      <Image
                        src={work.image}
                        alt={work.title}
                        fill
                        className="gallery-card-image object-cover"
                        unoptimized={work.image.startsWith('https://')}
                      />
                    )}

                    {/* Hover overlay */}
                    <div className="gallery-card-overlay">
                      <span className="inline-block px-3 py-1 mb-2 text-[10px] uppercase tracking-wider bg-primary/80 text-primary-foreground rounded-full w-fit">
                        {work.type}
                      </span>

                      <h3
                        className="text-xl font-bold text-white mb-2"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {work.title}
                      </h3>

                      <p className="text-white/70 text-sm line-clamp-2 mb-2">
                        {work.description}
                      </p>

                      {/* Mostrar precio en cards de tienda */}
                      {work.cardType === "store" && work.price && (
                        <p className="text-secondary font-bold text-lg mb-2">
                          ${work.price.toLocaleString('es-AR')}
                        </p>
                      )}

                      {/* Solo mostrar link en cards que NO son expander, slider, video ni store */}
                      {work.cardType !== "expander" && work.cardType !== "slider" && work.cardType !== "video" && work.cardType !== "store" && work.link && (
                        <a
                          href={work.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:text-accent transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Ver en Behance
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}

                      {/* Indicador de click para expander, slider, video y store cards */}
                      {(work.cardType === "expander" || work.cardType === "slider" || work.cardType === "video" || work.cardType === "store") && (
                        <span className="text-primary text-sm font-medium">
                          {work.cardType === "video" ? "Click para reproducir" : work.cardType === "store" ? "Click para comprar" : "Click para ver más"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 md:py-24 px-6 md:px-12 bg-surface/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Herramientas que <span className="text-primary">domino</span>
          </h2>
          <p className="text-muted mb-12 max-w-xl mx-auto">
            Software y aplicaciones que utilizo en mi día a día para crear
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {/* Figma */}
            <div className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-background/50 border border-border hover:border-primary/50 transition-all hover:scale-105">
              <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#1abcfe] via-[#0acf83] to-[#a259ff]">
                <svg className="w-7 h-7 md:w-8 md:h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5zM12 2h3.5a3.5 3.5 0 1 1 0 7H12V2zm0 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0zm-7 0A3.5 3.5 0 0 1 8.5 11H12v3.5a3.5 3.5 0 1 1-7 0zM5 12a3.5 3.5 0 0 0 3.5 3.5H12V9H8.5A3.5 3.5 0 0 0 5 12z"/>
                </svg>
              </div>
              <span className="text-sm text-muted group-hover:text-foreground transition-colors">Figma</span>
            </div>

            {/* Illustrator */}
            <div className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-background/50 border border-border hover:border-primary/50 transition-all hover:scale-105">
              <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-lg bg-[#330000]">
                <span className="text-[#ff9a00] font-bold text-lg md:text-xl">Ai</span>
              </div>
              <span className="text-sm text-muted group-hover:text-foreground transition-colors">Illustrator</span>
            </div>

            {/* Photoshop */}
            <div className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-background/50 border border-border hover:border-primary/50 transition-all hover:scale-105">
              <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-lg bg-[#001e36]">
                <span className="text-[#31a8ff] font-bold text-lg md:text-xl">Ps</span>
              </div>
              <span className="text-sm text-muted group-hover:text-foreground transition-colors">Photoshop</span>
            </div>

            {/* After Effects */}
            <div className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-background/50 border border-border hover:border-primary/50 transition-all hover:scale-105">
              <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-lg bg-[#00005b]">
                <span className="text-[#9999ff] font-bold text-lg md:text-xl">Ae</span>
              </div>
              <span className="text-sm text-muted group-hover:text-foreground transition-colors">After Effects</span>
            </div>

            {/* Premiere */}
            <div className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-background/50 border border-border hover:border-primary/50 transition-all hover:scale-105">
              <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-lg bg-[#00005b]">
                <span className="text-[#9999ff] font-bold text-lg md:text-xl">Pr</span>
              </div>
              <span className="text-sm text-muted group-hover:text-foreground transition-colors">Premiere Pro</span>
            </div>

            {/* Canva */}
            <div className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-background/50 border border-border hover:border-primary/50 transition-all hover:scale-105">
              <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#00c4cc] to-[#7d2ae8]">
                <span className="text-white font-bold text-lg md:text-xl">C</span>
              </div>
              <span className="text-sm text-muted group-hover:text-foreground transition-colors">Canva</span>
            </div>

            {/* Procreate */}
            <div className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-background/50 border border-border hover:border-primary/50 transition-all hover:scale-105">
              <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-lg bg-black">
                <span className="text-white font-bold text-lg md:text-xl">P</span>
              </div>
              <span className="text-sm text-muted group-hover:text-foreground transition-colors">Procreate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tienda Section */}
      <section id="tienda" className="py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="mb-10 text-center">
            <h2
              className="text-4xl md:text-5xl font-bold text-foreground mb-3"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              <span className="text-primary">Tienda</span>
            </h2>
            <p className="text-muted max-w-xl mx-auto">
              Cuadros y accesorios pintados a mano, piezas únicas para tu hogar
            </p>
          </div>

          {/* Store Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {storeProducts.map((product, idx) => (
              <div
                key={product.id}
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <div
                  className="gallery-card group cursor-pointer"
                  onClick={() => {
                    setTrailColor(categoryColors.tienda)
                    setSelectedStoreProduct(product)
                  }}
                >
                  <div className="relative overflow-hidden aspect-square">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="gallery-card-image object-cover"
                    />

                    {/* Hover overlay */}
                    <div className="gallery-card-overlay">
                      <span className="inline-block px-3 py-1 mb-2 text-[10px] uppercase tracking-wider bg-primary/80 text-primary-foreground rounded-full w-fit">
                        {product.type}
                      </span>

                      <h3
                        className="text-xl font-bold text-white mb-2"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {product.title}
                      </h3>

                      {/* Precio */}
                      {product.price && (
                        <p className="text-secondary font-bold text-xl mb-2">
                          ${product.price.toLocaleString('es-AR')}
                        </p>
                      )}

                      {/* Medidas */}
                      {product.dimensions && (
                        <p className="text-white/70 text-sm mb-2">
                          {product.dimensions}
                        </p>
                      )}

                      <span className="text-primary text-sm font-medium">
                        Click para ver más
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="py-6 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright - izquierda */}
          <p className="text-xs text-muted order-3 md:order-1">
            &copy; 2026 Todos los derechos reservados
          </p>

          {/* Logo - centro */}
          <Image
            src="/images/marandina-logo.png"
            alt="Marandina"
            width={220}
            height={60}
            className="h-16 w-auto object-contain order-1 md:order-2"
          />

          {/* Redes sociales - derecha */}
          <div className="flex gap-3 order-2 md:order-3 relative z-10">
            <a href="mailto:nataliaespain97@gmail.com" className="social-btn !w-9 !h-9 relative z-20" aria-label="Email" onClick={(e) => e.stopPropagation()}>
              <Mail className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/marandina.tt/" target="_blank" rel="noopener noreferrer" className="social-btn !w-9 !h-9 relative z-20" aria-label="Instagram" onClick={(e) => e.stopPropagation()}>
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://www.behance.net/nataliaespain" target="_blank" rel="noopener noreferrer" className="social-btn !w-9 !h-9 relative z-20" aria-label="Behance" onClick={(e) => e.stopPropagation()}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/natalia-espain-0b1a5817a/" target="_blank" rel="noopener noreferrer" className="social-btn !w-9 !h-9 relative z-20" aria-label="LinkedIn" onClick={(e) => e.stopPropagation()}>
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

