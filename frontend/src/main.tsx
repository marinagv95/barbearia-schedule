import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App.tsx";

import { BarberProvider } from "./providers/barberProviders/barberProvider";
import { ServiceProvider } from "./providers/serviceProviders/serviceProvider";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <BarberProvider>
        <ServiceProvider>
          <App />
        </ServiceProvider>
      </BarberProvider>
    </BrowserRouter>
  </React.StrictMode>
);