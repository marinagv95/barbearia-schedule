import { ToastContainer } from "react-toastify";
import { AppRoutes } from "./routes";

import { LoginModal } from "./components/LoginComponents/LoginModal";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      {/* 🔐 MODAL GLOBAL */}
      <LoginModal />

      {/* ROTAS */}
      <AppRoutes />

      {/* TOASTS */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;