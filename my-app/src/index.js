import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const MuiTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#282828",
      light: "#686868",
    },
    secondary: {
      main: "#686868",
    },
    background: {
      default: "#ece8d1",
    },
    text: {
      secondary: "#686868",
      primary: "#282828",
    },
  },
  typography: {
    fontFamily: "Oswald",
    h1: {
      fontSize: 90,
      fontWeight: 500,
    },
    h2: {
      fontSize: 45,
      fontWeight: 400,
    },
    h3: {
      fontSize: 23,
      fontWeight: 300,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={MuiTheme}>
  <App />
  </ThemeProvider>
);
