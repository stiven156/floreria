import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number | null | undefined, currency = "COP"): string {
  if (value == null) return "Precio a consultar";
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });
  return formatter.format(value);
}

export function slugifyPhone(phone: string): string {
  return phone.replace(/[^\d]/g, "");
}
