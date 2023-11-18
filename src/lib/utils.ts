import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getTextFromUrl(url: string) {
  const res = await fetch(url);
  const text = await res.text();

  return text;
}
