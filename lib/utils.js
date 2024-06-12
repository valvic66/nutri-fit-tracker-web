import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getStrapiURL() {
  return process.env.STRAPI_URL ?? 'http://localhost:1337';
}
