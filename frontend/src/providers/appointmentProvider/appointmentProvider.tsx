import {
  useEffect,
  useState,
} from "react";

import { toast } from "react-toastify";

import { api } from "../../services/api";

import { AppointmentContext } from "./appointmentContext";

import type {
  IAppointment,
  IDefaultProviderProps,
} from "./@types";

import type {
  CreateAppointmentFormData,
} from "../../validators/appointment.schema";

export const AppointmentProvider = ({
  children,
}: IDefaultProviderProps) => {

  const [loading, setLoading] =
    useState(false);

  const [appointments, setAppointments] =
    useState<IAppointment[]>([]);

  // =========================
  // 📅 BUSCAR AGENDAMENTOS
  // =========================
  const getAppointments =
    async () => {
      try {
        setLoading(true);

        const response =
          await api.get(
            "/appointments"
          );

        setAppointments(
          response.data
        );
      } catch (error) {
        console.log(error);

        toast.error(
          "Erro ao buscar agendamentos"
        );
      } finally {
        setLoading(false);
      }
    };

  // =========================
  // 📅 BUSCAR POR ID
  // =========================
  const getAppointmentById =
    async (
      appointmentId: string
    ) => {
      const response =
        await api.get(
          `/appointments/${appointmentId}`
        );

      return response.data;
    };

  // =========================
  // 📅 CRIAR AGENDAMENTO
  // =========================
  const createAppointment =
    async (
      formData:
        CreateAppointmentFormData
    ) => {
      try {
        setLoading(true);

        // 1. Envia a requisição de criação para o backend
        await api.post(
          "/appointments",
          formData
        );

        // 2. 💡 CORREÇÃO: Em vez de usar prevState com dados crus, buscamos 
        // a lista atualizada e populada direto do banco de dados.
        await getAppointments();

        toast.success(
          "Agendamento criado"
        );
      } catch (error) {
        console.log(error);

        toast.error(
          "Erro ao criar agendamento"
        );
      } finally {
        setLoading(false);
      }
    };

  // =========================
  // 📅 ATUALIZAR STATUS
  // =========================
  const updateStatus =
    async (
      appointmentId: string,
      status:
        | "pending"
        | "confirmed"
        | "done"
        | "canceled"
    ) => {
      try {
        setLoading(true);

        const response =
          await api.patch(
            `/appointments/${appointmentId}/status`,
            { status }
          );

        setAppointments(
          (prevState) =>
            prevState.map(
              (appointment) =>
                appointment._id ===
                appointmentId
                  ? response.data
                  : appointment
            )
        );

        toast.success(
          "Status atualizado"
        );
      } catch (error) {
        console.log(error);

        toast.error(
          "Erro ao atualizar status"
        );
      } finally {
        setLoading(false);
      }
    };

  // =========================
  // 📅 REMARCAR AGENDAMENTO
  // =========================
  const rescheduleAppointment =
    async (
      appointmentId: string,
      scheduledAt: string
    ) => {
      try {
        setLoading(true);

        const response =
          await api.patch(
            `/appointments/${appointmentId}/reschedule`,
            {
              scheduledAt,
            }
          );

        setAppointments(
          (prevState) =>
            prevState.map(
              (appointment) =>
                appointment._id ===
                appointmentId
                  ? response.data
                      .appointment
                  : appointment
            )
        );

        toast.success(
          "Agendamento remarcado"
        );
      } catch (error) {
        console.log(error);

        toast.error(
          "Erro ao remarcar"
        );
      } finally {
        setLoading(false);
      }
    };

  // =========================
  // 📅 DELETAR AGENDAMENTO
  // =========================
  const deleteAppointment =
    async (
      appointmentId: string
    ) => {
      try {
        setLoading(true);

        await api.delete(
          `/appointments/${appointmentId}`
        );

        setAppointments(
          (prevState) =>
            prevState.filter(
              (appointment) =>
                appointment._id !==
                appointmentId
            )
        );

        toast.success(
          "Agendamento removido"
        );
      } catch (error) {
        console.log(error);

        toast.error(
          "Erro ao remover"
        );
      } finally {
        setLoading(false);
      }
    };

  // =========================
  // 📅 HORÁRIOS DISPONÍVEIS
  // =========================
  const getAvailableSlots =
    async (
      date: string,
      barberId: string
    ) => {
      try {
        const response =
          await api.get(
            "/appointments/available-slots",
            {
              params: {
                date,
                barberId,
              },
            }
          );

        return response.data;
      } catch (error) {
        console.log(error);

        toast.error(
          "Erro ao buscar horários"
        );

        return [];
      }
    };

  // Carrega os dados iniciais ao montar o componente
  useEffect(() => {
    const loadData =
      async () => {
        await getAppointments();
      };

    void loadData();
  }, []);

  return (
    <AppointmentContext.Provider
      value={{
        loading,
        appointments,
        getAppointments,
        getAppointmentById,
        createAppointment,
        updateStatus,
        rescheduleAppointment,
        deleteAppointment,
        getAvailableSlots,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};