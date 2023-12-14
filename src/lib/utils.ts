import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const initialsFromName = (longName?: string | null) => {
  if (!longName) {
    return "??";
  }

  const names = longName.split(" ");
  const initials = names.map((name) => name.slice(0, 1));

  return initials;
};
