"use client";

import { Award, Clock, TrendingUp } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export function WhyAstraQ() {
  const { ref, isVisible } = useIntersectionObserver();

  const stats = [
    { icon: TrendingUp, value: "99.9%", label: "Threat Detection Rate" },
    { icon: Clock, value: "<5min", label: "Response Time" },
    { icon: Award, value: "500+", label: "Enterprise Clients" },
  ];

  return (
    <section
      id="why-astraq"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-mono text-4xl sm:text-5xl text-primary mb-4">
            Why AstraQ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by enterprises worldwide for unmatched security and
            innovation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`text-center transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-14 h-14 bg-accent/10 rounded-sm flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-accent-foreground" />
                </div>
                <p className="font-mono text-4xl text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Innovation First",
              description:
                "Cutting-edge AI and machine learning technologies at the forefront of cybersecurity.",
            },
            {
              title: "Enterprise Proven",
              description:
                "Trusted by Fortune 500 companies and government agencies for mission-critical protection.",
            },
            {
              title: "Expert Support",
              description:
                "24/7 expert support team dedicated to your security and success.",
            },
          ].map((item, index) => (
            <div
              key={item.title}
              className={`p-8 border border-border rounded-sm bg-card transition-all duration-700 hover:shadow-lg hover:border-accent ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${(index + 3) * 150}ms` }}
            >
              <h3 className="font-mono text-xl text-primary mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
