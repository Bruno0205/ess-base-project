// src/App.tsx ou src/routes.tsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./app/home/pages/HomePage"; // Tela inicial
import Login from "./app/home/pages/Login"; // Página de login
import Register from "./app/home/pages/Cadastro"; // Página de cadastro
import UserPage from "./app/home/pages/[username]"; // Página do usuário
import MinhasReservas from "./app/home/pages/[username]/reservas"; // Página de reservas
import MinhasLocacoes from "./app/home/pages/[username]/locacoes"; // Página de locações
import MudarSenha from "./app/home/pages/mudarSenha"; // Página de locações
import ResetarSenha from "./app/home/pages/resetarSenha"; // Página de locações
import SearchResults from "./app/home/pages/SearchResults"; //Nova página de resultados de busca
import UserAccountVerification from "./app/home/pages/[username]/liberarConta"; //Nova página de resultados de busca
import AddReserva from "./app/home/pages/[username]/CadastroReserva"; //Nova página de resultados de busca

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
    path: "/search",
    element: <SearchResults />,
  },
  {
    path: "/usuario/:username", 
    element: <UserPage />,
  },
  {
    path: "/usuario/:username/reservas", 
    element: <MinhasReservas />,
  },
  {
    path: "/usuario/:username/locacoes",
    element: <MinhasLocacoes />,
  },
  {
    path: "/mudar-senha",
    element: <MudarSenha />,
  },
  {
    path: "/resetar-senha",
    element: <ResetarSenha />,
  },
  {
    path: "/usuario/:username/liberarConta",
    element: <UserAccountVerification />,
  },
  {
    path: "/usuario/:username/reservas/addReserva",
    element: <AddReserva />,
  }
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
