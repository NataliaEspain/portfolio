"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ExternalLink, X, ChevronLeft, ChevronRight, Layers } from "lucide-react"
import HeroWaves from "@/components/hero-waves"

/* ============================================================
   SLOTS DE ASSETS PENDIENTES
   Cuando Natalia suba cada archivo, se activa cambiando SOLO
   estas constantes. Mientras valgan null / [], la sección
   correspondiente no se renderiza (nada de placeholders).
   ============================================================ */

// El hero ya no lleva reel ni objeto 3D: el perfil es multimedial, sin
// protagonismo de motion. De fondo va un terreno de partículas interactivo
// (components/hero-waves.tsx) y el texto ocupa las dos columnas.
// La pieza de motion destacada es el Módulo Sanitario, dentro de su sección.
const MOTION_FEATURE = {
  youtubeId: "IfjRu10YouA",
  title: "Módulo Sanitario",
  type: "Motion Graphics · NGO",
  description:
    "Motion graphics video for an NGO that builds sanitary modules — bathrooms for families who don't have access to one. Visual design and animation in service of the cause.",
}

// CV en inglés, formato ATS (una columna, texto real, sin certificaciones inventadas).
// Se genera desde un HTML con estilos de impresión — ver cv-source/README.md.
const CV_URL: string | null = "/cv/natalia-espain-cv.pdf"
// Nombre con el que se guarda el archivo. Es el que ve el reclutador en su carpeta
// de descargas, así que va con nombre y apellido, no "cv.pdf".
const CV_FILENAME = "Natalia-Espain-CV.pdf"

// Capturas de MRM/McCann → public/images/mrm/*.png
// Cada captura linkea a la página publicada, que es la prueba real del trabajo.
const MRM_SHOTS: { src: string; caption: string; href: string }[] = [
  {
    src: "/images/mrm/loreal-01.png",
    caption: "L'Oréal Paris DE — Rendez-Vous Couleur Eye & Cheek Quad · product page · Sitecore",
    href: "https://www.loreal-paris.de/rendez-vous-couleur/eye-y-cheek-quad/01-spring-dans-le-marais",
  },
  {
    src: "/images/mrm/loreal-02.png",
    caption: "L'Oréal Paris DE — Lash Paradise Latte Brown · product page · Sitecore",
    href: "https://www.loreal-paris.de/paradise/mascara/latte-brown",
  },
  {
    src: "/images/mrm/maybelline-01.png",
    caption: "Maybelline DE — Berry lipstick trend editorial · Sitecore",
    href: "https://www.maybelline.de/make-up-tipps/lip/lippenstift-in-beerentoenen",
  },
  {
    src: "/images/mrm/maybelline-02.png",
    caption: "Maybelline CH (FR) — Fit Me Loose Setting Powder · product page · Sitecore",
    href: "https://www.maybelline.ch/fr-ch/tous-les-produits/maquillage-visage/poudre/fit-me-loose-setting-powder",
  },
  {
    src: "/images/mrm/cadillac-01.png",
    caption: "Cadillac US — Camera App · vehicle support · AEM",
    href: "https://www.cadillac.com/support/vehicle/driving-safety/towing/camera-app",
  },
  {
    src: "/images/mrm/chevrolet-01.png",
    caption: "Chevrolet US — Coupons & offers · support · AEM",
    href: "https://www.chevrolet.com/support/shopping/orders-and-purchases/checkout/coupon-codes",
  },
  {
    src: "/images/mrm/buick-01.png",
    caption: "Buick US — Core charge · support · AEM",
    href: "https://www.buick.com/support/shopping/parts-accessories/core-charge",
  },
  {
    src: "/images/mrm/gmc-01.png",
    caption: "GMC US — Shopping & checkout · support hub · AEM",
    href: "https://www.gmc.com/support/shopping-support/orders-and-purchases/checkout",
  },
]

// Certificaciones — solo las verificadas contra el archivo real y vigentes.
// NO hay certificación de Sitecore ni de AEM: ese trabajo va como experiencia, no como certificación.
const CERTS: { name: string; issuer: string; year: string; verify?: string }[] = [
  {
    name: "Google AI Essentials",
    issuer: "Google · Coursera",
    year: "2025",
    verify: "https://coursera.org/verify/5L31GKUPJAMB",
  },
  { name: "UX/UI Design (Advanced)", issuer: "Coderhouse", year: "2022" },
  { name: "Nexus CMS — UAT & Publisher", issuer: "MRM internal system", year: "2025" },
]

// Hot House → reels editados por ella. La captura de métricas se descartó:
// el reel de las 40k vistas ya está linkeado acá, la cifra se sostiene sola.
// Los dos reels destacados (motionClient) NO van en este índice: ya tienen card propia.
const HOTHOUSE_REELS: string[] = [
  "https://www.instagram.com/reel/DbtTfmXx-aZ/",
  "https://www.instagram.com/reel/DboM8Ygpb09/",
  "https://www.instagram.com/reel/DbTqslLpvjA/",
  "https://www.instagram.com/reel/DbBhdujxkJy/",
  "https://www.instagram.com/reel/DavfmIDRZrF/",
  "https://www.instagram.com/reel/Dan0YjTR3YJ/",
  "https://www.instagram.com/reel/Dado2D6pnjH/",
  "https://www.instagram.com/reel/DaTOYJ8RrIM/",
  "https://www.instagram.com/reel/DaDtOr9Rx63/",
  "https://www.instagram.com/reel/DZ-15KUprUg/",
  "https://www.instagram.com/reel/DZ5mvpppD2b/",
]

// Estética Jaz → piezas gráficas de la campaña (public/images/jaz/*).
// Una pieza con varios slides es un carrusel de Instagram; con uno solo, un post común.
type JazPiece = { title: string; slides: string[] }
const JAZ_PIECES: JazPiece[] = [
  {
    title: "Piel más firme y tonificada — Hidroxilift",
    slides: [
      "/images/jaz/pielfirme-01.jpg",
      "/images/jaz/pielfirme-02.jpg",
      "/images/jaz/pielfirme-03.jpg",
      "/images/jaz/pielfirme-04.jpg",
    ],
  },
  {
    title: "La piel cambia con el tiempo",
    slides: [
      "/images/jaz/edades-01.jpg",
      "/images/jaz/edades-02.jpg",
      "/images/jaz/edades-03.jpg",
      "/images/jaz/edades-04.jpg",
      "/images/jaz/edades-05.jpg",
      "/images/jaz/edades-06.jpg",
    ],
  },
  { title: "¿Qué hace el botox?", slides: ["/images/jaz/botox.jpg"] },
  { title: "Armonización facial", slides: ["/images/jaz/armonizacion-facial.jpg"] },
  { title: "Cursos de medicina estética", slides: ["/images/jaz/cursos-medicina-estetica.jpg"] },
]

// Mapa único de secciones: lo usan el nav, el menú mobile y el índice lateral.
// El orden es el mismo en el que aparecen en la página, así que el índice
// numerado no puede desincronizarse del scroll.
// Antes el nav listaba 6 de 9 secciones: a "ai" y "studies" sólo se llegaba scrolleando.
const SECTIONS = [
  { id: "work", label: "WORK", short: "Selected work" },
  { id: "ai", label: "AI", short: "Generative AI" },
  { id: "motion", label: "MOTION", short: "Motion" },
  { id: "brands", label: "BRANDS", short: "Brands at scale" },
  { id: "about", label: "ABOUT", short: "About" },
  { id: "studies", label: "STUDIES", short: "Studies & spec" },
  { id: "personal", label: "PERSONAL", short: "Personal" },
  { id: "contact", label: "CONTACT", short: "Contact" },
]

// Filtros de Motion. La sección mezcla bloques con layout propio (destacado,
// cliente) con una grilla de cards, así que el filtro decide qué bloque se ve,
// no sólo qué cards.
const MOTION_FILTERS = [
  { id: "all", label: "All" },
  { id: "client", label: "Client work" },
  { id: "sound", label: "Sound" },
  { id: "study", label: "Coursework" },
]

const STUDY_FILTERS = [
  { id: "all", label: "All" },
  { id: "branding", label: "Branding" },
  { id: "web", label: "Web & UI" },
  { id: "image", label: "Illustration & compositing" },
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
  cardType?: "expander" | "slider" | "video" | "scrollable" | "link" | "default"
  images?: string[]
  video?: string
  youtubeId?: string
  coverImage?: string
  // Grupo al que responde el filtro de su sección (ver MOTION_FILTERS / STUDY_FILTERS).
  track?: string
}

/* ============================================================
   MOTION — trabajo comercial
   ============================================================ */
// El video Booster de Estética Jaz vive en el spotlight de la campaña
// (sección Selected Work) — acá quedaría duplicado.
const motionClient: Work[] = [
  {
    id: 54,
    title: "Electronic Music History — Part 1",
    category: "motion",
    type: "Video Editing · Hot House",
    image: "/images/hothouse/disco-history.jpg",
    description:
      "Opening episode of Hot House's electronic music history series, on disco and the mark it left. Split-screen edit with kinetic captions, cut in Premiere Pro from the studio recording.",
    link: "https://www.instagram.com/reel/DbJQi-MRFwG/",
    size: "tall",
    cardType: "link",
  },
  {
    id: 51,
    title: "Streaming Channel Edit",
    category: "motion",
    type: "Video Editing · Hot House",
    image: "/images/insta-streaming-edit.png",
    description:
      "Short-form edit for the Hot House streaming channel, cut in Premiere Pro. The account doubled its followers and clips reached up to 40k organic views.",
    link: "https://www.instagram.com/hothouse.ntv/reel/DZioNv8pWvO/",
    size: "tall",
    cardType: "link",
  },
]

// Hot House → pieza gráfica destacada: el carrusel de recomendaciones del finde.
// Se abre en el slider con las 5 placas; el link al posteo va en el bloque de al lado.
const HOTHOUSE_POST: Work = {
  id: 55,
  title: "Weekend Picks — Carousel",
  category: "motion",
  type: "Graphic Design · Hot House",
  image: "/images/hothouse/recomienda-01.jpg",
  description:
    "Instagram carousel picking the four best parties of the weekend: a cover plus one card per date, each with venue, line-up and set time, built on the Hot House brand palette.",
  link: "https://www.instagram.com/p/DbbYrskCVEs/",
  size: "tall",
  cardType: "slider",
  images: [
    "/images/hothouse/recomienda-01.jpg",
    "/images/hothouse/recomienda-02.jpg",
    "/images/hothouse/recomienda-03.jpg",
    "/images/hothouse/recomienda-04.jpg",
    "/images/hothouse/recomienda-05.jpg",
  ],
}

/* ============================================================
   MOTION — piezas de cursada / spec (etiquetadas como tales)
   ============================================================ */
// El Módulo Sanitario no está acá: es la pieza destacada (MOTION_FEATURE)
// y se muestra grande al inicio de la sección Motion.
const motionStudy: Work[] = [
  {
    id: 53,
    title: "Sound Redesign — Corpse Bride",
    category: "motion",
    type: "Sound Design · Foley & Dubbing",
    image: "https://img.youtube.com/vi/DqbRwzwMbx8/maxresdefault.jpg",
    description:
      "Full sound redesign of a scene from Tim Burton's Corpse Bride: the original track was stripped out and rebuilt from scratch in Audition and Premiere Pro. Foley recorded and performed by me, voice acting and dubbing by me too — only the music comes from an external source.",
    size: "wide",
    cardType: "video",
    youtubeId: "DqbRwzwMbx8",
    track: "sound",
  },
  {
    id: 52,
    title: "Social Media Edit",
    category: "motion",
    type: "Video Editing · Editing test",
    image: "/videos/final.mp4",
    description:
      "Short-form social edit cut in Premiere Pro, made as an editing test for a job application. Pacing, cuts and rhythm are mine.",
    size: "wide",
    cardType: "video",
    video: "/videos/final.mp4",
  },
  {
    id: 46,
    title: "Icon Animation",
    category: "motion",
    type: "Motion Graphics",
    image: "https://img.youtube.com/vi/OB2oT-Cd0oc/maxresdefault.jpg",
    description:
      "Motion graphics piece built in After Effects, applying animation principles, visual composition and audiovisual narrative.",
    size: "wide",
    cardType: "video",
    youtubeId: "OB2oT-Cd0oc",
  },
  {
    id: 49,
    title: "3D Animation — Cinema 4D",
    category: "motion",
    type: "3D Animation",
    image: "https://img.youtube.com/vi/skSJUo4qRPY/maxresdefault.jpg",
    description: "3D animation modelled and animated in Cinema 4D.",
    size: "wide",
    cardType: "video",
    youtubeId: "skSJUo4qRPY",
  },
  {
    id: 47,
    title: "Motion Graphics Animation",
    category: "motion",
    type: "Motion Graphics",
    image: "https://img.youtube.com/vi/rpNlvvr2sb0/maxresdefault.jpg",
    description:
      "Motion graphics project combining visual design and movement into a dynamic audiovisual piece.",
    size: "tall",
    cardType: "video",
    youtubeId: "rpNlvvr2sb0",
  },
  {
    id: 50,
    title: "Motion Graphics — After Effects",
    category: "motion",
    type: "Motion Graphics",
    image: "https://img.youtube.com/vi/lL8XpviLApY/maxresdefault.jpg",
    description: "Motion graphics piece animated in After Effects.",
    size: "wide",
    cardType: "video",
    youtubeId: "lL8XpviLApY",
  },
  {
    id: 32,
    title: "Out-of-Home Spot",
    category: "motion",
    type: "Advertising",
    image: "https://img.youtube.com/vi/ohnjv39kp-Q/maxresdefault.jpg",
    description: "Video designed for an out-of-home mockup, animated in After Effects.",
    size: "wide",
    cardType: "video",
    youtubeId: "ohnjv39kp-Q",
  },
  {
    id: 43,
    title: "Animated Movie Poster",
    category: "motion",
    type: "Animation",
    image: "/videos/nosferatu.mp4",
    description:
      "Film poster designed in Photoshop and animated with its timeline tool, bringing a static composition to life.",
    size: "tall",
    cardType: "video",
    video: "/videos/nosferatu.mp4",
  },
  {
    id: 31,
    title: "Instagram Stories",
    category: "motion",
    type: "Social Media",
    image: "https://img.youtube.com/vi/_Po89Cb6_N0/maxresdefault.jpg",
    description: "Vertical video designed for Instagram Stories, animated in After Effects.",
    size: "tall",
    cardType: "video",
    youtubeId: "_Po89Cb6_N0",
  },
  {
    id: 30,
    title: "TikTok Video",
    category: "motion",
    type: "Social Media",
    image: "https://img.youtube.com/vi/lO-05i7ye2s/maxresdefault.jpg",
    description: "Vertical video edited in Premiere Pro.",
    size: "tall",
    cardType: "video",
    youtubeId: "lO-05i7ye2s",
  },
  {
    id: 33,
    title: "Breaking Point",
    category: "motion",
    type: "Experimental",
    image: "/videos/portada-clip.png",
    description:
      "Experimental clip on workplace stress awareness, written and edited in Premiere Pro.",
    size: "wide",
    cardType: "video",
    youtubeId: "hQLif2a9h18",
  },
  {
    id: 34,
    title: "Editing Reel",
    category: "motion",
    type: "Showreel",
    image: "https://img.youtube.com/vi/rBCkVrD6Das/maxresdefault.jpg",
    description:
      "End-of-term reel bringing together a full semester of projects, assembled mainly in After Effects.",
    size: "wide",
    cardType: "video",
    youtubeId: "rBCkVrD6Das",
  },
]

/* ============================================================
   STUDIES & SPEC — diseño gráfico (cursada / proyectos ficticios)
   ============================================================ */
const studyWorks: Work[] = [
  {
    id: 44,
    title: "DiVino — Visual Identity",
    category: "study",
    track: "branding",
    type: "Branding · Fictional brand",
    image: "/images/divino-portada.jpg",
    description:
      "Full brand system for a fictional winery: logotype, palette, typography and applications with a coherent visual language end to end.",
    link: "https://www.behance.net/gallery/242558367/DiVino",
    size: "tall",
    cardType: "expander",
  },
  {
    id: 45,
    title: "DiVino — Web Design",
    category: "study",
    track: "web",
    type: "UX/UI · Fictional brand",
    image: "/images/divino-onepage.jpg",
    coverImage: "/images/divino-uxui.png",
    description:
      "One-page web interface applying the DiVino identity: typography, colour palette and graphic elements carried into a cohesive layout.",
    size: "normal",
    cardType: "scrollable",
  },
  {
    id: 1,
    title: "Buka — Visual Identity",
    category: "study",
    track: "branding",
    type: "Branding · Fictional brand",
    image: "/gym-branding-design.png",
    coverImage: "/images/remera-buka.png",
    description:
      "Complete visual identity for a fictional gym: logo, one-page site and brand extensions.",
    link: "https://www.behance.net/gallery/231852521/Identidad-de-marca-BUKA",
    size: "normal",
    cardType: "expander",
  },
  {
    id: 42,
    title: "Realistic Photomontage",
    category: "study",
    track: "image",
    type: "Photoshop",
    image: "/mujer-tattoo.jpg",
    description:
      "Compositing exercise: the model was digitally integrated into the background, working light, shadow and colour to blend her realistically into the scene.",
    size: "tall",
    cardType: "expander",
  },
  {
    id: 2,
    title: "Gradient Mesh Illustration",
    category: "study",
    track: "image",
    type: "Illustrator",
    image: "/robot-illustration.jpg",
    description:
      "Robot built in Illustrator using gradient mesh, the pen tool and layered gradients.",
    size: "normal",
    cardType: "expander",
  },
  {
    id: 5,
    title: "Collage",
    category: "study",
    track: "image",
    type: "Photoshop",
    image: "/collage-artwork.jpg",
    description: "Photoshop collage composed around a windmill.",
    size: "tall",
    cardType: "expander",
  },
  {
    id: 3,
    title: "Experimental Photomontage",
    category: "study",
    track: "image",
    type: "Photoshop",
    image: "/photomontage-artwork.jpg",
    description: "Experimental photomontage built in Photoshop.",
    size: "wide",
    cardType: "expander",
  },
  {
    id: 6,
    title: "Movie Poster",
    category: "study",
    track: "image",
    type: "Key Art",
    image: "/movie-poster.jpg",
    description: "Poster for a children's film, made in Photoshop with AI-assisted imagery.",
    size: "full",
    cardType: "expander",
  },
  {
    id: 4,
    title: "Website From Scratch",
    category: "study",
    track: "web",
    type: "HTML / CSS",
    image: "/website-project.png",
    description: "Website hand-coded in HTML and CSS for a university project.",
    size: "normal",
    cardType: "expander",
  },
]

/* ============================================================
   PERSONAL — Marandina · práctica personal de ilustración
   ============================================================ */
const personalWorks: Work[] = [
  {
    id: 20,
    title: "Procreate Illustration",
    category: "digital",
    type: "Digital Art",
    image: "/images/procreate/portada1.JPG",
    description: "Digital illustration made in Procreate.",
    size: "normal",
    cardType: "slider",
    images: ["/images/procreate/portada1.JPG", "/images/procreate/samurai.JPG", "/images/procreate/formas.JPG"],
  },
  {
    id: 21,
    title: "Digital Sketchbook",
    category: "digital",
    type: "Digital Art",
    image: "/images/sketchbook/rana.png",
    description: "Loose sketches and studies.",
    size: "tall",
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
    id: 22,
    title: "Pink Background Series",
    category: "digital",
    type: "Digital Art",
    image: "/images/pinkbg/ave.png",
    description: "Illustration series sharing a common palette.",
    size: "normal",
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
    id: 23,
    title: "Procreate Studies",
    category: "digital",
    type: "Digital Art",
    image: "/images/procreate/draw3.png",
    description: "Drawing studies in Procreate.",
    size: "normal",
    cardType: "slider",
    images: ["/images/procreate/draw3.png", "/images/procreate/draw1.JPG", "/images/procreate/draw2.JPG"],
  },
  {
    id: 24,
    title: "Flash Illustrations",
    category: "digital",
    type: "Digital Art",
    image: "/images/flash-tattoos/portada.png",
    description: "Flash illustration sheets.",
    size: "tall",
    cardType: "slider",
    images: [
      "/images/flash-tattoos/portada.png",
      "/images/flash-tattoos/illustraciones-varias1.png",
      "/images/flash-tattoos/illustraciones-varias2.png",
    ],
  },
  {
    id: 25,
    title: "Anime Fan Art",
    category: "digital",
    type: "Digital Art",
    image: "/images/anime.PNG",
    description: "Fan art illustration.",
    size: "normal",
    cardType: "expander",
  },
  {
    id: 26,
    title: "Geometric",
    category: "digital",
    type: "Digital Art",
    image: "/images/geometrico.JPG",
    description: "Geometric composition.",
    size: "normal",
    cardType: "expander",
  },
  {
    id: 7,
    title: "Watercolour",
    category: "paintings",
    type: "Painting",
    image: "/images/acuarela.jpg",
    description: "Watercolour painting.",
    size: "normal",
    cardType: "expander",
  },
  {
    id: 8,
    title: "Brain",
    category: "paintings",
    type: "Painting",
    image: "/images/cerebro.jpg",
    description: "Painting.",
    size: "tall",
    cardType: "expander",
  },
  {
    id: 9,
    title: "Dragon",
    category: "paintings",
    type: "Painting",
    image: "/images/dragon.jpg",
    description: "Painting.",
    size: "normal",
    cardType: "expander",
  },
  {
    id: 10,
    title: "Sparrows",
    category: "paintings",
    type: "Painting",
    image: "/images/gorriones.jpg",
    description: "Painting.",
    size: "normal",
    cardType: "expander",
  },
  {
    id: 11,
    title: "Jellyfish",
    category: "paintings",
    type: "Painting",
    image: "/images/medusas.jpg",
    description: "Painting.",
    size: "tall",
    cardType: "expander",
  },
  {
    id: 12,
    title: "Fish",
    category: "paintings",
    type: "Painting",
    image: "/images/peces.jpg",
    description: "Painting.",
    size: "normal",
    cardType: "expander",
  },
  {
    id: 13,
    title: "Sadness",
    category: "paintings",
    type: "Painting",
    image: "/images/tristeza.jpg",
    description: "Painting.",
    size: "normal",
    cardType: "expander",
  },
  {
    id: 14,
    title: "Omniman",
    category: "paintings",
    type: "Painting",
    image: "/images/omniman.jpg",
    description: "Painting.",
    size: "wide",
    cardType: "expander",
  },
  {
    id: 15,
    title: "Watercolour Tattoos",
    category: "tattoos",
    type: "Tattoo",
    image: "/images/tattoos/acuarela/portada.jpg",
    description: "Watercolour-style tattoos.",
    size: "normal",
    cardType: "slider",
    images: ["/images/tattoos/acuarela/portada.jpg", "/images/tattoos/acuarela/20240929_163147.jpg"],
  },
  {
    id: 16,
    title: "Anime Tattoos",
    category: "tattoos",
    type: "Tattoo",
    image: "/images/tattoos/anime/portada.jpg",
    description: "Anime-style tattoos.",
    size: "tall",
    cardType: "slider",
    images: [
      "/images/tattoos/anime/portada.jpg",
      "/images/tattoos/anime/20240127_192454.jpg",
      "/images/tattoos/anime/20250111_144822.jpg",
      "/images/tattoos/anime/IMG_20211215_215305572_HDR.jpg",
      "/images/tattoos/anime/IMG_20211220_181339245.jpg",
    ],
  },
  {
    id: 17,
    title: "Blackwork",
    category: "tattoos",
    type: "Tattoo",
    image: "/images/tattoos/blackwork/portada.jpg",
    description: "Blackwork tattoos.",
    size: "normal",
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
    id: 18,
    title: "Colour",
    category: "tattoos",
    type: "Tattoo",
    image: "/images/tattoos/color/portada.jpg",
    description: "Full-colour tattoos.",
    size: "normal",
    cardType: "slider",
    images: [
      "/images/tattoos/color/portada.jpg",
      "/images/tattoos/color/20250201_192221.jpg",
      "/images/tattoos/color/20250815_181741.jpg",
      "/images/tattoos/color/IMG_20220105_175759657.jpg",
    ],
  },
  {
    id: 19,
    title: "Dotwork",
    category: "tattoos",
    type: "Tattoo",
    image: "/images/tattoos/puntillismo/portada.jpg",
    description: "Dotwork tattoos.",
    size: "normal",
    cardType: "slider",
    images: [
      "/images/tattoos/puntillismo/portada.jpg",
      "/images/tattoos/puntillismo/20250205_224747.jpg",
      "/images/tattoos/puntillismo/20250726_155455.jpg",
    ],
  },
  {
    id: 27,
    title: "Mixed Styles",
    category: "tattoos",
    type: "Tattoo",
    image: "/images/tattoos/varios/portada.JPG",
    description: "Assorted tattoo work.",
    size: "normal",
    cardType: "slider",
    images: [
      "/images/tattoos/varios/portada.JPG",
      "/images/tattoos/varios/20231223_180947.jpg",
      "/images/tattoos/varios/20250426_124030.jpg",
    ],
  },
]

const personalCategories = [
  { id: "digital", label: "Digital" },
  { id: "paintings", label: "Paintings" },
  { id: "tattoos", label: "Tattoos" },
]

// Herramientas — sin niveles inventados
const tools = [
  { name: "After Effects", badge: "Ae" },
  { name: "Premiere Pro", badge: "Pr" },
  { name: "Audition", badge: "Au" },
  { name: "Photoshop", badge: "Ps" },
  { name: "Illustrator", badge: "Ai" },
  { name: "Cinema 4D", badge: "C4" },
  { name: "Figma", badge: "Fg" },
  { name: "Procreate", badge: "Pc" },
  { name: "CapCut", badge: "Cc" },
  { name: "Canva", badge: "Cv" },
  { name: "HTML / CSS", badge: "<>" },
]

const experience = [
  {
    period: "Jul 2025 — Present",
    role: "Content Analyst",
    org: "MRM · McCann Worldgroup",
    detail:
      "Building and publishing pages for global brands under strict brand guidelines: 250+ pages in Sitecore for L'Oréal Germany and Switzerland (Garnier, L'Oréal Paris, Maybelline, Essie, Mixa) and 150+ pages in Adobe Experience Manager for Buick, Cadillac, Chevrolet and GMC (General Motors). Reusable templates, multi-language versioning, image editing and optimisation.",
  },
  {
    period: "2025 — 2026",
    role: "Freelance Designer & Video Editor",
    org: "Hot House · Estética Jaz · Cabotia · Vic Mielke · Miss Lupe",
    detail:
      "Short-form video editing, motion graphics, ad campaigns and visual identity for independent clients.",
  },
  {
    period: "Aug 2023 — Jul 2025",
    role: "QA Analyst",
    org: "MRM · McCann Worldgroup",
    detail:
      "QA on 500+ web pages and email campaigns. Automated repetitive checks and wrote templates and documentation.",
  },
  {
    period: "Aug 2019 — Aug 2023",
    role: "Visual Content Creator",
    org: "Buenos Aires City Government",
    detail:
      "Educational materials, infographics and graphic pieces for training programmes with 500+ participants (Public Space & Urban Hygiene).",
  },
  {
    period: "Since 2024",
    role: "Multimedia Design student",
    org: "Universidad Da Vinci · Buenos Aires",
    detail: "In progress.",
  },
]

const tickerItems = [
  "BRANDING", "MOTION DESIGN", "UX/UI", "VIDEO EDITING", "3D",
  "SOUND DESIGN", "ILLUSTRATION", "WEB DESIGN", "GENERATIVE AI", "BRAND ASSETS",
]

// Etiqueta del CTA según el tipo de card
function ctaLabel(work: Work) {
  if (work.cardType === "video") return "Play"
  if (work.cardType === "link") return "View on Instagram"
  if (work.cardType === "slider") return "View gallery"
  return "View project"
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
        <p className="text-sm text-muted mt-1">Click an image to zoom</p>
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

// Lightbox de las piezas de Estética Jaz: carruseles de Instagram y posts sueltos
function JazModal({ piece, onClose }: { piece: JazPiece; onClose: () => void }) {
  const [i, setI] = useState(0)
  const total = piece.slides.length

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "unset" }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") setI((p) => (p + 1) % total)
      if (e.key === "ArrowLeft") setI((p) => (p - 1 + total) % total)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose, total])

  return (
    <div className="jaz-modal" onClick={onClose}>
      <div className="jaz-sheet" onClick={(e) => e.stopPropagation()}>
        <header className="jaz-head">
          <div>
            <span className="eyebrow">// ESTÉTICA JAZ · {total > 1 ? "CARRUSEL" : "POST"}</span>
            <h3>{piece.title}</h3>
          </div>
          <button className="jaz-x" onClick={onClose} aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </header>

        <div className="jaz-stage">
          {total > 1 && (
            <button
              className="jaz-nav prev"
              onClick={() => setI((p) => (p - 1 + total) % total)}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          <img src={piece.slides[i]} alt={`${piece.title} — slide ${i + 1} of ${total}`} />

          {total > 1 && (
            <button
              className="jaz-nav next"
              onClick={() => setI((p) => (p + 1) % total)}
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {total > 1 && (
          <footer className="jaz-foot">
            <span className="jaz-count">{i + 1} / {total}</span>
            <div className="jaz-dots">
              {piece.slides.map((src, n) => (
                <button
                  key={src}
                  className={n === i ? "on" : ""}
                  onClick={() => setI(n)}
                  aria-label={`Slide ${n + 1}`}
                />
              ))}
            </div>
          </footer>
        )}
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
                View full project <ExternalLink className="w-5 h-5" />
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
              Your browser does not support the video tag.
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

// Tarjeta flip para los grids de trabajo
function WorkCard({ work, idx, onOpen }: { work: Work; idx: number; onOpen: (w: Work) => void }) {
  const sizeClass =
    work.size === "wide" ? "wide" : work.size === "full" ? "full" : work.size === "tall" ? "tall" : ""
  const dir = idx % 2 === 0 ? "from-l" : "from-r"
  const cover = work.coverImage || work.image
  const isLocalVideo = work.cardType === "video" && work.video && !work.youtubeId

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
                preload="metadata"
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
            <span className="cat">{String(idx + 1).padStart(2, "0")} · {work.type}</span>
            <h3>{work.title}</h3>
            <p>{work.description}</p>
          </div>
          <span className="go">{ctaLabel(work)} <b>↗</b></span>
        </div>
      </div>
    </div>
  )
}

// Slider comparador antes/después (arrastrable)
function BeforeAfterSlider({ before, after, tag }: { before: string; after: string; tag: string }) {
  const [pos, setPos] = useState(50)
  const ref = useRef<HTMLDivElement>(null)
  const setFromX = (clientX: number) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)))
  }
  // El divisor sigue al cursor con solo pasar por encima (y al tocar/arrastrar en móvil).
  // Queda donde se deja el mouse (no vuelve al centro) para poder ver la imagen completa.
  const onMove = (e: React.PointerEvent) => setFromX(e.clientX)
  const onDown = (e: React.PointerEvent) => {
    ref.current?.setPointerCapture(e.pointerId)
    setFromX(e.clientX)
  }
  return (
    <div
      className="ba reveal"
      ref={ref}
      onPointerMove={onMove}
      onPointerDown={onDown}
    >
      <img className="ba-img" src={after} alt="After — AI retouch" loading="lazy" draggable={false} />
      <img
        className="ba-img ba-before"
        src={before}
        alt="Before — original photo"
        loading="lazy"
        draggable={false}
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />
      <span className="ba-cat">{tag}</span>
      <span className="ba-tag ba-tag-b">Before</span>
      <span className="ba-tag ba-tag-a">After</span>
      <div className="ba-divider" style={{ left: `${pos}%` }}>
        <span className="ba-grip">
          <b>‹</b>
          <b>›</b>
        </span>
      </div>
    </div>
  )
}

const IA_PAIRS = [
  { before: "/images/vic-mielke/antes2.webp", after: "/images/vic-mielke/despues2.webp", tag: "Circuits" },
  { before: "/images/vic-mielke/antes3.webp", after: "/images/vic-mielke/despues3.webp", tag: "Energy" },
  { before: "/images/vic-mielke/antes1.webp", after: "/images/vic-mielke/despues1.webp", tag: "Pedestal" },
  { before: "/images/vic-mielke/antes4.webp", after: "/images/vic-mielke/despues4.webp", tag: "Deconstruction" },
]

function BeforeAfterCarousel() {
  const [i, setI] = useState(0)
  const pages: (typeof IA_PAIRS)[] = []
  for (let k = 0; k < IA_PAIRS.length; k += 2) pages.push(IA_PAIRS.slice(k, k + 2))
  const n = pages.length
  const go = (d: number) => setI((prev) => (prev + d + n) % n)
  return (
    <div className="ba-carousel reveal">
      <div className="ba-stage">
        <button className="ba-nav prev" onClick={() => go(-1)} aria-label="Previous">‹</button>
        <div className="ba-viewport">
          <div className="ba-track" style={{ transform: `translateX(-${i * 100}%)` }}>
            {pages.map((pg, idx) => (
              <div className="ba-slide" key={idx}>
                <div className="ba-pair">
                  {pg.map((p, j) => (
                    <BeforeAfterSlider key={j} before={p.before} after={p.after} tag={p.tag} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="ba-nav next" onClick={() => go(1)} aria-label="Next">›</button>
      </div>
      <div className="ba-dots">
        {pages.map((_, idx) => (
          <button
            key={idx}
            className={`ba-dot ${idx === i ? "on" : ""}`}
            onClick={() => setI(idx)}
            aria-label={`Go to page ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function Portfolio() {
  const [personalFilter, setPersonalFilter] = useState("digital")
  const [motionFilter, setMotionFilter] = useState("all")
  const [studyFilter, setStudyFilter] = useState("all")
  const [activeSection, setActiveSection] = useState("")
  const [selectedWork, setSelectedWork] = useState<Work | null>(null)
  const [jazPiece, setJazPiece] = useState<JazPiece | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  // Experiencia colapsada: 2 puestos visibles, el resto detrás de "Show all"
  const [expOpen, setExpOpen] = useState(false)
  const sbarRef = useRef<HTMLDivElement>(null)
  const shudRef = useRef<HTMLSpanElement>(null)
  const activeRef = useRef("")

  const filteredPersonal = personalWorks.filter((w) => w.category === personalFilter)

  /* ---- Motion: qué bloque se ve según el filtro ---- */
  const soundPieces = motionStudy.filter((w) => w.track === "sound")
  const coursePieces = motionStudy.filter((w) => w.track !== "sound")
  const showMotionFeature = motionFilter === "all" || motionFilter === "study"
  const showMotionClient = motionFilter === "all" || motionFilter === "client"
  const motionGrid =
    motionFilter === "client" ? [] :
    motionFilter === "sound" ? soundPieces :
    motionFilter === "study" ? coursePieces :
    motionStudy
  // El destacado (Módulo Sanitario) es cursada, y el posteo de Hot House es de cliente:
  // por eso los conteos no salen de los arrays sueltos.
  const motionCounts: Record<string, number> = {
    all: motionClient.length + 1 + motionStudy.length + 1,
    client: motionClient.length + 1,
    sound: soundPieces.length,
    study: coursePieces.length + 1,
  }

  const filteredStudy =
    studyFilter === "all" ? studyWorks : studyWorks.filter((w) => w.track === studyFilter)
  const studyCounts: Record<string, number> = {
    all: studyWorks.length,
    branding: studyWorks.filter((w) => w.track === "branding").length,
    web: studyWorks.filter((w) => w.track === "web").length,
    image: studyWorks.filter((w) => w.track === "image").length,
  }

  const handleCardClick = (work: Work) => {
    if (work.cardType === "link" && work.link) {
      window.open(work.link, "_blank", "noopener,noreferrer")
      return
    }
    if (["expander", "slider", "video", "scrollable"].includes(work.cardType || "")) {
      setSelectedWork(work)
    }
  }

  // Reveal al entrar en pantalla (re-observa al cambiar de filtro o expandir la experiencia)
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
  }, [personalFilter, motionFilter, studyFilter, expOpen])

  // Parallax + scroll bar + HUD + auras (una vez)
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const parY = Array.from(document.querySelectorAll<HTMLElement>("[data-par]"))
    const parX = Array.from(document.querySelectorAll<HTMLElement>("[data-parx]"))
    const bgfx = document.getElementById("bgfx")
    const auras = bgfx ? (Array.from(bgfx.children) as HTMLElement[]) : []
    let ticking = false

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
        // `off` es la distancia del elemento al centro de la pantalla, y no tiene tope:
        // para un elemento que está 10 pantallas más abajo vale miles de px. Sin acotarlo,
        // los títulos terminan desplazados cientos de px y ensanchan la página (scroll
        // horizontal en mobile). Fuera de la pantalla el parallax no se ve, así que
        // limitarlo a ±media pantalla no cambia nada visible y elimina el desborde.
        const clamp = (v: number) => Math.max(-mid, Math.min(mid, v))
        parY.forEach((el) => {
          const r = el.getBoundingClientRect(), off = clamp(r.top + r.height / 2 - mid)
          const sp = parseFloat(el.dataset.par || "0"), base = el.dataset.base || ""
          el.style.transform = `translateY(${(off * sp).toFixed(1)}px) ${base}`
        })
        parX.forEach((el) => {
          const r = el.getBoundingClientRect(), off = clamp(r.top + r.height / 2 - mid)
          const sp = parseFloat(el.dataset.parx || "0")
          el.style.transform = `translateX(${(off * sp).toFixed(1)}px)`
        })
      }
      if (sbarRef.current) sbarRef.current.style.width = p * 100 + "%"
      if (shudRef.current) shudRef.current.textContent = String(Math.round(p * 100)).padStart(3, "0") + "%"

      // Sección activa: la última cuyo tope ya cruzó el 38% de la pantalla.
      // Queda vacío en el hero (ninguna cruzó todavía) para no encender WORK antes de tiempo.
      let cur = ""
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= vh * 0.38) cur = s.id
      }
      // El scroll dispara esto en cada frame: sin este guard, un setState por frame.
      if (cur !== activeRef.current) {
        activeRef.current = cur
        setActiveSection(cur)
      }
    }
    const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame) } }
    window.addEventListener("scroll", req, { passive: true })
    window.addEventListener("resize", req)
    frame()
    return () => {
      window.removeEventListener("scroll", req)
      window.removeEventListener("resize", req)
    }
  }, [])

  return (
    <>
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
      {selectedWork && selectedWork.cardType === "scrollable" && <ScrollableModal work={selectedWork} onClose={() => setSelectedWork(null)} />}
      {jazPiece && <JazModal piece={jazPiece} onClose={() => setJazPiece(null)} />}

      {/* NAV / HUD */}
      <header className="site-header">
        <div className="nav">
          <a href="#top" className="brand brand-name">
            <span>NATALIA ESPAIN</span>
          </a>
          <nav className="links">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`}
                className={activeSection === s.id ? "on" : ""}
                aria-current={activeSection === s.id ? "true" : undefined}>
                {s.label}
              </a>
            ))}
          </nav>
          <span className="nav-status" aria-hidden="true"><i className="st-dot" />BUE · ONLINE</span>
          <button className="menu-btn" onClick={() => setMobileMenuOpen((v) => !v)}>MENU</button>
        </div>
        <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`}
              className={activeSection === s.id ? "on" : ""}
              onClick={() => setMobileMenuOpen(false)}>
              {s.label}
            </a>
          ))}
        </div>
      </header>

      {/* Índice lateral — dónde estoy y cuánto falta. Se oculta en pantallas chicas. */}
      <nav className="sec-rail" aria-label="Section index">
        {SECTIONS.map((s, i) => (
          <a key={s.id} href={`#${s.id}`}
            className={activeSection === s.id ? "on" : ""}
            aria-current={activeSection === s.id ? "true" : undefined}>
            <i aria-hidden="true" />
            <span className="n">{String(i + 1).padStart(2, "0")}</span>
            <span className="t">{s.short}</span>
          </a>
        ))}
      </nav>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="sec-deco" aria-hidden="true">
          {/* marco HUD: esquinas tipo visor */}
          <span className="g-corner" style={{ left: 18, top: 100 }} />
          <span className="g-corner gold" style={{ right: 18, top: 100, transform: "rotate(90deg)" }} />
          <span className="g-corner" style={{ right: 18, bottom: 26, transform: "rotate(180deg)" }} />
          <span className="g-corner gold" style={{ left: 18, bottom: 26, transform: "rotate(270deg)" }} />
          <span className="g-grid tl" />
          <span className="g-ring" style={{ width: 440, height: 440, right: "4%", top: "12%", opacity: 0.6 }} />
          <span className="g-ring spin dash gold" style={{ width: 200, height: 200, left: "40%", bottom: "8%" }} />
          <span className="g-tri orange" style={{ left: "47%", top: 150, transform: "rotate(18deg)" }} />
          <span className="g-sq diamond" style={{ width: 18, height: 18, right: "10%", bottom: "14%" }} />
          <span className="g-plus violet" style={{ left: "3%", top: "40%" }} />
          <span className="g-dot gold" style={{ right: "6%", top: "26%" }} />
          <span className="g-dot orange" style={{ left: "36%", top: "20%" }} />
          <span className="g-dot" style={{ left: "10%", bottom: "12%" }} />
          <span className="g-line" style={{ width: 230, left: -50, bottom: "22%" }} />
          <span className="g-line v" style={{ height: 150, right: 64, top: "14%" }} />
        </div>
        <span className="hud-note" style={{ left: 44, top: 104 }}>34.60°S · 58.38°W</span>
        <span className="hud-note" style={{ right: 44, bottom: 30, textAlign: "right" }}>PORTFOLIO · V.2026</span>
        {/* terreno de partículas — fondo interactivo del banner */}
        <HeroWaves />
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-left reveal">
              <div className="hero-meta">
                <span className="tag"><span className="dot" />DESIGN</span>
                <span className="tag mono">MOTION</span>
                <span className="tag mono">WEB</span>
                <span className="tag mono">3D</span>
              </div>
              <h1>NATALIA<span className="l2">ESPAIN</span></h1>
              <div className="role">Multimedia Designer</div>
            </div>

            {/* texto al lado del nombre — el hero es 100% tipográfico */}
            <div className="hero-right copy reveal">
              <p className="bio">
                I design across media: <b>branding, motion graphics, video, web and 3D</b>. Currently Content Analyst at <b>MRM (McCann Worldgroup)</b>, where I build and publish pages for global brands — L&apos;Oréal, Maybelline, Garnier, Buick, Cadillac, Chevrolet, GMC — working inside strict brand guidelines.
              </p>
              <p className="bio" style={{ marginTop: "14px" }}>
                Alongside that, I take on freelance projects end to end — <b>visual identities, ad campaigns, short-form video and interactive 3D websites</b> — with the Adobe suite, Cinema 4D and Figma.
              </p>
              <div className="tool-strip">
                {tools.slice(0, 6).map((t) => (
                  <span className="tool-chip" key={t.name} title={t.name}>{t.badge}</span>
                ))}
              </div>
              <div className="hero-cta">
                <a href="#work" className="btn primary">See my work <span aria-hidden="true">↘</span></a>
                {/* `download` tiene que llevar el nombre explícito: sin valor, algunos
                    navegadores guardan el archivo con un UUID y sin extensión .pdf. */}
                {CV_URL && (
                  <a href={CV_URL} className="btn ghost" download={CV_FILENAME}>
                    Download CV
                  </a>
                )}
                <a href="#contact" className="btn ghost">Get in touch</a>
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

      {/* SELECTED WORK — clientes */}
      <section id="work" className="wrap">
        <div className="sec-deco" aria-hidden="true">
          <span className="g-grid tl" />
          <span className="g-ring gold" style={{ width: 340, height: 340, left: -150, top: -80 }} />
          <span className="g-ring dash" style={{ width: 180, height: 180, left: -40, top: 40 }} />
          <span className="g-sq diamond" style={{ width: 22, height: 22, right: "14%", top: 90 }} />
          <span className="g-sq orange" style={{ width: 54, height: 34, right: "26%", top: 30 }} />
          <span className="g-plus violet" style={{ right: "8%", top: "38%" }} />
          <span className="g-dot orange" style={{ left: "30%", top: 70 }} />
          <span className="g-dot" style={{ right: "35%", bottom: "16%" }} />
          <span className="g-line v" style={{ height: 160, right: 30, top: "20%" }} />
        </div>
        <div className="sec-head">
          <div className="l">
            <span className="eyebrow">// COMMISSIONED PROJECTS</span>
            <h2 data-parx="0.05">SELECTED <em>WORK</em></h2>
          </div>
          <span className="idx reveal">[ CLIENTS / 2025–2026 ]</span>
        </div>

        <a
          href="https://magenta-churros-b179d9.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="spotlight reveal"
        >
          <div className="spotlight-info">
            <span className="tag"><span className="dot" />LIVE</span>
            <h3>Miss Lupe</h3>
            <p>
              Website for <b>Miss Lupe</b> (DJ · producer · singer), with <b>3D objects you can rotate in real time</b>. Design, build and 3D modelling — made together with a fellow student.
            </p>
            <div className="spot-tools">
              <i>Three.js</i><i>WebGL</i><i>Web Design</i><i>3D Modelling</i>
            </div>
            <span className="spot-cta">Open the site <b>↗</b></span>
          </div>

          <div className="browser">
            <div className="browser-view">
              <Image
                src="/images/misslupe-banner.png"
                alt="Miss Lupe website banner"
                fill
                className="browser-img"
                sizes="(max-width: 900px) 100vw, 55vw"
              />
            </div>
          </div>
        </a>

        {/* Estética Jaz — segundo spotlight, espejado, acento dorado */}
        <div className="spotlight jaz reveal">
          <div className="browser jaz-media">
            <video
              src="/videos/video_booster_corporal.mp4"
              autoPlay
              muted
              loop
              playsInline
              controls
            />
          </div>

          <div className="spotlight-info">
            <span className="eyebrow">// ESTÉTICA JAZ · 2025</span>
            <h3>Estética Jaz</h3>
            <p>
              Meta Ads campaign and visual assets for a beauty clinic — including the <b>Booster</b> product video (motion graphics + AI-generated footage) and a system of carousels and posts for Instagram.
            </p>
            <div className="metric"><b>+40%</b><span>in sales</span></div>
            {JAZ_PIECES.length > 0 && (
              <>
                <div className="jaz-grid">
                  {JAZ_PIECES.map((piece) => (
                    <button
                      key={piece.title}
                      className="jaz-thumb"
                      onClick={() => setJazPiece(piece)}
                      aria-label={`Open ${piece.title}`}
                    >
                      <img src={piece.slides[0]} alt={piece.title} loading="lazy" />
                      {piece.slides.length > 1 && (
                        <span className="jaz-badge">
                          <Layers className="w-3 h-3" />
                          {piece.slides.length}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <span className="jaz-hint">Click a piece to open it · carousels swipe through every slide</span>
              </>
            )}
            <div className="spot-tools"><i>Meta Ads</i><i>After Effects</i><i>Illustrator</i></div>
          </div>
        </div>

        <div className="client-grid">
          {/* Cabotia */}
          <article className="client reveal from-l">
            <span className="eyebrow">// CABOTIA · AI STARTUP · 2025</span>
            <h3>Visual identity</h3>
            <p>
              Full visual identity for an AI startup: logo, colour palette and visual system.
            </p>
            <a className="client-cta" href="https://www.behance.net/nataliaespain" target="_blank" rel="noopener noreferrer">
              See it on Behance <b>↗</b>
            </a>
            <div className="spot-tools"><i>Illustrator</i><i>Brand System</i></div>
          </article>

          {/* Vic Mielke → ancla a la sección de abajo */}
          <article className="client reveal from-r">
            <span className="eyebrow">// VIC MIELKE · DJ · 2025</span>
            <h3>Generative AI visuals</h3>
            <p>
              A futuristic visual world for an emerging DJ&apos;s Instagram, generated from her own photo shoot — same body, another dimension.
            </p>
            <a className="client-cta" href="#ai">See the before / after <b>↓</b></a>
            <div className="spot-tools"><i>Generative AI</i><i>Photoshop</i></div>
          </article>
        </div>
      </section>

      {/* VIC MIELKE — antes/después */}
      <section id="ai" className="wrap">
        <div className="ia-deco" aria-hidden="true">
          <span className="ia-ring ia-ring1" />
          <span className="ia-ring ia-ring2" />
          <span className="ia-ring ia-ring3" />
          <span className="ia-grid2" />
          <span className="ia-plus" />
          <span className="ia-dot d1" />
          <span className="ia-dot d2" />
          <span className="ia-dot d3" />
          <span className="ia-line li1" />
          <span className="ia-line li2" />
        </div>

        <div className="sec-head">
          <div className="l">
            <span className="eyebrow">// FOR VIC MIELKE · EMERGING DJ</span>
            <h2 data-parx="0.05">GENERATIVE <em>AI</em></h2>
          </div>
          <span className="idx reveal">[ BEFORE / AFTER · 2025 ]</span>
        </div>

        <p className="ia-intro reveal">
          <b>Vic Mielke</b>, an emerging DJ, needed a futuristic visual identity for her Instagram. Starting from a photo shoot, I generated a whole visual world for her with AI — same body, another dimension. <span>Hover over each image to reveal the before and after.</span>
        </p>

        <BeforeAfterCarousel />

        <div className="ia-featured reveal">
          <div className="ia-feat-head">
            <span className="eyebrow">// ONE SHOT, TWO UNIVERSES</span>
            <p>From the same studio photo, two possible outcomes.</p>
          </div>
          <div className="ia-trip">
            <figure className="ia-shot">
              <img src="/images/vic-mielke/antes.webp" alt="Vic Mielke — original studio shot" loading="lazy" />
              <figcaption><span className="ia-cap ia-cap-b">Before</span></figcaption>
            </figure>
            <figure className="ia-shot ia-shot-after">
              <img src="/images/vic-mielke/despues.webp" alt="Vic Mielke — AI result, option A" loading="lazy" />
              <figcaption><span className="ia-cap ia-cap-a">After · A</span></figcaption>
            </figure>
            <figure className="ia-shot ia-shot-after">
              <img src="/images/vic-mielke/despues-opcion.webp" alt="Vic Mielke — AI result, option B" loading="lazy" />
              <figcaption><span className="ia-cap ia-cap-a">After · B</span></figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* MOTION — con el Módulo Sanitario como pieza destacada */}
      <section id="motion" className="wrap">
        <div className="sec-deco" aria-hidden="true">
          <span className="g-grid br" />
          <span className="g-ring spin dash orange" style={{ width: 260, height: 260, right: -90, top: 10 }} />
          <span className="g-ring" style={{ width: 420, height: 420, right: -190, top: -60 }} />
          <span className="g-tri" style={{ left: "6%", top: 120, transform: "rotate(-14deg)" }} />
          <span className="g-plus" style={{ left: "38%", top: 40 }} />
          <span className="g-dot gold" style={{ left: "12%", top: "42%" }} />
          <span className="g-dot" style={{ right: "20%", bottom: "10%" }} />
          <span className="g-line" style={{ width: 190, left: -40, top: "30%" }} />
        </div>
        <div className="sec-head">
          <div className="l">
            <span className="eyebrow">// ANIMATION · VIDEO EDITING · SOUND</span>
            <h2 data-parx="0.05">MO<em>TION</em></h2>
          </div>
          <span className="idx reveal">[ {motionCounts.all} PIECES / AE · PR · C4D ]</span>
        </div>

        <div className="filters">
          {MOTION_FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setMotionFilter(f.id)}
              className={`filter-pill ${motionFilter === f.id ? "active" : ""}`}
            >
              {f.label} <i className="pill-n">{motionCounts[f.id]}</i>
            </button>
          ))}
        </div>

        {/* Pieza destacada — player embebido, no card */}
        {showMotionFeature && (
        <div className="motion-feature reveal">
          <div className="mf-view">
            <iframe
              src={`https://www.youtube.com/embed/${MOTION_FEATURE.youtubeId}?rel=0&modestbranding=1`}
              title={MOTION_FEATURE.title}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="mf-info">
            <span className="eyebrow">// FEATURED · NGO PROJECT</span>
            <h3>{MOTION_FEATURE.title}</h3>
            <p>{MOTION_FEATURE.description}</p>
            <p className="mf-note">University project.</p>
            <div className="spot-tools"><i>After Effects</i><i>Illustrator</i></div>
          </div>
        </div>
        )}

        {showMotionClient && (<>
        <h3 className="sub-head reveal">Client work</h3>
        <div className="hh-pair">
          <div className="hh-pair-media">
            {motionClient.map((work, idx) => (
              <WorkCard key={work.id} work={work} idx={idx} onOpen={handleCardClick} />
            ))}
          </div>
          {/* Hot House — índice de reels, al lado del reel destacado */}
          <article className="client reveal from-r">
            <span className="eyebrow">// HOT HOUSE STREAMING · 2026</span>
            <h3>Short-form video editing</h3>
            <p>
              Highlights, Reels and promo clips cut in <b>Premiere Pro</b>, plus graphics in Illustrator, for a streaming channel.
            </p>
            <div className="metric-row">
              <div className="metric"><b>2×</b><span>followers</span></div>
              <div className="metric"><b>40k</b><span>organic views</span></div>
            </div>
            <div className="client-links">
              {HOTHOUSE_REELS.map((url, i) => (
                <a key={url} href={url} target="_blank" rel="noopener noreferrer">
                  Reel {String(i + 1).padStart(2, "0")} ↗
                </a>
              ))}
            </div>
            <div className="spot-tools"><i>Premiere Pro</i><i>Illustrator</i></div>
          </article>
        </div>

        {/* Hot House — pieza gráfica destacada: carrusel de recomendaciones */}
        <div className="hh-post">
          <WorkCard work={HOTHOUSE_POST} idx={0} onOpen={handleCardClick} />
          <article className="client reveal from-r">
            <span className="eyebrow">// HOT HOUSE · WEEKEND PICKS</span>
            <h3>Recommendations carousel</h3>
            <p>
              A recurring format for the channel: the weekend&apos;s best dates, one card each, with
              venue, line-up and set time. Cover first, so the post reads at a glance in the feed.
            </p>
            <div className="hh-slides">
              {(HOTHOUSE_POST.images || []).slice(1).map((src, i) => (
                <button key={src} type="button" onClick={() => handleCardClick(HOTHOUSE_POST)}
                  aria-label={`Open the carousel on slide ${i + 2}`}>
                  <img src={src} alt={`Weekend picks carousel, slide ${i + 2}`} loading="lazy" />
                </button>
              ))}
            </div>
            <a className="client-cta" href={HOTHOUSE_POST.link} target="_blank" rel="noopener noreferrer">
              View the post on Instagram <b>↗</b>
            </a>
          </article>
        </div>
        </>)}

        {motionGrid.length > 0 && (<>
        <h3 className="sub-head reveal">
          {motionFilter === "sound" ? "Sound design" : "Studies & personal practice"}
          <span className="sub-note">Coursework and self-initiated pieces — not client commissions.</span>
        </h3>
        <div className="work">
          {motionGrid.map((work, idx) => (
            <WorkCard key={work.id} work={work} idx={idx} onOpen={handleCardClick} />
          ))}
        </div>
        </>)}
      </section>

      {/* BRANDS — producción a escala en MRM/McCann */}
      <section id="brands" className="wrap">
        <div className="sec-deco" aria-hidden="true">
          <span className="g-ring" style={{ width: 380, height: 380, right: -160, bottom: -140 }} />
          <span className="g-ring spin dash gold" style={{ width: 210, height: 210, right: -30, bottom: -50 }} />
          <span className="g-sq" style={{ width: 64, height: 40, left: "8%", top: 50, opacity: 0.4 }} />
          <span className="g-sq diamond gold" style={{ width: 18, height: 18, left: "16%", top: 130 }} />
          <span className="g-tri orange" style={{ right: "22%", top: 60, transform: "rotate(20deg)" }} />
          <span className="g-plus" style={{ left: "44%", bottom: 60 }} />
          <span className="g-dot" style={{ left: "5%", bottom: "24%" }} />
          <span className="g-dot gold" style={{ right: "12%", top: "26%" }} />
          <span className="g-line" style={{ width: 220, right: -50, top: "16%" }} />
        </div>
        <div className="sec-head">
          <div className="l">
            <span className="eyebrow">// MRM · McCANN WORLDGROUP</span>
            <h2 data-parx="-0.05">BRANDS AT <em>SCALE</em></h2>
          </div>
          <span className="idx reveal">[ 2023 — PRESENT ]</span>
        </div>

        <p className="brands-intro reveal">
          My day job is production under brand guidelines: building, localising and publishing pages for global brands, with reusable templates and multi-language versioning — and editing and optimising the imagery that goes into them.
        </p>

        <div className="bstats">
          <div className="bstat reveal from-l">
            <b>250+</b>
            <span className="bstat-k">pages in Sitecore</span>
            <span className="bstat-v">L&apos;Oréal Germany &amp; Switzerland — Garnier, L&apos;Oréal Paris, Maybelline, Essie, Mixa</span>
          </div>
          <div className="bstat reveal">
            <b>150+</b>
            <span className="bstat-k">pages in Adobe Experience Manager</span>
            <span className="bstat-v">General Motors — Buick, Cadillac, Chevrolet, GMC</span>
          </div>
          <div className="bstat reveal from-r">
            <b>500+</b>
            <span className="bstat-k">pages QA&apos;d</span>
            <span className="bstat-v">Web pages and email campaigns, as QA Analyst (2023–2025)</span>
          </div>
        </div>

        <div className="certs reveal">
          <span className="eyebrow">// CERTIFICATIONS</span>
          <div className="cert-list">
            {CERTS.map((c) => (
              <div className="cert" key={c.name}>
                <span className="cert-name">{c.name}</span>
                <span className="cert-meta">{c.issuer} · {c.year}</span>
                {c.verify && (
                  <a href={c.verify} target="_blank" rel="noopener noreferrer" className="cert-verify">
                    Verify ↗
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {MRM_SHOTS.length > 0 && (
          <div className="mrm-shots reveal">
            {MRM_SHOTS.map((s) => (
              <figure key={s.src}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" title="Open live page">
                  <img src={s.src} alt={s.caption} loading="lazy" />
                </a>
                <figcaption>
                  {s.caption}{" "}
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="mrm-live">
                    Live ↗
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>

      {/* ABOUT — herramientas + experiencia */}
      <section id="about" className="wrap">
        <div className="sec-deco" aria-hidden="true">
          <span className="g-grid br" />
          <span className="g-ring dash" style={{ width: 300, height: 300, left: -130, top: "34%" }} />
          <span className="g-ring orange" style={{ width: 150, height: 150, left: -20, top: "48%", opacity: 0.7 }} />
          <span className="g-tri gold" style={{ right: "10%", top: 40, transform: "rotate(38deg)" }} />
          <span className="g-sq diamond" style={{ width: 20, height: 20, left: "40%", top: 90 }} />
          <span className="g-plus violet" style={{ right: "30%", bottom: 80 }} />
          <span className="g-dot orange" style={{ right: "6%", top: "50%" }} />
          <span className="g-dot" style={{ left: "22%", bottom: "12%" }} />
          <span className="g-line v" style={{ height: 140, left: 24, top: "8%" }} />
        </div>
        <div className="sec-head">
          <div className="l">
            <span className="eyebrow">// TOOLS &amp; EXPERIENCE</span>
            <h2 data-parx="0.05">A<em>BOUT</em></h2>
          </div>
          <span className="idx reveal">[ BUENOS AIRES / AR ]</span>
        </div>

        <div className="about-grid">
          <div className="spec reveal">
            <h4>Software</h4>
            <div className="tool-list">
              {tools.map((t) => (
                <div className="tool-row" key={t.name}>
                  <span className="name"><span className="badge">{t.badge}</span>{t.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="timeline">
            {(expOpen ? experience : experience.slice(0, 2)).map((e) => (
              <div className="tl-item reveal from-r" key={e.role + e.period}>
                <span className="tl-period">{e.period}</span>
                <h4>{e.role}</h4>
                <span className="tl-org">{e.org}</span>
                <p>{e.detail}</p>
              </div>
            ))}
            <button
              type="button"
              className="tl-toggle"
              onClick={() => setExpOpen((v) => !v)}
              aria-expanded={expOpen}
            >
              {expOpen ? "Show less ↑" : `Show all roles (${experience.length}) ↓`}
            </button>
          </div>
        </div>
      </section>

      {/* STUDIES & SPEC */}
      <section id="studies" className="wrap">
        <div className="sec-deco" aria-hidden="true">
          <span className="g-ring gold" style={{ width: 360, height: 360, right: -170, top: -100 }} />
          <span className="g-ring dash" style={{ width: 200, height: 200, right: -60, top: 20, opacity: 0.7 }} />
          <span className="g-sq orange" style={{ width: 30, height: 30, left: "10%", top: 60, transform: "rotate(12deg)" }} />
          <span className="g-tri" style={{ left: "28%", top: 34, transform: "rotate(-24deg)" }} />
          <span className="g-plus" style={{ left: "7%", bottom: "18%" }} />
          <span className="g-dot gold" style={{ right: "24%", top: "34%" }} />
          <span className="g-dot" style={{ left: "45%", bottom: "8%" }} />
          <span className="g-line" style={{ width: 170, left: -30, top: "44%" }} />
        </div>
        <div className="sec-head">
          <div className="l">
            <span className="eyebrow">// COURSEWORK &amp; SELF-INITIATED</span>
            <h2 data-parx="0.05">STUDIES <em>&amp; SPEC</em></h2>
          </div>
          <span className="idx reveal">[ NOT CLIENT WORK ]</span>
        </div>

        <p className="sub-note block reveal">
          Design projects made for university or on my own initiative. The brands here are fictional — they are exercises, not commissions.
        </p>

        <div className="filters">
          {STUDY_FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setStudyFilter(f.id)}
              className={`filter-pill ${studyFilter === f.id ? "active" : ""}`}
            >
              {f.label} <i className="pill-n">{studyCounts[f.id]}</i>
            </button>
          ))}
        </div>

        <div className="work">
          {filteredStudy.map((work, idx) => (
            <WorkCard key={work.id} work={work} idx={idx} onOpen={handleCardClick} />
          ))}
        </div>
      </section>

      {/* PERSONAL — Marandina */}
      <section id="personal" className="wrap">
        <div className="sec-deco" aria-hidden="true">
          <span className="g-grid tl" />
          <span className="g-ring spin dash orange" style={{ width: 240, height: 240, left: -90, bottom: -70 }} />
          <span className="g-ring" style={{ width: 400, height: 400, left: -180, bottom: -170 }} />
          <span className="g-tri gold" style={{ right: "16%", bottom: 90, transform: "rotate(-30deg)" }} />
          <span className="g-sq diamond gold" style={{ width: 16, height: 16, right: "8%", top: 70 }} />
          <span className="g-plus violet" style={{ left: "32%", top: 44 }} />
          <span className="g-dot orange" style={{ right: "40%", top: "22%" }} />
          <span className="g-dot" style={{ right: "10%", bottom: "30%" }} />
          <span className="g-line" style={{ width: 200, right: -40, bottom: "20%" }} />
        </div>
        <div className="sec-head">
          <div className="l">
            <span className="eyebrow">// MARANDINA · PERSONAL ILLUSTRATION PRACTICE</span>
            <h2 data-parx="-0.05">PER<em>SONAL</em></h2>
          </div>
          <span className="idx reveal">[ A HOBBY, NOT A BUSINESS ]</span>
        </div>

        <p className="sub-note block reveal">
          Illustration, painting and tattoo design I make for myself, under the name <b>Marandina</b>. It keeps my drawing sharp — it is not commissioned work.
        </p>

        <div className="filters">
          {personalCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setPersonalFilter(cat.id)}
              className={`filter-pill ${personalFilter === cat.id ? "active" : ""}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="work">
          {filteredPersonal.map((work, idx) => (
            <WorkCard key={work.id} work={work} idx={idx} onOpen={handleCardClick} />
          ))}
        </div>

        <a
          className="client-cta reveal"
          href="https://www.instagram.com/marandina.tt/"
          target="_blank"
          rel="noopener noreferrer"
        >
          More on Instagram — @marandina.tt <b>↗</b>
        </a>
      </section>

      {/* CONTACT */}
      <section id="contact" className="wrap">
        <div className="contact reveal">
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
            © 2026 · NATALIA ESPAIN <span className="star" style={{ ["--s" as string]: "12px", verticalAlign: "-2px" }} />
          </span>
          <div className="contact-in">
            <div>
              <h2>LET&apos;S<br /><span className="l2">WORK TOGETHER</span></h2>
              <p>
                Open to multimedia design roles — branding, motion, video, web or 3D. If you need visual assets produced at pace and on brand — get in touch.
              </p>
              <a href="mailto:nataliaespain97@gmail.com" className="btn primary">nataliaespain97@gmail.com <span aria-hidden="true">↗</span></a>
              {CV_URL && (
                <a href={CV_URL} className="btn ghost" download={CV_FILENAME} style={{ marginLeft: "12px" }}>
                  Download CV
                </a>
              )}
            </div>
            <div className="socials">
              <a className="social" href="mailto:nataliaespain97@gmail.com">
                <span className="social-k">EMAIL</span><span className="social-v">nataliaespain97</span><b className="social-go">↗</b>
              </a>
              <a className="social" href="https://www.linkedin.com/in/nataliaespain" target="_blank" rel="noopener noreferrer">
                <span className="social-k">LINKEDIN</span><span className="social-v">/nataliaespain</span><b className="social-go">↗</b>
              </a>
              <a className="social" href="https://www.behance.net/nataliaespain" target="_blank" rel="noopener noreferrer">
                <span className="social-k">BEHANCE</span><span className="social-v">/nataliaespain</span><b className="social-go">↗</b>
              </a>
              <a className="social" href="tel:+5491134249079">
                <span className="social-k">PHONE</span><span className="social-v">+54 11 3424 9079</span><b className="social-go">↗</b>
              </a>
            </div>
          </div>
        </div>

        <footer className="site-footer">
          <span>NATALIA ESPAIN © 2026</span>
          <span className="star" />
          <span>MULTIMEDIA DESIGN · BUENOS AIRES_AR</span>
        </footer>
      </section>
    </>
  )
}
