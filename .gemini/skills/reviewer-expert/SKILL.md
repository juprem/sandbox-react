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

## 5. Conclusion
**[APPROVE]** or **[REQUEST CHANGES]** with a clear rationale.
```

## Workflow

### 1. JIRA Ticket Verification

- Read the JIRA ticket description and requirements from `references/jira-ticket.md`.
- Verify that each task and feature specified in the ticket is correctly implemented.
- Confirm that the **Definition of Done (DoD)** is fully met for the ticket.

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

### 4. Logic & Error Inspection

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

## Reference Patterns

See [references/review-checklist.md](references/review-checklist.md) for a comprehensive review checklist.
See [references/optimization-patterns.md](references/optimization-patterns.md) for common performance and logic optimizations.
