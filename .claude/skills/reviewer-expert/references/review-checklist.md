# Code Review Checklist

## Infrastructure & Configuration

- [ ] Are environment variables typed with `t3-env`?
- [ ] Are missing database indexes added for filter columns (`userId`, `status`, `priority`)?
- [ ] Is the project following the `src/routes`, `src/components`, `src/db`, `src/server` structure?

## Backend (tRPC & Drizzle)

- [ ] Are tRPC procedures using `zod` for input validation?
- [ ] No N+1 queries (fetching related data in a loop/per-item)? Join relational data in the procedure.
- [ ] Are updates in procedures efficient (no loops for DB updates)? Use transactions or bulk updates.
- [ ] Are monolithic functions decomposed into pure calculation helpers?
- [ ] Is database interaction logic handled exclusively in server-side procedures?

## Frontend (React & TanStack)

- [ ] Single Responsibility: Exactly ONE component per file?
- [ ] CRUD Responsibility: Mixed operations split into Orchestrator and standalone Action components?
- [ ] Named Exports: No `export default` used?
- [ ] Metadata Extraction: UI-specific metadata (colors, labels) extracted to sub-components or constants?
- [ ] No `useEffect` used without a strong, documented justification?
- [ ] Are all styles using Panda CSS (no inline CSS in TSX)?
- [ ] No deprecated `antd` components used (List, Comment, Skeleton.Avatar, etc.)? Use semantic HTML + Panda CSS instead.

## Logic & Performance

- [ ] Type Safety: NO `any` and NO `as` assertions used? Use `satisfies` instead.
- [ ] Are mutations using optimistic updates where appropriate?
- [ ] Are queries properly cached and invalidated?
- [ ] Is error handling user-friendly and consistent?
