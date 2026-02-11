"use client";

import { Icon } from "@/components/ui/icon";
import type { Service } from "@/lib/content";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="group p-8 bg-black border border-white/40 rounded-2xl transition-all duration-300 hover:border-white/60 text-center">
      <div className="w-14 h-14 bg-black border border-white/20 rounded-xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:bg-white/5 group-hover:border-white/40">
        <Icon
          name={service.icon}
          className="w-7 h-7 text-white"
          strokeWidth={1.5}
        />
      </div>
      <h3 className="font-mono text-xl text-white mb-3">{service.name}</h3>
      <p className="text-sm text-white/60 leading-relaxed">{service.description}</p>
    </div>
  );
}
