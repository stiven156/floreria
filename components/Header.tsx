"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingBag, Flower2 } from "lucide-react";
import { useCart } from "./CartProvider";
import type { StoreSettings } from "@/lib/types";

export function Header({ settings }: { settings: StoreSettings }) {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/92 shadow-sm"
          : "border-b border-border/50 bg-background/75"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-10">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-gold-soft/50 bg-card text-primary transition-colors group-hover:bg-accent">
            <Flower2 className="h-[18px] w-[18px]" />
          </span>
          <span className="font-serif text-2xl font-medium tracking-tight text-foreground">
            {settings.storeName}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-[13px] font-medium uppercase tracking-[0.12em] text-foreground/80 md:flex">
          <a href="#productos" className="transition-colors hover:text-primary">Catálogo</a>
          <a href="#categorias" className="transition-colors hover:text-primary">Categorías</a>
          <a href="#contacto" className="transition-colors hover:text-primary">Contacto</a>
        </nav>

        <button
          onClick={() => setOpen(true)}
          className="relative grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all hover:border-gold-soft hover:text-primary"
          aria-label="Abrir carrito"
        >
          <ShoppingBag className="h-[18px] w-[18px]" />
          {count > 0 && (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground tabular-nums">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
