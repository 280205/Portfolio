// Temporary diagnostic endpoint — DELETE after debugging
// Visit /api/test on your Vercel domain to check env var status
export async function GET() {
  const key = process.env.GROQ_API_KEY;
  return Response.json({
    hasKey: !!key,
    keyLength: key?.length || 0,
    keyPrefix: key ? key.substring(0, 8) + "..." : "MISSING",
    isPlaceholder: key === "placeholder_key_for_build",
    env: process.env.NODE_ENV,
  });
}
