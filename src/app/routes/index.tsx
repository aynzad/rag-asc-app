import { lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";

const MainPage = lazy(() => import("@pages/main/Main.page"));

export const Route = createFileRoute("/")({
  component: MainPage,
});
