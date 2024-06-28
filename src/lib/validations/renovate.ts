import { z } from "zod";

export const renovateSchema = z.object({
  account_id: z.number(),
  platform_id: z.number(),
  user_id: z.number(),
});
export function validateRenovate(renovateInfo: unknown) {
  const parseResult = renovateSchema.safeParse(renovateInfo);
  if (!parseResult.success) {
    throw new Error("Invalid product info");
  }

  return parseResult.data;
}
