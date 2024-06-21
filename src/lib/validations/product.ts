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
  price: z.number(),
});

const platformSchema = z.object({
  name: z.string(),
  description: z.string(),
});

const productSchema = z.object({
  platform: platformSchema,
  accounts: z.array(accountSchema).optional(),
  prices: z.array(priceSchema),
});

export function validateProduct(productInfo: unknown) {
  const parseResult = productSchema.safeParse(productInfo);
  if (!parseResult.success) {
    throw new Error("Invalid product info");
  }

  return { isValid: parseResult.success, productValidated: parseResult.data };
}

const productEditSchema = z.object({
  id: z.number(),
  platform_id: z.number(),
  createdAt: z.string(),
  platform: z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
  }),
  accounts: z
    .array(
      z.object({
        id: z.number().optional(),
        is_active: z.boolean(),
        email: z.string().email(),
        password: z.string(),
        pin: z.string(),
        numb_profiles: z.number(),
        numb_days_duration: z.number(),
        status: z.string(),
        platform_id: z.number().optional(),
        product_id: z.number().optional(),
        createdAt: z.string(),
      })
    )
    .optional(),
  price: z.array(
    z.object({
      id: z.number().optional(),
      price: z.string(),
      product_id: z.number().optional(),
      role_id: z.number(),
    })
  ),
});

export function validateEditedProduct(productInfo: unknown) {
  const parseResult = productEditSchema.safeParse(productInfo);
  if (!parseResult.success) {
    throw new Error("Invalid edited product info");
  }

  return { isValid: parseResult.success, productValidated: parseResult.data };
}
