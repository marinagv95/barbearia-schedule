import type { ReactNode } from "react";

import type {
  CreateAppointmentFormData,
} from "../../validators/appointment.schema";

export interface IAppointment {
  _id: string;

  // 💡 ALTERAÇÃO: O customerId agora pode ser null ou opcional para agendamentos do WhatsApp
  customerId?: {
    _id: string;
    name: string;
    phone: string;
  } | null;

  // 💡 NOVO: Adicionado como opcional para agendamentos manuais/WhatsApp sem conta vinculada
  clientName?: string;
  phone?: string;

  barberId: {
    _id: string;
    name: string;
  };

  service: string;

  duration: number;

  status:
    | "pending"
    | "confirmed"
    | "done"
    | "canceled";

  scheduledAt: string;

  scheduledAtFormatted: string;

  createdAt: string;

  updatedAt: string;
}

export interface IAppointmentContext {
  loading: boolean;

  appointments: IAppointment[];

  getAppointments: () => Promise<void>;

  getAppointmentById: (
    appointmentId: string
  ) => Promise<IAppointment>;

  createAppointment: (
    formData: CreateAppointmentFormData
  ) => Promise<void>;

  updateStatus: (
    appointmentId: string,
    status:
      | "pending"
      | "confirmed"
      | "done"
      | "canceled"
  ) => Promise<void>;

  rescheduleAppointment: (
    appointmentId: string,
    scheduledAt: string
  ) => Promise<void>;

  deleteAppointment: (
    appointmentId: string
  ) => Promise<void>;

  getAvailableSlots: (
    date: string,
    barberId: string
  ) => Promise<string[]>;
}

export interface IDefaultProviderProps {
  children: ReactNode;
}