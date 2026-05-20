import { cookies } from "next/headers";

const COOKIE = "floreria_admin";
const VALUE = "ok";

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "admin123";
}

export async function isAdminAuthed(): Promise<boolean> {
  const jar = await cookies();
  return jar.get(COOKIE)?.value === VALUE;
}

export async function setAdminAuthed(): Promise<void> {
  const jar = await cookies();
  jar.set(COOKIE, VALUE, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export async function clearAdminAuth(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE);
}
