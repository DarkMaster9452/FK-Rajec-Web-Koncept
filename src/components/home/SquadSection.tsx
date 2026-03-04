import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockPlayers } from "@/lib/mock-data";
import { ArrowRight } from "lucide-react";

const positionColors: Record<string, string> = {
  "Brankár": "bg-yellow-500/20 text-yellow-700",
  "Obranca": "bg-blue-500/20 text-blue-700",
  "Záložník": "bg-green-500/20 text-green-700",
  "Útočník": "bg-red-500/20 text-red-700",
};

export function SquadSection() {
  const featured = mockPlayers.slice(0, 8);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-6 bg-brand-red" />
            <span className="text-brand-red text-sm font-semibold tracking-[0.15em] uppercase">Hráči</span>
          </div>
          <h2 className="heading-xl text-foreground">Náš Tím</h2>
        </div>
        <Button asChild variant="ghost" className="hidden sm:flex gap-1 text-muted-foreground hover:text-foreground">
          <Link href="/squad">
            Celý tím
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {featured.map((player) => (
          <div
            key={player.id}
            className="group bg-card border border-border rounded-sm overflow-hidden hover:border-brand-red/50 transition-colors"
          >
            <div className="relative bg-secondary h-36 overflow-hidden">
              <img
                src={player.image}
                alt={player.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Jersey number */}
              <div className="absolute top-2 right-2 w-7 h-7 bg-brand-black/80 rounded-sm flex items-center justify-center">
                <span className="text-white font-heading text-sm">{player.jerseyNumber}</span>
              </div>
            </div>
            <div className="p-3">
              <p className="font-semibold text-sm text-foreground leading-tight">{player.name}</p>
              <Badge
                className={`mt-1 text-xs border-0 ${positionColors[player.position] ?? "bg-muted text-muted-foreground"}`}
              >
                {player.position}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
