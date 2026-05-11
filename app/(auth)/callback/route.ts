import { NextResponse, type NextRequest } from "next/server";

// The platform issues a Supabase session that is shared across the platform and
// every deployed tool (same Supabase project). This callback handler exists so
// that if the platform ever redirects users back here with a code exchange, the
// browser lands on the dashboard.
export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const next = searchParams.get("next") ?? "/dashboard";
  return NextResponse.redirect(new URL(next, request.url));
}
