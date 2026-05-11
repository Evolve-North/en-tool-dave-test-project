import { PageHeader } from "@/components/page-header";

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Dashboard" subtitle="Welcome to your EN tool" />
      <p className="text-muted-foreground">
        This is the scaffold landing page. Replace it with your tool&apos;s primary view.
      </p>
    </div>
  );
}
