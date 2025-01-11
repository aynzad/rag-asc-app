import { lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { chatQueryOptions } from "@src/api/chat/useChat";
const ChatPage = lazy(() => import("@pages/chat/Chat.page"));

export const Route = createFileRoute("/chat/$chatId")({
  loader: ({ context: { queryClient }, params }) => {
    queryClient.ensureQueryData(chatQueryOptions(params.chatId));
  },
  component: ChatPage,
});
