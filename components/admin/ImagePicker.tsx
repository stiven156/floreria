"use client";

import { useRef, useState } from "react";
import { Upload, Link as LinkIcon } from "lucide-react";

export function ImagePicker({
  value,
  onChange,
  label = "Imagen",
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"file" | "url">("file");

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json().catch(() => ({}));
    setUploading(false);
    if (!res.ok) {
      setError(data.error || "No se pudo subir la imagen");
      return;
    }
    onChange(data.url);
  }

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span className="block text-xs font-medium uppercase text-muted-foreground">
          {label}
        </span>
        <div className="inline-flex rounded-full border border-border bg-background p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setMode("file")}
            className={`flex items-center gap-1 rounded-full px-2 py-1 ${
              mode === "file" ? "bg-primary text-primary-foreground" : ""
            }`}
          >
            <Upload className="h-3 w-3" /> Subir
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`flex items-center gap-1 rounded-full px-2 py-1 ${
              mode === "url" ? "bg-primary text-primary-foreground" : ""
            }`}
          >
            <LinkIcon className="h-3 w-3" /> URL
          </button>
        </div>
      </div>

      {mode === "file" ? (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-background px-3 py-6 text-sm text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-50"
        >
          <Upload className="h-4 w-4" />
          {uploading ? "Subiendo…" : "Elegir imagen desde tu computador"}
        </button>
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://…"
          className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
        />
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
          e.target.value = "";
        }}
      />

      {error && (
        <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
          {error}
        </p>
      )}

      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt="preview"
          className="mt-2 h-32 w-32 rounded-lg object-cover ring-1 ring-border"
        />
      )}
    </div>
  );
}
