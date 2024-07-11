import { z } from "zod";

export const UserSchema = z.object({
  email: z
    .string()
    .email({ message: "Formato de email incorrecto | ejemplo@gmail.com" }),
  full_name: z.string().min(3, {
    message: "El nombre y apellido es requerido",
  }),
  phone: z
    .string()
    .regex(/^\d+/, { message: "El número de celular debe ser numérico" }),
  dni: z.string().optional(),
  avatar_url: z.string().optional(),
  /*     dni: z.string()
        .regex(/^\d+$/, {
            message: 'El documento de identidad  debe ser numérico'
        })
        .min(1, { message: 'El documento de identidad es requerido ' }), */
  country_code: z.string().optional(),
  /* file: z.any(), */
  /*  password: z.string()
         .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }), */
});
