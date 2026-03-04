"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { sk } from "date-fns/locale";
import { Clock, MapPin, Users, Edit, Trash2, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

interface Training {
  id: string;
  title: string;
  description?: string;
  date: Date;
  location: string;
  duration: number;
}

interface Props {
  training: Training;
  canManage: boolean;
  isPlayer: boolean;
}

export function TrainingCard({ training, canManage, isPlayer }: Props) {
  const isPast = training.date < new Date();

  const handleAttend = () => {
    toast.success("Potvrdená účasť na tréningu!");
  };

  const handleAbsent = () => {
    toast.info("Ospravedlnenie zaznamenané");
  };

  const handleDelete = () => {
    toast.error("Tréning bol vymazaný");
  };

  return (
    <div className={`bg-card border rounded-sm p-5 hover:border-brand-red/30 transition-colors ${isPast ? "opacity-60" : "border-border"}`}>
      <div className="flex items-start gap-4">
        {/* Date badge */}
        <div className={`rounded-sm w-12 h-12 flex flex-col items-center justify-center shrink-0 ${isPast ? "bg-muted" : "bg-brand-red"}`}>
          <span className={`font-heading text-lg leading-none ${isPast ? "text-muted-foreground" : "text-white"}`}>
            {format(training.date, "d")}
          </span>
          <span className={`text-xs leading-none ${isPast ? "text-muted-foreground" : "text-white/80"}`}>
            {format(training.date, "MMM", { locale: sk })}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-semibold text-foreground">{training.title}</h3>
            {isPast && <Badge variant="outline" className="text-xs">Prebehnutý</Badge>}
            {!isPast && <Badge className="bg-green-600 text-white border-0 text-xs">Pripravovaný</Badge>}
          </div>

          {training.description && (
            <p className="text-sm text-muted-foreground mb-2">{training.description}</p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-brand-red" />
              {format(training.date, "HH:mm", { locale: sk })} · {training.duration} min
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-red" />
              {training.location}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-brand-red" />
              8/11 potvrdených
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {isPlayer && !isPast && (
            <>
              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white gap-1" onClick={handleAttend}>
                <CheckCircle className="w-3.5 h-3.5" />
                Zúčastním sa
              </Button>
              <Button size="sm" variant="outline" className="gap-1 text-muted-foreground" onClick={handleAbsent}>
                <XCircle className="w-3.5 h-3.5" />
                Ospravedlniť
              </Button>
            </>
          )}

          {canManage && (
            <>
              <Button size="icon" variant="ghost" className="w-8 h-8" title="Upraviť">
                <Edit className="w-3.5 h-3.5" />
              </Button>
              <Button size="icon" variant="ghost" className="w-8 h-8 text-destructive hover:text-destructive" onClick={handleDelete} title="Vymazať">
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
