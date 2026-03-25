import { Effect, Schema } from 'effect';

export const TodoId = Schema.String.pipe(Schema.brand('TodoId'));
export type TodoId = Schema.Schema.Type<typeof TodoId>;

export const TodoEffect = Schema.Struct({
  id: TodoId,
  name: Schema.String,
})

export type TodoEffect = Schema.Schema.Type<typeof TodoEffect>;