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
  title: "Natalia Espain/Artista multimedia",
  description:
    "Portfolio de Natalia Espain: diseño multimedia, pinturas, arte digital y tatuajes. Estudiante de Diseño Multimedia en Escuela Da Vinci.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/favicon.png",
        type: "image/png",
      },
    ],
    apple: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${roboto.variable} ${playfair.variable} ${spaceMono.variable}`}>
      <head></head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
