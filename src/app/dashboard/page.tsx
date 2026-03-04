import { auth } from "@/lib/auth";
import { mockTrainings, mockResults, mockPlayers } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Users, Trophy, TrendingUp, ClipboardList } from "lucide-react";
import { format } from "date-fns";
import { sk } from "date-fns/locale";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const roleWelcome = {
  ADMIN: "Vitaj, správca!",
  COACH: "Vitaj, tréner!",
  PLAYER: "Vitaj, hráč!",
};

export default async function DashboardPage() {
  const session = await auth();
  const role = session?.user.role ?? "PLAYER";
  const nextTraining = mockTrainings[0];
  const recentWins = mockResults.filter((r) => r.outcome === "WIN").length;

  const stats = [
    {
      title: "Hráči v tíme",
      value: mockPlayers.length,
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Najbližší tréning",
      value: format(nextTraining.date, "d. MMM", { locale: sk }),
      icon: CalendarDays,
      color: "text-brand-red",
    },
    {
      title: "Výhry (posl. 5)",
      value: `${recentWins}/5`,
      icon: Trophy,
      color: "text-yellow-500",
    },
    {
      title: "Pozícia v tabuľke",
      value: "2. miesto",
      icon: TrendingUp,
      color: "text-green-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="heading-xl text-foreground">
          {roleWelcome[role as keyof typeof roleWelcome]}
        </h1>
        <p className="text-muted-foreground mt-1">
          {session?.user.name} · FK Rajec Portal · {format(new Date(), "d. MMMM yyyy", { locale: sk })}
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.title}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{s.title}</p>
                  <p className="font-heading text-2xl text-foreground mt-1">{s.value}</p>
                </div>
                <s.icon className={`w-8 h-8 ${s.color} opacity-80`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming trainings */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="font-heading text-xl">Tréningy</CardTitle>
              <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard/trainings">Zobraziť všetky</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockTrainings.map((t) => (
              <div
                key={t.id}
                className="flex items-start gap-3 p-3 bg-secondary/50 rounded-sm border border-border"
              >
                <div className="bg-brand-red rounded-sm w-10 h-10 flex flex-col items-center justify-center text-white shrink-0">
                  <span className="font-heading text-sm leading-none">{format(t.date, "d")}</span>
                  <span className="text-xs leading-none opacity-80">{format(t.date, "MMM", { locale: sk })}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">{t.title}</p>
                  <p className="text-xs text-muted-foreground">{t.location} · {format(t.date, "HH:mm")} · {t.duration} min</p>
                </div>
                {role !== "PLAYER" && (
                  <Badge variant="outline" className="text-xs shrink-0">Tréner</Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent results */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="font-heading text-xl">Posledné výsledky</CardTitle>
              <Button asChild variant="ghost" size="sm">
                <Link href="/results">Zobraziť všetky</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockResults.slice(0, 4).map((r) => (
              <div
                key={r.id}
                className="flex items-center gap-3 p-3 bg-secondary/50 rounded-sm border border-border"
              >
                <div
                  className={`w-6 h-6 rounded-sm flex items-center justify-center text-xs font-bold text-white shrink-0
                    ${r.outcome === "WIN" ? "bg-green-600" : r.outcome === "DRAW" ? "bg-yellow-600" : "bg-red-700"}`}
                >
                  {r.outcome === "WIN" ? "V" : r.outcome === "DRAW" ? "R" : "P"}
                </div>
                <div className="flex-1 grid grid-cols-[1fr_auto_1fr] gap-2 items-center">
                  <p className="text-xs font-medium text-right truncate">{r.homeTeam}</p>
                  <p className="font-heading text-sm text-foreground text-center">
                    {r.homeScore}:{r.awayScore}
                  </p>
                  <p className="text-xs font-medium truncate">{r.awayTeam}</p>
                </div>
                <p className="text-xs text-muted-foreground shrink-0">
                  {format(r.date, "d.M.", { locale: sk })}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick actions for admin/coach */}
      {(role === "ADMIN" || role === "COACH") && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="font-heading text-xl">Rýchle akcie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-brand-red hover:bg-red-700 text-white">
                <Link href="/dashboard/trainings">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  Pridať tréning
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/dashboard/attendance">
                  <ClipboardList className="w-4 h-4 mr-2" />
                  Zaznamenať dochádzku
                </Link>
              </Button>
              {role === "ADMIN" && (
                <>
                  <Button asChild variant="outline">
                    <Link href="/dashboard/news">
                      <Trophy className="w-4 h-4 mr-2" />
                      Pridať správu
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/dashboard/players">
                      <Users className="w-4 h-4 mr-2" />
                      Spravovať hráčov
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
