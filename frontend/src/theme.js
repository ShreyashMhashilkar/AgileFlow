import { createTheme } from "@mui/material";
import { createContext, useContext, useState } from "react";

const ThemeCtx = createContext();

export const ThemeModeProvider = ({ children }) => {
  const [dark, setDark] = useState(false);

  const theme = createTheme({
    palette: {
      mode: dark ? "dark" : "light",
      primary: { main: "#2563eb" },
    },
  });

  return (
    <ThemeCtx.Provider value={{ dark, setDark, theme }}>
      {children}
    </ThemeCtx.Provider>
  );
};

export const useThemeMode = () => useContext(ThemeCtx);
