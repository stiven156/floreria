import { getCatalog } from "@/lib/storage";
import { Hero } from "@/components/Hero";
import { CatalogGrid } from "@/components/CatalogGrid";
import { Footer } from "@/components/Footer";
import { PublicShell } from "@/components/PublicShell";
import type { Product } from "@/lib/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const { products, settings } = await getCatalog();
  const featured: Product[] = products.filter((p) => p.featured && p.available !== false);

  return (
    <PublicShell products={products} settings={settings}>
      <Hero settings={settings} />

      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                Selección especial
              </span>
              <h2 className="mt-2 font-serif text-4xl font-medium sm:text-5xl">
                Destacados
              </h2>
            </div>
            <a
              href="#productos"
              className="hidden text-sm font-medium tracking-wide text-primary underline-offset-4 hover:underline sm:inline"
            >
              Ver todo →
            </a>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {featured.slice(0, 4).map((p, i) => (
              <FeaturedTile key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      <div className="paper">
        <CatalogGrid products={products} settings={settings} />
      </div>
      <Footer settings={settings} />
    </PublicShell>
  );
}

function FeaturedTile({ product, index }: { product: Product; index: number }) {
  return (
    <a
      href={`/producto/${product.id}`}
      className="group animate-fade-up relative block aspect-[3/4] overflow-hidden rounded-2xl border border-border"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={product.image}
        alt={product.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4 text-white">
        <p className="text-[10px] uppercase tracking-[0.18em] text-gold-soft">
          {product.category}
        </p>
        <p className="mt-1 font-serif text-xl font-medium leading-tight drop-shadow">
          {product.name}
        </p>
      </div>
    </a>
  );
}
