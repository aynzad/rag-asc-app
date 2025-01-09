import { useRef, FormEvent, KeyboardEvent } from "react";
import {
  Box,
  BoxProps,
  CircularProgress,
  IconButton,
  TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface InputFormProps extends Omit<BoxProps<"form">, "onSubmit"> {
  placeholder?: string;
  onSubmit: (value: string) => void;
  isLoading?: boolean;
}

export const InputFrom = ({
  onSubmit,
  sx,
  placeholder = "Ask me anything...",
  isLoading,
  ...props
}: InputFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const value = formData.get("query") as string;
    onSubmit(value);
    event.currentTarget.reset();
    inputRef.current?.blur();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!formRef.current) return;

    if (e.key === "Enter" && e.shiftKey == true) {
      e.preventDefault();
      const formData = new FormData(formRef.current);
      const value = formData.get("query") as string;
      onSubmit(value);
      formRef.current.reset();
      inputRef.current?.blur();
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        position: "relative",
        ...sx,
      }}
      ref={formRef}
      {...props}
    >
      <TextField
        inputRef={inputRef}
        placeholder={placeholder}
        multiline
        maxRows={4}
        name="query"
        onKeyDown={onKeyDown}
        sx={{
          width: "100%",
        }}
        disabled={isLoading}
      />

      <Box sx={{ position: "absolute", bottom: 8, right: 8 }}>
        {isLoading ? (
          <CircularProgress
            size={28}
            sx={{
              mr: 1,
            }}
          />
        ) : (
          <IconButton type="submit">
            <SendIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};
