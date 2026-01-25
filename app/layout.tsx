import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display, Space_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
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
  title: "Natalia Espain — Artista Multidisciplinaria",
  description:
    "Portfolio de Natalia Espain: diseño multimedia, pinturas, arte digital y tatuajes. Estudiante de Diseño Multimedia en Escuela Da Vinci.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable} ${spaceMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
