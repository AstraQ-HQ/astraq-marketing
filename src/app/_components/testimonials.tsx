"use client";

import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";

const testimonials = [
  {
    quote:
      "AstraQ's threat detection saved us from a major breach. The response time was incredible.",
    author: "Sarah Chen",
    company: "TechCorp International",
    initials: "SC",
  },
  {
    quote:
      "The best security investment we've made. Compliance is now automated and effortless.",
    author: "Michael Rodriguez",
    company: "Financial Systems Inc",
    initials: "MR",
  },
  {
    quote:
      "Their AI catches what we miss. Finally, a solution we can trust completely.",
    author: "Emily Watson",
    company: "DataVault Security",
    initials: "EW",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
    setAutoPlay(false);
  };

  const prev = () => {
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
    setAutoPlay(false);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-mono text-4xl sm:text-5xl font-bold text-primary mb-16 text-center">
          Trusted by Industry Leaders
        </h2>

        <div className="relative bg-background rounded-sm p-8 md:p-12 border border-border">
          <div className="min-h-48 flex flex-col justify-center">
            <Quote className="w-8 h-8 text-accent-foreground mb-4 opacity-50" />
            <blockquote className="text-xl md:text-2xl font-mono mb-6 text-primary leading-relaxed">
              "{testimonials[current].quote}"
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-sm flex items-center justify-center font-semibold text-accent-foreground">
                {testimonials[current].initials}
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {testimonials[current].author}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonials[current].company}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrent(index);
                    setAutoPlay(false);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${index === current ? "bg-accent-foreground w-8" : "bg-border"}`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={prev}
                className="p-2 hover:bg-border rounded-sm transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="p-2 hover:bg-border rounded-sm transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
