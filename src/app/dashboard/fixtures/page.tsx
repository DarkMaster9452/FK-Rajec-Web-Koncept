import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { mockFixtures, mockResults } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { sk } from "date-fns/locale";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Zápasy & Výsledky | Dashboard" };

export default async function FixturesManagePage() {
  const session = await auth();
  if (session?.user.role !== "ADMIN") redirect("/dashboard");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-xl text-foreground">Zápasy &amp; Výsledky</h1>
          <p className="text-muted-foreground text-sm mt-1">Správa programu a výsledkov</p>
        </div>
        <Button className="bg-brand-red hover:bg-red-700 text-white gap-2">
          <Plus className="w-4 h-4" />
          Pridať zápas
        </Button>
      </div>

      <Tabs defaultValue="fixtures">
        <TabsList>
          <TabsTrigger value="fixtures">Plánované ({mockFixtures.length})</TabsTrigger>
          <TabsTrigger value="results">Výsledky ({mockResults.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="fixtures" className="space-y-3 mt-4">
          {mockFixtures.map((f) => (
            <Card key={f.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="font-heading text-lg text-foreground">{format(f.date, "d")}</p>
                      <p className="text-xs text-muted-foreground">{format(f.date, "MMM", { locale: sk })}</p>
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {f.homeTeam} <span className="text-brand-red font-heading">vs</span> {f.awayTeam}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(f.date, "HH:mm")} · {f.venue} · {f.competition}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{f.isHome ? "Domáci" : "Hosť"}</Badge>
                    <Button variant="ghost" size="icon" className="w-8 h-8">
                      <Edit className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 text-destructive hover:text-destructive">
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="results" className="space-y-3 mt-4">
          {mockResults.map((r) => (
            <Card key={r.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Badge className={`border-0 text-xs ${r.outcome === "WIN" ? "bg-green-600 text-white" : r.outcome === "DRAW" ? "bg-yellow-600 text-white" : "bg-red-700 text-white"}`}>
                      {r.outcome === "WIN" ? "V" : r.outcome === "DRAW" ? "R" : "P"}
                    </Badge>
                    <div>
                      <p className="font-medium text-sm">
                        {r.homeTeam} <span className="font-heading text-brand-red">{r.homeScore}:{r.awayScore}</span> {r.awayTeam}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(r.date, "d. MMMM yyyy", { locale: sk })} · {r.competition}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="w-8 h-8">
                      <Edit className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 text-destructive hover:text-destructive">
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
