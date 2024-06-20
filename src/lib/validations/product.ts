import { z } from "zod";

const accountSchema = z.object({
  is_active: z.boolean(),
  email: z.string().email(),
  password: z.string(),
  pin: z.string(),
  numb_profiles: z.number(),
  numb_days_duration: z.number(),
  status: z.string(),
});

const priceSchema = z.object({
  role_id: z.number(),
  price_role: z.number(),
});

const platformSchema = z.object({
  name: z.string(),
  description: z.string(),
});

const productSchema = z.object({
  platform: platformSchema,
  accounts: z.array(accountSchema),
  prices: z.array(priceSchema),
});

export function validateProduct(productInfo: unknown) {
  const parseResult = productSchema.safeParse(productInfo);
  if (!parseResult.success) {
    throw new Error("Invalid product info");
  }

  return { isValid: parseResult.success, productValidated: parseResult.data };
}
