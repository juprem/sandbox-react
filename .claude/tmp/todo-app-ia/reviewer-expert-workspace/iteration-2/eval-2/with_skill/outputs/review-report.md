# Code Review Report: Subtask Service Refinement

## 1. Summary
The `src/services/subtask.service.ts` file provides a service hook for managing subtasks using tRPC and optimistic UI updates. While the core logic is sound, there are significant type safety issues regarding date handling in optimistic updates and the use of unsafe type assertions.

## 2. JIRA Compliance
*(Note: No JIRA ticket provided, but reviewing against general standards)*
- [x] Basic CRUD operations: Implemented
- [x] Optimistic UI: Implemented
- [x] Error handling: Basic implementation (UI notifications)

## 3. Technical Compliance (Mandates)
- **tRPC/Data Flow**: Follows tRPC patterns for mutations and cache invalidation.
- **Drizzle/DB Schema**: Mostly aligned, but deviates on date types during optimistic updates.
- **Component Structure**: N/A (this is a service hook).

## 4. Findings & Improvements

### **Critical: Type Safety & Date Mismatch**
The `subtasks` table schema defines `createdAt` and `updatedAt` as `timestamp`, which Drizzle returns as `Date` objects. However, in `onMutate`, these are being set to `ISOString` (strings):
```typescript
const optimistic: SubtaskOutput = {
  // ...
  createdAt: new Date().toISOString(), // Type mismatch: string vs Date
  updatedAt: new Date().toISOString(), // Type mismatch: string vs Date
};
```
This causes a silent type error that is being suppressed with `as SubtaskOutput` in the `update` mutation. This can lead to runtime crashes if any UI component calls `Date` methods (like `.getTime()` or `.getFullYear()`) on these properties.

**Recommendation**: Use `new Date()` instead of `.toISOString()` for optimistic updates.

### **Critical: Unsafe Type Assertion**
The `update` mutation uses a type assertion to silence the type checker:
```typescript
s.id === updated.id ? { ...s, ...updated, updatedAt: new Date().toISOString() } as SubtaskOutput : s
```
This is dangerous because it hides the type mismatch mentioned above. If `updated` contains different fields than expected, it won't be caught at compile time.

**Recommendation**: Properly type the optimistic update and avoid `as SubtaskOutput`. Ensure the object shape matches the expected output from the tRPC procedure.

### **Suggestion: Context Typing**
In `onError`, the `context` parameter is partially inferred but could be more explicitly typed for clarity.
```typescript
onError: (_err, _newSubtask, context) => {
  utils.subtasks.all.setData(taskId, context?.previous);
}
```

### **Suggestion: UI Side Effects**
The service hook directly uses `antd/message` for error notifications. While convenient, this couples the service to a specific UI library. 

**Recommendation**: Consider passing error callbacks or handling errors at the component level to keep the service more generic.

## 5. Conclusion
**[REQUEST CHANGES]**

The type mismatch between `Date` and `string` for timestamps in optimistic updates is a critical issue that can lead to runtime errors. The use of `as SubtaskOutput` should be removed in favor of proper type alignment.
