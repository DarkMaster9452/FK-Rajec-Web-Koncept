import { auth } from "@/lib/auth";
import { mockTrainings } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { sk } from "date-fns/locale";
import { Clock, MapPin } from "lucide-react";
import { AddTrainingDialog } from "@/components/dashboard/AddTrainingDialog";
import { TrainingCard } from "@/components/dashboard/TrainingCard";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Tréningy | Dashboard" };

export default async function TrainingsPage() {
  const session = await auth();
  const role = session?.user.role ?? "PLAYER";
  const canManage = role === "ADMIN" || role === "COACH";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-xl text-foreground">Tréningy</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {canManage ? "Spravujte tréningy a dochádzku" : "Váš tréningový plán"}
          </p>
        </div>
        {canManage && <AddTrainingDialog />}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Celkom tréningov</p>
            <p className="font-heading text-2xl text-foreground mt-1">{mockTrainings.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Tento týždeň</p>
            <p className="font-heading text-2xl text-foreground mt-1">2</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Avg. dochádzka</p>
            <p className="font-heading text-2xl text-foreground mt-1">78%</p>
          </CardContent>
        </Card>
      </div>

      {/* Training list */}
      <div className="space-y-4">
        {mockTrainings.map((training) => (
          <TrainingCard key={training.id} training={training} canManage={canManage} isPlayer={role === "PLAYER"} />
        ))}
      </div>
    </div>
  );
}
