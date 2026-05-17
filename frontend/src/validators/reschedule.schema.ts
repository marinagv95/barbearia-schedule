import { z } from "zod";

export const rescheduleSchema =
  z.object({
    scheduledAt: z
      .string()
      .min(1, "Data obrigatória"),
  });

export type RescheduleFormData =
  z.infer<typeof rescheduleSchema>;