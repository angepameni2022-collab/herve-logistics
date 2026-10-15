"use client";

import React from "react";
import { TrackingEvent } from "@/data/shipments";
import { Badge } from "@/components/ui/Badge";
import { MapPin, Calendar, CheckCircle2, Clock } from "lucide-react";

interface TrackingTimelineProps {
  events: TrackingEvent[];
}

export function TrackingTimeline({ events }: TrackingTimelineProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
        <div>
          <h3 className="font-display text-xl font-bold uppercase text-[#121212]">Historique des événements</h3>
          <p className="text-xs text-slate-500 mt-0.5 font-normal">Mises à jour certifiées par les autorités de transit maritime</p>
        </div>
        <span className="font-display text-xs font-bold uppercase tracking-wider px-3 py-1 bg-[#FFFBEB] text-[#B45309] rounded-sm">
          {events.length} étapes
        </span>
      </div>

      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-[11px] sm:before:left-[15px] before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
        {events.map((evt, index) => {
          const isLatest = index === 0;

          return (
            <div key={evt.id} className="relative group">
              {/* Timeline Marker */}
              <div
                className={`absolute -left-6 sm:-left-8 top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                  evt.completed
                    ? isLatest
                      ? "bg-[#FFB800] border-[#FFB800] text-[#121212] ring-4 ring-[#FFB800]/20 animate-pulse"
                      : "bg-[#121212] border-[#121212] text-white"
                    : "bg-white border-dashed border-slate-300 text-slate-400"
                }`}
              >
                {evt.completed ? (
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                ) : (
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                )}
              </div>

              {/* Event Content */}
              <div className="bg-slate-50/70 group-hover:bg-[#FFFBEB]/40 border border-slate-200/80 group-hover:border-[#FFB800]/40 rounded-xl p-4.5 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-[#FFB800]" />
                    <span>
                      {evt.date} · {evt.time}
                    </span>
                  </div>
                  <Badge status={evt.status} size="sm" />
                </div>

                <div className="flex items-center gap-2 mb-1.5">
                  <MapPin className="w-4 h-4 text-[#FFB800] flex-shrink-0" />
                  <h4 className="text-sm font-bold text-[#121212]">{evt.location}</h4>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6 font-normal">
                  {evt.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
