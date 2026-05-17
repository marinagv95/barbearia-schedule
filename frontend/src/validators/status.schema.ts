import { z } from "zod";

export const updateStatusSchema =
  z.object({
    status: z.enum([
      "pending",
      "confirmed",
      "canceled",
      "done",
    ]),
  });

export type UpdateStatusFormData =
  z.infer<typeof updateStatusSchema>;