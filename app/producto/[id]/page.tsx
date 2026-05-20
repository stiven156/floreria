import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCatalog } from "@/lib/storage";
import { formatPrice } from "@/lib/utils";
import { PublicShell } from "@/components/PublicShell";
import { Footer } from "@/components/Footer";
import { ProductActions } from "@/components/ProductActions";

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
      <div className="mx-auto max-w-6xl px-4 py-8">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            ← Volver al catálogo
          </Link>
        </nav>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-white">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(min-width:768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              {product.category}
            </p>
            <h1 className="mt-1 font-serif text-3xl md:text-4xl">{product.name}</h1>

            <p className="mt-3 text-base text-muted-foreground">
              {product.description}
            </p>

            <div className="mt-6 text-3xl font-serif text-primary">
              {showPrice
                ? formatPrice(product.price, settings.currency)
                : "Precio a consultar"}
            </div>

            <ProductActions product={product} settings={settings} />

            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li>🌿 Flores frescas seleccionadas a diario.</li>
              <li>🚚 Envío local desde {settings.address}.</li>
              <li>📞 Cierre del pedido por WhatsApp.</li>
            </ul>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-4 font-serif text-2xl">También te puede gustar</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/producto/${p.id}`}
                  className="group block overflow-hidden rounded-2xl border border-border bg-white"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(min-width:768px) 25vw, 50vw"
                      className="object-cover transition group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3">
                    <p className="font-serif text-base">{p.name}</p>
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
