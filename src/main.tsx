import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";
import Routes from "./routes";
import { Toaster } from "@/components/ui/toaster";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Routes />
    <Toaster />
  </React.StrictMode>
);
