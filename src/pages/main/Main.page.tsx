import { Container, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

import { useSendChatMessage } from "@src/api/chat/chat.mutation";
import { InputFrom } from "@src/components/inputForm/InputForm";
import { HEADER_HEIGHT } from "@src/constants/layout.constants";

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
