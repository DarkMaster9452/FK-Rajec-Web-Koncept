import { NextResponse } from "next/server";
import { loadAuthModule, loadDbModule, isStaticExport } from "@/lib/runtime";
import { z } from "zod";

export const dynamic = "force-static";

const TrainingSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  date: z.string(),
  location: z.string().min(1),
  duration: z.number().int().min(15).max(240).default(90),
});

export async function GET() {
  if (isStaticExport) {
    return NextResponse.json({ error: "API is unavailable on static hosting" }, { status: 501 });
  }

  const { auth } = await loadAuthModule();
  const { db } = await loadDbModule();
  const session = (await auth()) as { user: { role: string; id: string } } | null;
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const trainings = await db.training.findMany({
    orderBy: { date: "asc" },
    include: { createdBy: { select: { name: true } }, attendance: true },
  });

  return NextResponse.json(trainings);
}

export async function POST(req: Request) {
  if (isStaticExport) {
    return NextResponse.json({ error: "API is unavailable on static hosting" }, { status: 501 });
  }

  const { auth } = await loadAuthModule();
  const { db } = await loadDbModule();
  const session = (await auth()) as { user: { role: string; id: string } } | null;
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.user.role === "PLAYER") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const data = TrainingSchema.parse(body);

  const training = await db.training.create({
    data: {
      ...data,
      date: new Date(data.date),
      createdById: session.user.id,
    },
  });

  // Create notifications for all players
  const players = await db.user.findMany({ where: { role: "PLAYER" } });
  await db.notification.createMany({
    data: players.map((p: { id: string }) => ({
      userId: p.id,
      trainingId: training.id,
      message: `Nový tréning: ${training.title} — ${new Date(training.date).toLocaleDateString("sk-SK")} o ${new Date(training.date).toLocaleTimeString("sk-SK", { hour: "2-digit", minute: "2-digit" })} na ${training.location}`,
    })),
  });

  return NextResponse.json(training, { status: 201 });
}
