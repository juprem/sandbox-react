import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: Index,
  beforeLoad: ({ context }) => ({
    queryClient: context.queryClient,
    breadcrumbs: '/Home',
  }),
})

function Index() {
  return <div>Hello world</div>
}
