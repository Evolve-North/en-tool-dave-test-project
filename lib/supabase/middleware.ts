import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { SupabaseClient, User } from "@supabase/supabase-js";

export interface UpdateSessionResult {
  response: NextResponse;
  user: User | null;
  supabase: SupabaseClient;
}

export async function updateSession(request: NextRequest): Promise<UpdateSessionResult> {
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
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  const { data } = await supabase.auth.getUser();
  return { response, user: data.user, supabase };
}
