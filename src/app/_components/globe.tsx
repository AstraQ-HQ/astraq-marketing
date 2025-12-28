"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let phi = 0;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 500 * 2,
      height: 500 * 2,
      phi: 0,
      theta: 0,
      dark: 0,
      diffuse: 1,
      mapSamples: 16000,
      mapBrightness: 2,
      baseColor: [1, 1, 1],
      markerColor: [1, 1, 1],
      glowColor: [1, 1, 1],
      markers: [],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.003;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: 600,
        height: 600,
        maxWidth: "100%",
        aspectRatio: "1",
      }}
    />
  );
}
