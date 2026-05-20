import type { CatalogData } from "./types";
import seed from "@/data/seed.json";

const BLOB_KEY = "catalog.json";
const SEED = seed as CatalogData;

type BlobModule = typeof import("@vercel/blob");

let cache: { data: CatalogData; at: number } | null = null;
const TTL_MS = 5_000;

function hasBlob(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function blob(): Promise<BlobModule> {
  return await import("@vercel/blob");
}

async function readBlob(): Promise<CatalogData | null> {
  try {
    const { list } = await blob();
    const { blobs } = await list({ prefix: BLOB_KEY });
    const found = blobs.find((b) => b.pathname === BLOB_KEY);
    if (!found) return null;
    const res = await fetch(found.url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as CatalogData;
  } catch (err) {
    console.warn("Blob read failed:", err);
    return null;
  }
}

async function writeBlob(data: CatalogData): Promise<void> {
  const { put } = await blob();
  await put(BLOB_KEY, JSON.stringify(data, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function getCatalog(): Promise<CatalogData> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.data;
  if (hasBlob()) {
    const data = (await readBlob()) ?? SEED;
    cache = { data, at: Date.now() };
    return data;
  }
  cache = { data: SEED, at: Date.now() };
  return SEED;
}

export async function saveCatalog(data: CatalogData): Promise<void> {
  if (!hasBlob()) {
    throw new Error(
      "Falta configurar BLOB_READ_WRITE_TOKEN para guardar cambios. Conecta Vercel Blob al proyecto."
    );
  }
  await writeBlob(data);
  cache = { data, at: Date.now() };
}

export function invalidateCache(): void {
  cache = null;
}

export function isPersistenceConfigured(): boolean {
  return hasBlob();
}
