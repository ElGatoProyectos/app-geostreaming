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

const orderPendingSchema = z.object({
  order_id: z.number(),
  account_id: z.number(),
  user_id: z.number(),
  platform_id: z.number(),
  status: z.enum(["ATTENDED", "PENDING"]),
});

export function validateAssignOrder(orderPending: unknown) {
  const parseResut = orderPendingSchema.safeParse(orderPending);
  if (!parseResut.success) {
    throw new Error("Invalid Order info");
  }
  return parseResut.data;
}
