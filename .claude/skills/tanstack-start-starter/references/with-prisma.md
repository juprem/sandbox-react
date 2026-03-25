# Prisma + NeonDB Add-on

Everything needed to add a PostgreSQL database via Prisma 7 and NeonDB to the core stack.

---

## Prerequisites

| Service | What you need |
|---|---|
| [NeonDB](https://neon.tech) | Create a project → copy the **pooled** connection string |

Add to `.env`:
```
DATABASE_URL=postgresql://user:password@ep-xxx.neon.tech/neondb?sslmode=require
```

Set as a Wrangler secret for production:
```bash
wrangler secret put DATABASE_URL
```

---

## package.json additions

Add to `dependencies`:
```json
"@neondatabase/serverless": "1.0.2",
"@prisma/adapter-neon": "^7.8.0",
"@prisma/client": "7.4.2",
"prisma": "7.8.0"
```

---

## prisma.config.ts

```typescript
import "dotenv/config"
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: env("DATABASE_URL") },
})
```

---

## prisma/schema.prisma

```prisma
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
  runtime  = "cloudflare"
}

datasource db {
  provider = "postgresql"
}

// Add your models here. Example:
model Item {
  id        Int      @id @default(autoincrement())
  name      String   @db.VarChar
  createdAt DateTime @default(now())
}
```

After any schema change: `npx prisma db push` (dev) or `npx prisma migrate dev` (with migrations).  
`output = "../generated/prisma"` and `runtime = "cloudflare"` are required — do not change them.

---

## src/db.ts

```typescript
import { neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '../generated/prisma/client.ts'

neonConfig.poolQueryViaFetch = true

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
export const prisma = new PrismaClient({ adapter })
```

`poolQueryViaFetch = true` is mandatory for Cloudflare Workers — Workers have no TCP sockets,
so Neon must use the HTTP fetch API instead.

---

## Updated exampleRouter.ts (with Prisma)

```typescript
import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '#/integrations/trpc/init.ts'
import { prisma } from '#/db.ts'

export const exampleRouter = createTRPCRouter({
  list: publicProcedure.query(async () => {
    return prisma.item.findMany({ orderBy: { createdAt: 'desc' } })
  }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      return prisma.item.create({ data: { name: input.name } })
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return prisma.item.delete({ where: { id: input.id } })
    }),
})
```

---

## Date storage convention

Always store dates as UTC midnight: `new Date('2026-06-08T00:00:00.000Z')`.  
Use Day.js for manipulation and display — never use raw JS `Date` arithmetic.

---

## Commands

```bash
npx prisma db push       # sync schema to NeonDB (no migration history)
npx prisma migrate dev   # create a migration file + push (use in production flows)
npx prisma studio        # visual DB browser at localhost:5555
npx prisma generate      # regenerate client after schema changes without pushing
```
