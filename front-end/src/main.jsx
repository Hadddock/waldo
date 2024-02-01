import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Results from "./components/Results.jsx";
import Layout from "./components/Layout.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <App></App>
      </Layout>
    ),
  },
  {
    path: "/results",
    element: (
      <Layout>
        <Results playerScore="1 billion"></Results>
      </Layout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
