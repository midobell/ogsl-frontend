import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profil from "./pages/Profil";
import Sources from "./pages/Sources";
import Jeux from "./pages/Jeux";
import JeuDetails from "./pages/JeuDetails";
import Fichiers from "./pages/Fichiers";
import Stats from "./pages/Stats";
import CreateJeu from "./pages/CreateJeu";

import Layout from "./components/layout/Layout";
import PrivateRoute from "./components/ui/PrivateRoute";
export default function App() {
  return (
    <Routes>
      {/* Page publique */}
      <Route path="/" element={<Login />} />

      {/* Toutes les pages protégées */}
      <Route element={<PrivateRoute />}>
        {/* Layout affiché sur toutes les pages */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/sources" element={<Sources />} />
          <Route path="/jeux" element={<Jeux />} />
          <Route path="/jeux/create" element={<CreateJeu />} />
          <Route path="/jeux/:id" element={<JeuDetails />} />
          <Route path="/fichiers" element={<Fichiers />} />
          <Route path="/stats" element={<Stats />} />
        </Route>
      </Route>
    </Routes>
  );
}
