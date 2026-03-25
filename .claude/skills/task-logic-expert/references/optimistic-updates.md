# Optimistic Updates (tRPC + TanStack Query)

## Mutation Lifecycle (src/components/item-edit.tsx)

```tsx
import { trpc } from "../utils/trpc";

export function ItemEditor({ item }) {
  const utils = trpc.useUtils();

  const updateMutation = trpc.item.update.useMutation({
    // Step 1: On Mutate
    onMutate: async (newItem) => {
      // Cancel outgoing refetches
      await utils.item.all.cancel();

      // Snapshot previous data
      const previousItems = utils.item.all.getData();

      // Optimistically update
      utils.item.all.setData(undefined, (old) =>
        old?.map((i) => (i.id === newItem.id ? { ...i, ...newItem.data } : i)),
      );

      return { previousItems };
    },
    // Step 2: On Error
    onError: (err, newItem, context) => {
      if (context?.previousItems) {
        utils.item.all.setData(undefined, context.previousItems);
      }
    },
    // Step 3: On Settled
    onSettled: () => {
      utils.item.all.invalidate();
    },
  });

  return (
    <button onClick={() => updateMutation.mutate({ id: item.id, data: { title: "New Title" } })}>
      Update
    </button>
  );
}
```
