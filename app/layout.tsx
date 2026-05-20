import type { Metadata } from "next";
import "./globals.css";
import { getCatalog } from "@/lib/storage";

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getCatalog();
  return {
    title: `${settings.storeName} — Catálogo`,
    description: settings.storeTagline,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
