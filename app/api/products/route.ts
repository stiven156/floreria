import { NextResponse } from "next/server";
import { getCatalog, saveCatalog, isPersistenceConfigured } from "@/lib/storage";
import { isAdminAuthed } from "@/lib/auth";
import type { Product } from "@/lib/types";

export async function GET() {
  const data = await getCatalog();
  return NextResponse.json({
    products: data.products,
    persistence: isPersistenceConfigured(),
  });
}

export async function POST(req: Request) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  }
  const body = (await req.json()) as { product: Product };
  if (!body.product || !body.product.name) {
    return NextResponse.json({ ok: false, error: "Producto inválido" }, { status: 400 });
  }

  const data = await getCatalog();
  const incoming = body.product;
  const id =
    incoming.id && incoming.id !== "new"
      ? incoming.id
      : `p-${Date.now().toString(36)}`;
  const newProduct: Product = { ...incoming, id };

  const exists = data.products.findIndex((p) => p.id === id);
  if (exists >= 0) {
    data.products[exists] = newProduct;
  } else {
    data.products.unshift(newProduct);
  }

  try {
    await saveCatalog(data);
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true, product: newProduct });
}

export async function DELETE(req: Request) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, error: "Falta id" }, { status: 400 });

  const data = await getCatalog();
  data.products = data.products.filter((p) => p.id !== id);

  try {
    await saveCatalog(data);
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true });
}
