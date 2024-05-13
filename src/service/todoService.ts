import { fetchService } from './fetchService.ts';
import { TodoSchema, TodosSchema } from '../model/TodoModel.ts';

export function todoService() {
    const { getQuery } = fetchService();
    async function getTodoById(id: string) {
        const todo = await getQuery(`/todos/${id}`);

        return TodoSchema.parse(todo);
    }

    async function getTodos() {
        const todos = await getQuery(`/todos`);

        return TodosSchema.parse(todos);
    }

    return { getTodoById, getTodos };
}
