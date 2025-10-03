import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import superjson from "superjson";
import { createTRPCClient, httpBatchStreamLink } from "@trpc/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";

import type { TRPCRouter } from "../trpc/router/router.ts";

import { TRPCProvider } from "../trpc/react";
import { ZodError } from "zod";

function getUrl() {
  // if (import.meta.env.PROD) {
  //   return "https://anime.olivierabdelnour.dev/api/trpc";
  // }

  return "http://localhost:3001/api/trpc";
}

export const trpcClient = createTRPCClient<TRPCRouter>({
  links: [
    httpBatchStreamLink({
      transformer: superjson,
      url: getUrl(),
    }),
  ],
});

const queryClient = new QueryClient({
  defaultOptions: {
    dehydrate: { serializeData: superjson.serialize },
    hydrate: { deserializeData: superjson.deserialize },
    queries: {
      retry: (failureCount, error: Error) => {
        if (error instanceof ZodError) {
          return false;
        }
        return failureCount < 3;
      },
      throwOnError: (error: Error) => error instanceof ZodError,
      refetchOnWindowFocus: false,
      staleTime: 300000,
    },
  },
});

export function getContext() {
  const serverHelpers = createTRPCOptionsProxy({
    client: trpcClient,
    queryClient: queryClient,
  });

  return {
    queryClient,
    trpc: serverHelpers,
  };
}

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}
