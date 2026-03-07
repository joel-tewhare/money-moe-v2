import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImagePath(name: string, folder = 'products'): string {
  const filename = name.toLowerCase().replace(/\s+/g, '-')
  return `/assets/${folder}/${filename}.png`
}
