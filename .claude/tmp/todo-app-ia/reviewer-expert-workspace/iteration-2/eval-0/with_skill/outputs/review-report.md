# Code Review Report: Task Management Performance Review

## 1. Summary
The review focuses on `src/components/tasks/TaskItem.tsx` and `src/server/trpc/routers/tasks.ts`. While the basic CRUD functionality is implemented, there are significant performance bottlenecks related to data fetching and database operations that could lead to poor user experience as the application scales.

## 2. JIRA Compliance
- [x] JIRA-30: Create task: [Implemented]
- [x] JIRA-31: Update task: [Implemented]
- [x] JIRA-32: Delete task: [Implemented]
- [-] JIRA-33: Fetch tasks (Pagination + filters): [Partial - Filters implemented, Pagination missing]
- [ ] JIRA-11: Route protection: [Missing - tRPC procedures are public]
- [ ] JIRA-26: Indexing/Performance: [Failing - N+1 query issue in frontend]
- [x] Definition of Done (DoD) Check: [Incomplete due to performance and security concerns]

## 3. Technical Compliance (Mandates)
- **Panda CSS**: [Adhered]
- **tRPC/Data Flow**: [Non-compliant - N+1 fetching pattern used]
- **Drizzle/DB Schema**: [Adhered]
- **Component Structure**: [Adhered]

## 4. Findings & Improvements
- **Critical (Frontend)**: **N+1 Fetching Pattern in `TaskItem.tsx`**. The component calls `trpc.tags.getForTask.useQuery(task.id)` inside each item. In a list of 50 tasks, this triggers 50 separate network requests. Tags should be joined or fetched in bulk in the `tasks.all` procedure.
- **Critical (Backend)**: **Inefficient Loop in `reorder` procedure**. The `reorder` procedure in `tasks.ts` performs individual `await ctx.db.update()` calls in a loop. This results in multiple round-trips to the database. It should be refactored to use a transaction and, if possible, a batch update operation.
- **Critical (Security)**: **Lack of Procedure Protection**. All procedures currently use `publicProcedure`. They should be changed to `protectedProcedure` to ensure only authenticated users can access/modify data, and queries should be scoped to the authenticated `session.user.id`.
- **Suggestion**: **Pagination**. Implement limit/offset or cursor-based pagination in `tasks.all` as per JIRA-33 to prevent performance degradation with many tasks.
- **Suggestion**: **Query Builder Refactoring**. In `tasks.all`, the query builder logic is duplicated when a status filter is applied. It could be refactored to conditionally add the where clause to a base query.

## 5. Conclusion
**[REQUEST CHANGES]**
The implementation has severe performance issues (N+1 queries) and security gaps (unprotected procedures). These must be addressed before the feature can be considered "Done" according to the project's high-quality standards.
