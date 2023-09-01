import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { MultiContextProvider } from "@src/context/Context.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MultiContextProvider>
      <App />
    </MultiContextProvider>
  </React.StrictMode>
);
