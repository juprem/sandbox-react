---
name: ui-ux-specialist
description: Use this skill for any UI task, from creating small reusable components to designing complex layouts, handling navigation with TanStack Router, and adding animations with Motion. It ensures a visually polished, responsive, and interactive experience using Ant Design and Panda CSS.
---

# UI/UX Specialist

This skill focuses on building highly interactive, responsive, and visually polished user interfaces using TanStack Router, Ant Design, and Motion.

## Why this approach?
- **TanStack Router**: Delivers type-safe, performant routing that scales with the application.
- **Ant Design (antd)**: Provides a comprehensive set of high-quality, pre-built components for complex UI needs.
- **Panda CSS**: Enables high-performance, atomic styling that integrates seamlessly with the design system.
- **Motion (framer-motion)**: Adds delightful animations and micro-interactions that improve user engagement.
- **Lucide React**: Offers a consistent and modern set of SVG-based icons.

## Component Structure
ALWAYS use the following structure for new components to ensure consistency and readability:

```tsx
interface ComponentProps {
    // Strictly typed props
}

export function Component({ ... }: ComponentProps) {
    // 1. Local/Global UI State
    // 2. Logic & Hooks
    // 3. Handlers (extracted and named meaningfully)

    return (
        <>{/* 4. JSX UI */}</>
    )
}
```

## Workflow

### 1. Navigation & Routing (TanStack Router)

- Define routes in `src/routes`.
- Use `createFileRoute` for type-safe routing.
- Implement layout routes with `<Outlet />`.
- Manage search params and loaders for data fetching.

### 2. Component Design (Ant Design + Panda CSS)

- Use `antd` components for complex UI (tables, forms, modals).
- Use `Panda CSS` for custom atomic styling and layout.
- Ensure all components are responsive (mobile-first).
- **Single Responsibility**: Each file MUST contain exactly ONE component. Sub-components must be extracted to their own files.
- **Named Exports Only**: ALWAYS use named exports for components (e.g., `export function MyComponent`). `export default` is strictly forbidden to ensure consistent naming and better refactoring support.
- **Metadata Extraction**: Extract UI-specific metadata logic (e.g., color mappings for priorities, status tag rendering) into small, focused sub-components or constants. Avoid hardcoding these in large parent components.
- **CRUD Responsibility Splitting**: For components handling multiple CRUD operations (e.g., a list with create, update, and delete), extract the UI and logic for EACH operation into standalone components. The parent component should act as a **UI Orchestrator**, managing only the high-level layout and data fetching.

### 3. Motion & Micro-interactions

- Use `framer-motion` for React animations.
- Prioritize CSS-only animations where possible.
- Focus on high-impact interactions (staggered reveals, hover effects).

### 4. State Management (TanStack Query)

- Use `TanStack Query` for server state, caching, and optimistic UI updates.
- Keep local UI state in standard React hooks (useState).
- Avoid unnecessary global state; keep it as local as possible.

### 5. Persistent Layouts

- Use TanStack Router's `__root.tsx` or layout routes for persistent components (Sidebar, Header).
- Ensure layouts don't remount on navigation for smooth transitions.

## Examples

**Example 1: A responsive header with Panda CSS**
**Input:** "Create a sticky header with a logo and navigation links."
**Output:** Uses Panda CSS for positioning and layout, following the mandatory component structure with a named export.

**Example 2: CRUD Orchestrator**
**Input:** "Implement a subtask list where users can add, toggle, and delete subtasks."
**Output:** Creates a `SubtaskList` orchestrator that renders `SubtaskItem` (Update/Delete) and `CreateSubtaskForm` (Create) components, each in their own file.

**Example 3: Metadata Extraction**
**Input:** "Render a task with priority colors."
**Output:** Extracts a `PriorityTag` component into a separate file that uses a centralized `TASK_PRIORITY_COLORS` constant and a named export.

**Example 4: Stable Loading State**
**Input:** "Add a loading spinner for the task list."
**Output:** Uses a container with `width: 'full'` and a `minHeight` that approximates the final content to prevent layout shifts when the data arrives.

## Guidelines

- **Responsive Design**: Use Panda CSS breakpoints for fluid layouts.
- **Ant Design Theming**: Customize the Ant Design theme via `ConfigProvider`.
- **Motion Principles**: Use animations to provide feedback and guide the user's attention.
- **Iconography**: Standardize on `lucide-react` for all UI icons.
- **Drag and Drop (dnd-kit)**: ALWAYS use `@dnd-kit` for reordering. 
    - **No `useEffect` Sync**: Initialize state from props (`useState(initialItems)`) and trust local state during reordering. DO NOT use `useEffect` to sync props back to state as it causes flicker.
    - **Dedicated Overlay**: Use a separate `ItemOverlay` component instead of an `isOverlay` prop for cleaner separation and better performance.
    - **Animation Safety**: DO NOT use Framer Motion `layout` props or entrance animations on sortable items if they conflict with dnd-kit transforms.
    - **Mobile First**: Use a dedicated drag handle with `touchAction: 'none'`.
- **Complete Creation Flows**: Ensure all related data (subtasks, tags, etc.) can be managed during the creation phase of an entity to provide a seamless UX. Avoid 'empty' initial states that force the user to immediately edit a newly created item.
- **Modal Content Safety**: ALWAYS apply a `maxHeight` (e.g., `70vh`) and `overflowY: 'auto'` to Modal bodies (via `styles.body` in antd) to prevent content from growing beyond the viewport.
- **Form Action Placement**: Place primary submit/action buttons outside of `Form.Item` at the bottom of the form for better semantics and visual separation, ensuring they remain inside the `<Form>` container.
- **Full-Height Layouts**: Ensure the root layout uses flexbox with `minHeight: '100vh'` and a `flex: 1` content area to push the footer to the bottom of the screen, even with minimal content.
- **Perceived Performance (Shell-First)**: For data-heavy pages, ALWAYS move the layout shell (headers, action buttons, search/filters) OUTSIDE of the `isLoading` block. Only wrap the specific data-display component (like a list or grid) in the loading spinner. This allows the user to see the page structure and access actions (like "Add New") before the query finishes.
- **Layout Stability (Loading UX)**: ALWAYS use a loader (e.g., AntD `Spin`) for data fetching states. To prevent vertical layout shifts (CLS), wrap the loader in a container with a `minHeight` (e.g., `400px`) and `display: flex` to center the spinner. DO NOT use skeletons unless explicitly requested, as high-quality loaders provide a cleaner, more focused transition.
- **Layout Consistency**: For data-heavy pages where a scrollbar might appear/disappear, avoid using `mx: 'auto'` on centered containers as it can cause horizontal layout shifts; prefer fixed margins (e.g., `mx: 4` or `mx: '2rem'`) with a `maxWidth`.
- **Clean JSX (Options Separation)**: ALWAYS move `Select`, `Radio.Group`, `Checkbox.Group`, and `Cascader` options out of the JSX. Use external constants for static options or component-level logic for dynamic ones.
- **Type-Safe Options**: Ensure `Select` options use the project's established unions if there is any (e.g., `TASK_STATUS_OPTIONS: { label: string; value: TaskStatus }[]`). This prevents runtime mismatches and leverages TypeScript for UI consistency.

## Reference Patterns

See [references/motion-patterns.md](references/motion-patterns.md) for common animation techniques.
See [references/antd-custom-theme.md](references/antd-custom-theme.md) for Ant Design configuration.
See [references/dnd-kit-implementation.md](references/dnd-kit-implementation.md) for standard drag and drop patterns.
