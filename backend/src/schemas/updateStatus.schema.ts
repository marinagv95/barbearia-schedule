import { z } from "zod";

export const updateStatusSchema = z.object({
  status: z.enum(["pending", "confirmed", "canceled", "done"], {
    message: "Status inválido",
  }),
});
