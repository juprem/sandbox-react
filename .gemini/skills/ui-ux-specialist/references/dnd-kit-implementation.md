# Drag and Drop Implementation with @dnd-kit

This document outlines the standard pattern for implementing drag and drop in this project using `@dnd-kit/core` and `@dnd-kit/sortable`.

## Core Components

### 1. The Container (e.g., TaskGrid)

The container should manage the `DndContext`, `SortableContext`, and `DragOverlay`.

#### Key Implementation Details:
- **State Management:** Use `useState(initialItems)` to initialize local state for reordering. **DO NOT use `useEffect` to synchronize props to state** as it causes unnecessary re-renders and potential flickering. Reordering should trigger an optimistic update of the local state followed by a background API call.
- **Sensors:** Always use a `PointerSensor` with an `activationConstraint` (e.g., `distance: 8`) to allow clicks on buttons within the draggable item.
- **Collision Detection:** Use `closestCenter` for grid layouts.

```tsx
export function Grid({ items: initialItems }) {
  const [items, setItems] = useState(initialItems);
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      
      setItems(newItems); // Optimistic local update
      syncWithAPI(newItems); // Background API call
    }
    setActiveId(null);
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map(i => i.id)} strategy={rectSortingStrategy}>
        <div className={grid_styles}>
          {items.map(item => <Item key={item.id} item={item} />)}
        </div>
      </SortableContext>

      <DragOverlay dropAnimation={dropAnimation}>
        {activeId ? <ItemOverlay item={items.find(i => i.id === activeId)} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
```

### 2. The Sortable Item (e.g., TaskItem)

The item uses the `useSortable` hook. 

#### Mistakes to Avoid:
- **`isOverlay` Prop Overuse:** Instead of passing an `isOverlay` prop and branching styles/logic, create a dedicated `ItemOverlay` component if the visual representation differs significantly or needs to be cleaner.
- **Framer Motion Conflicts:** DO NOT use `layout` props or complex entrance animations (`initial`, `animate`) on the item if they conflict with the drag-and-drop transform. The `DragOverlay` handles the visual movement of the dragged item.
- **Transform String:** Use `CSS.Transform.toString(transform)` for consistent behavior.

```tsx
export function Item({ item }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });

  const dndStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1, // Visual feedback for the original item position
  };

  return (
    <motion.div ref={setNodeRef} style={dndStyle}>
      <Card title={<DragHandle {...attributes} {...listeners} />}>
        {/* Content */}
      </Card>
    </motion.div>
  );
}
```

### 3. The Overlay (e.g., TaskItemOverlay)

The overlay is a visual clone of the item used during dragging. It should be stateless and purely visual.

```tsx
export function ItemOverlay({ item }) {
  return (
    <Card className={css({ boxShadow: 'xl', borderColor: 'blue.400' })}>
      {/* Visual content identical to Item but without dnd hooks */}
    </Card>
  );
}
```

## Best Practices Summary

1.  **Performance:** Avoid `useEffect` for state-to-prop synchronization. Trust the local state during the drag operation.
2.  **Cleaner Code:** Extract the `Overlay` into its own component to keep the `SortableItem` logic focused.
3.  **Visual Stability:** Set `touchAction: 'none'` on the drag handle to prevent mobile scrolling interference.
4.  **UX:** Use `opacity: 0.3` (or similar) on the original item (`isDragging`) to show where it will return if the drag is cancelled.
5.  **Optimistic UI:** Always update the local state immediately on `onDragEnd` before the API call finishes.
