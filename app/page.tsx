"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { QRCodeSVG } from "qrcode.react"
import { Mail, Instagram, Linkedin, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react"

const navLinks = [
  { href: "#destacado", label: "DESTACADO" },
  { href: "#trabajo", label: "TRABAJO" },
  { href: "#stack", label: "STACK" },
  { href: "#tienda", label: "TIENDA" },
  { href: "#contacto", label: "CONTACTO" },
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
  cardType?: "expander" | "slider" | "video" | "store" | "scrollable" | "link" | "default"
  images?: string[]
  video?: string
  youtubeId?: string
  coverImage?: string
  qrCode?: string
  price?: number
  dimensions?: string
  available?: boolean
}

const allWorks: Work[] = [
  // ============ EXPANDER CARDS (Diseño Multimedia) ============
  {
    id: 44,
    title: "Identidad Visual DiVino",
    category: "diseno",
    type: "Branding",
    image: "/images/divino-portada.jpg",
    description: "Sistema de marca completo: logotipo, paleta, tipografía y aplicaciones con un lenguaje visual coherente de principio a fin.",
    link: "https://www.behance.net/gallery/242558367/DiVino",
    size: "tall",
    cardType: "expander",
  },
  {
    id: 45,
    title: "Diseño UX/UI",
    category: "diseno",
    type: "UX/UI Design",
    image: "/images/divino-onepage.jpg",
    coverImage: "/images/divino-uxui.png",
    description: "Diseño de interfaz web aplicando la identidad visual de DiVino. One-page que integra tipografía, paleta de colores y elementos gráficos de la marca para una experiencia visual cohesiva.",
    size: "normal",
    cardType: "scrollable",
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
    id: 42,
    title: "Fotomontaje Realista",
    category: "diseno",
    type: "Photomontage",
    image: "/mujer-tattoo.jpg",
    description: "Proyecto para la materia Photoshop. Composición donde la modelo fue integrada digitalmente al fondo, trabajando luces, sombras y color para lograr una fusión realista con el entorno.",
    size: "tall",
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
    id: 1,
    title: "Identidad Corporativa Buka",
    category: "diseno",
    type: "Branding",
    image: "/gym-branding-design.png",
    coverImage: "/images/remera-buka.png",
    description: "Diseño completo de identidad visual para un gimnasio ficticio, incluyendo logo, una one page y expansiones de la marca.",
    link: "https://www.behance.net/gallery/231852521/Identidad-de-marca-BUKA",
    size: "normal",
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
  {
    id: 46,
    title: "Animación de Íconos",
    category: "videos",
    type: "Motion Graphics",
    image: "https://img.youtube.com/vi/OB2oT-Cd0oc/maxresdefault.jpg",
    description: "Proyecto de motion graphics desarrollado en Adobe After Effects como parte de mi formación en Diseño Multimedia en Escuela Da Vinci, aplicando principios de animación, composición visual y narrativa audiovisual.",
    size: "wide",
    cardType: "video",
    youtubeId: "OB2oT-Cd0oc",
  },
  {
    id: 47,
    title: "Animación Motion Graphics",
    category: "videos",
    type: "Motion Graphics",
    image: "https://img.youtube.com/vi/rpNlvvr2sb0/maxresdefault.jpg",
    description: "Proyecto de animación con motion graphics, combinando diseño visual y movimiento para crear una pieza audiovisual dinámica.",
    size: "tall",
    cardType: "video",
    youtubeId: "rpNlvvr2sb0",
  },
  {
    id: 43,
    title: "Portada de Película Animada",
    category: "videos",
    type: "Motion Graphics",
    image: "/videos/nosferatu.mp4",
    description: "Póster cinematográfico creado en Photoshop y animado con la herramienta de línea de tiempo de la misma aplicación, dando vida a una composición estática.",
    size: "tall",
    cardType: "video",
    video: "/videos/nosferatu.mp4",
  },
  {
    id: 48,
    title: "Booster Corporal",
    category: "videos",
    type: "Motion Graphics",
    image: "/videos/video_booster_corporal.mp4",
    description: "Video publicitario para un producto corporal, realizado con motion graphics y generación de video con inteligencia artificial.",
    size: "wide",
    cardType: "video",
    video: "/videos/video_booster_corporal.mp4",
  },
  {
    id: 49,
    title: "Animación 3D en Cinema 4D",
    category: "videos",
    type: "3D Animation",
    image: "https://img.youtube.com/vi/skSJUo4qRPY/maxresdefault.jpg",
    description: "Animación 3D realizada en Cinema 4D.",
    size: "wide",
    cardType: "video",
    youtubeId: "skSJUo4qRPY",
  },
  {
    id: 50,
    title: "Motion Graphics en After Effects",
    category: "videos",
    type: "Motion Graphics",
    image: "https://img.youtube.com/vi/lL8XpviLApY/maxresdefault.jpg",
    description: "Pieza de motion graphics animada en After Effects.",
    size: "wide",
    cardType: "video",
    youtubeId: "lL8XpviLApY",
  },
  {
    id: 51,
    title: "Edit para Canal de Streaming",
    category: "videos",
    type: "Video Editing",
    image: "/images/insta-streaming-edit.png",
    description: "Edit de video para un canal de streaming, realizado en Premiere Pro.",
    link: "https://www.instagram.com/hothouse.ntv/reel/DZioNv8pWvO/",
    size: "tall",
    cardType: "link",
  },
  {
    id: 52,
    title: "Edit para Redes Sociales",
    category: "videos",
    type: "Video Editing",
    image: "/videos/final.mp4",
    description: "Edit para redes sociales, realizado en Premiere Pro utilizando material enviado por el cliente, con recortes hechos por mí.",
    size: "wide",
    cardType: "video",
    video: "/videos/final.mp4",
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

// Skills/herramientas con badge + nivel para los medidores
const skills = [
  { name: "Illustrator", badge: "Ai", level: 95 },
  { name: "Photoshop", badge: "Ps", level: 92 },
  { name: "Figma", badge: "Fi", level: 88 },
  { name: "Procreate", badge: "Pc", level: 90 },
  { name: "After Effects", badge: "Ae", level: 78 },
  { name: "Premiere Pro", badge: "Pr", level: 80 },
  { name: "Canva", badge: "Cv", level: 85 },
]

const tickerItems = [
  "DISEÑO GRÁFICO", "ARTE DIGITAL", "TATUAJES", "BRANDING", "UX/UI",
  "ILUSTRACIÓN", "FOTOMONTAJE", "PINTURA", "MOTION",
]

// Etiqueta del CTA según el tipo de card
function ctaLabel(work: Work) {
  if (work.cardType === "video") return "Reproducir"
  if (work.cardType === "store") return "Comprar"
  if (work.cardType === "link") return "Ver en Instagram"
  if (work.cardType === "slider") return "Ver galería"
  return "Ver proyecto"
}

// Modal con slider de imágenes y zoom
function SliderModal({ work, onClose }: { work: Work; onClose: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)
  const images = work.images || [work.image]

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = 'unset' }
  }, [])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (zoomedImage) setZoomedImage(null)
        else onClose()
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
    <div className="fixed inset-0 z-[100] bg-background flex items-center justify-center">
      {zoomedImage && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center cursor-zoom-out p-4"
          onClick={() => setZoomedImage(null)}
        >
          <Image src={zoomedImage} alt="Zoom" fill className="object-contain" />
          <button
            onClick={() => setZoomedImage(null)}
            className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-primary transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}

      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-primary transition-all"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="absolute top-6 left-6 z-10">
        <h2 className="text-2xl md:text-3xl uppercase text-foreground" style={{ fontFamily: "var(--font-anton)" }}>
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
                <Image src={img} alt={`${work.title} - ${index + 1}`} fill className="object-contain" />
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
            <Image src={img} alt={`${work.title} - ${index + 1}`} fill className="object-contain" />
          </div>
        ))}
      </div>
    </div>
  )
}

// Modal de pantalla completa para trabajos de diseño
function FullscreenModal({ work, onClose }: { work: Work; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = 'unset' }
  }, [])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-primary transition-all"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="h-full overflow-y-auto">
        <div className="min-h-full flex flex-col md:flex-row">
          <div className="md:w-1/2 lg:w-3/5 h-[50vh] md:h-screen md:sticky md:top-0 bg-surface flex items-center justify-center p-8">
            <div className="relative w-full h-full max-w-2xl">
              <Image src={work.image} alt={work.title} fill className="object-contain" />
            </div>
          </div>

          <div className="md:w-1/2 lg:w-2/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <span className="inline-block px-4 py-2 mb-6 text-xs uppercase tracking-[0.2em] bg-primary/20 text-lilac rounded-full w-fit mono">
              {work.type}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl uppercase text-foreground mb-6" style={{ fontFamily: "var(--font-anton)" }}>
              {work.title}
            </h2>
            <p className="text-lg text-muted leading-relaxed mb-8">{work.description}</p>
            {work.link && (
              <a
                href={work.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn primary w-fit"
              >
                Ver proyecto completo <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Modal scrollable (texto arriba, imagen scrolleable abajo)
function ScrollableModal({ work, onClose }: { work: Work; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = 'unset' }
  }, [])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-primary transition-all"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="h-full overflow-y-auto">
        <div className="flex flex-col">
          <div className="p-8 md:p-12 lg:p-16 text-center">
            <span className="inline-block px-4 py-2 mb-4 text-xs uppercase tracking-[0.2em] bg-primary/20 text-lilac rounded-full w-fit mono">
              {work.type}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl uppercase text-foreground mb-4" style={{ fontFamily: "var(--font-anton)" }}>
              {work.title}
            </h2>
            <p className="text-lg text-muted leading-relaxed max-w-2xl mx-auto">{work.description}</p>
          </div>

          <div className="flex-1 bg-surface flex justify-center p-8">
            <div className="w-full max-w-4xl">
              <Image src={work.image} alt={work.title} width={1200} height={1800} className="w-full h-auto object-contain" />
            </div>
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
    return () => { document.body.style.overflow = 'unset' }
  }, [])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm animate-fade-in-up flex flex-col" style={{ animationDuration: '0.3s' }}>
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-primary transition-all"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
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
            <video src={work.video} controls autoPlay className="max-w-full max-h-full rounded-lg" style={{ maxHeight: '80vh' }}>
              Tu navegador no soporta el tag de video.
            </video>
          )}
        </div>

        <div className="md:w-1/3 p-6 md:p-10 flex flex-col justify-center bg-surface/50 overflow-y-auto">
          <span className="inline-block px-4 py-2 mb-4 text-xs uppercase tracking-[0.2em] bg-accent/20 text-accent rounded-full w-fit mono">
            {work.type}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl uppercase text-foreground mb-4" style={{ fontFamily: "var(--font-anton)" }}>
            {work.title}
          </h2>
          <p className="text-base text-muted leading-relaxed">{work.description}</p>
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
    return () => { document.body.style.overflow = 'unset' }
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

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(price)

  const whatsappLink = `https://wa.me/5491134249079?text=Hola! Me interesa ${work.title}`

  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-primary transition-all"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="h-full overflow-y-auto">
        <div className="min-h-full flex flex-col md:flex-row">
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
                  <Image src={img} alt={`${work.title} - ${index + 1}`} fill className="object-contain" />
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

          <div className="md:w-1/2 lg:w-2/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <span className="inline-block px-4 py-2 mb-4 text-xs uppercase tracking-[0.2em] bg-primary/20 text-lilac rounded-full w-fit mono">
              {work.type}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl uppercase text-foreground mb-4" style={{ fontFamily: "var(--font-anton)" }}>
              {work.title}
            </h2>
            {work.price && <p className="text-3xl md:text-4xl font-bold text-secondary mb-4">{formatPrice(work.price)}</p>}
            {work.dimensions && (
              <p className="text-muted mb-2">
                <span className="font-medium text-foreground">Medidas:</span> {work.dimensions}
              </p>
            )}
            <p className="mb-6">
              {work.available ? (
                <span className="text-green-500 font-medium">✓ Disponible</span>
              ) : (
                <span className="text-red-500 font-medium">✗ No disponible</span>
              )}
            </p>
            <p className="text-muted leading-relaxed mb-8">{work.description}</p>
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

// Tarjeta flip para el grid de trabajo
function WorkCard({ work, idx, onOpen }: { work: Work; idx: number; onOpen: (w: Work) => void }) {
  const sizeClass =
    work.size === "wide" ? "wide" : work.size === "full" ? "full" : work.size === "tall" ? "tall" : ""
  const dir = idx % 2 === 0 ? "from-l" : "from-r"
  const cover = work.coverImage || work.image
  const isLocalVideo = work.cardType === "video" && work.video && !work.youtubeId
  const catLabel = categories.find((c) => c.id === work.category)?.label || work.category

  return (
    <div
      className={`card ${sizeClass} reveal ${dir}`}
      tabIndex={0}
      role="button"
      style={{ transitionDelay: `${(idx % 6) * 0.06}s` }}
      onClick={() => onOpen(work)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onOpen(work)
        }
      }}
    >
      <div className="card-inner">
        {/* FRENTE */}
        <div className="face front">
          <span className="no">{String(idx + 1).padStart(2, "0")}</span>
          <span className="hint">⇋</span>
          {isLocalVideo ? (
            <div className="thumb">
              <video
                src={work.video}
                muted
                loop
                playsInline
                onMouseEnter={(e) => e.currentTarget.play()}
                onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0 }}
              />
            </div>
          ) : (
            <div className="thumb" style={{ backgroundImage: `url("${cover}")` }} />
          )}
          <div className="fb">
            <span className="cat">{work.type}</span>
            <h3>{work.title}</h3>
          </div>
        </div>

        {/* DORSO */}
        <div className="face back">
          <div>
            <span className="cat">{String(idx + 1).padStart(2, "0")} · {catLabel}</span>
            <h3>{work.title}</h3>
            {work.description ? <p>{work.description}</p> : <p>Pieza de la serie {work.title}.</p>}
            <div className="tools">
              <i>{work.type}</i>
              <i>{catLabel}</i>
            </div>
          </div>
          <span className="go">{ctaLabel(work)} <b>↗</b></span>
        </div>
      </div>
    </div>
  )
}

// Trazas del circuito (PCB) que entran de los costados y convergen al centro
const INTRO_TRACES = [
  // izquierda — protagonistas horizontales que llegan al borde del gajo
  { d: "M0,350 H400", delay: 0.1, color: "#8C5CF2" },
  { d: "M0,150 H320 V300 H430", delay: 0.0, color: "#7FD2FF" },
  { d: "M0,560 H340 V400 H435", delay: 0.05, color: "#F2B33D" },
  // derecha — protagonistas
  { d: "M1000,350 H600", delay: 0.1, color: "#A87BFF" },
  { d: "M1000,170 H690 V300 H570", delay: 0.03, color: "#7FD2FF" },
  { d: "M1000,540 H660 V400 H565", delay: 0.06, color: "#F28322" },
  // arriba / abajo — apoyo
  { d: "M470,0 V250", delay: 0.14, color: "#8C5CF2" },
  { d: "M700,0 V180 H560 V270", delay: 0.12, color: "#F2B33D" },
  { d: "M540,700 V450", delay: 0.14, color: "#A87BFF" },
  { d: "M300,700 V520 H445 V430", delay: 0.1, color: "#7FD2FF" },
]
const INTRO_NODES = [
  [400, 350], [430, 300], [435, 400], [600, 350], [570, 300],
  [565, 400], [470, 250], [560, 270], [540, 450], [445, 430],
]

function CircuitIntro({ out }: { out: boolean }) {
  return (
    <div className={`intro ${out ? "out" : ""}`}>
      <svg className="intro-circuit" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g>
          {INTRO_TRACES.map((t, i) => (
            <path
              key={i}
              d={t.d}
              pathLength={1}
              className="intro-trace"
              style={{ stroke: t.color, animationDelay: `${t.delay}s`, filter: `drop-shadow(0 0 5px ${t.color})` }}
            />
          ))}
        </g>
        <g>
          {INTRO_NODES.map((n, i) => (
            <rect
              key={i}
              x={n[0] - 5}
              y={n[1] - 5}
              width={10}
              height={10}
              className="intro-node"
              transform={`rotate(45 ${n[0]} ${n[1]})`}
              style={{ animationDelay: `${0.6 + i * 0.05}s` }}
            />
          ))}
        </g>
      </svg>
      <div className="intro-core">
        <span className="intro-glow" />
        <span className="intro-spark" />
        <span className="intro-flash" />
        <span className="intro-flash r2" />
        <img src="/images/gajo.png" className="intro-gajo" alt="Marandina" />
      </div>
      <div className="intro-hud">CONECTANDO <b>▮</b></div>
    </div>
  )
}

export default function MarandinaPortfolio() {
  const [activeFilter, setActiveFilter] = useState("diseno")
  const [selectedWork, setSelectedWork] = useState<Work | null>(null)
  const [selectedStoreProduct, setSelectedStoreProduct] = useState<Work | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [introOut, setIntroOut] = useState(false)
  const sbarRef = useRef<HTMLDivElement>(null)
  const shudRef = useRef<HTMLSpanElement>(null)

  const filteredWorks = allWorks.filter((work) => work.category === activeFilter)

  const handleCardClick = (work: Work) => {
    if (work.cardType === "link" && work.link) {
      window.open(work.link, "_blank", "noopener,noreferrer")
      return
    }
    if (["expander", "slider", "video", "store", "scrollable"].includes(work.cardType || "")) {
      setSelectedWork(work)
    }
  }

  // Intro de circuito: enciende el gajo y se desvanece
  useEffect(() => {
    document.body.style.overflow = "hidden"
    const t1 = setTimeout(() => setIntroOut(true), 2900)
    const t2 = setTimeout(() => {
      setShowIntro(false)
      document.body.style.overflow = ""
    }, 3700)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      document.body.style.overflow = ""
    }
  }, [])

  // Reveal al entrar en pantalla (re-observa al cambiar de filtro)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in")
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    )
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [activeFilter])

  // Parallax + scroll bar + HUD + auras (una vez)
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const parY = Array.from(document.querySelectorAll<HTMLElement>("[data-par]"))
    const parX = Array.from(document.querySelectorAll<HTMLElement>("[data-parx]"))
    const stage = document.getElementById("stage")
    const bgfx = document.getElementById("bgfx")
    const auras = bgfx ? (Array.from(bgfx.children) as HTMLElement[]) : []
    let mx = 0, my = 0, ticking = false

    const frame = () => {
      ticking = false
      const vh = window.innerHeight, mid = vh / 2
      const h = document.documentElement
      const max = h.scrollHeight - vh
      const p = max > 0 ? Math.min(1, h.scrollTop / max) : 0
      if (!reduce) {
        if (auras[0]) auras[0].style.transform = `translate3d(${p * 8}vw, ${p * -30}vh, 0)`
        if (auras[1]) auras[1].style.transform = `translate3d(${p * -10}vw, ${p * 22}vh, 0)`
        if (auras[2]) auras[2].style.transform = `translate3d(${p * 14}vw, ${p * -18}vh, 0)`
        if (bgfx) bgfx.style.filter = `hue-rotate(${(p * 46).toFixed(1)}deg)`
        parY.forEach((el) => {
          const r = el.getBoundingClientRect(), off = r.top + r.height / 2 - mid
          const sp = parseFloat(el.dataset.par || "0"), base = el.dataset.base || ""
          el.style.transform = `translateY(${(off * sp).toFixed(1)}px) ${base}`
        })
        parX.forEach((el) => {
          const r = el.getBoundingClientRect(), off = r.top + r.height / 2 - mid
          const sp = parseFloat(el.dataset.parx || "0")
          el.style.transform = `translateX(${(off * sp).toFixed(1)}px)`
        })
        if (stage) stage.style.transform = `translate(${mx * 22}px,${my * 22}px) rotate(${mx * 4}deg)`
      }
      if (sbarRef.current) sbarRef.current.style.width = p * 100 + "%"
      if (shudRef.current) shudRef.current.textContent = String(Math.round(p * 100)).padStart(3, "0") + "%"
    }
    const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame) } }
    window.addEventListener("scroll", req, { passive: true })
    window.addEventListener("resize", req)
    const onMove = (e: MouseEvent) => {
      mx = e.clientX / window.innerWidth - 0.5
      my = e.clientY / window.innerHeight - 0.5
      req()
    }
    if (!reduce) window.addEventListener("mousemove", onMove)
    frame()
    return () => {
      window.removeEventListener("scroll", req)
      window.removeEventListener("resize", req)
      window.removeEventListener("mousemove", onMove)
    }
  }, [])

  return (
    <>
      {/* Intro de circuito */}
      {showIntro && <CircuitIntro out={introOut} />}

      {/* Fondo ambiental */}
      <div className="bg-fx" id="bgfx">
        <span className="aura a" />
        <span className="aura b" />
        <span className="aura c" />
      </div>
      <div className="scroll-bar" ref={sbarRef} />
      <div className="scroll-hud">SYS · SCROLL <span ref={shudRef}>000%</span></div>

      {/* Modales */}
      {selectedWork && selectedWork.cardType === "slider" && <SliderModal work={selectedWork} onClose={() => setSelectedWork(null)} />}
      {selectedWork && selectedWork.cardType === "expander" && <FullscreenModal work={selectedWork} onClose={() => setSelectedWork(null)} />}
      {selectedWork && selectedWork.cardType === "video" && <VideoModal work={selectedWork} onClose={() => setSelectedWork(null)} />}
      {selectedWork && selectedWork.cardType === "store" && <StoreModal work={selectedWork} onClose={() => setSelectedWork(null)} />}
      {selectedWork && selectedWork.cardType === "scrollable" && <ScrollableModal work={selectedWork} onClose={() => setSelectedWork(null)} />}
      {selectedStoreProduct && <StoreModal work={selectedStoreProduct} onClose={() => setSelectedStoreProduct(null)} />}

      {/* NAV / HUD */}
      <header className="site-header">
        <div className="nav">
          <a href="#inicio" className="brand">
            <span className="glyph">
              <Image src="/images/gajo.png" alt="Marandina" width={62} height={34} />
            </span>
            <span>MARANDINA</span>
          </a>
          <nav className="links">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </nav>
          <button className="menu-btn" onClick={() => setMobileMenuOpen((v) => !v)}>MENÚ</button>
        </div>
        <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMobileMenuOpen(false)}>{l.label}</a>
          ))}
        </div>
      </header>

      {/* HERO */}
      <section className="hero" id="inicio">
        <div className="ghost-word" data-par="0.10" data-base="rotate(90deg)">MARANDINA</div>
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-left reveal">
              <div className="hero-meta">
                <span className="tag"><span className="dot" />ARTE</span>
                <span className="tag mono">AMOR</span>
                <span className="tag mono">CONEXIÓN</span>
              </div>
              <h1>NATALIA<span className="l2">ESPAIN</span></h1>
              <div className="role">Artista Multimedia</div>
              <p className="bio">
                Soy una artista multidisciplinaria apasionada que cree en el poder del <b>color, la forma y la emoción</b> para transformar espacios y almas. Actualmente soy estudiante de la <b>Escuela Da Vinci</b> en la carrera de Diseño Multimedia, donde perfecciono mis habilidades técnicas y creativas.
              </p>
              <p className="bio" style={{ marginTop: "16px" }}>
                Mi trayectoria abarca <b>pinturas tradicionales, arte digital de vanguardia y diseños de tatuajes</b> significativos. Cada medio ofrece un lenguaje único para expresar las historias vibrantes que viven dentro de todos nosotros.
              </p>
              <div className="hero-cta">
                <a href="#trabajo" className="btn primary">Ver trabajo <span aria-hidden="true">↘</span></a>
                <a href="#contacto" className="btn ghost">Trabajemos juntxs</a>
              </div>
            </div>

            <div className="hero-right reveal">
              <div className="hud-note tr">COLOR · FORMA<br />EMOCIÓN</div>
              <div className="hud-note bl">ÓLEO · PÍXEL · TINTA<br />HECHO CON EL ALMA</div>
              <div className="stage" id="stage">
                <div className="orbit" />
                <div className="orbit two" />
                <span className="chip a" />
                <span className="chip b" />
                <span className="chip c" />
                <div className="glow" />
                <div className="palette-wrap">
                  <div className="palette" />
                  <span className="blob v" />
                  <span className="blob o" />
                  <span className="blob p" />
                  <span className="blob c" />
                  <span className="blob m" />
                  <span className="blob w" />
                  <div className="brush"><span className="tip" /><span className="ferrule" /><span className="handle" /></div>
                </div>
                <span className="star" style={{ ["--s" as string]: "26px", position: "absolute", top: "-14px", left: "8%" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-track">
          <span>{tickerItems.map((t) => <span key={"a" + t}>{t} •&nbsp;</span>)}</span>
          <span>{tickerItems.map((t) => <span key={"b" + t}>{t} •&nbsp;</span>)}</span>
        </div>
      </div>

      {/* DESTACADO — proyecto colaborativo con web + 3D en vivo */}
      <section id="destacado" className="wrap">
        <div className="sec-head">
          <div className="l">
            <span className="eyebrow">// COLABORACIÓN · PROYECTO DESTACADO</span>
            <h2 data-parx="0.05">DESTA<em>CADO</em></h2>
          </div>
          <span className="idx reveal">[ WEB + 3D / EN VIVO ]</span>
        </div>

        <a
          href="https://magenta-churros-b179d9.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="spotlight reveal"
        >
          <div className="spotlight-info">
            <span className="tag"><span className="dot" />EN VIVO</span>
            <h3>Miss Lupe</h3>
            <p>
              Sitio web para <b>Miss Lupe</b> (DJ · productora · cantante), con <b>objetos 3D integrados</b> que se pueden rotar en tiempo real. Diseño, desarrollo y modelado 3D — hecho en colaboración.
            </p>
            <div className="spot-tools">
              <i>Three.js</i><i>WebGL</i><i>Diseño Web</i><i>Modelado 3D</i>
            </div>
            <span className="spot-cta">Entrar al sitio <b>↗</b></span>
          </div>

          <div className="browser">
            <div className="browser-view">
              <Image
                src="/images/misslupe-banner.png"
                alt="Banner de la web de Miss Lupe"
                fill
                className="browser-img"
                sizes="(max-width: 900px) 100vw, 55vw"
              />
            </div>
          </div>
        </a>
      </section>

      {/* TRABAJO */}
      <section id="trabajo" className="wrap">
        <div className="sec-head">
          <div className="l">
            <span className="eyebrow">// ARCHIVO SELECCIONADO</span>
            <h2 data-parx="0.05">TRABA<em>JO</em></h2>
          </div>
          <span className="idx reveal">[ {filteredWorks.length} PIEZAS / 2024–2025 ]</span>
        </div>

        <div className="filters">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`filter-pill ${activeFilter === cat.id ? "active" : ""}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="work">
          {filteredWorks.map((work, idx) => (
            <WorkCard key={work.id} work={work} idx={idx} onOpen={handleCardClick} />
          ))}
        </div>
      </section>

      {/* STACK */}
      <section id="stack" className="wrap">
        <div className="sec-head">
          <div className="l">
            <span className="eyebrow">// HERRAMIENTAS QUE DOMINO</span>
            <h2 data-parx="-0.05">STA<em>CK</em></h2>
          </div>
          <span className="idx reveal">[ SW / SUITE CREATIVA ]</span>
        </div>

        <div className="stack">
          <div className="spec reveal">
            <h4>Software</h4>
            {skills.map((s) => (
              <div className="tool-row" key={s.name}>
                <span className="name"><span className="badge">{s.badge}</span>{s.name}</span>
                <span className="meter"><i style={{ width: `${s.level}%` }} /></span>
              </div>
            ))}
          </div>
          <div className="aside-cards">
            <div className="mini reveal from-r"><span className="big">6+</span><span className="lab">Disciplinas creativas</span></div>
            <div className="mini reveal from-r"><span className="big">∞</span><span className="lab">Ideas por proyecto</span></div>
            <div className="mini reveal from-r" style={{ background: "radial-gradient(120% 120% at 100% 0%, rgba(242,131,34,.16), transparent 60%), var(--panel)" }}>
              <span className="lab" style={{ margin: "0 0 10px", color: "var(--lilac)" }}>Estudiante en</span>
              <div className="display" style={{ fontSize: "30px", lineHeight: 1 }}>Escuela Da Vinci</div>
              <span className="lab">Diseño Multimedia</span>
            </div>
          </div>
        </div>
      </section>

      {/* TIENDA */}
      <section id="tienda" className="wrap">
        <div className="sec-head">
          <div className="l">
            <span className="eyebrow">// OBRA DISPONIBLE</span>
            <h2 data-parx="0.05">TIEN<em>DA</em></h2>
          </div>
          <span className="idx reveal">[ PIEZAS ÚNICAS / 2025 ]</span>
        </div>

        <div className="shop-note reveal">
          <span><b>Envíos</b> a todo el país</span><span className="sep" />
          <span><b>Pagos</b> por WhatsApp</span><span className="sep" />
          <span><b>Piezas</b> pintadas a mano</span>
        </div>

        <div className="shop">
          {storeProducts.map((product, idx) => {
            const soldOut = product.available === false
            return (
              <article
                key={product.id}
                className={`prod reveal ${idx % 2 === 0 ? "from-l" : "from-r"} ${soldOut ? "sold" : ""}`}
                style={{ transitionDelay: `${(idx % 4) * 0.06}s` }}
                onClick={() => !soldOut && setSelectedStoreProduct(product)}
              >
                <div className="art">
                  <span className="status"><span className="live" />{soldOut ? "Agotada" : "Disponible"}</span>
                  <div className="pic" style={{ backgroundImage: `url("${product.image}")` }} />
                  {!soldOut && (
                    <span className="buy">Comprar <span aria-hidden="true">↗</span></span>
                  )}
                </div>
                <div className="info">
                  <span className="medium">{product.type}</span>
                  <h3>{product.title}</h3>
                  <div className="row">
                    {product.price && (
                      <span className="price">${product.price.toLocaleString("es-AR")} <small>ARS</small></span>
                    )}
                    {product.dimensions && <span className="dim">{product.dimensions}</span>}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="wrap">
        <div className="contact reveal">
          {/* deco geométrica cyberpunk de fondo */}
          <div className="contact-deco" aria-hidden="true">
            <span className="deco-grid" />
            <span className="deco-ring r1" />
            <span className="deco-ring r2" />
            <span className="deco-ring r3" />
            <span className="deco-chip c1" />
            <span className="deco-chip c2" />
            <span className="deco-line l1" />
            <span className="deco-line l2" />
            <span className="deco-plus" />
            <span className="deco-dot" />
          </div>
          <span className="hud-note" style={{ top: "20px", right: "26px" }}>
            © 2026 · MARANDINA <span className="star" style={{ ["--s" as string]: "12px", verticalAlign: "-2px" }} />
          </span>
          <div className="contact-in">
            <div>
              <h2>HAGAMOS<br /><span className="l2">ALGO ÚNICO</span></h2>
              <p>Si buscás identidad visual, arte digital o una pieza que la gente recuerde — escribime. Cada proyecto es un lenguaje nuevo.</p>
              <a href="mailto:nataliaespain97@gmail.com" className="btn primary">nataliaespain97@gmail.com <span aria-hidden="true">↗</span></a>
              <a
                href="https://www.instagram.com/marandina.tt/"
                target="_blank"
                rel="noopener noreferrer"
                className="qr"
                aria-label="Escaneá el QR para seguirme en Instagram"
              >
                <div className="qr-card">
                  <QRCodeSVG
                    value="https://www.instagram.com/marandina.tt/"
                    size={124}
                    level="H"
                    bgColor="#ffffff"
                    fgColor="#3B1E6E"
                    marginSize={1}
                    imageSettings={{ src: "/images/gajo.png", height: 21, width: 38, excavate: true }}
                  />
                </div>
                <span className="qr-cap">
                  <span className="eyebrow">// ESCANEÁ</span>
                  <span className="qr-cap-main">Seguime en Instagram<br />@marandina.tt <span aria-hidden="true">↗</span></span>
                </span>
              </a>
            </div>
            <div className="socials">
              <a className="social" href="mailto:nataliaespain97@gmail.com">
                <span className="social-k">EMAIL</span><span className="social-v">nataliaespain97</span><b className="social-go">↗</b>
              </a>
              <a className="social" href="https://www.instagram.com/marandina.tt/" target="_blank" rel="noopener noreferrer">
                <span className="social-k">INSTAGRAM</span><span className="social-v">@marandina.tt</span><b className="social-go">↗</b>
              </a>
              <a className="social" href="https://www.behance.net/nataliaespain" target="_blank" rel="noopener noreferrer">
                <span className="social-k">BEHANCE</span><span className="social-v">/nataliaespain</span><b className="social-go">↗</b>
              </a>
              <a className="social" href="https://www.linkedin.com/in/natalia-espain-0b1a5817a/" target="_blank" rel="noopener noreferrer">
                <span className="social-k">LINKEDIN</span><span className="social-v">/natalia-espain</span><b className="social-go">↗</b>
              </a>
            </div>
          </div>
        </div>

        <footer className="site-footer">
          <span>NATALIA ESPAIN © 2026 — TODOS LOS DERECHOS RESERVADOS</span>
          <span className="star" />
          <span>DISEÑO · DA VINCI · BUENOS AIRES_AR</span>
        </footer>
      </section>
    </>
  )
}
