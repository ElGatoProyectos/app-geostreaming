import { z } from 'zod';


export const accountFormSchema = z.object({
    id: z.string()
        .min(1, { message: 'El campo id es requerido' }),
    name: z.string()
        .min(1, { message: 'El campo nombre es requerido' }),
    number_account: z.string()
        .min(1, { message: 'El campo numero de cuenta es requerido' }),
});
