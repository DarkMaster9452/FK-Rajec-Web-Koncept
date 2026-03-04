import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockResults } from "@/lib/mock-data";
import { format } from "date-fns";
import { sk } from "date-fns/locale";
import { ArrowRight } from "lucide-react";

const outcomeBadge = {
  WIN: { label: "V", className: "bg-green-600 text-white border-0" },
  DRAW: { label: "R", className: "bg-yellow-600 text-white border-0" },
  LOSS: { label: "P", className: "bg-red-800 text-white border-0" },
};

export function ResultsSection() {
  return (
    <section className="bg-secondary/50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-6 bg-brand-red" />
              <span className="text-brand-red text-sm font-semibold tracking-[0.15em] uppercase">Výsledky</span>
            </div>
            <h2 className="heading-xl text-foreground">Posledné Zápasy</h2>
          </div>
          <Button asChild variant="ghost" className="hidden sm:flex gap-1 text-muted-foreground hover:text-foreground">
            <Link href="/results">
              Všetky výsledky
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="space-y-3">
          {mockResults.map((r) => {
            const badge = outcomeBadge[r.outcome];
            return (
              <div
                key={r.id}
                className="bg-card border border-border rounded-sm px-4 py-3 flex items-center gap-4 hover:border-brand-red/30 transition-colors"
              >
                <Badge className={`w-6 h-6 flex items-center justify-center p-0 text-xs font-bold shrink-0 ${badge.className}`}>
                  {badge.label}
                </Badge>

                <div className="flex-1 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                  <p className={`text-sm font-semibold text-right ${r.isHome ? "text-foreground" : "text-muted-foreground"}`}>
                    {r.homeTeam}
                  </p>
                  <div className="flex items-center gap-1 px-3">
                    <span className="font-heading text-xl text-foreground">{r.homeScore}</span>
                    <span className="text-muted-foreground font-heading text-lg mx-0.5">:</span>
                    <span className="font-heading text-xl text-foreground">{r.awayScore}</span>
                  </div>
                  <p className={`text-sm font-semibold ${!r.isHome ? "text-foreground" : "text-muted-foreground"}`}>
                    {r.awayTeam}
                  </p>
                </div>

                <div className="hidden sm:block text-right">
                  <p className="text-xs text-muted-foreground">
                    {format(r.date, "d. MMM yyyy", { locale: sk })}
                  </p>
                  <p className="text-xs text-muted-foreground/60">{r.competition}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
