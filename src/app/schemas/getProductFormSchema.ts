import { z } from 'zod';


export const getProductFormSchema = z.object({
    country_code: z.string()
    .min(1, {message: 'Seleccione el código de su país'}),
    phone: z.string()
        .regex(/^\d+/, { message: 'El número debe ser numérico' }),

});
