import { z } from 'zod';


export const roleEditSchema = z.object({
    role: z.string()
    .min(1, {message: 'Seleccione un rol'}),
    enabled: z.union([
        z.enum(["y", "n"]),
        z.literal("")
      ])
  .refine(
        (val) => val === undefined || ["y", "n"].includes(val),
        { message: 'El estado debe ser "activo" o "inactivo"' }
      ),
});
