import { z } from 'zod';


export const categoryFormSchema = z.object({
    category: z.string()
        .min(1, { message: 'El campo categoria es requerido' }),
    id: z.string()
        .min(1, { message: 'El campo id es requerido' })
});
