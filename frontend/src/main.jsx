import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { RestaurantProvider } from "./Contexts";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RestaurantProvider>
        <App />
      </RestaurantProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
