import { NavSidebar } from "./nav-sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <NavSidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
