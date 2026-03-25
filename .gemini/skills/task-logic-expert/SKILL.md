---
name: task-logic-expert
description: Use this skill whenever implementing business logic, defining tRPC procedures, managing TanStack Query data flows, or handling optimistic UI updates. It ensures a robust, type-safe, and performant data layer using tRPC and Drizzle ORM.
---

# Task Logic Expert (tRPC + Axios Edition)

This skill guides the implementation of core business logic, data persistence, and synchronization using tRPC (with Axios for the transport layer) and TanStack Query.

## Why this architecture?
- **tRPC**: Provides end-to-end type safety, eliminating runtime errors between client and server.
- **Drizzle ORM**: Offers a lightweight, type-safe, and SQL-like experience, making schema management and query construction highly predictable and efficient.
- **TanStack Query**: Manages caching, background updates, and state synchronization, significantly simplifying data fetching and state management.
- **Optimistic UI**: Improves perceived performance by updating the UI instantly and reconciling with the server in the background.

## Component Structure
ALWAYS use the following structure for logic-heavy components to ensure clear separation of concerns:

```tsx
interface ComponentProps {
    // Strictly typed props
}

export function Component({ ... }: ComponentProps) {
    // 1. Data Fetching (useQuery, useMutation)
    // 2. Local State & Handlers
    // 3. Mutation Lifecycle (Optimistic Updates)

    return (
        <>{/* 4. JSX UI */}</>
    )
}
```

## Workflow

### 1. tRPC Procedures (Server-Side)
- Define procedures in `src/server/trpc/routers`.
- Use `zod` for input validation.
- Differentiate between `publicProcedure` and `protectedProcedure`.
- Use `db` (Drizzle) directly within procedures via `ctx.db`.

### 2. tRPC + TanStack Query (Client-Side)
- Use `createTRPCReact<AppRouter>()` in `src/utils/trpc.ts`.
- Wrap the app in `trpc.Provider` and `QueryClientProvider` in `src/integrations/tanstack-query/root-provider.tsx`.
- Use `trpc.useMutation()` and `trpc.useQuery()`.

### 3. Optimistic UI Updates
- Use the query client via `trpc.useUtils()` to update the cache instantly.
- Snapshot previous data and roll back on error.
- Follow the mutation lifecycle: `onMutate` -> `onError` -> `onSettled`.


### 4. Query Key Management
- **Prioritize tRPC Automatic Keys**: Use `trpc.useUtils()` (or `trpc.getContext()` in older versions) for all cache interactions (invalidation, optimistic updates, data fetching). tRPC handles query key generation automatically based on the procedure path.
- **Manual Key Factory Fallback**: Only use a manual query key factory (e.g., `src/utils/query-keys.ts`) if the project does NOT use tRPC for its data layer. In such cases, strictly follow the factory pattern to ensure consistency.
- **Integration**: If integrating tRPC with external libraries that require raw query keys, use the `getQueryKey` helper provided by `@trpc/react-query` to ensure alignment with tRPC's internal state.

### 4. TanStack Start + tRPC Stability
- **Fresh Response Mandate**: When implementing tRPC API handlers in TanStack Start (e.g., `src/routes/api.trpc.$.ts`), ALWAYS read the response as text and return a NEW `Response` object. This prevents "Response body object should not be disturbed or locked" errors by ensuring the stream is not shared or locked by the adapter.
    ```typescript
    const body = await response.text();
    return new Response(body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
    ```

### 5. Driver Constraints (Neon HTTP)
- **No Interactive Transactions**: The `neon-http` driver (`drizzle-orm/neon-http`) DOES NOT support interactive transactions (`db.transaction(async (tx) => ...)`). Attempting to use them will throw an error.
- **Alternatives**:
    - Use `db.batch([...])` for multiple independent queries that don't depend on each other's results.
    - Use **Sequential Queries** for logic where subsequent steps depend on the result of a previous query (e.g., creating a record and then using its ID to create related records).
- **Error Handling**: When using sequential queries, implement robust `try/catch` blocks and manual "rollback" logic if necessary (e.g., deleting the first record if the second fails).

### 6. Resilience: "Primary Action First"
- **Mission Criticality**: Always prioritize the user's primary intent (e.g., creating a task) over secondary background tasks (e.g., updating XP, logging analytics).
- **Safe Execution**: Wrap secondary, non-blocking logic in its own `try/catch` block within the mutation or procedure. A failure in gamification should NEVER prevent the successful completion of a task creation or update.
    ```typescript
    const result = await db.insert(...);
    try {
      await processSecondaryLogic(userId, ...);
    } catch (e) {
      console.error('Secondary logic failed:', e);
    }
    return result;
    ```

## Examples

**Example 1: Creating a Task with Optimistic UI**
**Input:** "Implement a mutation to add a new task with instant feedback."
**Output:** Uses `trpc.useMutation` with an `onMutate` block to update the query cache immediately, providing a seamless user experience.

**Example 2: Safe Sequential Creation (Neon HTTP)**
**Input:** "Create a task and its subtasks using the neon-http driver."
**Output:** Uses sequential `await db.insert` calls instead of a transaction, with error logging and a safe call to gamification logic.

## Guidelines
- **No 'any'**: The use of `any` is strictly forbidden. Use proper TypeScript interfaces, Drizzle types (`InferSelectModel`), or tRPC `RouterOutputs`.
- **No 'as' assertions**: The use of `as` for type casting is forbidden. Use `satisfies` or proper type inference to ensure compile-time safety.
- **Services Folder**: All tRPC mutations and complex logic must be encapsulated in a `services/` folder using custom hooks.
- **Granular Service Hooks**: Prefer individual hooks for each mutation (e.g., `useTaskCreate`, `useTaskUpdate`) instead of a single monolithic hook. Consuming components should use the spread object structure for better clarity: `const { mutate: doAction, isPending } = useActionHook()`.
- **Small Components**: Keep components small and readable. Extract sub-components to improve maintainability.
- **Logic Extraction & Simplification**: Any function or logic block that exceeds **10 lines** MUST be extracted to a dedicated `utils/` directory. During extraction, the logic must be simplified and refactored for maximum readability and maintainability. This rule does not apply to functions under 10 lines.
- **Dedicated Types**: Extract all common TypeScript types (unions, interfaces) to a dedicated `src/types/` folder for reuse across the codebase.
- **Drag & Drop and Order Management**: When implementing reordering (e.g., with dnd-kit), always include optimistic updates in the service layer. Ensure frontend index calculations account for pagination `offset` to maintain correct global ordering.
- **Neon HTTP Batching**: When using the `neon-http` driver, ALWAYS prefer `db.batch()` for multiple independent updates (like reordering) instead of wrapping them in a `db.transaction()`. This is more efficient and avoids potential transaction issues with the stateless HTTP driver.
- **Reviewer Expert**: ALWAYS run the `reviewer-expert` skill after completing each feature or JIRA ticket.

## Reference Patterns

See [references/trpc-procedures.md](references/trpc-procedures.md) for tRPC procedure templates.
See [references/axios-trpc-link.md](references/axios-trpc-link.md) for configuring the Axios-powered tRPC link.
See [references/optimistic-updates.md](references/optimistic-updates.md) for tRPC + TanStack Query mutation lifecycle patterns.
See [references/query-key-factory.md](references/query-key-factory.md) for managing TanStack Query keys.
