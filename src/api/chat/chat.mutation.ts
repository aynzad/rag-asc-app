import { useMutation } from "@tanstack/react-query";

import { request } from "../utils/request";
import { SendChatResponse } from "./chat.types";

export const useSendChatMessage = () => {
  return useMutation({
    mutationKey: ["send_chat_message"],
    mutationFn: (body: { query: string; chatId?: string }) => {
      return request<SendChatResponse>({
        method: "POST",
        url: "/v1/query_rag",
        body,
        mediaType: "application/json",
      });
    },
  });
};
