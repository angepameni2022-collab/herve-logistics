import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import { AppProvider } from "@/context/AppContext";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#121212",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://herve-logistics.vercel.app"),
  title: "Hervé Logistics — Plateforme Officielle de Suivi & Transit International",
  description: "Plateforme logistique internationale : Transport maritime, aérien, routier, conteneurs, fret et suivi en direct par satellite.",
  keywords: ["Hervé Logistics", "Hervé Transit", "suivi de colis", "fret maritime", "transit international", "tracking maritime", "conteneurs 40 HC"],
  authors: [{ name: "Hervé Logistics" }],
  applicationName: "Hervé Logistics",
  appleWebApp: {
    capable: true,
    title: "Hervé Logistics",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
  },
  openGraph: {
    title: "Hervé Logistics — Plateforme Officielle de Suivi & Transit International",
    description: "Plateforme logistique internationale : Transport maritime, aérien, routier, conteneurs, fret et suivi en direct par satellite.",
    url: "https://herve-logistics.vercel.app",
    siteName: "Hervé Logistics",
    images: [
      {
        url: "/images/logo-herve-official.png",
        width: 1024,
        height: 1024,
        alt: "Logo Officiel Hervé Logistics",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hervé Logistics — Plateforme Officielle de Suivi & Transit International",
    description: "Suivez vos marchandises partout dans le monde avec précision satellite et transparence.",
    images: ["/images/logo-herve-official.png"],
  },
  icons: {
    icon: [
      { url: "/images/logo-herve-official.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: "/images/logo-herve-official.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`h-full ${barlowCondensed.variable} ${inter.variable}`} suppressHydrationWarning>
      <body
        className={`min-h-full flex flex-col bg-[#F8FAFC] text-[#121212] ${inter.className} antialiased`}
        suppressHydrationWarning
      >
        <ToastProvider>
          <AppProvider>
            {children}
          </AppProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
