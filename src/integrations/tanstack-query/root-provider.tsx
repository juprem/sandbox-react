import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ZodError } from 'zod';

export function getContext() {
  const queryClient = new QueryClient({
      defaultOptions: {
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
  return {
    queryClient,
  }
}

export function Provider({
  children,
  queryClient,
}: {
  children: React.ReactNode
  queryClient: QueryClient
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
