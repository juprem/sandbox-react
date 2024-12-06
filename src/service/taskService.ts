import { fetchService } from './fetchService';
import { Task, TaskSchema, TasksSchema } from '@model/TaskModel';

export function taskService() {
    const { getQuery, putQuery } = fetchService();

    async function getTaskByTodo(todoId: string) {
        return await getQuery(`/tasks/todo/${todoId}`, TasksSchema);
    }

    async function putTask(task: Task) {
        const { id, ...updateTask } = task;
        return await putQuery(`/tasks/${id}`, updateTask, TaskSchema);
    }

    return { getTaskByTodo, putTask };
}
