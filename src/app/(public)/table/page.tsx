import { Metadata } from "next";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockStandings } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Tabuľka" };

export default function TablePage() {
  return (
    <div className="pt-20 max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-6 bg-brand-red" />
          <span className="text-brand-red text-sm font-semibold tracking-[0.15em] uppercase">Liga</span>
        </div>
        <h1 className="heading-xl text-foreground">Tabuľka 5. ligy</h1>
        <p className="text-muted-foreground mt-1">JUH skupina B · Sezóna 2025/2026</p>
      </div>

      <div className="bg-card border border-border rounded-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-brand-black hover:bg-brand-black">
              <TableHead className="text-white/60 text-xs w-10">#</TableHead>
              <TableHead className="text-white/60 text-xs">Klub</TableHead>
              <TableHead className="text-white/60 text-xs text-center">Z</TableHead>
              <TableHead className="text-white/60 text-xs text-center">V</TableHead>
              <TableHead className="text-white/60 text-xs text-center">R</TableHead>
              <TableHead className="text-white/60 text-xs text-center">P</TableHead>
              <TableHead className="text-white/60 text-xs text-center">GS</TableHead>
              <TableHead className="text-white/60 text-xs text-center">GD</TableHead>
              <TableHead className="text-white/60 text-xs text-center">GR</TableHead>
              <TableHead className="text-white/60 text-xs text-center font-bold">B</TableHead>
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
                    <div className={`w-2 h-2 rounded-full ${row.isFkRajec ? "bg-brand-red" : "bg-muted"}`} />
                    <span className={`text-sm ${row.isFkRajec ? "text-brand-red font-bold" : "font-medium"}`}>
                      {row.team}
                      {row.isFkRajec && <span className="ml-2 text-xs font-normal text-brand-red/60">(my)</span>}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-center text-sm text-muted-foreground">{row.played}</TableCell>
                <TableCell className="text-center text-sm text-green-600 font-medium">{row.won}</TableCell>
                <TableCell className="text-center text-sm text-yellow-600 font-medium">{row.drawn}</TableCell>
                <TableCell className="text-center text-sm text-red-600 font-medium">{row.lost}</TableCell>
                <TableCell className="text-center text-sm text-muted-foreground">{row.goalsFor}</TableCell>
                <TableCell className="text-center text-sm text-muted-foreground">{row.goalsAgainst}</TableCell>
                <TableCell className="text-center text-sm text-muted-foreground">{row.goalsFor - row.goalsAgainst}</TableCell>
                <TableCell className={`text-center text-sm font-bold ${row.isFkRajec ? "text-brand-red" : ""}`}>
                  {row.points}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Z = Zápasy · V = Výhry · R = Remízy · P = Prehry · GS = Góly strelené · GD = Góly dostané · GR = Gólový rozdiel · B = Body
      </p>
    </div>
  );
}
