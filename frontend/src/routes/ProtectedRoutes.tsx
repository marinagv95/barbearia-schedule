import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../providers/auth/AuthContext";

export function ProtectedRoutes() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f0f0f",
          color: "#fff",
          fontSize: "14px",
          opacity: 0.8,
        }}
      >
        Carregando...
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/" />;
}