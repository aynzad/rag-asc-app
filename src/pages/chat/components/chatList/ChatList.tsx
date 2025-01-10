import { Container } from "@mui/material";

import { useChat } from "@src/api/chat/useChat";
import { Message } from "@src/components/Message/Message";

interface ChatListProps {
  chatId: string;
  pendingQuestion: string | null;
}

export const ChatList = ({ chatId, pendingQuestion }: ChatListProps) => {
  const { data } = useChat(chatId);

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {data.response.map((message, index) => (
        <Message key={index} message={message} />
      ))}
      {pendingQuestion && (
        <Message
          isPending
          message={{
            id: `${Date.now()}-p`,
            type: "question",
            question: pendingQuestion,
          }}
        />
      )}
    </Container>
  );
};
