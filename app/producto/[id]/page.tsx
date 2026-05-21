import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Leaf, Truck, MessageCircle } from "lucide-react";
import { getCatalog } from "@/lib/storage";
import { formatPrice } from "@/lib/utils";
import { PublicShell } from "@/components/PublicShell";
import { Footer } from "@/components/Footer";
import { ProductActions } from "@/components/ProductActions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage(props: ProductPageProps) {
  const { id } = await props.params;
  const { products, settings } = await getCatalog();
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const showPrice =
    settings.showPricesGlobal && product.showPrice !== false && product.price != null;

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category && p.available !== false)
    .slice(0, 4);

  return (
    <PublicShell products={products} settings={settings}>
      <div className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
        <nav className="mb-8 text-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> Volver al catálogo
          </Link>
        </nav>

        <div className="grid gap-10 md:grid-cols-2">
          <div className="animate-fade-in relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-card shadow-[0_24px_60px_-30px_rgba(124,45,70,0.4)]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(min-width:768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="animate-fade-up flex flex-col justify-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              {product.category}
            </p>
            <h1 className="mt-2 font-serif text-4xl font-medium leading-tight sm:text-5xl">
              {product.name}
            </h1>

            <div className="mt-5 gold-rule" />

            <p className="mt-5 text-base font-light leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <div className="mt-7 font-serif text-4xl font-semibold tabular-nums text-primary">
              {showPrice ? (
                formatPrice(product.price, settings.currency)
              ) : (
                <span className="text-2xl uppercase tracking-wide text-gold">
                  Precio a consultar
                </span>
              )}
            </div>

            <ProductActions product={product} settings={settings} />

            <ul className="mt-8 space-y-3 border-t border-border pt-6 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <Leaf className="h-4 w-4 text-sage" /> Flores frescas seleccionadas a diario.
              </li>
              {settings.address && (
                <li className="flex items-center gap-3">
                  <Truck className="h-4 w-4 text-sage" /> Envío local desde {settings.address}.
                </li>
              )}
              <li className="flex items-center gap-3">
                <MessageCircle className="h-4 w-4 text-sage" /> El pedido se cierra por WhatsApp.
              </li>
            </ul>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <div className="flex flex-col items-center text-center">
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                Para combinar
              </span>
              <h2 className="mt-2 font-serif text-3xl font-medium sm:text-4xl">
                También te puede gustar
              </h2>
              <div className="mt-4 gold-rule" />
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/producto/${p.id}`}
                  className="group block overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(124,45,70,0.35)]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(min-width:768px) 25vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </div>
                  <div className="p-3">
                    <p className="font-serif text-lg font-medium leading-tight">{p.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer settings={settings} />
    </PublicShell>
  );
}
