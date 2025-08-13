import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authContext";

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
