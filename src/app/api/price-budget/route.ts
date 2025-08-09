export const dynamic = "force-dynamic"; // no caching of responses
export const runtime = "nodejs";        // ensure Node runtime on Vercel

const UPSTREAM = process.env.PRICE_API ?? "http://46.62.152.2";

export async function POST(req: Request) {
  try {
    const body = await req.text(); // pass-through JSON from the thunk

    const upstream = await fetch(`${UPSTREAM}/price-budget`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
      cache: "no-store",
      // @ts-expect-error: supported in Node runtime
      timeout: 20_000,
    });

    // Pass status + headers verbatim
    const buf = await upstream.arrayBuffer();
    const headers = new Headers(upstream.headers);
    return new Response(buf, { status: upstream.status, headers });
  } catch {
    return new Response(
      JSON.stringify({ message: "Proxy request failed" }),
      { status: 502, headers: { "content-type": "application/json" } }
    );
  }
}
