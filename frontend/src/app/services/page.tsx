"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { servicesData, ServiceItem } from "@/data/services";
import { useApp } from "@/context/AppContext";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import {
  Ship,
  Plane,
  Truck,
  Boxes,
  PackageCheck,
  FileCheck2,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Ship: <Ship className="w-6 h-6" />,
  Plane: <Plane className="w-6 h-6" />,
  Truck: <Truck className="w-6 h-6" />,
  Boxes: <Boxes className="w-6 h-6" />,
  PackageCheck: <PackageCheck className="w-6 h-6" />,
  FileCheck2: <FileCheck2 className="w-6 h-6" />,
};

export default function ServicesPage() {
  const { cmsContent } = useApp();
  const { servicesPage } = cmsContent;
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header />

      <main className="flex-1">
        {/* HERO SERVICES — NOIR & ROUGE */}
        <section className="bg-[#09090B] text-white py-20 px-4 sm:px-6 lg:px-8 text-center border-b border-zinc-800">
          <div className="max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-red-400 bg-red-950/60 px-3.5 py-1.5 rounded-full border border-red-500/40">
              Solutions globales
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-4">
              {servicesPage.heroTitle}
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
              {servicesPage.heroSubtitle}
            </p>
          </div>
        </section>

        {/* GRILLE 3x2 / 2x3 DES 6 SERVICES */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service) => {
              const icon = iconMap[service.iconName] || <Ship className="w-6 h-6" />;

              return (
                <div
                  key={service.id}
                  className="group bg-white rounded-2xl border border-zinc-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-red-300 transition-all duration-300 flex flex-col"
                >
                  {/* Grande Image */}
                  <div className="relative h-56 w-full overflow-hidden bg-zinc-900">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/90 via-[#09090B]/40 to-transparent" />
                    {service.badge && (
                      <span className="absolute top-4 right-4 bg-[#DC2626] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        {service.badge}
                      </span>
                    )}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2.5 text-white">
                      <div className="w-10 h-10 rounded-xl bg-[#09090B] border border-red-500/40 flex items-center justify-center text-[#DC2626] shadow-md">
                        {icon}
                      </div>
                      <h2 className="text-xl font-extrabold text-white drop-shadow-sm">{service.title}</h2>
                    </div>
                  </div>

                  {/* Body & Description */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-sm text-zinc-600 leading-relaxed mb-5">
                        {service.description}
                      </p>

                      <div className="space-y-2 mb-6">
                        {service.features.map((feat) => (
                          <div key={feat} className="flex items-center gap-2 text-xs text-zinc-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#DC2626] flex-shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* En savoir plus action */}
                    <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedService(service)}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-[#DC2626] hover:text-[#09090B] transition-colors"
                      >
                        <span>En savoir plus</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <Link href="/contact" className="text-xs text-zinc-400 hover:text-zinc-700 font-semibold">
                        Devis rapide →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* BANNIÈRE SUPPORT */}
        <section className="bg-white border-t border-zinc-200 py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <h3 className="text-xl font-extrabold text-[#09090B] mb-2">
              Un besoin logistique spécifique ou multimodal ?
            </h3>
            <p className="text-sm text-zinc-600 max-w-xl mx-auto mb-6">
              Nos courtiers et ingénieurs transport conçoivent des routes personnalisées combinant fret maritime, fluvial et routier.
            </p>
            <Link href="/contact">
              <Button size="lg" variant="primary">
                Demander une étude sur mesure
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* MODAL EN SAVOIR PLUS */}
      <Modal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        title={selectedService?.title || "Détails du service"}
        description={selectedService?.shortDesc}
        maxWidth="lg"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setSelectedService(null)}>
              Fermer
            </Button>
            <Link href="/contact" onClick={() => setSelectedService(null)}>
              <Button variant="primary" size="sm">
                Obtenir une cotation
              </Button>
            </Link>
          </>
        }
      >
        {selectedService && (
          <div className="space-y-4">
            <div className="h-44 rounded-xl overflow-hidden relative">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                <span className="text-white font-bold text-sm bg-[#DC2626] px-3 py-1 rounded-full">
                  {selectedService.badge || "Garantie Hervé Logistics"}
                </span>
              </div>
            </div>

            <p className="text-sm text-zinc-700 leading-relaxed">
              {selectedService.description}
            </p>

            <div className="bg-[#FEF2F2] p-4 rounded-xl border border-red-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#09090B] mb-2">
                Spécifications & Inclus dans l&apos;offre :
              </h4>
              <ul className="space-y-1.5 text-xs text-zinc-700">
                {selectedService.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>

      <Footer />
    </div>
  );
}
