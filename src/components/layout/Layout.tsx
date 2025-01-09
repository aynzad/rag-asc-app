import { Box, useTheme } from "@mui/material";
import { Outlet, ReactNode } from "@tanstack/react-router";

import { useSidebarIsOpen } from "@src/store/sidebar.store";
import { Header } from "../header/Header";
import { SIDEBAR_WIDTH } from "../sidebar/Sidebar";

export const Layout = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();
  const sidebarIsOpen = useSidebarIsOpen();

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        borderLeft: "1px solid",
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      {children}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginLeft: `-${SIDEBAR_WIDTH}px`,
          ...(sidebarIsOpen && {
            transition: theme.transitions.create("margin", {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
          }),
          flex: 1,
          padding: 2,
          backgroundColor: "background.default",
        }}
      >
        <Header />
        <Outlet />
      </Box>
    </Box>
  );
};
