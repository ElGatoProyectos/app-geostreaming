import { z } from 'zod';

export const changePasswordSchema = z.object({
    password: z.string()
        .min(1, { message: 'La contraseña es requerida' }),
    newPassword: z.string()
        .min(8, { message: 'La contraseña debe terner al menos 8 caracteres' }),
        /* .regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])/, {
            message: 'La constraseña debe tener al menos un número, una letra minúscula, una letra mayúscula un caracter especial '
        }), */
    confirmPassword: z
        .string()
        .min(8, { message: 'La contraseña debe terner al menos 8 caracteres' }),
        /* .regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])/, {
            message: 'La contraseña debe tener al menos un número, una letra minúscula, una letra mayúscula un caracter especial '
        }), */

}).refine(data => data.newPassword === data.confirmPassword, {
    message: 'Las contraseñas deben coincidir',
    path: ['confirmPassword']
});
