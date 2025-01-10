import { useMemo, useState } from "react";
import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

import { ChatMessageAnswerItem } from "@src/api/chat/chat.types";
import { MessageBubble } from "../Message/MessageBubble";
import { PdfViewer } from "./PdfViewer";

interface PdfSelectorProps {
  items: ChatMessageAnswerItem[];
}

export const PdfSelector = ({ items }: PdfSelectorProps) => {
  const [activeAnswerIndex, setActiveAnswerIndex] = useState<number>(0);

  const activeAnswer = useMemo(
    () => items[activeAnswerIndex],
    [activeAnswerIndex, items]
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row-reverse",
        gap: 2,
        borderRadius: 2,
        backgroundColor: "background.sidebar",
        padding: 2,
      }}
    >
      <List>
        {items.map((item, index) => (
          <ListItemButton
            key={index}
            selected={index === activeAnswerIndex}
            onClick={() => setActiveAnswerIndex(index)}
          >
            <ArrowLeftIcon />
            <ListItemText
              primary={
                item.llmResponse.length > 20
                  ? `${item.llmResponse.substring(0, 20)}...`
                  : item.llmResponse
              }
            />
          </ListItemButton>
        ))}
      </List>
      <Box
        sx={{
          borderRight: "1px solid",
          borderColor: "divider",
        }}
      >
        <MessageBubble
          type="answer"
          message={activeAnswer.llmResponse}
          sx={{ bgcolor: "transparent" }}
        />

        <PdfViewer
          file={activeAnswer.pdfLink}
          initialPageNumber={activeAnswer.pageNumber}
        />
      </Box>
    </Box>
  );
};
