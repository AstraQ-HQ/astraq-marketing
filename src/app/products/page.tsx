"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { allProducts } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ProductCard } from "./_components/product-card";

const categories = ["All", ...allProducts.map((p) => p.category)];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { ref, isVisible } = useIntersectionObserver();

  const filteredProducts =
    activeCategory === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory);

  return (
    <>
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-mono text-5xl sm:text-6xl text-white mb-6">
            Our Products
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Comprehensive cybersecurity solutions for enterprise protection
          </p>
        </div>
      </section>

      <section className="sticky top-16 bg-black/80 backdrop-blur-md border-b border-white/20 py-4 px-4 sm:px-6 lg:px-8 z-40">
        <div className="max-w-7xl mx-auto flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setActiveCategory(category)}
              variant={activeCategory === category ? "default" : "outline"}
              className="rounded-xl whitespace-nowrap px-6 border border-white/40"
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <div
                key={product.slug}
                className={cn(
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10",
                )}
                style={{
                  transition: `opacity 700ms ${index * 100}ms, transform 700ms ${index * 100}ms`,
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
