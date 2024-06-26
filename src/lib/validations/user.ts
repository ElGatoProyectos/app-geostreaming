import { z } from "zod";

const UserSchema = z.object({
  email: z.string().email(),
  ref_id: z.number().int().positive().optional().nullable(),
  role: z.enum(["USER", "DISTRIBUTOR"]).optional(),
  full_name: z.string(),
  dni: z.string().optional().nullable(),
  phone: z.string(),
  password: z.string(),
  enabled: z.enum(["y", "n"]).default("y"),
});

const UserUpdateSchema = UserSchema.extend({
  id: z.number().int().positive(),
  role: z.enum(["USER", "DISTRIBUTOR"]),
});

export function validateUser(userInfo: unknown) {
  const parseResut = UserSchema.safeParse(userInfo);
  if (!parseResut.success) {
    throw new Error("Invalid user info");
  }
  return parseResut.data;
}

export function validateUpdateUser(userInfo: unknown) {
  const parseResut = UserUpdateSchema.safeParse(userInfo);
  if (!parseResut.success) {
    throw new Error("Invalid user info");
  }
  return parseResut.data;
}
