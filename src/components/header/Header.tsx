import { IconButton, Stack, Typography, Collapse } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { toggleSidebar, useSidebarIsOpen } from "@src/store/sidebar.store";

export const HEADER_HEIGHT = 40;

export const Header = () => {
  const sidebarIsOpen = useSidebarIsOpen();

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{
        width: "100%",
        minHeight: `${HEADER_HEIGHT}px`,
      }}
    >
      <Collapse orientation="horizontal" in={!sidebarIsOpen}>
        <IconButton onClick={() => toggleSidebar()}>
          <MenuIcon />
        </IconButton>
      </Collapse>

      <Typography variant="h6" component="h1" fontWeight={900}>
        RAG ASC
      </Typography>
    </Stack>
  );
};
