import { z } from 'zod';


export const AfiliadosFormSchema = z.object({
    id: z.string()
        .min(1, { message: 'El campo id es requerido' }),
    name: z.string()
        .min(1, { message: 'El campo nombre es requerido' }),
    email: z.string()
        .min(1, { message: 'El campo correo es requerido' }),
    phone: z.string()
        .min(1, { message: 'El campo número celular es requerido' }),
});
