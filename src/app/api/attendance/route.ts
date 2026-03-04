import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const session = await auth();
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
