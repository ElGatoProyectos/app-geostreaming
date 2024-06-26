import { z } from 'zod';


export const PlatformFormSchema = z.object({
    name: z.string()
        .min(1, { message: 'El campo Plataforma es requerido' }),
    description: z.string()
        .min(1, { message: 'El campo descripción es requerido' }),
});
