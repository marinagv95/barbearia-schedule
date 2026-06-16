import { useContext } from "react";
import type { CSSProperties } from "react";

import { AppointmentContext } from "../../providers/appointmentProvider/appointmentContext";
import type { IAppointment } from "../../providers/appointmentProvider/@types";

interface AppointmentModalProps {
  appointment: IAppointment;
  onClose: () => void;
}

export function AppointmentModal({
  appointment,
  onClose,
}: AppointmentModalProps) {
  const { updateStatus, deleteAppointment } =
    useContext(AppointmentContext);

  async function handleStatus(
    status: "confirmed" | "done" | "canceled"
  ) {
    await updateStatus(appointment._id, status);
    onClose();
  }

  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Deseja realmente excluir este agendamento?"
    );

    if (!confirmDelete) return;

    await deleteAppointment(appointment._id);
    onClose();
  }

  const statusColor: Record<string, string> = {
    pending: "#f4b942",
    confirmed: "#4caf50",
    done: "#2196f3",
    canceled: "#ff4d4d",
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        {/* HEADER */}
        <div style={headerStyle}>
          <h2 style={{ margin: 0, color: "#fff" }}>
            Agendamento
          </h2>

          <span
            style={{
              ...statusBadge,
              background: `${statusColor[appointment.status]}20`,
              border: `1px solid ${statusColor[appointment.status]}40`,
              color: statusColor[appointment.status],
            }}
          >
            {appointment.status}
          </span>
        </div>

        {/* INFO GRID */}
        <div style={grid}>
          <Info label="Cliente" value={appointment.customerId?.name || "-"} />
          <Info label="Telefone" value={appointment.customerId?.phone || "-"} />
          <Info label="Barbeiro" value={appointment.barberId?.name || "-"} />
          <Info label="Serviço" value={appointment.service || "-"} />
          <Info label="Data" value={appointment.scheduledAtFormatted || "-"} />
        </div>

        {/* ACTIONS */}
        <div style={actions}>
          {appointment.status === "pending" && (
            <>
              <button
                style={btnConfirm}
                onClick={() => handleStatus("confirmed")}
              >
                Confirmar
              </button>

              <button
                style={btnCancel}
                onClick={() => handleStatus("canceled")}
              >
                Cancelar
              </button>
            </>
          )}

          {appointment.status === "confirmed" && (
            <>
              <button
                style={btnDone}
                onClick={() => handleStatus("done")}
              >
                Concluir
              </button>

              <button
                style={btnCancel}
                onClick={() => handleStatus("canceled")}
              >
                Cancelar
              </button>
            </>
          )}

          <button style={btnDelete} onClick={handleDelete}>
            Excluir
          </button>

          <button style={btnClose} onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= INFO ================= */

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div style={infoBox}>
      <span style={labelStyle}>{label}</span>
      <span style={valueStyle}>{value}</span>
    </div>
  );
}

/* ================= STYLES ================= */

const overlayStyle: CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.75)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};

const modalStyle: CSSProperties = {
  background: "linear-gradient(180deg, #141414, #0d0d0d)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 20,
  padding: 24,
  width: "100%",
  maxWidth: 520,
  boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
};

const headerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 20,
};

const statusBadge: CSSProperties = {
  padding: "6px 12px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 600,
};

const grid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
};

const infoBox: CSSProperties = {
  background: "#0f0f0f",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 12,
  padding: 12,
};

const labelStyle: CSSProperties = {
  display: "block",
  fontSize: 12,
  color: "#c8a24a",
  marginBottom: 4,
};

const valueStyle: CSSProperties = {
  color: "#fff",
  fontSize: 14,
};

const actions: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
  marginTop: 20,
};

const baseBtn: CSSProperties = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "none",
  cursor: "pointer",
  fontWeight: 600,
};

const btnConfirm: CSSProperties = {
  ...baseBtn,
  background: "#4caf50",
  color: "#fff",
};

const btnDone: CSSProperties = {
  ...baseBtn,
  background: "#2196f3",
  color: "#fff",
};

const btnCancel: CSSProperties = {
  ...baseBtn,
  background: "#ff4d4d",
  color: "#fff",
};

const btnDelete: CSSProperties = {
  ...baseBtn,
  background: "#7a1f1f",
  color: "#fff",
};

const btnClose: CSSProperties = {
  ...baseBtn,
  background: "#c8a24a",
  color: "#000",
};