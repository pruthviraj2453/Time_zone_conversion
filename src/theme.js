import { createTheme } from "@mui/material/styles";

// Define your light theme using MUI's `createTheme` function
export const lightTheme = createTheme({
  palette: {
    mode: "light", // Set the color mode to light
    appbar: "#0c6470", // Color for the app bar
    sidebar: "#4a4a4a", // Color for the sidebar
    dahboardCard: "#ffffff", // Color for dashboard cards
    chartTextColor: "#000000", // Color for chart text
    background: {
      default: "#f2f2f2", // Default background color
    },
  },
});

// Define your dark theme using MUI's `createTheme` function
export const darkTheme = createTheme({
  palette: {
    mode: "dark", // Set the color mode to dark
    sidebar: "#161a33", // Color for the sidebar
    appbar: "#161a33", // Color for the app bar
    dahboardCard: "#19d228", // Color for dashboard cards
    chartTextColor: "#ffffff", // Color for chart text
    background: {
      default: "#161a33", // Default background color
    },
  },
});

