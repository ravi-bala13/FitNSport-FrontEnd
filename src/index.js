import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./Colors.css"; // Using direct relative path

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AppContainer from "./Scripts/AppContainer";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <AppContainer>
      <App />
    </AppContainer>
  </BrowserRouter>
  // </React.StrictMode>
);

// Optional performance measurement
reportWebVitals();
