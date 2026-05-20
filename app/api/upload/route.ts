import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { isAdminAuthed } from "@/lib/auth";

const MAX_BYTES = 6 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];

export async function POST(req: Request) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { ok: false, error: "Vercel Blob no está configurado." },
      { status: 500 }
    );
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "Falta archivo" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { ok: false, error: "La imagen pesa más de 6 MB." },
      { status: 400 }
    );
  }
  if (file.type && !ALLOWED.includes(file.type)) {
    return NextResponse.json(
      { ok: false, error: "Formato no permitido. Usa JPG, PNG, WEBP, GIF o AVIF." },
      { status: 400 }
    );
  }

  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const safeName = `productos/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const blob = await put(safeName, file, {
    access: "public",
    contentType: file.type || `image/${ext}`,
    addRandomSuffix: false,
  });

  return NextResponse.json({ ok: true, url: blob.url });
}
