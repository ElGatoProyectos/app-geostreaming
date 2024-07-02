import { z } from 'zod';


export const AfiliadosFormSchema = z.object({
    /* id: z.string()
        .min(1, { message: 'El campo id es requerido' }),
    name: z.string()
        .min(1, { message: 'El campo nombre es requerido' }),
    email: z.string()
        .min(1, { message: 'El campo correo es requerido' }),
    phone: z.string()
        .min(1, { message: 'El campo número celular es requerido' }), */
        email: z.string()
        .email({ message: 'Formato de email incorrecto | ejemplo@gmail.com' }),
    full_name: z
        .string()
        .min(3, {
            message: 'El nombre y apellido es requerido'
        }),
        phone: z.string()
        .regex(/^\d+/, { message: 'El número de celular debe ser numérico' }),
    dni: z.string().optional(),
/*     dni: z.string()
    .regex(/^\d+$/, {
        message: 'El documento de identidad  debe ser numérico'
    })
    .min(1, { message: 'El documento de identidad es requerido ' }), */
    country_code: z.string(),
    password: z.string(),
});
