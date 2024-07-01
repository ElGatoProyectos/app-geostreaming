import { z } from 'zod';


export const creditacionesFormSchema = z.object({
    number: z.string()
        .min(1, { message: 'El campo número de comprobante es requerido' }),
    voucher_url: z.string()
        .min(1, { message: 'El campo foto del comprobante es requerido' }),
    value: z.string()
        .min(1, { message: 'El campo valor es requerido' })
        .refine(value => !isNaN(Number(value)), { message: 'El campo valor debe ser numérico' }),
    date: z.string()
        .min(1, { message: 'El campo fecha es requerido' })
        .refine(date => !isNaN(Date.parse(date)), { message: 'El campo fecha debe ser una fecha válida' }),
});
