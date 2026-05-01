import { z } from "zod";

export const rescheduleSchema = z.object({
  scheduledAt: z.iso.datetime({
    message: "Data/hora inválida",
  }),
});