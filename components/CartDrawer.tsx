"use client";

import Image from "next/image";
import { Minus, Plus, Trash2, X, MessageCircle } from "lucide-react";
import { useCart } from "./CartProvider";
import type { Product, StoreSettings } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { buildCartMessage, whatsappUrl } from "@/lib/whatsapp";
import { useState } from "react";

export function CartDrawer({
  products,
  settings,
}: {
  products: Product[];
  settings: StoreSettings;
}) {
  const { items, remove, setQty, count, open, setOpen, clear } = useCart();
  const [note, setNote] = useState("");

  const lookup = (id: string) => products.find((p) => p.id === id);
  const lines = items
    .map((i) => {
      const p = lookup(i.productId);
      return p ? { product: p, qty: i.qty } : null;
    })
    .filter((x): x is { product: Product; qty: number } => x !== null);

  const allHavePrice = lines.every(
    (l) =>
      settings.showPricesGlobal &&
      l.product.showPrice !== false &&
      l.product.price != null
  );
  const total = lines.reduce(
    (acc, l) => acc + (l.product.price ?? 0) * l.qty,
    0
  );

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-dvh w-full max-w-md flex-col bg-background shadow-2xl transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <header className="flex items-center justify-between border-b border-border bg-background-2 px-5 py-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
              Tu pedido
            </p>
            <h3 className="font-serif text-2xl font-medium leading-tight">
              Carrito · <span className="tabular-nums">{count}</span>
            </h3>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-muted"
            aria-label="Cerrar carrito"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4">
          {lines.length === 0 ? (
            <div className="grid h-full place-items-center px-6 text-center text-muted-foreground">
              <div>
                <p className="font-serif text-lg">Tu carrito está vacío</p>
                <p className="mt-1 text-sm">
                  Añade productos del catálogo y cierra el pedido por WhatsApp.
                </p>
              </div>
            </div>
          ) : (
            <ul className="space-y-4">
              {lines.map(({ product, qty }) => {
                const showPrice =
                  settings.showPricesGlobal &&
                  product.showPrice !== false &&
                  product.price != null;
                return (
                  <li
                    key={product.id}
                    className="flex gap-3 rounded-2xl border border-border bg-card p-3"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium leading-tight">
                          {product.name}
                        </p>
                        <button
                          onClick={() => remove(product.id)}
                          className="text-muted-foreground hover:text-primary"
                          aria-label="Quitar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      {showPrice && (
                        <p className="text-sm text-muted-foreground">
                          {formatPrice(product.price, settings.currency)}
                        </p>
                      )}
                      <div className="mt-2 inline-flex items-center gap-1 rounded-full border border-border bg-background">
                        <button
                          className="grid h-8 w-8 place-items-center rounded-full hover:bg-muted"
                          onClick={() => setQty(product.id, qty - 1)}
                          aria-label="Restar"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-6 text-center text-sm font-semibold">
                          {qty}
                        </span>
                        <button
                          className="grid h-8 w-8 place-items-center rounded-full hover:bg-muted"
                          onClick={() => setQty(product.id, qty + 1)}
                          aria-label="Sumar"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <footer className="space-y-3 border-t border-border bg-background-2 p-5">
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Notas para la entrega (dirección, dedicatoria, fecha…)"
              className="w-full resize-none rounded-2xl border border-border bg-card px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
            />

            {allHavePrice ? (
              <div className="flex items-center justify-between border-y border-border py-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Total estimado
                </span>
                <span className="font-serif text-2xl font-semibold tabular-nums text-primary">
                  {formatPrice(total, settings.currency)}
                </span>
              </div>
            ) : (
              <p className="rounded-xl bg-accent/60 px-3 py-2 text-xs text-primary-deep">
                Algunos productos no tienen precio publicado. Te confirmaremos el
                total por WhatsApp.
              </p>
            )}

            <a
              href={whatsappUrl(
                settings.whatsappNumber,
                buildCartMessage(lines, settings, note)
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setTimeout(() => setOpen(false), 200)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary-deep"
            >
              <MessageCircle className="h-4 w-4" />
              Pedir por WhatsApp
            </a>

            <button
              onClick={clear}
              className="w-full text-center text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              Vaciar carrito
            </button>
          </footer>
        )}
      </aside>
    </>
  );
}
