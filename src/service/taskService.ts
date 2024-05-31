import { fetchService } from './fetchService.ts';
import { Task, TaskSchema, TasksSchema } from '../model/TaskModel.ts';

export function taskService() {
    const { getQuery, putQuery } = fetchService();

    async function getTaskByTodo(todoId: string) {
        const tasks = await getQuery(`/todos/${todoId}/tasks`);

        return TasksSchema.parse(tasks);
    }

    async function putTask(task: Task) {
        const { id, ...updateTask } = task;
        const updatedTask = await putQuery(`/tasks/${id}`, updateTask);

        return TaskSchema.parse(updatedTask);
    }

    return { getTaskByTodo, putTask };
}
