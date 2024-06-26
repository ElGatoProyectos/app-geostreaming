import { z } from 'zod';


export const getProductFormSchema = z.object({
    email: z.string()
        .min(1, { message: 'El campo email es requerido' }),

});
