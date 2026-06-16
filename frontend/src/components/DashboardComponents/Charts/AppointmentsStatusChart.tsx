import { useMetrics } from "../../../hooks/userMetrics";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export function AppointmentsStatusChart() {
  const metrics = useMetrics();

  const data = [
    { name: "Pendentes", value: metrics.pending },
    { name: "Confirmados", value: metrics.confirmed },
    { name: "Finalizados", value: metrics.done },
    { name: "Cancelados", value: metrics.canceled },
  ];

  const COLORS = ["#f4b942", "#4caf50", "#2196f3", "#ff4d4d"];

  return (
    <div style={container}>
      <h3 style={{ marginBottom: "12px" }}>
        Status dos Agendamentos
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

const container: React.CSSProperties = {
  background: "#111",
  border: "1px solid #222",
  borderRadius: "12px",
  padding: "16px",
  color: "#fff",
};