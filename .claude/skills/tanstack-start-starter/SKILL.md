---
name: tanstack-start-starter
description: >
  Scaffold a full-stack SSR application using TanStack Start + TanStack Router (file-based) +
  tRPC 11 + Ant Design 6 + Tailwind CSS 4 + Cloudflare Workers. Prisma + NeonDB (database) and
  Clerk (auth) are optional add-ons. Use this skill whenever the user wants to create a new app,
  initialize a project, start from scratch, or set up a new full-stack TypeScript project with
  this stack. Also use it when the user asks how to wire tRPC with TanStack Query, how to set up
  Clerk auth, how to connect Prisma to NeonDB on Cloudflare Workers, or how to scaffold any
  layer of this stack.
---

# TanStack Start Starter

Creates a production-ready full-stack SSR app deployed on Cloudflare Workers.
Every pattern is extracted from the calendar-app reference project (working, deployed code).

---

## Step 0 — Clarify scope before writing any code

Ask the user these two questions if not already answered:

1. **Database?** — Do you need a database (Prisma + NeonDB)?
2. **Auth?** — Do you need authentication (Clerk)?

This determines which steps and reference files apply. The core stack is always the same;
Prisma and Clerk are independent add-ons that can be combined freely.

| Combination | Steps to follow |
|---|---|
| Core only | Steps 1–10 |
| Core + Prisma | Steps 1–10 + [Prisma add-on](#prisma-add-on) |
| Core + Clerk | Steps 1–10 + [Clerk add-on](#clerk-add-on) |
| Core + Prisma + Clerk | Steps 1–10 + both add-ons |

---

## Core stack (always)

```
Browser
  └─ TanStack Router     src/routes/           file = route, SSR + RSC-ready
       └─ Components      src/components/       Ant Design + Tailwind
            └─ Services   src/services/         hooks wrapping tRPC
                 └─ tRPC  src/integrations/trpc/ type-safe API
```

Deploy: Cloudflare Workers via `wrangler deploy`.

---

## Core prerequisites

| Service | What you need |
|---|---|
| [Cloudflare](https://cloudflare.com) | Account + Worker name in `wrangler.jsonc` |

`.env` (only Cloudflare bindings needed for core):
```
# No secrets required for core — add DATABASE_URL / Clerk keys only if using those add-ons
```

---

## Step 1 — package.json

See `references/boilerplate.md` → **package.json** for the core dependency list.

- `"type": "module"` — ESM throughout
- `"imports": { "#/*": "./src/*" }` — `#/` alias (alongside `@/`) resolves to `src/`
- `postinstall` runs `wrangler types` to keep Cloudflare bindings typed

If using **Prisma**, add to `dependencies`:
```json
"@neondatabase/serverless": "1.0.2",
"@prisma/adapter-neon": "^7.8.0",
"@prisma/client": "7.4.2",
"prisma": "7.8.0"
```

If using **Clerk**, add to `dependencies`:
```json
"@clerk/tanstack-react-start": "^1.1.8"
```

---

## Step 2 — Config files

| File | Purpose | Required |
|---|---|---|
| `tsconfig.json` | Strict TS, `moduleResolution: bundler`, path aliases | Always |
| `vite.config.ts` | TanStack Start + Cloudflare + Tailwind + React Compiler | Always |
| `wrangler.jsonc` | Cloudflare Worker — update `name` and `routes` | Always |
| `prisma.config.ts` | Prisma schema path + NeonDB URL | Prisma only |

Full contents in `references/boilerplate.md`.

---

## Step 3 — Server entry point

`src/start.ts` is required for all TanStack Start apps — it registers server middleware.

**Without Clerk** (no middleware):
```typescript
import { createStart } from '@tanstack/react-start'

export const startInstance = createStart(() => ({}))
```

**With Clerk** — this file is replaced by the version in `references/with-clerk.md`.

---

## Step 4 — tRPC layer

Four files. Copy exactly.

### `src/integrations/trpc/init.ts`
```typescript
import { initTRPC } from '@trpc/server'
import superjson from 'superjson'

const t = initTRPC.create({ transformer: superjson })

export const createTRPCRouter = t.router
export const publicProcedure = t.procedure
```

### `src/integrations/trpc/react.ts`
```typescript
import { createTRPCContext } from '@trpc/tanstack-react-query'
import type { TRPCRouter } from '#/integrations/trpc/router/router.ts'

export const { TRPCProvider, useTRPC } = createTRPCContext<TRPCRouter>()
```

### `src/integrations/trpc/router/router.ts`
```typescript
import { createTRPCRouter } from '#/integrations/trpc/init.ts'
import { exampleRouter } from './exampleRouter.ts'

export const trpcRouter = createTRPCRouter({
  example: exampleRouter,
})

export type TRPCRouter = typeof trpcRouter
```

### `src/integrations/trpc/router/exampleRouter.ts`

**Without Prisma** — use in-memory data or call an external API:
```typescript
import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '#/integrations/trpc/init.ts'

// In-memory placeholder — does NOT persist across Cloudflare Worker isolate restarts.
// Replace with your real data source: KV, D1, external API, or Prisma (see Prisma add-on).
const items: { id: number; name: string }[] = []

export const exampleRouter = createTRPCRouter({
  list: publicProcedure.query(() => items),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(({ input }) => {
      const item = { id: items.length + 1, name: input.name }
      items.push(item)
      return item
    }),
})
```

**With Prisma** — import `prisma` from `src/db.ts` (see Prisma add-on section).

---

## Step 5 — TanStack Query provider

### `src/integrations/tanstack-query/root-provider.tsx`

See `references/boilerplate.md` → **root-provider.tsx**.

Key wiring:
- `createTRPCClient` → `httpBatchLink` + SuperJSON transformer
- `getContext()` creates a fresh `QueryClient` per SSR request
- `TanstackQueryProvider` wraps `TRPCProvider`

**Critical**: use `httpBatchLink`, not `httpBatchStreamLink`, unless you need streaming.

### `src/integrations/tanstack-query/devtools.tsx`
```typescript
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'

export default {
  name: 'Tanstack Query',
  render: <ReactQueryDevtoolsPanel />,
}
```

---

## Step 6 — Root route

### `src/routes/__root.tsx`

Two variants depending on whether Clerk is used.

**Without Clerk** — see `references/boilerplate.md` → **__root.tsx (no auth)**.

**With Clerk** — see `references/with-clerk.md` → **__root.tsx (with Clerk)**.

Both variants share:
- `createRootRouteWithContext<MyRouterContext>()` injects `queryClient` + `trpc` into all routes
- `ConfigProvider` from Ant Design sets theme tokens — customise `colorPrimary` and `title`
- `Toaster` from `sonner` for notifications
- Devtools auto-hidden in production by `@tanstack/devtools-vite`

### `src/routes/index.tsx`
```typescript
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: () => { throw redirect({ to: '/home' }) },
})
```

### `src/routes/api.trpc.$.tsx`

**Without Clerk** (no auth guard):
```typescript
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { createFileRoute } from '@tanstack/react-router'
import { trpcRouter } from '#/integrations/trpc/router/router.ts'

function handler({ request }: { request: Request }) {
  return fetchRequestHandler({
    req: request,
    router: trpcRouter,
    endpoint: '/api/trpc',
    createContext: () => ({}),
  })
}

export const Route = createFileRoute('/api/trpc/$')({
  server: { handlers: { GET: handler, POST: handler } },
})
```

**With Clerk** — add `beforeLoad: async () => await requireAccess()` (see Clerk add-on).

**Critical**: `createContext` must always be `() => ({})` — never import `createTRPCContext`
from `@trpc/tanstack-react-query` here; that is only for the client provider.

### `src/styles.css`
```css
@import "tailwindcss";

* { box-sizing: border-box; }
html, body, #app { height: 100%; margin: 0; padding: 0; }
```

---

## Step 7 — Service hook pattern

Never call `useTRPC()` directly in a component. Every tRPC call lives in a service hook:

```typescript
// src/services/exampleService.ts
import { useMutation, useQuery } from '@tanstack/react-query'
import { useTRPC } from '#/integrations/trpc/react'

export function useExampleList() {
  const trpc = useTRPC()
  return useQuery(trpc.example.list.queryOptions())
}

export function useCreateExample() {
  const trpc = useTRPC()
  return useMutation(trpc.example.create.mutationOptions())
}
```

---

## Step 8 — Client state (Zustand)

Use Zustand for non-persisted UI state only. Never store server data here — that lives in
TanStack Query.

```typescript
// src/store/appStore.ts
import { create } from 'zustand'

interface AppStore {
  selectedId: string | null
  setSelectedId: (id: string | null) => void
}

export const useAppStore = create<AppStore>((set) => ({
  selectedId: null,
  setSelectedId: (id) => set({ selectedId: id }),
}))
```

---

## Step 9 — First component

```typescript
// src/components/Example/ExampleList.tsx
import { useExampleList } from '#/services/exampleService'
import { Spin } from 'antd'

export function ExampleList() {
  const { data, isPending } = useExampleList()

  if (isPending) return <Spin />
  return (
    <ul>
      {data?.map((item) => <li key={item.id}>{item.name}</li>)}
    </ul>
  )
}
```

---

## Step 10 — First route

```typescript
// src/routes/home/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { ExampleList } from '#/components/Example/ExampleList.tsx'

export const Route = createFileRoute('/home/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="p-6">
      <ExampleList />
    </div>
  )
}
```

---

## Prisma add-on

Read `references/with-prisma.md` for all Prisma-specific files and instructions.

**Summary of what it adds:**
- `prisma/schema.prisma` + `prisma.config.ts`
- `src/db.ts` — Prisma client with Neon adapter (`poolQueryViaFetch = true` required for Workers)
- Updated `exampleRouter.ts` using `prisma` queries
- `DATABASE_URL` env var + Wrangler secret

**After adding**: update the feature checklist to include `npx prisma db push` after model changes.

---

## Clerk add-on

Read `references/with-clerk.md` for all Clerk-specific files and instructions.

**Summary of what it adds:**
- `src/start.ts` — Clerk middleware wired into TanStack Start
- `src/server/auth.ts` — `requireAccess` server function (role-based redirect)
- `src/integrations/clerk/provider.tsx` — Clerk provider with early env check
- Updated `__root.tsx` wrapping everything in `ClerkProvider`
- `src/routes/_protected.tsx` — layout route that guards all protected pages
- Updated `api.trpc.$.tsx` with `beforeLoad` auth guard
- `CLERK_SECRET_KEY` + `VITE_CLERK_PUBLISHABLE_KEY` env vars + Wrangler secrets

**After adding**: create roles in the Clerk dashboard matching the role string in `auth.ts`.

---

## Mandatory conventions

Enforced by the reviewer — violations cause `[REQUEST CHANGES]`:

1. **Named exports only** — no `export default` for domain components or utilities.
   Exception: framework integration wrappers (`root-provider.tsx`, `clerk/provider.tsx`,
   `devtools.tsx`) use default exports to follow framework conventions.
2. **No `as` assertions** — use Zod `.safeParse()` or `satisfies`
3. **No `any` types**
4. **One component per file**
5. **All tRPC calls through service hooks** in `src/services/`
6. **Zod schemas for all tRPC inputs** — define in `src/models/`, reuse as validators
7. **Dates**: Day.js — store as UTC midnight ISO string `"YYYY-MM-DDT00:00:00.000Z"`
8. **Navigation**: `<Link>` for anchors, `useNavigate()` only inside event handlers

---

## Dev commands

```bash
npm run dev              # local dev server (port 3000)
npm run build            # production build
npm test                 # Vitest test suite
wrangler deploy          # deploy to Cloudflare Workers

# Prisma only:
npx prisma db push       # sync schema to NeonDB
npx prisma studio        # browse DB locally
```

---

## Adding a new feature checklist

- [ ] *(Prisma only)* Add Prisma model → `npx prisma db push`
- [ ] Add Zod schema to `src/models/`
- [ ] Add tRPC procedure to matching sub-router (or create new one + register in `router.ts`)
- [ ] Add service hook in `src/services/`
- [ ] Add route file under `src/routes/` *(or `src/routes/_protected/` if using Clerk)*
- [ ] Add component under `src/components/`
- [ ] Run reviewer-expert skill at the end
