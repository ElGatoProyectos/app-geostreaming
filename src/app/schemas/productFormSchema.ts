import { z } from 'zod';


export const productFormSchema = z.object({
    id: z.string()
        .min(1, { message: 'El campo id es requerido' }),
    platform_id: z.string()
        .min(1, { message: 'El campo plataforma es requerido'}),
    name: z.string()
        .min(1, { message: 'El campo producto es requerido' }),
    price_in_cents: z.string()
        .min(1, { message: 'El campo precio de consumidor es requerido' }),
    price_distributor_in_cents: z.string()
        .min(1, { message: 'El campo precio de distribuidor es requerido' }),
    description: z.string()
        .min(1, { message: 'El campo descripción es requerido' }),


});

