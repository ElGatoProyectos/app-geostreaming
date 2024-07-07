import { z } from 'zod';


export const creditacionesFormSchema = z.object({

    number: z.string()
        .min(1, { message: 'El campo número de comprobante es requerido' })
        .regex(/^\d+/, { message: 'El campo número de comprobante debe ser numérico' }),
    /*  file: z.any(), */
    voucher_url: z.string().optional(),
    /* .min(1, {message: 'El campo file '}) */
    /*  .min(1, { message: 'El campo foto del comprobante es requerido' }), */
    value: z.string()
        .min(1, { message: 'El campo valor es requerido' })
        .refine(value => !isNaN(Number(value)), { message: 'El campo valor debe ser numérico' }),
    date: z.any()
        .refine(
            (val) => {
                // Intenta crear una fecha a partir del valor
                const date = new Date(val);
                // Comprueba si la fecha es válida
                return !isNaN(date.getTime());
            }, { message: "El campo debe ser una fecha válida" }
        )/* z.string()
        .min(1, { message: 'El campo fecha es requerido' })
        .refine(date => !isNaN(Date.parse(date)), { message: 'El campo fecha debe ser una fecha válida' }), */
});
