import { MapPin, Clock } from "lucide-react";
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
    <footer id="contacto" className="border-t border-border bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <h4 className="font-serif text-xl">{settings.storeName}</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            {settings.storeTagline}
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" /> {settings.address}
          </p>
          <p className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" /> {settings.hours}
          </p>
          {settings.instagram && (
            <a
              href={`https://instagram.com/${settings.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary"
            >
              <InstagramIcon className="h-4 w-4 text-primary" /> @
              {settings.instagram}
            </a>
          )}
        </div>
        <div className="text-sm text-muted-foreground">
          <p>
            Todos los pedidos se cierran por WhatsApp al{" "}
            <span className="font-semibold text-foreground">
              +{settings.whatsappNumber}
            </span>
            .
          </p>
          <p className="mt-3 text-xs">
            © {new Date().getFullYear()} {settings.storeName}
          </p>
        </div>
      </div>
    </footer>
  );
}
