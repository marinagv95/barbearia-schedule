import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useMetrics } from "../../../hooks/userMetrics";

export function StatusChart() {
  const metrics = useMetrics();

  const data = [
    { name: "Pendentes", value: metrics.pending },
    { name: "Confirmados", value: metrics.confirmed },
    { name: "Concluídos", value: metrics.done },
    { name: "Cancelados", value: metrics.canceled },
  ];

  const COLORS = ["#f4b942", "#4caf50", "#00c853", "#ff4d4d"];

  return (
    <div
      style={{
        background: "#111",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid #222",
        marginTop: "20px",
      }}
    >
      <h3 style={{ color: "#fff", marginBottom: "10px" }}>
        Status dos agendamentos
      </h3>

      <PieChart width={300} height={250}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          fill="#8884d8"
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}