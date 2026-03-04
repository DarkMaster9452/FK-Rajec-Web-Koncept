import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockNews } from "@/lib/mock-data";
import { format } from "date-fns";
import { sk } from "date-fns/locale";

export const metadata: Metadata = { title: "Správy" };

export default function NewsPage() {
  const [featured, ...rest] = mockNews;

  return (
    <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-6 bg-brand-red" />
          <span className="text-brand-red text-sm font-semibold tracking-[0.15em] uppercase">Aktuality</span>
        </div>
        <h1 className="heading-xl text-foreground">Správy &amp; Novinky</h1>
      </div>

      {/* Featured article */}
      <Link href={`/news/${featured.slug}`} className="group block mb-8">
        <div className="grid md:grid-cols-2 gap-6 bg-card border border-border rounded-sm overflow-hidden hover:border-brand-red/50 transition-colors">
          <div className="h-64 md:h-auto overflow-hidden bg-muted">
            <img
              src={featured.imageUrl}
              alt={featured.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-6 flex flex-col justify-center">
            <Badge className="w-fit bg-brand-red text-white border-0 mb-3">Hlavná správa</Badge>
            <h2 className="heading-lg text-foreground group-hover:text-brand-red transition-colors mb-3 leading-snug">
              {featured.title}
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">{featured.excerpt}</p>
            <p className="text-xs text-muted-foreground">
              {format(featured.publishedAt, "d. MMMM yyyy", { locale: sk })} · {featured.author}
            </p>
          </div>
        </div>
      </Link>

      {/* Rest */}
      <div className="grid md:grid-cols-3 gap-6">
        {rest.map((article) => (
          <Link key={article.id} href={`/news/${article.slug}`} className="group">
            <Card className="overflow-hidden border-border hover:border-brand-red/50 transition-colors h-full">
              <div className="h-44 overflow-hidden bg-muted">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground mb-2">
                  {format(article.publishedAt, "d. MMMM yyyy", { locale: sk })} · {article.author}
                </p>
                <h3 className="font-semibold text-sm leading-snug group-hover:text-brand-red transition-colors line-clamp-3">
                  {article.title}
                </h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
