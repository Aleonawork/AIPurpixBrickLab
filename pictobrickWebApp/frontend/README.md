# PictoBrick Frontend

Next.js 16 app (App Router) using React 19, Tailwind v4, shadcn/ui, and Clerk for authentication.

> For monorepo-wide setup, see the [top-level README](../../README.md). This file covers frontend-specific dev.

## Directory Structure

```
frontend/
├── app/                       # App Router pages
│   ├── page.tsx               # homepage (hero + "Live Rendering" preview)
│   ├── layout.tsx             # root layout, ClerkProvider lives here
│   ├── create/                # photo-upload → generate-layout studio
│   ├── my-builds/             # signed-in users: their past builds (auth-gated)
│   ├── gallery/               # community showcase (placeholder data)
│   ├── pricing/
│   ├── faq/
│   └── ...
├── components/
│   ├── Navbar.tsx             # global nav; swaps between signed-in / signed-out state
│   ├── ui/                    # shadcn primitives (button, card, ...)
│   └── ...
├── lib/                       # small helpers (cn, etc.)
├── public/                    # static assets served from web root (/logo.png, /viewer.js, ...)
├── middleware.ts              # Clerk auth — protects /my-builds
├── Dockerfile.frontend        # multi-stage build consumed by compose.yaml
└── package.json
```

## Running (Preferred: Docker)

From the repo root:

```bash
cd pictobrickWebApp
docker compose up --build
```

This builds the image (Node 22 base, standalone Next output) and runs alongside Postgres + Redis. App lives at <http://localhost:3000>.

The publishable Clerk key is baked into `compose.yaml`. The secret key comes from `pictobrickWebApp/.env.local` (see top-level README).

## Running (Local, No Docker)

If you want hot reload without Docker:

```bash
cd pictobrickWebApp/frontend
cp .env.example .env.local   # then fill in both Clerk keys
npm install
npm run dev
```

Note: `npm run dev` reads `.env.local` from the `frontend/` directory — **not** from `pictobrickWebApp/.env.local` (that one is for Docker). You'll need both Clerk vars here:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

## Authentication Model

- **Provider:** Clerk (`@clerk/nextjs` v7) — wrapped around the app in `app/layout.tsx`.
- **UI:** modal-based sign in / sign up, not dedicated pages. Buttons live in `components/Navbar.tsx`.
- **Client-side checks:** use `useUser()` from `@clerk/nextjs` to read `isSignedIn` / user data.
- **Route protection:** `middleware.ts` uses `createRouteMatcher` + `auth.protect()`. Currently only `/my-builds(.*)` is gated. Add paths to that matcher to require auth elsewhere.
- **After sign-out redirect:** configured on `<ClerkProvider afterSignOutUrl="/" />` in `app/layout.tsx`.

### Clerk v7 API notes

The v7 API differs from older tutorials:
- `<SignedIn>` / `<SignedOut>` are gone — use the `useUser()` hook or the `<Show when="signed-in">` server component.
- `afterSignOutUrl` lives on `<ClerkProvider>`, not on `<UserButton>`.

## Key Pages — Current Status

| Route          | Status                                                                 |
| -------------- | ---------------------------------------------------------------------- |
| `/`            | Live. Hero + Live Rendering image + "how it works" steps.              |
| `/create`      | Buttons all wired. "Generate Layout" currently **simulates** generation (1.5s timeout) and redirects to `/my-builds`. TODO: POST to FastAPI. |
| `/my-builds`   | Auth-gated. Renders **placeholder** build data. TODO: fetch from FastAPI `GET /builds/mine`. |
| `/gallery`     | Placeholder data (`SAMPLE_GALLERY` const).                             |
| `/pricing`     | Static.                                                                |
| `/faq`         | Static.                                                                |

Search for `TODO:` in the `app/` folder to find the exact integration points.

## Coding Conventions

- All client components start with `"use client";`. Server components are the default.
- Use `cn()` from `lib/utils.ts` for merging Tailwind classes on shadcn components.
- Framer Motion (`framer-motion`) is used for small enter animations — stay consistent.
- Icons: `lucide-react`.
- Prefer shadcn `<Button>` / `<Card>` over raw elements where possible.

## Env Vars Reference

| Variable                              | Where it's read          | Notes                                       |
| ------------------------------------- | ------------------------ | ------------------------------------------- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`   | Client JS bundle (build) | Must be present at `next build` time. Baked into `compose.yaml` for Docker. |
| `CLERK_SECRET_KEY`                    | Server (middleware/API)  | Never commit. Loaded from `.env.local`.     |
| `NEXT_PUBLIC_API_URL`                 | Client                   | FastAPI URL (host-reachable).               |
| `FASTAPI_INTERNAL_URL`                | Server                   | FastAPI URL (in-compose network).           |
| `DATABASE_URL`                        | Server                   | Postgres connection string.                 |
| `REDIS_URL`                           | Server                   | Redis connection string.                    |

## Common Gotchas

- **Changed an env var and the app still behaves old?** Rebuild: `docker compose up --build`. `NEXT_PUBLIC_*` values are inlined at build time.
- **TypeScript error about `SignedIn` not existing?** See the Clerk v7 notes above.
- **X button on create-page thumbnails doesn't work?** Make sure any absolute overlay on the active thumbnail has `pointer-events-none`.
