"use client";

import { useMemo, useState } from "react";
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
          ? (p.name + " " + p.description)
              .toLowerCase()
              .includes(query.toLowerCase())
          : true
      );
  }, [products, active, query]);

  return (
    <section id="productos" className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 id="categorias" className="font-serif text-3xl">
            Nuestro catálogo
          </h2>
          <p className="text-sm text-muted-foreground">
            Toca un producto para ver detalles o pídelo por WhatsApp.
          </p>
        </div>

        <input
          type="search"
          placeholder="Buscar flores, ramos, plantas…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-full border border-border bg-white px-4 py-2 text-sm shadow-sm outline-none focus:border-primary sm:w-72"
        />
      </div>

      <div className="scroll-x-pan mb-8 flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-sm transition ${
              active === cat
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-white hover:border-primary/40"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl bg-muted p-8 text-center text-muted-foreground">
          No encontramos productos para tu búsqueda.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} settings={settings} />
          ))}
        </div>
      )}
    </section>
  );
}
