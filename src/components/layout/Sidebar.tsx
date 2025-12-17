import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Database, FileText, BarChart2, User } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: <Home size={18} />, href: "/dashboard" },
    { label: "Jeux", icon: <Database size={18} />, href: "/jeux" },
    { label: "Sources", icon: <FileText size={18} />, href: "/sources" },
    { label: "Fichiers", icon: <FileText size={18} />, href: "/fichiers" },
    { label: "Statistiques", icon: <BarChart2 size={18} />, href: "/stats" },
    { label: "Profil", icon: <User size={18} />, href: "/profil" },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg p-4">
      <h2 className="text-xl font-bold mb-6">OGSL</h2>

      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={`flex items-center gap-3 p-2 rounded-md transition 
                ${location.pathname === item.href 
                  ? "bg-blue-500 text-white" 
                  : "text-gray-700 hover:bg-gray-200"}`}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
