import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const truncateString = (str: string, num: number) =>{
  return str.slice(0, num || 30 ) + '....'
}