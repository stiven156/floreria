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
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:shadow-md">
      <Link
        href={`/producto/${product.id}`}
        className="relative block aspect-square overflow-hidden"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width:768px) 25vw, 50vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground">
          {product.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-serif text-lg leading-tight">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-3 flex items-baseline justify-between">
          {showPrice ? (
            <span className="font-semibold text-primary">
              {formatPrice(product.price, settings.currency)}
            </span>
          ) : (
            <span className="text-sm text-muted-foreground">
              Precio a consultar
            </span>
          )}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              add(product.id, 1);
              setOpen(true);
            }}
            className="flex items-center justify-center gap-1 rounded-full bg-muted px-3 py-2 text-sm font-medium hover:bg-accent"
          >
            <Plus className="h-4 w-4" />
            Carrito
          </button>
          <a
            href={whatsappUrl(
              settings.whatsappNumber,
              buildSingleProductMessage(product, settings)
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 rounded-full bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-95"
          >
            <MessageCircle className="h-4 w-4" />
            Comprar
          </a>
        </div>
      </div>
    </article>
  );
}
