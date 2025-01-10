import { Container, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

import { useSendChatMessage } from "@src/api/chat/chat.mutation";
import { InputFrom } from "@src/components/inputForm/InputForm";
import { HEADER_HEIGHT } from "@src/constants/layout.constants";
import {
  getLocalStorageValue,
  setLocalStorageValue,
} from "@src/utils/useSaveLocalStorage";
import { GetChatsResponse } from "@src/api/chats/chats.types";
import { GetChatResponse } from "@src/api/chat/chat.types";

export function MainPage() {
  const navigate = useNavigate({ from: "/" });
  const { mutate: sendChatMessage, isPending } = useSendChatMessage();

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: `calc(100vh - ${HEADER_HEIGHT + 128}px)`,
      }}
    >
      <Typography variant="h5" textAlign="center" mb={2}>
        What can I help you with?
      </Typography>
      <InputFrom
        isLoading={isPending}
        placeholder="Ask me anything..."
        onSubmit={(query) => {
          sendChatMessage(
            { query },
            {
              onSuccess(data) {
                const oldChats = getLocalStorageValue<GetChatsResponse>(
                  "/v1/chats"
                ) || {
                  status: "success",
                  response: [],
                };
                setLocalStorageValue("/v1/chats", {
                  ...oldChats,
                  response: [
                    ...oldChats.response,
                    { chatId: data.chatId, title: query },
                  ],
                });

                const oldChat = getLocalStorageValue<GetChatResponse>(
                  `/v1/chats/${data.chatId}`
                ) || {
                  status: "success",
                  chatId: data.chatId,
                  response: [],
                };

                setLocalStorageValue(`/v1/chats/${data.chatId}`, {
                  ...oldChat,
                  response: [
                    ...oldChat.response,
                    {
                      id: `${Date.now()}-q`,
                      type: "question",
                      question: query,
                    },
                    {
                      id: `${Date.now()}-a`,
                      type: "answer",
                      items: data.response,
                    },
                  ],
                });

                navigate({
                  to: `/chat/${data.chatId}`,
                });
              },
            }
          );
        }}
        sx={{
          marginX: 10,
        }}
      />
    </Container>
  );
}
