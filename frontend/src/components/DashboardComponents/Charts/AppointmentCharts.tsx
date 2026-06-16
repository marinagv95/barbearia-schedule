import { useContext, useMemo } from "react";
import { AppointmentContext } from "../../../providers/appointmentProvider/appointmentContext";

export function AppointmentCharts() {
  const { appointments } = useContext(AppointmentContext);

  const data = useMemo(() => {
    const total = appointments.length;

    const pending = appointments.filter((a) => a.status === "pending").length;
    const confirmed = appointments.filter((a) => a.status === "confirmed").length;
    const done = appointments.filter((a) => a.status === "done").length;
    const canceled = appointments.filter((a) => a.status === "canceled").length;

    return {
      total,
      pending,
      confirmed,
      done,
      canceled,
    };
  }, [appointments]);

  const getPercent = (value: number) =>
    data.total ? Math.round((value / data.total) * 100) : 0;

  return (
    <div style={container}>
      <h2 style={title}>📊 Status dos Atendimentos</h2>

      <div style={grid}>
        <Card
          label="Pendentes"
          value={data.pending}
          percent={getPercent(data.pending)}
          color="#f4b942"
        />

        <Card
          label="Confirmados"
          value={data.confirmed}
          percent={getPercent(data.confirmed)}
          color="#4caf50"
        />

        <Card
          label="Finalizados"
          value={data.done}
          percent={getPercent(data.done)}
          color="#4a90e2"
        />

        <Card
          label="Cancelados"
          value={data.canceled}
          percent={getPercent(data.canceled)}
          color="#ff4d4d"
        />
      </div>
    </div>
  );
}

function Card({
  label,
  value,
  percent,
  color,
}: {
  label: string;
  value: number;
  percent: number;
  color: string;
}) {
  return (
    <div style={card}>
      <div style={header}>
        <span style={labelStyle}>{label}</span>
        <span style={valueStyle}>
          {value} • {percent}%
        </span>
      </div>

      <div style={barBg}>
        <div
          style={{
            width: `${percent}%`,
            background: color,
            height: "8px",
            borderRadius: "999px",
            transition: "0.4s ease",
          }}
        />
      </div>
    </div>
  );
}

const container: React.CSSProperties = {
  background: "#0f0f0f",
  padding: "24px",
  borderRadius: "16px",
  border: "1px solid #1f1f1f",
  color: "#fff",
  marginBottom: "20px",
};

const title: React.CSSProperties = {
  marginBottom: "20px",
  fontSize: "18px",
  fontWeight: 600,
  color: "#fff",
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "12px",
};

const card: React.CSSProperties = {
  background: "#111",
  padding: "16px",
  borderRadius: "14px",
  border: "1px solid #1f1f1f",
  transition: "0.2s ease",
};

const header: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
};

const labelStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#aaa",
};

const valueStyle: React.CSSProperties = {
  fontSize: "13px",
  color: "#fff",
  opacity: 0.9,
};

const barBg: React.CSSProperties = {
  width: "100%",
  height: "8px",
  background: "#222",
  borderRadius: "999px",
};