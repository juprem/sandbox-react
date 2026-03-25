# Clerk Auth Add-on

Everything needed to add role-based authentication via Clerk to the core stack.

---

## Prerequisites

| Service | What you need |
|---|---|
| [Clerk](https://clerk.com) | Create an application → copy keys |

Add to `.env`:
```
CLERK_SECRET_KEY=sk_live_...
VITE_CLERK_PUBLISHABLE_KEY=pk_live_...
```

Set as Wrangler secrets for production:
```bash
wrangler secret put CLERK_SECRET_KEY
wrangler secret put VITE_CLERK_PUBLISHABLE_KEY
```

In the Clerk dashboard: create a custom role (e.g. `app_access`) and assign it to users
who should have access. Update the role string in `src/server/auth.ts`.

---

## package.json additions

Add to `dependencies`:
```json
"@clerk/tanstack-react-start": "^1.1.8"
```

---

## src/start.ts

Wires Clerk's session middleware into every request before TanStack Start handles routing.

```typescript
import { createStart } from '@tanstack/react-start'
import { clerkMiddleware } from '@clerk/tanstack-react-start/server'

export const startInstance = createStart(() => ({
  requestMiddleware: [clerkMiddleware()],
}))
```

---

## src/server/auth.ts

Server function called in `beforeLoad` hooks to enforce access. Redirects unauthenticated
users to `/sign-in` and users without the required role to `/forbidden`.

```typescript
import { createServerFn } from '@tanstack/react-start'
import { auth } from '@clerk/tanstack-react-start/server'
import { redirect } from '@tanstack/react-router'

export const requireAccess = createServerFn().handler(async () => {
  const { isAuthenticated, has } = await auth()

  if (!isAuthenticated) throw redirect({ to: '/sign-in' })
  if (!has({ role: 'app_access' })) throw redirect({ to: '/forbidden' })
})
```

Replace `'app_access'` with the role name you created in the Clerk dashboard.

---

## src/integrations/clerk/provider.tsx

Reads the publishable key at module load — throws early if missing to catch misconfigured
environments before the app renders.

```typescript
import { ClerkProvider } from '@clerk/tanstack-react-start'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error('Add VITE_CLERK_PUBLISHABLE_KEY to your .env file')
}

export default function AppClerkProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      {children}
    </ClerkProvider>
  )
}
```

Update `afterSignOutUrl` to your app's public landing page.

---

## __root.tsx (with Clerk)

Same as the no-auth version in `boilerplate.md`, with `AppClerkProvider` wrapping the body:

```typescript
import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import type { TRPCOptionsProxy } from '@trpc/tanstack-react-query'
import type { TRPCRouter } from '#/integrations/trpc/router/router.ts'
import AppClerkProvider from '#/integrations/clerk/provider'
import TanStackQueryDevtools from '#/integrations/tanstack-query/devtools'
import { ConfigProvider } from 'antd'
import { Toaster } from 'sonner'
import appCss from '../styles.css?url'

interface MyRouterContext {
  queryClient: QueryClient
  trpc: TRPCOptionsProxy<TRPCRouter>
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Your App Name' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <AppClerkProvider>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#3B82F6',
                borderRadius: 8,
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              },
            }}
          >
            {children}
            <Toaster position="bottom-right" richColors />
            <TanStackDevtools
              config={{ position: 'bottom-right' }}
              plugins={[
                { name: 'Tanstack Router', render: <TanStackRouterDevtoolsPanel /> },
                TanStackQueryDevtools,
              ]}
            />
          </ConfigProvider>
        </AppClerkProvider>
        <Scripts />
      </body>
    </html>
  )
}
```

---

## src/routes/_protected.tsx

Layout route that guards all routes nested under `_protected/`. The `_protected` prefix is
invisible in the URL — `/dashboard` at `src/routes/_protected/dashboard/index.tsx` works
as if `_protected` doesn't exist.

```typescript
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { requireAccess } from '#/server/auth.ts'

export const Route = createFileRoute('/_protected')({
  component: () => <Outlet />,
  beforeLoad: async () => await requireAccess(),
})
```

Move all authenticated pages under `src/routes/_protected/`.

---

## Updated api.trpc.$.tsx (with Clerk)

Add `beforeLoad` so the tRPC endpoint itself requires authentication:

```typescript
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { createFileRoute } from '@tanstack/react-router'
import { trpcRouter } from '#/integrations/trpc/router/router.ts'
import { requireAccess } from '#/server/auth.ts'

function handler({ request }: { request: Request }) {
  return fetchRequestHandler({
    req: request,
    router: trpcRouter,
    endpoint: '/api/trpc',
    createContext: () => ({}),
  })
}

export const Route = createFileRoute('/api/trpc/$')({
  beforeLoad: async () => await requireAccess(),
  server: { handlers: { GET: handler, POST: handler } },
})
```

---

## Sign-in and forbidden routes

Clerk redirects to `/sign-in` automatically. Create these two routes or the redirect will 404.

```typescript
// src/routes/sign-in/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { SignIn } from '@clerk/tanstack-react-start'
// Note: this is Clerk's SignIn, not Ant Design — no naming conflict since Ant Design
// does not export a component called SignIn.

export const Route = createFileRoute('/sign-in/')({
  component: () => <SignIn />,
})
```

```typescript
// src/routes/forbidden/index.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/forbidden/')({
  component: ForbiddenPage,
})

function ForbiddenPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-lg text-stone-600">Access denied.</p>
    </div>
  )
}
```

---

## Getting the current user in a tRPC procedure

```typescript
import { getAuth } from '@clerk/tanstack-react-start/server'
import { createServerFn } from '@tanstack/react-start'

// Inside a procedure or server function:
const { userId } = await getAuth(request)
if (!userId) throw new TRPCError({ code: 'UNAUTHORIZED' })
```
