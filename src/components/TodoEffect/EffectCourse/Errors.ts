import { Schema } from "effect";
import { TodoCourseId } from "./Schema";

/**
 * LESSON 2: Custom Tagged Errors
 *
 * One of the most powerful features of Effect is its ability to handle multiple
 * custom error types in a type-safe manner using "Tagged Errors".
 */

// 1. Defining Tagged Errors
// A "Tag" is a unique identifier (like a discriminant) that lets you
// easily identify and handle specific errors later in your program.
export class TodoNotFoundError extends Schema.TaggedError<TodoNotFoundError>()(
  "TodoNotFoundError",
  {
    id: TodoCourseId,
  }
) {}

// Example error when we fail to communicate with an external API
export class ApiConnectionError extends Schema.TaggedError<ApiConnectionError>()(
  "ApiConnectionError",
  {
    message: Schema.String,
    statusCode: Schema.Number,
  }
) {}

// 2. Composing Errors
// An Effect can fail with either of these errors.
// Effect<Value, TodoNotFoundError | ApiConnectionError, Requirements>
// This forces you to handle both cases if you want a "total" (error-free) program.
