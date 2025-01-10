export interface ChatMessageQuestion {
  id: string;
  type: "question";
  question: string;
}

export interface ChatMessageAnswerItem {
  pdfLink: string;
  pdfName: string;
  pageNumber: number;
  responseReference: string;
  llmResponse: string;
  additionalInfo: string;
}
export interface ChatMessageAnswer {
  type: "answer";
  items: ChatMessageAnswerItem[];
}

export type ChatMessage = ChatMessageQuestion | ChatMessageAnswer;

export type GetChatResponse = {
  status: "success";
  chatId: string;
  response: ChatMessage[];
};

export type SendChatResponse = {
  status: "success";
  chatId: string;
  response: ChatMessageAnswer[];
};
