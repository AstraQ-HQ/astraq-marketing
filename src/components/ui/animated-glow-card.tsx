"use client";

import React from 'react';
import { cn } from "@/lib/utils";

const CardCanvas = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    return (
        <div className={`card-canvas ${className}`}>
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <filter width="3000%" x="-1000%" height="3000%" y="-1000%" id="unopaq">
                    <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 3 0"></feColorMatrix>
                </filter>
            </svg>
            <div className="card-backdrop"></div>
            {children}
        </div>
    );
};

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    return (
        <div className={cn("relative border border-white/20 bg-white/5 rounded-3xl overflow-hidden", className)}>
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export { CardCanvas, Card };
