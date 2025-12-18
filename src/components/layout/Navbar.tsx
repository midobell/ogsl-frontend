// src/components/layout/Navbar.tsx
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="bg-white border-b px-6 py-3 flex items-center justify-between">
      <h1 className="text-lg font-semibold">
        Interface Client OGSL
      </h1>

      <Button
        variant="destructive"
        size="sm"
        onClick={handleLogout}
        className="flex items-center gap-2"
      >
        <LogOut size={16} />
        Déconnexion
      </Button>
    </header>
  );
}
