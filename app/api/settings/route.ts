import { NextResponse } from "next/server";
import { getCatalog, saveCatalog } from "@/lib/storage";
import { isAdminAuthed } from "@/lib/auth";
import type { StoreSettings } from "@/lib/types";

export async function GET() {
  const data = await getCatalog();
  return NextResponse.json({ settings: data.settings });
}

export async function PUT(req: Request) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  }
  const body = (await req.json()) as { settings: StoreSettings };
  if (!body.settings) {
    return NextResponse.json({ ok: false, error: "Settings inválidos" }, { status: 400 });
  }
  const data = await getCatalog();
  data.settings = { ...data.settings, ...body.settings };

  try {
    await saveCatalog(data);
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true, settings: data.settings });
}
