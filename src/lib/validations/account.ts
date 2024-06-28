import { z } from "zod";
import { accountSchema } from "./product";

const createAccount = accountSchema.extend({
  product_id: z.number().int().nonnegative(),
  platform_id: z.number().int().nonnegative(),
});

export function validateAccount(accountInfo: unknown) {
  const parseResut = createAccount.safeParse(accountInfo);
  if (!parseResut.success) {
    throw new Error("Invalid Account info");
  }
  return parseResut.data;
}

const updateAccount = accountSchema.extend({
  id: z.number().int().nonnegative(),
  renovation_date: z.string().datetime(),
  product_id: z.number().int().nonnegative(),
  platform_id: z.number().int().nonnegative(),
});

export function validateUpdateAccount(accountInfo: unknown) {
  const parseResut = updateAccount.safeParse(accountInfo);
  if (!parseResut.success) {
    throw new Error("Invalid Account info");
  }
  return parseResut.data;
}

export const accountRenovateSchema = z.object({
  numb_days_duration: z.number(),
  renovation_date: z.string(),
});

export function validateRenovateUpdateAccount(accountInfo: unknown) {
  const parseResut = accountRenovateSchema.safeParse(accountInfo);
  if (!parseResut.success) {
    throw new Error("Invalid Account info");
  }
  return parseResut.data;
}
