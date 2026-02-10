import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@mui/material";
import { useThemeMode, ThemeModeProvider } from "./theme";
import { AuthProvider } from "./auth/AuthContext";
import { DemoProvider } from "./demoStore";
function Root() {
  const { theme } = useThemeMode();

  return (
    <ThemeProvider theme={theme}>
       <DemoProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
      </DemoProvider>
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeModeProvider>
    <Root />
  </ThemeModeProvider>
);
