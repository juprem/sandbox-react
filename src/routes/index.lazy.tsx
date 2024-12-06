import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
    component: Index,
    beforeLoad: ({ context }) => ({
        queryClient: context.queryClient,
        breadcrumbs: '/Home',
    }),
});

function Index() {
    return <div>Hello world</div>;
}
