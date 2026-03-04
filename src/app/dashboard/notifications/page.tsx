import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, CalendarDays, Newspaper } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Oznámenia | Dashboard" };

const mockNotifications = [
  {
    id: "1",
    message: "Nový tréning: Kondičný tréning — 10. marca 2026 o 17:30 na Štadión FK Rajec",
    type: "TRAINING",
    read: false,
    createdAt: new Date("2026-03-04T10:00:00"),
  },
  {
    id: "2",
    message: "Nová správa: Výhra 3:1 nad ŠK Divíky — Rajec dominoval od prvej minúty",
    type: "NEWS",
    read: false,
    createdAt: new Date("2026-03-07T18:00:00"),
  },
  {
    id: "3",
    message: "Tréning zrušený: Predzápasový tréning 6. marca bol presunutý na piatok",
    type: "TRAINING",
    read: true,
    createdAt: new Date("2026-03-05T12:00:00"),
  },
  {
    id: "4",
    message: "Pripomienka: Tréning štandardné situácie — zajtra o 17:30",
    type: "TRAINING",
    read: true,
    createdAt: new Date("2026-03-11T09:00:00"),
  },
];

const typeIcon = {
  TRAINING: CalendarDays,
  NEWS: Newspaper,
};

export default function NotificationsPage() {
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-xl text-foreground">Oznámenia</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {unreadCount > 0 ? `${unreadCount} neprečítaných` : "Všetky prečítané"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Badge className="bg-brand-red text-white border-0">{unreadCount} nové</Badge>
        )}
      </div>

      <div className="space-y-3">
        {mockNotifications.map((n) => {
          const Icon = typeIcon[n.type as keyof typeof typeIcon] ?? Bell;
          return (
            <div
              key={n.id}
              className={`bg-card border rounded-sm p-4 flex gap-4 transition-colors ${
                n.read ? "border-border opacity-60" : "border-brand-red/30 bg-brand-red/5"
              }`}
            >
              <div className={`w-10 h-10 rounded-sm flex items-center justify-center shrink-0 ${n.read ? "bg-muted" : "bg-brand-red/20"}`}>
                <Icon className={`w-5 h-5 ${n.read ? "text-muted-foreground" : "text-brand-red"}`} />
              </div>
              <div className="flex-1">
                <p className={`text-sm leading-relaxed ${n.read ? "text-muted-foreground" : "text-foreground font-medium"}`}>
                  {n.message}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {n.createdAt.toLocaleDateString("sk-SK", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
              {!n.read && (
                <div className="w-2 h-2 rounded-full bg-brand-red mt-2 shrink-0" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
