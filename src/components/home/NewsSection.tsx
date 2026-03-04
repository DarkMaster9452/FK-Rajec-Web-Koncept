import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockNews } from "@/lib/mock-data";
import { format } from "date-fns";
import { sk } from "date-fns/locale";
import { ArrowRight } from "lucide-react";

export function NewsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-6 bg-brand-red" />
            <span className="text-brand-red text-sm font-semibold tracking-[0.15em] uppercase">Aktuality</span>
          </div>
          <h2 className="heading-xl text-foreground">Správy &amp; Novinky</h2>
        </div>
        <Button asChild variant="ghost" className="hidden sm:flex gap-1 text-muted-foreground hover:text-foreground">
          <Link href="/news">
            Všetky správy
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>

      {/* News grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {mockNews.map((article, i) => (
          <Link key={article.id} href={`/news/${article.slug}`} className="group">
            <Card className="overflow-hidden border-border hover:border-brand-red/50 transition-colors h-full">
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-muted">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {i === 0 && (
                  <Badge className="absolute top-3 left-3 bg-brand-red text-white border-0">
                    Najnovšie
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground mb-2">
                  {format(article.publishedAt, "d. MMMM yyyy", { locale: sk })} · {article.author}
                </p>
                <h3 className="font-semibold text-sm leading-snug mb-2 group-hover:text-brand-red transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-6 sm:hidden">
        <Button asChild variant="outline" className="w-full">
          <Link href="/news">Všetky správy</Link>
        </Button>
      </div>
    </section>
  );
}
