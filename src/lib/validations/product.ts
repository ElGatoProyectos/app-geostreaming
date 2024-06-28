import { z } from "zod";

export const accountSchema = z.object({
  is_active: z.boolean().optional(),
  description: z.string().optional().nullable(),
  email: z.string().email(),
  password: z.string(),
  pin: z.string(),
});

const platformSchema = z.object({
  img_url: z.string(),
  name: z.string(),
  description: z.string(),
});

export const productSchema = z.object({
  enable_notifications: z.boolean(),
  accounts: z.array(accountSchema).optional(),
  price_in_cents: z.number(),
  price_distributor_in_cents: z.number(),
  numb_profiles: z.number(),
  expiration_date: z.date(),

  status: z.enum(["IMMEDIATE_DELIVERY", "UPON_REQUEST"]).optional(),
  user_id: z.number().optional(),
});

export function validateProduct(productInfo: unknown) {
  const parseResult = productSchema.safeParse(productInfo);
  if (!parseResult.success) {
    throw new Error("Invalid product info");
  }

  return parseResult.data;
}

const productEditSchema = productSchema.extend({
  id: z.number(),
  platform_id: z.number(),
  platform: platformSchema.extend({
    id: z.number(),
  }),
  status: z.enum(["IMMEDIATE_DELIVERY", "UPON_REQUEST"]),
  accounts: z
    .array(
      accountSchema.extend({
        id: z.number().optional(),
        product_id: z.number(),
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
