import { z } from "zod";

const adminSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  full_name: z.string(),
  phone: z.string(),
  country_code: z.string(),
});

export function validateAdmin(adminInfo: unknown) {
  const parseResut = adminSchema.safeParse(adminInfo);
  if (!parseResut.success) {
    throw new Error("Invalid admin info");
  }
  return parseResut.data;
}
