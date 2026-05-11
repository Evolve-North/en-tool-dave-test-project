import Link from "next/link";

export function NavSidebar() {
  return (
    <aside className="w-56 border-r bg-muted/20 p-4">
      <nav className="space-y-2">
        <Link href="/dashboard" className="block rounded px-2 py-1 text-sm hover:bg-muted">
          Dashboard
        </Link>
      </nav>
    </aside>
  );
}
