import { z } from 'zod';

export const TaskSchema = z.object({
    id: z.string().readonly(),
    done: z.boolean(),
    name: z.string().max(32),
    description: z.string().max(512),
});

export const TasksSchema = z.array(TaskSchema);
export type Task = z.infer<typeof TaskSchema>;

export type TaskUpdate = Omit<z.infer<typeof TaskSchema>, 'id'>;
