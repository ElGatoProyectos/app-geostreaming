import { z } from 'zod';

export const BankFormSchema = z.object({
    id: z.number().optional(),
    bank: z.string()
        .min(1, { message: 'El campo banco es requerido' }),
    number: z.string()
        .min(1, { message: 'El campo número de cuenta es requerido' }),
    name: z.string()
        .min(1, { message: 'El campo nombre del titular es requerido' }),
    type: z.string()
        .min(1, { message: 'El campo tipo es requerido' }),
    bank_url: z.string(),
    
});

/* const schema = z.object({
    file: z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
      message: File size should be less than ${MAX_FILE_SIZE / 1024 / 1024}MB,
    }),
  }); */