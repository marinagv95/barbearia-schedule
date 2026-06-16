import { useContext, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { AppointmentContext } from "../../../providers/appointmentProvider/appointmentContext";

export function AppointmentEvolutionChart() {
  const { appointments } = useContext(AppointmentContext);

  const data = useMemo(() => {
    const map: Record<string, number> = {};

    appointments.forEach((a) => {
      const date = a.scheduledAt.split("T")[0]; // YYYY-MM-DD

      if (!map[date]) {
        map[date] = 0;
      }

      map[date] += 1;
    });

    return Object.entries(map)
      .map(([date, count]) => ({
        date,
        agendamentos: count,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [appointments]);

  return (
    <div style={container}>
      <h2 style={title}>📈 Evolução de Agendamentos</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#222" />
          <XAxis dataKey="date" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="agendamentos"
            stroke="#c8a24a"
            strokeWidth={3}
            dot={{ fill: "#c8a24a" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const container: React.CSSProperties = {
  background: "#0f0f0f",
  padding: "24px",
  borderRadius: "16px",
  border: "1px solid #1f1f1f",
  marginBottom: "20px",
};

const title: React.CSSProperties = {
  color: "#fff",
  marginBottom: "16px",
};