import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { mockPlayers } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Tím" };

const positionColors: Record<string, string> = {
  "Brankár": "bg-yellow-500/20 text-yellow-700 border-yellow-500/30",
  "Obranca": "bg-blue-500/20 text-blue-700 border-blue-500/30",
  "Záložník": "bg-green-500/20 text-green-700 border-green-500/30",
  "Útočník": "bg-red-500/20 text-red-700 border-red-500/30",
};

const groupedPlayers = (players: typeof mockPlayers) => {
  const groups: Record<string, typeof mockPlayers> = {};
  for (const p of players) {
    if (!groups[p.position]) groups[p.position] = [];
    groups[p.position].push(p);
  }
  return groups;
};

export default function SquadPage() {
  const groups = groupedPlayers(mockPlayers);
  const positions = ["Brankár", "Obranca", "Záložník", "Útočník"];

  return (
    <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-6 bg-brand-red" />
          <span className="text-brand-red text-sm font-semibold tracking-[0.15em] uppercase">Hráči</span>
        </div>
        <h1 className="heading-xl text-foreground">Súpiska Tímu</h1>
        <p className="text-muted-foreground mt-1">Sezóna 2025/2026 · FK Rajec</p>
      </div>

      {positions.map((pos) => (
        groups[pos] && (
          <div key={pos} className="mb-10">
            <h2 className="heading-md text-foreground mb-4 flex items-center gap-3">
              <span className="h-px flex-1 bg-border" />
              <Badge className={`${positionColors[pos]} text-sm px-3`}>{pos}i</Badge>
              <span className="h-px flex-1 bg-border" />
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {groups[pos].map((player) => (
                <div
                  key={player.id}
                  className="group bg-card border border-border rounded-sm overflow-hidden hover:border-brand-red/50 hover:shadow-md transition-all"
                >
                  <div className="relative bg-secondary h-44 overflow-hidden">
                    <img
                      src={player.image}
                      alt={player.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-2 right-2 w-8 h-8 bg-brand-black/80 rounded-sm flex items-center justify-center">
                      <span className="text-white font-heading">{player.jerseyNumber}</span>
                    </div>
                  </div>
                  <div className="p-3 text-center">
                    <p className="font-semibold text-sm text-foreground">{player.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{player.age} rokov</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
}
