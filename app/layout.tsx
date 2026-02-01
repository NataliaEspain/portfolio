import type React from "react"
import type { Metadata } from "next"
import { Roboto, Playfair_Display, Space_Mono } from "next/font/google"
import "./globals.css"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-playfair",
})

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-space-mono",
})

export const metadata: Metadata = {
  title: "Natalia Espain | Artista Multimedia",
  description:
    "Portfolio de Natalia Espain: diseño multimedia, pinturas, arte digital y tatuajes. Estudiante de Diseño Multimedia en Escuela Da Vinci.",
  keywords: ["diseño gráfico", "arte digital", "tatuajes", "pinturas", "portfolio", "Natalia Espain", "Marandina", "diseño multimedia"],
  authors: [{ name: "Natalia Espain" }],
  creator: "Natalia Espain",
  icons: {
    icon: [
      {
        url: "/favicon.png",
        type: "image/png",
      },
    ],
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://nataliaespain.vercel.app",
    siteName: "Natalia Espain Portfolio",
    title: "Natalia Espain | Artista Multimedia",
    description: "Diseño multimedia, pinturas, arte digital y tatuajes. Explorá mi trabajo creativo.",
    images: [
      {
        url: "/images/divino-portada.jpg",
        width: 1200,
        height: 630,
        alt: "Natalia Espain - Artista Multimedia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Natalia Espain | Artista Multimedia",
    description: "Diseño multimedia, pinturas, arte digital y tatuajes. Explorá mi trabajo creativo.",
    images: ["/images/divino-portada.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${roboto.variable} ${playfair.variable} ${spaceMono.variable} scroll-smooth`}>
      <head></head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
