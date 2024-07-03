import { z } from "zod";

const voucherSchema = z.object({
  voucher_url: z.string().optional(),
  number: z.string().min(1),
  value: z.number().int(),
  date: z.date(),
  user_id: z.number().int().nonnegative(),
  status: z.enum(["UNREAD", "READ"]).optional(),
});

export function validateVoucher(voucherInfo: unknown) {
  const parseResut = voucherSchema.safeParse(voucherInfo);
  if (!parseResut.success) {
    throw new Error("Invalid Voucher info");
  }
  return parseResut.data;
}

const voucherSchemaconfirm = z.object({
  status: z.enum(["UNREAD", "READ"]),
});

export function validateConfirmVoucher(voucherInfo: unknown) {
  const parseResut = voucherSchemaconfirm.safeParse(voucherInfo);
  if (!parseResut.success) {
    throw new Error("Invalid Voucher info");
  }
  return parseResut.data;
}
