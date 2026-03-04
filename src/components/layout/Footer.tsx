import Link from "next/link";
import { Mail, MapPin, Phone, Facebook, Youtube } from "lucide-react";

export function Footer() {
  const logoUrl = "https://www.rajec.sk/cache/blocks/lg/87/01930bd2-3b33-7cdf-84f5-8ec4fde6f187.webp";

  return (
    <footer className="bg-brand-black text-white/80 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-sm overflow-hidden bg-white/10 border border-white/20 p-0.5 shrink-0">
              <img src={logoUrl} alt="FK Rajec logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <p className="font-heading text-white text-lg tracking-widest">FK RAJEC</p>
              <p className="text-white/40 text-xs">Futbalový klub</p>
            </div>
          </div>
          <p className="text-sm text-white/50 leading-relaxed">
            Futbalový klub Rajec — hrdosť nášho mesta od roku 1928.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 bg-white/10 hover:bg-brand-red rounded-sm flex items-center justify-center transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 bg-white/10 hover:bg-brand-red rounded-sm flex items-center justify-center transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-heading text-white text-base tracking-widest mb-4">RÝCHLE ODKAZY</h4>
          <ul className="space-y-2 text-sm">
            {[
              { href: "/news", label: "Správy & Novinky" },
              { href: "/fixtures", label: "Najbližšie zápasy" },
              { href: "/results", label: "Výsledky" },
              { href: "/squad", label: "Hráči & Realizačný tím" },
              { href: "/table", label: "Tabuľka ligy" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-brand-red transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Club */}
        <div>
          <h4 className="font-heading text-white text-base tracking-widest mb-4">KLUB</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-brand-red transition-colors">O klube</Link></li>
            <li><Link href="/history" className="hover:text-brand-red transition-colors">História</Link></li>
            <li><Link href="/sponsors" className="hover:text-brand-red transition-colors">Partneri & Sponzori</Link></li>
            <li><Link href="/auth/login" className="hover:text-brand-red transition-colors">Prihlásenie</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading text-white text-base tracking-widest mb-4">KONTAKT</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-brand-red mt-0.5 shrink-0" />
              <span>Ul. Andreja Kmeťa 100, 015 01 Rajec, Slovensko</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-brand-red shrink-0" />
              <a href="tel:+421415422000" className="hover:text-brand-red transition-colors">+421 41 542 2000</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-brand-red shrink-0" />
              <a href="mailto:info@fkrajec.sk" className="hover:text-brand-red transition-colors">info@fkrajec.sk</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/30">
          <span>© {new Date().getFullYear()} FK Rajec. Všetky práva vyhradené.</span>
          <span>5. liga JUH skupina B — Slovenský futbal</span>
        </div>
      </div>
    </footer>
  );
}
