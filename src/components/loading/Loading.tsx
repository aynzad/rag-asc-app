import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingProps {
  message?: string;
}
export const Loading = ({ message = "Loading..." }: LoadingProps) => {
  return (
    <Box
      display="flex"
      flexDirection={"column"}
      justifyContent="center"
      alignItems="center"
      gap={2}
      margin={5}
      height="100%"
    >
      <CircularProgress />
      <Typography variant="h6">{message}</Typography>
    </Box>
  );
};
