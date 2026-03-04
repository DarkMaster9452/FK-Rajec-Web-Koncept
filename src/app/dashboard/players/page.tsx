import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { mockPlayers } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, UserCheck } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Hráči | Dashboard" };

const positionColors: Record<string, string> = {
  "Brankár": "bg-yellow-500/20 text-yellow-700",
  "Obranca": "bg-blue-500/20 text-blue-700",
  "Záložník": "bg-green-500/20 text-green-700",
  "Útočník": "bg-red-500/20 text-red-700",
};

export default async function PlayersPage() {
  const session = await auth();
  if (session?.user.role !== "ADMIN") redirect("/dashboard");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-xl text-foreground">Správa hráčov</h1>
          <p className="text-muted-foreground text-sm mt-1">{mockPlayers.length} hráčov v súpiske</p>
        </div>
        <Button className="bg-brand-red hover:bg-red-700 text-white gap-2">
          <Plus className="w-4 h-4" />
          Pridať hráča
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {["Brankár", "Obranca", "Záložník", "Útočník"].map((pos) => {
          const count = mockPlayers.filter((p) => p.position === pos).length;
          return (
            <Card key={pos}>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">{pos}i</p>
                <p className="font-heading text-2xl text-foreground">{count}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Hráč</TableHead>
                <TableHead>Pozícia</TableHead>
                <TableHead className="hidden sm:table-cell">Vek</TableHead>
                <TableHead className="hidden sm:table-cell">Štát</TableHead>
                <TableHead className="text-right">Akcie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPlayers.map((player) => (
                <TableRow key={player.id}>
                  <TableCell className="font-heading text-muted-foreground">{player.jerseyNumber}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img src={player.image} alt={player.name} className="w-9 h-9 rounded-full object-cover" />
                      <div>
                        <p className="font-medium text-sm">{player.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <UserCheck className="w-3 h-3 text-green-500" /> Aktívny
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs border-0 ${positionColors[player.position] ?? ""}`}>
                      {player.position}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{player.age} r.</TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">🇸🇰 {player.nationality}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="w-8 h-8">
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="w-8 h-8 text-destructive hover:text-destructive">
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
