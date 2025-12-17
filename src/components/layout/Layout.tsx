import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-background">

      {/* Sidebar */}
      <Sidebar />

      {/* Zone principale */}
      <div className="flex flex-col flex-1">

        {/* Navbar */}
        <Navbar />

        {/* Contenu */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
