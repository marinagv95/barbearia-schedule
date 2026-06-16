import { useContext, useState } from "react";
import type { CSSProperties } from "react";

import { BarberContext } from "../../providers/barberProviders/barberContext";
import { ServiceContext } from "../../providers/serviceProviders/serviceContext";
import { AppointmentContext } from "../../providers/appointmentProvider/appointmentContext";

import type { IBarber } from "../../providers/barberProviders/@types";
import type { IService } from "../../providers/serviceProviders/@types";
import type { IAppointment } from "../../providers/appointmentProvider/@types";

import { BarberCard } from "../../components/BarberComponents/BarberCard";
import { BarberModal } from "../../components/BarberComponents/BarberModal";
import { CreateBarberModal } from "../../components/BarberComponents/CreateBarberModal";

import { ServiceCard } from "../../components/ServiceComponents/ServiceCard";
import { ServiceModal } from "../../components/ServiceComponents/ServiceModal";
import { CreateServiceModal } from "../../components/ServiceComponents/CreateServiceModal";

import { AppointmentCard } from "../../components/AppointmentComponents/AppointmentCard";
import { AppointmentModal } from "../../components/AppointmentComponents/AppointmentModal";
import { CreateAppointmentModal } from "../../components/AppointmentComponents/CreateAppointmentModal";

import { MetricsCards } from "../../components/DashboardComponents/MetricsCards/MetricsCards";
import { AppointmentCharts } from "../../components/DashboardComponents/Charts/AppointmentCharts";
import { AppointmentWeekChart } from "../../components/DashboardComponents/Charts/AppointmentWeekChart";

import { LogoutButton } from "../../components/LoginComponents/LogoutButton";

type Tab = "metrics" | "charts" | "barbers" | "services" | "appointments";

export default function AdminPanel() {
  const { barbers } = useContext(BarberContext);
  const { services } = useContext(ServiceContext);
  const { appointments, loading: loadingAppointments } =
    useContext(AppointmentContext);

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("metrics");

  const [selectedBarber, setSelectedBarber] = useState<IBarber | null>(null);
  const [selectedService, setSelectedService] = useState<IService | null>(null);
  const [selectedAppointment, setSelectedAppointment] =
    useState<IAppointment | null>(null);

  const [createBarber, setCreateBarber] = useState(false);
  const [createService, setCreateService] = useState(false);
  const [createAppointment, setCreateAppointment] = useState(false);

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

  const tabBtn: CSSProperties = {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #222",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
  };

  const tabBtnActive: CSSProperties = {
    ...tabBtn,
    background: "#c8a24a",
    color: "#000",
    fontWeight: "bold",
  };

  const filteredBarbers = barbers.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()),
  );

  const filteredServices = services.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  );

  const filteredAppointments = appointments.filter((a) => {
    const name = a.customerId?.name || a.clientName || "";
    const service = a.service || "";

    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      service.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div style={containerStyle}>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h1>Dashboard</h1>
        <LogoutButton />
      </div>

      {/* NAV */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button
          style={activeTab === "metrics" ? tabBtnActive : tabBtn}
          onClick={() => setActiveTab("metrics")}
        >
          📊 Métricas
        </button>

        <button
          style={activeTab === "charts" ? tabBtnActive : tabBtn}
          onClick={() => setActiveTab("charts")}
        >
          📈 Gráficos
        </button>

        <button
          style={activeTab === "barbers" ? tabBtnActive : tabBtn}
          onClick={() => setActiveTab("barbers")}
        >
          💈 Barbeiros
        </button>

        <button
          style={activeTab === "services" ? tabBtnActive : tabBtn}
          onClick={() => setActiveTab("services")}
        >
          ✂️ Serviços
        </button>

        <button
          style={activeTab === "appointments" ? tabBtnActive : tabBtn}
          onClick={() => setActiveTab("appointments")}
        >
          📅 Atendimentos
        </button>
      </div>

      {/* SEARCH */}
      {activeTab !== "metrics" && activeTab !== "charts" && (
        <div style={{ marginBottom: "20px" }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar..."
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #222",
              background: "#111",
              color: "#fff",
              outline: "none",
            }}
          />
        </div>
      )}

      {/* ===================== MÉTRICAS ===================== */}
      {activeTab === "metrics" && <MetricsCards />}

      {/* ===================== GRÁFICOS ===================== */}
      {activeTab === "charts" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <AppointmentCharts />
          <AppointmentWeekChart />
        </div>
      )}

      {/* ===================== BARBEIROS ===================== */}
      {activeTab === "barbers" && (
        <>
          <button 
            onClick={() => setCreateBarber(true)} 
            style={{ marginBottom: "16px", ...tabBtnActive }}
          >
            + Barbeiro
          </button>

          <div style={wrapStyle}>
            {filteredBarbers.map((barber) => (
              <BarberCard
                key={barber._id}
                barber={barber}
                onClick={() => setSelectedBarber(barber)}
              />
            ))}
          </div>
        </>
      )}

      {/* ===================== SERVIÇOS ===================== */}
      {activeTab === "services" && (
        <>
          <button 
            onClick={() => setCreateService(true)} 
            style={{ marginBottom: "16px", ...tabBtnActive }}
          >
            + Serviço
          </button>

          <div style={wrapStyle}>
            {filteredServices.map((service) => (
              <ServiceCard
                key={service._id}
                service={service}
                onSelect={() => setSelectedService(service)}
              />
            ))}
          </div>
        </>
      )}

      {/* ===================== AGENDAMENTOS ===================== */}
      {activeTab === "appointments" && (
        <>
          <button
            onClick={() => setCreateAppointment(true)}
            style={{ marginBottom: "16px", ...tabBtnActive }}
          >
            + Agendamento
          </button>

          {loadingAppointments ? (
            <p>Carregando...</p>
          ) : (
            <div style={wrapStyle}>
              {filteredAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment._id}
                  appointment={appointment}
                  onClick={() => setSelectedAppointment(appointment)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* MODAIS */}
      {selectedBarber && (
        <BarberModal
          barber={selectedBarber}
          onClose={() => setSelectedBarber(null)}
        />
      )}

      {createBarber && (
        <CreateBarberModal onClose={() => setCreateBarber(false)} />
      )}

      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}

      {createService && (
        <CreateServiceModal onClose={() => setCreateService(false)} />
      )}

      {selectedAppointment && (
        <AppointmentModal
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
        />
      )}

      {createAppointment && (
        <CreateAppointmentModal
          onClose={() => setCreateAppointment(false)}
        />
      )}
    </div>
  );
}