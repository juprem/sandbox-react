import { z } from 'zod';

export const Priority = [
    { value: 'LOW', label: 'Basse' },
    { value: 'MEDIUM', label: 'Moyenne' },
    { value: 'HIGH', label: 'Haute' },
];

export const TodoSchema = z.object({
    name: z.string(),
    description: z.string().optional().nullable(),
    id: z.string().readonly(),
    createdTime: z.string().readonly(),
    dueDate: z.string(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    isArchived: z.boolean(),
    isDone: z.boolean().readonly(),
    tags: z.array(z.string()),
});

export type Todo = z.infer<typeof TodoSchema>;
export const TodosSchema = z.array(TodoSchema);

export const TodoCreateSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    dueDate: z.string().datetime(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    tags: z.array(z.string()),
});

export type TodoCreate = z.infer<typeof TodoCreateSchema>;
