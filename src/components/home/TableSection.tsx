import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockStandings } from "@/lib/mock-data";
import { ArrowRight } from "lucide-react";

export function TableSection() {
  return (
    <section className="bg-secondary/50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-6 bg-brand-red" />
              <span className="text-brand-red text-sm font-semibold tracking-[0.15em] uppercase">Liga</span>
            </div>
            <h2 className="heading-xl text-foreground">Tabuľka 5. ligy</h2>
            <p className="text-muted-foreground text-sm mt-1">JUH skupina B · Sezóna 2025/2026</p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:flex gap-1 text-muted-foreground hover:text-foreground">
            <Link href="/table">
              Celá tabuľka
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="bg-card rounded-sm border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-brand-black hover:bg-brand-black">
                <TableHead className="text-white/60 text-xs w-10">#</TableHead>
                <TableHead className="text-white/60 text-xs">Klub</TableHead>
                <TableHead className="text-white/60 text-xs text-center w-10">Z</TableHead>
                <TableHead className="text-white/60 text-xs text-center w-10 hidden sm:table-cell">V</TableHead>
                <TableHead className="text-white/60 text-xs text-center w-10 hidden sm:table-cell">R</TableHead>
                <TableHead className="text-white/60 text-xs text-center w-10 hidden sm:table-cell">P</TableHead>
                <TableHead className="text-white/60 text-xs text-center w-16 hidden md:table-cell">G</TableHead>
                <TableHead className="text-white/60 text-xs text-center w-10">B</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockStandings.map((row) => (
                <TableRow
                  key={row.team}
                  className={row.isFkRajec ? "bg-brand-red/10 border-l-2 border-l-brand-red hover:bg-brand-red/15" : ""}
                >
                  <TableCell className="text-sm font-medium text-muted-foreground">{row.position}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${row.isFkRajec ? "bg-brand-red" : "bg-muted-foreground/30"}`}
                      />
                      <span className={`text-sm font-medium ${row.isFkRajec ? "text-brand-red font-bold" : ""}`}>
                        {row.team}
                        {row.isFkRajec && <span className="ml-2 text-xs text-brand-red/70">(my)</span>}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground">{row.played}</TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground hidden sm:table-cell">{row.won}</TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground hidden sm:table-cell">{row.drawn}</TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground hidden sm:table-cell">{row.lost}</TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground hidden md:table-cell">
                    {row.goalsFor}:{row.goalsAgainst}
                  </TableCell>
                  <TableCell className={`text-center text-sm font-bold ${row.isFkRajec ? "text-brand-red" : ""}`}>
                    {row.points}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-3 text-xs text-muted-foreground">
          Z = Zápasy · V = Výhry · R = Remízy · P = Prehry · G = Góly · B = Body
        </div>
      </div>
    </section>
  );
}
