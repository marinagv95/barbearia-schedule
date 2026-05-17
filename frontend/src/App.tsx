import { ToastContainer } from "react-toastify";

import { BarberProvider } from "./providers/barberProviders/barberProvider";

import { AppRoutes } from "./routes";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BarberProvider>
        <AppRoutes />
      </BarberProvider>

      <ToastContainer
        position="top-right"
        autoClose={3000}
      />
    </>
  );
}

export default App;