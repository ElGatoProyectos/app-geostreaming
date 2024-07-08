import { z } from 'zod';


export const AlertFormSchema = z.object({
    description: z.string().min(1, {message: 'La descripción es requerida'}),
});
