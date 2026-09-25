# HIVE shared data plane

The private /hive route is an authenticated view of the same OpenClaw Supabase tables used by the runtime and CLI.

Security properties:
- no service-role or secret key in the browser;
- Supabase access/refresh tokens are kept in httpOnly same-site cookies;
- the browser talks to Next.js route handlers, not directly to OpenClaw tables;
- table-level RLS remains the final authorization boundary;
- the page is marked noindex.

Required Vercel environment variables:
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

The Supabase project must have the OpenClaw schema applied and at least one authorized Auth user.
