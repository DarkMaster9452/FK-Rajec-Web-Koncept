import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { mockNews } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { format } from "date-fns";
import { sk } from "date-fns/locale";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Správy | Dashboard" };

export default async function NewsManagePage() {
  const session = await auth();
  if (session?.user.role !== "ADMIN") redirect("/dashboard");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-xl text-foreground">Správa článkov</h1>
          <p className="text-muted-foreground text-sm mt-1">{mockNews.length} článkov celkom</p>
        </div>
        <Button className="bg-brand-red hover:bg-red-700 text-white gap-2">
          <Plus className="w-4 h-4" />
          Nový článok
        </Button>
      </div>

      <div className="space-y-4">
        {mockNews.map((article) => (
          <Card key={article.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex gap-4">
                <div className="w-32 h-24 shrink-0 bg-muted overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 py-4 pr-4 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-green-600 text-white border-0 text-xs">Publikovaný</Badge>
                        <span className="text-xs text-muted-foreground">
                          {format(article.publishedAt, "d. MMMM yyyy", { locale: sk })}
                        </span>
                      </div>
                      <h3 className="font-semibold text-sm leading-snug line-clamp-2">{article.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{article.excerpt}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Button variant="ghost" size="icon" className="w-8 h-8" title="Náhľad">
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="w-8 h-8" title="Upraviť">
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="w-8 h-8 text-destructive hover:text-destructive" title="Vymazať">
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
