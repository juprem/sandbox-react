import { useQuery, useMutation, useQueryClient, queryOptions } from "@tanstack/react-query";
import { Effect } from "effect";
import { TodoApiLive } from "./Service";
import { fetchAllTodos } from "./Repository";
import { CreateTodo, TodoCourseId, Todo } from "./Schema";
import { TodoApi } from "./Service";

/**
 * LESSON 6: Integration with TanStack Query
 *
 * To use Effect with TanStack Query, we need to bridge the Effect world
 * (which uses functional patterns) with the Promise-based world of TanStack Query.
 *
 * The key is to use 'Effect.runPromise' to execute the program.
 */

// 1. Defining Query Keys (Following project convention)
export const todoKeys = {
  all: ["todos"] as const,
  detail: (id: TodoCourseId) => [...todoKeys.all, id] as const,
};

// 2. Query Options using Effect
// We provide the required Layer (TodoApiLive) before running the program.
export const getTodosQueryOptions = () =>
  queryOptions({
    queryKey: todoKeys.all,
    queryFn: () =>
      fetchAllTodos.pipe(
        Effect.provide(TodoApiLive), // Provide the required service
        Effect.runPromise            // Execute and return a Promise
      ),
  });

// 3. Custom Hook for Fetching
export const useGetTodos = () => {
  return useQuery(getTodosQueryOptions());
};

// 4. Mutation Hook using Effect
export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTodo: CreateTodo) =>
      Effect.gen(function* () {
        const api = yield* TodoApi;
        return yield* api.createTodo(newTodo);
      }).pipe(
        Effect.provide(TodoApiLive),
        Effect.runPromise
      ),
    onSuccess: (todo: Todo) => {
      // Standard TanStack Query cache invalidation
      queryClient.invalidateQueries({ queryKey: todoKeys.all });
      console.log(`Todo "${todo.title}" created successfully!`);
    },
    onError: (error) => {
      // Since 'Effect.runPromise' rejects if the Effect fails,
      // TanStack Query catches the error here.
      console.error("Failed to create todo:", error);
    },
  });
};

/**
 * ADVANCED: Centralized Runtime with ManagedRuntime
 *
 * In larger applications, manually providing layers in every hook is repetitive
 * and error-prone. Instead, we can create a 'ManagedRuntime' that holds all
 * our production services.
 */
import { ManagedRuntime } from "effect";

// 1. Create a centralized runtime for the app
// This runtime is pre-configured with the 'TodoApiLive' layer.
export const AppRuntime = ManagedRuntime.make(TodoApiLive);

// 2. Simplified Query using the runtime
// We no longer need '.pipe(Effect.provide(TodoApiLive))' in every query function.
export const getTodosWithRuntime = () =>
  queryOptions({
    queryKey: todoKeys.all,
    queryFn: () => AppRuntime.runPromise(fetchAllTodos),
  });

// 3. Shared React Context (Conceptual)
/**
 * In a real React application, you would ideally:
 * 1. Create the AppRuntime at the top level.
 * 2. Pass it through a React Context.
 * 3. Use a 'useRuntime' hook to get the runtime and execute your Effects.
 *
 * This allows for easy swapping of the runtime (e.g., using a TestRuntime
 * for integration tests of the entire UI tree).
 */
