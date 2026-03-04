import { NextResponse } from "next/server";
import { loadAuthModule, loadDbModule, isStaticExport } from "@/lib/runtime";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const dynamic = "force-static";

const CreateUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["ADMIN", "COACH", "PLAYER"]),
  position: z.string().optional(),
  jerseyNumber: z.number().int().optional(),
});

export async function GET() {
  if (isStaticExport) {
    return NextResponse.json({ error: "API is unavailable on static hosting" }, { status: 501 });
  }

  const { auth } = await loadAuthModule();
  const { db } = await loadDbModule();
  const session = (await auth()) as { user: { role: string; id: string } } | null;
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = await db.user.findMany({
    select: { id: true, name: true, email: true, role: true, position: true, jerseyNumber: true, isActive: true, image: true },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(users);
}

export async function POST(req: Request) {
  if (isStaticExport) {
    return NextResponse.json({ error: "API is unavailable on static hosting" }, { status: 501 });
  }

  const { auth } = await loadAuthModule();
  const { db } = await loadDbModule();
  const session = (await auth()) as { user: { role: string; id: string } } | null;
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const data = CreateUserSchema.parse(body);
  const hashedPassword = await bcrypt.hash(data.password, 12);

  const user = await db.user.create({
    data: { ...data, password: hashedPassword },
  });

  return NextResponse.json({ id: user.id, name: user.name, email: user.email, role: user.role }, { status: 201 });
}
