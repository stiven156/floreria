"use client";

import { useState } from "react";
import { Flower2, Lock } from "lucide-react";

export function AdminLogin() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error || "Error al iniciar sesión");
      setLoading(false);
      return;
    }
    window.location.reload();
  }

  return (
    <div className="grid min-h-dvh place-items-center bg-gradient-to-br from-background via-muted to-accent/30 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-3xl border border-border bg-white p-8 shadow-xl"
      >
        <div className="mb-4 flex items-center gap-2">
          <Flower2 className="h-7 w-7 text-primary" />
          <span className="font-serif text-2xl">Panel admin</span>
        </div>
        <p className="mb-6 text-sm text-muted-foreground">
          Ingresa la contraseña configurada en <code>ADMIN_PASSWORD</code>.
        </p>
        <label className="mb-1 block text-xs font-medium uppercase text-muted-foreground">
          Contraseña
        </label>
        <div className="relative mb-4">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
            className="w-full rounded-full border border-border bg-background px-9 py-3 text-sm outline-none focus:border-primary"
            placeholder="••••••••"
          />
        </div>
        {error && (
          <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-95 disabled:opacity-50"
        >
          {loading ? "Verificando…" : "Entrar"}
        </button>
      </form>
    </div>
  );
}
