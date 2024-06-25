import { z } from "zod";

const BankSchema = z.object({
  bank: z.string().min(1),
  number: z.string().min(1),
  name: z.string().min(1),
  type: z.string().min(1),
});

export function validateBank(bankInfo: unknown) {
  const parseResut = BankSchema.safeParse(bankInfo);
  if (!parseResut.success) {
    throw new Error("Invalid bank info");
  }
  return parseResut.data;
}

const updateBank = BankSchema.extend({
  id: z.number(),
});

export function validateUpdateBank(bankInfo: unknown) {
  const parseResut = updateBank.safeParse(bankInfo);
  if (!parseResut.success) {
    throw new Error("Invalid bank info");
  }
  return parseResut.data;
}
