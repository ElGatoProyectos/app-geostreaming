import { z } from 'zod';
const MAX_FILE_SIZE = 0.5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

export const BankFormSchema = z.object({

    bank: z.string()
        .min(1, { message: 'El campo banco es requerido' }),
    number: z.string()
        .min(1, { message: 'El campo número de cuenta es requerido' }),
    name: z.string()
        .min(1, { message: 'El campo nombre del titular es requerido' }),
    type: z.string()
        .min(1, { message: 'El campo tipo es requerido' }),
    /* img_url: z.instanceof(File, { message: 'El archivo es requerido' }) */
    /* img_url:z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
            message: `El archivo no debe pesar más de  ${MAX_FILE_SIZE / 1024 / 1024}MB`,
        })
    }) */
    img_url:z.instanceof
        (File).refine((file) => file.size <= MAX_FILE_SIZE, 
        { message: 'El máximo de la imagen es de 10MB'}
    )
   /*  .refine(
        (file) => file.size <= MAX_FILE_SIZE, 
        { message: 'El máximo de la imagen es de 10MB'}
    ) */
    /* .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), { message: 'El archivo debe ser un tipo de imagen válido (jpg, jpeg, png).' }) */
});

/* const schema = z.object({
    file: z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
      message: File size should be less than ${MAX_FILE_SIZE / 1024 / 1024}MB,
    }),
  }); */