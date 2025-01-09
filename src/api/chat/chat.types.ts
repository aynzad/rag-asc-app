export interface ChatMessageQuestion {
  id: string;
  type: "question";
  question: string;
}

export interface ChatMessageAnswer {
  id: string;
  type: "answer";
  pdfLink: string;
  pdfName: string;
  pageNumber: number;
  responseReference: string;
  llmResponse: string;
  additionalInfo: string;
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
