import { z } from "zod";

const accountSchema = z.object({
  product_id: z.number(),
  platform_id: z.number(),
  is_active: z.boolean(),
  email: z.string().email(),
  password: z.string(),
  pin: z.string(),
  numb_profiles: z.number(),
  numb_days_duration: z.number(),
  status: z.string(),
});

const priceSchema = z.object({
  user: z.number(),
  distributor: z.number(),
});

const productSchema = z.object({
  platform_id: z.number(),
  accounts: z.array(accountSchema),
  price: priceSchema,
  role_id: z.number(),
});

export function validateProduct(input: unknown) {
  return productSchema.safeParse(input);
}
