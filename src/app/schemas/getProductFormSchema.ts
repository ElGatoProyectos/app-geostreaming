import { z } from 'zod';


export const getProductFormSchema = z.object({
    platform_id: z.number(),

});
