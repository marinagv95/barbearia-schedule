import { Routes, Route } from "react-router-dom";

import Home from "../pages/HomePage";
import Barbers from "../pages/Barbers";
import Appointments from "../pages/Appointments";
import PageNotFound from "../pages/PageNotFound";

import { ProtectedRoutes } from "./ProtectedRoutes";

export function AppRoutes() {
  return (
    <Routes>
      {/* HOME (pública) */}
      <Route path="/" element={<Home />} />

      {/* ROTAS PROTEGIDAS */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/barbers" element={<Barbers />} />

        <Route
          path="/appointments"
          element={<Appointments />}
        />
      </Route>

      {/* 404 */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}