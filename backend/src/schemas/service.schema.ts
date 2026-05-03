import { z } from "zod";

export const createServiceSchema = z.object({
  name: z.string().min(2, "Nome do serviço obrigatório"),

  price: z.coerce
    .number()
    .positive("Preço deve ser maior que zero"),

  duration: z.coerce
    .number()
    .positive("Duração deve ser maior que zero")
    .min(10, "Duração mínima de 10 minutos"),
});