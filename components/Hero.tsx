import Image from "next/image";
import type { StoreSettings } from "@/lib/types";

export function Hero({ settings }: { settings: StoreSettings }) {
  const hasImage = Boolean(settings.heroImage?.trim());

  return (
    <section className="relative isolate min-h-[560px] overflow-hidden bg-gradient-to-br from-[#3a1322] via-[#6d2540] to-[#a23e5c] sm:min-h-[660px]">
      {hasImage && (
        <Image
          src={settings.heroImage}
          alt={settings.storeName}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-85"
        />
      )}

      {/* Overlays para legibilidad garantizada */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-transparent" />

      {/* Marco decorativo dorado */}
      <div className="pointer-events-none absolute inset-4 rounded-[18px] border border-white/15 sm:inset-6" />

      <div className="relative z-10 mx-auto flex min-h-[560px] max-w-6xl flex-col justify-end px-6 py-16 text-white sm:min-h-[660px] sm:px-10 sm:py-24">
        <div className="animate-fade-up max-w-2xl">
          <p
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold-soft/40 bg-white/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-gold-soft backdrop-blur-md"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}
          >
            <span className="h-1 w-1 rounded-full bg-gold-soft" />
            Floristería Boutique · Envío local
          </p>

          <h1
            className="font-serif text-5xl font-medium leading-[0.95] tracking-tight sm:text-7xl md:text-[5.5rem]"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.55)" }}
          >
            {settings.storeName}
          </h1>

          <div className="mt-6 gold-rule" />

          <p
            className="mt-6 max-w-xl text-base font-light leading-relaxed text-white/90 sm:text-lg"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
          >
            {settings.storeTagline}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#productos"
              className="group rounded-full bg-primary-foreground px-7 py-3.5 text-sm font-semibold tracking-wide text-primary-deep shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
            >
              Ver catálogo
            </a>
            <a
              href="#contacto"
              className="rounded-full border border-white/45 bg-white/5 px-7 py-3.5 text-sm font-medium tracking-wide text-white backdrop-blur-md transition-all duration-300 hover:bg-white/15"
            >
              Contáctanos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
