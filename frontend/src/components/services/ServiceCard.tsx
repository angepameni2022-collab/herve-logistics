"use client";

import React from "react";
import Link from "next/link";
import { ServiceItem } from "@/data/services";
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

interface ServiceCardProps {
  service: ServiceItem;
  detailed?: boolean;
}

export function ServiceCard({ service, detailed = false }: ServiceCardProps) {
  const icon = iconMap[service.iconName] || <Ship className="w-6 h-6" />;

  if (!detailed) {
    // Quick card for Homepage (6 cartes sous le hero)
    return (
      <Link
        href="/services"
        className="group bg-white rounded-2xl border border-zinc-200/90 p-6 shadow-xs hover:shadow-xl hover:border-red-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
      >
        <div>
          <div className="w-12 h-12 rounded-xl bg-[#FEF2F2] text-[#DC2626] group-hover:bg-[#DC2626] group-hover:text-white flex items-center justify-center transition-all duration-300 mb-5 border border-red-100 group-hover:border-red-600 shadow-xs">
            {icon}
          </div>
          <h3 className="text-lg font-bold text-[#09090B] group-hover:text-[#DC2626] transition-colors mb-2">
            {service.title}
          </h3>
          <p className="text-sm text-zinc-500 leading-relaxed">
            {service.shortDesc}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center text-xs font-bold text-[#DC2626] group-hover:translate-x-1 transition-transform">
          <span>En savoir plus</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
        </div>
      </Link>
    );
  }

  // Detailed Card with large image for /services page
  return (
    <div className="group bg-white rounded-2xl border border-zinc-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-red-300 transition-all duration-300 flex flex-col">
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
          <h3 className="text-xl font-extrabold text-white drop-shadow-sm">{service.title}</h3>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-sm text-zinc-600 leading-relaxed mb-4">
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

        <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#DC2626] hover:text-[#09090B] transition-colors"
          >
            <span>Demander un devis</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <span className="text-xs text-zinc-400 font-medium">Assistance 24/7</span>
        </div>
      </div>
    </div>
  );
}
