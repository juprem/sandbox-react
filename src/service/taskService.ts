import { fetchService } from './fetchService.ts';
import { Task, TaskSchema, TasksSchema } from '../model/TaskModel.ts';

export function taskService() {
    const { getQuery, putQuery } = fetchService();

    async function getTaskByTodo(todoId: string) {
        return await getQuery(`/todos/${todoId}/tasks`, TasksSchema);
    }

    async function putTask(task: Task) {
        const { id, ...updateTask } = task;
        return await putQuery(`/tasks/${id}`, updateTask, TaskSchema);
    }

    return { getTaskByTodo, putTask };
}
