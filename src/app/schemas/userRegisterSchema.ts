import { z } from 'zod';

export const userRegisterSchema = z.object({
    user: z
        .string()
        .regex(/^\d+$/, {
            message: 'El documento de identidad  debe ser numérico'
        })
        .min(1, { message: 'El documento de identidad es requerido ' }),
    name: z
        .string()
        .min(3, {
            message: 'El nombre y apellido es requerido'
        }),
    email: z.string()
        .email({ message: 'Formato de email incorrecto | ejemplo@gmail.com' }),
    country_code: z.string(),
    phone: z.string()
        .regex(/^\d+/, { message: 'El número de celular debe tener 9 dígitos' }),
    password: z.string()
        .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),

    confirmPassword: z
        .string()
        .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),

}).refine(data => data.password === data.confirmPassword, {
    message: 'Las contraseñas deben coincidir',
    path: ['confirmPassword']
});
