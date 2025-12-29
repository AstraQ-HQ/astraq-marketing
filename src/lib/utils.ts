import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(image?: { url: string } | number): string | null {
  if (!image) return null;

  if (typeof image === "number") return `/api/media/${image}`;
  if (image.url) return image.url;

  return null;
}
