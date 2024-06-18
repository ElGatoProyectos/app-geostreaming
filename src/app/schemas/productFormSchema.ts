import { z } from 'zod';


export const productFormSchema = z.object({
    id: z.string()
        .min(1, { message: 'El campo id es requerido' }),
    producto: z.string()
        .min(1, { message: 'El campo categoria es requerido' }),
    precio_consumidor: z.string()
        .min(1, { message: 'El campo precio de consumidor es requerido' }),
    precio_distribuidor: z.string()
        .min(1, { message: 'El campo precio de distribuidor es requerido' }),
    descripcion: z.string()
        .min(1, { message: 'El campo descripcion es requerido' }),


});

