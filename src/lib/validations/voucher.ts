import { z } from "zod";

const voucherSchema = z.object({
  voucher_url: z.string(),
  number: z.string().min(1),
  value: z.number().int(),
  date: z.string().datetime(),
  user_id: z.number().int().nonnegative(),
  country_code: z.string(),
});

export function validateVoucher(voucherInfo: unknown) {
  const parseResut = voucherSchema.safeParse(voucherInfo);
  if (!parseResut.success) {
    throw new Error("Invalid Voucher info");
  }
  return parseResut.data;
}
