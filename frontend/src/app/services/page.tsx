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
  Car,
  Warehouse,
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
  Car: <Car className="w-6 h-6" />,
  Warehouse: <Warehouse className="w-6 h-6" />,
};

export default function ServicesPage() {
  const { cmsContent } = useApp();
  const { servicesPage } = cmsContent;
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header />

      <main className="flex-1">
        {/* HERO SERVICES — MAERSK MARITIME PALETTE */}
        <section className="bg-gradient-to-b from-white via-[#EBF6FA]/50 to-white text-slate-900 pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 text-center border-b border-slate-200">
          <div className="max-w-3xl mx-auto">
            <span className="font-display text-xs font-bold uppercase tracking-widest text-[#0088B8] bg-[#EBF6FA] px-3.5 py-1.5 rounded-sm border border-[#42B0D5]/30 shadow-xs">
              Solutions globales · Maersk Network
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold uppercase text-[#00243D] mt-4 mb-4 tracking-tight">
              {servicesPage.heroTitle}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {servicesPage.heroSubtitle}
            </p>
          </div>
        </section>

        {/* GRILLE DES 8 SERVICES */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service) => {
              const icon = iconMap[service.iconName] || <Ship className="w-6 h-6" />;

              return (
                <div
                  key={service.id}
                  className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#42B0D5] transition-all duration-300 flex flex-col"
                >
                  {/* Grande Image */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001726]/90 via-[#00243D]/40 to-transparent" />
                    {service.badge && (
                      <span className="absolute top-4 right-4 bg-[#42B0D5] text-[#00243D] font-display text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm shadow-md">
                        {service.badge}
                      </span>
                    )}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2.5 text-white">
                      <div className="w-10 h-10 rounded-xl bg-white text-[#00243D] shadow-lg flex items-center justify-center font-bold">
                        {icon}
                      </div>
                      <h2 className="font-display text-2xl font-bold uppercase text-white drop-shadow-sm tracking-tight">{service.title}</h2>
                    </div>
                  </div>

                  {/* Body & Description */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-sm text-slate-600 leading-relaxed mb-5 font-normal">
                        {service.description}
                      </p>

                      <div className="space-y-2 mb-6">
                        {service.features.map((feat) => (
                          <div key={feat} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#42B0D5] flex-shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* En savoir plus action */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedService(service)}
                        className="inline-flex items-center gap-1.5 text-xs font-display font-bold uppercase tracking-wider text-[#0088B8] hover:text-[#00243D] transition-colors cursor-pointer"
                      >
                        <span>En savoir plus</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <Link href="/contact" className="text-xs text-slate-400 hover:text-[#00243D] font-semibold">
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
        <section className="bg-white border-t border-slate-200 py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <h3 className="font-display text-3xl font-extrabold uppercase text-[#00243D] mb-2 tracking-tight">
              Un besoin logistique spécifique ou multimodal ?
            </h3>
            <p className="text-sm text-slate-600 max-w-xl mx-auto mb-6 font-normal">
              Nos courtiers et ingénieurs transport conçoivent des routes personnalisées combinant fret maritime, aérien et routier.
            </p>
            <Link href="/contact">
              <button
                type="button"
                className="px-7 py-3 rounded-sm bg-[#00243D] hover:bg-[#003B64] text-white font-display font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                Demander une étude d&apos;expédition
              </button>
            </Link>
          </div>
        </section>

        {/* MODALE DÉTAIL SERVICE */}
        {selectedService && (
          <Modal
            isOpen={!!selectedService}
            onClose={() => setSelectedService(null)}
            title={selectedService.title}
          >
            <div className="space-y-4">
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {selectedService.description}
              </p>
              <div>
                <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[#00243D] mb-2">Prestations incluses :</h4>
                <ul className="space-y-2">
                  {selectedService.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-[#42B0D5]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <Button variant="outline" size="sm" onClick={() => setSelectedService(null)}>
                  Fermer
                </Button>
                <Link href="/contact">
                  <Button variant="primary" size="sm" className="bg-[#00243D] hover:bg-[#003B64] text-white font-display uppercase tracking-wider">
                    Demander un devis
                  </Button>
                </Link>
              </div>
            </div>
          </Modal>
        )}
      </main>

      <Footer />
    </div>
  );
}
