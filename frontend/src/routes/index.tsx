import { Routes, Route } from "react-router-dom";

import Home from "../pages/HomePage";
import Barbers from "../pages/Barbers";
import PageNotFound from "../pages/PageNotFound";

export function AppRoutes() {
  return (
    <Routes>
      {/* HOME */}
      <Route path="/" element={<Home />} />

      {/* BARBEIROS */}
      <Route path="/barbers" element={<Barbers />} />

      {/* 404 */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}