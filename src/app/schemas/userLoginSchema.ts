import { z } from 'zod';

export const userLoginSchema = z.object({
    user: z
        .string()
        .min(1, { message: 'El nombre de usuario o número de cédula es requerido' })
        .regex(/^[a-zA-Z0-9]+$/, { message: 'El nombre de usuario o cédula solo puede contener letras y números' }),
    password: z.string()
        .min(8, { message: 'La contraseña debe terner al menos 8 caracteres' })
        .regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])/, {
            message: 'La contraseña debe tener al menos un número, una letra minuscula, una letra mayusculay un caracter especial '
        }),
});
