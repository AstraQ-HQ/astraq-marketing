"use client";

import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function WhyAstraQ() {
  const { ref, isVisible } = useIntersectionObserver();
  const { title, description, stats, features } =
    siteConfig.pages.home.whyAstraQ;

  return (
    <section
      id="why-astraq"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-background"
    >
      <div className="max-w-6xl mx-auto">
        <div className={cn("text-center mb-16", isVisible ? "animate-slide-up" : "opacity-0")}>
          <h2 className="font-mono text-4xl sm:text-5xl text-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={cn(
                  "text-center transition-all duration-500",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10",
                )}
                style={{
                  transitionDelay: `${index * 0.15}s`,
                }}
              >
                <div className="w-14 h-14 bg-black border border-white/40 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:border-white/60">
                  <Icon
                    className="w-7 h-7 text-white"
                    strokeWidth={1.5}
                  />
                </div>
                <p className="font-mono text-4xl text-white mb-2">
                  {stat.value}
                </p>
                <p className="text-white/50">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={item.title}
              className={cn(
                "p-8 border border-white/40 rounded-2xl bg-black transition-all duration-300 hover:border-white/60",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10",
              )}
              style={{
                transitionDelay: `${(index + 3) * 150}ms`,
              }}
            >
              <h3 className="font-mono text-xl text-white mb-2">
                {item.title}
              </h3>
              <p className="text-white/60">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
