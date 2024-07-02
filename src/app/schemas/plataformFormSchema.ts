import { z } from 'zod';

export const PlatformFormSchema = z.object({
    id: z.number().optional(),
    name: z.string()
        .min(1, { message: 'El campo producto es requerido' }),

    price_in_cents:z.number(),
        /* .min(1, { message: 'El campo precio de consumidor es requerido' })
        .refine(value => !isNaN(Number(value)), { message: 'El campo precio del consumidor debe ser numérico' }), */

    price_distributor_in_cents: z.number(),
        /* .min(1, { message: 'El campo precio de distribuidor es requerido' })
        .refine(value => !isNaN(Number(value)), { message: 'El campo precio del distribuidor debe ser numérico' }), */

    description: z.string()
        .min(1, { message: 'El campo descripción es requerido' }),

    status: z.enum([
        "IMMEDIATE_DELIVERY", "UPON_REQUEST"
    ]).optional(),
    /* z.enum(['IMMEDIATE_DELIVERY', 'UPON_REQUEST'])
        .transform(value => value || undefined)
        .refine(
            value => value !== undefined,
            { message: 'Seleccione un tipo de producto válido' }
        ), */

    days_duration: z.number(),
        /* .min(1, { message: 'El campo precio de distribuidor es requerido' })
        .refine(value => !isNaN(Number(value)), { message: 'El campo precio del distribuidor debe ser numérico' }), */

    img_url: z.string(),

});

