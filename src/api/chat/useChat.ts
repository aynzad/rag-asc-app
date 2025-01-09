import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { getChat } from "./getChat";

export const chatQueryOptions = (chatId: string) =>
  queryOptions({
    queryKey: ["chat", chatId],
    queryFn: () => getChat(chatId),
    staleTime: Infinity,
  });

export const useChat = (chatId: string) => {
  return useSuspenseQuery(chatQueryOptions(chatId));
};
