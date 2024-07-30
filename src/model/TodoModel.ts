import { z } from 'zod';

export const TodoSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    id: z.string().readonly(),
    createdTime: z.string().readonly(),
});

export type Todo = z.infer<typeof TodoSchema>;
export const TodosSchema = z.array(TodoSchema);

export const TodoCreateSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
});

export type TodoCreate = z.infer<typeof TodoCreateSchema>;
