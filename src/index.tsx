/** CUSTOM COMPONENTS */
import App from "./App";

/** LIBRARIES */
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

/** OTHER */
import reportWebVitals from "./reportWebVitals";
import store from "./store";

/** STYLES */
import "./index.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#74512d",
      light: "#8f7357",
      dark: "#51381f",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f8f4e1",
      light: "#f9f6e7",
      dark: "#adaa9d",
      contrastText: "#000",
    },
  },
  typography: {
    fontFamily: ["Parisienne", "serif"].join(","),
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
