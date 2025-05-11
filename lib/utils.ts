import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatNumber(num: number, decimals = 2): string {
  if (num === null || num === undefined) return "0"

  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(decimals) + "B"
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(decimals) + "M"
  } else if (num >= 1000) {
    return (num / 1000).toFixed(decimals) + "K"
  } else {
    return num.toFixed(decimals)
  }
}