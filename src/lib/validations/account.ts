import { z } from "zod";

const accountSchema = z.object({
  status: z.enum(["NOT_BOUGHT", "BOUGHT"]).optional(),
  is_active: z.boolean().optional(),
  email: z.string().email(),
  password: z.string(),
  description: z.string().optional().nullable(),
  pin: z.string(),
  // new
  platform_id: z.number(),
});

export function validateAccount(accountInfo: unknown) {
  const parseResut = accountSchema.safeParse(accountInfo);
  if (!parseResut.success) {
    throw new Error("Invalid Account info");
  }
  return parseResut.data;
}

const updateAccount = accountSchema.extend({
  id: z.number().int().nonnegative(),
  status: z.enum(["NOT_BOUGHT", "BOUGHT"]),
  purchase_date: z.date(),
  renewal_date: z.date(),
});

export function validateUpdateAccount(accountInfo: unknown) {
  const parseResut = updateAccount.safeParse(accountInfo);
  if (!parseResut.success) {
    throw new Error("Invalid Account info");
  }
  return parseResut.data;
}
