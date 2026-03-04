"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  Users,
  Newspaper,
  Trophy,
  Settings,
  Bell,
  Home,
} from "lucide-react";

const roleBadge = {
  ADMIN: { label: "Admin", className: "bg-brand-red text-white" },
  COACH: { label: "Tréner", className: "bg-blue-600 text-white" },
  PLAYER: { label: "Hráč", className: "bg-green-600 text-white" },
};

function getNavItems(role: string) {
  const base = [
    { href: "/dashboard", label: "Prehľad", icon: LayoutDashboard },
    { href: "/dashboard/trainings", label: "Tréningy", icon: CalendarDays },
    { href: "/dashboard/attendance", label: "Dochádzka", icon: ClipboardList },
    { href: "/dashboard/notifications", label: "Oznámenia", icon: Bell },
  ];

  const coachAdmin = [
    { href: "/dashboard/players", label: "Hráči", icon: Users },
    { href: "/dashboard/news", label: "Správy", icon: Newspaper },
    { href: "/dashboard/fixtures", label: "Zápasy & Výsledky", icon: Trophy },
  ];

  const adminOnly = [
    { href: "/dashboard/settings", label: "Nastavenia", icon: Settings },
  ];

  if (role === "ADMIN") return { main: base, manage: [...coachAdmin, ...adminOnly] };
  if (role === "COACH") return { main: base, manage: coachAdmin };
  return { main: base, manage: [] };
}

interface Props {
  session: Session;
}

export function DashboardSidebar({ session }: Props) {
  const pathname = usePathname();
  const role = session.user.role;
  const navItems = getNavItems(role);
  const rb = roleBadge[role as keyof typeof roleBadge] ?? roleBadge.PLAYER;
  const logoUrl = "https://www.rajec.sk/cache/blocks/lg/87/01930bd2-3b33-7cdf-84f5-8ec4fde6f187.webp";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-3 px-2 py-1">
          <div className="w-9 h-9 rounded-sm overflow-hidden bg-white/10 border border-white/20 p-0.5 shrink-0">
            <img src={logoUrl} alt="FK Rajec logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-heading text-sidebar-foreground text-base tracking-widest">FK RAJEC</span>
            <span className="text-sidebar-foreground/40 text-xs">Dashboard</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/40 text-xs tracking-wider">NAVIGÁCIA</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.main.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className="data-[active=true]:bg-brand-red data-[active=true]:text-white"
                  >
                    <Link href={item.href}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {navItems.manage.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-foreground/40 text-xs tracking-wider">SPRÁVA</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.manage.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      className="data-[active=true]:bg-brand-red data-[active=true]:text-white"
                    >
                      <Link href={item.href}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <Home className="w-4 h-4" />
                    <span>Verejná stránka</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-2">
          <Avatar className="w-8 h-8 shrink-0">
            <AvatarImage src={session.user?.image ?? ""} />
            <AvatarFallback className="bg-brand-red text-white text-xs">
              {session.user?.name?.slice(0, 2).toUpperCase() ?? "FK"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sidebar-foreground text-sm font-medium truncate">{session.user?.name}</p>
            <Badge className={`text-xs border-0 ${rb.className} h-4 px-1.5`}>{rb.label}</Badge>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
