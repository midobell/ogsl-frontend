import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const token = localStorage.getItem("access");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
