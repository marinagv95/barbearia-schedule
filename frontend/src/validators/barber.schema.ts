import { z } from "zod";

export const createBarberSchema =
  z.object({
    name: z
      .string()
      .min(3, "Nome muito curto")
      .max(50, "Nome muito grande"),
  });

export type CreateBarberFormData =
  z.infer<typeof createBarberSchema>;