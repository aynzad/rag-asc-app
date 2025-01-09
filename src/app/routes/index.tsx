import { createFileRoute } from "@tanstack/react-router";

import { MainPage } from "@pages/main/Main.page";

export const Route = createFileRoute("/")({
  component: MainPage,
});
