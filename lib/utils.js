import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getStrapiURL() {
  if (process.env.NODE_ENV === 'production') {
    return 'https://nutri-fit-tracker-be.onrender.com';
  } else {
    return 'http://127.0.0.1:1337';
  }
}

// export function getStrapiDevURL() {
//   return 'http://127.0.0.1:1337';
// }

// export function getStrapiProdURL() {
//   return 'https://nutri-fit-tracker-be.onrender.com';
// }
