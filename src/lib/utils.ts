import { AppRouter } from "@/server/api/root";
import { TRPCClientErrorLike } from "@trpc/client";
import { TRPC_ERROR_CODE_KEY } from "@trpc/server/rpc";
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

export const wait = (delay: number) =>
  new Promise((res) => setTimeout(() => res("done"), delay));

export type FriendlyTRPCErrorMessaging = {
  [key in TRPC_ERROR_CODE_KEY]?: string;
};

export const friendlyTRPCClientErrorCode = (
  error: TRPCClientErrorLike<AppRouter>,
  messaging?: FriendlyTRPCErrorMessaging,
) => {
  if (!error.data) {
    return "";
  }

  const code = error.data.code;

  if (!messaging || !(code in messaging)) {
    return code;
  }

  return messaging[code];
};
