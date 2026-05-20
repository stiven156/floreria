import Image from "next/image";
import type { StoreSettings } from "@/lib/types";

export function Hero({ settings }: { settings: StoreSettings }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src={settings.heroImage}
          alt="Flores frescas"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-transparent" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-24 text-white sm:py-32 md:py-40">
        <p className="mb-3 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-medium tracking-wide backdrop-blur">
          Pedidos por WhatsApp · Envío local
        </p>
        <h1 className="font-serif text-4xl leading-tight sm:text-5xl md:text-6xl">
          {settings.storeName}
        </h1>
        <p className="mt-4 max-w-xl text-base text-white/90 md:text-lg">
          {settings.storeTagline}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#productos"
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg hover:opacity-95"
          >
            Ver catálogo
          </a>
          <a
            href="#contacto"
            className="rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold backdrop-blur hover:bg-white/20"
          >
            Contáctanos
          </a>
        </div>
      </div>
    </section>
  );
}
