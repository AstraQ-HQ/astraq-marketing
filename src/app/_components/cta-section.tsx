"use client";

import { Check } from "lucide-react";
import { useState } from "react";

export function CTASection() {
  const [email, setEmail] = useState("");

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-mono text-4xl sm:text-5xl font-bold text-primary mb-6">
          Ready to Secure Your Business?
        </h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Join hundreds of enterprises protecting their infrastructure with
          AstraQ
        </p>

        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 bg-background border border-border rounded-sm focus:outline-none focus:border-accent"
          />
          <button className="px-8 py-3 bg-accent text-primary-foreground rounded-sm font-semibold hover:shadow-lg transition-all hover:scale-105">
            Get Started
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-2 justify-center sm:justify-start">
            <Check className="w-4 h-4 text-accent-foreground" />
            Free security assessment included
          </span>
          <span className="flex items-center gap-2 justify-center sm:justify-start">
            <Check className="w-4 h-4 text-accent-foreground" />
            No credit card required
          </span>
          <span className="flex items-center gap-2 justify-center sm:justify-start">
            <Check className="w-4 h-4 text-accent-foreground" />
            24/7 support included
          </span>
        </div>
      </div>
    </section>
  );
}
