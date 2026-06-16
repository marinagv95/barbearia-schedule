import Chart from "react-apexcharts";
import { useContext, useMemo } from "react";
import { AppointmentContext } from "../../../providers/appointmentProvider/appointmentContext";

export function AppointmentWeekChart() {
  const { appointments } = useContext(AppointmentContext);

  const data = useMemo(() => {
    const week = [0, 0, 0, 0, 0, 0, 0]; // dom → sáb

    appointments.forEach((a) => {
      const day = new Date(a.scheduledAt).getDay();
      week[day]++;
    });

    return week;
  }, [appointments]);

  return (
    <div
      style={{
        background: "#111",
        padding: "20px",
        borderRadius: "14px",
        border: "1px solid #222",
      }}
    >
      <h2 style={{ color: "#fff", marginBottom: "16px" }}>
        📅 Agendamentos por dia da semana
      </h2>

      <Chart
        type="bar"
        height={320}
        series={[
          {
            name: "Agendamentos",
            data,
          },
        ]}
        options={{
          chart: {
            toolbar: { show: false },
            background: "transparent",
          },
          theme: {
            mode: "dark",
          },
          plotOptions: {
            bar: {
              borderRadius: 6,
              columnWidth: "45%",
            },
          },
          colors: ["#c8a24a"],
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            categories: [
              "Dom",
              "Seg",
              "Ter",
              "Qua",
              "Qui",
              "Sex",
              "Sáb",
            ],
            labels: {
              style: {
                colors: "#aaa",
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                colors: "#aaa",
              },
            },
          },
          grid: {
            borderColor: "#222",
          },
          tooltip: {
            theme: "dark",
          },
        }}
      />
    </div>
  );
}