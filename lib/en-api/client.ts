// Typed read-only client for the Evolve North API.
// All calls are routed through the platform proxy at
// `${NEXT_PUBLIC_PLATFORM_URL}/api/en-proxy/*`. Never call the EN API directly.

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL ?? "";

export async function enFetch(path: string, init?: RequestInit): Promise<Response> {
  if (!PLATFORM_URL) throw new Error("NEXT_PUBLIC_PLATFORM_URL is not configured");
  const url = `${PLATFORM_URL}/api/en-proxy${path.startsWith("/") ? path : `/${path}`}`;
  return fetch(url, { ...init, credentials: "include" });
}

export async function searchTemplate<T = unknown>(
  id: number,
  params: Record<string, string | number> = {},
): Promise<T> {
  const query = new URLSearchParams(
    Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])),
  );
  const res = await enFetch(`/searchtemplate/${id}?${query.toString()}`);
  if (!res.ok) {
    throw new Error(`EN proxy returned ${res.status}`);
  }
  return (await res.json()) as T;
}
