import { apiCall } from "@src/api/api";
import { GetChatsResponse } from "./chats.types";

export const getChats = (): Promise<GetChatsResponse> => {
  return apiCall("GET:api/chats", {
    status: "success",
    response: [
      {
        chatId: "1",
        title: "The MSC defines the default precautionary",
      },
      {
        chatId: "2",
        title: "I like fish...",
      },
      {
        chatId: "3",
        title: "What is the MSC?",
      },
    ],
  });
};
