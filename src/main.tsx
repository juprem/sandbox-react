import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ZodError } from 'zod';
import { css } from '@styled-system/css';
import { createMemoryHistory, createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';

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

const memoryHistory = createMemoryHistory({
    initialEntries: ['/crash-test'], // Pass your initial url
});

const router = createRouter({
    routeTree,
    basepath: "/sandbox-react/",
    history: memoryHistory,
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

dayjs.locale('fr');

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ConfigProvider
            theme={{
                token: {
                    fontFamily: 'monospace',
                    colorText: 'white',
                    colorBgBase: '#2e2e2e',
                },
            }}
        >
            <QueryClientProvider client={queryClient}>
                <div className={css({ height: '100vh' })}>
                    <RouterProvider router={router} />
                </div>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ConfigProvider>
    </StrictMode>,
);
