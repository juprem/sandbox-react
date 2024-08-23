import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ZodError } from 'zod';
import { css } from '@styled-system/css';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

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

const router = createRouter({
    routeTree,
    context: {
        queryClient: queryClient,
        breadcrumbs: '',
    },
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <div className={css({ height: '100vh', backgroundColor: '#dadada' })}>
                <RouterProvider router={router} />
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </StrictMode>,
);
