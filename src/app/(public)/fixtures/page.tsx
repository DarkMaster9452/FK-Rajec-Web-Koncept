import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { mockFixtures } from "@/lib/mock-data";
import { format } from "date-fns";
import { sk } from "date-fns/locale";
import { CalendarDays, MapPin, Home, Plane } from "lucide-react";

export const metadata: Metadata = { title: "Zápasy" };

export default function FixturesPage() {
  return (
    <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-6 bg-brand-red" />
          <span className="text-brand-red text-sm font-semibold tracking-[0.15em] uppercase">Program</span>
        </div>
        <h1 className="heading-xl text-foreground">Najbližšie Zápasy</h1>
        <p className="text-muted-foreground mt-1">5. liga JUH skupina B · Sezóna 2025/2026</p>
      </div>

      <div className="space-y-4">
        {mockFixtures.map((f, i) => (
          <div
            key={f.id}
            className={`bg-card border rounded-sm p-6 hover:border-brand-red/50 transition-colors ${
              i === 0 ? "border-brand-red/40 bg-brand-red/5" : "border-border"
            }`}
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {i === 0 && <Badge className="bg-brand-red text-white border-0">Najbližší zápas</Badge>}
              <Badge variant="outline" className="text-xs">
                {f.competition}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                {f.isHome ? (
                  <><Home className="w-3.5 h-3.5" /> Domáci</>
                ) : (
                  <><Plane className="w-3.5 h-3.5" /> Vonku</>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 text-center">
                <p className={`font-heading text-2xl ${f.isHome ? "text-foreground" : "text-muted-foreground"}`}>
                  {f.homeTeam}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{f.isHome ? "Domáci" : ""}</p>
              </div>
              <div className="text-center px-6">
                <span className="font-heading text-brand-red text-3xl">VS</span>
                <p className="text-xs text-muted-foreground mt-1">
                  {format(f.date, "HH:mm", { locale: sk })}
                </p>
              </div>
              <div className="flex-1 text-center">
                <p className={`font-heading text-2xl ${!f.isHome ? "text-foreground" : "text-muted-foreground"}`}>
                  {f.awayTeam}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{!f.isHome ? "Domáci" : ""}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-border text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4 text-brand-red" />
                {format(f.date, "EEEE, d. MMMM yyyy · HH:mm", { locale: sk })}
              </span>
              {f.venue && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-brand-red" />
                  {f.venue}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
