import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import MainContainer from "./Components/MainContainer/MainContainer";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { NavBar } from "./Components/NavBar/NavBar";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainContainer />,
  },
  {
    path: "/leaderboard",
    element: <h1>Leaderboard</h1>,
  },
]);

root.render(
  <React.StrictMode>
    <>
      <NavBar />
      <RouterProvider router={router} />
    </>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
