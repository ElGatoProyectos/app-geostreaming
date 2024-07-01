import { z } from 'zod';

export const UserSchema = z.object({
    /* username: z
        .string()
        .min(1, { message: 'El nombre de usuario o número de cédula es requerido' })
        .regex(/^[a-zA-Z0-9]+$/, { message: 'El nombre de usuario solo puede contener letras y números, sin espacios' }), */
    email: z.string()
        .email({ message: 'Formato de email incorrecto | ejemplo@gmail.com' }),
    ref_id: z.string()
        .refine(value => !isNaN(Number(value)), { message: 'El campo referido debe ser numérico' }),
    full_name: z
        .string()
        .min(3, {
            message: 'El nombre y apellido es requerido'
        })
        .regex(/^[a-zA-Z/s]+$/, { message: 'El nombre y apellido solo pueden contener letras y espacios' }),
    role: z
        .string()
        .min(3, {
            message: 'El rol del usuario es requerido'
        }),
    phone: z.string()
        .regex(/^\d{9}$/, { message: 'El número de celular debe tener 9 dígitos' }),
    dni: z.string()
        .regex(/^\d{8}$/, { message: 'El número de dni debe tener dígitos' }),
    

});
