import { z } from 'zod';


export const productFormSchema = z.object({
    platform_id: z.string()
        .min(1, { message: 'El campo plataforma es requerido' }),
    name: z.string()
        .min(1, { message: 'El campo producto es requerido' }),
    price_in_cents: z.string()
        .min(1, { message: 'El campo precio de consumidor es requerido' })
        .refine(value => !isNaN(Number(value)), { message: 'El campo precio del consumidor debe ser numérico' }),
    price_distributor_in_cents: z.string()
        .min(1, { message: 'El campo precio de distribuidor es requerido' })
        .refine(value => !isNaN(Number(value)), { message: 'El campo precio del distribuidor debe ser numérico' }),
    description: z.string()
        .min(1, { message: 'El campo descripción es requerido' }),
    status: z.enum(['IMMEDIATE_DELIVERY', 'UPON_REQUEST'])
        .refine(
            value => value !== undefined,
            { message: 'Seleccione un tipo de producto válido' }
        ),
});

