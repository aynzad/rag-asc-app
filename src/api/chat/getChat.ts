import { apiCall } from "@src/api/api";
import { GetChatResponse } from "./chat.types";
import { localStorageApiCall } from "../localStorageApi";

export const getChat = (chatId: string): Promise<GetChatResponse> => {
  return localStorageApiCall(`/v1/chats/${chatId}`, {
    chatId,
    response: [],
    status: "success",
  });
};

export const getChatOld = (chatId: string): Promise<GetChatResponse> => {
  return apiCall(`GET:api/chat/${chatId}`, {
    status: "success",
    chatId,
    response: [
      {
        id: "1",
        type: "question",
        question: "What is the MSC? \nas some more info?",
      },
      {
        id: "2",
        type: "answer",
        items: [
          {
            pdfLink: "/pdf/1.pdf",
            pdfName: "MSC Fisheries Standard v3.0",
            pageNumber: 2,
            responseReference:
              "The MSC defines the default precautionary reference points for management of key LTL species\nas:\n\u2022 A biomass that is 75% of the unexploited level in the system, or\n\u2022 A target exploitation rate of 0.5FMSY or 0.5M, the natural mortality of the species. \n",
            llmResponse: "If biomass is low then you are exploitin the system",
            additionalInfo: "Someother things to visualise",
          },
          {
            pdfLink: "/pdf/1.pdf",
            pdfName: "MSC General Certification Requirements",
            pageNumber: 12,
            responseReference:
              "s MSC\ncertified.\nd. Fish caught prior to the date of withdrawal may continue to be sold",
            llmResponse: "No clue what this means",
            additionalInfo: "Probability of correct answer is 43%",
          },
        ],
      },
      {
        id: "3",
        type: "question",
        question: "Add more info please",
      },
      {
        id: "4",
        type: "answer",
        items: [
          {
            pdfLink:
              "https://storage.googleapis.com/hasty-ml-public/asc/doc/msc-fisheries-standard-v3-0.pdf",
            pdfName: "MSC General Certification Requirements",
            pageNumber: 5,
            responseReference:
              "s MSC\ncertified.\nd. Fish caught prior to the date of withdrawal may continue to be sold",
            llmResponse: "No clue what this means",
            additionalInfo: "Probability of correct answer is 43%",
          },
        ],
      },
    ],
  });
};
