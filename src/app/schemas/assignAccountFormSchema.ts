import { z } from 'zod';


export const AssignAccountFormSchema = z.object({
    account: z.string()
    .min(1, { message: 'Seleccione una cuenta por favor'})
});
