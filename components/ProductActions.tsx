"use client";

import { MessageCircle, Plus, Minus } from "lucide-react";
import { useState } from "react";
import type { Product, StoreSettings } from "@/lib/types";
import { useCart } from "./CartProvider";
import { buildSingleProductMessage, whatsappUrl } from "@/lib/whatsapp";

export function ProductActions({
  product,
  settings,
}: {
  product: Product;
  settings: StoreSettings;
}) {
  const { add, setOpen } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <div className="mt-6 space-y-3">
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white p-1">
        <button
          onClick={() => setQty(Math.max(1, qty - 1))}
          className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted"
          aria-label="Restar"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="min-w-8 text-center font-semibold">{qty}</span>
        <button
          onClick={() => setQty(qty + 1)}
          className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted"
          aria-label="Sumar"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          onClick={() => {
            add(product.id, qty);
            setOpen(true);
          }}
          className="flex items-center justify-center gap-2 rounded-full bg-muted px-5 py-3 text-sm font-semibold hover:bg-accent"
        >
          <Plus className="h-4 w-4" />
          Añadir al carrito
        </button>

        <a
          href={whatsappUrl(
            settings.whatsappNumber,
            buildSingleProductMessage(product, settings)
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-95"
        >
          <MessageCircle className="h-4 w-4" />
          Comprar por WhatsApp
        </a>
      </div>
    </div>
  );
}
