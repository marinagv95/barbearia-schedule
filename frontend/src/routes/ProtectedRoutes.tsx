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
        }}
      >
        Carregando...
      </div>
    );
  }

  // 👇 só decide depois que carregou de verdade
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}