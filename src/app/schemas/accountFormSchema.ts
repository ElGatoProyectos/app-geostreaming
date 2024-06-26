import { z } from 'zod';


export const AccountFormSchema = z.object({
    bank: z.string()
        .min(1, { message: 'El campo banco es requerido' }),
    number: z.string()
        .min(1, { message: 'El campo numero de cuenta es requerido' }),
    name: z.string()
        .min(1, { message: 'El campo nombre es requerido' }),
    type: z.string()
        .min(1, { message: 'El campo tipo es requerido' }),
});
/* 
export const accountFormSchema = z.object({
    id: z.string()
        .min(1, { message: 'El campo id es requerido' }),
    email: z.string()
        .min(1, { message: 'El campo nombre es requerido' }),
    password: z.string()
        .min(1, { message: 'El campo numero de cuenta es requerido' }),
    pin: z.string()
        .min(1, { message: 'El campo numero de cuenta es requerido' }),
    numb_profiles: z.string()
        .min(1, { message: 'El campo numero de cuenta es requerido' }),
    numb_day_durations: z.string()
        .min(1, { message: 'El campo numero de cuenta es requerido' }),
    status: z.string()
        .min(1, { message: 'El campo numero de cuenta es requerido' }),
    platform_id: z.string()
        .min(1, { message: 'El campo numero de cuenta es requerido' }),
    user_id: z.string()
        .min(1, { message: 'El campo numero de cuenta es requerido' }),
});
 */