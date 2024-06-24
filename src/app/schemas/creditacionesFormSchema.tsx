import { z } from 'zod';


export const creditacionesFormSchema = z.object({
    number: z.string()
        .min(1, { message: 'El campo numero de comprobante es requerido' }),
    valor: z.string()
        .min(1, { message: 'El campo valor es requerido' }),
    date: z.string()
        .min(1, { message: 'El campo fecha es requerido' })
});
