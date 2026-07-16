import type React from "react"
import type { Metadata } from "next"
import { Anton, Space_Grotesk, Space_Mono } from "next/font/google"
import "./globals.css"

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-anton",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-grotesk",
})

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-mono",
})

const TITLE = "Natalia Espain | Multimedia Designer"
const DESCRIPTION =
  "Multimedia designer in Buenos Aires. Branding, motion graphics, video editing, web and 3D — static and animated assets for brands. Adobe suite, Cinema 4D, Figma."

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nataliaespain.com"),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "motion designer",
    "multimedia designer",
    "motion graphics",
    "video editing",
    "After Effects",
    "Premiere Pro",
    "Cinema 4D",
    "brand assets",
    "Natalia Espain",
    "Buenos Aires",
  ],
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
    locale: "en_US",
    url: "https://www.nataliaespain.com",
    siteName: "Natalia Espain — Multimedia Designer",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Natalia Espain — Multimedia Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/og-image.png"],
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
    <html lang="en" className={`${anton.variable} ${spaceGrotesk.variable} ${spaceMono.variable} scroll-smooth`}>
      <head></head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
