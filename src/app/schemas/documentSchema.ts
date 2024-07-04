import { z } from 'zod';


export const DocumentSchema = z.object({
    file: z.any(),

});
