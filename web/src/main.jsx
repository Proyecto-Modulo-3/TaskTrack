import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./contexts/auth.context.jsx";
import { ReloadContextProvider } from "./contexts/reload.context.jsx";
import { TaskContextProvider } from "./contexts/tasks.context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ReloadContextProvider>
          <TaskContextProvider>
          <App />
          </TaskContextProvider>
        </ReloadContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
