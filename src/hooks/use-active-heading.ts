"use client";

import { useEffect, useState } from "react";
import type { Blog } from "@/lib/content";

export function useActiveHeading(headings: Blog["headings"]) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      {
        rootMargin: "-20% 0px -35% 0px",
        threshold: 0,
      },
    );

    const observedElements: Element[] = [];

    for (const heading of headings) {
      const element = document.getElementById(heading.slug);
      if (element) {
        observer.observe(element);
        observedElements.push(element);
      }
    }

    return () => {
      for (const element of observedElements) {
        observer.unobserve(element);
      }
    };
  }, [headings]);

  return activeId;
}
