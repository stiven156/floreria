import Image from "next/image";
import type { StoreSettings } from "@/lib/types";

export function Hero({ settings }: { settings: StoreSettings }) {
  const hasImage = Boolean(settings.heroImage?.trim());

  return (
    <section className="relative isolate min-h-[520px] overflow-hidden bg-gradient-to-br from-[#3a0d1e] via-[#7a1e3a] to-[#e11d74] sm:min-h-[600px]">
      {hasImage && (
        <Image
          src={settings.heroImage}
          alt={settings.storeName}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-90"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[520px] max-w-6xl flex-col justify-end px-4 py-16 text-white sm:min-h-[600px] sm:py-24">
        <p
          className="mb-3 inline-block w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-medium tracking-wide backdrop-blur-md"
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}
        >
          Pedidos por WhatsApp · Envío local
        </p>
        <h1
          className="font-serif text-4xl leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)] sm:text-5xl md:text-6xl"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}
        >
          {settings.storeName}
        </h1>
        <p
          className="mt-4 max-w-xl text-base text-white/95 md:text-lg"
          style={{ textShadow: "0 1px 6px rgba(0,0,0,0.55)" }}
        >
          {settings.storeTagline}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#productos"
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-xl ring-1 ring-white/20 hover:opacity-95"
          >
            Ver catálogo
          </a>
          <a
            href="#contacto"
            className="rounded-full border border-white/50 bg-white/15 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/25"
          >
            Contáctanos
          </a>
        </div>
      </div>
    </section>
  );
}
