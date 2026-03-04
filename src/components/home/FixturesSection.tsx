import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockFixtures } from "@/lib/mock-data";
import { format } from "date-fns";
import { sk } from "date-fns/locale";
import { CalendarDays, MapPin, ArrowRight, Home, Plane } from "lucide-react";

export function FixturesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-6 bg-brand-red" />
            <span className="text-brand-red text-sm font-semibold tracking-[0.15em] uppercase">Program</span>
          </div>
          <h2 className="heading-xl text-foreground">Najbližšie Zápasy</h2>
        </div>
        <Button asChild variant="ghost" className="hidden sm:flex gap-1 text-muted-foreground hover:text-foreground">
          <Link href="/fixtures">
            Celý program
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {mockFixtures.map((f, i) => (
          <div
            key={f.id}
            className={`bg-card border rounded-sm p-5 hover:border-brand-red/50 transition-colors ${
              i === 0 ? "border-brand-red/40 bg-brand-red/5" : "border-border"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              {i === 0 && (
                <Badge className="bg-brand-red text-white border-0 text-xs">Najbližší</Badge>
              )}
              <div className={`flex items-center gap-1 text-xs text-muted-foreground ${i !== 0 ? "ml-auto" : ""}`}>
                {f.isHome ? (
                  <><Home className="w-3 h-3" /> Domáci</>
                ) : (
                  <><Plane className="w-3 h-3" /> Vonku</>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 my-3">
              <p className="font-heading text-lg text-foreground flex-1">{f.homeTeam}</p>
              <span className="font-heading text-brand-red text-xl">VS</span>
              <p className="font-heading text-lg text-foreground flex-1 text-right">{f.awayTeam}</p>
            </div>

            <div className="flex flex-col gap-1 pt-3 border-t border-border">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CalendarDays className="w-3.5 h-3.5 text-brand-red" />
                {format(f.date, "EEEE, d. MMMM yyyy · HH:mm", { locale: sk })}
              </div>
              {f.venue && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 text-brand-red" />
                  {f.venue}
                </div>
              )}
              <p className="text-xs text-muted-foreground/60 mt-0.5">{f.competition}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
