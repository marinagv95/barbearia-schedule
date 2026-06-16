import { useContext, useState } from "react";
import type { CSSProperties } from "react";

import { AppointmentContext } from "../../providers/appointmentProvider/appointmentContext";

import type { IAppointment } from "../../providers/appointmentProvider/@types";

import { AppointmentCard } from "../../components/AppointmentComponents/AppointmentCard";
import { AppointmentModal } from "../../components/AppointmentComponents/AppointmentModal";
import { CreateAppointmentModal } from "../../components/AppointmentComponents/CreateAppointmentModal";

export default function Appointments() {
  const { appointments, loading } = useContext(AppointmentContext);

  const [selectedAppointment, setSelectedAppointment] =
    useState<IAppointment | null>(null);

  const [createOpen, setCreateOpen] = useState(false);

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

  return (
    <div style={containerStyle}>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h1>Agendamentos</h1>

        <button
          style={actionBtn}
          onClick={() => setCreateOpen(true)}
        >
          + Agendamento
        </button>
      </div>

      {/* LISTAGEM */}
      {loading ? (
        <p style={{ opacity: 0.6 }}>
          Carregando...
        </p>
      ) : (
        <div style={wrapStyle}>
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment._id}
              appointment={appointment}
              onClick={() =>
                setSelectedAppointment(appointment)
              }
            />
          ))}
        </div>
      )}

      {/* MODAL DETALHE */}
      {selectedAppointment && (
        <AppointmentModal
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
        />
      )}

      {/* MODAL CRIAR */}
      {createOpen && (
        <CreateAppointmentModal
          onClose={() => setCreateOpen(false)}
        />
      )}
    </div>
  );
}

const actionBtn: CSSProperties = {
  padding: "10px 14px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  background: "#c8a24a",
  color: "#000",
  fontWeight: "bold",
};