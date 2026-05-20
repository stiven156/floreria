"use client";

import { useMemo, useState } from "react";
import {
  Flower2,
  LogOut,
  Plus,
  Search,
  Settings as SettingsIcon,
  Package,
  AlertTriangle,
  Eye,
} from "lucide-react";
import type { Product, StoreSettings } from "@/lib/types";
import { ProductList } from "./ProductList";
import { ProductEditor } from "./ProductEditor";
import { SettingsForm } from "./SettingsForm";

type Tab = "productos" | "ajustes";

export function AdminDashboard({
  initialProducts,
  initialSettings,
  persistenceConfigured,
}: {
  initialProducts: Product[];
  initialSettings: StoreSettings;
  persistenceConfigured: boolean;
}) {
  const [tab, setTab] = useState<Tab>("productos");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [settings, setSettings] = useState<StoreSettings>(initialSettings);
  const [editing, setEditing] = useState<Product | "new" | null>(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) =>
      query.trim()
        ? (p.name + " " + p.category + " " + p.description)
            .toLowerCase()
            .includes(query.toLowerCase())
        : true
    );
  }, [products, query]);

  async function logout() {
    await fetch("/api/auth", { method: "DELETE" });
    window.location.reload();
  }

  async function refreshProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data.products);
  }

  return (
    <div className="min-h-dvh bg-muted/40">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Flower2 className="h-6 w-6 text-primary" />
            <span className="font-serif text-xl">Admin · {settings.storeName}</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1 rounded-full border border-border bg-white px-3 py-1.5 text-xs hover:bg-muted sm:inline-flex"
            >
              <Eye className="h-3.5 w-3.5" /> Ver tienda
            </a>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1.5 text-xs hover:bg-muted"
            >
              <LogOut className="h-3.5 w-3.5" /> Salir
            </button>
          </div>
        </div>

        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4">
          <TabButton
            active={tab === "productos"}
            onClick={() => setTab("productos")}
            icon={<Package className="h-4 w-4" />}
            label="Productos"
          />
          <TabButton
            active={tab === "ajustes"}
            onClick={() => setTab("ajustes")}
            icon={<SettingsIcon className="h-4 w-4" />}
            label="Ajustes"
          />
        </nav>
      </header>

      {!persistenceConfigured && (
        <div className="border-b border-amber-200 bg-amber-50">
          <div className="mx-auto flex max-w-6xl items-start gap-2 px-4 py-3 text-sm text-amber-800">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              <strong>Persistencia no configurada.</strong> Para que tus cambios
              queden guardados en producción conecta{" "}
              <strong>Vercel Blob</strong> al proyecto y agrega la variable{" "}
              <code>BLOB_READ_WRITE_TOKEN</code>. Mientras tanto, las
              ediciones aparecerán pero no se persistirán entre despliegues.
            </p>
          </div>
        </div>
      )}

      <main className="mx-auto max-w-6xl px-4 py-6">
        {tab === "productos" && (
          <>
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-sm">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar producto…"
                  className="w-full rounded-full border border-border bg-white px-9 py-2 text-sm shadow-sm outline-none focus:border-primary"
                />
              </div>
              <button
                onClick={() => setEditing("new")}
                className="inline-flex items-center justify-center gap-1 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95"
              >
                <Plus className="h-4 w-4" /> Nuevo producto
              </button>
            </div>

            <ProductList
              products={filtered}
              settings={settings}
              onEdit={(p) => setEditing(p)}
              onRefresh={refreshProducts}
            />
          </>
        )}

        {tab === "ajustes" && (
          <SettingsForm
            initial={settings}
            onSaved={(s) => setSettings(s)}
            persistenceConfigured={persistenceConfigured}
          />
        )}
      </main>

      {editing && (
        <ProductEditor
          product={editing === "new" ? null : editing}
          settings={settings}
          onClose={() => setEditing(null)}
          onSaved={async () => {
            setEditing(null);
            await refreshProducts();
          }}
        />
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 border-b-2 px-3 py-2 text-sm transition ${
        active
          ? "border-primary text-primary"
          : "border-transparent text-muted-foreground hover:text-foreground"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
