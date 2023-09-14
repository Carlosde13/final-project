import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Perfil from "./components/perfil/Perfil";
import EditarPerfil from "./components/perfil/EditProfile";
import Usuarios from "./components/usuarios/page";
import Dashboard from "./components/dashboard/Dashboard";
import Personas from "./components/personas/page";
import Roles from "./components/roles/page";

function App() {
  return (
    <>
      <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/perfil/:id" element={<Perfil/>} />
          <Route path="/editarperfil/:id" element={<EditarPerfil/>} />
          <Route path="/usuarios/:id" element={<Usuarios/>} />
          <Route path="/dashboard/:id" element={<Dashboard />} />
          <Route path="/personas/:id" element={<Personas />} />
          <Route path="/roles/:id" element={<Roles />} />
        </Routes>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;
