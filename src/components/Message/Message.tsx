import { BoxProps } from "@mui/material";

import { ChatMessage } from "@src/api/chat/chat.types";
import { MessageBubble } from "./MessageBubble";
import { PdfSelector } from "../pdfSelector/PdfSelector";

interface MessageProps extends BoxProps<"div"> {
  message: ChatMessage;
  isPending?: boolean;
}

export const Message = ({ message, isPending, sx, ...props }: MessageProps) => {
  if (message.type === "question") {
    return (
      <MessageBubble
        type={message.type}
        message={message.question}
        sx={{
          "@keyframes pulse": {
            "0%": {
              opacity: 0.3,
            },
            "50%": {
              opacity: 0.7,
            },
            "100%": {
              opacity: 0.3,
            },
          },
          animation: isPending ? "pulse 0.6s infinite" : "none",
          ...sx,
        }}
        {...props}
      />
    );
  }

  return <PdfSelector items={message.items} />;
};
