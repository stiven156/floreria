"use client";

import { CartProvider } from "./CartProvider";
import { CartDrawer } from "./CartDrawer";
import { WhatsAppFab } from "./WhatsAppFab";
import { Header } from "./Header";
import type { Product, StoreSettings } from "@/lib/types";

export function PublicShell({
  products,
  settings,
  children,
}: {
  products: Product[];
  settings: StoreSettings;
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <Header settings={settings} />
      <main>{children}</main>
      <CartDrawer products={products} settings={settings} />
      <WhatsAppFab settings={settings} />
    </CartProvider>
  );
}
