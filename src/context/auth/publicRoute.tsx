import React, { useEffect, useRef } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PublicRoute: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const prevPath = useRef<string>("");

  useEffect(() => {
    if (
      isAuthenticated &&
      location.pathname === "/" &&
      prevPath.current !== "/"
    ) {
      logout();
    }
    prevPath.current = location.pathname;
  }, [isAuthenticated, location.pathname, logout]);

  return !isAuthenticated ? <Outlet /> : <Navigate to="/home" replace />;
};

export default PublicRoute;
