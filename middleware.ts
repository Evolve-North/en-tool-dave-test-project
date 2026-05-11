import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Deployed tools share the platform's Supabase Auth + enbuilder_users table,
// so a user signed-in to the platform is also signed-in here. Two guards run:
//
//   1. (FR-029) The user must be signed-in AND have an enbuilder_users row.
//      Their SalesRep="1" status was already verified at platform login.
//   2. (FR-030) When NEXT_PUBLIC_ACCESS_CONTROL=owner_only, the authenticated
//      user's enbuilder_users.en_user_id must equal NEXT_PUBLIC_OWNER_EN_USER_ID.

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL ?? "";
const ACCESS_CONTROL = process.env.NEXT_PUBLIC_ACCESS_CONTROL ?? "org";
const OWNER_EN_USER_ID = process.env.NEXT_PUBLIC_OWNER_EN_USER_ID ?? "";

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)).*)"],
};

function redirectToPlatformLogin(request: NextRequest): NextResponse {
  const returnTo = encodeURIComponent(request.nextUrl.toString());
  const target = PLATFORM_URL
    ? `${PLATFORM_URL}/login?returnTo=${returnTo}`
    : `/login?returnTo=${returnTo}`;
  return NextResponse.redirect(target);
}

function forbiddenResponse(): NextResponse {
  return new NextResponse("You don't have access to this tool", {
    status: 403,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (
          items: Array<{ name: string; value: string; options?: Record<string, unknown> }>,
        ) => {
          for (const { name, value, options } of items) {
            response.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  const path = request.nextUrl.pathname;
  const isAuthPath = path.startsWith("/login") || path.startsWith("/auth");

  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) {
    if (isAuthPath) return response;
    return redirectToPlatformLogin(request);
  }

  // Confirm the authenticated user is registered in the platform users table
  // (FR-029). RLS scopes this query to the caller's own row.
  const { data: userRowData } = await supabase
    .from("enbuilder_users")
    .select("en_user_id")
    .eq("id", user.id)
    .maybeSingle();
  const userRow = userRowData as { en_user_id: string } | null;

  if (!userRow) {
    return redirectToPlatformLogin(request);
  }

  if (ACCESS_CONTROL === "owner_only") {
    if (!OWNER_EN_USER_ID || userRow.en_user_id !== OWNER_EN_USER_ID) {
      return forbiddenResponse();
    }
  }

  return response;
}
