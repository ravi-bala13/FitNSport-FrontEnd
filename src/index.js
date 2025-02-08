import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./Colors.css"; // Using direct relative path

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AppContainer from "./Scripts/AppContainer";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./Providers/ToastProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <ToastProvider>
      <AppContainer>
        <App />
      </AppContainer>
    </ToastProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

// Optional performance measurement
reportWebVitals();
