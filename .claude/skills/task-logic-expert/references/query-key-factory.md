# TanStack Query Key Factory (Fallback)

> **Note**: This pattern is a mandatory fallback only if the project does NOT use tRPC. If tRPC is used, prioritize tRPC's automatic key management via `trpc.useUtils()`.

## Key Factory Pattern

This pattern ensures type safety and consistency when managing query keys. It is the mandatory way to handle query keys in this project.

```ts
/**
 * src/utils/query-keys.ts
 */

export const itemKeys = {
  all: ["items"] as const,
  lists: () => [...itemKeys.all, "list"] as const,
  list: (filters: string) => [...itemKeys.lists(), { filters }] as const,
  details: () => [...itemKeys.all, "detail"] as const,
  detail: (id: string) => [...itemKeys.details(), id] as const,
} as const;

export const userKeys = {
  all: ["users"] as const,
  profile: (id: string) => [...userKeys.all, "profile", id] as const,
} as const;
```

## Usage in Queries

```tsx
import { useQuery } from "@tanstack/react-query";
import { itemKeys } from "../utils/query-keys";

export function useItems(filters: string) {
  return useQuery({
    queryKey: itemKeys.list(filters),
    queryFn: () => fetchItems(filters),
  });
}
```

## Usage in Mutations (Invalidation)

```tsx
const utils = useQueryClient();
utils.invalidateQueries({ queryKey: itemKeys.all });
```
