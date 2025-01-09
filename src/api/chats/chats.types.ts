export interface ChatListItem {
  chatId: string;
  title: string;
}

export type GetChatsResponse = {
  status: "success";
  response: ChatListItem[];
};
