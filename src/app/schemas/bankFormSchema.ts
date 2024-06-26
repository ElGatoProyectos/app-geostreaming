import { z } from 'zod';


export const BankFormSchema = z.object({
    bank: z.string()
        .min(1, { message: 'El campo banco es requerido' }),
    number: z.string()
        .min(1, { message: 'El campo número de cuenta es requerido' }),
    name: z.string()
        .min(1, { message: 'El campo nombre es requerido' }),
    type: z.string()
        .min(1, { message: 'El campo tipo es requerido' }),
});
