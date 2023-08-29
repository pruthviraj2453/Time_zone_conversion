import { ThemeProvider } from "@emotion/react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import "./App.css";
import { AppContextProvider, useAppContext } from "./context";
import { darkTheme, lightTheme } from "./theme";
import HomePage from "./components/HomePage";

// Container component that sets up the layout and theme based on context

function AppContainer() {
  const { isDarkMode } = useAppContext();
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Box
        sx={{
          display: "flex",
          height: "100%",
        }}
      >
        <CssBaseline />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <HomePage />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

// Main App component that wraps the AppContainer with context
function App() {
  return (
    <AppContextProvider>
      <AppContainer />
    </AppContextProvider>
  );
}

export default App;
