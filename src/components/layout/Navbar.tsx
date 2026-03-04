"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X, LogOut, LayoutDashboard, User } from "lucide-react";

const navLinks = [
  { href: "/", label: "Domov" },
  { href: "/news", label: "Správy" },
  { href: "/fixtures", label: "Zápasy" },
  { href: "/results", label: "Výsledky" },
  { href: "/squad", label: "Tím" },
  { href: "/table", label: "Tabuľka" },
];

export function Navbar() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const logoUrl = "https://www.rajec.sk/cache/blocks/lg/87/01930bd2-3b33-7cdf-84f5-8ec4fde6f187.webp";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-sm overflow-hidden bg-white/10 border border-white/20 p-0.5 shrink-0">
              <img src={logoUrl} alt="FK Rajec logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-heading text-white text-xl tracking-widest">FK RAJEC</span>
              <span className="text-white/50 text-xs tracking-wider">5. LIGA JUH</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-sm transition-colors font-medium tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth */}
          <div className="flex items-center gap-2">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 p-1 rounded-sm hover:bg-white/10 transition-colors">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={session.user?.image ?? ""} />
                      <AvatarFallback className="bg-brand-red text-white text-xs">
                        {session.user?.name?.slice(0, 2).toUpperCase() ?? "FK"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:block text-white/80 text-sm font-medium">
                      {session.user?.name}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center gap-2">
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Profil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-destructive focus:text-destructive flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Odhlásiť sa
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild size="sm" className="bg-brand-red hover:bg-red-700 text-white border-0">
                <Link href="/auth/login">Prihlásiť sa</Link>
              </Button>
            )
            }

            {/* Mobile menu toggle */}
            <button
              className="md:hidden ml-1 p-2 text-white/80 hover:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden py-3 border-t border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors font-medium tracking-wide"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
