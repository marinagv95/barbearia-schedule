import { z } from "zod";

export const createAppointmentSchema =
  z.object({
    clientName: z
      .string()
      .min(2, "Nome obrigatório"),

    phone: z
      .string()
      .min(8, "Telefone inválido"),

    service: z
      .string()
      .min(2, "Serviço obrigatório"),

    scheduledAt: z
      .string()
      .min(1, "Data obrigatória"),

    barberId: z
      .string()
      .min(1, "Barbeiro obrigatório"),
  });

export type CreateAppointmentFormData =
  z.infer<
    typeof createAppointmentSchema
  >;