---
name: agnostic-reviewer-expert
description: Use this skill after EVERY task completion, feature implementation, or JIRA ticket update to ensure the highest code quality, adherence to project standards, and verification of requirements. It is the final gatekeeper before code is considered "Done". This version is agnostic of specific libraries like Panda CSS, tRPC, or Drizzle.
---

# Agnostic Reviewer Expert

This skill provides guidance for performing rigorous code reviews, ensuring adherence to project standards, and identifying opportunities for optimization and simplification.

## Why this step is critical?
- **Quality Assurance**: Catches bugs, edge cases, and race conditions before they reach production.
- **Consistency**: Ensures the entire codebase follows the same patterns, making it easier to maintain.
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
- **Styling**: [Adherence]
- **Data Flow**: [Adherence]
- **Component Structure**: [Adherence]
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

- Read the JIRA ticket description and requirements.
- Verify that each task and feature specified in the ticket is correctly implemented.
- Confirm that the **Definition of Done (DoD)** is fully met for the ticket.

### 2. Compliance Check

- Verify adherence to local mandates and architectural patterns.
- **Single Responsibility**: Ensure each file contains exactly ONE component.
- **Named Exports**: Strictly ensure NO `export default` is used for components or utilities.
- **Metadata Extraction**: Verify that UI-specific metadata (colors, labels) is extracted into sub-components or constants.
- **Styling Standards**: Ensure all styles follow the project's styling approach. Avoid raw color strings and hardcoded values where theme tokens or variables are available.
- **CRUD Responsibility**: For components handling multiple CRUD operations, verify they are split into a parent **Orchestrator** and standalone **Action components** (e.g., `CreateForm`, `ItemRow`).

### 3. Deprecation & Future-Proofing

- **Check for Deprecated Components**: Ensure no deprecated library components are used. Replace them with semantic HTML or the current recommended alternatives.
- **Check for Deprecated Props**: Verify that all props used in library components are current.
- **Identify Legacy Patterns**: Flag any usage of old API patterns or `@deprecated` symbols in the codebase.

### 4. Logic & Error Inspection

- **Identify complex conditions**: If a boolean condition has more than one part, it **MUST** be extracted into a meaningful constant.
- **N+1 Query Detection**: Check if frontend components are fetching related data in a loop. Suggest joining or batching in the data fetching layer instead.
- **Efficient Updates**: Verify that data updates do not perform redundant operations in loops.
- **Logic Decomposition**: Flag functions that mix pure calculations with side effects.
- **Type Safety**: Strictly ensure NO `any` and NO `as` assertions are used. Use `satisfies` instead.
- Run project-specific linting commands to ensure no warnings or errors.

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

## Reference Patterns

See [references/review-checklist.md](references/review-checklist.md) for a comprehensive review checklist.
See [references/optimization-patterns.md](references/optimization-patterns.md) for common performance and logic optimizations.
