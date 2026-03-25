# Core Boilerplate

Exact file contents for the core stack (no Prisma, no Clerk).

---

## package.json (core only)

```json
{
  "name": "your-app-name",
  "private": true,
  "type": "module",
  "imports": {
    "#/*": "./src/*"
  },
  "scripts": {
    "dev": "vite dev --port 3000",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "deploy": "npm run build && wrangler deploy",
    "lint": "oxlint src/",
    "cf-typegen": "wrangler types",
    "postinstall": "npm run cf-typegen"
  },
  "dependencies": {
    "@cloudflare/vite-plugin": "1.26.0",
    "@tailwindcss/vite": "4.1.18",
    "@tanstack/react-devtools": "latest",
    "@tanstack/react-query": "latest",
    "@tanstack/react-query-devtools": "latest",
    "@tanstack/react-router": "latest",
    "@tanstack/react-router-devtools": "latest",
    "@tanstack/react-router-ssr-query": "latest",
    "@tanstack/react-start": "latest",
    "@tanstack/router-plugin": "1.132.0",
    "@trpc/client": "11.17.0",
    "@trpc/server": "11.17.0",
    "@trpc/tanstack-react-query": "11.17.0",
    "antd": "^6.3.7",
    "dayjs": "^1.11.20",
    "lucide-react": "0.545.0",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "sonner": "^2.0.7",
    "superjson": "2.2.2",
    "tailwindcss": "4.1.18",
    "zod": "4.3.6",
    "zustand": "^5.0.12"
  },
  "devDependencies": {
    "@tailwindcss/typography": "0.5.16",
    "@tanstack/devtools-vite": "latest",
    "@testing-library/dom": "10.4.1",
    "@testing-library/react": "16.3.0",
    "@types/node": "22.19.17",
    "@types/react": "19.2.3",
    "@types/react-dom": "19.2.3",
    "@vitejs/plugin-react": "5.2.0",
    "babel-plugin-react-compiler": "1.0.0",
    "dotenv-cli": "11.0.0",
    "jsdom": "28.1.0",
    "oxlint": "^1.68.0",
    "tsx": "4.21.0",
    "typescript": "6.0.2",
    "vite": "7.3.2",
    "wrangler": "4.98.0"
  }
}
```

---

## tsconfig.json

```json
{
  "include": ["**/*.ts", "**/*.tsx"],
  "compilerOptions": {
    "target": "ES2022",
    "jsx": "react-jsx",
    "module": "ESNext",
    "paths": {
      "#/*": ["./src/*"],
      "@/*": ["./src/*"]
    },
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "types": ["vite/client"],
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "noEmit": true,
    "skipLibCheck": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  }
}
```

---

## vite.config.ts

```typescript
import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { cloudflare } from '@cloudflare/vite-plugin'

export default defineConfig({
  server: {
    watch: { usePolling: true, interval: 300 },
  },
  plugins: [
    devtools(),
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tailwindcss(),
    tanstackStart(),
    viteReact({
      babel: { plugins: ['babel-plugin-react-compiler'] },
    }),
  ],
})
```

Plugin order matters: `cloudflare` must come before `tailwindcss` and `tanstackStart`.

---

## wrangler.jsonc

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "your-worker-name",
  "compatibility_date": "2025-09-02",
  "compatibility_flags": [
    "nodejs_compat",
    "no_handle_cross_request_promise_resolution"
  ],
  "main": "@tanstack/react-start/server-entry",
  "observability": {
    "enabled": false,
    "logs": { "enabled": true, "persist": true, "invocation_logs": true }
  },
  "routes": [
    {
      "pattern": "your-domain.com",
      "zone_name": "your-domain.com",
      "custom_domain": true
    }
  ]
}
```

Both `compatibility_flags` are required:
- `nodejs_compat` — enables Node.js APIs in the Worker
- `no_handle_cross_request_promise_resolution` — prevents promise leaking across requests

---

## src/integrations/tanstack-query/root-provider.tsx

```typescript
import type { ReactNode } from 'react'
import { QueryClient } from '@tanstack/react-query'
import superjson from 'superjson'
import { createTRPCClient, httpBatchLink } from '@trpc/client'
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query'
import type { TRPCRouter } from '#/integrations/trpc/router/router.ts'
import { TRPCProvider } from '#/integrations/trpc/react'

function getUrl() {
  const base = typeof window !== 'undefined'
    ? ''
    : `http://localhost:${process.env.PORT ?? 3000}`
  return `${base}/api/trpc`
}

export const trpcClient = createTRPCClient<TRPCRouter>({
  links: [httpBatchLink({ transformer: superjson, url: getUrl() })],
})

export function getContext() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { refetchOnWindowFocus: false },
      dehydrate: { serializeData: superjson.serialize },
      hydrate: { deserializeData: superjson.deserialize },
    },
  })
  const trpc = createTRPCOptionsProxy({ client: trpcClient, queryClient })
  return { queryClient, trpc }
}

export default function TanstackQueryProvider({
  children,
  context,
}: {
  children: ReactNode
  context: ReturnType<typeof getContext>
}) {
  return (
    <TRPCProvider trpcClient={trpcClient} queryClient={context.queryClient}>
      {children}
    </TRPCProvider>
  )
}
```

---

## __root.tsx (no auth)

```typescript
import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import type { TRPCOptionsProxy } from '@trpc/tanstack-react-query'
import type { TRPCRouter } from '#/integrations/trpc/router/router.ts'
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
        <Scripts />
      </body>
    </html>
  )
}
```
