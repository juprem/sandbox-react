# Code Review Checklist

## Infrastructure & Configuration

- [ ] Are environment variables typed?
- [ ] Are necessary data storage indexes added for filter columns?
- [ ] Is the project following the intended file and directory structure?

## Backend & Data Layer

- [ ] Is input validation implemented for all data-modifying procedures?
- [ ] No N+1 queries (fetching related data in a loop/per-item)? Join relational data or use batching.
- [ ] Are updates efficient (no loops for storage updates)? Use transactions or bulk operations.
- [ ] Are monolithic functions decomposed into pure calculation helpers?
- [ ] Is database/storage interaction logic handled in appropriate layers?

## Frontend & UI

- [ ] Single Responsibility: Exactly ONE component per file?
- [ ] CRUD Responsibility: Mixed operations split into Orchestrator and standalone Action components?
- [ ] Named Exports: No `export default` used?
- [ ] Metadata Extraction: UI-specific metadata (colors, labels) extracted to sub-components or constants?
- [ ] No `useEffect` used without a strong, documented justification?
- [ ] Are styles using theme-aware tokens and avoiding hardcoded values?
- [ ] Are deprecated UI components replaced with semantic HTML or current recommendations?

## Logic & Performance

- [ ] Type Safety: NO `any` and NO `as` assertions used? Use `satisfies` or proper inference instead.
- [ ] Are data modifications using optimistic updates where appropriate for user experience?
- [ ] Are queries properly cached and invalidated?
- [ ] Is error handling user-friendly and consistent?
