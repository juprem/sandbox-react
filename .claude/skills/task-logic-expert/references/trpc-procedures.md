# tRPC Procedures (Drizzle + Zod)

## Router Setup (src/server/trpc/routers/item.ts)

```ts
import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { db } from "../../../db";
import { items } from "../../../db/schema";
import { eq } from "drizzle-orm";

export const itemRouter = router({
  // Query
  all: protectedProcedure.query(async ({ ctx }) => {
    return await db.select().from(items).where(eq(items.userId, ctx.userId));
  }),

  // Mutation
  update: protectedProcedure
    .input(z.object({ id: z.string().uuid(), data: z.object({ title: z.string().optional() }) }))
    .mutation(async ({ input, ctx }) => {
      await db.update(items).set(input.data).where(eq(items.id, input.id));
      return { success: true };
    }),
});
```

## Auth Context (src/server/trpc/trpc.ts)

```ts
import { initTRPC, TRPCError } from "@trpc/server";
import { getAuth } from "@clerk/tanstack-start/server";

export const createTRPCContext = async ({ req }) => {
  const { userId } = await getAuth(req);
  return { userId };
};

const t = initTRPC.context<typeof createTRPCContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.userId) throw new TRPCError({ code: "UNAUTHORIZED" });
  return next({ ctx: { userId: ctx.userId } });
});
```
