import { useContext, useMemo } from "react";
import { AppointmentContext } from "../../../providers/appointmentProvider/appointmentContext";

export function MetricsCards() {
  const { appointments } = useContext(AppointmentContext);

  const metrics = useMemo(() => {
    const total = appointments.length;

    const pending = appointments.filter((a) => a.status === "pending").length;
    const confirmed = appointments.filter((a) => a.status === "confirmed").length;
    const done = appointments.filter((a) => a.status === "done").length;
    const canceled = appointments.filter((a) => a.status === "canceled").length;

    const today = new Date().toISOString().split("T")[0];

    const todayAppointments = appointments.filter((a) =>
      a.scheduledAt.startsWith(today)
    ).length;

    const cancelRate = total ? (canceled / total) * 100 : 0;

    return {
      total,
      pending,
      confirmed,
      done,
      canceled,
      todayAppointments,
      cancelRate,
    };
  }, [appointments]);

  return (
    <div style={container}>
      <Card
        title="Total agendamentos"
        value={metrics.total}
        subtitle="Todos os registros do sistema"
        color="#c8a24a"
      />

      <Card
        title="Hoje"
        value={metrics.todayAppointments}
        subtitle="Agendamentos de hoje"
        color="#4caf50"
      />

      <Card
        title="Pendentes"
        value={metrics.pending}
        subtitle="Aguardando confirmação"
        color="#f4b942"
      />

      <Card
        title="Finalizados"
        value={metrics.done}
        subtitle="Serviços concluídos"
        color="#2196f3"
      />

      <Card
        title="Cancelamentos"
        value={metrics.canceled}
        subtitle={`${metrics.cancelRate.toFixed(1)}% do total`}
        color="#ff4d4d"
      />
    </div>
  );
}

function Card({ title, value, subtitle, color }: any) {
  return (
    <div style={card}>
      <div>
        <p style={{ margin: 0, color: "#aaa", fontSize: 12 }}>{title}</p>

        <h2 style={{ margin: "4px 0", color }}>{value}</h2>

        <p style={{ margin: 0, color: "#666", fontSize: 12 }}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}

const container: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "12px",
};

const card: React.CSSProperties = {
  background: "#0f0f0f",
  border: "1px solid #1f1f1f",
  borderRadius: "14px",
  padding: "16px",
};