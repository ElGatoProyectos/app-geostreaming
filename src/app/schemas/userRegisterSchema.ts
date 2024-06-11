import { z } from 'zod';

export const userRegisterSchema = z.object({
    user: z
        .string()
        .min(1, { message: 'El nombre de usuario o número de cédula es requerido' })
        .regex(/^[a-zA-Z0-9]+$/, { message: 'El nombre de usuario o cédula solo puede contener letras y números' }),
    name: z
        .string()
        .min(3, {
            message: 'El nombre y apellido es requerido'
        })
        .regex(/^[a-zA-Z/s]+$/, { message: 'El nombre y apellido solo pueden contener letras y espacios' }),
    email: z.string()
        .email({ message: 'Formato de email incorrecto | ejemplo@gmail.com' }),
    phone: z.string()
        .regex(/^\d{9}$/, { message: 'El número de celular debe tener 9 dígitos' }),
    password: z.string()
        .min(8, { message: 'La contraseña debe terner al menos 8 caracteres' })
        .regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])/, {
            message: 'La constrasena debe tener al menos un número, una letra minúscula, una letra mayúscula un caracter especial '
        }),
    confirmPassword: z
        .string()
        .min(8, { message: 'La contraseña debe terner al menos 8 caracteres' })
        .regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])/, {
            message: 'La contraseña debe tener al menos un número, una letra minúscula, una letra mayúscula un caracter especial '
        }),

}).refine(data => data.password === data.confirmPassword, {
    message: 'Las contraseñas deben coincidir',
    path: ['confirmPassword']
});
