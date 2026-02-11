"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";

interface Card3DProps {
    children: React.ReactNode;
    className?: string;
}

export function Card3D({ children, className }: Card3DProps) {
    // We keep the motion structure for entry animations requested by the user, 
    // but remove the "flashy" wobbly tilt effects for a more classic high-end feel.
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
                "relative rounded-lg border border-white/10 bg-white/[0.02]",
                className
            )}
        >
            <div className="w-full h-full">
                {children}
            </div>
        </motion.div>
    );
}
