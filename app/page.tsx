"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Mail, Instagram, Linkedin, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react"

// Colores de la marca por categoría
const categoryColors = {
  todos: { r: 140, g: 92, b: 242 },    // violeta #8C5CF2
  diseno: { r: 242, g: 131, b: 34 },   // naranja #F28322
  paintings: { r: 242, g: 179, b: 61 }, // dorado #F2B33D
  digital: { r: 140, g: 92, b: 242 },  // violeta #8C5CF2
  tattoos: { r: 242, g: 131, b: 34 },  // naranja #F28322
}

// Componente de estela del mouse
function MouseTrail({ color }: { color: { r: number; g: number; b: number } }) {
  const [trails, setTrails] = useState<{ x: number; y: number; id: number }[]>([])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const newTrail = {
      x: e.clientX,
      y: e.clientY,
      id: Date.now(),
    }
    setTrails((prev) => [...prev.slice(-12), newTrail])
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  useEffect(() => {
    const interval = setInterval(() => {
      setTrails((prev) => prev.slice(1))
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: trail.x,
            top: trail.y,
            width: `${8 + index * 1.5}px`,
            height: `${8 + index * 1.5}px`,
            background: `radial-gradient(circle, rgba(${color.r}, ${color.g}, ${color.b}, ${0.1 + index * 0.06}) 0%, transparent 70%)`,
            transform: "translate(-50%, -50%)",
            transition: "opacity 0.1s ease-out",
          }}
        />
      ))}
    </div>
  )
}

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#trabajo", label: "Trabajo" },
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
  cardType?: "expander" | "slider" | "default" // expander = modal con info, slider = modal con carrusel de imágenes
  images?: string[] // array de imágenes para el slider
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
    description: "Fotomontaje realista realizado con Photoshop.",
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
  // ============ SLIDER CARDS (Digital Art) ============
  {
    id: 10,
    title: "Ilustración en Procreate",
    category: "digital",
    type: "Digital Art",
    image: "/images/moth-violeta.jpg",
    description: "",
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
    id: 13,
    title: "Mandala Design",
    category: "tattoos",
    type: "Tattoo",
    image: "/mandala-tattoo-design-black-ink.jpg",
    description: "Diseño de mandala intrincado con patrones geométricos detallados.",
    size: "normal",
  },
  {
    id: 14,
    title: "Botanical Sleeve",
    category: "tattoos",
    type: "Tattoo",
    image: "/placeholder.svg?height=600&width=600",
    description: "Manga completa con diseño botánico de flores y hojas.",
    size: "tall",
  },
  {
    id: 15,
    title: "Geometric Wolf",
    category: "tattoos",
    type: "Tattoo",
    image: "/placeholder.svg?height=600&width=600",
    description: "Diseño de lobo con estilo geométrico y líneas precisas.",
    size: "normal",
  },
]

const categories = [
  { id: "todos", label: "Todos" },
  { id: "diseno", label: "Diseño" },
  { id: "paintings", label: "Paintings" },
  { id: "digital", label: "Digital" },
  { id: "tattoos", label: "Tattoos" },
]

// Modal con slider de imágenes (mobile) / grid (desktop)
function SliderModal({ work, onClose }: { work: Work; onClose: () => void }) {
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
      if (e.key === 'ArrowRight') setCurrentIndex((prev) => (prev + 1) % images.length)
      if (e.key === 'ArrowLeft') setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose, images.length])

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <div
      className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
      style={{ animationDuration: '0.3s' }}
    >
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
      </div>

      {/* Mobile: Slider */}
      <div className="md:hidden w-full h-full flex items-center justify-center">
        {/* Navegación izquierda */}
        <button
          onClick={prevSlide}
          className="absolute left-4 z-10 w-10 h-10 rounded-full bg-surface/80 border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-primary transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="w-full h-full flex items-center justify-center p-16">
          <div className="relative w-full h-full max-h-[70vh]">
            {images.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                  index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-95"
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
        </div>

        {/* Navegación derecha */}
        <button
          onClick={nextSlide}
          className="absolute right-4 z-10 w-10 h-10 rounded-full bg-surface/80 border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-primary transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Indicadores mobile */}
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
      </div>

      {/* Desktop: Grid de imágenes */}
      <div className="hidden md:flex w-full h-full items-center justify-center p-24 gap-6">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative flex-1 h-[70vh] max-w-md"
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

export default function MarandinaPortfolio() {
  const [activeFilter, setActiveFilter] = useState("todos")
  const [isVisible, setIsVisible] = useState(false)
  const [selectedWork, setSelectedWork] = useState<Work | null>(null)
  const [trailColor, setTrailColor] = useState(categoryColors.todos)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Cambiar color cuando cambia el filtro
  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId)
    setTrailColor(categoryColors[filterId as keyof typeof categoryColors] || categoryColors.todos)
  }

  const filteredWorks = activeFilter === "todos"
    ? allWorks
    : allWorks.filter(work => work.category === activeFilter)

  const handleCardClick = (work: Work) => {
    // Cambiar color de la estela según la categoría del trabajo
    setTrailColor(categoryColors[work.category as keyof typeof categoryColors] || categoryColors.todos)

    // Abrir modal para cards tipo "expander" o "slider"
    if (work.cardType === "expander" || work.cardType === "slider") {
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

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-3 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="#inicio" className="flex items-center group">
            <Image
              src="/images/marandina-logo.png"
              alt="Marandina"
              width={280}
              height={80}
              className="h-20 md:h-24 w-auto object-contain"
            />
          </a>

          {/* Nav links */}
          <nav className="flex items-center gap-8">
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
      <div className="w-full relative mt-[88px] md:mt-[104px] flex justify-center bg-background">
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
                Artista Multidisciplinaria
              </p>

              {/* Descripción completa */}
              <p
                className="text-muted leading-relaxed mb-4 opacity-0 animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                Soy una artista multidisciplinaria apasionada que cree en el poder del color,
                la forma y la emoción para transformar espacios y almas. Actualmente soy estudiante
                de la Escuela Da Vinci en la carrera de Diseño Multimedia, donde perfecciono mis
                habilidades técnicas y creativas.
              </p>

              <p
                className="text-muted/70 leading-relaxed mb-8 opacity-0 animate-fade-in-up"
                style={{ animationDelay: "0.5s" }}
              >
                Mi trayectoria abarca pinturas tradicionales, arte digital de vanguardia y diseños
                de tatuajes significativos. Cada medio ofrece un lenguaje único para expresar las
                historias vibrantes que viven dentro de todos nosotros.
              </p>

              {/* Social links */}
              <div>
                <p
                  className="text-xs uppercase tracking-[0.2em] text-muted mb-4 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: "0.6s" }}
                >
                  Conectemos
                </p>
                <div
                  className="flex gap-3 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: "0.7s" }}
                >
                  <a href="mailto:nataliaespain97@gmail.com" className="social-btn" aria-label="Email">
                    <Mail className="w-5 h-5" />
                  </a>
                  <a href="https://www.instagram.com/marandina.tt/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://www.behance.net/nataliaespain" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Behance">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/in/natalia-espain-0b1a5817a/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
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
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      className="gallery-card-image object-cover"
                    />

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

                      {/* Solo mostrar link en cards que NO son expander ni slider */}
                      {work.cardType !== "expander" && work.cardType !== "slider" && work.link && (
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

                      {/* Indicador de click para expander y slider cards */}
                      {(work.cardType === "expander" || work.cardType === "slider") && (
                        <span className="text-primary text-sm font-medium">
                          Click para ver más
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
          <div className="flex gap-3 order-2 md:order-3">
            <a href="mailto:nataliaespain97@gmail.com" className="social-btn !w-9 !h-9" aria-label="Email">
              <Mail className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/marandina.tt/" target="_blank" rel="noopener noreferrer" className="social-btn !w-9 !h-9" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://www.behance.net/nataliaespain" target="_blank" rel="noopener noreferrer" className="social-btn !w-9 !h-9" aria-label="Behance">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/natalia-espain-0b1a5817a/" target="_blank" rel="noopener noreferrer" className="social-btn !w-9 !h-9" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
