# Optimization & Simplification Patterns

## React Optimization

- **Do NOT use `useMemo` or `useCallback`** unless explicitly requested and verified by the user or when dealing with expensive computations that cause performance issues.
- Focus on clean, readable component logic.
- Keep state local to the components that need it to minimize re-renders.

## Storage & Query Optimization

- Fetch only the data that is needed for the current view.
- Use indexes on columns frequently used for filtering, grouping, or ordering.
- Prefer efficient join or batching strategies for complex data relationships.

## Data Fetching & N+1 Queries

- **Problem**: Fetching related data (e.g., tags, subtasks) in a loop or per-item on the frontend.
- **Solution**: Join the related data in the backend or use batch fetching techniques to reduce the number of requests.

## Optimistic UI Abstraction

- **Problem**: Repeating same boilerplate for `onMutate`, `onError`, `onSettled` in multiple data modification hooks.
- **Solution**: Create generic helpers or abstractions for handling optimistic updates.

## Efficient Data Updates

- **Problem**: Updating multiple records in a loop.
- **Solution**: Use single transactions or bulk update operations where possible to reduce roundtrips and ensure atomicity.

## State Management & Querying

- Use appropriate caching strategies (e.g., `staleTime`, `cacheTime`) to avoid redundant network requests.
- Use placeholders or initial data for smoother loading transitions.
- Prefer immediate UI feedback for data modifications.

## Code Simplification

- Extract complex logic into custom hooks.
- Avoid deeply nested conditionals in the component return statement.
- Use utility libraries for clean, conditional styling that respects theme tokens.
- Extract metadata rendering (e.g., color mappings) into constants or sub-components.
