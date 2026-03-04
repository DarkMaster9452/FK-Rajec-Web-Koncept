import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { mockResults } from "@/lib/mock-data";
import { format } from "date-fns";
import { sk } from "date-fns/locale";

export const metadata: Metadata = { title: "Výsledky" };

const outcomeMap = {
  WIN: { label: "Výhra", badge: "bg-green-600 text-white border-0" },
  DRAW: { label: "Remíza", badge: "bg-yellow-600 text-white border-0" },
  LOSS: { label: "Prehra", badge: "bg-red-800 text-white border-0" },
};

export default function ResultsPage() {
  return (
    <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-6 bg-brand-red" />
          <span className="text-brand-red text-sm font-semibold tracking-[0.15em] uppercase">História</span>
        </div>
        <h1 className="heading-xl text-foreground">Výsledky Zápasov</h1>
        <p className="text-muted-foreground mt-1">5. liga JUH skupina B · Sezóna 2025/2026</p>
      </div>

      {/* Form guide */}
      <div className="flex items-center gap-2 mb-8 p-4 bg-card border border-border rounded-sm">
        <span className="text-sm text-muted-foreground mr-2">Forma:</span>
        {mockResults.map((r) => {
          const o = outcomeMap[r.outcome];
          return (
            <div
              key={r.id}
              className={`w-7 h-7 rounded-sm flex items-center justify-center text-xs font-bold text-white
                ${r.outcome === "WIN" ? "bg-green-600" : r.outcome === "DRAW" ? "bg-yellow-600" : "bg-red-700"}`}
              title={`${r.homeTeam} ${r.homeScore}:${r.awayScore} ${r.awayTeam}`}
            >
              {r.outcome === "WIN" ? "V" : r.outcome === "DRAW" ? "R" : "P"}
            </div>
          );
        })}
        <span className="text-xs text-muted-foreground ml-2">(najnovší → najstarší)</span>
      </div>

      <div className="space-y-3">
        {mockResults.map((r) => {
          const o = outcomeMap[r.outcome];
          return (
            <div
              key={r.id}
              className="bg-card border border-border rounded-sm p-5 hover:border-brand-red/30 transition-colors"
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge className={o.badge}>{o.label}</Badge>
                <span className="text-xs text-muted-foreground">{r.competition}</span>
                <span className="text-xs text-muted-foreground ml-auto">
                  {format(r.date, "d. MMMM yyyy", { locale: sk })}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 text-center">
                  <p className={`font-heading text-2xl ${r.isHome ? "text-foreground" : "text-muted-foreground"}`}>
                    {r.homeTeam}
                  </p>
                </div>
                <div className="text-center px-8 bg-secondary/50 rounded-sm py-2 min-w-[100px]">
                  <span className="font-heading text-4xl text-foreground">
                    {r.homeScore}
                    <span className="text-muted-foreground mx-1">:</span>
                    {r.awayScore}
                  </span>
                  <p className="text-xs text-muted-foreground mt-0.5">Záverečný výsledok</p>
                </div>
                <div className="flex-1 text-center">
                  <p className={`font-heading text-2xl ${!r.isHome ? "text-foreground" : "text-muted-foreground"}`}>
                    {r.awayTeam}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
