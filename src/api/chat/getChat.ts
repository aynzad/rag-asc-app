import { apiCall } from "@src/api/api";
import { GetChatResponse } from "./chat.types";

export const getChat = (chatId: string): Promise<GetChatResponse> => {
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
        pdfLink:
          "https://www.msc.org/docs/default-source/default-document-library/for-business/program-documents/fisheries-program-documents/msc-fisheries-standard-v3-0.pdf?sfvrsn=53623a3_31",
        pdfName: "MSC Fisheries Standard v3.0",
        pageNumber: 139,
        responseReference:
          "The MSC defines the default precautionary reference points for management of key LTL species\nas:\n\u2022 A biomass that is 75% of the unexploited level in the system, or\n\u2022 A target exploitation rate of 0.5FMSY or 0.5M, the natural mortality of the species. \n",
        llmResponse: "If biomass is low then you are exploitin the system",
        additionalInfo: "Someother things to visualise",
      },
      {
        id: "3",
        type: "question",
        question: "Add more info please",
      },
      {
        id: "4",
        type: "answer",
        pdfLink:
          "https://www.msc.org/docs/default-source/default-document-library/for-business/program-documents/general-certification-requirements/msc-general-certification-requirements-2.6.pdf?sfvrsn=f40951f6_56",
        pdfName: "MSC General Certification Requirements",
        pageNumber: 30,
        responseReference:
          "s MSC\ncertified.\nd. Fish caught prior to the date of withdrawal may continue to be sold",
        llmResponse: "No clue what this means",
        additionalInfo: "Probability of correct answer is 43%",
      },
    ],
  });
};
