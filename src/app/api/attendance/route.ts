import { NextResponse } from "next/server";
import { loadAuthModule, loadDbModule, isStaticExport } from "@/lib/runtime";

export const dynamic = "force-static";

export async function POST(req: Request) {
  if (isStaticExport) {
    return NextResponse.json({ error: "API is unavailable on static hosting" }, { status: 501 });
  }

  const { auth } = await loadAuthModule();
  const { db } = await loadDbModule();
  const session = (await auth()) as { user: { role: string; id: string } } | null;
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { trainingId, userId, status } = await req.json();

  // Players can only update their own attendance
  if (session.user.role === "PLAYER" && userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const attendance = await db.attendance.upsert({
    where: { trainingId_userId: { trainingId, userId } },
    update: { status },
    create: { trainingId, userId, status },
  });

  return NextResponse.json(attendance);
}
