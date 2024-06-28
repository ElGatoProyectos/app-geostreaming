import { z } from 'zod';

export const AccountFormSchema = z.object({

    product_id: z.number().positive('Seleccione un producto'),
    user_id: z.number(),
    email: z.string()
        .min(1, 'El campo correo es requerido')
        .email('Formato de email incorrecto | ejemplo@gmail.com'),
    password: z.string()
        .min(1, 'El campo contraseña es requerido'),
    pin: z.string()
        .min(1, 'El campo pin es requerido'),
    numb_profiles: z.number()
    .min(1, 'El campo perfiles es requerido'),
    numb_days_duration: z.number()
    .min(1, 'El campo duración es requerido'),
    is_active: z.boolean({
        required_error: "El estado es requerido",
        invalid_type_error: "El estado debe ser activo o inactivo",
    }),
    description: z.string(),
    platform_id: z.number(),
});