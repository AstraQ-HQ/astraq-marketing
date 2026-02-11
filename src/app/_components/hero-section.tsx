"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CircuitLines } from "@/components/ui/circuit-lines";
import { Particles } from "@/components/ui/particles";
import { Typewriter } from "@/components/ui/typewriter";
import { siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const { title, description, cta } = siteConfig.pages.home.hero;
  const { backers } = siteConfig.pages.home.backedBy;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-white">
      {/* Circuit Lines Animation */}
      <CircuitLines className="absolute inset-0 z-0" />
      {/* Subtle Particles Background */}
      <Particles
        className="absolute inset-0 z-10"
        quantity={40}
        ease={80}
        staticity={50}
        refresh={false}
        color="100, 116, 139"
      />
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-background/50" />
      <div className="relative max-w-6xl mx-auto z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="font-mono text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 text-slate-900 leading-tight animate-slide-up" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
            <Typewriter
              text={[
                "AI-Powered Cybersecurity for Modern Enterprises",
                "Detect Threats Before They Strike",
                "Respond in Seconds with AI Intelligence",
                "Ensure Compliance Effortlessly"
              ]}
              speed={50}
              waitTime={2000}
              deleteSpeed={30}
              loop={true}
              showCursor={true}
              cursorChar="_"
              className="text-slate-900"
            />
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center animate-slide-up" style={{ animationDelay: "0.5s", animationFillMode: "both" }}>
            <Button
              className="px-8 py-3 text-primary-foreground font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
              asChild
            >
              <Link href={cta.primary.href}>{cta.primary.text}</Link>
            </Button>
            <Button variant="outline" className="px-8 py-3 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5" asChild>
              <Link href={cta.secondary.href}>{cta.secondary.text}</Link>
            </Button>
          </div>

          <div className="flex flex-row flex-wrap gap-8 items-center justify-center animate-fade-in" style={{ animationDelay: "0.7s", animationFillMode: "both" }}>
            {backers.map((backer, index) => (
              <div
                key={backer.name}
                className="h-12 rounded-sm p-1 bg-white flex items-center transition-all duration-300 hover:scale-110 hover:shadow-md"
                style={{ animationDelay: `${0.8 + index * 0.1}s`, animationFillMode: "both" }}
              >
                <Image
                  src={backer.logo}
                  alt={backer.name}
                  width={200}
                  height={40}
                  className="object-contain h-10"
                  style={{ width: "auto" }}
                />
                <span className="sr-only">{backer.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
