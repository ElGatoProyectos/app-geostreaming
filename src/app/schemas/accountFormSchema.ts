import { z } from 'zod';

export const AccountFormSchema = z.object({
    id: z.number().optional(),
    platform_id: z.number().positive('Seleccione una plataforma'),
/*     user_id: z.number().optional(), */
    email: z.string()
        .min(1, 'El campo correo es requerido')
        .email('Formato de email incorrecto | ejemplo@gmail.com'),
    password: z.string()
        .min(1, 'El campo contraseña es requerido'),
    pin: z.string()
        .min(1, 'El campo pin es requerido'),
    /* purchase_date: z.date(), */
  /*   renewal_date: z.date(), */
    is_active: z.string(),
/*     {
        required_error: "El estado es requerido",
        invalid_type_error: "El estado debe ser activo o inactivo",
    } */
    status: z.string(),
    description: z.string().optional(),
});