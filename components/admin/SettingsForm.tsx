"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import type { StoreSettings } from "@/lib/types";

export function SettingsForm({
  initial,
  onSaved,
  persistenceConfigured,
}: {
  initial: StoreSettings;
  onSaved: (s: StoreSettings) => void;
  persistenceConfigured: boolean;
}) {
  const [form, setForm] = useState<StoreSettings>(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  function update<K extends keyof StoreSettings>(key: K, value: StoreSettings[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function save() {
    setSaving(true);
    setMsg(null);
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ settings: form }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setMsg(data.error || "Error al guardar");
      setSaving(false);
      return;
    }
    onSaved(data.settings);
    setMsg("Guardado ✓");
    setSaving(false);
    setTimeout(() => setMsg(null), 2000);
  }

  return (
    <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
      <h3 className="font-serif text-xl">Ajustes de la tienda</h3>
      <p className="mb-4 text-sm text-muted-foreground">
        Estos datos aparecen en el catálogo público y en los mensajes de
        WhatsApp.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre de la tienda">
          <input
            value={form.storeName}
            onChange={(e) => update("storeName", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Slogan / tagline">
          <input
            value={form.storeTagline}
            onChange={(e) => update("storeTagline", e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field label="Número de WhatsApp (con código de país, sin +)">
          <input
            value={form.whatsappNumber}
            onChange={(e) => update("whatsappNumber", e.target.value)}
            className={inputCls}
            placeholder="573001234567"
          />
        </Field>
        <Field label="Moneda (código ISO)">
          <input
            value={form.currency}
            onChange={(e) => update("currency", e.target.value.toUpperCase())}
            className={inputCls}
            maxLength={3}
            placeholder="COP, USD, MXN…"
          />
        </Field>

        <Field label="Dirección">
          <input
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Horario">
          <input
            value={form.hours}
            onChange={(e) => update("hours", e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field label="Instagram (sin @)">
          <input
            value={form.instagram}
            onChange={(e) => update("instagram", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Imagen hero (URL)">
          <input
            value={form.heroImage}
            onChange={(e) => update("heroImage", e.target.value)}
            className={inputCls}
          />
        </Field>
      </div>

      <label className="mt-5 flex cursor-pointer items-center justify-between rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm">
        <div>
          <p className="font-medium">Mostrar precios en el catálogo</p>
          <p className="text-xs text-muted-foreground">
            Si lo apagas, todos los productos aparecerán como “Precio a
            consultar”.
          </p>
        </div>
        <button
          type="button"
          onClick={() => update("showPricesGlobal", !form.showPricesGlobal)}
          className={`relative h-6 w-11 rounded-full transition ${
            form.showPricesGlobal ? "bg-primary" : "bg-muted-foreground/30"
          }`}
          aria-pressed={form.showPricesGlobal}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
              form.showPricesGlobal ? "left-5" : "left-0.5"
            }`}
          />
        </button>
      </label>

      <div className="mt-5 flex items-center justify-between">
        {msg ? (
          <span className="text-sm text-emerald-700">{msg}</span>
        ) : (
          <span className="text-xs text-muted-foreground">
            {persistenceConfigured
              ? "Cambios se guardan en Vercel Blob"
              : "Sin persistencia configurada"}
          </span>
        )}
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {saving ? "Guardando…" : "Guardar cambios"}
        </button>
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
