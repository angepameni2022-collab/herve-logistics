import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import { AppProvider } from "@/context/AppContext";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hervé Logistics — Transit & Logistique Internationale",
  description: "Plateforme logistique internationale : Transport maritime, aérien, routier, conteneurs, fret et suivi en temps réel par satellite.",
  icons: {
    icon: [
      { url: "/images/logo-herve-official.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
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
    <html lang="fr" className={`h-full ${jakarta.variable}`} suppressHydrationWarning>
      <body
        className={`min-h-full flex flex-col bg-[#F8FAFC] text-[#09090B] ${jakarta.className} antialiased`}
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
