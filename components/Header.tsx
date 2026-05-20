"use client";

import Link from "next/link";
import { ShoppingBag, Flower2 } from "lucide-react";
import { useCart } from "./CartProvider";
import type { StoreSettings } from "@/lib/types";

export function Header({ settings }: { settings: StoreSettings }) {
  const { count, setOpen } = useCart();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Flower2 className="h-6 w-6 text-primary" />
          <span className="font-serif text-xl tracking-tight">
            {settings.storeName}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <a href="#productos" className="hover:text-primary">Catálogo</a>
          <a href="#categorias" className="hover:text-primary">Categorías</a>
          <a href="#contacto" className="hover:text-primary">Contacto</a>
        </nav>

        <button
          onClick={() => setOpen(true)}
          className="relative rounded-full border border-border bg-white px-3 py-2 text-sm shadow-sm hover:bg-muted"
          aria-label="Abrir carrito"
        >
          <ShoppingBag className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-xs font-semibold text-primary-foreground">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
