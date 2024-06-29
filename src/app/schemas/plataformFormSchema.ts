import { z } from 'zod';

const MAX_FILE_SIZE = 1000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

export const PlatformFormSchema = z.object({
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
    .transform(value => value || undefined)
        .refine(
            value => value !== undefined,
            { message: 'Seleccione un tipo de producto válido' }
        ),
    days_duration: z.string()
    .min(1, { message: 'El campo precio de distribuidor es requerido' })
    .refine(value => !isNaN(Number(value)), { message: 'El campo precio del distribuidor debe ser numérico' }),
    img_url: z.any() /* z.instanceof(File, { message: 'El archivo es requerido' })
        .refine(
            (file) => file instanceof File,
            { message: 'El archivo debe ser una imagen.' }
        )
        .refine(
            (file) => file.size <= MAX_FILE_SIZE,
            { message: 'El máximo de la imagen es de 10MB' }
        )
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), { message: 'El archivo debe ser un tipo de imagen válido (jpg, jpeg, png).' }),
        account: z.number()
        .refine(
            value => value !== undefined,
            { message: 'Seleccione un tipo de producto válido' }
        ), */
});

