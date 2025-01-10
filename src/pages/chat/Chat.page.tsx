import { Suspense, useEffect, useRef, useState } from "react";
import { Box, Container } from "@mui/material";
import { useParams } from "@tanstack/react-router";

import { InputFrom } from "@src/components/inputForm/InputForm";
import { HEADER_HEIGHT } from "@src/constants/layout.constants";
import { useSendChatMessage } from "@src/api/chat/chat.mutation";
import { GetChatResponse } from "@src/api/chat/chat.types";
import { queryClient } from "@src/app/App";
import {
  getLocalStorageValue,
  setLocalStorageValue,
} from "@src/utils/useSaveLocalStorage";
import { ChatListSkeleton } from "./components/chatList/ChatList.skeleton";
import { ChatList } from "./components/chatList/ChatList";

export function ChatPage() {
  const { chatId } = useParams({ from: "/chat/$chatId" });
  const { mutate: sendChatMessage, isPending } = useSendChatMessage();
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null);
  const chatListContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatListContainerRef.current) {
      const lastMessage =
        chatListContainerRef.current.children[0].children[
          chatListContainerRef.current.children[0].children.length - 1
        ];
      chatListContainerRef.current.scrollTop =
        chatListContainerRef.current.scrollHeight -
        lastMessage.clientHeight -
        70;

      console.log(lastMessage.clientHeight);
    }
  }, [pendingQuestion]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: `calc(100vh - ${HEADER_HEIGHT + 16}px)`,
        minHeight: 0,
        overflow: "hidden",
      }}
    >
      <Box ref={chatListContainerRef} flexGrow={1} sx={{ overflowY: "auto" }}>
        <Suspense fallback={<ChatListSkeleton />}>
          <ChatList chatId={chatId} pendingQuestion={pendingQuestion} />
        </Suspense>
      </Box>

      <Box pt={2} pb={1}>
        <Container maxWidth="md">
          <InputFrom
            placeholder="Ask more questions..."
            isLoading={isPending}
            onSubmit={(query) => {
              setPendingQuestion(query);
              sendChatMessage(
                { chatId, query },
                {
                  onSuccess: (data) => {
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
                    queryClient.invalidateQueries({
                      queryKey: ["chat", data.chatId],
                    });
                    setPendingQuestion(null);
                  },
                }
              );
            }}
          />
        </Container>
      </Box>
    </Box>
  );
}
