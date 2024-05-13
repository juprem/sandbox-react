import { z } from 'zod';

export const TodoSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    id: z.string().readonly(),
    createdTime: z.string().readonly(),
});

export const TodosSchema = z.array(TodoSchema);