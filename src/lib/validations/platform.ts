import { z } from "zod";

const platformSchema = z.object({
  img_url: z.string().optional().nullable(),
  name: z.string(),
  description: z.string(),
  days_duration: z.number(),
  price_in_cents: z.number(),
  price_distributor_in_cents: z.number(),
  status: z.enum(["IMMEDIATE_DELIVERY", "UPON_REQUEST"]).optional(),
});

export function validatePlatform(platformInfo: unknown) {
  const parseResut = platformSchema.safeParse(platformInfo);
  if (!parseResut.success) {
    throw new Error("Invalid platform info");
  }
  return parseResut.data;
}
