// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("@prisma/client");
const Role = { ADMIN: "ADMIN", COACH: "COACH", PLAYER: "PLAYER" } as const;
import bcrypt from "bcryptjs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = new PrismaClient() as any;

async function main() {
  console.log("🌱 Seeding FK Rajec database...");

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await db.user.upsert({
    where: { email: "admin@fkrajec.sk" },
    update: {},
    create: {
      name: "Admin FK Rajec",
      email: "admin@fkrajec.sk",
      password: adminPassword,
      role: Role.ADMIN,
    },
  });

  // Create coach
  const coachPassword = await bcrypt.hash("trener123", 12);
  const coach = await db.user.upsert({
    where: { email: "trener@fkrajec.sk" },
    update: {},
    create: {
      name: "Ján Tréner",
      email: "trener@fkrajec.sk",
      password: coachPassword,
      role: Role.COACH,
    },
  });

  // Create players
  const playerData = [
    { name: "Tomáš Kováč", email: "kovac@fkrajec.sk", position: "Brankár", jerseyNumber: 1 },
    { name: "Martin Novák", email: "novak@fkrajec.sk", position: "Obranca", jerseyNumber: 4 },
    { name: "Dávid Matuš", email: "matus@fkrajec.sk", position: "Útočník", jerseyNumber: 9 },
  ];

  for (const p of playerData) {
    const pw = await bcrypt.hash("hrac123", 12);
    await db.user.upsert({
      where: { email: p.email },
      update: {},
      create: { ...p, password: pw, role: Role.PLAYER },
    });
  }

  // Create sample trainings
  const training1 = await db.training.create({
    data: {
      title: "Tréning — Kondícia & Taktika",
      description: "Fyzická príprava a taktické cvičenia pred víkendovým zápasom.",
      date: new Date("2026-03-10T17:30:00"),
      location: "Štadión FK Rajec",
      duration: 90,
      createdById: coach.id,
    },
  });

  // Sample fixture
  await db.fixture.create({
    data: {
      homeTeam: "FK Rajec",
      awayTeam: "TJ Bytča",
      date: new Date("2026-03-14T15:00:00"),
      venue: "Štadión FK Rajec",
      competition: "5. liga JUH skupina B",
      isHome: true,
    },
  });

  // Sample news article
  await db.newsArticle.create({
    data: {
      title: "Výhra 3:1 nad ŠK Divíky",
      slug: "vyhra-3-1-nad-sk-diviaky",
      excerpt: "FK Rajec predviedol presvedčivý výkon na domácom ihrisku.",
      content: "Detailný popis zápasu...",
      published: true,
      publishedAt: new Date("2026-03-07T18:00:00"),
      authorId: admin.id,
    },
  });

  // League standings
  const standings = [
    { team: "TJ Bytča", position: 1, played: 20, won: 14, drawn: 3, lost: 3, goalsFor: 48, goalsAgainst: 22, points: 45, isFkRajec: false },
    { team: "FK Rajec", position: 2, played: 20, won: 12, drawn: 4, lost: 4, goalsFor: 41, goalsAgainst: 26, points: 40, isFkRajec: true },
    { team: "FK Raková", position: 3, played: 20, won: 11, drawn: 3, lost: 6, goalsFor: 37, goalsAgainst: 28, points: 36, isFkRajec: false },
  ];

  for (const s of standings) {
    await db.standingRow.create({ data: { ...s, competition: "5. liga JUH skupina B" } });
  }

  console.log("✅ Seeding complete!");
  console.log("\nTest accounts:");
  console.log("  Admin:  admin@fkrajec.sk  / admin123");
  console.log("  Coach:  trener@fkrajec.sk / trener123");
  console.log("  Player: kovac@fkrajec.sk  / hrac123");
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
