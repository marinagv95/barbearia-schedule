import { useContext, useState } from "react";

import type { CSSProperties } from "react";

import { BarberContext } from "../../providers/barberProviders/barberContext";
import { ServiceContext } from "../../providers/serviceProviders/serviceContext";

import type { IBarber } from "../../providers/barberProviders/@types";
import type { IService } from "../../providers/serviceProviders/@types";

import { BarberCard } from "../../components/BarberCard";
import { BarberModal } from "../../components/BarberModal";
import { CreateBarberModal } from "../../components/CreateBarberModal";

import { ServiceCard } from "../../components/ServiceCard";
import { ServiceModal } from "../../components/ServiceModal";
import { CreateServiceModal } from "../../components/CreateServiceModal";

export default function AdminPanel() {
  const { barbers, loading: loadingBarbers } = useContext(BarberContext);
  const { services, loading: loadingServices } = useContext(ServiceContext);

  const [search, setSearch] = useState("");

  const [selectedBarber, setSelectedBarber] = useState<IBarber | null>(null);
  const [selectedService, setSelectedService] = useState<IService | null>(null);

  const [createBarber, setCreateBarber] = useState(false);
  const [createService, setCreateService] = useState(false);

  const containerStyle: CSSProperties = {
    background: "#0f0f0f",
    minHeight: "100vh",
    padding: "24px",
    color: "#f5f5f5",
  };

  const wrapStyle: CSSProperties = {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  };

  const filteredBarbers = barbers.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredServices = services.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: "16px" }}>Dashboard</h1>

      {/* SEARCH + ACTIONS */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pesquisar barbeiro ou serviço"
          style={{
            flex: 1,
            minWidth: "220px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #222",
            background: "#111",
            color: "#fff",
            outline: "none",
          }}
        />

        <button
          onClick={() => setCreateBarber(true)}
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            background: "#c8a24a",
            color: "#000",
            fontWeight: "bold",
          }}
        >
          + Barbeiro
        </button>

        <button
          onClick={() => setCreateService(true)}
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            background: "#c8a24a",
            color: "#000",
            fontWeight: "bold",
          }}
        >
          + Serviço
        </button>
      </div>

      {/* BARBERS */}
      <h2 style={{ marginBottom: "10px" }}>Barbeiros</h2>

      {loadingBarbers ? (
        <p style={{ opacity: 0.6 }}>Carregando...</p>
      ) : (
        <div style={wrapStyle}>
          {filteredBarbers.map((barber) => (
            <BarberCard
              key={barber._id}
              barber={barber}
              onClick={() => setSelectedBarber(barber)}
            />
          ))}
        </div>
      )}

      {/* SERVICES */}
      <h2 style={{ margin: "20px 0 10px" }}>Serviços</h2>

      {loadingServices ? (
        <p style={{ opacity: 0.6 }}>Carregando...</p>
      ) : (
        <div style={wrapStyle}>
          {filteredServices.map((service) => (
            <ServiceCard
              key={service._id}
              service={service}
              onSelect={() => setSelectedService(service)}
            />
          ))}
        </div>
      )}

      {/* MODALS */}
      {selectedBarber && (
        <BarberModal
          barber={selectedBarber}
          onClose={() => setSelectedBarber(null)}
        />
      )}

      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}

      {createBarber && (
        <CreateBarberModal onClose={() => setCreateBarber(false)} />
      )}

      {createService && (
        <CreateServiceModal onClose={() => setCreateService(false)} />
      )}
    </div>
  );
}