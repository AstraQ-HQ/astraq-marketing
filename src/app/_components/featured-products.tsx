"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Button } from "@/components/ui/button";
import { Card3D } from "@/components/ui/card-3d";
import { siteConfig } from "@/lib/constants";
import { allFeaturedProducts } from "@/lib/content";
import { cn } from "@/lib/utils";

export function FeaturedProducts() {
  const { ref, isVisible } = useIntersectionObserver();
  const [activeProduct, setActiveProduct] = useState(0);

  const handleProductClick = (index: number) => {
    setActiveProduct(index);
  };

  return (
    <section
      ref={ref}
      className="py-32 px-4 sm:px-6 lg:px-8 bg-black relative"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className={cn("mb-20", isVisible ? "animate-slide-up" : "opacity-0")}>
          <h2 className="text-4xl sm:text-6xl font-bold text-white mb-6 tracking-tight">
            {siteConfig.pages.home.featuredProducts.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl font-normal leading-relaxed">
            {siteConfig.pages.home.featuredProducts.description}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex flex-col w-full lg:w-96 gap-2">
            {allFeaturedProducts.map((product, index) => {
              const isActive = activeProduct === index;
              return (
                <button
                  key={product.slug}
                  type="button"
                  onClick={() => handleProductClick(index)}
                  className={cn(
                    "flex items-center gap-5 cursor-pointer p-5 rounded-2xl text-left transition-all duration-300 relative group",
                    isActive
                      ? "bg-white/[0.08] border border-white/30"
                      : "border border-white/5 hover:bg-white/[0.05] hover:border-white/20",
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute left-0 w-1 bg-white rounded-full my-auto h-8"
                    />
                  )}
                  <div className="p-2 rounded bg-white/5 border border-white/5 group-hover:border-white/20 transition-all">
                    <Image
                      src={product.logo}
                      alt={product.name}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <h3
                    className={cn(
                      "font-bold text-base transition-colors",
                      isActive ? "text-white" : "text-white/40",
                    )}
                  >
                    {product.name}
                  </h3>
                </button>
              );
            })}
          </div>

          <div className="flex-1 relative min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="h-full bg-black border border-white/20 rounded-3xl p-10 shadow-none"
              >
                <div className="flex flex-col md:flex-row gap-12 h-full">
                  <div className="flex-1 space-y-8">
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-bold uppercase tracking-wider">
                        Enterprise Integration
                      </div>
                      <h4 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
                        {allFeaturedProducts[activeProduct].name}
                      </h4>
                      <p className="text-lg text-muted-foreground leading-relaxed font-normal">
                        {allFeaturedProducts[activeProduct].description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {allFeaturedProducts[activeProduct].features?.slice(0, 4).map((feature) => (
                        <div key={feature} className="flex items-start gap-4">
                          <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white shrink-0" />
                          <p className="text-sm text-white/70 font-medium">{feature}</p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-8">
                      <Button asChild className="bg-white text-black hover:bg-white/90 font-bold rounded-xl px-10 py-6 border border-white/40">
                        <Link href={`/products/${allFeaturedProducts[activeProduct].slug}`}>
                          Explore Integration
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="flex-1 relative aspect-square md:aspect-auto overflow-hidden bg-black border border-white/10 rounded-2xl">
                    {/* Using the logo as a placeholder or specific image if it exists in data */}
                    <Image
                      src={allFeaturedProducts[activeProduct].logo}
                      alt={allFeaturedProducts[activeProduct].name}
                      fill
                      className="object-contain opacity-20 p-20"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
