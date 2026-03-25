import { Effect } from "effect";
import { TodoApiLive, TodoApiTest } from "./Service";
import { fetchAllTodos } from "./Repository";

/**
 * LESSON 5: Running the Program & Providing Requirements
 *
 * An Effect is just a description of a program. To actually execute it,
 * we must:
 * 1. Provide any required services (using Layers).
 * 2. Run the Effect (e.g., using Effect.runPromise).
 */

// 1. A Program that requires TodoApi
const myProgram = fetchAllTodos;

// 2. Running with the Live implementation (Production)
export const runProduction = () => {
  // .pipe(Effect.provide(TodoApiLive)) resolves the 'TodoApi' requirement.
  const programWithService = myProgram.pipe(Effect.provide(TodoApiLive));

  // Run as a Promise
  return Effect.runPromise(programWithService)
    .then((todos) => console.log("Production Todos:", todos))
    .catch((error) => console.error("Production Error:", error));
};

// 3. Running with the Test implementation (Testing)
export const runTest = () => {
  // Using the Mock implementation instead
  const programWithTestService = myProgram.pipe(Effect.provide(TodoApiTest));

  return Effect.runPromise(programWithTestService)
    .then((todos) => console.log("Test Todos:", todos))
    .catch((error) => console.error("Test Error:", error));
};

/**
 * SUMMARY:
 *
 * This structure separates concerns cleanly:
 * - Data definition (Schema)
 * - Error types (Errors)
 * - Service definitions (Service Tags)
 * - Implementations (Service Layers)
 * - Business logic (Repository Effects)
 *
 * This makes the application highly testable, type-safe, and easy to maintain.
 */
