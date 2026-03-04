import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/auth/login");

  return (
    <SidebarProvider>
      <DashboardSidebar session={session} />
      <SidebarInset>
        <DashboardHeader session={session} />
        <main className="p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
