import { z } from 'zod';

export const UploadFormSchema = z.object({
    file: z.string().min(1,{
        message: 'Debe seleccionar un archivo',
    }),
});
