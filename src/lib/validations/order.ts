import { z } from "zod";

const orderSchema = z.object({
  ref_id: z.number().optional(),
  user_id: z.number().positive(),
  platform_id: z.number().positive(),
  status: z.enum(["ATTENDED", "PENDING"]),
});

export function validateOrder(orderInfo: unknown) {
  const parseResut = orderSchema.safeParse(orderInfo);
  if (!parseResut.success) {
    throw new Error("Invalid Order info");
  }
  return parseResut.data;
}
