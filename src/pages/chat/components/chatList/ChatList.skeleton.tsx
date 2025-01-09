import { Container, Skeleton } from "@mui/material";

const messages = [
  {
    id: "1",
    type: "question",
    rows: 2,
    width: "25%",
  },
  {
    id: "2",
    type: "answer",
    rows: 3,
    width: "50%",
  },
  {
    id: "3",
    type: "question",
    rows: 1,
    width: "42%",
  },
  {
    id: "4",
    type: "answer",
    rows: 10,
    width: "50%",
  },
  {
    id: "5",
    type: "question",
    rows: 1,
    width: "24%",
  },
  {
    id: "6",
    type: "answer",
    rows: 1,
    width: "45%",
  },
];

export const ChatListSkeleton = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {messages.map((message) => (
        <Skeleton
          key={message.id}
          variant="rectangular"
          height={24 * message.rows}
          sx={{
            paddingX: 3,
            paddingY: 2,
            borderRadius: 8,
            backgroundColor:
              message.type === "question"
                ? "background.paper"
                : "background.sidebar",
            alignSelf: message.type === "question" ? "flex-end" : "flex-start",
            width: message.width,
            maxWidth: "60%",
          }}
        />
      ))}
    </Container>
  );
};
