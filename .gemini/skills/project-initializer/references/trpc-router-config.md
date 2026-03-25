### file to create the routing on trpc

```ts
import { createTRPCContext } from "#/server/trpc/trpc";
import { createFileRoute } from "@tanstack/react-router";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "#/server/trpc/routers";

const handler = async ({ request }: { request: Request }) => {
  const response = await fetchRequestHandler({
    req: request,
    router: appRouter,
    endpoint: "/api/trpc",
    onError: (error) => console.log(error),
    createContext: () => createTRPCContext(),
  });

  return response;
};

export const Route = createFileRoute("/api/trpc/$")({
  server: {
    handlers: {
      GET: handler,
      POST: handler,
    },
  },
});

```