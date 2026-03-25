# JIRA Task Verification Workflow

## Workflow Steps

1.  **Ticket Review**: Read the JIRA ticket from `references/jira-ticket.md`.
2.  **Code Inspection**: Examine the changes made in the context of the ticket.
3.  **DoD Check**: Cross-check the changes with the ticket's "Definition of Done".
4.  **Functional Verification**: Run relevant tests or scripts to confirm functionality.
5.  **Side-Effect Check**: Ensure unrelated features are still working.

## Verification Checklist

- [ ] Is the primary feature/task implemented as described?
- [ ] Are all requirements (sub-tasks) fulfilled?
- [ ] Does the implementation match the DoD?
- [ ] Are error states and edge cases handled correctly?
- [ ] Did the changes introduce any obvious regressions?

## Reporting

- Provide a summary of findings.
- List any missing requirements or unmet DoD criteria.
- Suggest improvements for future tickets.
