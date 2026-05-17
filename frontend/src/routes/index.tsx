import { Routes, Route } from "react-router-dom";

// import Home from "../pages/Home";
// import Login from "../pages/Login";
import Barbers from "../pages/Barbers";
import PageNotFound from "../pages/PageNotFound";

import { ProtectedRoutes } from "./ProtectedRoutes";

export function AppRoutes() {
  return (
    <Routes>

      {/* públicas */}
      <Route
        path="/login"
        // element={<Login />}
      />

      {/* protegidas */}
      <Route element={<ProtectedRoutes />}>
        <Route
          path="/"
          // element={<Home />}
        />

        <Route
          path="/barbers"
          element={<Barbers />}
        />
      </Route>

      {/* 404 */}
      <Route
        path="*"
        element={<PageNotFound />}
      />

    </Routes>
  );
}