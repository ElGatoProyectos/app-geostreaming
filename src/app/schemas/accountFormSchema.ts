import { z } from 'zod';


export const AccountFormSchema = z.object({
    email: z.string()
        .min(1, { message: 'El campo correo es requerido' })
        .email({ message: 'Formato de email incorrecto | ejemplo@gmail.com' }),

});
