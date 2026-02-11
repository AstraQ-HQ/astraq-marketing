"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/content";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group p-8 bg-black border border-white/40 rounded-2xl transition-all duration-300 hover:border-white/60">
      <div className="flex items-start justify-start gap-4 mb-6">
        <div className="p-3 bg-black border border-white/20 rounded-xl">
          <Image
            src={product.logo}
            alt={product.name}
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
        <div>
          <h3 className="font-mono text-2xl text-white mb-1">
            {product.name}
          </h3>
          <p className="text-sm text-white/50 font-semibold">
            {product.tagline}
          </p>
        </div>
      </div>
      <p className="text-white/60 mb-6 line-clamp-2">{product.description}</p>

      <ul className="space-y-3 mb-8">
        {product.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3 text-sm text-white/70">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href="#"
        className="text-white font-bold hover:gap-3 inline-flex items-center gap-2 transition-all p-3 border border-white/20 rounded-xl hover:border-white/40 w-full justify-center"
      >
        Learn More
      </Link>
    </div>
  );
}
