//src/App.tsx ou src/routes.tsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./app/home/pages/HomePage"; //Tela inicial
import CreateTest from "./app/home/pages/CreateTest";
import ListTests from "./app/home/pages/ListTests";
import Login from "./app/home/pages/Login"; //Nova página de login
import Register from "./app/home/pages/Cadastro"; //Nova página de login

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  /*{
    path: "/create-test",
    element: <CreateTest />,
  },
  {
    path: "/tests",
    element: <ListTests />,
  },*/
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}