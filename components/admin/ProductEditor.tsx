"use client";

import { useState } from "react";
import { X, Save } from "lucide-react";
import type { Product, StoreSettings } from "@/lib/types";
import { ImagePicker } from "./ImagePicker";

const EMPTY: Product = {
  id: "new",
  name: "",
  description: "",
  price: 0,
  image: "",
  category: "Ramos",
  showPrice: true,
  available: true,
  featured: false,
};

export function ProductEditor({
  product,
  settings,
  onClose,
  onSaved,
}: {
  product: Product | null;
  settings: StoreSettings;
  onClose: () => void;
  onSaved: () => void | Promise<void>;
}) {
  const [form, setForm] = useState<Product>(product ?? EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof Product>(key: K, value: Product[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function save() {
    setSaving(true);
    setError(null);
    const payload: Product = {
      ...form,
      price: form.showPrice === false ? null : form.price ?? null,
    };
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product: payload }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error || "No se pudo guardar");
      setSaving(false);
      return;
    }
    await onSaved();
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div className="flex max-h-[90dvh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <h3 className="font-serif text-xl">
            {product ? "Editar producto" : "Nuevo producto"}
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-muted"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="space-y-4 overflow-y-auto px-5 py-4">
          <Field label="Nombre">
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className={inputCls}
              placeholder="Ej: Ramo de Rosas Rojas"
            />
          </Field>

          <Field label="Descripción">
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className={inputCls}
              placeholder="Describe el arreglo, materiales, tamaño…"
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Categoría">
              <input
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                className={inputCls}
                placeholder="Ramos, Cajas, Plantas…"
                list="cat-suggest"
              />
              <datalist id="cat-suggest">
                <option value="Ramos" />
                <option value="Cajas" />
                <option value="Plantas" />
                <option value="Bodas" />
                <option value="Fúnebres" />
                <option value="Cumpleaños" />
              </datalist>
            </Field>

            <Field label={`Precio (${settings.currency})`}>
              <input
                type="number"
                min={0}
                step={1000}
                value={form.price ?? 0}
                onChange={(e) => update("price", Number(e.target.value))}
                disabled={form.showPrice === false}
                className={inputCls}
              />
            </Field>
          </div>

          <ImagePicker
            value={form.image}
            onChange={(url) => update("image", url)}
            label="Foto del producto"
          />

          <div className="grid gap-3 sm:grid-cols-3">
            <Toggle
              label="Mostrar precio"
              value={form.showPrice !== false}
              onChange={(v) => update("showPrice", v)}
            />
            <Toggle
              label="Disponible"
              value={form.available !== false}
              onChange={(v) => update("available", v)}
            />
            <Toggle
              label="Destacado"
              value={!!form.featured}
              onChange={(v) => update("featured", v)}
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}
        </div>

        <footer className="flex justify-end gap-2 border-t border-border bg-muted/30 px-5 py-3">
          <button
            onClick={onClose}
            className="rounded-full border border-border bg-white px-4 py-2 text-sm hover:bg-muted"
          >
            Cancelar
          </button>
          <button
            onClick={save}
            disabled={saving || !form.name || !form.image}
            className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? "Guardando…" : "Guardar"}
          </button>
        </footer>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-xs font-medium uppercase text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

function Toggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-border bg-background px-3 py-2 text-sm">
      <span>{label}</span>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative h-6 w-11 rounded-full transition ${
          value ? "bg-primary" : "bg-muted-foreground/30"
        }`}
        aria-pressed={value}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
            value ? "left-5" : "left-0.5"
          }`}
        />
      </button>
    </label>
  );
}
