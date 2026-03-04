"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockFixtures, mockResults } from "@/lib/mock-data";
import { format } from "date-fns";
import { sk } from "date-fns/locale";
import { CalendarDays, MapPin, ChevronRight } from "lucide-react";

function formatMatchDate(date: Date) {
  return format(date, "d. MMMM yyyy, HH:mm", { locale: sk });
}

export function HeroSection() {
  const nextFixture = mockFixtures[0];
  const lastResult = mockResults[0];

  return (
    <section
      className="relative min-h-[90vh] flex items-center"
      style={{
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #1a0000 40%, #2a0000 60%, #0a0a0a 100%)",
      }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Red accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-brand-red" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Club identity */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px w-12 bg-brand-red" />
              <span className="text-brand-red text-sm font-semibold tracking-[0.2em] uppercase">
                5. liga JUH skupina B
              </span>
            </div>

            <h1 className="heading-hero text-white mb-4 leading-none">
              FK<br />
              <span className="text-brand-red">RAJEC</span>
            </h1>

            <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-md">
              Futbalový klub Rajec — hrdosť nášho mesta. Spoločne bojujeme za postup a každý zápas hráme s vášňou pre náš klub.
            </p>

            <div className="flex gap-3">
              <Button asChild className="bg-brand-red hover:bg-red-700 text-white font-semibold px-6">
                <Link href="/fixtures">
                  Najbližší zápas
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
                <Link href="/squad">Náš tím</Link>
              </Button>
            </div>

            {/* Stats bar */}
            <div className="flex gap-8 mt-12 pt-8 border-t border-white/10">
              {[
                { label: "Sezóna", value: "2025/26" },
                { label: "Pozícia", value: "2. miesto" },
                { label: "Body", value: "40" },
                { label: "Hráči", value: "22" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-white font-heading text-2xl">{s.value}</p>
                  <p className="text-white/40 text-xs uppercase tracking-wider mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Match cards */}
          <div className="flex flex-col gap-4">
            {/* Next fixture card */}
            <div className="bg-white/5 border border-white/10 rounded-sm p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-brand-red text-white border-0 text-xs tracking-wider">
                  ĎALŠÍ ZÁPAS
                </Badge>
                <span className="text-white/40 text-xs">{nextFixture.competition}</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 text-center">
                  <p className="font-heading text-white text-2xl">{nextFixture.homeTeam}</p>
                  <p className="text-white/40 text-xs mt-1">{nextFixture.isHome ? "DOMÁCI" : "HOSTIA"}</p>
                </div>
                <div className="text-center px-4">
                  <div className="font-heading text-brand-red text-3xl">VS</div>
                </div>
                <div className="flex-1 text-center">
                  <p className="font-heading text-white text-2xl">{nextFixture.awayTeam}</p>
                  <p className="text-white/40 text-xs mt-1">{nextFixture.isHome ? "HOSTIA" : "DOMÁCI"}</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-white/10 text-sm text-white/60">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="w-4 h-4 text-brand-red" />
                  {formatMatchDate(nextFixture.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-brand-red" />
                  {nextFixture.venue}
                </span>
              </div>
            </div>

            {/* Last result card */}
            <div className="bg-white/5 border border-white/10 rounded-sm p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <Badge
                  className={`border-0 text-xs tracking-wider ${
                    lastResult.outcome === "WIN"
                      ? "bg-green-600 text-white"
                      : lastResult.outcome === "DRAW"
                      ? "bg-yellow-600 text-white"
                      : "bg-red-800 text-white"
                  }`}
                >
                  {lastResult.outcome === "WIN" ? "VÝHRA" : lastResult.outcome === "DRAW" ? "REMÍZA" : "PREHRA"}
                </Badge>
                <span className="text-white/40 text-xs">{lastResult.competition}</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 text-center">
                  <p className="font-heading text-white text-xl">{lastResult.homeTeam}</p>
                </div>
                <div className="text-center px-4">
                  <div className="font-heading text-white text-4xl">
                    {lastResult.homeScore}
                    <span className="text-white/40 mx-1">:</span>
                    {lastResult.awayScore}
                  </div>
                </div>
                <div className="flex-1 text-center">
                  <p className="font-heading text-white text-xl">{lastResult.awayTeam}</p>
                </div>
              </div>

              <p className="text-center text-white/40 text-xs mt-3">
                {format(lastResult.date, "d. MMMM yyyy", { locale: sk })} · {lastResult.competition}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
