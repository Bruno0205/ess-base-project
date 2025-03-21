// src/App.tsx ou src/routes.tsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./app/home/pages/HomePage"; // Tela inicial
import Login from "./app/home/pages/Login"; // Página de login
import Register from "./app/home/pages/Cadastro"; // Página de cadastro
import RegisterReservation from "./app/home/pages/CadastroReserva"; // Página de cadastro de reserva
import UserPage from "./app/home/pages/[username]"; // Página do usuário
import MinhasReservas from "./app/home/pages/[username]/reservas"; // Página de reservas
import MinhasLocacoes from "./app/home/pages/[username]/locacoes"; // Página de locações

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/register-reservation",
    element: <RegisterReservation />,
  },
  {
    path: "/usuario/:username", // Rota dinâmica para a página do usuário
    element: <UserPage />,
  },
  {
    path: "/usuario/:username/reservas", // Subrota para minhas reservas
    element: <MinhasReservas />,
  },
  {
    path: "/usuario/:username/locacoes", // Subrota para minhas locações
    element: <MinhasLocacoes />,
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

/*/src/App.tsx ou src/routes.tsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./app/home/pages/HomePage"; //Tela inicial
import CreateTest from "./app/home/pages/CreateTest";
import ListTests from "./app/home/pages/ListTests";
import Login from "./app/home/pages/Login"; //Nova página de login
import Register from "./app/home/pages/Cadastro"; //Nova página de cadastro
import RegisterReservation from "./app/home/pages/CadastroReserva";
import UserPage from "./app/home/pages/UserPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },*/
  /*{
    path: "/create-test",
    element: <CreateTest />,
  },
  {
    path: "/tests",
    element: <ListTests />,
  },*/
  /*{
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/register-reservation",
    element: <RegisterReservation />,
  },
  {
    path: "/userpage",
    element: <UserPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}*/