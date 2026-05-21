import { MapPin, Clock, Flower2 } from "lucide-react";
import type { StoreSettings } from "@/lib/types";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer({ settings }: { settings: StoreSettings }) {
  return (
    <footer id="contacto" className="border-t border-border bg-background-2 paper">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        <div className="flex flex-col items-center text-center">
          <span className="grid h-12 w-12 place-items-center rounded-full border border-gold-soft/50 bg-card text-primary">
            <Flower2 className="h-5 w-5" />
          </span>
          <h4 className="mt-4 font-serif text-3xl font-medium">{settings.storeName}</h4>
          <p className="mt-2 max-w-md text-sm font-light leading-relaxed text-muted-foreground">
            {settings.storeTagline}
          </p>
          <div className="mt-5 gold-rule" />
        </div>

        <div className="mt-12 grid gap-8 text-sm sm:grid-cols-3">
          <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
              Visítanos
            </span>
            {settings.address ? (
              <p className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" /> {settings.address}
              </p>
            ) : (
              <p className="text-muted-foreground">Pedidos a domicilio</p>
            )}
          </div>

          <div className="flex flex-col items-center gap-2 text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
              Horario
            </span>
            <p className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 text-primary" /> {settings.hours}
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 text-center sm:items-end sm:text-right">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
              Síguenos
            </span>
            {settings.instagram && (
              <a
                href={`https://instagram.com/${settings.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
              >
                <InstagramIcon className="h-4 w-4 text-primary" /> @{settings.instagram}
              </a>
            )}
            <p className="text-muted-foreground">
              WhatsApp +{settings.whatsappNumber}
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          <p>
            Todos los pedidos se cierran por WhatsApp. © {new Date().getFullYear()}{" "}
            {settings.storeName}.
          </p>
        </div>
      </div>
    </footer>
  );
}
