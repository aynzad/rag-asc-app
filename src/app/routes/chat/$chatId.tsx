import { createFileRoute } from "@tanstack/react-router";

import { ChatPage } from "@pages/chat/Chat.page";

export const Route = createFileRoute("/chat/$chatId")({
  component: ChatPage,
});
