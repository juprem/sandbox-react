import { createRouter } from '@tanstack/react-router';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';
import { routeTree } from './routeTree.gen';
import * as TanstackQuery from './integrations/tanstack-query/root-provider';

export const getRouter = () => {
  const rqContext = TanstackQuery.getContext();

  const router = createRouter({
    routeTree,
    context: {
      ...rqContext,
      breadcrumbs: '',
    },
    Wrap: (props: { children: React.ReactNode }) => {
      return <TanstackQuery.Provider>{props.children}</TanstackQuery.Provider>;
    },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultNotFoundComponent: () => <div>Not Found</div>,
  });

  // @ts-ignore
  setupRouterSsrQueryIntegration({ router, queryClient: rqContext.queryClient });

  return router;
};
