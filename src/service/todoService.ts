import { fetchService } from './fetchService.ts';
import { TodoCreate, TodoSchema, TodosSchema } from '../model/TodoModel.ts';

export function todoService() {
    const { getQuery, postQuery } = fetchService();

    async function getTodoById(id: string) {
        return await getQuery(`/todos/${id}`, TodoSchema);
    }

    async function getTodos() {
        return await getQuery(`/todos`, TodosSchema);
    }

    async function postTodo(todoCreate: TodoCreate) {
        return await postQuery('/todos', todoCreate, TodoSchema)
    }

    return { getTodoById, getTodos, postTodo };
}
