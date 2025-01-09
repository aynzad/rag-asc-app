import {
  createTheme,
  PaletteOptions,
  ThemeOptions,
} from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeBackground {
    sidebar: string;
  }
}

const palette: PaletteOptions = {
  mode: "dark",
  primary: {
    main: "#673fc0",
  },
  secondary: {
    main: "#040615",
  },
  background: {
    default: "#151515",
    paper: "#191919",
    sidebar: "#121111",
  },
  text: {
    primary: "#b4bcd0",
  },
};

export const themeOptions: ThemeOptions = {
  palette,
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: palette.background?.paper,
          borderRadius: 8,
          border: 0,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
};

export default createTheme(themeOptions);