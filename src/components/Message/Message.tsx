import { BoxProps } from "@mui/material";

import { ChatMessage } from "@src/api/chat/chat.types";
import { MessageBubble } from "./MessageBubble";

interface MessageProps extends BoxProps<"div"> {
  message: ChatMessage;
}

export const Message = ({ message, ...props }: MessageProps) => {
  if (message.type === "question") {
    return (
      <MessageBubble
        type={message.type}
        message={message.question}
        {...props}
      />
    );
  }

  return (
    <MessageBubble
      type={message.type}
      message={message.llmResponse}
      {...props}
    />
  );

  // TODO handle pdf here
};
