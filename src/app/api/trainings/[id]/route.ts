import { NextResponse } from "next/server";
import { loadAuthModule, loadDbModule, isStaticExport } from "@/lib/runtime";

export const dynamic = "force-static";

export function generateStaticParams() {
  return [];
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  if (isStaticExport) {
    return NextResponse.json({ error: "API is unavailable on static hosting" }, { status: 501 });
  }

  const { auth } = await loadAuthModule();
  const { db } = await loadDbModule();
  const session = (await auth()) as { user: { role: string; id: string } } | null;
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.user.role === "PLAYER") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  await db.training.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (isStaticExport) {
    return NextResponse.json({ error: "API is unavailable on static hosting" }, { status: 501 });
  }

  const { auth } = await loadAuthModule();
  const { db } = await loadDbModule();
  const session = (await auth()) as { user: { role: string; id: string } } | null;
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.user.role === "PLAYER") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const body = await req.json();
  const training = await db.training.update({ where: { id }, data: body });
  return NextResponse.json(training);
}
