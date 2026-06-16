import { z } from "zod";

export const createAppointmentSchema = z.object({
  clientName: z.string().min(2, "Nome obrigatório"),
  phone: z.string().min(8, "Telefone inválido"),
  service: z.string().min(2, "Serviço obrigatório"),
  scheduledAt: z.iso.datetime({
    message: "Data inválida",
  }),  barberId: z.string().min(1, "Barbeiro obrigatório"),
  
  price: z.number().min(0, "O preço não pode ser negativo"), 
});