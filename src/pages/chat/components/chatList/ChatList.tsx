import { Container } from "@mui/material";

import { useChat } from "@src/api/chat/useChat";
import { Message } from "@src/components/Message/Message";

interface ChatListProps {
  chatId: string;
}

export const ChatList = ({ chatId }: ChatListProps) => {
  const { data } = useChat(chatId);

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {data.response.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </Container>
  );
};
