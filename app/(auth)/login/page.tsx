// Login for deployed tools redirects to the platform's login, which handles
// the EN ST40-Login2 flow. After authentication the user returns here.
import { redirect } from "next/navigation";

export default function ToolLoginPage({ searchParams }: { searchParams: { returnTo?: string } }) {
  const platformUrl = process.env.NEXT_PUBLIC_PLATFORM_URL ?? "";
  const returnTo = searchParams.returnTo ?? "/dashboard";
  redirect(`${platformUrl}/login?returnTo=${encodeURIComponent(returnTo)}`);
}
