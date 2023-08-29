import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const AppContext = createContext();

// Create a custom hook to access the context
export const useAppContext = () => useContext(AppContext);

// Helper function to check if the device is mobile
const isMobileDevice = () => {
  return window.innerWidth <= 768; // Adjust the breakpoint as needed
};

// Create the context provider component
export function AppContextProvider({ children }) {
  // State for mobile menu open/close
  const [drawerOpen, setDrawerOpen] = useState(!isMobileDevice());

  // State for dark mode toggle
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle the mobile menu open/close
  const toggleDrawer = () => {
    setDrawerOpen((prevDrawerOpen) => !prevDrawerOpen);
  };

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevDarkMode) => !prevDarkMode);
  };

  // Add an event listener to update the drawerOpen state when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setDrawerOpen(!isMobileDevice());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Create a context value with state and functions
  const contextValue = {
    drawerOpen,
    isDarkMode,
    toggleDrawer,
    toggleDarkMode,
  };

  // Provide the context value to the nested components
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
