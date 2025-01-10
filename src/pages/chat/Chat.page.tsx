import { Suspense } from "react";
import { Box, Container } from "@mui/material";
import { useParams } from "@tanstack/react-router";

import { InputFrom } from "@src/components/inputForm/InputForm";
import { HEADER_HEIGHT } from "@src/constants/layout.constants";
import { useSendChatMessage } from "@src/api/chat/chat.mutation";
import { ChatList } from "./components/chatList/ChatList";
import { ChatListSkeleton } from "./components/chatList/ChatList.skeleton";

export function ChatPage() {
  const { chatId } = useParams({ from: "/chat/$chatId" });
  const { mutate: sendChatMessage, isPending } = useSendChatMessage();

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
      <Box flexGrow={1} sx={{ overflowY: "auto" }}>
        <Suspense fallback={<ChatListSkeleton />}>
          <ChatList chatId={chatId} />
        </Suspense>
      </Box>

      <Box pt={2} pb={1}>
        <Container maxWidth="md">
          <InputFrom
            placeholder="Ask more questions..."
            isLoading={isPending}
            onSubmit={(query) => {
              sendChatMessage({ chatId, query });
            }}
          />
        </Container>
      </Box>
    </Box>
  );
}
