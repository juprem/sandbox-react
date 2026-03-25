import { Effect, Array, Console } from "effect";
import { TodoApi } from "./Service";
import { TodoCourseId } from "./Schema";

/**
 * LESSON 4: Business Logic & Generators
 *
 * Effect.gen is the preferred way to write programs in Effect. It uses generator
 * syntax (yield*) to handle effects, errors, and requirements in a sequential,
 * readable manner.
 */

// 1. Fetching All Todos
export const fetchAllTodos = Effect.gen(function* () {
  // Access the TodoApi service
  const api = yield* TodoApi;

  // Log to console (Effect's version of console.log)
  yield* Console.log("Fetching todos...");

  // Call the service method
  const todos = yield* api.getTodos;

  return todos;
});

// 2. Fetching and Filtering Todos
// Demonstrates how to combine multiple effects and transformations.
export const getCompletedTodos = Effect.gen(function* () {
  const todos = yield* fetchAllTodos;
  return Array.filter(todos, (todo) => todo.completed);
});

// 3. Handling Specific Errors with .catchTag
// This is how you catch a specific error (by its "tag") and provide a recovery.
export const safeGetTodoById = (id: TodoCourseId) =>
  Effect.gen(function* () {
    const api = yield* TodoApi;
    return yield* api.getTodoById(id);
  }).pipe(
    Effect.catchTag("TodoNotFoundError", (error) => {
      // Return a default value or handle the error gracefully
      return Effect.succeed({
        id: error.id,
        title: "Placeholder",
        completed: false,
        createdAt: new Date(),
      });
    })
  );

// 4. Parallel Effects (zip)
// You can run effects in parallel easily.
export const fetchMultipleByIds = (ids: TodoCourseId[]) =>
  Effect.all(
    ids.map((id) => safeGetTodoById(id)),
    { concurrency: "unbounded" } // Run all in parallel without limits
  );
