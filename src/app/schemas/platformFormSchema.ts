import { z } from 'zod';


export const PlatformFormSchema = z.object({
    img_url: z.string()
    .min(1, { message: 'El campo imagen es requerido' }),
    name: z.string()
        .min(1, { message: 'El campo plataforma es requerido' }),
    description: z.string()
        .min(1, { message: 'El campo descripción es requerido' }),
});
