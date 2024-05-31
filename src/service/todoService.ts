import { fetchService } from './fetchService.ts';
import { TodoCreate, TodoSchema, TodosSchema } from '../model/TodoModel.ts';

export function todoService() {
    const { getQuery, postQuery } = fetchService();
    async function getTodoById(id: string) {
        const todo = await getQuery(`/todos/${id}`);

        return TodoSchema.parse(todo);
    }

    async function getTodos() {
        const todos = await getQuery(`/todos`);

        return TodosSchema.parse(todos);
    }

    async function postTodo(todoCreate: TodoCreate) {
        const todo = await postQuery('/todos', todoCreate)

        return TodoSchema.parse(todo)
    }

    return { getTodoById, getTodos, postTodo };
}
