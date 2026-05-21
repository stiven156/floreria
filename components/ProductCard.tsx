"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, MessageCircle } from "lucide-react";
import type { Product, StoreSettings } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { buildSingleProductMessage, whatsappUrl } from "@/lib/whatsapp";
import { useCart } from "./CartProvider";

export function ProductCard({
  product,
  settings,
}: {
  product: Product;
  settings: StoreSettings;
}) {
  const { add, setOpen } = useCart();
  const showPrice =
    settings.showPricesGlobal && product.showPrice !== false && product.price != null;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_2px_rgba(44,37,32,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(124,45,70,0.35)]">
      <Link
        href={`/producto/${product.id}`}
        className="relative block aspect-[4/5] overflow-hidden"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="absolute left-3 top-3 rounded-full border border-white/40 bg-white/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground backdrop-blur-sm">
          {product.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-serif text-xl font-medium leading-tight">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-[13px] font-light leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-3 flex items-baseline justify-between">
          {showPrice ? (
            <span className="font-serif text-xl font-semibold tabular-nums text-primary">
              {formatPrice(product.price, settings.currency)}
            </span>
          ) : (
            <span className="text-[13px] font-medium uppercase tracking-wide text-gold">
              Precio a consultar
            </span>
          )}
        </div>

        <div className="mt-4 grid grid-cols-[auto_1fr] gap-2">
          <button
            onClick={() => {
              add(product.id, 1);
              setOpen(true);
            }}
            className="grid h-11 w-11 place-items-center rounded-full border border-border bg-background text-foreground transition-all hover:border-primary hover:bg-accent hover:text-primary"
            aria-label={`Añadir ${product.name} al carrito`}
          >
            <Plus className="h-4 w-4" />
          </button>
          <a
            href={whatsappUrl(
              settings.whatsappNumber,
              buildSingleProductMessage(product, settings)
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-full bg-primary px-4 text-[13px] font-semibold tracking-wide text-primary-foreground transition-all hover:bg-primary-deep"
          >
            <MessageCircle className="h-4 w-4" />
            Comprar
          </a>
        </div>
      </div>
    </article>
  );
}
