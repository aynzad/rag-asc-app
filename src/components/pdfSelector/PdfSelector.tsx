import { useMemo, useState } from "react";
import {
  Box,
  Grid2 as Grid,
  List,
  ListItemButton,
  ListItemText,
  Tooltip,
} from "@mui/material";
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
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        flexDirection: "row-reverse",
        gap: 2,
        borderRadius: 2,
        backgroundColor: "background.dark",
        padding: 2,
      }}
    >
      <Grid size={4}>
        <List>
          {items.map((item, index) => (
            <Tooltip
              title={item.responseReference}
              key={index}
              placement="left"
              arrow
            >
              <ListItemButton
                selected={index === activeAnswerIndex}
                onClick={() => setActiveAnswerIndex(index)}
              >
                <ArrowLeftIcon />
                <ListItemText
                  primary={
                    item.responseReference.length > 120
                      ? `${item.responseReference.substring(0, 120)}...`
                      : item.responseReference
                  }
                />
              </ListItemButton>
            </Tooltip>
          ))}
        </List>
      </Grid>
      <Grid size={8}>
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
      </Grid>
    </Grid>
  );
};
