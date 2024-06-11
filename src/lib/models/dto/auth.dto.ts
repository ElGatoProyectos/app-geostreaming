import { z } from "zod";

export const authDTO = z.object({
  username: z
    .string()
    .min(5, {
      message: "El nombre de usuario debe tener al menos 8 caracteres.",
    })
    .max(30, {
      message: "El nombre de usuario no debe tener más de 30 caracteres.",
    })
    .trim(),
  password: z
    .string()
    .min(5, { message: "La contraseña debe tener al menos 5 caracteres." })
    .max(64, { message: "La contraseña no debe tener más de 64 caracteres." })

    .trim(),
});
