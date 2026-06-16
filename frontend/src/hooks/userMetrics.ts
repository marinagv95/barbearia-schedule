import { useContext, useMemo } from "react";
import { AppointmentContext } from "../providers/appointmentProvider/appointmentContext";

export function useMetrics() {
  const { appointments } = useContext(AppointmentContext);

  return useMemo(() => {
    const total = appointments.length;

    const pending = appointments.filter(
      (a) => a.status === "pending",
    ).length;

    const confirmed = appointments.filter(
      (a) => a.status === "confirmed",
    ).length;

    const done = appointments.filter(
      (a) => a.status === "done",
    ).length;

    const canceled = appointments.filter(
      (a) => a.status === "canceled",
    ).length;

    const today = new Date().toISOString().split("T")[0];

    const todayAppointments = appointments.filter((a) =>
      a.scheduledAt.startsWith(today),
    ).length;

    return {
      total,
      pending,
      confirmed,
      done,
      canceled,
      todayAppointments,
    };
  }, [appointments]);
}