import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  Skeleton,
  Stack,
} from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Link } from "@tanstack/react-router";

import { toggleSidebar, useSidebarIsOpen } from "@src/store/sidebar.store";

export const SIDEBAR_WIDTH = 300;

const chats = [1, 2, 3, 4];

export const SidebarSkeleton = () => {
  const sidebarIsOpen = useSidebarIsOpen();

  return (
    <Drawer
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        backgroundColor: "background.sidebar",
        "& .MuiDrawer-paper": {
          width: SIDEBAR_WIDTH,
        },
      }}
      variant="persistent"
      anchor="left"
      open={sidebarIsOpen}
    >
      <Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          padding={2}
        >
          <IconButton onClick={() => toggleSidebar()}>
            <MenuOpenIcon />
          </IconButton>

          <IconButton component={Link} to="/">
            <AddCommentIcon />
          </IconButton>
        </Stack>

        <List>
          {chats.map((chat) => (
            <ListItem key={chat}>
              <Skeleton variant="text" width="100%" />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
