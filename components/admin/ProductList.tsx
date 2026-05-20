"use client";

import { Pencil, Trash2, EyeOff, Eye } from "lucide-react";
import type { Product, StoreSettings } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export function ProductList({
  products,
  settings,
  onEdit,
  onRefresh,
}: {
  products: Product[];
  settings: StoreSettings;
  onEdit: (p: Product) => void;
  onRefresh: () => Promise<void>;
}) {
  async function deleteProduct(id: string) {
    if (!confirm("¿Eliminar este producto?")) return;
    const res = await fetch(`/api/products?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      alert(data.error || "No se pudo eliminar");
      return;
    }
    await onRefresh();
  }

  async function toggleAvailable(p: Product) {
    const updated: Product = { ...p, available: p.available === false };
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product: updated }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      alert(data.error || "No se pudo actualizar");
      return;
    }
    await onRefresh();
  }

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-white p-10 text-center text-muted-foreground">
        No hay productos. Crea el primero con el botón “Nuevo producto”.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-muted/60 text-left">
          <tr>
            <th className="px-4 py-3">Producto</th>
            <th className="hidden px-4 py-3 md:table-cell">Categoría</th>
            <th className="px-4 py-3">Precio</th>
            <th className="hidden px-4 py-3 sm:table-cell">Estado</th>
            <th className="px-4 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t border-border">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium">{p.name}</p>
                    <p className="line-clamp-1 text-xs text-muted-foreground">
                      {p.description}
                    </p>
                  </div>
                </div>
              </td>
              <td className="hidden px-4 py-3 md:table-cell">{p.category}</td>
              <td className="px-4 py-3">
                {p.showPrice === false || p.price == null ? (
                  <span className="text-muted-foreground">Oculto</span>
                ) : (
                  formatPrice(p.price, settings.currency)
                )}
              </td>
              <td className="hidden px-4 py-3 sm:table-cell">
                {p.available === false ? (
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                    No disponible
                  </span>
                ) : (
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                    Activo
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-right">
                <div className="inline-flex gap-1">
                  <button
                    onClick={() => toggleAvailable(p)}
                    className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                    aria-label="Mostrar/Ocultar"
                  >
                    {p.available === false ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={() => onEdit(p)}
                    className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                    aria-label="Editar"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="rounded-full p-2 text-muted-foreground hover:bg-red-50 hover:text-red-600"
                    aria-label="Eliminar"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
