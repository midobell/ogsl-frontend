import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { Menu, LogOut } from "lucide-react";
import { Button } from "../../components/ui/button";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="bg-white border-b flex items-center justify-between px-6 py-3">

      <div className="flex items-center gap-3">
        <Menu size={22} className="text-muted-foreground" />
        <h1 className="text-lg font-semibold">
          Interface Client OGSL
        </h1>
      </div>

      <Button
        variant="destructive"
        onClick={handleLogout}
        className="flex items-center gap-2"
        aria-label="Se déconnecter"
      >
        <LogOut size={16} />
        Déconnexion
      </Button>

    </header>
  );
}
