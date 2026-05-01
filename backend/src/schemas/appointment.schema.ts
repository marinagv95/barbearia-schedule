import { z } from "zod";

export const createAppointmentSchema = z.object({
  clientName: z.string().min(2, "Nome obrigatório"),
  phone: z.string().min(8, "Telefone inválido"),
  service: z.string().min(2, "Serviço obrigatório"),

  scheduledAt: z.iso.datetime({
    message: "Data inválida",
  }),

  price: z.number().optional().or(z.string().transform(Number)),
});