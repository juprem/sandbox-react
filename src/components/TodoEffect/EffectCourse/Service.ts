import { Context, Effect, Layer } from "effect";
import { CreateTodo, Todo, TodoCourseId } from "./Schema";
import { TodoNotFoundError, ApiConnectionError } from "./Errors";

/**
 * LESSON 3: Services & Dependency Injection
 *
 * Services in Effect are represented by "Tags", which act as unique identifiers
 * for an interface or class. This allows for easy swapping of implementations
 * (e.g., in tests or for different environments).
 */

// 1. Defining the Service Interface (Tag)
// This is the abstract definition of what the service does.
export class TodoApi extends Context.Tag("TodoApi")<
  TodoApi,
  {
    readonly getTodos: Effect.Effect<readonly Todo[], ApiConnectionError>;
    readonly getTodoById: (id: TodoCourseId) => Effect.Effect<Todo, TodoNotFoundError | ApiConnectionError>;
    readonly createTodo: (todo: CreateTodo) => Effect.Effect<Todo, ApiConnectionError>;
    readonly toggleTodo: (id: TodoCourseId) => Effect.Effect<Todo, TodoNotFoundError | ApiConnectionError>;
  }
>() {}

// 2. Defining an Implementation (Layer)
// This is a concrete implementation of the TodoApi service.
// This layer could be used in production.
export const TodoApiLive = Layer.succeed(
  TodoApi,
  TodoApi.of({
    getTodos: Effect.succeed([]), // Replace with actual API call (e.g., using fetch)
    getTodoById: (id) =>
      Effect.fail(new TodoNotFoundError({ id })), // Example failure
    createTodo: (todo) =>
      Effect.succeed({
        ...todo,
        id: TodoCourseId.make(Math.random().toString()),
        createdAt: new Date(),
      }),
    toggleTodo: (_id) =>
      Effect.fail(new ApiConnectionError({ message: "Network error", statusCode: 500 })),
  })
);

// 3. Defining a Mock Implementation for Testing
// This makes it extremely easy to test components by swapping the real API for a mock.
export const TodoApiTest = Layer.succeed(
  TodoApi,
  TodoApi.of({
    getTodos: Effect.succeed([{ id: TodoCourseId.make("1"), title: "Test Todo", completed: false, createdAt: new Date() }]),
    getTodoById: (id) => Effect.succeed({ id, title: "Test Todo", completed: false, createdAt: new Date() }),
    createTodo: (todo) => Effect.succeed({ ...todo, id: TodoCourseId.make("2"), createdAt: new Date() }),
    toggleTodo: (id) => Effect.succeed({ id, title: "Test Todo", completed: true, createdAt: new Date() }),
  })
);
