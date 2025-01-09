import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { getChats } from "./getChats";

export const chatsQueryOptions = () =>
  queryOptions({
    queryKey: ["chats"],
    queryFn: () => getChats(),
    staleTime: Infinity,
  });

export const useChats = () => {
  return useSuspenseQuery(chatsQueryOptions());
};
