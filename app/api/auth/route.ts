import { NextResponse } from "next/server";
import { clearAdminAuth, getAdminPassword, isAdminAuthed, setAdminAuthed } from "@/lib/auth";

export async function GET() {
  return NextResponse.json({ authed: await isAdminAuthed() });
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { password?: string };
  if (!body.password || body.password !== getAdminPassword()) {
    return NextResponse.json({ ok: false, error: "Contraseña incorrecta" }, { status: 401 });
  }
  await setAdminAuthed();
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await clearAdminAuth();
  return NextResponse.json({ ok: true });
}
