import { CalendarDays } from "lucide-react";

import type { IAppointment } from "../../providers/appointmentProvider/@types";

interface AppointmentCardProps {
  appointment: IAppointment;
  onClick: () => void;
}

export function AppointmentCard({
  appointment,
  onClick,
}: AppointmentCardProps) {
  const statusColor = {
    pending: "#f4b942",
    confirmed: "#4caf50",
    done: "#4caf50",
    canceled: "#ff4d4d",
  };

  const statusLabel = {
    pending: "Pendente",
    confirmed: "Confirmado",
    done: "Finalizado",
    canceled: "Cancelado",
  };

  return (
    <div
      onClick={onClick}
      style={{
        background:
          "linear-gradient(145deg, #141414 0%, #0b0b0b 100%)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "22px",
        padding: "24px",
        width: "100%",
        maxWidth: "320px",
        minHeight: "280px",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.25s ease",
        boxShadow:
          "0 12px 30px rgba(0,0,0,0.35)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-6px)";
        e.currentTarget.style.borderColor =
          "rgba(200,162,74,0.4)";
        e.currentTarget.style.boxShadow =
          "0 18px 40px rgba(0,0,0,0.45)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0)";
        e.currentTarget.style.borderColor =
          "rgba(255,255,255,0.06)";
        e.currentTarget.style.boxShadow =
          "0 12px 30px rgba(0,0,0,0.35)";
      }}
    >
      {/* GOLD LINE */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "4px",
          background:
            "linear-gradient(90deg, #c8a24a, #8b6b24)",
        }}
      />

      {/* ICON */}
      <div
        style={{
          width: "90px",
          height: "90px",
          borderRadius: "24px",
          background:
            "linear-gradient(135deg, rgba(200,162,74,0.18), rgba(200,162,74,0.04))",
          border:
            "1px solid rgba(200,162,74,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <CalendarDays
          size={38}
          color="#c8a24a"
        />
      </div>

      {/* SERVIÇO */}
      <h3
        style={{
          color: "#fff",
          fontSize: "22px",
          fontWeight: 700,
          marginBottom: "12px",
        }}
      >
        {appointment.service}
      </h3>

      {/* CLIENTE */}
      {/* 💡 ALTERAÇÃO: Se não houver customerId populado, exibe o clientName salvo na raiz do agendamento */}
      <p
        style={{
          color: "#bbb",
          marginBottom: "6px",
        }}
      >
        👤 {appointment.customerId?.name || appointment.clientName || "Cliente oculto"}
      </p>

      {/* BARBEIRO */}
      <p
        style={{
          color: "#bbb",
          marginBottom: "6px",
        }}
      >
        💈 {appointment.barberId?.name || "Não selecionado"}
      </p>

      {/* DATA */}
      <p
        style={{
          color: "#fff",
          marginBottom: "20px",
        }}
      >
        📅 {appointment.scheduledAtFormatted}
      </p>

      {/* STATUS */}
      <div
        style={{
          marginTop: "auto",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 16px",
          borderRadius: "999px",
          background: `${statusColor[appointment.status]}20`,
          border: `1px solid ${statusColor[appointment.status]}40`,
        }}
      >
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background:
              statusColor[
                appointment.status
              ],
            boxShadow: `0 0 10px ${
              statusColor[
                appointment.status
              ]
            }`,
          }}
        />

        <span
          style={{
            color:
              statusColor[
                appointment.status
              ],
            fontWeight: 600,
            fontSize: "14px",
          }}
        >
          {
            statusLabel[
              appointment.status
            ]
          }
        </span>
      </div>
    </div>
  );
}