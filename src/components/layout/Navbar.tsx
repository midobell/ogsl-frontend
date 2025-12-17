import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { Menu, LogOut } from "lucide-react";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="bg-white shadow flex items-center justify-between px-6 py-3">
      <div className="flex items-center gap-3">
        <Menu size={22} className="text-gray-600" />
        <h1 className="text-lg font-semibold">Interface Client OGSL</h1>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-red-600 hover:text-red-800 transition"
      >
        <LogOut size={18} />
        Déconnexion
      </button>
    </header>
  );
}
