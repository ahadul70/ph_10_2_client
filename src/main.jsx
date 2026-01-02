import React from "react";
import ReactDOM from "react-dom/client";
import AuthProvider from "./context/AuthContext/AuthProvider";
import "./index.css";
import { router } from "./Routes/AllRoutes";
import { RouterProvider } from "react-router";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <AuthProvider>
    <RouterProvider router={router} />,
  </AuthProvider>
);
