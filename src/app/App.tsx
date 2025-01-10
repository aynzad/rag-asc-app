import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { toast, ToastContainer } from "react-toastify";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import theme from "@src/configs/theme.ts";
import { Loading } from "@src/components/loading/Loading";
import { routeTree } from "@src/app/routes.gen";
import "@src/assets/css/app.css";
import "react-toastify/dist/ReactToastify.css";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error(error.message);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      toast.error(error.message);
    },
  }),
});

// Set up a Router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  defaultPendingComponent: () => <Loading />,
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer
        position="top-right"
        theme="dark"
        newestOnTop
        draggable
        draggablePercent={30}
        style={{ minWidth: "300px" }}
      />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
