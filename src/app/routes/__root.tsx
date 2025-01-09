import { Suspense } from "react";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { chatsQueryOptions } from "@src/api/chats/useChats";
import { Layout } from "@src/components/layout/Layout";
import { Sidebar } from "@src/components/sidebar/Sidebar";
import { SidebarSkeleton } from "@src/components/sidebar/Sidebar.skeleton";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(chatsQueryOptions());
  },
  component: () => (
    <>
      <Layout>
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
      </Layout>
      <TanStackRouterDevtools />
    </>
  ),
});
