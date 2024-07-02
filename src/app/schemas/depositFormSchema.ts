import { z } from 'zod';


export const DepositFormSchema = z.object({
    value: z.number()
        .min(1, { message: 'El campo valor es requerido' })
});
