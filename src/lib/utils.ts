import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names using clsx and tailwind-merge.
 *
 * Combines conditional class names via clsx, then resolves Tailwind CSS
 * class conflicts using tailwind-merge (e.g., `bg-red-500` + `bg-blue-500`
 * yields `bg-blue-500`).
 *
 * @param inputs - Class values to merge (strings, arrays, objects, etc.)
 * @returns A single merged class name string with conflicts resolved
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export { cn };
