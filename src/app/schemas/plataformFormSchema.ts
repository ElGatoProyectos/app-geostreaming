import { z } from "zod";

export const PlatformFormSchema = z.object({
      id: z.number().optional(),
      name: z.string().min(1, { message: "El campo producto es requerido" }),

      price_in_cents: z.number({
            required_error: 'El campo precio de consumidor es requerido',
            invalid_type_error: 'El campo debe ser numérico'
      }),
      price_distributor_in_cents: z.number({
            required_error: 'El campo precio de distribuidor es requerido',
            invalid_type_error: 'El campo debe ser numérico'
      }),
      description: z
            .string()
            .min(1, { message: "El campo descripción es requerido" })
            .max(500, {message: 'El máximo de caracteres es 1000'}),

      status: z.union([
            z.enum(["IMMEDIATE_DELIVERY", "UPON_REQUEST"]),
            z.literal("")
          ])
      .refine(
            (val) => val === undefined || ["IMMEDIATE_DELIVERY", "UPON_REQUEST"].includes(val),
            { message: 'El estado debe ser "entrega inmediata" o "a pedido"' }
          ),
      /* z.enum(['IMMEDIATE_DELIVERY', 'UPON_REQUEST'])
            .transform(value => value || undefined)
            .refine(
                value => value !== undefined,
                { message: 'Seleccione un tipo de producto válido' }
            ), */

      days_duration: z.number({
            required_error: 'El campo días de duración es requerido',
            invalid_type_error: 'El campo debe ser numérico'
      }),
      /* .min(1, { message: 'El campo precio de distribuidor es requerido' })
            .refine(value => !isNaN(Number(value)), { message: 'El campo precio del distribuidor debe ser numérico' }), */

      img_url: z.string()
      .min(1, { message: 'El campo imagen del logo es requerido'}),
});
