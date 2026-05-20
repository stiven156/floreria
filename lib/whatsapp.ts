import type { Product, StoreSettings } from "./types";
import { formatPrice, slugifyPhone } from "./utils";

export function buildSingleProductMessage(p: Product, settings: StoreSettings): string {
  const showPrice = settings.showPricesGlobal && p.showPrice !== false && p.price != null;
  const price = showPrice ? `\nPrecio: ${formatPrice(p.price, settings.currency)}` : "";
  return [
    `Hola ${settings.storeName} 🌸`,
    "",
    `Quiero comprar este producto:`,
    `*${p.name}*`,
    p.description,
    price,
    "",
    `¿Está disponible?`,
  ].join("\n");
}

export function buildCartMessage(
  items: { product: Product; qty: number }[],
  settings: StoreSettings,
  note?: string
): string {
  const lines = items.map((i, idx) => {
    const showPrice = settings.showPricesGlobal && i.product.showPrice !== false && i.product.price != null;
    const sub = showPrice ? ` — ${formatPrice((i.product.price ?? 0) * i.qty, settings.currency)}` : "";
    return `${idx + 1}. ${i.product.name} x${i.qty}${sub}`;
  });
  const totalKnown = items.every(
    (i) => settings.showPricesGlobal && i.product.showPrice !== false && i.product.price != null
  );
  const total = totalKnown
    ? `\n\n*Total: ${formatPrice(
        items.reduce((acc, i) => acc + (i.product.price ?? 0) * i.qty, 0),
        settings.currency
      )}*`
    : "";

  return [
    `Hola ${settings.storeName} 🌸`,
    "",
    "Quiero hacer este pedido:",
    "",
    ...lines,
    total,
    note ? `\nNota: ${note}` : "",
    "",
    "¿Me confirman disponibilidad y forma de pago?",
  ].join("\n");
}

export function whatsappUrl(phone: string, message: string): string {
  const cleaned = slugifyPhone(phone);
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
}
