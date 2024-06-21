import { z } from "zod";

const UserSchema = z.object({
  ref_id: z.number().int().positive().optional().nullable(),
  role_id: z.number().int().positive(),
  full_name: z.string(),
  dni: z.string().optional().nullable(),
  phone: z.string(),
  email: z.string().email().optional().nullable(),
  balance: z.number().default(0.0),
  username: z.string(),
  password: z.string(),
  enabled: z.enum(["y", "n"]).default("y"),
});

const UserUpdateSchema = UserSchema.extend({
  id: z.number().int().positive(),
  products: z.array(z.any()).optional(),
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
