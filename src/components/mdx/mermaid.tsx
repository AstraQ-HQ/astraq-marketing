"use client";

import { Maximize2, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import mermaid, { type MermaidConfig } from "mermaid";
import { useEffect, useId, useRef, useState } from "react";
import svgPanZoom from "svg-pan-zoom";
import { Button } from "@/components/ui/button";
import { useDarkMode } from "@/hooks/use-dark-mode";

export function Mermaid({ chart }: { chart: string }) {
  const id = useId();
  const [svgString, setSvgString] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const panzoomRef = useRef<ReturnType<typeof svgPanZoom> | null>(null);
  const isDarkMode = useDarkMode();

  useEffect(() => {
    void renderChart();

    async function renderChart() {
      const lightThemeVariables = {
        background: "#ffffff",
        primaryColor: "#e6e6e6",
        primaryTextColor: "#1a1a1a",
        primaryBorderColor: "#d9d9d9",
        secondaryColor: "#f2f2f2",
        tertiaryColor: "#fafafa",
        lineColor: "#1a1a1a",
        textColor: "#1a1a1a",
        mainBkg: "#fafafa",
        nodeBorder: "#d9d9d9",
        clusterBkg: "#f2f2f2",
        titleColor: "#1a1a1a",
        edgeLabelBackground: "#ffffff",
        nodeRadius: 0,
      };

      const darkThemeVariables = {
        background: "#0d0d0d",
        primaryColor: "#262626",
        primaryTextColor: "#f2f2f2",
        primaryBorderColor: "#595959",
        secondaryColor: "#262626",
        tertiaryColor: "#262626",
        lineColor: "#f2f2f2",
        textColor: "#f2f2f2",
        mainBkg: "#141414",
        nodeBorder: "#595959",
        clusterBkg: "#262626",
        titleColor: "#f2f2f2",
        edgeLabelBackground: "#0d0d0d",
        nodeRadius: 0,
      };

      const mermaidConfig: MermaidConfig = {
        startOnLoad: false,
        securityLevel: "loose",
        fontFamily: "Space Mono, monospace",
        theme: "base",
        look: "classic",
        themeVariables: isDarkMode ? darkThemeVariables : lightThemeVariables,
      };

      try {
        mermaid.initialize(mermaidConfig);
        if (!containerRef.current) return;

        const { svg } = await mermaid.render(
          id.replaceAll(":", ""),
          chart.replaceAll("\\n", "\n"),
        );
        setSvgString(svg);
      } catch (error) {
        console.error(error);
        throw new Error("Error while rendering mermaid");
      }
    }

    return () => {
      if (panzoomRef.current) {
        panzoomRef.current.destroy();
        panzoomRef.current = null;
      }
    };
  }, [chart, id, isDarkMode]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !svgString) return;

    const svg = container.querySelector("svg");
    if (!svg) return;

    svg.style.maxWidth = "none";
    svg.style.width = "100%";

    if (panzoomRef.current) {
      panzoomRef.current.destroy();
      panzoomRef.current = null;
    }

    const instance = svgPanZoom(svg, {
      zoomEnabled: true,
      panEnabled: true,
      controlIconsEnabled: false,
      mouseWheelZoomEnabled: false,
      minZoom: 0.5,
      maxZoom: 10,
      fit: true,
      contain: true,
      center: true,
    });

    panzoomRef.current = instance;

    const handleWheel = (event: WheelEvent) => {
      if (!panzoomRef.current) return;
      if (!(event.ctrlKey || event.metaKey)) return;

      event.preventDefault();
      const direction = event.deltaY < 0 ? 1 : -1;
      const currentZoom = panzoomRef.current.getZoom();
      const zoomFactor = direction > 0 ? 1.2 : 0.8;
      const newZoom = currentZoom * zoomFactor;

      const rect = svg.getBoundingClientRect();
      const point = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };

      panzoomRef.current.zoomAtPoint(newZoom, point);
    };

    const handlePointerDown = () => {
      container.classList.remove("cursor-grab");
      container.classList.add("cursor-grabbing");
    };

    const handlePointerUp = () => {
      container.classList.remove("cursor-grabbing");
      container.classList.add("cursor-grab");
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    svg.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      svg.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      if (panzoomRef.current) {
        panzoomRef.current.destroy();
        panzoomRef.current = null;
      }
    };
  }, [svgString]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => {
      if (!panzoomRef.current) return;
      panzoomRef.current.resize();
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleZoomIn = () => {
    if (!panzoomRef.current) return;
    panzoomRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (!panzoomRef.current) return;
    panzoomRef.current.zoomOut();
  };

  const handleReset = () => {
    if (!panzoomRef.current) return;
    panzoomRef.current.resetZoom();
  };

  const handleFit = () => {
    if (!panzoomRef.current) return;
    panzoomRef.current.fit();
  };

  return (
    <div className="flex relative min-h-96 justify-center py-2">
      <div
        ref={containerRef}
        className="relative max-w-full overflow-hidden h-full w-full cursor-grab"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: svg is safe
        dangerouslySetInnerHTML={{ __html: svgString }}
      />
      <div className="pointer-events-none absolute right-3 top-3 flex gap-1">
        <Button
          type="button"
          size="icon-sm"
          variant="outline"
          className="pointer-events-auto h-7 w-7 rounded-md bg-background/80 backdrop-blur"
          onClick={handleZoomIn}
          aria-label="Zoom in diagram"
        >
          <ZoomIn className="size-3.5" />
        </Button>
        <Button
          type="button"
          size="icon-sm"
          variant="outline"
          className="pointer-events-auto h-7 w-7 rounded-md bg-background/80 backdrop-blur"
          onClick={handleZoomOut}
          aria-label="Zoom out diagram"
        >
          <ZoomOut className="size-3.5" />
        </Button>
        <Button
          type="button"
          size="icon-sm"
          variant="outline"
          className="pointer-events-auto h-7 w-7 rounded-md bg-background/80 backdrop-blur"
          onClick={handleReset}
          aria-label="Reset diagram view"
        >
          <RotateCcw className="size-3.5" />
        </Button>
        <Button
          type="button"
          size="icon-sm"
          variant="outline"
          className="pointer-events-auto h-7 w-7 rounded-md bg-background/80 backdrop-blur"
          onClick={handleFit}
          aria-label="Fit diagram to view"
        >
          <Maximize2 className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
