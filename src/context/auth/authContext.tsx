import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";

interface AuthContextProps {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = Cookies.get("token") || null;
    if (savedToken) setToken(savedToken);
  }, []);

  const login = useCallback((newToken: string) => {
    setToken(newToken);
    Cookies.set("token", newToken, { expires: 7 });
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    Cookies.remove("token");
  }, []);

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};
