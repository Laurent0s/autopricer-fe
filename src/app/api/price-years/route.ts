export const dynamic = "force-dynamic";

const UPSTREAM = process.env.PRICE_API ?? "http://46.62.152.2";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const upstream = await fetch(`${UPSTREAM}/price-years`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
      cache: "no-store",
      // @ts-expect-error Node fetch supports timeout on server
      timeout: 20_000,
    });

    const buf = await upstream.arrayBuffer();
    const headers = new Headers(upstream.headers);
    return new Response(buf, { status: upstream.status, headers });
  } catch (e) {
    return new Response(
      JSON.stringify({ message: "Proxy request failed" }),
      { status: 502, headers: { "content-type": "application/json" } }
    );
  }
}
