import { z } from "zod";

const balanceSchema = z.object({
  balance_in_cents: z.number(),
  voucher_id: z.number(),
});

export function validateBalance(orderInfo: unknown) {
  const parseResut = balanceSchema.safeParse(orderInfo);
  if (!parseResut.success) {
    throw new Error("Invalid Order info");
  }
  return parseResut.data;
}
