import { z } from "zod";

export const accountSchema = z.object({
  is_active: z.boolean(),
  email: z.string().email(),
  password: z.string(),
  pin: z.string(),
  numb_profiles: z.number(),
  numb_days_duration: z.number(),
  status: z.enum(["AVAILABLE", "DELIVERED", "PENDING"]).optional(),
});

const platformSchema = z.object({
  name: z.string(),
  description: z.string(),
});

const productSchema = z.object({
  platform: platformSchema,
  accounts: z.array(accountSchema).optional(),
  price_in_cents: z.number(),
  price_distributor_in_cents: z.number(),
});

export function validateProduct(productInfo: unknown) {
  const parseResult = productSchema.safeParse(productInfo);
  if (!parseResult.success) {
    throw new Error("Invalid product info");
  }

  return { isValid: parseResult.success, productValidated: parseResult.data };
}

const productEditSchema = productSchema.extend({
  id: z.number(),
  platform_id: z.number(),
  platform: platformSchema.extend({
    id: z.number(),
  }),
  accounts: z
    .array(
      accountSchema.extend({
        id: z.number().optional(),
        platform_id: z.number().optional(),
        product_id: z.number().optional(),
      })
    )
    .optional()
    .nullable(),
});

export function validateEditedProduct(productInfo: unknown) {
  const parseResult = productEditSchema.safeParse(productInfo);
  if (!parseResult.success) {
    throw new Error("Invalid edited product info");
  }

  return { isValid: parseResult.success, productValidated: parseResult.data };
}
