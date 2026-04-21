# AIPurpixBrickLab

Monorepo for the PictoBrick / Purpix project — a web app that turns user photos into buildable LEGO-style brick mosaics.

## Repo Layout

```
AIPurpixBrickLab/
├── pictobrickWebApp/         # main web application (Docker-composed)
│   ├── frontend/             # Next.js 16 app (App Router, React 19, Tailwind v4, shadcn)
│   ├── ml/                   # FastAPI + Python ML service (not yet wired into compose)
│   └── compose.yaml          # Docker Compose: frontend + postgres + redis
└── README.md                 # this file
```

The active app is `pictobrickWebApp/frontend`.

## Prerequisites

- Docker Desktop (for `docker compose`)
- Node.js ≥ 20.9 (only needed if you want to run the frontend outside Docker)
- Access to the Clerk workspace — ask the project owner for `CLERK_SECRET_KEY`

## First-Time Setup

1. **Clone** the repo.
2. **Create the secrets file** at `pictobrickWebApp/.env.local`:
   ```
   CLERK_SECRET_KEY=sk_test_...   # get this from the project owner
   ```
   This file is gitignored. The Clerk **publishable key** is already baked into `compose.yaml` (safe — it's public by design).
3. **Start the stack:**
   ```bash
   cd pictobrickWebApp
   docker compose up --build
   ```
4. Open <http://localhost:3000>.

## Common Commands

| Action                        | From `pictobrickWebApp/`                            |
| ----------------------------- | --------------------------------------------------- |
| Start everything              | `docker compose up --build`                         |
| Stop everything               | `docker compose down`                               |
| Rebuild after env/code change | `docker compose up --build`                         |
| Tail frontend logs            | `docker compose logs -f frontend`                   |

For frontend-specific dev (hot reload outside Docker), see [`pictobrickWebApp/frontend/README.md`](./pictobrickWebApp/frontend/README.md).

## Authentication

Uses **Clerk** (modal-based sign in / sign up). The `/my-builds` page is auth-gated via `frontend/middleware.ts`; everything else is public.

## Backend Status

The FastAPI ML service in `pictobrickWebApp/ml/` is **not yet running in compose** — it's commented out. The `/create` page's "Generate Layout" button currently simulates generation with a timeout and redirects to `/my-builds`. The `/my-builds` page shows placeholder data. Wiring these to real endpoints is the next milestone.

## Troubleshooting

- **"Missing publishableKey" at container start** → `.env.local` is missing or compose wasn't rebuilt. Re-run `docker compose up --build`.
- **Push denied to GitHub** → make sure `gh auth status` shows the account that's a collaborator on this repo, then `gh auth setup-git` so git uses the gh token instead of stale keychain creds.
