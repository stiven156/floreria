"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ProductCard } from "./ProductCard";
import type { Product, StoreSettings } from "@/lib/types";

export function CatalogGrid({
  products,
  settings,
}: {
  products: Product[];
  settings: StoreSettings;
}) {
  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.category));
    return ["Todos", ...Array.from(set)];
  }, [products]);

  const [active, setActive] = useState("Todos");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return products
      .filter((p) => p.available !== false)
      .filter((p) => active === "Todos" || p.category === active)
      .filter((p) =>
        query.trim()
          ? (p.name + " " + p.description).toLowerCase().includes(query.toLowerCase())
          : true
      );
  }, [products, active, query]);

  return (
    <section id="productos" className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
      <div className="flex flex-col items-center text-center">
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
          Nuestra colección
        </span>
        <h2 id="categorias" className="mt-2 font-serif text-4xl font-medium sm:text-5xl">
          El catálogo
        </h2>
        <div className="mt-4 gold-rule" />
        <p className="mt-4 max-w-md text-sm font-light text-muted-foreground">
          Toca cualquier arreglo para ver el detalle o pídelo directo por WhatsApp.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-5">
        <div className="relative mx-auto w-full max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Buscar ramos, plantas, cajas…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-full border border-border bg-card px-11 py-3 text-sm shadow-sm outline-none transition-colors focus:border-primary"
          />
        </div>

        <div className="scroll-x-pan flex flex-wrap justify-center gap-2 pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`whitespace-nowrap rounded-full border px-5 py-2 text-[13px] font-medium tracking-wide transition-all ${
                active === cat
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-card text-foreground/80 hover:border-gold-soft hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <p className="font-serif text-2xl text-foreground">Aún no hay arreglos aquí</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Prueba con otra categoría o escríbenos por WhatsApp para un pedido a medida.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p, i) => (
            <div
              key={p.id}
              className="animate-fade-up"
              style={{ animationDelay: `${Math.min(i * 50, 400)}ms` }}
            >
              <ProductCard product={p} settings={settings} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
