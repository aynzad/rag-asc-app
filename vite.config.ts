import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({
      routesDirectory: path.resolve(__dirname, "./src/app/routes"),
      generatedRouteTree: path.resolve(__dirname, "./src/app/routes.gen.ts"),
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@src": path.resolve(__dirname, "./src"),
    },
  },
});
