import { getCatalog } from "@/lib/storage";
import { Hero } from "@/components/Hero";

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { CatalogGrid } from "@/components/CatalogGrid";
import { Footer } from "@/components/Footer";
import { PublicShell } from "@/components/PublicShell";
import type { Product } from "@/lib/types";

export default async function Home() {
  const { products, settings } = await getCatalog();
  const featured: Product[] = products.filter((p) => p.featured && p.available !== false);

  return (
    <PublicShell products={products} settings={settings}>
      <Hero settings={settings} />

      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-10">
          <h2 className="mb-4 font-serif text-2xl">Destacados</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {featured.slice(0, 4).map((p) => (
              <FeaturedTile key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <CatalogGrid products={products} settings={settings} />
      <Footer settings={settings} />
    </PublicShell>
  );
}

function FeaturedTile({ product }: { product: Product }) {
  return (
    <a
      href={`/producto/${product.id}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-2xl"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={product.image}
        alt={product.name}
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute bottom-3 left-3 right-3 text-white">
        <p className="text-xs uppercase tracking-wider opacity-80">
          {product.category}
        </p>
        <p className="font-serif text-lg leading-tight">{product.name}</p>
      </div>
    </a>
  );
}
