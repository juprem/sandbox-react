# Optimization & Simplification Patterns

## React Optimization (React Compiler)

- **Do NOT use `useMemo` or `useCallback`** unless explicitly requested and verified by the user.
- The **React Compiler** handles memoization automatically.
- Focus on clean, readable component logic.
- Keep state local to the components that need it to minimize re-renders.

## Drizzle & SQL Optimization

- Use `db.select().from(table).where(eq(table.id, id))` for single record fetching.
- Use indexes on columns frequently used in `where`, `groupBy`, and `orderBy`.
- Prefer `Drizzle`'s relational query builder for complex joins.

## tRPC & N+1 Queries

- **Problem**: Fetching related data (e.g., tags, subtasks) in a loop or per-item on the frontend.
- **Solution**: Join the related tables in the backend tRPC procedure using Drizzle's `leftJoin` or relational query builder.
- **Example**:
    ```typescript
    // Backend: Join tags in the tasks query
    const items = await db.query.tasks.findMany({
      with: {
        taskTags: { with: { tag: true } }
      }
    });
    ```

## Optimistic UI Abstraction

- **Problem**: Repeating same boilerplate for `onMutate`, `onError`, `onSettled` in multiple service hooks.
- **Solution**: Create a generic `useOptimisticMutation` helper.
- **Example**:
    ```typescript
    const useOptimisticMutation = (queryKey, updateFn) => {
      const utils = trpc.useUtils();
      return trpc.some.mutation.useMutation({
        onMutate: async (newData) => {
          await utils.some.query.cancel(queryKey);
          const prev = utils.some.query.getData(queryKey);
          utils.some.query.setData(queryKey, (old) => updateFn(old, newData));
          return { prev };
        },
        onError: (err, newData, ctx) => {
          utils.some.query.setData(queryKey, ctx.prev);
        },
        onSettled: () => utils.some.query.invalidate(queryKey),
      });
    };
    ```

## Efficient Database Updates

- **Problem**: Updating multiple records in a loop within a tRPC procedure.
- **Solution**: Use a single transaction or a bulk update if possible to reduce roundtrips.
- **Example**:
    ```typescript
    await db.transaction(async (tx) => {
      await Promise.all(items.map(item => 
        tx.update(tasks).set({ order: item.order }).where(eq(tasks.id, item.id))
      ));
    });
    ```

## TanStack Query Optimization

- Use `staleTime` and `cacheTime` to avoid redundant network requests.
- Use `placeholderData` or `initialData` for smoother loading transitions.
- Prefer `utils.item.all.setData` for immediate UI feedback.

## Code Simplification

- Extract complex logic into custom hooks (e.g., `useItemMutation`).
- Avoid deeply nested conditionals in the component return statement.
- Use `clsx` and `tailwind-merge` (or Panda equivalent) for clean, conditional styling.
- Extract metadata rendering (e.g., color mappings) into constants or sub-components.
