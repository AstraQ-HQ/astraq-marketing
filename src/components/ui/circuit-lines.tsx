"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface CircuitLinesProps {
  className?: string;
}

export function CircuitLines({ className }: CircuitLinesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const canvasWidth = canvas.offsetWidth;
    const canvasHeight = canvas.offsetHeight;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener("resize", resize);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      targetAlpha: number;
      path: { x: number; y: number }[];
      pathIndex: number;
      speed: number;
      canvasWidth: number;
      canvasHeight: number;

      constructor(width: number, height: number) {
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.x = Math.random() * this.canvasWidth;
        this.y = Math.random() * this.canvasHeight;
        this.vx = 0;
        this.vy = 0;
        this.size = Math.random() * 2 + 1;
        this.alpha = 0;
        this.targetAlpha = Math.random() * 0.4 + 0.2;
        this.path = [];
        this.pathIndex = 0;
        this.speed = Math.random() * 1.5 + 0.5;
        this.generatePath();
      }

      generatePath() {
        this.path = [{ x: this.x, y: this.y }];
        const segments = Math.floor(Math.random() * 3) + 2;
        
        for (let i = 0; i < segments; i++) {
          const lastPoint = this.path[this.path.length - 1];
          const isHorizontal = Math.random() > 0.5;
          const distance = Math.random() * 100 + 50;
          
          if (isHorizontal) {
            this.path.push({
              x: lastPoint.x + (Math.random() > 0.5 ? distance : -distance),
              y: lastPoint.y
            });
          } else {
            this.path.push({
              x: lastPoint.x,
              y: lastPoint.y + (Math.random() > 0.5 ? distance : -distance)
            });
          }
        }
      }

      update() {
        if (this.pathIndex < this.path.length - 1) {
          const target = this.path[this.pathIndex + 1];
          const dx = target.x - this.x;
          const dy = target.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < this.speed) {
            this.x = target.x;
            this.y = target.y;
            this.pathIndex++;
          } else {
            this.x += (dx / distance) * this.speed;
            this.y += (dy / distance) * this.speed;
          }
        } else {
          // Reset to start new path
          this.x = Math.random() * this.canvasWidth;
          this.y = Math.random() * this.canvasHeight;
          this.pathIndex = 0;
          this.generatePath();
        }

        // Fade in/out
        if (this.alpha < this.targetAlpha) {
          this.alpha += 0.01;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        const accentColor = "200, 141, 148"; // #c88d94 in RGB
        
        // Draw connection line first (behind node)
        if (this.pathIndex < this.path.length) {
          const prevPoint = this.path[this.pathIndex];
          if (prevPoint) {
            ctx.beginPath();
            ctx.moveTo(prevPoint.x, prevPoint.y);
            ctx.lineTo(this.x, this.y);
            ctx.strokeStyle = `rgba(${accentColor}, ${this.alpha * 0.4})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Draw node with subtle glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentColor}, ${this.alpha})`;
        ctx.fill();

        // Draw subtle glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 3
        );
        gradient.addColorStop(0, `rgba(${accentColor}, ${this.alpha * 0.2})`);
        gradient.addColorStop(1, `rgba(${accentColor}, 0)`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < 15; i++) {
      particles.push(new Particle(canvasWidth, canvasHeight));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Draw grid lines with subtle visibility
      ctx.strokeStyle = "rgba(200, 141, 148, 0.04)";
      ctx.lineWidth = 0.5;
      const gridSize = 80;
      
      for (let x = 0; x < canvas.offsetWidth; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.offsetHeight);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.offsetHeight; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.offsetWidth, y);
        ctx.stroke();
      }

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 w-full h-full pointer-events-none", className)}
      aria-hidden="true"
    />
  );
}
