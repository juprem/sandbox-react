import { z } from 'zod';

export const FormTypeSchema = z.object({
    name: z.string(),
    incr: z.number(),
});

export type FormType = z.infer<typeof FormTypeSchema>