---
name: reviewer-expert
description: Use this skill after EVERY task completion, feature implementation, or JIRA ticket update to ensure the highest code quality, adherence to project standards, and verification of requirements. It is the final gatekeeper before code is considered "Done".
---

# Reviewer Expert

This skill provides guidance for performing rigorous code reviews, ensuring adherence to project standards, and identifying opportunities for optimization and simplification.

## Why this step is critical?
- **Quality Assurance**: Catches bugs, edge cases, and race conditions before they reach production.
- **Consistency**: Ensures the entire codebase follows the same patterns (Panda CSS, tRPC, Drizzle), making it easier to maintain.
- **Requirement Verification**: Guarantees that the implementation actually matches the JIRA ticket's intent.
- **Knowledge Sharing**: Serves as a tool for continuous learning and alignment on best practices.

## Review Report Structure
ALWAYS provide your review findings using the following Markdown structure:

```markdown
# Code Review Report: [Feature/Ticket Name]

## 1. Summary
A brief overview of the changes and whether the core requirements are met.

## 2. JIRA Compliance
- [ ] Requirement 1: [Status]
- [ ] Requirement 2: [Status]
- [ ] Definition of Done (DoD) Check: [Status]

## 3. Technical Compliance (Mandates)
- **Panda CSS**: [Adherence]
- **tRPC/Data Flow**: [Adherence]
- **Drizzle/DB Schema**: [Adherence]
- **Component Structure**: [Adherence]
- **Single Responsibility**: [Adherence]  
- **Directory Structure**: [Adherence]  
- **Condition Extraction**: [Status]
- **Type Safety**: [No any/as assertions]
- **Named Exports**: [No default exports]
- **CRUD Responsibility**: [Status]

## 4. Findings & Improvements
- **Critical**: [List of blocking issues]
- **Suggestions**: [List of non-blocking optimizations or style improvements]

## 5. Architecture & Layer Checks
- **Type locality**: [Domain types imported from shared models, not redefined inline]
- **Utility placement**: [No cross-feature imports; pure utilities in src/utils/]
- **Domain layer**: [Business logic not in router/transport layer]
- **Cache completeness**: [All affected query keys invalidated on mutation]
- **Error state**: [isError exposed and handled alongside isLoading]
- **DB coupling**: [Components use typed domain objects, not raw DB field names]
- **Enum locality**: [Select/dropdown options co-located with their Zod schema]
- **UI pattern consistency**: [Loading/empty/error handled via shared primitive, not per-component]

## 6. Conclusion
**[APPROVE]** or **[REQUEST CHANGES]** with a clear rationale.
```

## Workflow

### 1. Requirements Verification

**If a JIRA ticket was provided:**
- Read the ticket description and requirements.
- Verify that each task and feature specified in the ticket is correctly implemented.
- Confirm that the **Definition of Done (DoD)** is fully met.

**If no JIRA ticket was provided:**
- Plan and infer requirements from the change description, PR description, or the code diff itself.
- Derive a working Definition of Done from context (e.g., "the mutation creates a record and invalidates the cache").
- Fall back to the **default DoD** below when no other context is available.

**Default Definition of Done (fallback):**
- [ ] Lint passes (`oxlint`) with no warnings or errors
- [ ] No `any` or `as` assertions in new/modified code
- [ ] Every file contains exactly one component (Single Responsibility)
- [ ] All exports are named (no `export default`)
- [ ] No N+1 queries introduced
- [ ] Secondary logic (gamification, analytics) wrapped in `try/catch`

### 2. Technical Compliance Check

- **Scope**: Perform a full-file review for every file touched by the change. Do not limit the review to only the changed lines; ensure the entire resulting file is architecturally sound and follows project standards.
- **Single Responsibility**: Ensure each file contains exactly ONE component. If a change introduces a second component, it MUST be extracted to its own file.
- **Named Exports**: Strictly ensure NO `export default` is used for components or utilities in the modified files.
- **Metadata Extraction**: Verify that UI-specific metadata (colors, labels) is extracted into small, focused sub-components or constants within the file or separate files.
- **Styling Standards**: Ensure all styles in the modified files use Panda CSS. Inline CSS or raw color strings (e.g., `color: "red"`) are forbidden in favor of theme tokens.
- **CRUD Responsibility**: For modified components handling multiple CRUD operations, verify they are split into a parent **Orchestrator** and standalone **Action components** (e.g., `CreateForm`, `ItemRow`).
- **Boolean Decomposition**: Identify complex inline boolean conditions (more than one part) in the modified code. They **MUST** be extracted into a descriptive constant for readability.
- **Directory Structure**: Ensure that directories have at most 3-4 primary components. If a component becomes complex and is split into many sub-parts (e.g., `Header`, `Body`, `Footer`, `Styles`), move it into its own dedicated directory. This directory should act as a **Module**, with the main component as the entry point and its internal parts clearly organized alongside it.

### 3. Deprecation & Future-Proofing

- **Check for Deprecated Components**: Ensure no deprecated library components are used. Replace them with semantic HTML or the current recommended alternatives.
- **Check for Deprecated Props**: Verify that all props used in library components are current.
- **Identify Legacy Patterns**: Flag any usage of old API patterns or `@deprecated` symbols in the codebase.

### 4. Architecture & Layer Checks

These checks look at structural health across the codebase — not just the changed lines. A change that looks clean in isolation can introduce drift in layering, type scattering, or incomplete data synchronisation.

- **Type locality**: If a component defines an inline `interface Contact { ... }` (or any domain type), ask whether a shared model file already exports that type. Redefining the same type in 3 places is silent drift — one definition can go stale without TypeScript noticing, because the files never import each other. Flag any inline interface that mirrors a Prisma model or a Zod schema's inferred type.

- **Utility placement**: Pure calculation helpers (date math, string parsing, time conversions) belong in a shared `src/utils/` module. Flag two cases: (1) the same logic copy-pasted in multiple files — apply the deletion test (would deleting one copy force you to recreate it in others?); (2) a feature-scoped utility (e.g., `DailyView/utils/getHourAndMinute`) being imported by a sibling feature (`WeeklyView`) — cross-feature imports break the feature-as-module boundary.

- **Domain logic in router/transport layer**: tRPC router procedures, REST handlers, and server actions are adapters — their job is to validate input and delegate. If a procedure contains non-trivial logic (conditional creation, multi-step orchestration, business invariants like "an Rdv cannot exist without a parent Day"), flag it. That logic belongs in a domain function in `src/server/` that the router calls. Routers that contain business logic are hard to reuse (a future bulk-import can't call them without HTTP).

- **Cache invalidation completeness**: When reviewing a mutation (`useMutation`, tRPC `.mutation()`), check that `onSuccess`/`onSettled` invalidates **every** query that displays the mutated data. A common mistake: adding a record invalidates the list query but not a grouped/filtered view that also shows the same data. Ask: which views render this resource? Are all their query keys invalidated?

- **Missing error state**: If a component destructures `{ data, isLoading }` from a query hook but ignores `isError`, flag it. An unhandled error leaves the user staring at a loading spinner or empty state forever. The fix is usually one line — add `isError` to the destructuring and pass it to whatever loading/state primitive the project uses.

- **DB field names leaking into component props**: If a component's props interface uses raw database column names (`start_hour`, `rdv_type`, `is_confirmed`, `day_id`), that component is tightly coupled to the schema. A column rename forces cascading changes at every call site. Prefer passing the entire domain object and destructuring inside the component, so the mapping from DB shape to UI is localised.

- **Enum/option constants decoupled from their schema**: If a `Select` or dropdown's options array (`[{ value: 'Dr' }, ...]`) is defined in the UI component rather than alongside the Zod schema that validates the same values, they can drift. Flag it: the options should live in the model file and be imported by the form.

- **Inconsistent wrapper/container patterns**: If the project uses a Wrapper+View split for data fetching (e.g., `DailyViewWrapper` fetches, `DailyView` renders), check that parallel views follow the same pattern. A `MonthlyView` that fetches its own data while its siblings have wrappers is an inconsistency that confuses future contributors. Flag it and suggest extracting a `MonthlyViewWrapper`.

- **Domain entity display formatting duplicated**: If the same string interpolation formula for a domain entity's display name appears in more than one file (e.g. `` `${c.civility ? c.civility + ' ' : ''}${c.firstname} ${c.lastname}` `` in 3+ files), flag it. Display formatting is domain knowledge — it belongs in a dedicated utility (e.g. `src/utils/contactUtils.ts`) with an options argument for short/compact variants used in space-constrained contexts like calendar blocks. The deletion test applies: if you delete one copy, the formula reappears in the others.

- **UI state interfaces duplicated across parallel views**: If two sibling view components (e.g. `WeeklyView` and `MonthlyView`) each define a locally-identical interface for their UI state (e.g. `interface SelectedRdv { rdv: RdvWithContact; isoDate: string }`), flag it. These shapes drift silently because TypeScript doesn't compare across unrelated files. Extract to the shared model file that both views already import from (e.g. `CalendarModel.ts`). Apply the deletion test: if you delete one definition, you'd recreate the same shape in the other — that's the signal it's earning its keep as a shared type.

### 5. Logic & Error Inspection

- **N+1 Query Detection**: Check if modified frontend components are fetching related data in a loop. Suggest joining in the tRPC router instead.
- **Efficient DB Updates**: Verify that tRPC procedures touched by the change do not perform DB updates in loops.
- **Neon HTTP Transactions**: If the project uses the `neon-http` driver, strictly ensure NO interactive transactions (`db.transaction`) are used. Flag them as critical errors and suggest sequential queries or `db.batch`.
- **tRPC Stability**: Verify that tRPC fetch adapter handlers (e.g., in `api.trpc.$.ts`) return a fresh `Response` object (via `response.text()`) to avoid stream locking errors.
- **Resilient Gamification**: Ensure secondary logic like XP updates or analytics are wrapped in `try/catch` to prevent them from failing the primary user operation.
- **Logic Decomposition**: Flag functions that mix pure calculations with side effects.
- **Type Safety**: Strictly ensure NO `any` and NO `as` assertions are used in the new or modified code. Use `satisfies` instead.
- Run the `oxlint` command to ensure no warnings or errors.

## Examples

**Example 1: Identifying a CRUD Responsibility violation**
**Input:** A `TagList` component that includes an inline form for creating tags and buttons for deleting them.
**Output:** "Violation of project standards: `TagList` is handling multiple CRUD operations. Suggest extracting the creation form to `CreateTagForm` and the row actions to `TagItem`."

**Example 2: Identifying Multiple Components per File**
**Input:** A file containing both `TaskGrid` and `TaskItem`.
**Output:** "Violation of Single Responsibility: `TaskItem` must be extracted into its own file."

**Example 3: Identifying 'as' assertion**
**Input:** `const status = 'todo' as TaskStatus;`
**Output:** "Suggest using `satisfies TaskStatus` or proper type inference instead of `as` assertion."

**Example 4: Component Decomposition & Module Organization**
**Input:** A `TaskItem.tsx` file with 200 lines of JSX and 100 lines of Panda CSS.
**Output:** "Violation of maintainability: `TaskItem` is too large. Suggest:
1. Extracting Panda CSS styles to `TaskItem.styles.ts`.
2. Extracting sub-parts to `TaskItemHeader.tsx`, `TaskItemBody.tsx`, and `TaskItemFooter.tsx`.
3. Moving all files into a dedicated `TaskItem/` directory to create a clean component module."

**Example 5: Inline type duplicating a model**
**Input:** `ContactDetail.tsx` defines `interface Contact { id: number; firstname: string; ... }` locally, while `models/ContactModel.ts` already exports `type Contact = contact`.
**Output:** "Type drift risk: `Contact` is redefined inline. Import `type Contact` from `#/models/ContactModel.ts` and delete the local interface. If the Prisma schema gains a column, the local definition will silently fall behind."

**Example 6: Business logic in tRPC router**
**Input:** An `addRdv` procedure that calls `prisma.day.findFirst`, then `prisma.day.create` if not found, then `prisma.rdv.create`.
**Output:** "Domain logic in transport layer: the find-or-create Day invariant belongs in a domain function (e.g., `src/server/calendarDomain.ts`), not in the router. The router should validate input and delegate — that way a future bulk-import endpoint can reuse the same invariant without going through HTTP."

**Example 7: Incomplete cache invalidation**
**Input:** `useAddRdv` invalidates `listByDay` and `listByMonth` on success, but the app also has a weekly view using `listByWeek`.
**Output:** "Incomplete invalidation: creating an RDV while on the weekly view will leave the grid stale. Add `queryClient.invalidateQueries` for `listByWeek` with the Monday of the affected week."

**Example 8: Missing error state**
**Input:** `DailyViewWrapper` destructures `const { data, isLoading } = useGetDailyRdv(today)` and passes only `isLoading` to `DataState`.
**Output:** "Silent error swallowing: `isError` is not destructured and not passed to `DataState`. A failed query will hang on loading indefinitely. Add `isError` to the destructuring and pass `isError={isError}` to the state primitive."

**Example 9: Raw DB field names as component props**
**Input:** `<RdvCard start_hour={rdv.start_hour} end_hour={rdv.end_hour} rdv_type={rdv.rdv_type} />` where `RdvCardProps` lists each DB column individually.
**Output:** "Schema coupling: `RdvCard` exposes raw Prisma column names in its props interface. Pass `rdv={rdv}` and destructure inside the component — a future column rename then only touches `RdvCard`'s internals, not every call site."

**Example 10: Cross-feature utility import**
**Input:** `WeeklyView/WeekDayColumn.tsx` imports `getHourAndMinute` from `DailyView/utils/getHoursAndMinute.ts`.
**Output:** "Cross-feature import: `getHourAndMinute` is a pure time-parsing utility being imported from a feature-scoped directory by a different feature. Move it to `src/utils/timeUtils.ts` so both features import from a neutral location. Feature-scoped `utils/` directories should only be imported by that feature."

**Example 11: Domain entity display name duplicated**
**Input:** `` `${c.civility ? c.civility + ' ' : ''}${c.firstname} ${c.lastname}` `` appears in `ContactSelectField.tsx`, `CalendarFilterBar.tsx`, `RdvCard.tsx`, and `RdvDetailModal.tsx`.
**Output:** "Display formatting duplicated: the contact name formula appears in 4 files. Extract to `src/utils/contactUtils.ts` as `formatContactName(contact, opts?)` — default includes civility prefix, `{ short: true }` omits it for compact calendar blocks. Deletion test: remove one copy and the formula reappears in the others."

**Example 12: UI state interface duplicated across parallel views**
**Input:** `WeeklyView.tsx` defines `interface SelectedRdv { rdv: RdvWithContact; isoDate: string }` and `MonthlyView.tsx` defines the exact same interface locally.
**Output:** "UI state drift: `SelectedRdv` is defined identically in two sibling views. Both files already import from `CalendarModel.ts` — add `export type SelectedRdv = { rdv: RdvWithContact; isoDate: string }` there and delete both local definitions. If the shape gains a field (e.g. `dayNum`), one update propagates to both views."

## Reference Patterns

See [references/review-checklist.md](references/review-checklist.md) for a comprehensive review checklist.
See [references/optimization-patterns.md](references/optimization-patterns.md) for common performance and logic optimizations.
