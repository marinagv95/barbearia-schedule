import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoutes() {
  const isAuthenticated = true;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}