// src/components/layout/Sidebar.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Database, FileText, BarChart2, User } from "lucide-react";
import { Button } from "../ui/button";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "Jeux", icon: Database, href: "/jeux" },
    { label: "Sources", icon: FileText, href: "/sources" },
    { label: "Fichiers", icon: FileText, href: "/fichiers" },
    { label: "Statistiques", icon: BarChart2, href: "/stats" },
    { label: "Profil", icon: User, href: "/profil" },
  ];

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4 flex flex-col">
      <div className="mb-6 px-2">
        <h2 className="text-xl font-bold">OGSL</h2>
        <p className="text-xs text-muted-foreground">
          Open Government Science Lab
        </p>
      </div>

      <nav className="space-y-1 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.href);

          return (
            <Button
              key={item.href}
              asChild
              variant={isActive ? "secondary" : "ghost"}
              className={`w-full justify-start gap-3 ${
                isActive ? "font-semibold" : ""
              }`}
            >
              <Link to={item.href}>
                <Icon size={18} />
                {item.label}
              </Link>
            </Button>
          );
        })}
      </nav>

      <div className="pt-4 text-xs text-muted-foreground px-2">
        © OGSL
      </div>
    </aside>
  );
}
