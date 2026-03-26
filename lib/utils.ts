import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImagePath(name: string, folder = 'products'): string {
  const filename = name.toLowerCase().replace(/\s+/g, '-')
  return `/assets/${folder}/${filename}.png`
}

export function getApiErrorMessage(
  err: unknown,
  fallback = 'Something went wrong. Please try again.',
): string {
  if (
    err != null &&
    typeof err === 'object' &&
    'response' in err &&
    err.response != null &&
    typeof err.response === 'object' &&
    'body' in err.response &&
    err.response.body != null &&
    typeof err.response.body === 'object' &&
    'error' in err.response.body &&
    typeof (err.response.body as { error: unknown }).error === 'string'
  ) {
    return (err.response.body as { error: string }).error
  }
  return fallback
}
