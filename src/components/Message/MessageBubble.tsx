import { Box, BoxProps, Typography } from "@mui/material";

import { ChatMessage } from "@src/api/chat/chat.types";

interface MessageBubbleProps extends BoxProps<"div"> {
  message: string;
  type: ChatMessage["type"];
}

export const MessageBubble = ({
  message,
  type,
  ...props
}: MessageBubbleProps) => {
  return (
    <Box
      {...props}
      sx={{
        paddingX: 3,
        paddingY: 2,
        borderRadius: 8,
        backgroundColor:
          type === "question" ? "background.paper" : "background.sidebar",
        alignSelf: type === "question" ? "flex-end" : "flex-start",
        maxWidth: "60%",
        wordBreak: "break-word",
      }}
    >
      {message.split("\n").map((line, index) => (
        <Typography key={index} variant="body1">
          {line}
        </Typography>
      ))}
    </Box>
  );
};
