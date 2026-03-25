import { Schema } from "effect";

/**
 * LESSON 1: Models & Schemas
 *
 * Effect.Schema provides a powerful way to define and validate data structures.
 * It's similar to Zod but fully integrated with the Effect ecosystem.
 */

// 1. Defining a Branded Type for TodoId
// Branded types prevent us from accidentally using a plain string as a TodoId.
export const TodoCourseId = Schema.String.pipe(Schema.brand("TodoId"));
export type TodoCourseId = Schema.Schema.Type<typeof TodoCourseId>;

// 2. Defining the Todo Structure
// Schema.Struct is used to define an object with specified properties.
export const Todo = Schema.Struct({
  id: TodoCourseId,
  title: Schema.String.pipe(Schema.nonEmptyString()), // Extra validation: title cannot be empty
  completed: Schema.Boolean,
  createdAt: Schema.Date,
});

// Extract the TypeScript type from the Schema
export type Todo = Schema.Schema.Type<typeof Todo>;

// 3. Derived Schemas
// Schema.omit allows us to create a new schema by removing fields.
// Useful for 'CreateTodo' payloads where the 'id' and 'createdAt' are generated server-side.
export const CreateTodo = Todo.pipe(Schema.omit("id", "createdAt"));
export type CreateTodo = Schema.Schema.Type<typeof CreateTodo>;

// 4. Schema Utilities: Validation Example
// You can use these schemas to decode/encode data.
export const validateTodo = Schema.decodeUnknownSync(Todo);
// Usage: const myTodo = validateTodo({ id: "123", title: "Buy milk", completed: false, createdAt: new Date() });

// 5. Discriminant
export const Circle = Schema.Struct({
  type: Schema.Literal("circle"),
  radius: Schema.Number,
})

export const Square = Schema.Struct({
  type: Schema.Literal("square"),
  side: Schema.Number,
})

export const Shape = Schema.Union(Square, Circle)

export type Shape = Schema.Schema.Type<typeof Shape>;
