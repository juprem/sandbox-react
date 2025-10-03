import { createFileRoute } from '@tanstack/react-router';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { createTRPCContext } from '@trpc/tanstack-react-query';
import { trpcRouter } from '../../integrations/trpc/router/router';

const handler = async ({ request }: { request: Request }) => {
    const response = await fetchRequestHandler({
        req: request,
        router: trpcRouter,
        endpoint: '/api/trpc',
        onError: (error) => console.log(error),
        createContext: () => createTRPCContext(),
    });

    if (request.url.includes('forecast')) {
        response.headers.set('Cache-Control', 'public, max-age=72000');
    }

    return response;
};

export const Route = createFileRoute('/api/trpc/$')({
    server: {
        handlers: {
            GET: handler,
            POST: handler,
        },
    },
});
