import { auth } from "@/lib/auth";
import { mockTrainings, mockPlayers } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { sk } from "date-fns/locale";
import { Metadata } from "next";
import { AttendanceToggle } from "@/components/dashboard/AttendanceToggle";

export const metadata: Metadata = { title: "Dochádzka | Dashboard" };

// Mock attendance data
const mockAttendance: Record<string, Record<string, "PRESENT" | "ABSENT" | "EXCUSED">> = {
  t1: { "1": "PRESENT", "2": "PRESENT", "3": "ABSENT", "4": "PRESENT", "5": "EXCUSED", "6": "PRESENT", "7": "PRESENT", "8": "ABSENT", "9": "PRESENT", "10": "PRESENT", "11": "PRESENT" },
  t2: { "1": "PRESENT", "2": "ABSENT", "3": "PRESENT", "4": "PRESENT", "5": "PRESENT", "6": "EXCUSED", "7": "PRESENT", "8": "PRESENT", "9": "ABSENT", "10": "PRESENT", "11": "PRESENT" },
  t3: { "1": "PRESENT", "2": "PRESENT", "3": "PRESENT", "4": "ABSENT", "5": "PRESENT", "6": "PRESENT", "7": "EXCUSED", "8": "PRESENT", "9": "PRESENT", "10": "PRESENT", "11": "ABSENT" },
};

const statusBadge = {
  PRESENT: { label: "Prítomný", className: "bg-green-600 text-white border-0" },
  ABSENT: { label: "Neprítomný", className: "bg-red-600 text-white border-0" },
  EXCUSED: { label: "Ospravedlnený", className: "bg-yellow-600 text-white border-0" },
};

export default async function AttendancePage() {
  const session = await auth();
  const role = session?.user.role ?? "PLAYER";
  const canManage = role === "ADMIN" || role === "COACH";
  const selectedTraining = mockTrainings[0];
  const attendance = mockAttendance[selectedTraining.id] ?? {};

  const present = Object.values(attendance).filter((s) => s === "PRESENT").length;
  const excused = Object.values(attendance).filter((s) => s === "EXCUSED").length;
  const absent = Object.values(attendance).filter((s) => s === "ABSENT").length;
  const total = mockPlayers.length;
  const pct = Math.round((present / total) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-xl text-foreground">Dochádzka</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {canManage ? "Zaznamenajte dochádzku hráčov na tréningoch" : "Vaša dochádzková história"}
        </p>
      </div>

      {/* Training selector */}
      <div className="flex gap-3 flex-wrap">
        {mockTrainings.map((t, i) => (
          <div
            key={t.id}
            className={`px-4 py-2 rounded-sm border cursor-pointer transition-colors ${
              i === 0 ? "bg-brand-red text-white border-brand-red" : "bg-card border-border hover:border-brand-red/50"
            }`}
          >
            <p className="text-sm font-medium">{t.title}</p>
            <p className={`text-xs ${i === 0 ? "text-white/70" : "text-muted-foreground"}`}>
              {format(t.date, "d. MMM yyyy", { locale: sk })}
            </p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase">Prítomní</p>
            <p className="font-heading text-2xl text-green-600">{present}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase">Neprítomní</p>
            <p className="font-heading text-2xl text-red-600">{absent}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase">Ospraved.</p>
            <p className="font-heading text-2xl text-yellow-600">{excused}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase">Dochádzka</p>
            <p className="font-heading text-2xl text-brand-red">{pct}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">Celková dochádzka</p>
            <p className="text-sm font-bold text-brand-red">{pct}%</p>
          </div>
          <Progress value={pct} className="h-3" />
          <p className="text-xs text-muted-foreground mt-2">
            {present} z {total} hráčov prítomných na{" "}
            <span className="font-medium">{selectedTraining.title}</span>
          </p>
        </CardContent>
      </Card>

      {/* Attendance table */}
      {canManage && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="font-heading text-xl">
              Evidencia dochádzky — {selectedTraining.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Hráč</TableHead>
                  <TableHead>Pozícia</TableHead>
                  <TableHead>Stav</TableHead>
                  {canManage && <TableHead className="text-right">Zmeniť</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPlayers.map((player) => {
                  const status = attendance[player.id] ?? "ABSENT";
                  const sb = statusBadge[status];
                  return (
                    <TableRow key={player.id}>
                      <TableCell className="font-heading text-muted-foreground">{player.jerseyNumber}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <img
                            src={player.image}
                            alt={player.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="font-medium text-sm">{player.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">{player.position}</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={sb.className}>{sb.label}</Badge>
                      </TableCell>
                      {canManage && (
                        <TableCell className="text-right">
                          <AttendanceToggle playerId={player.id} trainingId={selectedTraining.id} currentStatus={status} />
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
