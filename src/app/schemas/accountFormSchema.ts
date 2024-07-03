import { z } from 'zod';

export const AccountFormSchema = z.object({
    id: z.number().optional(),
    platform_id: z.number({
        required_error: 'El campo plataforma es requerido',
            invalid_type_error: 'Seleccione una plataforma'
    }).positive('Seleccione una plataforma'),
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
    is_active: z.string(). 
    min(1, 'Por favor seleccione el estado de la cuenta'),
/*     {
        required_error: "El estado es requerido",
        invalid_type_error: "El estado debe ser activo o inactivo",
    } */
    status: z.string()
    .min(1, 'Por favor seleccione la disponibilidad de la cuenta'),
    description: z.string().optional(),
});