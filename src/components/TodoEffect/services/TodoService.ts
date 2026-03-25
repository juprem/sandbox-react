import { Context, Effect, Schema } from 'effect';
import { TodoEffect, TodoId } from '../models/Todo';
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '../../../integrations/trpc/react';

class TodoService extends Context.Tag('TodoService')<
  TodoService,
  {
    readonly getAll: Effect.Effect<TodoEffect[]>;
  }
>() {}

const getAllTodo = Effect.gen(function* () {
  const api = yield* TodoService;
  const allTodo = yield* api.getAll;

  return allTodo;
});

const runnableGetAllTodo = Effect.provideService(getAllTodo, TodoService, {
  getAll: Effect.sync(() => [{ id: TodoId.make('id'), name: 'Title' }]),
});

export const useGetAllTodo = () => {
  const trpc = useTRPC();

  return useQuery({
    queryKey: ['getAllTodo'],
    queryFn: () => Effect.runPromise(runnableGetAllTodo),
  });
};
