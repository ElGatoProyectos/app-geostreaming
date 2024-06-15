import { z } from 'zod';

export const userLoginSchema = z.object({
    user: z
        .string()
        .min(1, { message: 'El nombre de usuario o número de cédula es requerido' }),
    password: z.string()
        .min(1, { message: 'El campo contraseña es requerida' })
});
