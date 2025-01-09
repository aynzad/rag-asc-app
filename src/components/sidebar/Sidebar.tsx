import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Link } from "@tanstack/react-router";

import { useChats } from "@src/api/chats/useChats";
import { toggleSidebar, useSidebarIsOpen } from "@src/store/sidebar.store";

export const SIDEBAR_WIDTH = 300;

export const Sidebar = () => {
  const chats = useChats();
  const sidebarIsOpen = useSidebarIsOpen();

  return (
    <Drawer
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: SIDEBAR_WIDTH,
          backgroundColor: "background.sidebar",
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
          {chats.data.response.map((chat) => (
            <ListItem key={chat.chatId}>
              <ListItemButton component={Link} to={`/chat/${chat.chatId}`}>
                <Typography variant="inherit" noWrap>
                  {chat.title}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
