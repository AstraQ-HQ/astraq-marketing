"use client";

import { DemoOne } from "@/components/ui/demo";
import { Hero } from "@/components/ui/animated-hero";

export default function DemoPage() {
    return (
        <main className="min-h-screen bg-black">
            <section className="border-b border-white/10 pb-20">
                <Hero />
            </section>
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-white mb-10 text-center uppercase tracking-widest">
                        Glow Card & X-Card Integration
                    </h2>
                    <DemoOne />
                </div>
            </section>
        </main>
    );
}
